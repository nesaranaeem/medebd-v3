import { NextSeo } from "next-seo";
import Link from "next/link";
import BlogRight from "@/components/aside/BlogRight";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const page = context.query.page || 1;
  const perPage = 10;

  // Fetch the category by slug
  const categoryResponse = await fetch(
    `https://slateblue-barracuda-231194.hostingersite.com/wp-json/wp/v2/categories?slug=${slug}`
  );
  const categoryData = await categoryResponse.json();

  if (!categoryData.length) {
    return {
      notFound: true,
    };
  }

  const category = categoryData[0];

  // Fetch posts associated with the category
  const postsResponse = await fetch(
    `https://slateblue-barracuda-231194.hostingersite.com/wp-json/wp/v2/posts?categories=${category.id}&per_page=${perPage}&page=${page}&_embed`
  );
  const postsData = await postsResponse.json();

  // Fetch total number of posts in the category for pagination
  const totalPostsResponse = await fetch(
    `https://slateblue-barracuda-231194.hostingersite.com/wp-json/wp/v2/posts?categories=${category.id}`
  );
  const totalPosts = await totalPostsResponse.headers.get("X-WP-Total");

  // Fetch all categories for BlogRight component
  const categoriesResponse = await fetch(
    "https://slateblue-barracuda-231194.hostingersite.com/wp-json/wp/v2/categories"
  );
  const categoriesData = await categoriesResponse.json();

  return {
    props: {
      category,
      posts: postsData,
      totalPosts: parseInt(totalPosts, 10),
      currentPage: parseInt(page, 10),
      perPage,
      categories: categoriesData,
    },
  };
}

const CategoryPage = ({
  category,
  posts,
  totalPosts,
  currentPage,
  perPage,
  categories,
}) => {
  const totalPages = Math.ceil(totalPosts / perPage);

  return (
    <>
      <NextSeo
        title={`Posts in category "${category.name}"`}
        description={`Find all posts in category "${category.name}"`}
        openGraph={{
          type: "website",
          url: typeof window !== "undefined" ? window.location.href : "",
          title: `Posts in category "${category.name}"`,
          description: `Find all posts in category "${category.name}"`,
        }}
      />
      <div className="container mx-auto p-4 lg:flex lg:space-x-8">
        <div className="lg:w-3/4">
          <h1 className="text-3xl font-bold mb-4">
            Posts in category "{category.name}"
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {posts.length > 0 ? (
              posts.map((post) => <BlogPostCard key={post.id} post={post} />)
            ) : (
              <p>No posts found.</p>
            )}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
          <div className="mt-4">
            <Link href="/blog" className="text-blue-600 hover:underline">
              Back to Blog
            </Link>
          </div>
        </div>
        <div className="lg:w-1/4 p-2">
          <BlogRight categories={categories} />
        </div>
      </div>
    </>
  );
};

const Pagination = ({ currentPage, totalPages }) => {
  const router = useRouter();

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex justify-center space-x-4">
        {currentPage > 1 && (
          <Link
            href={`/blog/category/${router.query.slug}?page=${currentPage - 1}`}
            passHref
          >
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Previous
            </button>
          </Link>
        )}
        {generatePageNumbers().map((page) => (
          <div key={page}>
            {page === currentPage ? (
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white cursor-default"
                disabled
              >
                {page}
              </button>
            ) : (
              <Link
                href={`/blog/category/${router.query.slug}?page=${page}`}
                passHref
              >
                <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">
                  {page}
                </button>
              </Link>
            )}
          </div>
        ))}
        {currentPage < totalPages && (
          <Link
            href={`/blog/category/${router.query.slug}?page=${currentPage + 1}`}
            passHref
          >
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Next
            </button>
          </Link>
        )}
      </div>
      <div className="text-gray-700">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default CategoryPage;

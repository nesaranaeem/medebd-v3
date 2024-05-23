import { NextSeo } from "next-seo";
import Link from "next/link";
import BlogRight from "@/components/aside/BlogRight";
import BlogPostCard from "@/components/blog/BlogPostCard";

export async function getServerSideProps(context) {
  const page = context.query.page || 1;
  const perPage = 10;

  // Fetch blog posts from WordPress
  const blogResponse = await fetch(
    `https://slateblue-barracuda-231194.hostingersite.com/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_embed`
  );
  const blogData = await blogResponse.json();

  // Fetch total number of posts for pagination
  const totalPostsResponse = await fetch(
    "https://slateblue-barracuda-231194.hostingersite.com/wp-json/wp/v2/posts"
  );
  const totalPosts = await totalPostsResponse.headers.get("X-WP-Total");

  // Fetch blog categories
  const categoriesResponse = await fetch(
    "https://slateblue-barracuda-231194.hostingersite.com/wp-json/wp/v2/categories"
  );
  const categoriesData = await categoriesResponse.json();

  return {
    props: {
      blogPosts: blogData,
      categories: categoriesData,
      totalPosts: parseInt(totalPosts, 10),
      currentPage: parseInt(page, 10),
      perPage,
    },
  };
}

const Blog = ({ blogPosts, categories, totalPosts, currentPage, perPage }) => {
  const totalPages = Math.ceil(totalPosts / perPage);

  return (
    <>
      <NextSeo
        title="Blog"
        description="Explore the latest blog posts on various topics"
      />
      <div className="container mx-auto p-4 lg:flex lg:space-x-8">
        <div className="lg:w-3/4">
          <h1 className="text-3xl font-bold mb-4">Blog</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {blogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
        <div className="lg:w-1/4 p-2">
          <BlogRight categories={categories} />
        </div>
      </div>
    </>
  );
};

const Pagination = ({ currentPage, totalPages }) => {
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
          <Link href={`/blog?page=${currentPage - 1}`} passHref>
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
              <Link href={`/blog?page=${page}`} passHref>
                <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">
                  {page}
                </button>
              </Link>
            )}
          </div>
        ))}
        {currentPage < totalPages && (
          <Link href={`/blog?page=${currentPage + 1}`} passHref>
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

export default Blog;

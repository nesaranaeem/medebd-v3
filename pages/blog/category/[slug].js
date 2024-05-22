import { NextSeo } from "next-seo";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { useRouter } from "next/router";
import Link from "next/link";

export async function getServerSideProps(context) {
  const { slug } = context.params;

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
    `https://slateblue-barracuda-231194.hostingersite.com/wp-json/wp/v2/posts?categories=${category.id}&_embed`
  );
  const postsData = await postsResponse.json();

  return {
    props: {
      category,
      posts: postsData,
    },
  };
}

const CategoryPage = ({ category, posts }) => {
  const router = useRouter();
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <NextSeo
        title={`Posts in category "${category.name}"`}
        description={`Find all posts in category "${category.name}"`}
        openGraph={{
          type: "website",
          url: shareUrl,
          title: `Posts in category "${category.name}"`,
          description: `Find all posts in category "${category.name}"`,
        }}
      />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">
          Posts in category "{category.name}"
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.length > 0 ? (
            posts.map((post) => <BlogPostCard key={post.id} post={post} />)
          ) : (
            <p>No posts found.</p>
          )}
        </div>
        <div className="mt-4">
          <Link href="/blog" className="text-blue-600 hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;

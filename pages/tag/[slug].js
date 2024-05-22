import { NextSeo } from "next-seo";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { useRouter } from "next/router";
import Link from "next/link";

export async function getServerSideProps(context) {
  const { slug } = context.params;

  // Fetch the posts by tag slug
  const tagResponse = await fetch(
    `https://slateblue-barracuda-231194.hostingersite.com/wp-json/wp/v2/tags?slug=${slug}`
  );
  const tagData = await tagResponse.json();

  if (!tagData.length) {
    return {
      notFound: true,
    };
  }

  const tag = tagData[0];

  // Fetch posts associated with the tag
  const postsResponse = await fetch(
    `https://slateblue-barracuda-231194.hostingersite.com/wp-json/wp/v2/posts?tags=${tag.id}&_embed`
  );
  const postsData = await postsResponse.json();

  return {
    props: {
      tag,
      posts: postsData,
    },
  };
}

const TagPage = ({ tag, posts }) => {
  const router = useRouter();
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <NextSeo
        title={`Posts tagged with "${tag.name}"`}
        description={`Find all posts tagged with "${tag.name}"`}
        openGraph={{
          type: "website",
          url: shareUrl,
          title: `Posts tagged with "${tag.name}"`,
          description: `Find all posts tagged with "${tag.name}"`,
        }}
      />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">
          Posts tagged with "{tag.name}"
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

export default TagPage;

import { NextSeo } from "next-seo";
import Link from "next/link";
import Image from "next/image";
import {
  FaUser,
  FaClock,
  FaTag,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaChevronRight,
} from "react-icons/fa";
import BlogRight from "@/components/aside/BlogRight";
import BlogPostCard from "@/components/blog/BlogPostCard";

export async function getServerSideProps(context) {
  const { slug } = context.params;

  // Fetch the post by slug
  const postResponse = await fetch(
    `https://slateblue-barracuda-231194.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}&_embed`
  );
  const postData = await postResponse.json();

  if (!postData.length) {
    return {
      notFound: true,
    };
  }

  const post = postData[0];

  // Fetch related posts
  const relatedResponse = await fetch(
    `https://slateblue-barracuda-231194.hostingersite.com/wp-json/wp/v2/posts?categories=${post.categories[0]}&exclude=${post.id}&per_page=5&_embed`
  );
  const relatedData = await relatedResponse.json();

  // Fetch blog categories
  const categoriesResponse = await fetch(
    "https://slateblue-barracuda-231194.hostingersite.com/wp-json/wp/v2/categories"
  );
  const categoriesData = await categoriesResponse.json();

  return {
    props: {
      post,
      relatedPosts: relatedData,
      categories: categoriesData,
    },
  };
}

const BlogPost = ({ post, relatedPosts, categories }) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  // Find the category object for breadcrumb
  const category = post._embedded["wp:term"].find(
    (term) => term[0]?.taxonomy === "category"
  )[0];

  return (
    <>
      <NextSeo
        title={post.title.rendered}
        description={post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "")}
        openGraph={{
          type: "article",
          article: {
            publishedTime: post.date,
            modifiedTime: post.modified,
            tags: post.tags.map((tag) => tag.name),
          },
          url: shareUrl,
          title: post.title.rendered,
          description: post.excerpt.rendered.replace(/(<([^>]+)>)/gi, ""),
          images: [
            {
              url: post._embedded["wp:featuredmedia"]
                ? post._embedded["wp:featuredmedia"][0].source_url
                : "/images/default-featured-image.jpg",
              alt: post.title.rendered,
            },
          ],
        }}
      />
      <div className="container mx-auto p-4 lg:flex lg:space-x-8">
        <div className="lg:w-3/4">
          <nav className="mb-4 text-sm">
            <ol className="list-reset flex text-gray-600 flex-wrap">
              <li>
                <Link href="/" className="text-blue-600 hover:text-blue-700">
                  Home
                </Link>
              </li>
              <FaChevronRight className="mx-2 my-auto" />
              <li>
                <Link
                  href="/blog"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Blog
                </Link>
              </li>
              <FaChevronRight className="mx-2 my-auto" />
              <li>
                <Link
                  href={`/blog/category/${category.slug}`}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {category.name}
                </Link>
              </li>
              <FaChevronRight className="mx-2 my-auto" />
              <li className="text-gray-500">{post.title.rendered}</li>
            </ol>
          </nav>

          <article className="bg-white rounded-lg shadow-md p-6 mb-8">
            {post._embedded["wp:featuredmedia"] && (
              <div className="w-full h-64 relative mb-4">
                <Image
                  src={post._embedded["wp:featuredmedia"][0].source_url}
                  alt={post.title.rendered}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
            )}
            <h1 className="text-3xl font-bold mb-2">{post.title.rendered}</h1>
            <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-4 text-gray-700">
              <div className="flex items-center mb-2 sm:mb-0">
                <FaUser className="mr-2 text-blue-600" />
                {post._embedded.author[0].name}
                <FaClock className="ml-4 mr-2 text-yellow-600" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex space-x-4 text-gray-700">
                <span className="text-gray-700">Share:</span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-xl"
                >
                  <FaFacebookF />
                </a>
                <a
                  href={`https://twitter.com/share?url=${shareUrl}&text=${post.title.rendered}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 text-xl"
                >
                  <FaTwitter />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post.title.rendered}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-800 text-xl"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
            <div
              className="post-content mb-4"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
            {post.tags.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Tags:</h2>
                <div className="flex flex-wrap">
                  {post._embedded["wp:term"]
                    .find((term) => term[0]?.taxonomy === "post_tag")
                    ?.map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/tag/${tag.slug}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-lg mr-2 mb-2 text-sm"
                      >
                        <FaTag className="inline mr-1" />
                        {tag.name}
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </article>

          {relatedPosts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="lg:w-1/4 p-2">
          <BlogRight categories={categories} />
        </div>
      </div>
    </>
  );
};

export default BlogPost;

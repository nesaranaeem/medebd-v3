// components/blog/BlogPostCard.js
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaUser, FaClock } from "react-icons/fa";

const BlogPostCard = ({ post }) => {
  const featuredImage =
    post._embedded && post._embedded["wp:featuredmedia"]
      ? post._embedded["wp:featuredmedia"][0].source_url
      : "/images/default-featured-image.jpg";

  const excerptText = post.excerpt.rendered
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/&hellip;/g, "...")
    .slice(0, 100); // Limiting text to 100 characters

  return (
    <div className="border border-gray-300 rounded-lg bg-white text-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300 p-3">
      {featuredImage && (
        <div className="w-full h-40 relative mb-3">
          <Image
            src={featuredImage}
            alt={post.title.rendered}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      )}
      <h2 className="text-lg font-semibold mb-1">{post.title.rendered}</h2>
      <div className="flex items-center mb-1 text-gray-700 text-sm">
        <FaUser className="mr-1 text-blue-600" />
        {post._embedded?.author[0]?.name}
      </div>
      <div className="flex items-center mb-2 text-gray-700 text-sm">
        <FaClock className="mr-1 text-yellow-600" />
        {new Date(post.date).toLocaleDateString()}
      </div>
      <p className="text-gray-700 mb-3 text-sm">{excerptText}...</p>
      <Link
        href={`/blog/${post.slug}`}
        className="block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-center flex items-center justify-center text-sm"
      >
        Read More <FaArrowRight className="ml-2" />
      </Link>
    </div>
  );
};

export default BlogPostCard;

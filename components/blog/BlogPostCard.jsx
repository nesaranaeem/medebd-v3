import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaUser, FaClock, FaPen } from "react-icons/fa";

const BlogPostCard = ({ post }) => {
  const featuredImage =
    post._embedded && post._embedded["wp:featuredmedia"]
      ? post._embedded["wp:featuredmedia"][0].source_url
      : "/images/default-featured-image.jpg";

  const excerptText = post.excerpt.rendered
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/&hellip;/g, "...")
    .slice(0, 100); // Limiting text to 100 characters

  const truncatedTitle =
    post.title.rendered.length > 50
      ? `${post.title.rendered.slice(0, 50)}...`
      : post.title.rendered;

  const category = post._embedded?.["wp:term"]?.find(
    (term) => term[0]?.taxonomy === "category"
  )?.[0];

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
      <h2
        className="text-lg font-semibold mb-1"
        title={post.title.rendered.length > 60 ? post.title.rendered : ""}
      >
        {truncatedTitle}
      </h2>
      <div className="flex items-center mb-1 text-gray-700 text-sm">
        <FaUser className="mr-1 text-blue-600" />
        {post._embedded?.author[0]?.name}
        {category && (
          <>
            <FaPen className="ml-4 mr-1 text-green-600" />
            <Link href={`/blog/category/${category.slug}`}>
              {category.name}
            </Link>
          </>
        )}
      </div>
      <div className="flex items-center mb-2 text-gray-700 text-sm">
        <FaClock className="mr-1 text-yellow-600" />
        {new Date(post.date).toLocaleDateString()}
      </div>
      <p className="text-gray-700 mb-3 text-sm">{excerptText}...</p>
      <Link
        href={`/view/${post.slug}`}
        className="block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-center flex items-center justify-center text-sm"
      >
        Read More <FaArrowRight className="ml-2" />
      </Link>
    </div>
  );
};

export default BlogPostCard;

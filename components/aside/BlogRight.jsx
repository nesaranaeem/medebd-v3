import Link from "next/link";

const BlogRight = ({ categories }) => {
  return (
    <div className="sticky top-0 bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4 text-center text-gray-900">
        Blog Categories
      </h2>
      <div className="flex flex-col space-y-2">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog/category/${category.slug}`}
              className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center"
            >
              {category.name}
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-700">No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default BlogRight;

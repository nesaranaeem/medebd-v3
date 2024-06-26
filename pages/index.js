import { NextSeo } from "next-seo";
import Statistics from "@/components/statistics/Statistics";
import { apiBaseURL } from "@/utils/api/Api";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { useState, useEffect } from "react";
import Link from "next/link";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import BlogRight from "@/components/aside/BlogRight";

export async function getServerSideProps() {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;

  try {
    // Fetch medicines
    const medicineResponse = await fetch(
      `${apiBaseURL}medicine?apikey=${apikey}&page=1&limit=12`
    );
    const medicineData = await medicineResponse.json();

    // Fetch blog posts from WordPress
    const blogResponse = await fetch(
      "https://slateblue-barracuda-231194.hostingersite.com/wp-json/wp/v2/posts?per_page=6&_embed"
    );
    const blogData = await blogResponse.json();

    // Fetch blog categories from WordPress
    const categoriesResponse = await fetch(
      "https://slateblue-barracuda-231194.hostingersite.com/wp-json/wp/v2/categories"
    );
    const categoriesData = await categoriesResponse.json();

    return {
      props: {
        medicineData: medicineData.details || [],
        blogPosts: blogData || [],
        categories: categoriesData || [],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        medicineData: [],
        blogPosts: [],
        categories: [],
      },
    };
  }
}

export default function Home({ medicineData, blogPosts, categories }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      medicineData.length > 0 ||
      blogPosts.length > 0 ||
      categories.length > 0
    ) {
      setIsLoading(false);
    }
  }, [medicineData, blogPosts, categories]);

  return (
    <>
      <NextSeo
        title="Explore Medicine Details"
        description="MedeBD offers over 25k+ medicine details for free of cost"
      />
      <Statistics data={medicineData} />
      {isLoading ? (
        <div className="flex items-center justify-center h-20">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row shadow-md bg-gray-200">
          <div className="lg:w-3/4 p-2">
            <div className="flex justify-center py-2">
              <h2 className="text-lg text-center font-bold p-3 shadow-md text-gray-900">
                Latest Blog Posts
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-2">
              {blogPosts && blogPosts.length > 0 ? (
                blogPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))
              ) : (
                <p className="text-center text-gray-700">
                  No blog posts available.
                </p>
              )}
            </div>
            <div className="flex justify-center py-4">
              <Link
                href="/blog"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center"
              >
                View All Blog Posts
              </Link>
            </div>
          </div>
          <div className="lg:w-1/4 p-2">
            <BlogRight categories={categories} />
          </div>
        </div>
      )}
    </>
  );
}

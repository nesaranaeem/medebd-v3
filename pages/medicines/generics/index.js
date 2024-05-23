import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { apiBaseURL } from "@/utils/api/Api";

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const response = await fetch(
    `${apiBaseURL}medicine/generic?apikey=${apikey}&page=${page}&limit=18`
  );
  const data = await response.json();

  return {
    props: {
      genericList: data.details || [],
      currentPage: data.current_page || 1,
      totalPages: data.total_pages || 1,
    },
  };
}

export default function GenericsPage({ genericList, currentPage, totalPages }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handlePageChange = (newPage) => {
    router.push(`?page=${newPage}`);
  };

  return (
    <>
      <NextSeo
        title={`Medicine Generics | Page ${currentPage} of ${totalPages}`}
        description={`Browse Medicine Generics`}
      />

      {isLoading ? (
        <div className="flex items-center justify-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-center py-4">
            <h1 className="text-2xl text-center font-bold p-3 text-white border-2 border-blue-500 bg-blue-600 rounded-lg shadow-lg">
              Generics List
            </h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {genericList.map((item) => (
              <div
                key={item._id}
                className="border border-gray-300 rounded-lg bg-white text-gray-900 shadow-md hover:bg-gray-100 p-4"
              >
                <Link
                  className="font-bold hover:text-blue-600"
                  href={`/medicines/generics/${item.generic_id}`}
                >
                  {item.generic_name}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center py-4">
            <div className="flex space-x-2">
              {currentPage > 1 && (
                <Link
                  href={`?page=${currentPage - 1}`}
                  className="px-3 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-lg"
                >
                  &lt;
                </Link>
              )}
              {currentPage > 2 && (
                <Link
                  href={`?page=${currentPage - 2}`}
                  className="px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  {currentPage - 2}
                </Link>
              )}
              {currentPage > 1 && (
                <Link
                  href={`?page=${currentPage - 1}`}
                  className="px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  {currentPage - 1}
                </Link>
              )}
              <button className="px-3 py-2 bg-green-600 text-white rounded-lg cursor-default">
                {currentPage}
              </button>
              {currentPage < totalPages && (
                <Link
                  href={`?page=${currentPage + 1}`}
                  className="px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  {currentPage + 1}
                </Link>
              )}
              {currentPage < totalPages - 1 && (
                <Link
                  href={`?page=${currentPage + 2}`}
                  className="px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  {currentPage + 2}
                </Link>
              )}
              {currentPage < totalPages && (
                <Link
                  href={`?page=${currentPage + 1}`}
                  className="px-3 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-lg"
                >
                  &gt;
                </Link>
              )}
            </div>
            <p className="mt-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </>
      )}
    </>
  );
}

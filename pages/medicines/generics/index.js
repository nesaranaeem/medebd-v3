import { useState, useEffect } from "react";
import Link from "next/link";
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

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
          <div className="flex justify-center py-2">
            <h1 className="text-xl text-center font-bold p-3 text-white border-2 border-gray-500">
              Generics List
            </h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-2">
            {genericList.map((item) => (
              <div
                key={item._id}
                className="border border-gray-700 rounded-lg bg-gray-800 text-white shadow-md hover:bg-gray-900 p-4"
              >
                <Link
                  className="font-bold hover:text-red-400"
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
                  className="px-2 py-2.5 text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg"
                >
                  &lt;
                </Link>
              )}
              {currentPage > 2 && (
                <Link
                  href={`?page=${currentPage - 2}`}
                  className="px-2 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg"
                >
                  {currentPage - 2}
                </Link>
              )}
              {currentPage > 1 && (
                <Link
                  href={`?page=${currentPage - 1}`}
                  className="px-2 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg"
                >
                  {currentPage - 1}
                </Link>
              )}
              <button className="px-2 py-2.5 bg-green-500 text-white font-bold rounded-lg">
                {currentPage}
              </button>
              {currentPage < totalPages && (
                <Link
                  href={`?page=${currentPage + 1}`}
                  className="px-2 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg"
                >
                  {currentPage + 1}
                </Link>
              )}
              {currentPage < totalPages - 1 && (
                <Link
                  href={`?page=${currentPage + 2}`}
                  className="px-2 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg"
                >
                  {currentPage + 2}
                </Link>
              )}
              {currentPage < totalPages && (
                <Link
                  href={`?page=${currentPage + 1}`}
                  className="px-2 py-2.5 text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg"
                >
                  &gt;
                </Link>
              )}
            </div>
            <p className="mt-2 text-white">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </>
      )}
    </>
  );
}

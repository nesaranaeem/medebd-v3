import { useState, useEffect } from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { apiBaseURL } from "@/utils/api/Api";
import HospitalCard from "@/components/hospital/HospitalCard";

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const response = await fetch(
    `${apiBaseURL}hospital?apikey=${apikey}&page=${page}&limit=12`
  );
  const data = await response.json();

  return {
    props: {
      hospitalsList: data.hospitalsList || [],
      currentPage: Number(page),
      totalPages: data.total_pages || 1,
      totalResults: data.total_count || 0,
    },
  };
}

export default function HospitalsPage({
  hospitalsList,
  currentPage,
  totalPages,
  totalResults,
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <NextSeo
        title={`Hospitals | Page ${currentPage} of ${totalPages} | Total ${totalResults} Hospitals`}
        description={`Browse hospitals from the total ${totalResults} hospitals.`}
      />

      {isLoading ? (
        <div className="flex items-center justify-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-center py-4">
            <h1 className="text-2xl text-center font-bold p-3 text-white border-2 border-blue-500 bg-blue-600 rounded-lg shadow-lg">
              Hospitals List
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {hospitalsList.length > 0 ? (
              hospitalsList.map((item) => (
                <HospitalCard key={item._id} hospital={item} />
              ))
            ) : (
              <p className="text-center col-span-3 text-gray-700">No hospitals found.</p>
            )}
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

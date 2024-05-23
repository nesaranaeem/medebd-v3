import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { apiBaseURL } from "@/utils/api/Api";
import MedicineCard from "@/components/medicine/MedicineCard";
import Link from "next/link";

export async function getServerSideProps({ query, params }) {
  const page = query.page || 1;
  const genericId = params.genericId; // Extract genericId from params
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const response = await fetch(
    `${apiBaseURL}medicine?apikey=${apikey}&genericId=${genericId}&page=${page}&limit=12`
  );
  const data = await response.json();

  return {
    props: {
      medicineData: data.details,
      currentPage: Number(page),
      totalPages: data.total_pages,
      totalResults: data.total_count,
      genericId: genericId || null, // Set genericId to null if undefined
    },
  };
}

export default function MedicinesPage({
  medicineData,
  currentPage,
  totalPages,
  totalResults,
  genericId,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handlePageChange = (newPage) => {
    router.push(`/medicines/generics/${genericId}?page=${newPage}`);
  };

  return (
    <>
      <NextSeo
        title={`Medicine Generics | Page ${currentPage} of ${totalPages} | Total ${totalResults} Medicines`}
        description={`Browse Medicine list from the total ${totalResults} medicines.`}
      />

      {isLoading ? (
        <div className="flex items-center justify-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-center py-4">
            <h1 className="text-2xl text-center font-bold p-3 text-white border-2 border-blue-500 bg-blue-600 rounded-lg shadow-lg">
              Browse Medicines
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {medicineData?.map((item) => (
              <MedicineCard key={item._id} medicine={item} />
            ))}
          </div>
          <div className="flex flex-col items-center py-4">
            <div className="flex space-x-2">
              {currentPage > 1 && (
                <Link
                  href={`/medicines/generics/${genericId}?page=${currentPage - 1}`}
                  className="px-3 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-lg"
                >
                  &lt;
                </Link>
              )}
              {currentPage > 2 && (
                <Link
                  href={`/medicines/generics/${genericId}?page=${currentPage - 2}`}
                  className="px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  {currentPage - 2}
                </Link>
              )}
              {currentPage > 1 && (
                <Link
                  href={`/medicines/generics/${genericId}?page=${currentPage - 1}`}
                  className="px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  {currentPage - 1}
                </Link>
              )}
              <button className="px-3 py-2 bg-green-600 text-white rounded-lg cursor-default" disabled>
                {currentPage}
              </button>
              {currentPage < totalPages && (
                <Link
                  href={`/medicines/generics/${genericId}?page=${currentPage + 1}`}
                  className="px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  {currentPage + 1}
                </Link>
              )}
              {currentPage < totalPages - 1 && (
                <Link
                  href={`/medicines/generics/${genericId}?page=${currentPage + 2}`}
                  className="px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  {currentPage + 2}
                </Link>
              )}
              {currentPage < totalPages && (
                <Link
                  href={`/medicines/generics/${genericId}?page=${currentPage + 1}`}
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

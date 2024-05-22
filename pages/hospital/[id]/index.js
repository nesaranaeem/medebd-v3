import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { BreadcrumbJsonLd, NextSeo } from "next-seo";
import { apiBaseURL } from "@/utils/api/Api";
import Link from "next/link";
import HospitalDetails from "@/components/hospital/HospitalDetails";

async function getHospitalDetails(id) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const response = await fetch(`${apiBaseURL}hospital/${id}?apikey=${apikey}`);
  const data = await response.json();
  return data.hospitalDetails;
}

export async function getServerSideProps({ params }) {
  const id = params.id;

  try {
    const hospitalDetails = await getHospitalDetails(id);

    return {
      props: {
        hospitalDetails: hospitalDetails || null,
      },
    };
  } catch (error) {
    console.error("Error fetching hospital details:", error);
  }

  return {
    props: {
      hospitalDetails: null,
    },
  };
}

export default function HospitalDetailsPage({ hospitalDetails }) {
  const [isLoading, setIsLoading] = useState(hospitalDetails === null);

  useEffect(() => {
    if (hospitalDetails === null) {
      setIsLoading(true);
      return;
    }

    setIsLoading(false);
  }, [hospitalDetails]);

  if (isLoading) {
    return (
      <>
        <FaSpinner className="animate-spin h-8 w-8 text-indigo-500" />
      </>
    );
  }

  return (
    <>
      {hospitalDetails && (
        <>
          <BreadcrumbJsonLd
            itemListElements={[
              {
                position: 1,
                name: "Home",
                item: "https://medebd.com/",
              },
              {
                position: 2,
                name: "Hospitals",
                item: "https://medebd.com/hospitals",
              },
              {
                position: 3,
                name: hospitalDetails.name,
                item: `https://medebd.com/hospital/${hospitalDetails.id}`,
              },
            ]}
          />
          <NextSeo
            title={`${hospitalDetails?.name} - Details`}
            description={`Hospital details for ${hospitalDetails?.name}`}
          />
          <div className="flex flex-col items-center p-4 border rounded-lg bg-gray-800 text-white shadow-md w-full mx-auto">
            <div className="text-xl font-bold text-center text-white">
              Hospital Details
            </div>
            <nav
              className="flex my-2 px-5 py-3 bg-gray-600 text-white rounded-lg mx-auto w-full"
              aria-label="Breadcrumb"
            >
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-white hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="w-3 h-3 mx-1 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <Link
                      href="/hospitals"
                      className="ml-1 text-sm font-medium text-white hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                    >
                      Hospitals
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg
                      className="w-3 h-3 mx-1 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="ml-1 text-sm font-medium text-white md:ml-2 dark:text-gray-400">
                      {hospitalDetails.name}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <HospitalDetails hospitalDetails={hospitalDetails} />
          </div>
        </>
      )}
    </>
  );
}

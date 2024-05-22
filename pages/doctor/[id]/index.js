import { useEffect, useState } from "react";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { BreadcrumbJsonLd, NextSeo } from "next-seo";
import { FaInfo } from "react-icons/fa6";
import { apiBaseURL } from "@/utils/api/Api";
import DoctorDetails from "@/components/doctor/DoctorDetails";

async function getDetails(id) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const response = await fetch(`${apiBaseURL}doctor/${id}?apikey=${apikey}`);
  const data = await response.json();
  return data.doctorDetails;
}

export async function getServerSideProps({ params }) {
  const id = params.id;

  try {
    const doctorDetails = await getDetails(id);

    return {
      props: {
        doctorDetails: doctorDetails,
      },
    };
  } catch (error) {
    console.error("Error fetching doctor details:", error);
  }

  return {
    props: {
      doctorDetails: null,
    },
  };
}

export default function DoctorDetailsPage({ doctorDetails }) {
  const [isLoading, setIsLoading] = useState(doctorDetails === null);

  useEffect(() => {
    if (doctorDetails === null) {
      setIsLoading(true);
      return;
    }

    setIsLoading(false);
  }, [doctorDetails]);

  if (isLoading) {
    return (
      <>
        <FaSpinner className="animate-spin h-8 w-8 text-indigo-500" />
      </>
    );
  }

  return (
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
            name: "Doctors",
            item: "https://medebd.com/doctors",
          },
          {
            position: 3,
            name: doctorDetails?.name,
            item: `https://medebd.com/doctor/${doctorDetails?.id}`,
          },
        ]}
      />
      <div className="flex flex-col items-center p-4 border rounded-lg bg-gray-800 text-white shadow-md w-full mx-auto">
        <div className="flex items-center justify-center h-6 w-6 bg-indigo-100 rounded-full mb-2">
          <FaInfo className="h-4 w-4 text-indigo-500" />
        </div>
        <div className="text-xl font-bold text-center text-white">
          Doctor Details
        </div>
        {doctorDetails ? (
          <div className="mt-4">
            <NextSeo
              title={`${doctorDetails?.title} ${doctorDetails?.name} - Details`}
              description={`${doctorDetails?.title} ${doctorDetails?.name} ${doctorDetails?.qualification} ${doctorDetails?.designation}`}
            />
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
                    <svg
                      className="w-3 h-3 mr-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <Link
                      href="/doctors"
                      className="ml-1 text-sm font-medium text-white hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                    >
                      Doctors
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="ml-1 text-sm font-medium text-white md:ml-2 dark:text-gray-400">
                      {doctorDetails?.title} {doctorDetails?.name}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <DoctorDetails doctorDetails={doctorDetails} />
          </div>
        ) : (
          <FaSpinner className="animate-spin h-8 w-8 text-indigo-500" />
        )}
      </div>
    </>
  );
}

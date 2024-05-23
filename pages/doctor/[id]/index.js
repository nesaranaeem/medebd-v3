import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSpinner, FaInfo, FaHome, FaChevronRight } from "react-icons/fa";
import { BreadcrumbJsonLd, NextSeo } from "next-seo";
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
      <div className="flex items-center justify-center h-20">
        <FaSpinner className="animate-spin h-8 w-8 text-indigo-500" />
      </div>
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
      <NextSeo
        title={`${doctorDetails?.title} ${doctorDetails?.name} - Details`}
        description={`${doctorDetails?.title} ${doctorDetails?.name} ${doctorDetails?.qualification} ${doctorDetails?.designation}`}
      />
      <div className="container mx-auto p-4">
        <div className="bg-gray-100 p-4 border rounded-lg shadow-md text-black mb-4">
          <h1 className="text-xl font-bold text-center mb-4 flex items-center justify-center">
            <FaInfo className="mr-2 text-indigo-500" />
            Doctor Details
          </h1>
          <nav
            className="flex mb-4 px-5 py-3 bg-gray-600 text-white rounded-lg max-w-full overflow-auto"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  passHref
                  className="inline-flex items-center text-sm font-medium text-white hover:text-blue-600"
                >
                  <FaHome className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <FaChevronRight className="w-3 h-3 mx-1 text-white" />
                  <Link
                    href="/doctors"
                    passHref
                    className="ml-1 text-sm font-medium text-white hover:text-blue-600 md:ml-2"
                  >
                    Doctors
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <FaChevronRight className="w-3 h-3 mx-1 text-white" />
                  <span className="ml-1 text-sm font-medium text-white md:ml-2">
                    {doctorDetails?.title} {doctorDetails?.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <DoctorDetails doctorDetails={doctorDetails} />
        </div>
      </div>
    </>
  );
}

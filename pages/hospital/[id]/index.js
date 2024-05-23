import { useEffect, useState } from "react";
import { FaSpinner, FaHome, FaChevronRight, FaInfo } from "react-icons/fa";
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
      <div className="flex items-center justify-center h-20">
        <FaSpinner className="animate-spin h-8 w-8 text-indigo-500" />
      </div>
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
          <div className="container mx-auto p-4">
            <div className="bg-gray-100 p-4 border rounded-lg shadow-md text-black mb-4">
              <h1 className="text-xl font-bold text-center mb-4 flex items-center justify-center">
                <FaInfo className="mr-2 text-indigo-500" />
                Hospital Details
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
                        href="/hospitals"
                        passHref
                        className="ml-1 text-sm font-medium text-white hover:text-blue-600 md:ml-2"
                      >
                        Hospitals
                      </Link>
                    </div>
                  </li>
                  <li aria-current="page">
                    <div className="flex items-center">
                      <FaChevronRight className="w-3 h-3 mx-1 text-white" />
                      <span className="ml-1 text-sm font-medium text-white md:ml-2">
                        {hospitalDetails?.name}
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
              <HospitalDetails hospitalDetails={hospitalDetails} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

import React, { useState } from "react";
import Link from "next/link";
import {
  FaInfo,
  FaPrescriptionBottleMedical,
  FaBuildingCircleCheck,
  FaBox,
  FaLungs,
  FaMoneyBill1Wave,
  FaSuperpowers,
  FaSpinner,
  FaHouse,
  FaArrowRight,
} from "react-icons/fa6";
import { BreadcrumbJsonLd, ImageJsonLd, NextSeo } from "next-seo";
import Image from "next/image";
import GenericDetails from "./GenericDetails";

const MedicineDetails = ({ details, imageData }) => {
  const [loadingImage, setLoadingImage] = useState(true);

  const handleImageLoad = () => {
    setLoadingImage(false);
  };

  if (!details) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
        <FaSpinner className="animate-spin h-8 w-8 text-blue-500" />
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <BreadcrumbJsonLd
        itemListElements={[
          { position: 1, name: "Home", item: "https://medebd.com/" },
          {
            position: 2,
            name: "Medicines",
            item: "https://medebd.com/medicines",
          },
          {
            position: 3,
            name: `${details?.brand_name} ${details?.form} ${details?.strength}`,
            item: `https://medebd.com/medicine/${details?.brand_name
              ?.toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}-${details?.brand_id}`,
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Drug",
            name: `${details?.brand_name}`,
            description: `${details?.brand_name} ${details?.form} ${
              details?.strength
            } Price is ${
              details?.price
            } BDT. ${details?.generic_details?.[0]?.indication?.slice(0, 140)}`,
            url: `https://medebd.com/medicine/${details?.brand_name
              ?.toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}-${details?.brand_id}`,
            brand: {
              "@type": "Brand",
              name: `${details?.company_name}`,
            },
            dosageForm: `${details?.form}`,
            activeIngredient: `${details?.strength}`,
            offers: details?.price
              ? {
                  "@type": "Offer",
                  priceCurrency: "BDT",
                  price: `${details?.price}`,
                }
              : null,
            category: `${details?.generic_details?.[0]?.generic_name}`,
            image: imageData?.status
              ? imageData?.imageURL
              : "https://res.cloudinary.com/draz5dcbl/image/upload/v1695152475/medicine.png",
          }),
        }}
      />

      <NextSeo
        title={`${details?.brand_name} ${details?.form} ${details?.strength} - Indications | Doses | Pharmacology | Side Effects And More`}
        description={`${details?.brand_name} ${details?.form} ${
          details?.strength
        } Price is ${
          details?.price
        } BDT. ${details?.generic_details?.[0]?.indication?.slice(0, 140)}`}
        openGraph={{
          images: [
            {
              url: imageData?.imageURL,
              width: 300,
              height: 200,
            },
          ],
        }}
      />

      <div className="flex flex-col items-center p-4 border rounded-lg bg-gray-100 text-gray-800 shadow-md w-full mx-auto">
        <div className="flex items-center justify-center h-6 w-6 bg-blue-100 rounded-full mb-2">
          <FaInfo className="h-4 w-4 text-blue-500" />
        </div>
        <div className="text-xl font-bold text-center text-gray-800">
          <h1>Medicine Details</h1>
        </div>

        <div className="mt-4">
          {imageData?.status && (
            <>
              <ImageJsonLd url={imageData?.imageURL} width={300} height={200} />
            </>
          )}

          <nav
            className="flex my-2 px-5 py-3 bg-gray-200 text-gray-800 rounded-lg mx-auto w-full md:w-6/12"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-gray-800 hover:text-blue-600"
                >
                  <FaHouse className="w-4 h-4 mr-1" />
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <FaArrowRight className="w-3 h-3 mx-1 text-gray-800" />
                  <Link
                    href="/medicines"
                    className="ml-1 text-sm font-medium text-gray-800 hover:text-blue-600"
                  >
                    Medicines
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <FaArrowRight className="w-3 h-3 mx-1 text-gray-800" />
                  <span className="ml-1 text-sm font-medium text-gray-800 md:ml-2">
                    {details?.strength
                      ? `${details?.brand_name} ${details?.form} - ${details?.strength}`
                      : `${details?.brand_name} ${details?.form}`}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="bg-gray-200 mx-auto shadow p-5 border border-gray-300 rounded-lg md:w-4/5">
            <h1 className="text-lg md:text-2xl text-center font-bold text-gray-800 mb-2 md:mb-2">
              {details?.strength
                ? `${details?.brand_name} ${details?.form} - ${details?.strength}`
                : `${details?.brand_name} ${details?.form}`}
            </h1>

            {imageData?.status && (
              <div className="relative">
                {loadingImage && (
                  <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
                    <FaSpinner className="animate-spin h-8 w-8 text-blue-500" />
                  </div>
                )}
                <Image
                  src={imageData?.imageURL}
                  alt={`${details?.brand_name} ${details?.strength}`}
                  width={300}
                  height={200}
                  layout="fixed"
                  className="mx-auto object-cover rounded-lg mb-2"
                  onLoad={handleImageLoad}
                />
              </div>
            )}

            <div className="space-y-2 md:space-y-3 text-gray-800">
              <div className="flex items-center border-2 border-gray-300 p-3">
                <FaPrescriptionBottleMedical className="text-yellow-600 md:text-lg" />
                <span className="font-bold ml-3">Form:</span>
                <span className="font-sans text-base md:text-lg ml-1">
                  {details?.form}
                </span>
              </div>

              <div className="flex items-center border-2 border-gray-300 p-3">
                <FaLungs className="text-purple-600 md:text-lg" />
                <span className="font-bold ml-3">Generic:</span>
                <Link
                  href={`/medicines/generics/${parseInt(
                    details?.generic_details?.[0]?.generic_id
                  )}`}
                  className="text-blue-600 hover:text-blue-800 underline ml-1"
                >
                  <span className="font-sans text-base md:text-lg">
                    {details?.generic_details?.[0]?.generic_name}
                  </span>
                </Link>
              </div>

              <div className="flex items-center border-2 border-gray-300 p-3">
                <FaBox className="text-green-600 md:text-lg" />
                <span className="font-bold ml-3">Pack Size:</span>
                <span className="font-sans text-base md:text-lg ml-1">
                  {details?.packsize?.length === 0
                    ? "TBA"
                    : `${details?.packsize}`}
                </span>
              </div>

              <div className="flex items-center border-2 border-gray-300 p-3">
                <FaBuildingCircleCheck className="text-blue-600 md:text-lg" />
                <span className="font-bold ml-3">Company:</span>
                <span className="font-sans text-base md:text-lg">
                  {details?.company_name}
                </span>
              </div>

              <div className="flex items-center border-2 border-gray-300 p-3">
                <FaMoneyBill1Wave className="text-pink-600 md:text-lg" />
                <span className="font-bold ml-3">Unit Price:</span>
                <span className="font-sans text-base md:text-lg ml-1">
                  {details?.price?.length === 0
                    ? "TBA"
                    : `BDT ${details?.price}`}
                </span>
              </div>

              <div className="flex items-center border-2 border-gray-300 p-3">
                <FaSuperpowers className="text-purple-600 md:text-lg" />
                <span className="font-bold ml-3">Strength:</span>
                <span className="font-sans text-base md:text-lg ml-1">
                  {details?.strength}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 mx-auto shadow p-4 my-3 w-full">
            <div className="space-y-2 md:space-y-3 text-gray-800">
              {details?.generic_details?.map((generic, index) => (
                <GenericDetails generic={generic} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicineDetails;

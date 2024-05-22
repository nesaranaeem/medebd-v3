import React from "react";
import Link from "next/link";
import {
  FaUserMd,
  FaBuilding,
  FaGraduationCap,
  FaInfoCircle,
} from "react-icons/fa";

const DoctorCard = ({ doctor }) => {
  const link = `/doctor/${doctor?.id}`;
  const name = doctor?.name;
  const truncatedName = name?.length > 25 ? name.slice(0, 25) + "..." : name;
  const designation = doctor?.designation;
  const truncatedDesignation =
    designation?.length > 25 ? designation.slice(0, 25) + "..." : designation;
  const qualification = doctor?.qualification;
  const truncatedQualification =
    qualification?.length > 25
      ? qualification.slice(0, 25) + "..."
      : qualification;
  const doctorOrganizationName = doctor?.doctorOrganizationName;
  const truncatedDoctorOrganizationName =
    doctorOrganizationName?.length > 25
      ? doctorOrganizationName.slice(0, 25) + "..."
      : doctorOrganizationName;
  const specialityNameBangla = doctor?.specialityNameBangla;
  const truncatedSpecialityNameBangla =
    specialityNameBangla?.length > 25
      ? specialityNameBangla.slice(0, 25) + "..."
      : specialityNameBangla;
  const specialityName = doctor?.specialityName;
  const truncatedSpecialityName =
    specialityName?.length > 25
      ? specialityName.slice(0, 25) + "..."
      : specialityName;

  return (
    <div className="border border-gray-700 rounded-lg bg-gray-800 text-white shadow-md hover:bg-gray-900 p-4">
      <div className="flex items-center mb-2">
        <FaUserMd className="h-6 w-6 mr-2" />
        <h2 className="text-xl font-semibold" title={truncatedName}>
          {doctor?.title} {truncatedName}
        </h2>
      </div>
      <div className="mb-2 flex items-center border-2 border-gray-500 p-1">
        <FaInfoCircle className="h-4 w-4 mr-2" />
        <p>{truncatedDesignation}</p>
      </div>
      <div className="mb-2 flex items-center border-2 border-gray-500 p-1">
        <FaGraduationCap className="h-4 w-4 mr-2" />
        <p>{truncatedQualification}</p>
      </div>
      <div className="mb-2 flex items-center border-2 border-gray-500 p-1">
        <FaBuilding className="h-4 w-4 mr-2" />
        <p title={doctorOrganizationName}>{truncatedDoctorOrganizationName}</p>
      </div>
      <div className="mb-4 flex items-center border-2 border-gray-500 p-1">
        <FaBuilding className="h-4 w-4 mr-2" />
        <p title={specialityNameBangla}>{truncatedSpecialityNameBangla}</p>
      </div>
      <div className="mb-4 flex items-center border-2 border-gray-500 p-1">
        <FaBuilding className="h-4 w-4 mr-2" />
        <p title={specialityName}>{truncatedSpecialityName}</p>
      </div>
      <Link
        href={link}
        className="block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
      >
        View Details
      </Link>
    </div>
  );
};

export default DoctorCard;

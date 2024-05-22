// components/HospitalCard.js
import React from "react";
import Link from "next/link";
import { FaBuilding, FaMap } from "react-icons/fa";

const HospitalCard = ({ hospital }) => {
  const link = `/hospital/${hospital?.id}`;
  const name = hospital?.name;
  const truncatedName = name?.length > 25 ? name.slice(0, 25) + "..." : name;
  const address = hospital?.address;
  const type = hospital?.type;

  return (
    <div className="border border-gray-300 rounded-lg bg-white text-gray-900 shadow-md hover:bg-gray-100 p-4">
      <div className="flex items-center mb-2">
        <FaBuilding className="h-6 w-6 mr-2 text-blue-600" />
        <h2 className="text-xl font-semibold" title={name}>
          {truncatedName}
        </h2>
      </div>
      <div className="mb-2 flex items-center border border-gray-300 p-2 rounded">
        <FaBuilding className="h-4 w-4 mr-2 text-purple-600" />
        <p>{type}</p>
      </div>
      <div className="mb-2 flex items-center border border-gray-300 p-2 rounded">
        <FaMap className="h-4 w-4 mr-2 text-green-600" />
        <p>{address}</p>
      </div>
      <Link
        href={link}
        className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center"
      >
        View Details
      </Link>
    </div>
  );
};

export default HospitalCard;

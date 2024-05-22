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
    <div className="border border-gray-700 rounded-lg bg-gray-800 text-white shadow-md hover:bg-gray-900 p-4">
      <div className="flex items-center mb-2">
        <FaBuilding className="h-6 w-6 mr-2" />
        <h2 className="text-xl font-semibold" title={truncatedName}>
          {truncatedName}
        </h2>
      </div>
      <div className="mb-2 flex items-center border-2 border-gray-500 p-1">
        <FaBuilding className="h-4 w-4 mr-2" />
        <p>{type}</p>
      </div>
      <div className="mb-2 flex items-center border-2 border-gray-500 p-1">
        <FaMap className="h-4 w-4 mr-2" />
        <p>{address}</p>
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

export default HospitalCard;

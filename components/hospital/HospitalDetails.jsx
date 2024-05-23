import { FaBuilding, FaMapMarkerAlt, FaPhone, FaStar } from "react-icons/fa";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), { ssr: false });

const HospitalDetails = ({ hospitalDetails }) => {
  const {
    name,
    address,
    type,
    contact,
    specialty,
    areaName,
    districtName,
    latitude,
    longitude,
  } = hospitalDetails;

  return (
    <div className="bg-white mx-auto border border-gray-200 rounded-lg shadow p-4 max-w-md">
      <h1 className="text-lg md:text-2xl text-center font-bold text-black mb-2 md:mb-4">
        {name}
      </h1>
      {latitude && longitude && (

          
          
          
        
<div className="mb-4">
  <div className="mb-2 flex items-center bg-green-600 p-2 rounded-xl">
    <FaMapMarkerAlt className="mr-3 text-white text-lg" />
    <h2 className="font-bold text-white">Maps:</h2>
  </div>
  <Map latitude={latitude} longitude={longitude} />
</div>

)}
      <div className="space-y-4">
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-blue-600 p-2 rounded-xl">
            <FaBuilding className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">Type:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-blue-100 p-4 rounded-xl text-gray-800">
            {type}
          </div>
        </div>
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-purple-600 p-2 rounded-xl">
            <FaStar className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">Specialty:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-purple-100 p-4 rounded-xl text-gray-800">
            {specialty}
          </div>
        </div>
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-yellow-600 p-2 rounded-xl">
            <FaMapMarkerAlt className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">Address:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-yellow-100 p-4 rounded-xl text-gray-800">
            {address}
          </div>
        </div>
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-red-600 p-2 rounded-xl">
            <FaMapMarkerAlt className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">Area:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-red-100 p-4 rounded-xl text-gray-800">
            {areaName}
          </div>
        </div>
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-green-600 p-2 rounded-xl">
            <FaMapMarkerAlt className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">District:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-green-100 p-4 rounded-xl text-gray-800">
            {districtName}
          </div>
        </div>
        {contact && (
          <div className="p-4 shadow-xl transition">
            <div className="flex items-center bg-teal-600 p-2 rounded-xl">
              <FaPhone className="mr-3 text-white text-lg" />
              <h2 className="font-bold text-white">Contact:</h2>
            </div>
            <div className="text-base font-medium mt-2 bg-teal-100 p-4 rounded-xl text-gray-800">
              {contact}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default HospitalDetails;

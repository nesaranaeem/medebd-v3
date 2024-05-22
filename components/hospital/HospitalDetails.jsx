import { FaBuilding, FaMapMarkerAlt, FaPhone, FaStar } from "react-icons/fa";

const HospitalDetails = ({ hospitalDetails }) => {
  const { name, address, type, contact, specialty } = hospitalDetails;

  return (
    <>
      <div className="bg-gray-800 mx-auto border border-gray-200 rounded-lg shadow p-4 max-w-md">
        <h1 className="text-lg md:text-2xl text-center font-bold text-white mb-2 md:mb-4">
          {name}
        </h1>
        <div className="flex items-center border-2 border-gray-500 p-3">
          <FaBuilding className="text-purple-400 md:text-lg" />
          <span className="font-bold ml-3">Type:</span>
          <span className="font-sans text-base md:text-lg ml-1">{type}</span>
        </div>
        <div className="flex items-center border-2 border-gray-500 p-3">
          <FaStar className="text-purple-400 md:text-lg" />
          <span className="font-bold ml-3">Specialty:</span>
          <span className="font-sans text-base md:text-lg ml-1">
            {specialty}
          </span>
        </div>
        <div className="flex items-center border-2 border-gray-500 p-3">
          <FaMapMarkerAlt className="text-purple-400 md:text-lg" />
          <span className="font-bold ml-3">Address:</span>
          <span className="font-sans text-base md:text-lg ml-1">{address}</span>
        </div>
        {contact && (
          <div className="flex items-center border-2 border-gray-500 p-3">
            <FaPhone className="text-purple-400 md:text-lg" />
            <span className="font-bold ml-3">Contact:</span>
            <span className="font-sans text-base md:text-lg ml-1">
              {contact}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default HospitalDetails;

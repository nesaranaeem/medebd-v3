import {
  FaBuildingCircleArrowRight,
  FaCircleUser,
  FaMagnifyingGlassArrowRight,
  FaMagnifyingGlassPlus,
  FaStar,
} from "react-icons/fa6";
const DoctorDetails = ({ doctorDetails }) => {
  return (
    <>
      <div className="bg-gray-800 mx-auto border border-gray-200 rounded-lg shadow p-4 max-w-md">
        <>
          <h1 className="text-lg md:text-2xl text-center font-bold text-white mb-2 md:mb-4">
            {doctorDetails?.title} {doctorDetails?.name}
          </h1>
          <div className="flex items-center border-2 border-gray-500 p-3">
            <span className="font-sans text-base md:text-lg ml-1">
              {doctorDetails.qualification}
            </span>
          </div>
          <div className="space-y-2 md:space-y-3 text-white">
            <div className="flex items-center border-2 border-gray-500 p-3">
              <FaCircleUser className="text-purple-400 md:text-lg" />
              <span className="font-bold ml-3">Gender:</span>
              <span className="font-sans text-base md:text-lg ml-1">
                {doctorDetails.gender}
              </span>
            </div>
            <div className="flex items-center border-2 border-gray-500 p-3">
              <FaStar className="text-purple-400 md:text-lg" />
              <span className="font-bold ml-3">Title:</span>
              <span className="font-sans text-base md:text-lg ml-1">
                {doctorDetails.title}
              </span>
            </div>
            <div className="flex items-center border-2 border-gray-500 p-3">
              <FaMagnifyingGlassPlus className="text-purple-400 md:text-lg" />
              <span className="font-bold ml-3">Designation:</span>
              <span className="font-sans text-base md:text-lg ml-1">
                {doctorDetails.designation}
              </span>
            </div>

            <div className="flex items-center border-2 border-gray-500 p-3">
              <FaBuildingCircleArrowRight className="text-purple-400 md:text-lg" />
              <span className="font-bold ml-3">Organization:</span>

              <span className="font-sans text-base md:text-lg">
                {doctorDetails.doctorOrganizationName}
              </span>
            </div>
            <div className="flex items-center border-2 border-gray-500 p-3">
              <FaMagnifyingGlassArrowRight className="text-purple-400 md:text-lg" />
              <span className="font-bold ml-3">Speciality:</span>
              <span className="font-sans text-base md:text-lg ml-1">
                {doctorDetails.specialityName}
              </span>
            </div>
            <div className="flex items-center border-2 border-gray-500 p-3">
              <FaMagnifyingGlassArrowRight className="text-purple-400 md:text-lg" />
              <span className="font-bold ml-3">বিশেষত্ব:</span>
              <span className="font-sans text-base md:text-lg ml-1">
                {doctorDetails.specialityNameBangla}
              </span>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default DoctorDetails;

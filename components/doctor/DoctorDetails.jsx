import {
  FaBuilding,
  FaHospitalUser,
  FaGraduationCap,
  FaCircleInfo,
  FaStar,
} from "react-icons/fa6";

const DoctorDetails = ({ doctorDetails }) => {
  return (
    <div className="bg-white mx-auto border border-gray-200 rounded-lg shadow p-4 max-w-md">
      <h1 className="text-lg md:text-2xl text-center font-bold text-black mb-2 md:mb-4">
        {doctorDetails?.title} {doctorDetails?.name}
      </h1>
      <div className="space-y-4">
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-blue-600 p-2 rounded-xl">
            <FaGraduationCap className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">Qualification:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-blue-100 p-4 rounded-xl text-gray-800">
            {doctorDetails?.qualification}
          </div>
        </div>
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-purple-600 p-2 rounded-xl">
            <FaHospitalUser className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">Gender:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-purple-100 p-4 rounded-xl text-gray-800">
            {doctorDetails?.gender}
          </div>
        </div>
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-yellow-600 p-2 rounded-xl">
            <FaStar className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">Title:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-yellow-100 p-4 rounded-xl text-gray-800">
            {doctorDetails?.title}
          </div>
        </div>
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-red-600 p-2 rounded-xl">
            <FaCircleInfo className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">Designation:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-red-100 p-4 rounded-xl text-gray-800">
            {doctorDetails?.designation}
          </div>
        </div>
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-green-600 p-2 rounded-xl">
            <FaBuilding className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">Organization:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-green-100 p-4 rounded-xl text-gray-800">
            {doctorDetails?.doctorOrganizationName}
          </div>
        </div>
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-teal-600 p-2 rounded-xl">
            <FaCircleInfo className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">Speciality:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-teal-100 p-4 rounded-xl text-gray-800">
            {doctorDetails?.specialityName}
          </div>
        </div>
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-teal-600 p-2 rounded-xl">
            <FaCircleInfo className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">বিশেষত্ব:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-teal-100 p-4 rounded-xl text-gray-800">
            {doctorDetails?.specialityNameBangla}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;

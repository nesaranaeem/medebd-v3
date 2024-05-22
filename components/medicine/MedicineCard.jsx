import Link from "next/link";
import {
  FaPills,
  FaBuilding,
  FaMoneyBillWave,
  FaInfoCircle,
} from "react-icons/fa";

const MedicineCard = ({ medicine }) => {
  const formattedName = medicine?.brand_name
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  const link = `/medicine/${formattedName}-${medicine?.brand_id}`;
  const brandName = medicine?.brand_name;
  const truncatedBrandName =
    brandName?.length > 34 ? brandName.slice(0, 34) + "..." : brandName;
  const genericName = medicine?.generic_details?.[0]?.generic_name;
  const truncatedGenericName =
    genericName?.length > 34 ? genericName.slice(0, 34) + "..." : genericName;

  const priceString = medicine?.price.replace(",", " and ৳");

  return (
    <div className="border border-gray-300 rounded-lg bg-white text-gray-900 shadow-md hover:bg-gray-100 p-4">
      <div className="flex items-center mb-2">
        <FaPills className="h-6 w-6 mr-2 text-blue-600" />
        <h2 className="text-xl font-semibold" title={brandName}>
          {truncatedBrandName}
        </h2>
      </div>
      <div className="mb-2 flex items-center border border-gray-300 p-2 rounded">
        <FaInfoCircle className="h-4 w-4 mr-2 text-yellow-600" />
        <p>{medicine?.form}</p>
      </div>
      <div className="mb-2 flex items-center border border-gray-300 p-2 rounded">
        <FaMoneyBillWave className="h-4 w-4 mr-2 text-green-600" />
        <p>
          <strong>Price:</strong> ৳{priceString}
        </p>
      </div>
      <div className="mb-2 flex items-center border border-gray-300 p-2 rounded">
        <FaBuilding className="h-4 w-4 mr-2 text-purple-600" />
        <p>
          <strong>Company:</strong> {medicine?.company_name}
        </p>
      </div>
      <div className="mb-4 flex items-center border border-gray-300 p-2 rounded">
        <FaPills className="h-4 w-4 mr-2 text-red-600" />
        <p>
          <strong>Generic:</strong>{" "}
          <span title={genericName}>{truncatedGenericName}</span>
        </p>
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

export default MedicineCard;

import React from "react";
import { IoMdInformationCircle } from "react-icons/io";

const formatText = (text) => {
  if (text.includes("● ")) {
    return (
      <ul className="list-disc list-inside">
        {text.split("● ").map((item, index) =>
          item.trim() ? (
            <li key={index} className="mt-1">
              {item.trim()}
            </li>
          ) : null
        )}
      </ul>
    );
  } else {
    return <p>{text}</p>;
  }
};

const GenericDetails = ({ generic }) => {
  return (
    <div className="space-y-4">
      {generic.indication && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-blue-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">General Indication:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-blue-100 p-4 rounded-xl text-gray-800">
            {formatText(generic.indication)}
          </div>
        </div>
      )}
      {generic.indication_bangla && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-blue-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">সাধারণ নির্দেশিকা:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-blue-100 p-4 rounded-xl text-gray-800">
            {formatText(generic.indication_bangla)}
          </div>
        </div>
      )}
      {generic.contra_indication && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-red-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">Contra Indication:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-red-100 p-4 rounded-xl text-gray-800">
            {formatText(generic.contra_indication)}
          </div>
        </div>
      )}
      {generic.contra_indication_bangla && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-red-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">প্রতিলক্ষণ:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-red-100 p-4 rounded-xl text-gray-800">
            {formatText(generic.contra_indication_bangla)}
          </div>
        </div>
      )}
      {generic.dose && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-green-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">Dose:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-green-100 p-4 rounded-xl text-gray-800">
            {formatText(generic.dose)}
            {generic.dose.includes("● ") ? null : (
              <i className="text-sm block mt-2">
                ** Take medicine as per doctor's guidelines
              </i>
            )}
          </div>
        </div>
      )}
      {generic.dose_bangla && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-green-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">ডোজ:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-green-100 p-4 rounded-xl text-gray-800">
            {formatText(generic.dose_bangla)}
            {generic.dose_bangla.includes("● ") ? null : (
              <i className="text-sm block mt-2">
                ** চিকিৎসকের পরামর্শ অনুযায়ী ঔষধ সেবন করুন
              </i>
            )}
          </div>
        </div>
      )}
      {generic.side_effect && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-yellow-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">Side Effect:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-yellow-100 p-4 rounded-xl text-gray-800">
            {formatText(generic.side_effect)}
          </div>
        </div>
      )}
      {generic.side_effect_bangla && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-yellow-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">পার্শ্ব প্রতিক্রিয়া:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-yellow-100 p-4 rounded-xl text-gray-800">
            {formatText(generic.side_effect_bangla)}
          </div>
        </div>
      )}
      {generic.overdose && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-purple-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">Overdose:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-purple-100 p-4 rounded-xl text-gray-800">
            {formatText(generic.overdose)}
          </div>
        </div>
      )}
      {generic.precaution && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-teal-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">Precaution:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-teal-100 p-4 rounded-xl text-gray-800">
            {formatText(generic.precaution)}
          </div>
        </div>
      )}
      {generic.precaution_bangla && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-teal-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">সতর্কতা:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-teal-100 p-4 rounded-xl text-gray-800">
            {formatText(generic.precaution_bangla)}
          </div>
        </div>
      )}
      {generic.pregnancy_category && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-pink-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">Pregnancy Category:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-pink-100 p-4 rounded-xl text-gray-800">
            {formatText(generic.pregnancy_category)}
          </div>
        </div>
      )}
      {generic.pregnancy_category_bangla && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-pink-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <h2 className="font-bold text-white">গর্ভকালীন অবস্থা:</h2>
          </div>
          <div className="text-base font-medium mt-2 bg-pink-100 p-4 rounded-xl text-gray-800">
            {formatText(generic.pregnancy_category_bangla)}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericDetails;

"use client"; // This is a client component 👈🏽
import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import {
  FaPills,
  FaBuildingCircleCheck,
  FaCapsules,
  FaUserDoctor,
  FaHospital,
} from "react-icons/fa6";
import CountUp from "react-countup";
import { apiBaseURL } from "@/utils/api/Api";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";

// Define the Statistics component
const Statistics = () => {
  const [statisticsData, setStatisticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const apikey = process.env.NEXT_PUBLIC_API_KEY;
        const response = await fetch(
          `${apiBaseURL}version/statistics?apikey=${apikey}`
        );
        const data = await response.json();

        if (data.status && data.details.length > 0) {
          setStatisticsData(data.details[0]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const [counts, setCounts] = useState({
    medicineCount: 0,
    companyCount: 0,
    genericCount: 0,
    doctorCount: 0,
    hospitalCount: 0,
  });

  useEffect(() => {
    if (statisticsData) {
      setCounts({
        medicineCount: statisticsData.totalMedicine,
        companyCount: statisticsData.totalMedicineCompanyName,
        genericCount: statisticsData.totalMedicineGeneric,
        doctorCount: statisticsData.totalDoctors,
        hospitalCount: statisticsData.totalHospitals,
      });
    }
  }, [statisticsData]);

  const renderStatistics = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (statisticsData) {
      return (
        <div className="p-2 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
          {renderStatisticCard(
            "Medicines",
            counts.medicineCount,
            <FaPills className="h-10 w-10 text-indigo-500" />
          )}
          {renderStatisticCard(
            "Companies",
            counts.companyCount,
            <FaBuildingCircleCheck className="h-8 w-8 text-indigo-500" />
          )}
          {renderStatisticCard(
            "Generics",
            counts.genericCount,
            <FaCapsules className="h-8 w-8 text-indigo-500" />
          )}
          {renderStatisticCard(
            "Doctors",
            counts.doctorCount,
            <FaUserDoctor className="h-8 w-8 text-indigo-500" />
          )}
          {renderStatisticCard(
            "Hospitals",
            counts.hospitalCount,
            <FaHospital className="h-8 w-8 text-indigo-500" />
          )}
        </div>
      );
    }

    return (
      <div className="text-red-600 font-medium">Failed to fetch statistics</div>
    );
  };

  const renderStatisticCard = (title, value, icon) => (
    <div className="flex flex-col items-center p-4 border rounded-lg bg-gray-800 text-white shadow-md hover:bg-gray-900 w-9/12 lg:w-full md:w-full xl:w-full mx-auto">
      <div className="flex items-center justify-center h-12 w-12 bg-indigo-100 rounded-full mb-4">
        {icon}
      </div>
      <div className="text-4xl font-bold text-center text-white">
        <CountUp start={0} end={value} duration={2} separator="," />
      </div>
      <div className="text-lg text-center font-medium text-white">{title}</div>
    </div>
  );

  return (
    <div className="relative">
      <Transition
        show={isLoading}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-70">
          <LoadingSpinner />
        </div>
      </Transition>
      {renderStatistics()}
    </div>
  );
};

export default Statistics;

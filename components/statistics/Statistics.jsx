"use client"; // This is a client component 👈🏽
// Import the required modules
import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import {
  FaPills,
  FaBuildingCircleCheck,
  FaCapsules,
  FaUserDoctor,
  FaHospital,
  FaArrowsSpin,
} from "react-icons/fa6";
import CountUp from "react-countup";
import { apiBaseURL } from "@/utils/api/Api";

// Define the Statistics component
const Statistics = () => {
  // State to hold the statistics data and loading status
  const [statisticsData, setStatisticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the statistics data when the component mounts
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

  // State variables for the count-up animation
  const [medicineCount, setMedicineCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [genericCount, setGenericCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [hospitalCount, setHospitalCount] = useState(0);

  // Update the state variables with the statistics data when available
  useEffect(() => {
    if (statisticsData) {
      setMedicineCount(statisticsData.totalMedicine);
      setCompanyCount(statisticsData.totalMedicineCompanyName);
      setGenericCount(statisticsData.totalMedicineGeneric);
      setDoctorCount(statisticsData.totalDoctors);
      setHospitalCount(statisticsData.totalHospitals);
    }
  }, [statisticsData]);

  // Function to render the statistics cards
  const renderStatistics = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-12">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-indigo-500"></div>
        </div>
      );
    }

    if (statisticsData) {
      return (
        <div className="p-2 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 ">
          {renderStatisticCard(
            "Medicines",
            medicineCount,
            <FaPills className="h-10 w-10 text-indigo-500" />
          )}
          {renderStatisticCard(
            "Companies",
            companyCount,
            <FaBuildingCircleCheck className="h-8 w-8 text-indigo-500" />
          )}
          {renderStatisticCard(
            "Generics",
            genericCount,
            <FaCapsules className="h-8 w-8 text-indigo-500" />
          )}
          {renderStatisticCard(
            "Doctors",
            doctorCount,
            <FaUserDoctor className="h-8 w-8 text-indigo-500" />
          )}
          {renderStatisticCard(
            "Hospitals",
            hospitalCount,
            <FaHospital className="h-8 w-8 text-indigo-500" />
          )}
        </div>
      );
    }

    return (
      <div className="text-red-600 font-medium">Failed to fetch statistics</div>
    );
  };

  // Function to render a single statistic card
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
      {/* Loader */}
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
          <FaArrowsSpin className="h-16 w-16 animate-spin text-white" />
        </div>
      </Transition>

      {/* Statistics */}
      {renderStatistics()}
    </div>
  );
};

export default Statistics;

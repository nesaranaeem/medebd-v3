// components/spinners/LoadingSpinner.js
import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <FaSpinner className="animate-spin w-8 h-8 text-blue-800" role="status" />
  </div>
);

export default LoadingSpinner;

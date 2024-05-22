import React, { useState } from "react";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("cm");
  const [age, setAge] = useState("");
  const [bmi, setBMI] = useState(null);

  const calculateBMI = () => {
    if (weight && height) {
      let heightInMeters;
      if (unit === "cm") {
        heightInMeters = height / 100;
      } else {
        heightInMeters = height * 0.3048;
      }
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBMI(bmiValue.toFixed(2));
    } else {
      setBMI(null);
    }
  };

  const getBMIReference = () => {
    if (bmi !== null) {
      if (bmi < 18.5) {
        return "Underweight";
      } else if (bmi >= 18.5 && bmi < 24.9) {
        return "Normal weight";
      } else if (bmi >= 25 && bmi < 29.9) {
        return "Overweight";
      } else {
        return "Obese";
      }
    }
    return "";
  };

  return (
    <div className="bg-gray-800 mx-auto border border-gray-200 rounded-lg shadow p-4 w-full">
      <h1 className="text-lg md:text-2xl text-center font-bold text-white mb-2 md:mb-4">
        BMI Calculator
      </h1>
      <div className="space-y-2 md:space-y-3 text-white">
        <div className="flex items-center border-2 border-gray-500 p-3">
          <label htmlFor="weight" className="font-bold ml-3">
            Weight (kg):
          </label>
          <input
            type="number"
            id="weight"
            className="font-sans text-base md:text-lg ml-1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="flex items-center border-2 border-gray-500 p-3">
          <label htmlFor="height" className="font-bold ml-3">
            Height:
          </label>
          <input
            type="number"
            id="height"
            className="font-sans text-base md:text-lg ml-1"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <select
            id="unit"
            className="ml-2 font-sans text-base md:text-lg"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="cm">cm</option>
            <option value="ft">ft</option>
          </select>
        </div>
        <div className="flex items-center border-2 border-gray-500 p-3">
          <label htmlFor="age" className="font-bold ml-3">
            Age:
          </label>
          <input
            type="number"
            id="age"
            className="font-sans text-base md:text-lg ml-1"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="flex items-center border-2 border-gray-500 p-3">
          <button
            onClick={calculateBMI}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
          >
            Calculate BMI
          </button>
          {bmi !== null && (
            <span className="font-sans text-base md:text-lg ml-3">
              Your BMI: {bmi} ({getBMIReference()})
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;

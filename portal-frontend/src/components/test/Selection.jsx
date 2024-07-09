import React from "react";
import { useState } from "react";
import departments from "./Department";
import Semester from "./Semester";
import admissionYear from "./AdmissionYear";
import admissionCategory from "./Caste";
import Caste from "./Caste";
import Gender from "./Gender";
export default function Selection({ value, onDepartmentChange }) {
  const [selectedDepartment, setSelectedDepartment] = useState("");

  let data;
  if (value == "Semester") {
    data = Semester;
  }

  if (value == "Department") {
    data = departments;
  }

  if (value == "Admission year") {
    const currentDate=new Date()
    // Calculate the year 20 years ago
    const year20YearsAgo = currentDate.getFullYear() - 20;

    // Create an array to store the years
    const years = [];
    let i=0
    // Loop to get all the years in the interval
    for (let year = currentDate.getFullYear(); year >= year20YearsAgo; year--) {
      years.push({
        name: year,
        id:i
      });
      i++
    }
    console.log(years)
    data = years;
  }

  if (value == "Caste") {
    data = Caste;
  }

  if (value == "Gender") {
    data = Gender;
  }

  if (value == "Admission Category") {
    data = admissionCategory;
  }
  const handleChange = (event) => {
    const newDepartment = event.target.value;
    setSelectedDepartment(newDepartment);

    // Call the callback function to send the value to the parent component
    if (typeof onDepartmentChange === "function") {
      onDepartmentChange(newDepartment);
    }
  };

  {
    return (
      <>
        <div className="mb-3 mt-0 w-full max-w-xs">
          {/* <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a Department</label> */}
          <select
            id="selection"
            value={selectedDepartment}
            onChange={handleChange}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose {value}</option>

            {data.map((department, id) => (
              <option key={id} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }
}

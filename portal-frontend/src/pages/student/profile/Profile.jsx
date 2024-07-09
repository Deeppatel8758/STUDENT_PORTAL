import React, { useEffect, useState } from "react";
import { User, GraduationCap, Construction } from "lucide-react";
import endPoints from "../../../NetworkRoutes";
import axios from "axios";

export default function Profile() {
  const [studentDetails, setStudentDetails] = useState({
    enrollment: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    dob: "",
    bloodGroup: "",
    gender: "",
    aadharCardNumber: "",
    voterIdNumber: "",
    religion: "",
    caste: "",
  });

  const [familyDetails, setFamilyDetails] = useState({
    fatherName: "",
    motherName: "",
    fatherOccupation: "",
    fatherContactNumber: "",
    officeAddress1: "",
    officeAddress2: "",
    officeCity: "",
    officeState: "",
    officeCountry: "",
    officePincode: "",
    motherOccupation: "",
    familyIncome: "",
  });

  const [address, setAddress] = useState({
    residentialAddress: "",
    residentialCity: "",
    residentialState: "",
    residentialCountry: "",
    residentialPincode: "",
    permanentAddress: "",
    permanentCity: "",
    permanentState: "",
    permanentCountry: "",
    permanentPincode: "",
  });

  const [educationDetails, setEducationDetails] = useState({
    hscYear: "",
    hscPercentage: "",
    sscYear: "",
    sscPercentage: "",
  });

  const [admissionDetails, setAdmissionDetails] = useState({
    course: "",
    branch: "",
    sem: "",
    admissionYear: "",
    admissionCategory: "",
  });

  const userData = JSON.parse(localStorage.getItem("User_State"));
  console.log(userData);

  const studentDetailsTitles = {
    enrollment: "Enrollment Number",
    firstName: "First Name",
    middleName: "Middle Name",
    lastName: "Last Name",
    email: "Email",
    contactNumber: "Contact Number",
    dob: "Date of Birth",
    bloodGroup: "Blood Group",
    gender: "Gender",
    aadharCardNumber: "Aadhar Card Number",
    voterIdNumber: "Voter ID Number",
    religion: "Religion",
    caste: "Caste",
  };

  const familyDetailsTitles = {
    fatherName: "Father Name",
    motherName: "Mother Name",
    fatherOccupation: "Father Occupation",
    fatherContactNumber: "Father Contact Number",
    officeAddress1: "Office Address 1",
    officeAddress2: "Office Address 2",
    officeCity: "Office City",
    officeState: "Office State",
    officeCountry: "Office Country",
    officePincode: "Office Pincode",
    motherOccupation: "Mother Occupation",
    familyIncome: "Family Income",
  };

  const addressTitles = {
    residentialAddress: "Residential Address",
    residentialCity: "Residential City",
    residentialState: "Residential State",
    residentialCountry: "Residential Country",
    residentialPincode: "Residential Pincode",
    permanentAddress: "Permanent Address",
    permanentCity: "Permanent City",
    permanentState: "Permanent State",
    permanentCountry: "Permanent Country",
    permanentPincode: "Permanent Pincode",
  };

  const educationDetailsTitles = {
    hscYear: "HSC Year",
    hscPercentage: "HSC Percentage",
    sscYear: "SSC Year",
    sscPercentage: "SSC Percentage",
  };

  const admissionDetailsTitles = {
    course: "Course",
    branch: "Branch",
    sem: "Semester",
    admissionYear: "Admission Year",
    admissionCategory: "Admission Category",
  };

  const getStudentData = async () => {
    try {
      const response = await axios.get(
        `${endPoints.getStudentDetails}/${userData.username}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      console.log(response.data);
      // Assuming the response.data has the structure as you provided
      const studentCollegeDetails = response.data.data.studentData.studentCollegeDetails;


      const isVerifiedByDept = studentCollegeDetails.verifiedDepartment;

      if(isVerifiedByDept==false){
              studentPersonalDetails ={

              };

              studentCollegeDetails ={

              };
              
      }
      const studentPersonalDetails = response.data.data.studentData.studentPersonalDetails;
      const profile=response.data.data.filesData[0]
      const signatureUrl=response.data.data.filesData[1]
      setStudentDetails({
        
        enrollment: studentCollegeDetails.enrollment,
        firstName: studentCollegeDetails.firstName,
        middleName: studentCollegeDetails.middleName,
        lastName: studentCollegeDetails.lastName,
        email: studentCollegeDetails.email,
        contactNumber: studentPersonalDetails.contactNumber,
        dob: studentPersonalDetails.dob,
        bloodGroup: studentPersonalDetails.bloodGroup,
        gender: studentCollegeDetails.gender,
        aadharCardNumber: studentPersonalDetails.aadhar,
        voterIdNumber: studentPersonalDetails.voterId,
        religion: studentCollegeDetails.religion,
        caste: studentCollegeDetails.caste,
      });

      setFamilyDetails({
        fatherName: studentPersonalDetails.fathername,
        motherName: studentPersonalDetails.mothername,
        fatherOccupation: studentPersonalDetails.fatheroccupation,
        fatherContactNumber: studentPersonalDetails.fathercontactNumber,
        officeAddress1: studentPersonalDetails.officeAdd1,
        officeAddress2: studentPersonalDetails.officeAdd2,
        officeCity: studentPersonalDetails.officeCity,
        officeState: studentPersonalDetails.officeState,
        officeCountry: studentPersonalDetails.officeCountry,
        officePincode: studentPersonalDetails.officePincode,
        motherOccupation: studentPersonalDetails.motheroccupation,
        familyIncome: studentPersonalDetails.familyincome,
      });

      setAddress({
        residentialAddress: studentPersonalDetails.residentalAddress,
        residentialCity: studentPersonalDetails.residentalCity,
        residentialState: studentPersonalDetails.residentalState,
        residentialCountry: studentPersonalDetails.reisentalCountry,
        residentialPincode: studentPersonalDetails.residentalPincode,
        permanentAddress: studentPersonalDetails.permanentAddress1,
        permanentCity: studentPersonalDetails.permanentCity,
        permanentState: studentPersonalDetails.permanentState,
        permanentCountry: studentPersonalDetails.permanentCountry,
        permanentPincode: studentPersonalDetails.permanentPincode,
      });

      setEducationDetails({
        hscYear: studentPersonalDetails.hscyear,
        hscPercentage: studentPersonalDetails.hscpr,
        sscYear: studentPersonalDetails.sscyear,
        sscPercentage: studentPersonalDetails.sscpr,
      });

      setAdmissionDetails({
        course: studentCollegeDetails.course,
        branch: studentCollegeDetails.branch,
        sem: studentCollegeDetails.semester,
        admissionYear: studentCollegeDetails.admissionYear,
        admissionCategory: studentCollegeDetails.admissionCategory,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <main>
      <div className="flex justify-center">
        <div className="px-4 bg-white my-5 mx-5 rounded-lg sm:px-6 lg:px-8 py-8 w-full max-w-9xl">
          {/* <div className="bg-gray-100"> */}
          <div className="container mx-auto">
            <div className="md:flex no-wrap">
              {/* <!-- Left Side --> */}
              <div className="w-full md:w-3/12 md:mr-2">
                {/* <!-- Profile Card --> */}
                <div className="bg-white p-3 border-2 rounded-lg border-gray-100">
                  <div className="image overflow-hidden">
                    <img
                      className="h-auto w-full mx-auto"
                      src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                      alt=""
                    />
                  </div>
                  <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                    {studentDetails.firstName} {studentDetails.lastName}
                  </h1>
                  <h3 className="text-gray-600 font-lg text-semibold leading-6">
                    {studentDetails.enrollment}
                  </h3>

                  <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                    <li className="flex items-center py-3">
                      <span>Academic Status</span>
                      <span className="ml-auto">
                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                          Studying
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span>Enrolled since</span>
                      <span className="ml-auto">
                        {" "}
                        {admissionDetails.admissionYear}
                      </span>
                    </li>
                  </ul>
                </div>
                {/* <!-- End of profile card --> */}
                <div className="my-4"></div>
              </div>
              {/* <!-- Right Side --> */}
              <div className="w-full h-full md:w-9/12">
                {/* <!-- Profile tab --> */}
                {/* <!-- Student details Section --> */}
                <div className="bg-gray-100 p-3 shadow-sm rounded-lg mb-4">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span className="tracking-wide">Personal Details</span>
                  </div>
                  <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 text-sm">
                      {Object.entries(studentDetails).map(([key, value]) => (
                        <div className="grid grid-cols-2" key={key}>
                          <div className="px-4 py-2 font-semibold">
                            {studentDetailsTitles[key]}:
                          </div>
                          <div className="px-4 py-2">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* <!-- Family details Section --> */}
                <div className="bg-gray-100 p-3 shadow-sm rounded-lg mb-4">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span className="tracking-wide">Family Details</span>
                  </div>
                  <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 text-sm">
                      {Object.entries(familyDetails).map(([key, value]) => (
                        <div className="grid grid-cols-2" key={key}>
                          <div className="px-4 py-2 font-semibold">
                            {familyDetailsTitles[key]}:
                          </div>
                          <div className="px-4 py-2">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* <!-- Address details Section --> */}
                <div className="bg-gray-100 p-3 shadow-sm rounded-lg mb-4">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span className="tracking-wide">Address</span>
                  </div>
                  <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 text-sm">
                      {Object.entries(address).map(([key, value]) => (
                        <div className="grid grid-cols-2" key={key}>
                          <div className="px-4 py-2 font-semibold">
                            {addressTitles[key]}:
                          </div>
                          <div className="px-4 py-2">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* <!-- Education details Section --> */}
                <div className="bg-gray-100 p-3 shadow-sm rounded-lg mb-4">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span className="tracking-wide">Education Details</span>
                  </div>
                  <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 text-sm">
                      {Object.entries(educationDetails).map(([key, value]) => (
                        <div className="grid grid-cols-2" key={key}>
                          <div className="px-4 py-2 font-semibold">
                            {educationDetailsTitles[key]}:
                          </div>
                          <div className="px-4 py-2">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* <!-- Admission details Section --> */}
                <div className="bg-gray-100 p-3 shadow-sm rounded-lg mb-4">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span className="tracking-wide">Admission Details</span>
                  </div>
                  <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 text-sm">
                      {Object.entries(admissionDetails).map(([key, value]) => (
                        <div className="grid grid-cols-2" key={key}>
                          <div className="px-4 py-2 font-semibold">
                            {admissionDetailsTitles[key]}:
                          </div>
                          <div className="px-4 py-2">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* <!-- End of profile tab s--> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </main>
  );
}

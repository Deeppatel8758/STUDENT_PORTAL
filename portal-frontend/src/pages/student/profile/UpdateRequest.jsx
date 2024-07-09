import React, { useEffect, useState } from "react";
import { ClipboardPaste, Check, Clock4, Lock } from "lucide-react";
import axios from "axios";
import endPoints from "../../../NetworkRoutes";
import { Toaster, toast } from "react-hot-toast";

export default function UpdateRequest() {
  const status = [
    {
      icon: <Lock />,
      status: "Profile Locked",
    },
    {
      icon: <Check />,
      status: "Submit",
    },
  ];

  const [buttonStatus, setButtonStatus] = useState(1);
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);
  const [allowUpdate, setAllowUpdate] = useState(0);
  const [lockInDuration, setLockInDuration] = useState(null);
  const [formData, setFormData] = useState({
    enrollment: "",
    firstName: "",
    lastName: "",
    caste: "",
    admissionCategory: "",
    gender: "",
    admissionYear: "",
    branch: "",
    semester: "",
    course: "",
    religion: "",
    verifiedDepartment: "",
    verifiedStudentSection: "",
    contactNumber: "",
    aadhar: "",
    voterId: "",
    dob: "",
    bloodGroup: "",
    residentalCity: "",
    residentalState: "",
    reisentalCountry: "",
    residentalPincode: "",
    permanentAddress1: "",
    permanentAddress2: "",
    permanentCity: "",
    permanentState: "",
    permanentCountry: "",
    permanentPincode: "",
    sscyear: "",
    sscpr: "",
    hscyear: "",
    hscpr: "",
    fathername: "",
    mothername: "",
    fatheroccupation: "",
    fathercontactNumber: "",
    officeAdd1: "",
    officeAdd2: "",
    officeCity: "",
    officeState: "",
    officeCountry: "",
    officePincode: "",
    motheroccupation: "",
    familyincome: "",
    departmentid: "",
    residentalAddress: "",
    profileImage: "",
    signatureImage: "",
  });

  const handleSameAddress = (event) => {
    const { checked } = event.target;
    if (checked) {
      setFormData({
        ...formData,
        permanentAddress1: formData.residentalAddress,
        permanentAddress2: formData.residentalAddress,
        permanentCity: formData.residentalCity,
        permanentState: formData.residentalState,
        permanentCountry: formData.reisentalCountry,
        permanentPincode: formData.residentalPincode,
      });
    } else {
      setFormData({
        ...formData,
        permanentAddress1: "",
        permanentAddress2: "",
        permanentCity: "",
        permanentState: "",
        permanentCountry: "",
        permanentPincode: "",
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // file render
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
      // set file in formData
      setFormData({ ...formData, profileImage: file });
    } else {
      setProfileImage(null);
    }
  };

  const handleSignatureImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      //file render
      const reader = new FileReader();
      reader.onload = (e) => {
        setSignatureImage(e.target.result);
      };
      reader.readAsDataURL(file);
      // set file in formData
      setFormData({ ...formData, signatureImage: file });
    } else {
      setSignatureImage(null);
    }
  };

  //api call
  const userData = JSON.parse(localStorage.getItem("User_State"));

  //get basic student data
  const getStudentData = async () => {
    console.log(userData.username);
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
      const studentCollegeDetails =
        response.data.data.studentData.studentCollegeDetails;
      const studentPersonalDetails =
        response.data.data.studentData.studentPersonalDetails;
      setLockInDuration(studentCollegeDetails.LockInDuration);
      setAllowUpdate(studentCollegeDetails.AllowUpdate);
      let profile, signatureUrl;
      if (response.data.data.filesData.length > 0) {
        profile = response.data.data.filesData[0].data.data;
        signatureUrl = response.data.data.filesData[1].data.data;
        const uint8ArrayProfile = new Uint8Array(profile);
        const base64DataProfile = btoa(
          String.fromCharCode.apply(null, uint8ArrayProfile)
        );
        const ProfiledataUrl = `data:image/jpeg;base64,${base64DataProfile}`;
        const uint8ArraySignature = new Uint8Array(signatureUrl);
        const base64DataSignature = btoa(
          String.fromCharCode.apply(null, uint8ArraySignature)
        );
        const signatureurl = `data:image/jpeg;base64,${base64DataSignature}`;

        setProfileImage(ProfiledataUrl);
        setSignatureImage(signatureurl);
      }
      setFormData({
        //personal details
        aadhar: studentPersonalDetails?.aadhar,
        bloodGroup: studentPersonalDetails?.bloodGroup,
        contactNumber: studentPersonalDetails?.contactNumber,
        dob: studentPersonalDetails?.dob,
        familyincome: studentPersonalDetails?.familyincome,
        fathername: studentPersonalDetails?.fathername,
        fatheroccupation: studentPersonalDetails?.fatheroccupation,
        hscpr: studentPersonalDetails?.hscpr,
        hscyear: studentPersonalDetails?.hscyear,
        mothername: studentPersonalDetails?.mothername,
        motheroccupation: studentPersonalDetails?.motheroccupation,
        officeAdd1: studentPersonalDetails?.officeAdd1,
        officeAdd2: studentPersonalDetails?.officeAdd2,
        officeCity: studentPersonalDetails?.officeCity,
        officeCountry: studentPersonalDetails?.officeCountry,
        officePincode: studentPersonalDetails?.officePincode,
        officeState: studentPersonalDetails?.officeState,
        permanentAddress1: studentPersonalDetails?.permanentAddress1,
        permanentAddress2: studentPersonalDetails?.permanentAddress2,
        permanentCity: studentPersonalDetails?.permanentCity,
        permanentCountry: studentPersonalDetails?.permanentCountry,
        permanentPincode: studentPersonalDetails?.permanentPincode,
        permanentState: studentPersonalDetails?.permanentState,
        reisentalCountry: studentPersonalDetails?.reisentalCountry,
        residentalAddress: studentPersonalDetails?.residentalAddress,
        residentalCity: studentPersonalDetails?.residentalCity,
        residentalPincode: studentPersonalDetails?.residentalPincode,
        residentalState: studentPersonalDetails?.residentalState,
        sscpr: studentPersonalDetails?.sscpr,
        sscyear: studentPersonalDetails?.sscyear,
        voterId: studentPersonalDetails?.voterId,
        fathercontactNumber: studentPersonalDetails?.fathercontactNumber,
        //college details
        gender: studentCollegeDetails?.gender,
        enrollment: studentCollegeDetails?.enrollment,
        firstName: studentCollegeDetails?.firstName,
        lastName: studentCollegeDetails?.lastName,
        middleName: studentCollegeDetails?.middleName,
        email: studentCollegeDetails?.email,
        caste: studentCollegeDetails?.caste,
        religion: studentCollegeDetails?.religion,
        admissionYear: studentCollegeDetails?.admissionYear,
        admissionCategory: studentCollegeDetails?.admissionCategory,
        branch: studentCollegeDetails?.branch,
        departmentid: studentCollegeDetails?.branch,
        course: studentCollegeDetails?.course,
        semester: studentCollegeDetails?.semester,
        verifiedDepartment: studentCollegeDetails?.verifiedDepartment,
        verifiedStudentSection: studentCollegeDetails?.verifiedStudentSection,
        profileImage: profile,
        signatureImage: signatureUrl,
      });

      return {
        allowUpdate1: studentCollegeDetails.AllowUpdate,
        lockInDuration1: studentCollegeDetails.LockInDuration,
      };
    } catch (error) {
      console.log(error);
    }
  };

  // register student data
  const handleRegisterStudent = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      const allFormDataKey = Object.keys(formData);
      const formDataKeysToCopy = allFormDataKey.slice(0, allFormDataKey.length);
      console.log(formDataKeysToCopy);
      let formDataVar = new FormData();

      // set all data from formData to the formDataVar to send to the server
      // except the profileImage and signatureImage
      for (const dataKey of formDataKeysToCopy) {
        if (dataKey != "profileImage" && dataKey != "signatureImage") {
          formDataVar.append(dataKey, formData[dataKey]);
        }
      }

      // set profileImage and signatureImage
      formDataVar.append("files", formData.profileImage);
      formDataVar.append("files", formData.signatureImage);

      const response = await axios.patch(
        endPoints.registerStudentDetails,
        formDataVar,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status == 200) {
        toast.success("User Data Added Successfully");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.data[0].msg);
    }
  };

  const getAllStudentFun = async () => {
    const { allowUpdate1, lockInDuration1 } = await getStudentData();

    // Convert the date string to a Date object
    const dateToCompare = new Date(lockInDuration1);

    // Get the current timestamp in milliseconds
    const currentTimestamp = new Date();

    // Convert the date to compare to a timestamp
    const timestampToCompare = dateToCompare.getTime();

    console.log(allowUpdate1, lockInDuration1);
    if (allowUpdate1 == 0) {
      setIsFormDisabled(true);
      setButtonStatus(0);
      console.log("allow update is 0");
    } else if (allowUpdate1 == 1 && lockInDuration1 == null) {
      setButtonStatus(1);
      setIsFormDisabled(false);
      console.log("allow update is 1");
    } else if (allowUpdate1 == 1 && timestampToCompare < currentTimestamp) {
      setIsFormDisabled(true);
      setButtonStatus(0);
      console.log("allow update is 1 and lock in duration is over");
    } else if (allowUpdate1 == 1 && timestampToCompare > currentTimestamp) {
      setIsFormDisabled(false);
      setButtonStatus(1);
      console.log("allow update is 1 and lock in duration is not over");
    }
  };

  useEffect(() => {
    getAllStudentFun();
  }, []);

  useEffect(() => {
    if (buttonStatus == 0) {
      const dummy = async () => {
        const res = await axios.patch(
          endPoints.updateAllowUpdate,
          { username: userData.username },
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );
        console.log(res);
        if (res.status == 200) {
          console.log("Updated Allow Update");
        }
      };
      dummy();
    }
  }, [buttonStatus]);

  return (
    <main>
      <div className="flex justify-center">
        <div className="px-4 bg-white my-5 mx-5 rounded-lg sm:px-6 lg:px-8 py-8 w-full max-w-9xl">
          <div>
            <form
              onSubmit={handleRegisterStudent}
              encType="multipart/form-data"
            >
              <div className="flex mx-auto items-center w-full justify-between">
                <h1 className="text-xl font-bold text-gray-900 mr-6">
                  Update profile
                </h1>
                <button
                  type="submit"
                  disabled={!buttonStatus}
                  className={`btn ${buttonStatus == 0 ? "bg-gray-800" : ""} ${
                    buttonStatus == 1 ? "btn-warning" : ""
                  }`}
                >
                  {status[buttonStatus].icon}
                  {status[buttonStatus].status}
                </button>
              </div>
              <div className="">
                <div className="my-5">
                  <h1 className="mb-4 text-gray-900 font-bold">
                    Student details
                  </h1>
                  <div className="container mx-auto">
                    <div className="md:flex flex-row flex-wrap">
                      {/* ENROLLMENT NUMBER */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="enrollment"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Enrollment Number
                        </label>
                        <input
                          type="number"
                          name="enrollment"
                          id="enrollment"
                          value={formData.enrollment}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder=""
                          required=""
                          disabled={true}
                        />
                      </div>
                      {/* FIRST NAME */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="firstName"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* MIDDLE NAME */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="middleName"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Middle Name
                        </label>
                        <input
                          type="text"
                          name="middleName"
                          id="middleName"
                          value={formData.middleName}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Rameshbhai"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* LAST NAME */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="lastName"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Patel"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* EMAIL */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="hello@gmail.com"
                          required=""
                          disabled={true}
                        />
                      </div>
                      {/* CONTACT NUMBER */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="contactNumber"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Contact Number
                        </label>
                        <input
                          type="number"
                          name="contactNumber"
                          id="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="+91 1234567890"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* DOB */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="dob"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          DOB
                        </label>
                        <input
                          type="date"
                          name="dob"
                          id="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Patel"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* BLOOD GROUP */}
                      <div className="mb-3 mr-3 min-w-44">
                        <label
                          htmlFor="bloodGroup"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Blood Group
                        </label>
                        <select
                          type="select"
                          name="bloodGroup"
                          id="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Select blood group"
                          required=""
                          disabled={isFormDisabled}
                        >
                          <option value="Select blood group">
                            Select blood group
                          </option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                      {/* GENDER */}
                      <div className="mb-3 mr-3 min-w-44">
                        <label
                          htmlFor="gender"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Gender
                        </label>
                        <select
                          type="select"
                          name="gender"
                          id="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Select blood group"
                          required=""
                          disabled={isFormDisabled}
                        >
                          <option value="">Select Gender</option>
                          <option value="MALE">MALE</option>
                          <option value="FEMALE">FEMALE</option>
                          <option value="OTHER">OTHER</option>
                        </select>
                      </div>
                      {/* AADHAR CARD */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="aadhar"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Aadhar card number
                        </label>
                        <input
                          type="number"
                          name="aadhar"
                          id="aadhar"
                          value={formData.aadhar}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Patel"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* VOTER ID NUMBER */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="voterId"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Voter id number
                        </label>
                        <input
                          type="number"
                          name="voterId"
                          id="voteId"
                          value={formData.voterId}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Patel"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* RELIGION NUMBER */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="religion"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Religion
                        </label>
                        <input
                          type="text"
                          name="religion"
                          id="religion"
                          value={formData.religion}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Patel"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* CASTE */}
                      <div className="mb-3 mr-3 min-w-44">
                        <label
                          htmlFor="caste"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Caste
                        </label>
                        <select
                          name="caste"
                          id="caste"
                          value={formData.caste}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Select blood group"
                          required=""
                          disabled={isFormDisabled}
                        >
                          <option value="OPEN">OPEN</option>
                          <option value="OBC">OBC</option>
                          <option value="SC">SC</option>
                          <option value="ST">ST</option>
                          <option value="VJ">VJ</option>
                          <option value="NT">NT</option>
                          <option value="OTHER">OTHER</option>
                        </select>
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
                <div className="my-5">
                  <h1 className="mb-4 text-gray-900 font-bold">
                    Family details
                  </h1>
                  <div className="container mx-auto">
                    <div className="md:flex flex-row flex-wrap">
                      {/* FATHER NAME */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="fathername"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Father Name
                        </label>
                        <input
                          type="text"
                          name="fathername"
                          id="fathername"
                          value={formData.fathername}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* MOTHER NAME */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="mothername"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Mother Name
                        </label>
                        <input
                          type="text"
                          name="mothername"
                          id="mothername"
                          value={formData.mothername}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* FATHER OCCUPATION */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="fatheroccupation"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Father Contact Number
                        </label>
                        <input
                          type="number"
                          name="fathercontactNumber"
                          id="fathercontactNumber"
                          value={formData.fathercontactNumber}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="fatheroccupation"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Father Occupation
                        </label>
                        <input
                          type="text"
                          name="fatheroccupation"
                          id="fatheroccupation"
                          value={formData.fatheroccupation}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* FATHER OFFICE ADD 1 */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="officeAdd1"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Office address 1
                        </label>
                        <input
                          type="text"
                          name="officeAdd1"
                          id="officeAdd1"
                          value={formData.officeAdd1}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* FATHER OFFICE ADD 2 */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="officeAdd2"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Office address 2
                        </label>
                        <input
                          type="text"
                          name="officeAdd2"
                          id="officeAdd2"
                          value={formData.officeAdd2}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* FATHER OFFICE ADD CITY */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="officeCity"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Office city
                        </label>
                        <input
                          type="text"
                          name="officeCity"
                          id="officeCity"
                          value={formData.officeCity}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* FATHER OFFICE ADD STATE */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="officeState"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Office state
                        </label>
                        <input
                          type="text"
                          name="officeState"
                          id="officeState"
                          value={formData.officeState}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* FATHER OFFICE ADD COUNTRY */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="officeCountry"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Office country
                        </label>
                        <input
                          type="text"
                          name="officeCountry"
                          id="officeCountry"
                          value={formData.officeCountry}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* FATHER OFFICE ADD PIN CODE */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="officePincode"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Office pin code
                        </label>
                        <input
                          type="number"
                          name="officePincode"
                          id="officePincode"
                          value={formData.officePincode}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* MOTHER OCCUPATION */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="motherOccupation"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Mother Occupation
                        </label>
                        <input
                          type="text"
                          name="motheroccupation"
                          id="motherOccupation"
                          value={formData.motheroccupation}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* FAMILY INCOME */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="familyincome"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Family income (yearly in lakhs)
                        </label>
                        <input
                          type="number"
                          name="familyincome"
                          id="familyincome"
                          value={formData.familyincome}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-5">
                  <h1 className="mb-4 text-gray-900 font-bold">Address</h1>
                  <div className="container mx-auto">
                    <h1 className="mb-4 text-gray-700 font-semibold">
                      Residential Address
                    </h1>

                    <div className="md:flex flex-row flex-wrap">
                      {/* RESIDENTIAL ADDRESS */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="residentalAddress"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Residential address
                        </label>
                        <input
                          type="text"
                          name="residentalAddress"
                          id="residentalAddress"
                          value={formData.residentalAddress}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* RESIDENTIAL ADDRESS CITY */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="residentalCity"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Residential city
                        </label>
                        <input
                          type="text"
                          name="residentalCity"
                          id="residentalCity"
                          value={formData.residentalCity}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* RESIDENTIAL ADDRESS STATE */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="residentalState"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Residential state
                        </label>
                        <input
                          type="text"
                          name="residentalState"
                          id="residentalState"
                          value={formData.residentalState}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* RESIDENTIAL ADDRESS COUNTRY */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="reisentalCountry"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Residential country
                        </label>
                        <input
                          type="text"
                          name="reisentalCountry"
                          id="reisentalCountry"
                          value={formData.reisentalCountry}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* RESIDENTIAL ADDRESS PIN CODE */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="residentalPincode"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Residential pin code
                        </label>
                        <input
                          type="number"
                          name="residentalPincode"
                          id="residentalPincode"
                          value={formData.residentalPincode}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                    </div>
                    <h1 className="mb-4 text-gray-700 font-semibold">
                      Permanent Address
                    </h1>
                    <div className="mb-3 mr-3">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="sameAdd"
                          id="sameAdd"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required=""
                          onChange={handleSameAddress}
                          disabled={isFormDisabled}
                        />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Same as Residential Address
                        </span>
                      </label>
                    </div>
                    <div className="md:flex flex-row flex-wrap">
                      {/* PERMANENT ADDRESS */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="permanentAddress1"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Permanent Address
                        </label>
                        <input
                          type="text"
                          name="permanentAddress1"
                          id="permanentAddress1"
                          value={formData.permanentAddress1}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* PERMANENT ADDRESS CITY */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="permanentCity"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Permanent City
                        </label>
                        <input
                          type="text"
                          name="permanentCity"
                          id="permanentCity"
                          value={formData.permanentCity}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* PERMANENT ADDRESS STATE */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="permanentState"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Permanent State
                        </label>
                        <input
                          type="text"
                          name="permanentState"
                          id="permanentState"
                          value={formData.permanentState}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* PERMANENT ADDRESS COUNTRY */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="permanentCountry"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Permanent Country
                        </label>
                        <input
                          type="text"
                          name="permanentCountry"
                          id="permanentCountry"
                          value={formData.permanentCountry}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* PERMANENT ADDRESS PIN CODE */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="permanentPincode"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Permanent Pin Code
                        </label>
                        <input
                          type="number"
                          name="permanentPincode"
                          id="permanentPincode"
                          value={formData.permanentPincode}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-5">
                  <h1 className="mb-4 text-gray-900 font-bold">
                    Education details
                  </h1>
                  <div className="container mx-auto">
                    <div className="md:flex flex-row flex-wrap">
                      {/* HSC PASSING YEAR NAME */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="hscyear"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          HSC year
                        </label>
                        <input
                          type="number"
                          name="hscyear"
                          id="hscyear"
                          value={formData.hscyear}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* HSC PERCENTAGE */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="hscpr"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          HSC percentage
                        </label>
                        <input
                          type="number"
                          name="hscpr"
                          id="hscpr"
                          value={formData.hscpr}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* SSC PASSING YEAR NAME */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="sscyear"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          SSC year
                        </label>
                        <input
                          type="number"
                          name="sscyear"
                          id="sscyear"
                          value={formData.sscyear}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* SSC PERCENTAGE */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="sscpr"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          SSC percentage
                        </label>
                        <input
                          type="number"
                          name="sscpr"
                          id="sscpr"
                          value={formData.sscpr}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-5">
                  <h1 className="mb-4 text-gray-900 font-bold">
                    Admission details
                  </h1>
                  <div className="container mx-auto">
                    <div className="md:flex flex-row flex-wrap">
                      {/* COURSE */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="course"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Course
                        </label>
                        <input
                          type="number"
                          name="course"
                          id="course"
                          value={formData.course}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* BRANCH */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="branch"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Branch
                        </label>
                        <input
                          type="number"
                          name="branch"
                          id="branch"
                          value={formData.branch}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={true}
                        />
                      </div>
                      {/* SEM */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="semester"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Sem
                        </label>
                        <input
                          type="number"
                          name="semester"
                          id="semester"
                          value={formData.semester}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder=""
                          required=""
                          disabled={true}
                        />
                      </div>
                      {/* ADMISSION YEAR */}
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="admissionYear"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Admission year
                        </label>
                        <input
                          type="number"
                          name="admissionYear"
                          id="admissionYear"
                          value={formData.admissionYear}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amit"
                          required=""
                          disabled={isFormDisabled}
                        />
                      </div>
                      {/* ADMISSION CATEGORY */}
                      <div className="mb-3 mr-3 min-w-44">
                        <label
                          htmlFor="admissionCategory"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Admission category
                        </label>
                        <select
                          name="admissionCategory"
                          id="admissionCategory"
                          value={formData.admissionCategory}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Select blood group"
                          required=""
                          disabled={isFormDisabled}
                        >
                          <option value="OPEN">OPEN</option>
                          <option value="OBC">OBC</option>
                          <option value="SC">SC</option>
                          <option value="ST">ST</option>
                          <option value="VJ">VJ</option>
                          <option value="NT">NT</option>
                          <option value="OTHER">OTHER</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:flex flex-row flex-wrap">
                  <div className="mb-3 mr-3 min-w-36">
                    <label
                      htmlFor="profilePhoto"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Profile photo
                    </label>
                    <input
                      // value={data.file}
                      onChange={(e) => {
                        handleProfileImageChange(e);
                      }}
                      disabled={isFormDisabled}
                      className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      id="profilePhoto"
                      name="image1"
                      type="file"
                      accept="image/*"
                    />

                    {profileImage && (
                      <div>
                        <p className="text-sm">Profile Photo Preview:</p>
                        <img
                          src={profileImage}
                          alt="Selected"
                          style={{ maxWidth: "100%", maxHeight: "200px" }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-3 mr-3 min-w-36">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="signaturePhoto"
                    >
                      Signature
                    </label>
                    <input
                      onChange={(e) => {
                        handleSignatureImageChange(e);
                      }}
                      disabled={isFormDisabled}
                      className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      id="signaturePhoto"
                      type="file"
                      name="image2"
                      accept="image/*"
                    />
                    {signatureImage && (
                      <div>
                        <p className="text-sm">Signature Preview:</p>
                        <img
                          src={signatureImage}
                          alt="Selected"
                          style={{ maxWidth: "100%", maxHeight: "200px" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  );
}

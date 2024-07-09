import React, { useEffect, useState } from "react";
import NetworkRoute from "../../NetworkRoutes";
import { Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

export default function CertificateRequest() {
  const [pickCertificate, setPickCertificate] = useState([]);
  const [certificateType, setCertificateType] = useState("");
  const userData = JSON.parse(localStorage.getItem("User_State"));
  console.log(userData);
  const [allCertificateDetails, setCertificateDetails] = useState("");
  const [allDocuments, setAllDocuments] = useState([]);
  const [allInputValues, setAllInputValues] = useState([]);
  const [Images, setImages] = useState([]);
  const [showbtn, setshowbtn] = useState(false);
  const [Inputs, setInputs] = useState([
    {
      value: userData.username,
      categoryid: "enrollment",
    },
  ]);

  useEffect(() => {
    let url = NetworkRoute.getAllCertificatesTypes;
    const accessToken = userData.token;

    // Include the bearer token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .get(url, config)
      .then((response) => {
        console.log(response.data);
        setPickCertificate(response.data.data);
      })
      .catch((error) => {
        // Handle error if the request fails
        if (error.code === "ERR_BAD_RESPONSE") {
          toast.error(error.response.data.message);
          if (error.response.data.message === "jwt expired") {
            window.localStorage.clear();
            Navigate("../../authentication/Login");
          }
        } else {
          toast.error(error.message);
        }
        console.error("Error fetching user profile:", error);
      });
  }, []);

  //chnage for getting isverifed 
  const [isVerifiedByDept, setIsVerifiedByDept] = useState(null);
  let url = `${NetworkRoute.getStudentDetails}/${userData.username}`;
  const accessToken = userData.token;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
   
          axios
          .get(url, config)
          .then((response) => {
            // console.log(response.data);

            let isVerifiedByDept1 =response.data.data.studentData.studentCollegeDetails.verifiedDepartment;

              setIsVerifiedByDept(isVerifiedByDept1)
            // setAllDocuments(response.data.data.documentDetails);
            // setCertificateDetails(response.data.data.certificateDetails);
          })
          .catch((error) => {
              console.log("error")
          });

//change end here 


  useEffect(() => {
    const getCertificateDocuemnts = async () => {
      if (certificateType != "") {
        let url = `${NetworkRoute.getCertificateDocuments}/${certificateType}`;
        const accessToken = userData.token;

        // Include the bearer token in the request headers
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        axios
          .get(url, config)
          .then((response) => {
            console.log(response.data);
            setAllDocuments(response.data.data.documentDetails);
            setCertificateDetails(response.data.data.certificateDetails);
          })
          .catch((error) => {
            // Handle error if the request fails
            if (error.code === "ERR_BAD_RESPONSE") {
              toast.error(error.response.data.message);
              if (error.response.data.message === "jwt expired") {
                window.localStorage.clear();
                Navigate("../../authentication/Login");
              }
            } else {
              toast.error(error.message);
            }
            console.error("Error fetching user profile:", error);
          });
      }
    };
    getCertificateDocuemnts();
  }, [certificateType]);

  const handleCertificateChange = async (e) => {
    if (e.target.value != "") {
      setCertificateType(e.target.value);

      setshowbtn(true);
    } else {
      setshowbtn(false);
    }
    setAllInputValues([]);
    setAllDocuments([]);
    setCertificateDetails(null);
  };

  const updateDataItem = (
    key,
    newValue,
    categorydatatype,
    categoryid,
    categoryname
  ) => {
    let AllImages = [...Images];
    let AllInputs = [...Inputs];

    if (categorydatatype != "FILE") {
      AllInputs[key] = {
        value: newValue,
        categorydatatype,
        categoryid,
        categoryname,
      };
    } else {
      AllImages[key] = {
        value: newValue,
        categorydatatype,
        categoryid,
        categoryname,
      };
    }

    setImages(AllImages);
    setInputs(AllInputs);
  };

  const imagesIndex = [];
  const inputIndex = [];
  const MakeRequest = async (e) => {
    e.preventDefault();

    let formdata = new FormData();
    formdata.append("enrollment", userData.username);

    for (const i in Inputs) {
      if (Inputs[i]) {
        formdata.append(Inputs[i].categoryid, Inputs[i].value);
        formdata.append("inputCategory", Inputs[i].categoryid);
      }
      // console.log(Inputs[i].categoryid, Inputs[i].value);
    }

    for (const i in Images) {
      if (Images[i]) {
        formdata.append("files", Images[i].value);
        formdata.append("imagesCategory", Images[i]?.categoryid);
        // console.log(allInputValues[i].categoryid, Images[i].value);
      }
    }
    formdata.append("certificatetype", certificateType);

    const data = await axios.post(
      NetworkRoute.makeCertificateRequest,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );
    console.log(data);
    if (data.status == 200) {
      toast.success("Request Added Successfully");
    }
  };

    if(isVerifiedByDept===true){
  return (


    <main className=" min-w-full p-8 ">
      <Toaster position="top-right" reverseOrder={false} />

      <label className="ml-2">Select Certificate</label>

      <select
        className="w-full mt-8 rounded-md border-none p-4"
        onChange={handleCertificateChange}
      >
        <option default value="">
          Select Certificate
        </option>
        {pickCertificate &&
          pickCertificate.length > 0 &&
          pickCertificate.map((certi, key) => {
            return (
              <option value={certi.id} key={key}>
                {certi.certificatename ? certi.certificatename : ""}
              </option>
            );
          })}
      </select>

      <form onSubmit={MakeRequest} encType="multipart/form-data">
        <div className="bg-white w-full mt-8">
          <p className="text-xl font-bold text-center py-2">
            {allCertificateDetails?.certificatename}
          </p>
          <div className=" grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  py-6">
            {allDocuments.length > 0 &&
              allDocuments.map((doc, key) => {
                return (
                  <div>
                    <p className="text-md mt-4 font-bold">
                      {doc?.categoryname}
                    </p>
                    <div key={key}>
                      {doc.categorydatatype === "INTEGER" && (
                        <input
                          type="number"
                          required
                          value={allInputValues[key]?.value}
                          onChange={(e) =>
                            updateDataItem(
                              key,
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined,
                              doc.categorydatatype,
                              doc.categoryid,
                              doc.categoryname
                            )
                          }
                        />
                      )}
                      {doc.categorydatatype === "DOUBLE" && (
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={allInputValues[key]?.value}
                          onChange={(e) =>
                            updateDataItem(
                              key,
                              e.target.value
                                ? parseFloat(e.target.value)
                                : undefined,
                              doc.categorydatatype,
                              doc.categoryid,
                              doc.categoryname
                            )
                          }
                        />
                      )}
                      {doc.categorydatatype === "STRING" && (
                        <input
                          type="text"
                          required
                          value={allInputValues[key]?.value}
                          onChange={(e) =>
                            updateDataItem(
                              key,
                              e.target.value.length > 0
                                ? e.target.value
                                : undefined,
                              doc.categorydatatype,
                              doc.categoryid,
                              doc.categoryname
                            )
                          }
                        />
                      )}
                      {doc.categorydatatype === "FILE" && (
                        <input
                          type="file"
                          required
                          onChange={(e) =>
                            updateDataItem(
                              key,
                              e.target.files[0] ? e.target.files[0] : undefined,
                              doc.categorydatatype,
                              doc.categoryid,
                              doc.categoryname
                            )
                          }
                        />
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="grid place-items-center py-4">
            {showbtn && (
              <button
                disabled={!showbtn}
                type="submit"
                className="btn  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 "
              >
                Submit certificate request
              </button>
            )}
          </div>
        </div>
      </form>
    </main>

  );}
  else{
    return(
      <>
      <h1>U ARE NOT VERIFIED BY DEPARTMENT PLS MAKE UPDATE REQUEST FIRST</h1>
      </>
    )
  }

}

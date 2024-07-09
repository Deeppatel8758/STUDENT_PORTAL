import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FilePlus, X } from "lucide-react";
import axios from "axios";
import { StudentDetails, CollegeDetails } from "../../../components/test/Field";
import endpoint from "../../../NetworkRoutes";
import { useNavigate } from "react-router-dom";

export default function AddCertificate() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("User_State"));
  const [data, setData] = useState({
    certificateName: "",
    certificateSerial: "",
    template: "",
    templateName: "",
  });
  const [allDocuments, setAllDocuments] = useState([]);
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  const [importTag, setImportTag] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    getAllDocuments();
  }, []);

  const getAllDocuments = async () => {
    try {
      const response = await axios.get(endpoint.getAllDocuments, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      if (response.status === 200 && response.data.data.length > 0) {
        setAllDocuments(response.data.data);
        console.log(response);
      } else {
        toast.error("No documents found");
      }
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_BAD_RESPONSE") {
        toast.error(error.response.data.message);
        if (error.response.data.message === "jwt expired") {
          window.localStorage.clear();
          navigate("/login");
        }
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleClear = () => {
    setData({ ...data, template: "" });
  };

  const handleTagClear = (e) => {
    setImportTag([]);
  };

  const handleCheckboxChange = (document) => {
    setRequiredDocuments((prevState) => {
      if (prevState.includes(document)) {
        return prevState.filter((doc) => doc !== document);
      } else {
        return [...prevState, document];
      }
    });
  };

  const handleImportTagChange = (document) => {
    setImportTag((prevState) => {
      if (prevState.includes(document)) {
        return prevState.filter((doc) => doc !== document);
      } else {
        return [...prevState, document];
      }
    });
  };

  const handleAccordionClick = (index) => {
    setActiveAccordion((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleAddCertificate = async () => {
    try {
      let formData = new FormData();
      formData.append("certificateName", data.certificateName);
      formData.append("certificateSerial", data.certificateSerial);
      formData.append("requiredDocuments", requiredDocuments.join(","));
      formData.append("CertificateVariables", importTag.join(","));
      formData.append("certificateFormatDocument", data.template);
      console.log(formData);
      const response = await axios.post(endpoint.addCertificate, formData, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setData({
          certificateName: "",
          template: null,
          certificateSerial: "",
          templateName: "",
        });
        setRequiredDocuments([]);
        setImportTag([]);
        getAllDocuments();
        formData = new FormData();
      }
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_BAD_RESPONSE") {
        toast.error(error.response.data.message);
        if (error.response.data.message === "jwt expired") {
          window.localStorage.clear();
          navigate("/login");
        }
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <main>
      <Toaster position="top-right" reverseOrder={true} />
      <div className="flex justify-center px-5">
        <div className="px-4 bg-white my-5 mx-5 rounded-lg sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <p className="text-2xl text-center text-black font-semibold">
            Add Certificate
          </p>
          <div className="mt-6">
            <p className="text-lg font-semibold mb-2">Certificate Details</p>
            <div className="grid md:grid-cols-2 grid-cols-1 mx-2 gap-3">
              <div>
                <label htmlFor="small-input" className="block mb-1 font-medium">
                  Certificate Name
                </label>
                <input
                  value={data.certificateName}
                  onChange={(e) =>
                    setData({ ...data, certificateName: e.target.value })
                  }
                  type="text"
                  id="default-input"
                  placeholder="Ex. Bonafide Certificate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="small-input" className="block mb-1 font-medium">
                  Certificate Serial
                </label>
                <input
                  value={data.certificateSerial}
                  onChange={(e) =>
                    setData({ ...data, certificateSerial: e.target.value })
                  }
                  type="text"
                  id="default-input"
                  placeholder="Ex. LDCE/2023/B/1,"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="small-input" className="block mb-1 font-medium">
                  Template
                </label>
                <div className="flex">
                  <input
                    accept=".docx,doc"
                    value={data.templateName}
                    onChange={(e) =>
                      setData({
                        ...data,
                        template: e.target.files[0],
                        templateName: e.target.value,
                      })
                    }
                    type="file"
                    id="default-input"
                    placeholder="Ex. Bonafide Certificate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {data.template && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="text-white self-center h-8 w-8 ml-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <X />
                    </button>
                  )}
                </div>
                <p
                  className="mt-1 text-sm ml-2 text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  Sample Template.docx
                </p>
              </div>
            </div>
          </div>
          {/* Required Document */}
          <div className="mt-6">
            <p className="text-lg font-semibold mb-4">Required Document</p>
            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-y-3 ml-2">
              {allDocuments &&
                allDocuments.map((document, index) => {
                  return (
                    <div key={index} className="flex items-center h-5">
                      <input
                        id={document.categoryid}
                        type="checkbox"
                        checked={requiredDocuments.includes(
                          document.categoryid
                        )}
                        onChange={() =>
                          handleCheckboxChange(document.categoryid)
                        }
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      />
                      <label
                        htmlFor={document.categoryid}
                        className="ml-2   text-gray-900 dark:text-gray-300"
                      >
                        {document.categoryname}
                      </label>
                    </div>
                  );
                })}
            </div>
            <div className="flex justify-center">
              <div className="flex justify-center mt-2">
                <button
                  type="button"
                  onClick={() => navigate("/admin/add-document")}
                  className="text-white flex items-center gap-x-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  <FilePlus size={20} />
                  Add Document
                </button>
              </div>
            </div>
          </div>

          {/* Import Tag */}
          <div className="mt-2">
            <p className="text-lg font-semibold mb-2">Import Tag</p>
            <div>
              <p className="my-3 mx-2 text-gray-400">
                Use this tag in .word file like,
              </p>
              <div>
                <div className="flex flex-wrap gap-2 mx-2 mb-5">
                  {importTag.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-100 self-center text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300"
                    >
                      &#123; {tag} &#125;
                    </span>
                  ))}
                  {importTag.length > 0 && (
                    <button
                      type="button"
                      onClick={handleTagClear}
                      className="text-white self-center ml-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <X size={20} />
                      <p className="mx-2">Clear All</p>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-t-lg">
            <button
              className="w-full p-2 flex justify-between items-center focus:outline-none bg-gray-100 dark:bg-gray-800"
              onClick={() => handleAccordionClick(1)}
            >
              <span className="text-medium font-medium">Student Details</span>
              <span className="h-4 w-4 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`transform ${
                    activeAccordion === 1 ? "rotate-0" : "rotate-180"
                  } transition-transform duration-200`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
            {activeAccordion === 1 && (
              <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-2  p-3 bg-white dark:bg-gray-900">
                {StudentDetails.map((detail, idx) => (
                  <div className="flex items-center">
                    <div className="flex items-center h-4">
                      <input
                        id={detail.fieldLabel}
                        type="checkbox"
                        checked={importTag.includes(detail.fieldLabel)}
                        onChange={() =>
                          handleImportTagChange(detail.fieldLabel)
                        }
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      />
                    </div>
                    <label
                      htmlFor={detail.fieldLabel}
                      className="ml-2 text-sm text-gray-900 dark:text-gray-300"
                    >
                      {detail.fieldName}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="border rounded-b-lg">
            <button
              className="w-full p-2 flex justify-between items-center focus:outline-none bg-gray-100 dark:bg-gray-800"
              onClick={() => handleAccordionClick(2)}
            >
              <span className="text-medium font-medium">Student Details</span>
              <span className="h-4 w-4 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`transform ${
                    activeAccordion === 2 ? "rotate-0" : "rotate-180"
                  } transition-transform duration-200`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
            {activeAccordion === 2 && (
              <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-2 p-3 bg-white dark:bg-gray-900">
                {CollegeDetails.map((detail, idx) => (
                  <div className="flex items-center">
                    <div className="flex items-center h-4">
                      <input
                        id={detail.fieldLabel}
                        type="checkbox"
                        checked={importTag.includes(detail.fieldLabel)}
                        onChange={() =>
                          handleImportTagChange(detail.fieldLabel)
                        }
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      />
                    </div>
                    <label
                      htmlFor={detail.fieldLabel}
                      className="ml-2 text-sm text-gray-900 dark:text-gray-300"
                    >
                      {detail.fieldName}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={() => handleAddCertificate()}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FileEdit, Trash2, FilePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StudentDetails, CollegeDetails } from "../../../components/test/Field";
import endPoints from "../../../NetworkRoutes";

export default function ManageCertificates() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("User_State"));
  const [certificates, setCertificates] = useState([]);
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  const [deleteCer, setDeleteCer] = useState(false);
  useEffect(() => {
    getAllRequiredDocuments();
    getAllCertificates();
  }, []);

  const convert = async (data) => {
    await data.map((item) => {
      const temp = StudentDetails.concat(CollegeDetails);

      const documentsrequired = item.documentsrequired.split(",");
      const CertificateVariables = item.CertificateVariables.split(",");

      item.documentsrequired = documentsrequired.map((item) => {
        return requiredDocuments.find(
          (doc) => doc.categoryid === parseInt(item)
        )?.categoryname;
      });

      item.CertificateVariables = CertificateVariables.map((item) => {
        return temp.find((doc) => doc.fieldLabel === item)?.fieldName;
      });

      item.CertificateVariables = item.CertificateVariables.join(", ");
      item.documentsrequired = item.documentsrequired.join(", ");
    });
  };

  const getAllCertificates = async () => {
    try {
      const response = await axios.get(endPoints.getAllCertificatesOnAdmin, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      console.log(response);
      if (response.status === 200 && response.data.data.length > 0) {
        setCertificates(response.data.data);
        // convert(response.data.data);
      } else {
        toast.error("No certificates found");
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

  const getAllRequiredDocuments = async () => {
    try {
      const response = await axios.get(endPoints.getAllDocuments, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      console.log(response);
      setRequiredDocuments(response.data.data);
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

  const deleteCertificate = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(endPoints.deleteCertificate + id, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        toast.success("Certificate deleted successfully");
        getAllCertificates();
      } else {
        toast.error("Error deleting certificate");
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
            Manage Certificate
          </p>
          <div className="mt-2">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  navigate("/admin/add-certificate");
                }}
                className="flex gap-2 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <FilePlus size={20} />
                Add Certificate
              </button>
            </div>
            <div className="overflow-x-auto flex justify-center">
              <table className="table-md border rounded-2xl">
                {/* head */}
                <thead className="bg-gray-200">
                  <tr>
                    <th></th>
                    <th>Certificate Name</th>
                    <th>Certificate Serial</th>
                    <th>Required Documents</th>
                    <th>Imported fields</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates &&
                    certificates.map(({certificateDetails,documentDetails}, index) => {
                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td className="text-center">
                            {certificateDetails.certificatename}
                          </td>
                          <td className="text-center">
                            {certificateDetails.CertificateSerial}
                          </td>
                          <td className="text-center">
                            {documentDetails.length > 0 && documentDetails.map((doc) => {
                             return <p>{doc.categoryname}</p>
                           })}
                          </td>
                          <td className="text-center">
                            {certificateDetails.CertificateVariables}
                          </td>
                          <td>
                            <button
                              onClick={() => deleteCertificate(certificateDetails.id)}
                              className="btn btn-square btn-outline"
                              disabled={!certificateDetails.status}
                            >
                              <Trash2 />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

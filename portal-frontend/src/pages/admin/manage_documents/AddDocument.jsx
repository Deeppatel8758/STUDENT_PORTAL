import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FilePlus } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import endpoint from "../../../NetworkRoutes";

export default function AddDocument() {
  const userData = JSON.parse(localStorage.getItem("User_State"));
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState({
    documentName: "",
    documentType: "",
  });
  const [oldData, setOldData] = useState({
    documentName: "",
    documentType: "",
  });

  useEffect(() => {
    const getDocument = async () => {
      try {
        const response = await axios.get(endpoint.getDocumentById + id, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
          params: {
            id: id,
          },
        });
        if (response.status === 200) {
          const { categoryname, categorydatatype } = response.data.data;
          setData({
            documentName: categoryname,
            documentType: categorydatatype,
          });
          setOldData({
            documentName: categoryname,
            documentType: categorydatatype,
          });
        }
        console.log(response);
      } catch (error) {
        console.log(error);
        if (error.code === "ERR_BAD_RESPONSE") {
          toast.error(error.response.data.message);
          if (error.response.data.message === "jwt expired") {
            window.localStorage.clear();
            Navigate("/login");
          }
        } else {
          toast.error(error.message);
        }
      }
    };
    if (id) getDocument();
    else setData({ documentName: "", documentType: "" });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        endpoint.updateDocument,
        {
          categoryName: data.documentName,
          categoryType: data.documentType,
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Document updated successfully");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_BAD_RESPONSE") {
        toast.error(error.response.data.message);
        if (error.response.data.message === "jwt expired") {
          window.localStorage.clear();
          Navigate("/login");
        }
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        endpoint.createDocument,
        {
          categoryName: data.documentName,
          categoryType: data.documentType,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Document added successfully");
        setData({
          documentName: "",
          documentType: "",
        });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_BAD_RESPONSE") {
        toast.error(error.response.data.message);
        if (error.response.data.message === "jwt expired") {
          window.localStorage.clear();
          Navigate("/login");
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
            Add Document
          </p>
          <div className="mt-6">
            <p className="text-lg font-semibold mb-2">Certificate Details</p>
            <div className="grid md:grid-cols-2 grid-cols-1 mx-2 gap-3">
              <div>
                <label htmlFor="small-input" className="block mb-1 font-medium">
                  Document Name
                </label>
                <input
                  value={data.documentName}
                  onChange={(e) =>
                    setData({ ...data, documentName: e.target.value })
                  }
                  type="text"
                  id="default-input"
                  placeholder="Ex. Fee Receipt"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="Type" className="block mb-1 font-medium">
                  Document Type
                </label>
                <select
                  value={data.documentType}
                  onChange={(e) =>
                    setData({ ...data, documentType: e.target.value })
                  }
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Choose a Type</option>
                  <option value="FILE">File</option>
                  <option value="INTEGER">Integer</option>
                  <option value="STRING">String</option>
                  <option value="FLOAT">Float</option>
                  <option value="BIGINT">BigInt</option>
                  <option value="DATEONLY">Dateonly</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={(e) => (id ? handleUpdate(e) : handleSubmit(e))}
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

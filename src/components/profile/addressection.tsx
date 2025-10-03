"use client";

import { useEffect, useState } from "react";

interface propsTypes {
  data: any;
  addNewaddress: any;
}

export default function AddressSection({ data, addNewaddress }: propsTypes) {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    let addressID = localStorage.getItem("adsData");
    if (addressID) {
      let id = JSON.parse(addressID);
      if (id?.id) {
        setSelectedId((e) => id?.id);
      }
    }
  }, []);

  return (
    <>
      <section className="w-full mx-auto">
        {" "}
        <div className="flex justify-between mb-4 items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Select Delivery Address
            </h2>
          </div>
          <div>
            <button
              onClick={() => addNewaddress(true, 1, null)}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Add New
            </button>
          </div>
        </div>
       {data?.length > 0 && <div className="space-y-4">
          {" "}
          {data.map((addr: any, ind: number) => (
            <div
              key={ind}
              onClick={() => [
                setSelectedId(addr.id),
                localStorage.setItem("adsData", JSON.stringify(addr)),
              ]}
              className={`cursor-pointer border rounded-lg p-4 shadow-sm transition ${
                selectedId === addr.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              {" "}
              <div className="flex items-start justify-between">
                {" "}
                <div>
                  {" "}
                  <p className="font-semibold text-gray-900">
                    {addr.type}
                  </p>{" "}
                  <p className="text-sm text-gray-600">{addr.phoneNumber}</p>{" "}
                  <p className="mt-1 text-gray-700">
                    {addr.addressLin1} {addr.addressLin2}
                  </p>{" "}
                  <p className="text-gray-700">
                    {" "}
                    {addr.country}, {addr.city} - {addr.postalCode}{" "}
                  </p>{" "}
                  <p className="text-gray-700">{addr.country}</p>{" "}
                </div>{" "}
                <div className="ml-4">
                  {" "}
                  <input
                    type="radio"
                    checked={selectedId === addr.id}
                    onChange={() => setSelectedId(addr.id)}
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />{" "}
                </div>{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>}

        {!data && <>
            <div className="text-center pt-5 pb-5">
               <h1 className="text-xl font-semibold">No Address found Please add Address </h1>
            </div>
        </> }
      </section>
    </>
  );
}

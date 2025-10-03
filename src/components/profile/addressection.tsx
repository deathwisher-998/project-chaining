"use client";

import { useState } from "react";

interface propsTypes {
  data: any;
}

export default function AddressSection({ data }: propsTypes) {
  const [selectedId, setSelectedId] = useState(1);


  return (
    <>
      <section className="w-full mx-auto">
        {" "}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {" "}
          Select Delivery Address{" "}
        </h2>{" "}
        <div className="space-y-4">
          {" "}
          {data.map((addr:any, ind:number) => (
            <div
              key={ind}
              onClick={() => setSelectedId((ind + 1))}
              className={`cursor-pointer border rounded-lg p-4 shadow-sm transition ${
                selectedId === (ind + 1)
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
                  <p className="mt-1 text-gray-700">{addr.addressLin1} {addr.addressLin2}</p>{" "}
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
                    checked={selectedId === (ind + 1)}
                    onChange={() => setSelectedId((ind + 1))}
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />{" "}
                </div>{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
        <button className="mt-6 w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          {" "}
          Deliver to this Address{" "}
        </button>{" "}
      </section>
    </>
  );
}

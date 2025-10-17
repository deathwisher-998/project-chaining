"use client";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/solid";

export default function Orderlists({ odrerlisting }: { odrerlisting: any }) {
  const [open, setOpen] = useState(0);

  useEffect(() => {}, [odrerlisting]);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  function orderDate(date: string) {
    return "";
  }

  return (
    <>
      {odrerlisting?.length > 0 ? (
        <div className="w-full mx-auto">
          {odrerlisting.map((order: any) => (
            <Accordion key={order.id} open={open === order.id}>
              {/* Accordion Header */}
              <AccordionHeader
                onClick={() => handleOpen(order.id)}
                className={`flex justify-between items-center gap-2 px-4 rounded-md mb-2 ${
                  open === order.id && "shadow-md"
                }`}
                style={{
                  backgroundColor: "#77f6d6",
                  borderBottomColor: "#fff",
                }}
              >
                <div className="w-full grid grid-cols-2">
                  <div>
                    <span className="font-semibold">
                      {/* {"Order On" + orderDate(order?.orderItems[0]?.createdOn)} */}
                      {"Order On"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-sm font-bold ${
                        order.status === "Delivered" ? "text-gray" : "text-blue"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </AccordionHeader>

              {/* Accordion Body */}
              <AccordionBody>
                <div className="bg-gray-800 rounded-md mb-3 px-4 py-2">
                  <div>
                    <p className="font-semibold text-white">
                      Shipping Address : {order?.address?.addressLin1 + ", " + `${order?.address?.addressLin2 ? order?.address?.addressLin2 + ", " : ""}` + order?.address?.postalCode + ", " + order?.address?.country + ", " + order?.address?.city}
                    </p>
                    <p className="font-semibold text-white">Contact No: {order?.address?.phoneNumber}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {order.orderItems.map((item:any, index:number) => (
                    <div
                      key={index}
                      className="border rounded-lg p-3 shadow-sm bg-white flex flex-col"
                    >
                      <div>
                        <p className="font-semibold text-black">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-800">
                          Quantity: {item.quantity}
                        </p>
                        <span className="font-semibold">
                          Total Amount : {item.price} Rs
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10 mb-10">
          <h1 className="text-xl font-semibold text-color-by-logo-2">
            No Order Found
          </h1>
        </div>
      )}
    </>
  );
}

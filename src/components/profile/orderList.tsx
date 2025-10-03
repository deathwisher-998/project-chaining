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

  return (
   <>
    {odrerlisting?.length > 0 ? <div className="w-full mx-auto">
      {odrerlisting.map((order: any) => (
        <Accordion key={order.id} open={open === order.id}>
          {/* Accordion Header */}
          <AccordionHeader
            onClick={() => handleOpen(order.id)}
            className="flex justify-between items-center gap-2 px-4"
            style={{ backgroundColor: "#d3d3d3", borderBottomColor: "#fff" }}
          >
            <div className="w-full grid grid-cols-2">
              <div>
                <span className="font-semibold">
                  {"Order-" + order.id.slice(0, 7)}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {order.orderItems.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 shadow-sm flex flex-col"
                >
                  <span className="font-semibold">{item.product.name}</span>
                  <span className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </span>
                  <span className="font-semibold">{item.price}</span>
                </div>
              ))}
            </div>
          </AccordionBody>
        </Accordion>
      ))}
    </div> : <div className="text-center mt-10 mb-10">
       <h1 className="text-xl font-semibold">No Order Found</h1>
    </div> }
   </>
  );
}

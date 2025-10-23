"use client";

import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";

interface propsTypes {
  data: any;
  amountWithdraw: any;
  withdrawamountlist: any;
}

export default function WithdrawSection({
  data,
  amountWithdraw,
  withdrawamountlist,
}: propsTypes) {
  const [withdrawList, setWithdrawList] = useState();

  //   useEffect(() => {
  //     console.log("data", data);
  //   }, [data]);

  function formatDate(inputDate: string): string {
    const date = new Date(inputDate);

    // Options for desired format
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short", // e.g., Wed
      day: "2-digit", // e.g., 03
      month: "long", // e.g., October
      year: "numeric", // e.g., 2025
    };

    // Use toLocaleDateString with English locale
    return date.toLocaleDateString("en-US", options);
  }

  function totalwithDraws(data: any) {
    if (data.length > 0) {
      let totalwithdraw;
      totalwithdraw = data.reduce((acc: any, num: any) => {
        return acc + num.amount;
      }, 0);
      return totalwithdraw;
    } else {
      return "";
    }
  }

  return (
    <>
      <section className="w-full mx-auto">
        {" "}
        <div className="flex justify-end mb-5">
          {data.totalBalance > 0 && (
            <Button
              variant="filled"
              size="sm"
              onClick={() => amountWithdraw(1)}
            >
              Withdraw Balance
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
          <div className="btn-color-by-logo-1 rounded-md p-2 text-center">
            <h1 className="font-bold text-white text-xl">
              {data.totalBalance > 0 ? data.totalBalance : "0"}
            </h1>
            <h2 className="text-white">Balance</h2>
          </div>
          <div className="btn-color-by-logo-1 rounded-md p-2 text-center">
            <h1 className="font-bold text-white text-xl">
              {withdrawamountlist.length > 0
                ? totalwithDraws(withdrawamountlist)
                : "0"}
            </h1>
            <h2 className="text-white">Total Withdraw</h2>
          </div>
        </div>
        <div className="mt-5">
          {withdrawamountlist.length > 0 && (
            <div className="overflow-scroll shadow-sm border border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                    {/* <th className="px-6 py-4 text-sm font-semibold">ID</th> */}
                    <th className="px-6 py-4 text-sm font-semibold">Amount</th>
                    {/* <th className="px-6 py-4 text-sm font-semibold">
                    Payment Type
                  </th> */}
                    <th className="px-6 py-4 text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold">
                      Request On
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {withdrawamountlist.map((item: any) => (
                    <tr>
                      <td className="px-6 py-4 text-sm font-semibold">
                        {item.amount}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold">
                        {item.status}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold">
                        {formatDate(item.createdOn)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

import { Button } from "@material-tailwind/react";
import React from "react";

interface Product {
  userlist: any;
  addRefferalcode: (data: any, flag: number) => void;
}

const Adminusertable = ({ userlist, addRefferalcode }: Product) => {
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

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 mb-10">
      <table className="min-w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {userlist?.length > 0 && (
            <>
              {userlist.map((item: any, index: any) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {item.userName}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {item.amount}
                  </td>
                  <td className="px-4 py-3 text-green-600">
                    {formatDate(item.createdOn)}
                  </td>
                  <td className="px-4 py-3">{item.status}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => addRefferalcode(item, 1)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      color="red"
                      onClick={() => addRefferalcode(item, 2)}
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Adminusertable;

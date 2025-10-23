import { Button } from "@material-tailwind/react";
import React from "react";

interface Product {
  userlist: any;
  addRefferalcode: (data: any, flag: number) => void;
}

const Adminusertable = ({ userlist, addRefferalcode }: Product) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 mb-10">
      <table className="min-w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone No.</th>
            <th className="px-4 py-3">Referral Code</th>
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
                    {item.firstName + " " + item.lastName}
                  </td>
                  <td className="px-4 py-3">{item.email}</td>
                  <td className="px-4 py-3 text-green-600">
                    {item.phoneNumber}
                  </td>
                  <td className="px-4 py-3">{item.referralCode}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        item.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => addRefferalcode(item, 1)}
                    >
                      Add Refferral Code
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

import { Button } from "@material-tailwind/react";
import React from "react";

interface Product {
  products: any;
  onviewImage:(data:any)=> void;
}

const ProductTable = ({ products, onviewImage}: Product) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 mb-10">
      <table className="min-w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">SKU</th>
            {/* <th className="px-4 py-3">Product Image</th> */}
            <th className="px-4 py-3">Sale Price</th>
            <th className="px-4 py-3">Quantity</th>
            <th className="px-4 py-3">Status</th>
            {/* <th className="px-4 py-3 text-center">Action</th> */}
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 && (
            <>
              {products.map((item:any, index:any) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900 underline cursor-pointer" onClick={() => onviewImage(item)}>
                    {item.name}
                  </td>
                  <td className="px-4 py-3">{item.skU}</td>
                  {/* <td className="px-4 py-3">
                    <p className="font-semibold cursor-pointer" onClick={() => onviewImage(item)}>
                      {"No of images" + ` (${item.productImages?.length})`}
                    </p>
                  </td> */}
                  <td className="px-4 py-3 text-green-600">
                    <div>
                      <p>{item.salePrice.toFixed(2)} Rs</p>
                      <p className="line-through">{item.regularPrice.toFixed(2)} Rs</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">{item.quantity}</td>
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
                  {/* <td className="px-4 py-3 text-center space-x-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="default" size="sm">
                      Edit
                    </Button>
                  </td> */}
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;

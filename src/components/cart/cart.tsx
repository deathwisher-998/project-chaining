"use client";

import { useEffect, useState } from "react";
import Cartproductcard from "./cart-productcard";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";

export default function Cart() {
  const [cartproductlist, setcartproductlist] = useState<any>([]);
  const productSelector = useSelector((state: any) => state?.ProductCart);

  useEffect(() => {
    if (productSelector.cartproductlist) {
      const data: any = JSON.parse(productSelector?.cartproductlist);
      setcartproductlist((e: any) => data);
    }
  }, [productSelector]);

  return (
    <>
      <div className="p-0 mt-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left - Product List */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="space-y-4">
              {/* Product Item */}
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://via.placeholder.com/80"
                    alt="Product"
                    className="w-20 h-20 rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">Product Name</h3>
                    <p className="text-sm text-gray-500">Size: M</p>
                  </div>
                </div>
                <div>
                  <p className="font-semibold">$50.00</p>
                  <p className="text-sm text-gray-500">Qty: 2</p>
                </div>
              </div>

              {/* Another Product */}
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://via.placeholder.com/80"
                    alt="Product"
                    className="w-20 h-20 rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">Another Product</h3>
                    <p className="text-sm text-gray-500">Color: Blue</p>
                  </div>
                </div>
                <div>
                  <p className="font-semibold">$30.00</p>
                  <p className="text-sm text-gray-500">Qty: 1</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Checkout Summary */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>$130.00</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>$10.00</p>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-3">
                <p>Total</p>
                <p>$140.00</p>
              </div>
            </div>

            <button className="w-full mt-6 bg-gray-900 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Cartproductcard from "./cart-productcard";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { Apploader } from "../loader/loading";
import { cartproductList } from "@/app/globalstore/cart/actions";
import { TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Cart() {
  const [cartproductlist, setcartproductlist] = useState<any>([]);
  const productSelector = useSelector((state: any) => state?.ProductCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productSelector.cartproductlist) {
      const data: any = JSON.parse(productSelector?.cartproductlist);
      setcartproductlist((e: any) => data);
    } else {
      setcartproductlist((e: any) => []);
    }
  }, [productSelector]);

  // useEffect(() => {
  //   let mewdata = sessionStorage.getItem("cdata");
  //   if (mewdata) {
  //     dispatch(cartproductList(JSON.parse(mewdata)));
  //   }
  // }, []);

  const quantityUpdation = (qty: number, data: any, flag: number) => {
    if (flag == 1 || flag == 2) {
      const updatedList = cartproductlist.map((item: any) => {
        if (data.id == item.id) {
          return {
            ...item,
            ["cartquantity"]: flag == 1 ? qty + 1 : qty > 1 ? qty - 1 : 1,
          };
        } else {
          return item;
        }
      });
      let scartData = {
        cartproductlist:
          updatedList?.length > 0 ? JSON.stringify(updatedList) : null,
        productQuantity: updatedList?.length > 0 ? updatedList.length : null,
      };
      sessionStorage.setItem("cdata", JSON.stringify(scartData));
      dispatch(
        cartproductList({
          cartproductlist:
            updatedList?.length > 0 ? JSON.stringify(updatedList) : null,
          productQuantity: updatedList?.length > 0 ? updatedList.length : null,
        })
      );
    } else if (flag == 3) {
      const updatedList = cartproductlist.filter((item: any) => {
        if (data.id != item.id) {
          return item;
        }
      });
      let scartData = {
        cartproductlist:
          updatedList?.length > 0 ? JSON.stringify(updatedList) : null,
        productQuantity: updatedList?.length > 0 ? updatedList.length : null,
      };
      sessionStorage.setItem("cdata", JSON.stringify(scartData));
      dispatch(
        cartproductList({
          cartproductlist:
            updatedList?.length > 0 ? JSON.stringify(updatedList) : null,
          productQuantity: updatedList?.length > 0 ? updatedList.length : null,
        })
      );
    }
  };

  function totalAmount(data: any) {
    let total = 0;
    if (data.length > 0) {
      let carttotallist = data.map((it: any) => {
        return { ...it, ["total"]: it.salePrice * it.cartquantity };
      });
      total = carttotallist.reduce((acc: any, numval: any) => {
        return acc + numval.total;
      }, 0);
    }
    return total;
  }

  return (
    <>
      <Apploader Loadingstate={0}>
        {cartproductlist.length > 0 ? (
          <div
            className={`p-0 mt-20 ${
              cartproductlist.length > 3 ? "mb-60" : "mb-80"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Left - Product List */}
              <div
                className="md:col-span-2 bg-white rounded-xl shadow-md p-6"
                style={{ border: "1px solid #ccc" }}
              >
                <div className="space-y-4">
                  {/* Product Item */}
                  {cartproductlist.map((item: any, i: number) => {
                    return (
                      <div
                        className="flex items-center justify-between border-b pb-2 custom-res-cart"
                        key={i}
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src="/image/product-image/blankets-img.jpg"
                            alt="Product"
                            className="w-20 h-20 rounded-lg"
                          />
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            {/* <p className="text-sm text-gray-500">Size: M</p> */}
                          </div>
                        </div>
                        <div className="flex items-center custom-res-cart-c1">
                          <div className="mr-5 pt-5">
                            <p className="font-semibold">
                              {item.salePrice * item.cartquantity} Rs
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.cartquantity}
                            </p>
                          </div>

                          <div
                            className="items-center flex"
                            style={{ flexDirection: "column" }}
                          >
                            <div className="flex items-center gap-4 mt-6">
                              <button
                                onClick={() =>
                                  quantityUpdation(item.cartquantity, item, 2)
                                }
                                className="px-3 bg-gray-200 rounded-md hover:bg-gray-300"
                              >
                                -
                              </button>
                              <span className="text-sm font-semibold">
                                {item.cartquantity}
                              </span>
                              <button
                                onClick={() =>
                                  quantityUpdation(item.cartquantity, item, 1)
                                }
                                className="px-3 bg-gray-200 rounded-md hover:bg-gray-300"
                              >
                                +
                              </button>
                            </div>

                            <div className="mt-3">
                              <Button
                                variant="outlined"
                                size="sm"
                                onClick={(e) => quantityUpdation(0, item, 3)}
                              >
                                <TrashIcon
                                  strokeWidth={2}
                                  className="h-3 w-3"
                                  stroke="gray"
                                />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right - Checkout Summary */}
              <div
                className="rounded-xl shadow-md p-6"
                style={{ backgroundColor: "#c3eeff" }}
              >
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p>Total Items </p>
                    <p>{cartproductlist?.length} Items</p>
                  </div>
                  {/* <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>$130.00</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>$10.00</p>
                  </div> */}
                  <div className="flex justify-between font-semibold text-lg border-t pt-3">
                    <p>Total</p>
                    <p>{totalAmount(cartproductlist)} Rs</p>
                  </div>
                </div>

                <Link href={"/order-success"}>
                  <button className="w-full mt-6 bg-gray-900 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="p-0 mt-60 mb-60">
              <div className="grid grid-cols-1 gap-4">
                <div className="text-center">
                  <h1 className="text-4xl">No Data in Cart</h1>
                </div>
              </div>
            </div>
          </>
        )}
      </Apploader>
    </>
  );
}

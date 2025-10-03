"use client";

import { useEffect, useState } from "react";
import Cartproductcard from "./cart-productcard";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { Apploader } from "../loader/loading";
import { cartproductList } from "@/app/globalstore/cart/actions";
import { TrashIcon } from "@heroicons/react/24/solid";
import { userAddress, userAddressByid } from "@/helpers/services/users";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createOrder } from "@/helpers/services/order";
import { ToastContainer, toast } from "react-toastify";
import config from "@/config";

export default function Cart() {
  const [cartproductlist, setcartproductlist] = useState<any>([]);
  const productSelector = useSelector((state: any) => state?.ProductCart);
  const dispatch = useDispatch();
  const [addressList, setaddressList] = useState([]);
  const [cartLoading, setcartLoading] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpen, setisOpen] = useState(false);
  const navigation = useRouter();

  useEffect(() => {
    if (productSelector.cartproductlist) {
      const data: any = JSON.parse(productSelector?.cartproductlist);
      setcartproductlist((e: any) => data);
    } else {
      setcartproductlist((e: any) => []);
    }
  }, [productSelector]);

  useEffect(() => {
    let mewdata = localStorage.getItem("cdata");
    if (mewdata) {
      dispatch(cartproductList(JSON.parse(mewdata)));
    }

    let addressID = localStorage.getItem("adsData");
    if (addressID) {
      let id = JSON.parse(addressID);
      if (id?.id) {
        setSelectedId((e) => id?.id);
      }
    } else {
      setSelectedId((e) => null);
    }
    useraddress();
  }, []);

  async function useraddress() {
    try {
      setcartLoading(1);
      const uID = localStorage.getItem("uId");
      const response: any = await userAddressByid(uID).then((res) => res);
      if (response.succeeded && response.data?.length > 0) {
        setaddressList((e: any) => response.data);
      } else {
        setaddressList((e) => []);
      }
      setcartLoading((e) => 0);
    } catch (error) {
      setcartLoading((e) => 0);
      setaddressList((e) => []);
    }
  }

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
      localStorage.setItem("cdata", JSON.stringify(scartData));
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
      localStorage.setItem("cdata", JSON.stringify(scartData));
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

  async function Ordercompletetion() {
    try {
      setcartLoading((e) => 1);
      let payload = await payloadSetup(
        productSelector.cartproductlist &&
          JSON.parse(productSelector.cartproductlist)
      );
      let response: any = await createOrder(payload).then((res) => res);
      if (response.succeeded) {
        localStorage.removeItem("cdata");
        localStorage.removeItem("adsData");
        navigation.push("/order-success");
        dispatch(
          cartproductList({
            cartproductlist: null,
            productQuantity: null,
          })
        );
      } else {
        toast.error("Error while placing order");
      }
      setcartLoading((e) => 0);
    } catch (error) {
      setcartLoading((e) => 0);
      if (!selectedId) {
        toast.error("Please select Address");
      } else {
        toast.error("Error while placing order");
      }
    }
  }

  function payloadSetup(data: any) {
    let obj;
    if (data.length > 0) {
      obj = {
        id: "",
        userId: localStorage.getItem("uId"),
        addressId: selectedId,
        status: "",
        items: data.map((it: any) => {
          return {
            id: "",
            productId: it.id ? it.id : "",
            price:
              it.salePrice && it.cartquantity
                ? it.salePrice * it.cartquantity
                : 0,
            quantity: it.cartquantity ? it.cartquantity : 0,
          };
        }),
      };
    }

    return obj;
  }

  function cartAddress() {
    let addr: any = localStorage.getItem("adsData");
    if (!addr) {
      return (
        <>
          <div className="mt-10 mb-5 w-full">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => setisOpen(true)}
            >
              {" "}
              Select Shipping Address
            </Button>
          </div>
        </>
      );
    }
    addr = JSON.parse(addr);
    return (
      <div className="mt-5 mb-2">
        <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
        <div
          className={`cursor-pointer border rounded-lg p-4 shadow-sm transition border-gray-200 bg-white`}
        >
          {" "}
          <div className="flex items-start justify-between">
            {" "}
            <div>
              {" "}
              <p className="font-semibold text-gray-900">{addr.type}</p>{" "}
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
          </div>{" "}
        </div>

        <div className="flex justify-between mt-5">
          <div>
            <Button
              onClick={() => navigation.push("/profile/crxdA78")}
              size="sm"
              variant="outlined"
            >
              Add Address
            </Button>
          </div>
          <div>
            <Button
              onClick={() => setisOpen(true)}
              size="sm"
              variant="outlined"
            >
              Change Address
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const imgUrl = config.imgBaseurl;
  const imagePathFunc = (data: any) => {
    let pathvalue = data;
    if (pathvalue) {
      pathvalue = pathvalue.replace(/\\/g, "/");
    }

    return pathvalue;
  };

  function imageData(data: any) {
    let path;
    if (data?.length > 0) {
      path = imgUrl + imagePathFunc(data[0]?.imagePath);
    } else {
      path = "/image/product-image/blankets-img.jpg";
    }

    return path;
  }

  return (
    <>
      <Apploader Loadingstate={cartLoading}>
        <ToastContainer />
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
                        <div className="flex items-center space-x-4 custom-res-cart-3">
                          <img
                            src={imageData(item.productImages)}
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

                <div>{cartAddress()}</div>

                <button
                  onClick={() => Ordercompletetion()}
                  className="w-full mt-6 bg-gray-900 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition"
                >
                  Proceed to Checkout
                </button>
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

      <Dialog open={isOpen} dismiss={false}>
        <>
          <DialogHeader>Select Address</DialogHeader>
          <DialogBody className="bg-dark rounded-lg">
            {addressList?.length > 0 && (
              <div
                className="space-y-4"
                style={{ height: "400px", overflowX: "scroll" }}
              >
                {" "}
                {addressList.map((addr: any, ind: number) => (
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
                        <p className="text-sm text-gray-600">
                          {addr.phoneNumber}
                        </p>{" "}
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
              </div>
            )}

            {addressList.length == 0 && (
              <div className="pt-10 pb-10">
                <div className="text-center">
                  <h1 className="text-xl font-semibold text-black mb-5">
                    Please Add Address to complete order
                  </h1>
                  <Button
                    variant="outlined"
                    onClick={() => navigation.push("/profile/crxdA78")}
                  >
                    Add Address
                  </Button>
                </div>
              </div>
            )}
          </DialogBody>
          <DialogFooter>
            <Button
              size="sm"
              variant="outlined"
              onClick={() => setisOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </>
      </Dialog>
    </>
  );
}

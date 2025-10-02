"use client";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import productsList from "@/components/JSON/product.json";
import { useDispatch, useSelector } from "react-redux";
import { cartproductList } from "@/app/globalstore/cart/actions";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import config from "@/config";

interface Productdetail {
  id: string;
  data: any;
  addcart: any;
}

export default function ProductDetails({ id, data, addcart }: Productdetail) {
  const [quantity, setQuantity] = useState(0);
  const [productData, setproductData] = useState<any>(null);
  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const dispatch = useDispatch();
  const productSelector = useSelector((state: any) => state?.ProductCart);
  const { token, loading } = useAuth(); // your auth logic
  const navigation = useRouter();
  const imgurl = config.imgBaseurl;

  useEffect(() => {
    if (data && id) {
      setQuantity((e) => data.cartquantity);
      setproductData((e: any) => data);
    }
  }, [data]);

  useEffect(() => {
    if (quantity > 0) {
      if (data) {
        if (productSelector.cartproductlist) {
          let productlist = JSON.parse(productSelector.cartproductlist);
          if (productlist.length > 0) {
            productlist = productlist.map((item: any) => {
              if (data.id == item.id) {
                return { ...item, ["cartquantity"]: quantity };
              } else {
                return item;
              }
            });
            let scartData = {
              cartproductlist:
                productlist?.length > 0 ? JSON.stringify(productlist) : null,
              productQuantity:
                productlist?.length > 0 ? productlist.length : null,
            };
            sessionStorage.setItem("cdata", JSON.stringify(scartData));
            dispatch(
              cartproductList({
                cartproductlist:
                  productlist?.length > 0 ? JSON.stringify(productlist) : null,
                productQuantity:
                  productlist?.length > 0 ? productlist.length : null,
              })
            );
          }
        }
      }
    }
  }, [quantity]);

  return (
    <>
      {productData && (
        <div className="py-10 mt-10 mb-10">
          <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl border-2 p-8">
            {/* Product Image */}
            <div className="flex justify-center items-center">
              <img
                src={
                  productData.productImages
                    ? imgurl + productData.productImages
                    : "/image/product-image/blankets-img.jpg"
                }
                alt="Product"
                className="rounded-xl w-[100%] object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {productData?.name}
                </h1>
                {/* <p className="text-gray-500 mt-2">Category: Footwear</p> */}
                <div className="flex">
                  <p className="text-4xl font-semibold text-black mt-4 mr-5">
                    Price {productData?.salePrice} Rs
                  </p>
                  <p className="text-black mt-6 line-through">
                    {productData?.regularPrice} Rs
                  </p>
                </div>

                <p className="mt-6 text-gray-600 leading-relaxed">
                  {productData?.discription}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="flex justify-between">
                <div className="flex items-center gap-4 mt-6">
                  <button
                    onClick={decreaseQty}
                    className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={increaseQty}
                    className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <div>
                  {!productData.addtocart && (
                    <div className="flex gap-4 mt-8">
                      <Button
                        onClick={() => addcart(data, quantity)}
                        className="flex-1 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {productData.addtocart && (
                <div className="flex gap-4 mt-8">
                  <Button
                    className="flex-1 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
                    onClick={() =>
                      token
                        ? navigation.push("/cart")
                        : navigation.push("/login")
                    }
                  >
                    View Cart
                  </Button>
                  <Button
                    onClick={() => addcart(data, 1)}
                    className="flex-1 py-3 rounded-lg font-semibold text-black"
                    variant="outlined"
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

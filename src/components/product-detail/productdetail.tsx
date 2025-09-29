"use client";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import productsList from "@/components/JSON/product.json"

interface Productdetail {
  id: number;
}

export default function ProductDetails({ id }: Productdetail) {
  const [quantity, setQuantity] = useState(1);
  const [productData, setproductData] = useState<any>(null)
  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  useEffect(() => {
    if(id){
      const data = productsList.filter((item) => item.productid == id);
      if(data.length > 0){
        setproductData((e:any) => data[0])
      }else{
        setproductData((e:any) => null)
      }
    }else{
      setproductData((e:any) => null)
    }
  },[id])

  return (
    <div className="py-10 px-6 mt-20 mb-20">
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl border-2 p-8">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={productData?.img}
            alt="Product"
            className="rounded-xl w-[100%] object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {productData?.title}
            </h1>
            <p className="text-gray-500 mt-2">Category: Footwear</p>
            <p className="text-4xl font-semibold text-black mt-4">{productData?.label}</p>

            <p className="mt-6 text-gray-600 leading-relaxed">
              These sneakers are lightweight, stylish, and durable. Perfect for
              running, gym, or casual wear. Designed with breathable fabric and
              cushioned soles for all-day comfort.
            </p>
          </div>

          {/* Quantity Selector */}
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

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Button className="flex-1 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-700 transition">
              Add to Cart
            </Button>
            <Button
              className="flex-1 py-3 rounded-lg font-semibold text-black"
              variant="outlined"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Typography } from "@material-tailwind/react";
import CourseCard from "@/components/course-card";
import { useEffect, useRef, useState } from "react";
import productlist from "@/components/JSON/product.json";
import { useDispatch } from "react-redux";
import {cartproductList, addToCartFunc} from "@/app/globalstore/cart/actions"

export function ExploreCourses() {
  const [products, setproducts] = useState([]);
  const productsRef = useRef()
  const dispatch = useDispatch();

  useEffect(() => {
    productsRef.current = productlist;
    setproducts((e) => [...productsRef.current]);
  }, []);

  const addandremovetocart = (data: any) => {
    if (data) {
      const productdata = products.map((item: any) => {
        if (item.productid == data) {
          return { ...item, ["addtocart"]: !item.addtocart ? true : false };
        } else {
          return item;
        }
      });

      productsRef.current = productdata
      setproducts((e) => [...productsRef.current]);
      const storelist = productsRef.current.filter((item:any) => item.addtocart == true)
      dispatch(cartproductList({cartproductlist:storelist?.length > 0 ? JSON.stringify(storelist) : null, productQuantity:storelist?.length > 0 ? storelist.length : null}))
    }
  };

  return (
    <section className="px-8 pt-80">
      <div className="container mx-auto mb-24 text-center">
        <Typography variant="h2" color="blue-gray">
          Our Products
        </Typography>
        <Typography
          variant="lead"
          className="mt-2 mx-auto w-full px-4 !text-gray-500 lg:w-6/12 lg:px-8"
        >
          Browse through 1,000+ web development courses and find the one that
          fits your needs.
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-24 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-14">
        {products.map((props, idx) => (
          <CourseCard key={idx} {...props} addcart={addandremovetocart} />
        ))}
      </div>
    </section>
  );
}

export default ExploreCourses;

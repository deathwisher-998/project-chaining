"use client";

import { Typography } from "@material-tailwind/react";
import CourseCard from "@/components/course-card";
import { useEffect, useRef, useState } from "react";
import productlist from "@/components/JSON/product.json";
import newproductlist from "@/components/JSON/productlist.json";
import { useDispatch, useSelector } from "react-redux";
import { cartproductList, addToCartFunc } from "@/app/globalstore/cart/actions";
import { Productlist } from "@/helpers/services/product";
import { Apploader } from "../loader/loading";
import { productImage } from "@/helpers/services/product";
import ProductCard from "../product-card-new/productcard";

export function ExploreCourses() {
  const [products, setproducts] = useState<any>([]);
  const productsRef = useRef<any>(null);
  const dispatch = useDispatch();
  const [productLoader, setproductLoader] = useState(0);
  const productImgref = useRef<any>(null);
  const productSelector = useSelector((state: any) => state?.ProductCart);

  // useEffect(() => {
  //   getProductlist();
  // }, []);

  useEffect(() => {
    let mewdata = localStorage.getItem("cdata");
    if (mewdata) {
      dispatch(cartproductList(JSON.parse(mewdata)));
      getProductlist();
    } else {
      getProductlist();
    }
  }, []);

  async function getProductlist() {
    try {
      setproductLoader(1);
      const response: any = await Productlist().then((res) => res);
      if (response.succeeded && response.data?.length > 0) {
        // productsRef.current = response.data;
        productsRef.current = limitProductsPerCategory(
          response.data.filter((item: any) => item.isActive)
        );
        productsRef.current.forEach((item: any) => {
          item.addtocart = false;
          item.cartquantity = 1;
        });
        let mewdata: any = localStorage.getItem("cdata");
        mewdata = JSON.parse(mewdata);
        if (productSelector.cartproductlist || mewdata?.cartproductlist) {
          const data: any = JSON.parse(
            productSelector?.cartproductlist || mewdata?.cartproductlist
          );

          productsRef.current = productsRef.current.map((it: any) => {
            let matched = false;
            const item = data.filter((its: any) => {
              if (it.id == its.id) {
                matched = true;
                return its;
              }
            });
            if (matched) {
              return item[0];
            } else {
              return it;
            }
          });

          setproducts((e: any) => [...productsRef.current]);
          setproductLoader((e) => 0);
          return;
        }

        setproducts((e: any) => [...productsRef.current]);
        setproductLoader((e) => 0);
      } else {
        setproductLoader((e) => 0);
      }
    } catch (err) {
      setproductLoader((e) => 0);
    }
  }

  function limitProductsPerCategory(data: any, limit = 2) {
    const categoryMap: any = {};

    // Group products by categoryId
    data.forEach((item: any) => {
      const categoryId = item.categoryId;
      if (!categoryMap[categoryId]) {
        categoryMap[categoryId] = [];
      }

      // Add item only if the category has less than the limit
      if (categoryMap[categoryId].length < limit) {
        categoryMap[categoryId].push(item);
      }
    });

    // Flatten all limited categories back into a single array
    return Object.values(categoryMap).flat();
  }

  const imagePathFunc = (data: any) => {
    let pathvalue = data;
    if (pathvalue) {
      pathvalue = pathvalue.replace(/\\/g, "/");
    }

    return pathvalue;
  };

  async function productImages(id: string) {
    try {
      const response: any = await productImage(id).then((res) => res);
      return response;
    } catch (err) {}
  }

  const addandremovetocart = (data: any) => {
    if (data) {
      const productdata = products.map((item: any) => {
        if (item.id == data) {
          return { ...item, ["addtocart"]: !item.addtocart ? true : false };
        } else {
          return item;
        }
      });

      productsRef.current = productdata;
      setproducts((e) => [...productsRef.current]);
      const storelist = productsRef.current.filter(
        (item: any) => item.addtocart == true
      );
      let scartData = {
        cartproductlist:
          storelist?.length > 0 ? JSON.stringify(storelist) : null,
        productQuantity: storelist?.length > 0 ? storelist.length : null,
      };
      localStorage.setItem("cdata", JSON.stringify(scartData));
      dispatch(
        cartproductList({
          cartproductlist:
            storelist?.length > 0 ? JSON.stringify(storelist) : null,
          productQuantity: storelist?.length > 0 ? storelist.length : null,
        })
      );
    }
  };

  return (
    <Apploader Loadingstate={productLoader}>
      <section className="px-2 md:px-8 mt-10 md:mt-20 mb-20">
        <div className="container mx-auto mb-7 md:mb-14 text-center">
          <Typography
            variant="h2"
            className="text-color-by-logo-2 font-semibold text-2xl md:text-4xl md:mb-5"
          >
            Our Products
          </Typography>
        </div>
        <div className="container mx-auto grid grid-cols-2 gap-x-2 md:gap-x-10 gap-y-5 md:gap-y-10 lg:gap-y-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {products.map(
            (props, idx) =>
              props.isActive && (
                <ProductCard
                  key={idx}
                  {...props}
                  addcart={addandremovetocart}
                />
              )
          )}
          {/* <CourseCard key={idx} {...props} addcart={addandremovetocart} /> */}
        </div>
      </section>
    </Apploader>
  );
}

export default ExploreCourses;

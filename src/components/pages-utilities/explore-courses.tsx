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

export function ExploreCourses() {
  const [products, setproducts] = useState<any>([]);
  const productsRef = useRef<any>(null);
  const dispatch = useDispatch();
  const [productLoader, setproductLoader] = useState(0);
  const productImgref = useRef<any>(null);
  const productSelector = useSelector((state: any) => state?.ProductCart);

  useEffect(() => {
    getProductlist();
  }, []);

  async function getProductlist() {
    try {
      setproductLoader(1);
      const response: any = await Productlist().then((res) => res);
      if (response.succeeded && response.data?.length > 0) {
        productsRef.current = response.data;
        productsRef.current.forEach((item: any) => {
          item.addtocart = false;
          item.cartquantity = 1;
        });

        productsRef.current = await Promise.all(
          productsRef.current.map(async (product: any) => {
            const imgRes = await productImages(product.id).then((res) => res);
            const images = await imgRes;
            return {
              ...product,
              productImages:
                images.data?.length > 0
                  ? imagePathFunc(images.data[0]?.imagePath)
                  : null,
            };
          })
        );

        if (productSelector.cartproductlist) {
          const data: any = JSON.parse(productSelector?.cartproductlist);

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
    console.log('s 1');
    
    if (data) {
       console.log('s 2');
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
        }
      sessionStorage.setItem('cdata', JSON.stringify(scartData))
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
      <section className="px-8 mt-40 mb-20">
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
    </Apploader>
  );
}

export default ExploreCourses;

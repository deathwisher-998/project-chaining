"use client";

import { Apploader } from "@/components/loader/loading";
import ProductDetails from "@/components/product-detail/productdetail";
import SuggestedProducts from "@/components/product-detail/suggestedProducts";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  productDetails,
  productImage,
  Productlist,
} from "@/helpers/services/product";
import { useDispatch, useSelector } from "react-redux";
import { cartproductList } from "@/app/globalstore/cart/actions";

export default function Productdetail() {
  const params: any = useSearchParams();
  const productid = params.get("id");
  const [pageloader, setpageloader] = useState(0);
  const [productDetailsdata, setproductDetailsdata] = useState<any>(null);
  const [products, setproducts] = useState<any>([]);
  const productsRef = useRef<any>(null);
  const productSelector = useSelector((state: any) => state?.ProductCart);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   Productdetails(productid);
  // }, []);

  useEffect(() => {
    let mewdata = localStorage.getItem("cdata");
    if (mewdata) {
      dispatch(cartproductList(JSON.parse(mewdata)));
      Productdetails(productid);
    } else {
      Productdetails(productid);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productid]);

  async function Productdetails(id: string) {
    try {
      if (id) {
        setpageloader(1);
        const response: any = await productDetails(id).then((res) => res);
        if (response.succeeded && response.data) {
          let mewdata: any = localStorage.getItem("cdata");
          mewdata = JSON.parse(mewdata);

          if (productSelector.cartproductlist || mewdata?.cartproductlist) {
            const data: any = JSON.parse(
              productSelector?.cartproductlist || mewdata?.cartproductlist
            );
            let cartadd = data.filter((it: any) => it.id == response.data?.id);

            if (cartadd.length > 0) {
              setproductDetailsdata((e: any) => cartadd[0]);
              getProductlist();
              return;
            }
          }

          let item = {
            ...response.data,
            ["addtocart"]: false,
            ["cartquantity"]: 1,
          };
          setproductDetailsdata((e: any) => item);
          getProductlist();
        } else {
          setpageloader(0);
          setproductDetailsdata((e: any) => null);
        }
      }
    } catch (err) {
      setpageloader(0);
      setproductDetailsdata((e: any) => null);
    }
  }

  async function getProductlist() {
    try {
      const response: any = await Productlist().then((res) => res);
      productsRef.current = response.data;
      productsRef.current.forEach((item: any) => {
        item.addtocart = false;
        item.cartquantity = 1;
      });

      productsRef.current = productsRef.current.filter(
        (items: any) => items.id != productid
      );
      setproducts((e: any) => [...productsRef.current]);
      setpageloader(0);
    } catch (err) {}
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

  const addandremovetocart = (data: any, quantity: any) => {
    if (data) {
      if (productSelector.cartproductlist) {
        const datalist: any = JSON.parse(productSelector?.cartproductlist);
        let cartadd = datalist.filter((it: any) => it.id == data?.id);
        if (cartadd.length > 0) {
          let notincart = datalist.filter((it: any) => it.id != data?.id);
          let obj = {
            ...productDetailsdata,
            ["addtocart"]: !data.addtocart ? true : false,
            ["cartquantity"]: quantity,
          };
          setproductDetailsdata((e: any) => obj);
          let scartData = {
            cartproductlist:
              notincart?.length > 0 ? JSON.stringify(notincart) : null,
            productQuantity: notincart?.length > 0 ? notincart.length : null,
          };
          localStorage.setItem("cdata", JSON.stringify(scartData));
          dispatch(
            cartproductList({
              cartproductlist:
                notincart?.length > 0 ? JSON.stringify(notincart) : null,
              productQuantity: notincart?.length > 0 ? notincart.length : null,
            })
          );

          return;
        } else {
          const datalist: any = JSON.parse(productSelector?.cartproductlist);
          let obj = {
            ...productDetailsdata,
            ["addtocart"]: !data.addtocart ? true : false,
            ["cartquantity"]: quantity,
          };
          setproductDetailsdata((e: any) => obj);
          const dataAddedlist = [...datalist, obj];
          let scartData = {
            cartproductlist:
              dataAddedlist?.length > 0 ? JSON.stringify(dataAddedlist) : null,
            productQuantity:
              dataAddedlist?.length > 0 ? dataAddedlist.length : null,
          };
          localStorage.setItem("cdata", JSON.stringify(scartData));
          dispatch(
            cartproductList({
              cartproductlist:
                dataAddedlist?.length > 0
                  ? JSON.stringify(dataAddedlist)
                  : null,
              productQuantity:
                dataAddedlist?.length > 0 ? dataAddedlist.length : null,
            })
          );
        }
      } else {
        itemNotincart(data, quantity);
      }
    }
  };

  function itemNotincart(data: any, qty: any) {
    if (data) {
      let obj = {
        ...productDetailsdata,
        ["addtocart"]: !data.addtocart ? true : false,
        ["cartquantity"]: qty,
      };
      setproductDetailsdata((e: any) => obj);
      const productdata = [
        {
          ...data,
          ["addtocart"]: !data.addtocart ? true : false,
          ["cartquantity"]: qty,
        },
      ];

      let scartData = {
        cartproductlist:
          productdata?.length > 0 ? JSON.stringify(productdata) : null,
        productQuantity: productdata?.length > 0 ? productdata.length : null,
      };
      localStorage.setItem("cdata", JSON.stringify(scartData));
      dispatch(
        cartproductList({
          cartproductlist:
            productdata?.length > 0 ? JSON.stringify(productdata) : null,
          productQuantity: productdata?.length > 0 ? productdata.length : null,
        })
      );
    }
  }

  return (
    <>
      <Apploader Loadingstate={pageloader}>
        {productDetailsdata ? (
          <>
            {" "}
            <ProductDetails
              id={productid}
              data={productDetailsdata}
              addcart={addandremovetocart}
            />
            <div className="px-5 md:px-0">
              <SuggestedProducts data={products} />
            </div>
          </>
        ) : (
          <>
            <div className="mt-60 mb-60 text-center">
              <h2 className="font-bold text-3xl">
                wait while product details is loading
              </h2>
            </div>
          </>
        )}
      </Apploader>
    </>
  );
}

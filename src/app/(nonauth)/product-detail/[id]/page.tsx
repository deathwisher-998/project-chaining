"use client";

import ProductDetails from "@/components/product-detail/productdetail";
import SuggestedProducts from "@/components/product-detail/suggestedProducts";
import { useSearchParams } from "next/navigation";

export default function Productdetail() {

  const params:any = useSearchParams();
  const productid = params.get("id");

  return (
    <>
      <ProductDetails id={productid} />
      <SuggestedProducts />
    </>
  );
}

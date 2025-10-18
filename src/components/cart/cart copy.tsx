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
      <div className="grid grid-cols-12 gap-2 mt-5">
        <div className={`border rounded-md p-5 ${cartproductlist?.length > 0 ? "col-span-8" : "col-span-12"}`}>
          {cartproductlist.length > 0 && (
            <>
              {cartproductlist.map((item: any, index: number) => (
                <Cartproductcard key={index} {...item} />
              ))}
            </>
          )}
          {cartproductlist.length == 0 && <h1 className="text-center text-xl">No product found in cart</h1>}
        </div>
       {cartproductlist?.length > 0 && <div className="col-span-4 p-5">
           <>
          <div className="grid grid-cols-1 gap-2">
             <div>
                <h2 className="text-xl">Order Details</h2>
             </div>

             <div>
                <div><h6 className="text-md">Total Products : {"0"}</h6></div>
                <div><h6 className="text-md">Sub Total : {"0"}</h6></div>
                <div><h6 className="text-md">Total Price : {"0"}</h6></div>
             </div>

             <div>
                <Button type="button" variant="filled"> Checkout </Button>
             </div>
          </div>
          </>
        </div> }
      </div>
    </>
  );
}

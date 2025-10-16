"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import ProductTable from "./product-components/producttable";
import { Apploader } from "@/components/loader/loading";
import { useEffect, useState } from "react";
import { productAdd, Productlist } from "@/helpers/services/product";
import Addproductform from "./product-components/add-product";
import Chakraprovider from "@/components/Provider/Provider";
import { categoryList } from "@/helpers/services/category";
import { toast, ToastContainer } from "react-toastify";

export default function Productpage() {
  const [loading, setloading] = useState(1);
  const [productList, setproductList] = useState(null);
  const [isOpen, setisOpen] = useState(false);
  const [Categorylist, setCategorylist] = useState(null);

  useEffect(() => {
    getCatgoryList();
    getProductlist();
  }, []);

  async function getProductlist() {
    try {
      setloading((e) => 1);
      const response: any = await Productlist().then((res) => res);
      if (response.succeeded) {
        setproductList((e) => response.data);
      } else {
        setproductList((e) => null);
      }
      setloading((e) => 0);
    } catch (err) {
      setloading((e) => 0);
      setproductList((e) => null);
    }
  }

  async function getCatgoryList() {
    try {
      const response: any = await categoryList().then((res) => res);
      if (response.succeeded) {
        setCategorylist((e) => response.data);
      } else {
        setCategorylist((e) => null);
      }
    } catch (error) {
      setCategorylist((e) => null);
    }
  }

  const addProduct = async (data: any, flag: boolean) => {
    try {
      if (data) {
        setloading((e) => 1);
        let payload = { ...data, ["id"]: "", ["isActive"]: true };
        const response: any = await productAdd(payload).then((res) => res);
        if (response.succeeded) {
          setisOpen((e) => false);
          toast.success("Product added successfully");
          getProductlist();
        } else {
          toast.error("Something went wrong");
        }
        setloading((e) => 0);
      }
    } catch (err) {
      setloading(0);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <ToastContainer />
      <Apploader Loadingstate={loading}>
        <div className="container mx-auto">
          <div className="flex justify-between align-center mb-5 mt-5">
            <div>
              <h1 className="m-0 p-0 font-semibold text-lg">Product List</h1>
            </div>
            <div>
              <Button
                variant="filled"
                color="gray"
                onClick={() => setisOpen(true)}
              >
                Add Product
              </Button>
            </div>
          </div>
          <div>
            <ProductTable products={productList} />
          </div>
        </div>
      </Apploader>

      <Dialog open={isOpen} dismiss={false}>
        <Apploader Loadingstate={loading}>
          <Chakraprovider>
            <Addproductform
              categorylist={Categorylist}
              onAdd={addProduct}
              onClose={(e) => setisOpen(e)}
            />
          </Chakraprovider>
        </Apploader>
      </Dialog>
    </>
  );
}

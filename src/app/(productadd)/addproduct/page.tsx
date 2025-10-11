"use client";

import config from "@/config";
import { productAdd, productImageAdd } from "@/helpers/services/product";
import axios from "axios";
import { useRef } from "react";

export default function Addproduct() {
  const imageFilePath = useRef(null);
  

  let obj = {
    id: "",
    categoryId: "0a452f4f-38c8-474e-9e01-21d1e386f7fa",
    name: "Heavy GSM Placement Print T-Shirt | Blue",
    skU: "4505466-09R",
    regularPrice: 1399,
    salePrice: 839,
    quantity: 100,
    discription: "",
    isActive: true,
  };

  async function productaddFunc() {
    try {
      const response = await productAdd(obj).then((res) => res);
    } catch (err) {}
  }

  async function productImageadd() {
    // console.log('imageFilePath.current', imageFilePath.current);
    let obj = {
      Id: "",
      ProductId: "5400f023-3bbe-48a0-ba31-b96a997e949b",
      Thumbnail: false,
      DisplayOrder: 1,
      Image: imageFilePath.current,
      UploadType: 1,
      Extension: "jpeg",
    };
    const formdata = await convertObjToformData(obj);
    try {
      const response = await productimageAdd(formdata);
    } catch (err) {}
  }

  async function productimageAdd(data: any) {
    try {
      if (data) {
        const response = await axios
          .post(config.baseUrl + "/Product/productImage", data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res: any) => {
            return res;
          });

        return response;
      }
    } catch (err: any) {
      // console.log('check errr');
    }
  }

  function convertObjToformData(data: any) {
    if (data) {
      let form_data = new FormData();
      for (var key in data) {
        form_data.append(key, data[key]);
      }
      return form_data;
    }
  }

  function Imagepathvalue(e: any) {
    const file = e.target.files[0];
    imageFilePath.current = file;
  }

  return (
    <>
      <button onClick={() => productaddFunc()}>Add Product</button>
      <input type="file" onChange={(e) => Imagepathvalue(e)} />
      <button onClick={() => productImageadd()}>Add Image</button>
    </>
  );
}

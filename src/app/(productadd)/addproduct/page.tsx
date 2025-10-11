"use client";

import config from "@/config";
import { productAdd, productImageAdd } from "@/helpers/services/product";
import axios from "axios";
import { useRef } from "react";

export default function Addproduct() {
  const imageFilePath = useRef(null);
  

  let obj = {
    id: "",
    categoryId: "5d70a287-c4b2-45b8-a420-fe363f85699c",
    name: "Black Embroidered Viscose Rayon Straight Suit Set With Dupatta",
    skU: "400587R-S",
    regularPrice: 4699,
    salePrice: 1199,
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
      ProductId: "159bc703-03c2-4cd0-951f-81be1b53b03a",
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

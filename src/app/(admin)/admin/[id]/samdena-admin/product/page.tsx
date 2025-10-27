"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import ProductTable from "./product-components/producttable";
import { Apploader } from "@/components/loader/loading";
import { useEffect, useRef, useState } from "react";
import { productAdd, Productlist } from "@/helpers/services/product";
import Addproductform from "./product-components/add-product";
import Chakraprovider from "@/components/Provider/Provider";
import { categoryList } from "@/helpers/services/category";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import config from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import Adminnavbar from "../../../admin-navbar/adminNavbar";

export default function Productpage() {
  const [loading, setloading] = useState(1);
  const [productList, setproductList] = useState<any>(null);
  const [isOpen, setisOpen] = useState(false);
  const [Categorylist, setCategorylist] = useState(null);
  const [isImageOpen, setisImageOpen] = useState(false);
  const [productImageList, setproductImageList] = useState<any>(null);
  const imgUrl = config.imgBaseurl;
  const selectedImagedata = useRef<any>(null);
  const [addImageFlag, setaddImageFlag] = useState(false);
  const navigation = useRouter();

  useEffect(() => {
    getCatgoryList();
    getProductlist();
  }, []);

  async function getProductlist() {
    try {
      setloading((e) => 1);
      const response: any = await Productlist().then((res) => res);
      if (response.succeeded && response.data?.length > 0) {
        setproductList((e) => response.data);

        if (selectedImagedata.current) {
          const imagelist = response.data?.filter(
            (item: any) => selectedImagedata.current?.id == item.id
          );
          selectedImagedata.current = imagelist[0];
          setproductImageList((e: any) =>
            selectedImagedata.current?.productImages?.length > 0
              ? selectedImagedata.current?.productImages
              : null
          );
        }
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

  const getandAddproductImage = (data: any) => {
    selectedImagedata.current = data;
    const imagelist = productList?.filter((item: any) => data.id == item.id);
    setproductImageList((e) =>
      imagelist[0]?.productImages?.length > 0
        ? imagelist[0]?.productImages
        : null
    );
    setisImageOpen((e) => true);
  };

  const imagePathFunc = (data: any) => {
    let pathvalue = data;
    if (pathvalue) {
      pathvalue = pathvalue.replace(/\\/g, "/");
    }

    return pathvalue;
  };

  function imageData(data: any) {
    let path;
    if (data?.length > 0) {
      path = imgUrl + imagePathFunc(data);
    } else {
      path = "/image/product-image/blankets-img.jpg";
    }

    return path;
  }

  async function productImageadd(file: any) {
    if (file) {
      setloading((e) => 1);
      let obj = {
        Id: "",
        ProductId: selectedImagedata.current?.id,
        Thumbnail: false,
        DisplayOrder: 1,
        Image: file,
        UploadType: 1,
        Extension: "jpeg",
      };
      const formdata = await convertObjToformData(obj);
      try {
        const response = await productimageAdd(formdata);
        setloading((e) => 0);
        setaddImageFlag(false);
        getProductlist();
      } catch (err) {}
    }
  }

  async function productimageAdd(data: any) {
    try {
      if (data) {
        const response = await axios
          .post(config.baseUrl + "/Product/productImage", data, {
            headers: {
              "Content-Type": "multipart/form-data",
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
    productImageadd(file);
  }

  function logOut() {
    localStorage.clear();
    navigation.replace("/admin/33/samadmin2xj25");
    window.location.reload();
  }

  return (
    <>
      <ToastContainer />
      <Apploader Loadingstate={loading}>
        <div className="container mx-auto">
          <Adminnavbar />
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
            <ProductTable
              products={productList}
              onviewImage={getandAddproductImage}
            />
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

      <Dialog open={isImageOpen} dismiss={false}>
        <Apploader Loadingstate={loading}>
          <div className="p-4 w-full">
            <div className="flex justify-between align-center">
              <div>
                <h1 className="text-lg text-black font-semibold m-0 p-0">
                  Product Image
                </h1>
              </div>
              <div className="flex">
                <Button
                  variant="filled"
                  color="gray"
                  onClick={(e) => setaddImageFlag(true)}
                >
                  {" "}
                  Add Image
                </Button>
                {addImageFlag && (
                  <Button
                    variant="filled"
                    color="gray"
                    className="ml-5"
                    onClick={(e) => setaddImageFlag(false)}
                  >
                    {" "}
                    Cancel
                  </Button>
                )}
              </div>
            </div>

            {addImageFlag && (
              <div className="mt-2">
                <Input
                  type="file"
                  variant="outlined"
                  className="p-2"
                  onChange={(e) => Imagepathvalue(e)}
                />
              </div>
            )}

            {productImageList?.length > 0 && (
              <div className="mt-5 mb-5 flex justify-center">
                {productImageList.map((item: any) => {
                  return (
                    <div className="mr-5 rounded-lg shadow">
                      <Image
                        src={imageData(item.imagePath)}
                        width={150}
                        height={150}
                        alt={item.id}
                        className="rounded-lg"
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {!productImageList && (
              <div className="mt-10 text-center mb-10">
                <h1>No product image add new</h1>
              </div>
            )}
            <div className="justify-end flex mt-5">
              <Button
                variant="filled"
                color="gray"
                onClick={(e) => {
                  setisImageOpen(false);
                  setproductImageList(null);
                  setaddImageFlag(false);
                  selectedImagedata.current = null;
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Apploader>
      </Dialog>
    </>
  );
}

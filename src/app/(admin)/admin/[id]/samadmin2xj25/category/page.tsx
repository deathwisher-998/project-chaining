"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { Apploader } from "@/components/loader/loading";
import { useEffect, useState } from "react";
import { productAdd, Productlist } from "@/helpers/services/product";
import Chakraprovider from "@/components/Provider/Provider";
import { categoryList } from "@/helpers/services/category";
import { toast, ToastContainer } from "react-toastify";
import CategoryTable from "./category-components/categoryTable";
import Addcategoyform from "./category-components/add-category";
import axios from "axios";
import config from "@/config";
import { useRouter } from "next/navigation";

export default function Categorypage() {
  const [loading, setloading] = useState(1);
  const [Categorylist, setCategorylist] = useState(null);
  const [isOpen, setisOpen] = useState(false);
  const navigation = useRouter();

  useEffect(() => {
    getCatgoryList();
  }, []);

  async function getCatgoryList() {
    try {
      setloading((e) => 1);
      const response: any = await categoryList().then((res) => res);
      if (response.succeeded) {
        setCategorylist((e) => response.data);
      } else {
        setCategorylist((e) => null);
      }
      setloading((e) => 0);
    } catch (error) {
      setCategorylist((e) => null);
    }
  }

  const addCategoryData = async (data: any, flag: boolean) => {
    try {
      if (data && flag) {
        setloading((e) => 1);
        let payload = {
          Id: "",
          ParentId: data.ParentId ? data.ParentId : "",
          Name: data.Name,
          Discription: data.Discription ? data.Discription : "",
          Icon: data.Name,
          IsActive: true,
          Image: data.Image ? data.Image : "",
          UploadType: data.Image ? 1 : 0,
          Extension: data.Image ? getExtension(data.Image?.type) : "",
        };
        const formData = await convertObjToformData(payload);
        const response: any = await axios
          .post(config.baseUrl + "/Category", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res: any) => {
            return res;
          });
        if (response.succeeded) {
          toast.success("Category created successfully", {
            closeOnClick: true,
          });
          setisOpen((e) => false);
          getCatgoryList();
        } else {
          toast.success("Something went wrong", { closeOnClick: true });
        }
        setloading((e) => 0);
      }
    } catch (err) {
      toast.success("Something went wrong", { closeOnClick: true });
      setloading((e) => 0);
    }
  };

  function getExtension(filepath: string) {
    let path = "";
    if (filepath) {
      path = filepath.split("/")[1];
    }
    return path;
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
          <div className="bg-gray-800 rounded-md mt-5 p-5 flex justify-end">
            <div className="flex">
              <p
                className="text-white font-semibold underline cursor-pointer"
                onClick={() =>
                  navigation.replace("/admin/33/samadmin2xj25/product")
                }
              >
                Products
              </p>
              <p
                className="text-white font-semibold ml-5 underline cursor-pointer"
                onClick={() =>
                  navigation.replace("/admin/33/samadmin2xj25/category")
                }
              >
                Category
              </p>
              <p
                className="text-white font-semibold ml-5 underline cursor-pointer"
                onClick={logOut}
              >
                Log Out
              </p>
            </div>
          </div>
          <div className="flex justify-between align-center mb-5 mt-5">
            <div>
              <h1 className="m-0 p-0 font-semibold text-lg">Category List</h1>
            </div>
            <div>
              <Button
                variant="filled"
                color="gray"
                onClick={() => setisOpen(true)}
              >
                Add Category
              </Button>
            </div>
          </div>
          <div>
            <CategoryTable categorys={Categorylist} />
          </div>
        </div>
      </Apploader>

      <Dialog open={isOpen} dismiss={false}>
        <Apploader Loadingstate={loading}>
          <Chakraprovider>
            <Addcategoyform
              categorylist={Categorylist}
              onAdd={addCategoryData}
              onClose={(e) => setisOpen(e)}
            />
          </Chakraprovider>
        </Apploader>
      </Dialog>
    </>
  );
}

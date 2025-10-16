"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import {
  Addcategoryinput,
  Addcategoryschema,
} from "@/utils/validators/addcategoryform";
import { Form } from "@/ui/form";
import {
  AbsoluteCenter,
  Box,
  Button,
  Field,
  Input,
  Select,
} from "@chakra-ui/react";
import Link from "next/link";
import { userRegister } from "@/helpers/services/registration";
import { toast, ToastContainer } from "react-toastify";
import { Card, CardBody, Textarea, Typography } from "@material-tailwind/react";
import Image from "next/image";

const initialValues = {};

interface productForm {
  categorylist: any;
  onAdd: (data: any, flag: boolean) => void;
  onClose: (data: any) => void;
}

function Addcategoyform({ categorylist, onAdd, onClose }: productForm) {
  const [reset, setReset] = useState({});
  const [categoryId, setcategoryId] = useState("");
  const imagePath = useRef(null);

  const onSubmit: SubmitHandler<Addcategoryinput> = async (data) => {
    if (data) {
      let payload = {
        ...data,
        ["Image"]: imagePath.current ? imagePath.current : null,
      };
      onAdd(payload, true);
    }
  };

  function closeModal() {
    onClose(false);
    setReset({});
  }

  function addCategoryimage(e: any) {
    imagePath.current = e.target.files[0];
  }

  return (
    <>
      <>
        <ToastContainer />
        <div className="p-5 rounded-lg" style={{ backgroundColor: "#2c3b57" }}>
          <div className="flex align-items justify-between">
            <div>
              <h1 className="font-semibold text-xl text-white">Add Category</h1>
            </div>
          </div>
          <div className="flex items-center justify-center mt-3">
            {/* w-full max-w-lg */}
            <div className="container">
              <Form<Addcategoryinput>
                validationSchema={Addcategoryschema}
                resetValues={reset}
                onSubmit={onSubmit}
                useFormProps={{
                  defaultValues: initialValues,
                }}
              >
                {({ register, formState: { errors } }) => (
                  <>
                    <Box position="relative" borderRadius="md">
                      <Box px="1" py="2" borderRadius="md">
                        <div>
                          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Field.Root
                                required
                                invalid={errors?.Name?.message ? true : false}
                              >
                                <Field.Label className="text-white">
                                  Category Name <Field.RequiredIndicator />
                                </Field.Label>
                                <Input
                                  type="text"
                                  placeholder="Category Name"
                                  variant="subtle"
                                  className="p-2"
                                  {...register("Name")}
                                />
                                <Field.ErrorText>
                                  {errors?.Name?.message}
                                </Field.ErrorText>
                              </Field.Root>
                            </div>

                            <div>
                              <Field.Root required>
                                <Field.Label className="text-white">
                                  Parent Category
                                </Field.Label>
                                <select
                                  value={categoryId}
                                  className="w-full h-10 rounded-md p-1"
                                  {...register("ParentId")}
                                  onChange={(e) =>
                                    setcategoryId(e.target.value)
                                  }
                                >
                                  <option value={""}>Select Category</option>
                                  {categorylist?.length > 0 && (
                                    <>
                                      {categorylist.map((item: any) => {
                                        return (
                                          <option value={item.id}>
                                            {item.name}
                                          </option>
                                        );
                                      })}
                                    </>
                                  )}
                                </select>
                              </Field.Root>
                            </div>
                          </div>

                          <div className="container mt-3">
                            <div>
                              <Field.Root required>
                                <Field.Label className="text-white">
                                  Description
                                </Field.Label>
                                <Input
                                  type="text"
                                  placeholder="Description"
                                  variant="subtle"
                                  className="p-2"
                                  {...register("Discription")}
                                />
                              </Field.Root>
                            </div>
                          </div>

                          <div className="container mt-3">
                            <div>
                              <Field.Root required>
                                <Field.Label className="text-white">
                                  Category Image
                                </Field.Label>
                                <Input
                                  type="file"
                                  variant="outline"
                                  className="text-white"
                                  onChange={(e) => addCategoryimage(e)}
                                />
                              </Field.Root>
                            </div>
                          </div>
                          <div className="container flex items-center mt-10 justify-center">
                            <div className="mr-5">
                              <Button
                                variant="subtle"
                                className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 
                       text-white font-semibold rounded-lg shadow-md 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-blue-500 transition"
                                background={"red"}
                                type="button"
                                onClick={() => closeModal()}
                              >
                                Cancel
                              </Button>
                            </div>
                            <div>
                              <Button
                                variant="subtle"
                                className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 
                       text-white font-semibold rounded-lg shadow-md 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-blue-500 transition"
                                background={"#c8a042"}
                                type="submit"
                              >
                                Submit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Box>
                    </Box>
                  </>
                )}
              </Form>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default Addcategoyform;

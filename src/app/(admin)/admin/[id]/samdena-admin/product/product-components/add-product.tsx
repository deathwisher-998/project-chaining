"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import {
  Addproductinput,
  Addproductschema,
} from "@/utils/validators/addproductform";
import {
  loginModel,
  loginResponse,
  registrationModel,
} from "@/model/typemodel";
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

function Addproductform({ categorylist, onAdd, onClose }: productForm) {
  const [reset, setReset] = useState({});
  const [categoryId, setcategoryId] = useState("");

  const onSubmit: SubmitHandler<Addproductinput> = async (data) => {
    if (data) {
      onAdd(data, true);
    }
  };

  function closeModal() {
    onClose(false);
    setReset({});
  }

  return (
    <>
      <>
        <ToastContainer />
        <div className="p-5 rounded-lg" style={{ backgroundColor: "#2c3b57" }}>
          <div className="flex align-items justify-between">
            <div>
              <h1 className="font-semibold text-xl text-white">Add Product</h1>
            </div>
          </div>
          <div className="flex items-center justify-center mt-3">
            {/* w-full max-w-lg */}
            <div className="container">
              <Form<Addproductinput>
                validationSchema={Addproductschema}
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
                                invalid={errors?.name?.message ? true : false}
                              >
                                <Field.Label className="text-white">
                                  Product Name <Field.RequiredIndicator />
                                </Field.Label>
                                <Input
                                  type="text"
                                  placeholder="Product Name"
                                  variant="subtle"
                                  className="p-2"
                                  {...register("name")}
                                />
                                <Field.ErrorText>
                                  {errors?.name?.message}
                                </Field.ErrorText>
                              </Field.Root>
                            </div>

                            <div>
                              <Field.Root
                                required
                                invalid={
                                  errors?.categoryId?.message ? true : false
                                }
                              >
                                <Field.Label className="text-white">
                                  Category <Field.RequiredIndicator />
                                </Field.Label>
                                <select
                                  value={categoryId}
                                  className="w-full h-10 rounded-md p-1"
                                  {...register("categoryId")}
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

                                <Field.ErrorText>
                                  {errors?.categoryId?.message}
                                </Field.ErrorText>
                              </Field.Root>
                            </div>

                            <div>
                              <Field.Root
                                required
                                invalid={errors?.skU?.message ? true : false}
                              >
                                <Field.Label className="text-white">
                                  SKU <Field.RequiredIndicator />
                                </Field.Label>
                                <Input
                                  type="text"
                                  placeholder="SKU"
                                  variant="subtle"
                                  className="p-2"
                                  {...register("skU")}
                                />
                                <Field.ErrorText>
                                  {errors?.skU?.message}
                                </Field.ErrorText>
                              </Field.Root>
                            </div>

                            <div>
                              <Field.Root
                                required
                                invalid={
                                  errors?.regularPrice?.message ? true : false
                                }
                              >
                                <Field.Label className="text-white">
                                  Regular Price <Field.RequiredIndicator />
                                </Field.Label>
                                <Input
                                  type="text"
                                  placeholder="Regular Price"
                                  variant="subtle"
                                  className="p-2"
                                  {...register("regularPrice")}
                                />
                                <Field.ErrorText>
                                  {errors?.regularPrice?.message}
                                </Field.ErrorText>
                              </Field.Root>
                            </div>

                            <div>
                              <Field.Root
                                required
                                invalid={
                                  errors?.salePrice?.message ? true : false
                                }
                              >
                                <Field.Label className="text-white">
                                  Sale Price <Field.RequiredIndicator />
                                </Field.Label>
                                <Input
                                  type="text"
                                  placeholder="Sale Price"
                                  variant="subtle"
                                  className="p-2"
                                  {...register("salePrice")}
                                />
                                <Field.ErrorText>
                                  {errors?.salePrice?.message}
                                </Field.ErrorText>
                              </Field.Root>
                            </div>

                            <div>
                              <Field.Root
                                required
                                invalid={
                                  errors?.quantity?.message ? true : false
                                }
                              >
                                <Field.Label className="text-white">
                                  Quantity <Field.RequiredIndicator />
                                </Field.Label>
                                <Input
                                  type="text"
                                  placeholder="Product Quantity"
                                  variant="subtle"
                                  className="p-2"
                                  {...register("quantity")}
                                />
                                <Field.ErrorText>
                                  {errors?.quantity?.message}
                                </Field.ErrorText>
                              </Field.Root>
                            </div>
                          </div>

                          <div className="container mt-3">
                            <div>
                              <Field.Root
                                required
                                invalid={
                                  errors?.discription?.message ? true : false
                                }
                              >
                                <Field.Label className="text-white">
                                  Description <Field.RequiredIndicator />
                                </Field.Label>
                                <Textarea
                                  type="text"
                                  placeholder="Product Description"
                                  variant="outlined"
                                  className="p-2 text-white"
                                  {...register("discription")}
                                />
                                <Field.ErrorText>
                                  {errors?.discription?.message}
                                </Field.ErrorText>
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

export default Addproductform;

"use client";

import Loginheader from "../page-header/login-header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Apploader } from "../loader/loading";
import { SubmitHandler } from "react-hook-form";
import {
  Createaddresssfrominput,
  Createaddressschema,
} from "@/utils/validators/createaddresForm";
import {
  loginModel,
  loginResponse,
  registrationModel,
} from "@/model/typemodel";
import { Form } from "@/ui/form";
import { AbsoluteCenter, Box, Button, Field, Input } from "@chakra-ui/react";
import Link from "next/link";
import { userRegister } from "@/helpers/services/registration";
import { toast, ToastContainer } from "react-toastify";

const initialValues = {
  addressLin1: "",
  addressLin2: "",
  postalCode: "",
  country: "",
  city: "",
  phoneNumber: "",
};

interface onAddresscreate {
  onCancel: any;
  onCreate:any;
}

function Createaddress({ onCancel, onCreate }: onAddresscreate) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [loadingState, setloadingState] = useState(0);
  const navigate = useRouter();

  const onSubmit: SubmitHandler<Createaddresssfrominput> = async (data) => {
    if (data) {
      let payload = {
        ...data,
        ["addressLin2"]: data.addressLin2 ? data.addressLin2 : "",
      };
      onCreate(true, 3, payload);
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-center">
          {/* w-full max-w-lg */}
          <div
            className="container bg-white rounded-2xl p-0"
            style={{ backgroundColor: "#17212b" }}
          >
            <Form<Createaddresssfrominput>
              validationSchema={Createaddressschema}
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
                              invalid={
                                errors?.addressLin1?.message ? true : false
                              }
                            >
                              <Field.Label className="text-white">
                                Address Line 1 <Field.RequiredIndicator />
                              </Field.Label>
                              <Input
                                type="text"
                                placeholder="Address Line 1"
                                variant="subtle"
                                className="p-2"
                                {...register("addressLin1")}
                              />
                              <Field.ErrorText>
                                {errors?.addressLin1?.message}
                              </Field.ErrorText>
                            </Field.Root>
                          </div>

                          <div>
                            <Field.Root>
                              <Field.Label className="text-white">
                                Address Line 2
                              </Field.Label>
                              <Input
                                type="text"
                                placeholder="Address Line 2"
                                variant="subtle"
                                className="p-2"
                                {...register("addressLin2")}
                              />
                            </Field.Root>
                          </div>

                          <div>
                            <Field.Root
                              required
                              invalid={errors?.country?.message ? true : false}
                            >
                              <Field.Label className="text-white">
                                Country <Field.RequiredIndicator />
                              </Field.Label>
                              <Input
                                type="text"
                                placeholder="Country"
                                variant="subtle"
                                className="p-2"
                                {...register("country")}
                              />
                              <Field.ErrorText>
                                {errors?.country?.message}
                              </Field.ErrorText>
                            </Field.Root>
                          </div>

                          <div>
                            <Field.Root
                              required
                              invalid={errors?.city?.message ? true : false}
                            >
                              <Field.Label className="text-white">
                                City <Field.RequiredIndicator />
                              </Field.Label>
                              <Input
                                type="text"
                                placeholder="City"
                                variant="subtle"
                                className="p-2"
                                {...register("city")}
                              />
                              <Field.ErrorText>
                                {errors?.city?.message}
                              </Field.ErrorText>
                            </Field.Root>
                          </div>

                          <div>
                            <Field.Root
                              required
                              invalid={
                                errors?.phoneNumber?.message ? true : false
                              }
                            >
                              <Field.Label className="text-white">
                                Phone No. <Field.RequiredIndicator />
                              </Field.Label>
                              <Input
                                type="text"
                                placeholder="Phone Number"
                                variant="subtle"
                                className="p-2"
                                {...register("phoneNumber")}
                              />
                              <Field.ErrorText>
                                {errors?.phoneNumber?.message}
                              </Field.ErrorText>
                            </Field.Root>
                          </div>

                          <div>
                            <Field.Root
                              required
                              invalid={
                                errors?.postalCode?.message ? true : false
                              }
                            >
                              <Field.Label className="text-white">
                                Zip Code <Field.RequiredIndicator />
                              </Field.Label>
                              <Input
                                type="text"
                                placeholder="Zip Code"
                                variant="subtle"
                                className="p-2"
                                {...register("postalCode")}
                              />
                              <Field.ErrorText>
                                {errors?.postalCode?.message}
                              </Field.ErrorText>
                            </Field.Root>
                          </div>
                        </div>

                        <div className="container flex items-center mt-10 justify-center">
                          <div className="mr-4">
                            <Button
                              variant="subtle"
                              className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 
                       text-white font-semibold rounded-lg shadow-md 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-blue-500 transition"
                              background={"#f44336"}
                              type="button"
                              onClick={() => {setReset({}); onCancel(true, 2)}}
                            >
                              Cancel
                            </Button>
                          </div>
                          <div>
                            <Button
                              variant="subtle"
                              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 
                       text-white font-semibold rounded-lg shadow-md 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-blue-500 transition"
                              type="submit"
                            >
                              Confirm
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
  );
}

export default Createaddress;

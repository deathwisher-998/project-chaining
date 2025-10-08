"use client";

import Loginheader from "../page-header/login-header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Apploader } from "../loader/loading";
import { SubmitHandler } from "react-hook-form";
import {
  Registrationforminput,
  Registrationformschema,
} from "@/utils/validators/registrationform";
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
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Image from "next/image";

const initialValues = {
  email: "",
  password: "",
};

function Registercomponent() {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [loadingState, setloadingState] = useState(0);
  const navigate = useRouter();

  const onSubmit: SubmitHandler<Registrationforminput> = async (data) => {
    if (data) {
      let payload = {
        ...data,
        ["referralCode"]: data.referralCode ? data.referralCode : "",
      };
      Logintoken(payload);
    }
  };

  async function Logintoken(payload: registrationModel) {
    try {
      if (payload) {
        setloadingState((e) => 1);
        const res: any = await userRegister(payload).then((res) => {
          return res;
        });
        const response: any = res;
        if (response.succeeded) {
          toast.success(response?.messages[0]);
          setReset({});
          setTimeout(() => {
            setloadingState((e) => 0);
            navigate.push("/login");
          }, 1000);
        } else {
          setloadingState((e) => 0);
          toast.error(response?.messages[0]);
        }
      }
    } catch (err) {
      if (err) {
        setloadingState((e) => 0);
        toast.error("Something went wrong");
      }
    }
  }

  return (
    <>
      <Apploader Loadingstate={loadingState}>
        <>
          <ToastContainer />
          <div className="flex md:h-screen w-full">
            <div
              className="hidden md:flex md:w-1/2 bg-cover bg-center"
              style={{ backgroundImage: "url('./image/login-banner.jpg')" }}
            ></div>

            <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50 bg-cover bg-center p-4 md:p-0 login-sectionbanner">
              <Card
                className="w-[700px] shadow-xl"
                style={{ backgroundColor: "#2c3b57" }}
              >
                <CardBody className="flex flex-col gap-4">
                  <div className="w-full flex justify-center">
                    <Link href={"/"}>
                      <Image
                        src={"/image/app-logo.png"}
                        width={150}
                        height={70}
                      />
                    </Link>
                  </div>
                  <Typography
                    color="gray"
                    className="text-center text-sm font-semibold text-white"
                  >
                    Sign up! to continue your shopping
                  </Typography>

                  <div className="flex items-center justify-center">
                    {/* w-full max-w-lg */}
                    <div className="container">
                      <Form<Registrationforminput>
                        validationSchema={Registrationformschema}
                        resetValues={reset}
                        onSubmit={onSubmit}
                        useFormProps={{
                          defaultValues: initialValues,
                        }}
                      >
                        {({ register, formState: { errors } }) => (
                          <>
                            <Box position="relative" borderRadius="md">
                              <Box px="4" py="2" borderRadius="md">
                                <div>
                                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Field.Root
                                        required
                                        invalid={
                                          errors?.firstName?.message
                                            ? true
                                            : false
                                        }
                                      >
                                        <Field.Label className="text-white">
                                          Firstname <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input
                                          type="text"
                                          placeholder="Your name"
                                          variant="subtle"
                                          className="p-2"
                                          {...register("firstName")}
                                        />
                                        <Field.ErrorText>
                                          {errors?.firstName?.message}
                                        </Field.ErrorText>
                                      </Field.Root>
                                    </div>

                                    <div>
                                      <Field.Root
                                        required
                                        invalid={
                                          errors?.lastName?.message
                                            ? true
                                            : false
                                        }
                                      >
                                        <Field.Label className="text-white">
                                          Lastname <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input
                                          type="text"
                                          placeholder="Your name"
                                          variant="subtle"
                                          className="p-2"
                                          {...register("lastName")}
                                        />
                                        <Field.ErrorText>
                                          {errors?.lastName?.message}
                                        </Field.ErrorText>
                                      </Field.Root>
                                    </div>

                                    <div>
                                      <Field.Root
                                        required
                                        invalid={
                                          errors?.email?.message ? true : false
                                        }
                                      >
                                        <Field.Label className="text-white">
                                          Email <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input
                                          type="text"
                                          placeholder="Your name"
                                          variant="subtle"
                                          className="p-2"
                                          {...register("email")}
                                        />
                                        <Field.ErrorText>
                                          {errors?.email?.message}
                                        </Field.ErrorText>
                                      </Field.Root>
                                    </div>

                                    <div>
                                      <Field.Root
                                        required
                                        invalid={
                                          errors?.userName?.message
                                            ? true
                                            : false
                                        }
                                      >
                                        <Field.Label className="text-white">
                                          Username <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input
                                          type="text"
                                          placeholder="Your name"
                                          variant="subtle"
                                          className="p-2"
                                          {...register("userName")}
                                        />
                                        <Field.ErrorText>
                                          {errors?.userName?.message}
                                        </Field.ErrorText>
                                      </Field.Root>
                                    </div>

                                    <div>
                                      <Field.Root
                                        required
                                        invalid={
                                          errors?.password?.message
                                            ? true
                                            : false
                                        }
                                      >
                                        <Field.Label className="text-white">
                                          Password <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input
                                          type="password"
                                          placeholder="Your name"
                                          variant="subtle"
                                          className="p-2"
                                          {...register("password")}
                                        />
                                        <Field.ErrorText>
                                          {errors?.password?.message}
                                        </Field.ErrorText>
                                      </Field.Root>
                                    </div>

                                    <div>
                                      <Field.Root
                                        required
                                        invalid={
                                          errors?.confirmPassword?.message
                                            ? true
                                            : false
                                        }
                                      >
                                        <Field.Label className="text-white">
                                          Confirm Password{" "}
                                          <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input
                                          type="password"
                                          placeholder="Your name"
                                          variant="subtle"
                                          className="p-2"
                                          {...register("confirmPassword")}
                                        />
                                        <Field.ErrorText>
                                          {errors?.confirmPassword?.message}
                                        </Field.ErrorText>
                                      </Field.Root>
                                    </div>

                                    <div>
                                      <Field.Root
                                        required
                                        invalid={
                                          errors?.phoneNumber?.message
                                            ? true
                                            : false
                                        }
                                      >
                                        <Field.Label className="text-white">
                                          Phone No. <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input
                                          type="text"
                                          placeholder="Your name"
                                          variant="subtle"
                                          className="p-2"
                                          min={10}
                                          max={10}
                                          {...register("phoneNumber")}
                                        />
                                        <Field.ErrorText>
                                          {errors?.phoneNumber?.message}
                                        </Field.ErrorText>
                                      </Field.Root>
                                    </div>

                                    <div>
                                      <Field.Root>
                                        <Field.Label className="text-white">
                                          Referral Code
                                        </Field.Label>
                                        <Input
                                          type="text"
                                          placeholder="Your name"
                                          variant="subtle"
                                          className="p-2"
                                          min={10}
                                          max={10}
                                          {...register("referralCode")}
                                        />
                                        {/* <Field.ErrorText>
                                  {errors?.phoneNumber?.message}
                                </Field.ErrorText> */}
                                      </Field.Root>
                                    </div>
                                  </div>

                                  <div className="container flex items-center mt-10 justify-center">
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
                                        Register
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </Box>
                            </Box>
                          </>
                        )}
                      </Form>

                      {/* Divider */}
                      <div className="my-6 border-t border-white"></div>

                      {/* Sign up */}
                      <p className="text-center text-sm text-white">
                        Already have an account?{" "}
                        <Link
                          href="/login"
                          className="text-color-by-logo-1 hover:underline"
                        >
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </>
      </Apploader>
    </>
  );
}

export default Registercomponent;

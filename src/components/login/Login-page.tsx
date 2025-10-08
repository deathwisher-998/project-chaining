"use client";

import Loginheader from "../page-header/login-header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Apploader } from "../loader/loading";
import { SubmitHandler } from "react-hook-form";
import { Loginforminput, Loginformschema } from "@/utils/validators/loginform";
import { loginModel, loginResponse } from "@/model/typemodel";
import { Form } from "@/ui/form";
import {
  AbsoluteCenter,
  Box,
  Button,
  Field,
  Input,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
const initialValues = {
  email: "",
  password: "",
};
import { token } from "@/helpers/services/auth";
import { toast, ToastContainer } from "react-toastify";
import { userList } from "@/helpers/services/users";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Image from "next/image";

function Logincomponent() {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [loadingState, setloadingState] = useState(0);
  const navigate = useRouter();

  const onSubmit: SubmitHandler<Loginforminput> = async (data) => {
    if (data.email && data.password) {
      let payload = { ...data };
      Logintoken(payload);
      // localStorage.setItem("token", "nedjkde");
      // navigate.replace("/");
    }
  };

  async function Logintoken(payload: loginModel) {
    try {
      if (payload) {
        setloadingState((e) => 1);
        const res: any = await token(payload).then((res: any) => {
          return res;
        });
        const response: loginResponse = res;
        if (response.token) {
          setloadingState((e) => 0);
          setReset((e) => {});
          localStorage.setItem("token", response.token);
          localStorage.setItem("uId", response?.userId);
          navigate.replace("/");
        } else {
          toast.error("Invalid Credentials");
          setloadingState((e) => 0);
        }
      }
    } catch (err) {
      if (err) {
        toast.error("Invalid Credentials");
        setloadingState((e) => 0);
      }
    }
  }

  return (
    <>
      <Apploader Loadingstate={loadingState}>
        <>
          <ToastContainer />
          <div className="flex h-screen w-full">
            <div
              className="hidden md:flex md:w-1/2 bg-cover bg-center"
              style={{ backgroundImage: "url('./image/login-banner.jpg')" }}
            ></div>

            <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50 bg-cover bg-center p-4 md:p-0 login-sectionbanner">
              <Card
                className="w-96 shadow-xl"
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
                    Sign in to continue your shopping
                  </Typography>

                  <div className="w-full max-w-md">
                    <Form<Loginforminput>
                      validationSchema={Loginformschema}
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
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="row">
                                    <div className="col-lg-12">
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
                                          placeholder="me@example.com"
                                          variant="subtle"
                                          className="p-2"
                                          {...register("email")}
                                        />
                                        <Field.ErrorText>
                                          Email is required
                                        </Field.ErrorText>
                                      </Field.Root>
                                    </div>
                                    <div className="col-lg-12 mt-3">
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
                                          placeholder="password"
                                          variant="subtle"
                                          className="p-2"
                                          {...register("password")}
                                        />
                                        <Field.ErrorText>
                                          Password is required
                                        </Field.ErrorText>
                                      </Field.Root>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12 text-center mt-4">
                                  <Button
                                    variant="subtle"
                                    className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 
                       text-white font-semibold rounded-lg shadow-md 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-blue-500 transition"
                                    background={"#c8a042"}
                                    type="submit"
                                  >
                                    Sign In
                                  </Button>
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
                      Don’t have an account?{" "}
                      <Link
                        href="/register"
                        className="text-color-by-logo-1 hover:underline"
                      >
                        Sign up
                      </Link>
                    </p>
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

export default Logincomponent;

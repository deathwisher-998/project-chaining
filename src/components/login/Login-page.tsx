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

function Logincomponent() {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [loadingState, setloadingState] = useState(0);
  const navigate = useRouter();

  const onSubmit: SubmitHandler<Loginforminput> = async (data) => {
    if (data.email && data.password) {
      let payload = { ...data, userDeviceToken: "", userDeviceType: "" };
      Logintoken(payload);
      localStorage.setItem("token", "nedjkde");
      navigate.replace("/");
    }
  };

  async function Logintoken(payload: loginModel) {
    // try {
    //   if (payload) {
    //     setloadingState((e) => 1);
    //     const res: any = await token(payload).then((res: any) => {
    //       return res;
    //     });
    //     const response: loginResponse = res;
    //     if (response.token) {
    //       setloadingState((e) => 0);
    //       setReset((e) => {});
    //       localStorage.setItem("token", response.token);
    //       navigate.replace("/");
    //     }
    //   }
    // } catch (err) {
    //   if (err) {
    //     setloadingState((e) => 0);
    //   }
    // }
  }

  return (
    <>
      <Apploader Loadingstate={loadingState}>
        <>
          <div className="bg-gray-100">
            <Loginheader />

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                  Login
                </h2>
                <Spinner size="lg" color="#000" />
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
                                    <Field.Label>
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
                                      errors?.password?.message ? true : false
                                    }
                                  >
                                    <Field.Label>
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
                                background={"#1c1c1c"}
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
                <div className="my-6 border-t border-gray-300"></div>

                {/* Sign up */}
                <p className="text-center text-sm text-gray-600">
                  Don’t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-blue-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </>
      </Apploader>
    </>
  );
}

export default Logincomponent;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Apploader } from "@/components/loader/loading";
import { SubmitHandler } from "react-hook-form";
import { Adminloginforminput, Adminloginformschema } from "@/components/admin/form-utilities/login-form"
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

function Adminlogincomponent() {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [loadingState, setloadingState] = useState(0);
  const navigate = useRouter();

  const onSubmit: SubmitHandler<Adminloginforminput> = async (data) => {
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
          localStorage.setItem("admintoken", response.token);
          localStorage.setItem("uId", response?.userId);
          navigate.replace("/admin/33/samadmin2xj25");
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
          <div className="bg-gray-100">
            <ToastContainer />
            <div className="flex items-center justify-center pt-20 pb-20  md:min-h-screen bg-gray-100 px-10 md:pt-0 md:pb-0">
              <div
                className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
                style={{ backgroundColor: "#17212b" }}
              >
                <h2 className="text-2xl font-bold text-center text-white mb-6">
                  Login
                </h2>
                <Spinner size="lg" color="#000" />
                <Form<Adminloginforminput>
                  validationSchema={Adminloginformschema}
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
                                      errors?.password?.message ? true : false
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
            </div>
          </div>
        </>
      </Apploader>
    </>
  );
}

export default Adminlogincomponent;

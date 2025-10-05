"use client";

import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full">
      {/* Left Section - Banner */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-r from-indigo-500 to-blue-600 justify-center items-center">
        <Typography variant="h2" color="white" className="px-10 text-center">
          {/* Welcome to SAMDENA Shopping */}
        </Typography>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50">
        <Card className="w-96 shadow-xl p-6">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray" className="text-center">
              Login
            </Typography>
            <Typography color="gray" className="text-center text-sm">
              Sign in to continue your shopping
            </Typography>

            <Input label="Email" size="lg" crossOrigin="" />
            <Input label="Password" size="lg" type="password" crossOrigin="" />

            <Button className="mt-6 bg-blue-600" fullWidth>
              Sign In
            </Button>

            <Typography
              variant="small"
              color="gray"
              className="mt-4 text-center"
            >
              Don’t have an account?{" "}
              <a href="/signup" className="text-blue-600 font-medium">
                Sign Up
              </a>
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

{/* <div
  className="hidden md:flex md:w-1/2 bg-cover bg-center"
  style={{ backgroundImage: "url('/your-banner.jpg')" }}
></div>; */}

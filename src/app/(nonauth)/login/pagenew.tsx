"use client";

import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full">
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('./image/login-banner.jpg')" }}
      ></div>

      <div
        className="flex w-full md:w-1/2 justify-center items-center bg-gray-50 bg-cover bg-center"
        style={{ backgroundImage: "url('./image/login-pattern.jpg')" }}
      >
        <Card className="w-96 shadow-xl p-6">
          <CardBody className="flex flex-col gap-4">
            <div className="w-full flex justify-center">
              <Link href={"/"}>
                <Image src={"/image/app-logo.png"} width={150} height={70} />
              </Link>
            </div>
            <Typography
              color="gray"
              className="text-center text-sm font-semibold text-color-by-logo-2"
            >
              Sign in to continue your shopping
            </Typography>

            
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

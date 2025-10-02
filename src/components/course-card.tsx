"use client";

import config from "@/config";
import { useAuth } from "@/hooks/useAuth";
import { routes } from "@/routes/routes";
import {
  Typography,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  productImages: string;
  name: string;
  skU: string;
  regularPrice: number;
  salePrice: number;
  quantity: number;
  discription: string;
  addcart: any;
  addtocart: boolean;
  id: any;
}

export function CourseCard({
  productImages,
  name,
  skU,
  regularPrice,
  salePrice,
  quantity,
  discription,
  addcart,
  addtocart,
  id,
}: CourseCardProps) {
  const imgurl = config.imgBaseurl;
  const { token, loading } = useAuth(); // your auth logic
  const navigation = useRouter();

  return (
    <Card className="border">
      <CardHeader className="h-64">
        <Image
          width={768}
          height={768}
          src={productImages ? (imgurl + productImages) : "/image/product-image/blankets-img.jpg"}
          alt={name}
          className="h-full w-full object-cover scale-[1.1]"
        />
      </CardHeader>
      <CardBody>
        {/* <div className="flex items-center gap-2">
          <Typography
            variant="small"
            color="blue"
            className="mb-2 font-normal text-gray-500"
          >
            {tag}
          </Typography>
        </div> */}
        <Link
          href={{
            pathname: routes.nonauth.productdetail + id.slice(0,5),
            query: { id: id },
          }}
          className="text-blue-gray-900 transition-colors hover:text-gray-900"
        >
          <Typography variant="h5" className="mb-2 normal-case underline">
            {name}
          </Typography>
        </Link>
        <Typography className="mb-6 font-normal !text-gray-500">
          {discription.slice(0, 100)  + "..."}
        </Typography>
        <div className="flex justify-between">
          <div className="flex">
            <Typography className="mb-6 font-bold text-black">
            Price {salePrice} Rs
          </Typography>
          <Typography className="ml-2 line-through">
            {regularPrice} Rs
          </Typography>
          </div>

          {!addtocart && <div>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => addcart(id)}
              className="mr-2"
            >
              Add to cart
            </Button>
          </div> }
        </div>
        {addtocart && 
          <>
            {" "}
            <Button
              variant="gradient"
              className="mr-2"
              size="sm"
              onClick={() =>
                token ? navigation.push("/cart") : navigation.push("/login")
              }
            >
              View cart
            </Button>{" "}
            <Button variant="outlined" size="sm" onClick={() => addcart(id)}>
              Remove
            </Button>{" "}
          </>
        }
        {/* <Button variant="outlined">{label}</Button> */}
      </CardBody>
    </Card>
  );
}

export default CourseCard;

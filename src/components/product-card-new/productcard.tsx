"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import config from "@/config";
import { useAuth } from "@/hooks/useAuth";
import { routes } from "@/routes/routes";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ProductProps = {
  productImages: string;
  name: string;
  skU: string;
  regularPrice: number;
  salePrice: number;
  quantity: number;
  discription: string;
  addcart: (id: any) => void;
  addtocart: boolean;
  id: any;
};

const ProductCard: React.FC<ProductProps> = ({
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
}) => {
  const imgurl = config.imgBaseurl;
  const { token, loading } = useAuth(); // your auth logic
  const navigation = useRouter();

  const imagePathFunc = (data: any) => {
    let pathvalue = data;
    if (pathvalue) {
      pathvalue = pathvalue.replace(/\\/g, "/");
    }

    return pathvalue;
  };

  function imageData(data: any) {
    let path;
    if (data?.length > 0) {
      path = imgurl + imagePathFunc(data[0]?.imagePath);
    } else {
      path = "/image/product-image/blankets-img.jpg";
    }

    return path;
  }

  return (
    <Card className="w-full rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 bg-white">
      <CardHeader shadow={false} floated={false} className="relative h-[400px]">
        {/* <div>
          <img
          src={imageData(productImages)}
          alt={name}
          className="w-full h-full object-cover rounded-none transition-transform duration-500 hover:scale-105"
        />
        </div> */}
        <div
          className="w-full h-[400px] md:h-[400px] bg-gray-200 front-slider-hero"
          style={{ backgroundImage: `url(${imageData(productImages)})` }}
        ></div>
        {/* <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-xs font-semibold uppercase px-3 py-1 rounded-full border border-white/30 shadow-sm">
          {"test"}
        </div> */}
      </CardHeader>

      <CardBody className="px-4 py-3">
        <Link
          href={{
            pathname: routes.nonauth.productdetail + id.slice(0, 5),
            query: { id: id },
          }}
          className="text-blue-gray-900 transition-colors hover:text-gray-900"
        >
          <Typography
            variant="h5"
            color="blue-gray"
            className="font-bold tracking-tight"
          >
            {name}
          </Typography>
        </Link>

        <Typography
          color="gray"
          className="text-sm mt-2 line-clamp-2 leading-relaxed"
        >
          {discription ? discription.slice(0, 100) + "..." : ""}
        </Typography>
      </CardBody>

      {!addtocart && (
        <CardFooter
          className={`flex flex-col sm:flex-row items-left sm:items-center justify-between px-4 py-3 border-t border-gray-200`}
        >
          <div className="flex">
            <Typography className="font-bold text-black">
              Price {salePrice} Rs
            </Typography>
            <Typography className="ml-2 line-through">
              {regularPrice} Rs
            </Typography>
          </div>

          <div>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => addcart(id)}
              className="mr-2 text-color-by-logo-2 border-color-by-logo-2 mt-2 sm:mt-0"
            >
              Add to cart
            </Button>
          </div>
        </CardFooter>
      )}

      {addtocart && (
        <CardFooter className={`flex flex-col justify-between px-4 py-3`}>
          <div className="flex">
            <Typography className="font-bold text-black">
              Price {salePrice} Rs
            </Typography>
            <Typography className="ml-2 line-through">
              {regularPrice} Rs
            </Typography>
          </div>

          <>
            <div className="flex justify-start sm:justify-end mt-2 sm:mt-0">
              {" "}
              <Button
                // variant="gradient"
                className="mr-2 btn-color-by-logo-2"
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
            </div>
          </>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductCard;

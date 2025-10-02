import config from "@/config";
import { routes } from "@/routes/routes";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";

interface suggestedProduct {
  data: any;
}

export default function SuggestedProducts({ data }: suggestedProduct) {

  const imgUrl = config.imgBaseurl;

  return (
    <div className="p-6 rounded-lg shadow-md mb-20 pb-8 pt-8" style={{backgroundColor:"#c90754"}}>
      {data && (
        <>
          <Typography variant="h3" className="mb-4 font-bold text-white">
            Suggested Products
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
            {data.map((product) => (
              <Card
                key={product.id}
                className="shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader floated={false} className="h-40">
                  <img
                    src={product.productImages ? (imgUrl + product.productImages) : "/image/product-image/blankets-img.jpg"}
                    alt={product.name}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </CardHeader>
                <CardBody>
                  <Link
                    href={{
                      pathname: routes.nonauth.productdetail + product.id.slice(0, 5),
                      query: { id: product.id },
                    }}
                  >
                    <Typography
                      variant="h6"
                      className="font-semibold text-gray-700"
                    >
                      {product.name}
                    </Typography>
                  </Link>
                  <div className="flex">
                    <Typography
                      variant="small"
                      className="text-black mt-1 font-semibold"
                    >
                      Price {product.salePrice} Rs
                    </Typography>
                    <Typography
                      variant="small"
                      className="ml-5 text-gray-500 mt-1 font-semibold line-through"
                    >
                      {product.salePrice} Rs
                    </Typography>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

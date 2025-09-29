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

interface CourseCardProps {
  img: string;
  tag: string;
  title: string;
  desc: string;
  label: string;
  addtocart: Boolean;
  productid: number;
  addcart: any;
}

export function CourseCard({
  img,
  tag,
  title,
  desc,
  label,
  addtocart,
  addcart,
  productid,
}: CourseCardProps) {
  return (
    <Card className="border">
      <CardHeader className="h-64">
        <Image
          width={768}
          height={768}
          src={img}
          alt={title}
          className="h-full w-full object-cover scale-[1.1]"
        />
      </CardHeader>
      <CardBody>
        <div className="flex items-center gap-2">
          <Typography
            variant="small"
            color="blue"
            className="mb-2 font-normal text-gray-500"
          >
            {tag}
          </Typography>
        </div>
        <Link
          href={{pathname:routes.nonauth.productdetail + productid , query:{id:productid}}}
          className="text-blue-gray-900 transition-colors hover:text-gray-900"
        >
          <Typography variant="h5" className="mb-2 normal-case">
            {title}
          </Typography>
        </Link>
        <Typography className="mb-6 font-normal !text-gray-500">
          {desc}
        </Typography>
        <Typography className="mb-6 font-bold text-black">
          Price {label}
        </Typography>
        {!addtocart ? (
          <>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => addcart(productid)}
              className="mr-2"
            >
              Add to cart
            </Button>

            <Button
              variant="gradient"
              size="sm"
              onClick={() => addcart(productid)}
            >
              Buy now
            </Button>
          </>
        ) : (
          <>
            {" "}
            <Button variant="gradient" className="mr-2" size="sm">
              View cart
            </Button>{" "}
            <Button
              variant="outlined"
              size="sm"
              onClick={() => addcart(productid)}
            >
              Remove
            </Button>{" "}
          </>
        )}
        {/* <Button variant="outlined">{label}</Button> */}
      </CardBody>
    </Card>
  );
}

export default CourseCard;

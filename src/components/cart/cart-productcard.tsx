import {
  Typography,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";

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

export function Cartproductcard({
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
    <Card className="border mt-3">
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
        <a
          href="#"
          className="text-blue-gray-900 transition-colors hover:text-gray-900"
        >
          <Typography variant="h5" className="mb-2 normal-case">
            {title}
          </Typography>
        </a>
        <Typography className="mb-6 font-normal !text-gray-500">
          {desc}
        </Typography>
        {!addtocart ? (
          <>
            <Button variant="outlined" onClick={() => addcart(productid)}>
              Add to cart {label}
            </Button>
          </>
        ) : (
          <>
            {" "}
            <Button variant="outlined" className="mr-2">
              View cart {label}
            </Button>{" "}
            <Button variant="outlined" onClick={() => addcart(productid)}>
              Remove
            </Button>{" "}
          </>
        )}
        {/* <Button variant="outlined">{label}</Button> */}
      </CardBody>
    </Card>
  );
}

export default Cartproductcard;

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button
} from "@material-tailwind/react";

const suggestedProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$59.99",
    image: "/image/blogs/blog4.svg"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$129.99",
    image: "/image/blogs/blog3.svg"
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: "$39.99",
    image: "/image/blogs/blog5.svg"
  }
];

export default function SuggestedProducts() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-20">
      <Typography variant="h5" className="mb-4 font-bold text-gray-800">
        Suggested Products
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {suggestedProducts.map((product) => (
          <Card
            key={product.id}
            className="shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader floated={false} className="h-40">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover rounded-lg"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h6" className="font-semibold text-gray-700">
                {product.name}
              </Typography>
              <Typography variant="small" className="text-gray-500 mt-1">
                {product.price}
              </Typography>
            </CardBody>
            <CardFooter>
              <Button fullWidth color="gray">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

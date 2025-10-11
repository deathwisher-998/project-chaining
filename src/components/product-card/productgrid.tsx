import { ProductCard } from "./productcard";
import { toast, ToastContainer } from "react-toastify";

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    image: "./image/books/Rectangle9.svg",
    title: "Elegant Silk Saree with Golden Border",
    price: 4999,
    category: "Silk Saree",
  },
  {
    id: 2,
    image: "./image/books/Rectangle9.svg",
    title: "Designer Cotton Kurta Set",
    price: 2499,
    category: "Ethnic Wear",
  },
  {
    id: 3,
   image: "./image/books/Rectangle9.svg",
    title: "Traditional Banarasi Saree",
    price: 8999,
    category: "Banarasi",
  },
  {
    id: 4,
    image: "./image/books/Rectangle9.svg",
    title: "Modern Georgette Saree",
    price: 3499,
    category: "Georgette",
  },
  {
    id: 5,
   image: "./image/books/Rectangle9.svg",
    title: "Handloom Cotton Saree",
    price: 1999,
    category: "Cotton",
  },
  {
    id: 6,
    image: "./image/books/Rectangle9.svg",
    title: "Embroidered Lehenga Choli",
    price: 12999,
    category: "Lehenga",
  },
  {
    id: 7,
    image: "./image/books/Rectangle9.svg",
    title: "Designer Palazzo Suit",
    price: 3999,
    category: "Suit Set",
  },
  {
    id: 8,
   image: "./image/books/Rectangle9.svg",
    title: "Premium Silk Blend Saree",
    price: 5499,
    category: "Silk Blend",
  },
];

export const ProductGrid = () => {
  const handleAddToCart = (productTitle: string) => {
    toast.success(`${productTitle} added to cart!`, {
      description: "Continue shopping or proceed to checkout",
    });
  };

  return (
    <section className="w-full py-16 px-4 md:px-6 lg:px-8 bg-background">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
            Featured Collection
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our exquisite range of handpicked sarees and ethnic wear
          </p>
        </div>

        {/* Product Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              category={product.category}
              onAddToCart={() => handleAddToCart(product.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

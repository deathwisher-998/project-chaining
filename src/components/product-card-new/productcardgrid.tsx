import ProductCard from "@/components/product-card-new/productcard";

export default function Productgrid() {
  const handleAddToCart = (name: string) => {
    alert(`${name} added to cart!`);
  };

  const products = [
    {
      image: "./image/books/Rectangle9.svg",
      name: "Classic Cotton T-Shirt",
      category: "Men",
      description: "Soft, breathable cotton fabric with a modern slim fit.",
      price: "899",
    },
    {
      image: "./image/books/Rectangle9.svg",
      name: "Casual Hoodie",
      category: "Unisex",
      description: "Cozy fleece lining, adjustable drawstring, and durable stitching.",
      price: "1299",
    },
    {
      image: "./image/books/Rectangle9.svg",
      name: "Floral Summer Dress",
      category: "Women",
      description: "Lightweight and flowy design, perfect for sunny days.",
      price: "1599",
    },
  ];

  return (
    <main>
      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-24 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            {...product}
            onAddToCart={() => handleAddToCart(product.name)}
          />
        ))}
      </div>
    </main>
  );
}


import { Button } from "@material-tailwind/react";
import {
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  category: string;
  onAddToCart?: () => void;
}

export const ProductCard = ({ image, title, price, category, onAddToCart }: ProductCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-card shadow-[var(--shadow-card)] transition-all duration-500 hover:shadow-[var(--shadow-hover)] hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-[image:var(--gradient-overlay)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        {/* Quick Add Button - Appears on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <Button
            onClick={onAddToCart}
            className="bg-primary/95 backdrop-blur-sm hover:bg-primary gap-2 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300"
          >
            <ShoppingCartIcon strokeWidth={2} className="h-6 w-6" />
            Add to Cart
          </Button>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full shadow-md">
            {category}
          </span>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-card-foreground line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
            ₹{price.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

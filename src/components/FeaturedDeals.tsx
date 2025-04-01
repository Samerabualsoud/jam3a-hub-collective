
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Timer, Users } from 'lucide-react';

interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  timeLeft: string;
  joinedCount: number;
  totalCount: number;
  progress: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  originalPrice,
  discountedPrice,
  timeLeft,
  joinedCount,
  totalCount,
  progress
}) => {
  return (
    <div className="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm">
          {Math.round((originalPrice - discountedPrice) / originalPrice * 100)}% OFF
        </div>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 text-lg font-medium">{title}</h3>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-2xl font-bold text-jam3a-purple">{discountedPrice} SAR</span>
          <span className="text-sm text-muted-foreground line-through">{originalPrice} SAR</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                {joinedCount} of {totalCount} joined
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Timer className="h-4 w-4" />
              <span>{timeLeft}</span>
            </div>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-jam3a-purple transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-4">
          <Button className="w-full bg-jam3a-purple hover:bg-jam3a-deep-purple">
            <Link to={`/product/${id}`}>Join Jam3a</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeaturedDeals = () => {
  const featuredProducts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?auto=format&fit=crop&w=1600&q=80",
      title: "iPhone 16 Pro Max 256GB",
      originalPrice: 4999,
      discountedPrice: 4199,
      timeLeft: "1 day left",
      joinedCount: 3,
      totalCount: 5,
      progress: 60,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=1600&q=80",
      title: "Samsung Galaxy S25 Ultra",
      originalPrice: 4599,
      discountedPrice: 3899,
      timeLeft: "2 days left",
      joinedCount: 4,
      totalCount: 6,
      progress: 67,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1600086827875-a63b01f1335c?auto=format&fit=crop&w=1600&q=80",
      title: "Galaxy Z Fold 6",
      originalPrice: 6999,
      discountedPrice: 5799,
      timeLeft: "12 hours left",
      joinedCount: 7,
      totalCount: 10,
      progress: 70,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1617997455403-41f333d44d5b?auto=format&fit=crop&w=1600&q=80",
      title: "Galaxy Z Flip 6",
      originalPrice: 3999,
      discountedPrice: 3299,
      timeLeft: "3 days left",
      joinedCount: 2,
      totalCount: 5,
      progress: 40,
    },
  ];

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Trending Jam3a Deals</h2>
            <p className="mt-2 text-muted-foreground">
              Join these active groups and save big on premium tech products
            </p>
          </div>
          <Button variant="outline" className="shrink-0">
            <Link to="/shop">View All Deals</Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;

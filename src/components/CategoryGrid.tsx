import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  icon: string;
  itemCount: number;
  gradient: string;
}

const categories: Category[] = [
  {
    id: "shoes",
    name: "Shoes",
    icon: "👟",
    itemCount: 256,
    gradient: "from-amber-400 to-orange-500"
  },
  {
    id: "dresses",
    name: "Dresses", 
    icon: "👗",
    itemCount: 189,
    gradient: "from-pink-400 to-rose-500"
  },
  {
    id: "medical",
    name: "Medical",
    icon: "🏥",
    itemCount: 145,
    gradient: "from-green-400 to-emerald-500"
  },
  {
    id: "toys",
    name: "Toys",
    icon: "🧸",
    itemCount: 98,
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    id: "medicine",
    name: "Medicine",
    icon: "💊",
    itemCount: 234,
    gradient: "from-red-400 to-pink-500"
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: "📱",
    itemCount: 167,
    gradient: "from-blue-400 to-indigo-500"
  },
  {
    id: "books",
    name: "Books",
    icon: "📚",
    itemCount: 123,
    gradient: "from-amber-400 to-yellow-500"
  },
  {
    id: "traditional",
    name: "Traditional",
    icon: "🥻",
    itemCount: 89,
    gradient: "from-purple-400 to-indigo-500"
  }
];

interface CategoryGridProps {
  onCategorySelect?: (categoryId: string) => void;
}

export function CategoryGrid({ onCategorySelect }: CategoryGridProps) {
  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="group cursor-pointer hover:shadow-card transition-all duration-300 hover:scale-105 border-0 overflow-hidden"
              onClick={() => onCategorySelect?.(category.id)}
            >
              <CardContent className="p-0">
                <div className={`bg-gradient-to-br ${category.gradient} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10 text-center">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.itemCount} items</p>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white/20 rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
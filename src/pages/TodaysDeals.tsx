import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Timer, Star, TrendingUp, Eye } from "lucide-react";

export default function TodaysDeals() {
  const deals = [
    {
      id: 1,
      title: "Nike Air Max 270",
      originalPrice: 12999,
      salePrice: 6499,
      discount: 50,
      rating: 4.5,
      reviews: 234,
      timeLeft: "2h 30m",
      image: "/placeholder.svg",
      sold: 89,
      available: 200
    },
    {
      id: 2,
      title: "Samsung Galaxy Buds",
      originalPrice: 8999,
      salePrice: 4499,
      discount: 50,
      rating: 4.3,
      reviews: 156,
      timeLeft: "4h 15m",
      image: "/placeholder.svg",
      sold: 156,
      available: 300
    },
    {
      id: 3,
      title: "Women's Designer Kurti",
      originalPrice: 2999,
      salePrice: 899,
      discount: 70,
      rating: 4.6,
      reviews: 89,
      timeLeft: "1h 45m",
      image: "/placeholder.svg",
      sold: 234,
      available: 150
    }
  ];

  return (
    <PageLayout 
      title="Today's Deals" 
      description="Limited time offers on your favorite products"
    >
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">50+</div>
              <p className="text-sm text-muted-foreground">Active Deals</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">70%</div>
              <p className="text-sm text-muted-foreground">Max Discount</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">2h 30m</div>
              <p className="text-sm text-muted-foreground">Next Deal Ends</p>
            </CardContent>
          </Card>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <Card key={deal.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-0">
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={deal.image} 
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                    {deal.discount}% OFF
                  </Badge>
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                    <Timer className="h-3 w-3" />
                    {deal.timeLeft}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {deal.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{deal.rating}</span>
                    <span className="text-sm text-muted-foreground">({deal.reviews})</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold">₹{deal.salePrice.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground line-through">₹{deal.originalPrice.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>{deal.sold} sold</span>
                  <span>{deal.available} available</span>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2 mb-3">
                  <div 
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(deal.sold / (deal.sold + deal.available)) * 100}%` }}
                  ></div>
                </div>
                
                <Button className="w-full gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Grab Deal Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            <Eye className="h-4 w-4 mr-2" />
            View All Deals
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
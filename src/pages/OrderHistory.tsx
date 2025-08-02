import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Package, Truck, MapPin, Star, Eye } from "lucide-react";

export default function OrderHistory() {
  const orders = [
    {
      id: "ORD001234",
      date: "2024-01-15",
      status: "delivered",
      total: 8499,
      items: 2,
      estimatedDelivery: "2024-01-18",
      actualDelivery: "2024-01-17",
      products: [
        {
          name: "Nike Air Force 1 Low White",
          quantity: 1,
          price: 7995,
          image: "/placeholder.svg"
        },
        {
          name: "Sports Socks Pack of 3",
          quantity: 1,
          price: 504,
          image: "/placeholder.svg"
        }
      ]
    },
    {
      id: "ORD001235",
      date: "2024-01-20",
      status: "shipped",
      total: 1299,
      items: 1,
      estimatedDelivery: "2024-01-23",
      actualDelivery: null,
      trackingId: "TRK789456123",
      products: [
        {
          name: "Women's Floral Summer Dress",
          quantity: 1,
          price: 1299,
          image: "/placeholder.svg"
        }
      ]
    },
    {
      id: "ORD001236",
      date: "2024-01-22",
      status: "processing",
      total: 2899,
      items: 1,
      estimatedDelivery: "2024-01-25",
      actualDelivery: null,
      products: [
        {
          name: "Traditional Kurti Set",
          quantity: 1,
          price: 2899,
          image: "/placeholder.svg"
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-50 border-green-200';
      case 'shipped': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'processing': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <PageLayout 
      title="Order History" 
      description={`${orders.length} orders found`}
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{orders.length}</div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {orders.filter(order => order.status === 'delivered').length}
              </div>
              <p className="text-sm text-muted-foreground">Delivered</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {orders.filter(order => order.status === 'shipped').length}
              </div>
              <p className="text-sm text-muted-foreground">In Transit</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                ₹{orders.reduce((total, order) => total + order.total, 0).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} border`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1 capitalize">{order.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Products */}
                <div className="space-y-3 mb-4">
                  {order.products.map((product, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <p className="text-xs text-muted-foreground">Qty: {product.quantity}</p>
                      </div>
                      <span className="font-medium">₹{product.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                
                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Amount:</span>
                    <div className="font-semibold text-lg">₹{order.total.toLocaleString()}</div>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground">Items:</span>
                    <div className="font-medium">{order.items} item{order.items > 1 ? 's' : ''}</div>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground">
                      {order.status === 'delivered' ? 'Delivered on:' : 'Expected delivery:'}
                    </span>
                    <div className="font-medium">
                      {order.actualDelivery 
                        ? new Date(order.actualDelivery).toLocaleDateString('en-IN')
                        : new Date(order.estimatedDelivery).toLocaleDateString('en-IN')
                      }
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  
                  {order.status === 'shipped' && (
                    <Button variant="outline" size="sm">
                      <Truck className="h-4 w-4 mr-2" />
                      Track Order
                    </Button>
                  )}
                  
                  {order.status === 'delivered' && (
                    <>
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4 mr-2" />
                        Rate & Review
                      </Button>
                      <Button variant="outline" size="sm">
                        Buy Again
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Orders
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
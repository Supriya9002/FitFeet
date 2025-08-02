import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store, CheckCircle, Clock, AlertCircle, Plus, Package, CreditCard, Settings, BarChart3, Truck, MapPin, Timer, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { VendorKYC } from "@/components/vendor/VendorKYC";
import { ProductManagement } from "@/components/vendor/ProductManagement";
import { BankDetails } from "@/components/vendor/BankDetails";

export default function VendorDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showKYC, setShowKYC] = useState(false);
  const [kycStatus, setKycStatus] = useState<"pending" | "verified" | "rejected">("pending");
  const [activeTab, setActiveTab] = useState("dashboard");

  const getKYCStatusBadge = () => {
    switch (kycStatus) {
      case "verified":
        return <Badge variant="default" className="gap-1 bg-green-100 text-green-800"><CheckCircle className="w-3 h-3" /> Verified</Badge>;
      case "rejected":
        return <Badge variant="destructive" className="gap-1"><AlertCircle className="w-3 h-3" /> Rejected</Badge>;
      default:
        return <Badge variant="secondary" className="gap-1"><Clock className="w-3 h-3" /> Pending</Badge>;
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully."
    });
    navigate("/vendor-auth");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Store className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Vendor Dashboard</h1>
                <p className="text-sm text-muted-foreground">My Shop Name</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2" disabled={kycStatus !== "verified"}>
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="delivery" className="gap-2">
              <Truck className="h-4 w-4" />
              Delivery
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* KYC Status Card */}
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">KYC Verification</CardTitle>
                    <CardDescription>
                      अपनी दुकान को verify करें और selling शुरू करें
                    </CardDescription>
                  </div>
                  {getKYCStatusBadge()}
                </div>
              </CardHeader>
              {kycStatus === "pending" && (
                <CardContent>
                  <Button onClick={() => setShowKYC(true)} className="w-full">
                    Complete KYC Verification
                  </Button>
                </CardContent>
              )}
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Products</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">0</div>
                  <div className="text-sm text-muted-foreground">Orders</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">₹0</div>
                  <div className="text-sm text-muted-foreground">Revenue</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-muted-foreground">Views</div>
                </CardContent>
              </Card>
            </div>

            {/* Action Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => kycStatus === "verified" && setActiveTab("products")}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add Products
                  </CardTitle>
                  <CardDescription>
                    नए products add करें और selling शुरू करें
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" disabled={kycStatus !== "verified"}>
                    {kycStatus !== "verified" ? "Complete KYC First" : "Add Product"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab("payments")}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Setup
                  </CardTitle>
                  <CardDescription>
                    अपने bank details add करें payment के लिए
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Setup Payments
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>

          <TabsContent value="delivery" className="space-y-6">
            {/* Delivery Tracking Dashboard */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Delivery Management</h2>
                <p className="text-muted-foreground">Track your orders and delivery partners</p>
              </div>

              {/* Active Deliveries */}
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="w-5 h-5" />
                      Active Deliveries (3)
                    </CardTitle>
                    <CardDescription>Real-time tracking of ongoing deliveries</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        id: "DEL001",
                        riderName: "Rahul Kumar",
                        riderPhone: "+91 98765 43210",
                        customerAddress: "123 Main Street, Sector 15, Delhi",
                        estimatedTime: "15 mins",
                        status: "On the way",
                        distance: "2.3 km"
                      },
                      {
                        id: "DEL002", 
                        riderName: "Amit Singh",
                        riderPhone: "+91 87654 32109",
                        customerAddress: "456 Park Avenue, Gurgaon",
                        estimatedTime: "25 mins",
                        status: "Picked up",
                        distance: "5.1 km"
                      },
                      {
                        id: "DEL003",
                        riderName: "Suresh Sharma",
                        riderPhone: "+91 76543 21098", 
                        customerAddress: "789 Green Colony, Noida",
                        estimatedTime: "8 mins",
                        status: "Nearby",
                        distance: "0.8 km"
                      }
                    ].map((delivery) => (
                      <Card key={delivery.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold">Order #{delivery.id}</h4>
                              <p className="text-sm text-muted-foreground">Rider: {delivery.riderName}</p>
                              <p className="text-sm text-muted-foreground">Phone: {delivery.riderPhone}</p>
                            </div>
                            <Badge variant={delivery.status === "Nearby" ? "default" : "secondary"}>
                              {delivery.status}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span>{delivery.customerAddress}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <Timer className="w-4 h-4 text-orange-500" />
                                <span>ETA: {delivery.estimatedTime}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">Distance:</span>
                                <span className="font-medium">{delivery.distance}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline">Call Rider</Button>
                            <Button size="sm" variant="outline">Track Live</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>

                {/* Delivery Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">12</div>
                      <div className="text-sm text-muted-foreground">Today's Orders</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">9</div>
                      <div className="text-sm text-muted-foreground">Delivered</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">3</div>
                      <div className="text-sm text-muted-foreground">In Transit</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">18 mins</div>
                      <div className="text-sm text-muted-foreground">Avg Delivery</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Available Riders */}
                <Card>
                  <CardHeader>
                    <CardTitle>Available Delivery Partners (5)</CardTitle>
                    <CardDescription>Riders ready to accept new orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {[
                        { name: "Vikash Kumar", rating: 4.8, orders: 156, distance: "1.2 km" },
                        { name: "Deepak Singh", rating: 4.6, orders: 98, distance: "2.1 km" },
                        { name: "Ravi Sharma", rating: 4.9, orders: 203, distance: "0.8 km" }
                      ].map((rider, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="font-semibold text-primary">{rider.name.split(' ').map(n => n[0]).join('')}</span>
                            </div>
                            <div>
                              <p className="font-medium">{rider.name}</p>
                              <p className="text-sm text-muted-foreground">★ {rider.rating} • {rider.orders} orders • {rider.distance} away</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Available</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <BankDetails />
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Shop Settings</CardTitle>
                <CardDescription>Manage your shop information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Shop settings coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* KYC Modal */}
      {showKYC && (
        <VendorKYC
          onClose={() => setShowKYC(false)}
          onSubmit={(data) => {
            console.log("KYC Data:", data);
            setKycStatus("verified");
            setShowKYC(false);
          }}
        />
      )}
    </div>
  );
}
import { useState, useEffect } from "react";
import { PageLayout } from "@/components/PageLayout";
import { AdminAuth } from "@/components/AdminAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings, 
  Upload, 
  Package, 
  Users, 
  Truck, 
  Palette, 
  Menu as MenuIcon,
  Image,
  Phone,
  Mail,
  MapPin,
  Save,
  Plus,
  Trash2,
  Edit,
  LogOut,
  BarChart3,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Clock,
  Calendar,
  FileText,
  Database,
  Shield,
  AlertTriangle,
  Activity,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuthenticated");
    const email = localStorage.getItem("adminEmail");
    if (authStatus === "true" && email) {
      setIsAuthenticated(true);
      setAdminEmail(email);
    }
  }, []);

  const handleLogin = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
    if (authenticated) {
      setAdminEmail(localStorage.getItem("adminEmail") || "");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminEmail");
    setIsAuthenticated(false);
    setAdminEmail("");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  // State for site settings
  const [siteSettings, setSiteSettings] = useState({
    companyName: "FitFeet",
    phone: "+1 (555) 123-4567",
    email: "contact@fitfeet.com",
    address: "123 Fashion Street, Style City, SC 12345",
    heroTitle: "Find Your Perfect Fit",
    heroSubtitle: "Discover comfort and style with our premium footwear collection"
  });

  const handleSave = () => {
    // Save to localStorage for demo - in production use Supabase
    localStorage.setItem("siteSettings", JSON.stringify(siteSettings));
    
    // Update the actual website header/footer with new data
    const event = new CustomEvent('siteSettingsUpdated', { detail: siteSettings });
    window.dispatchEvent(event);
    
    toast({
      title: "Settings saved",
      description: "Your changes have been saved and applied to the website.",
    });
  };

  const updateSetting = (key: string, value: string) => {
    setSiteSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (!isAuthenticated) {
    return <AdminAuth onLogin={handleLogin} />;
  }

  return (
    <PageLayout title="Admin Dashboard" description="Manage your website settings and content">
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Settings className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {adminEmail}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 lg:w-auto lg:grid-cols-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="site-settings">Site</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
          </TabsList>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,350</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,234</div>
                  <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2%</div>
                  <p className="text-xs text-muted-foreground">+0.3% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "New order received", time: "2 minutes ago", type: "order" },
                      { action: "Product added to inventory", time: "1 hour ago", type: "product" },
                      { action: "New vendor registered", time: "3 hours ago", type: "vendor" },
                      { action: "Payment processed", time: "5 hours ago", type: "payment" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Badge variant="outline">{activity.type}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    System Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { message: "Low inventory for Nike Air Max", priority: "high" },
                      { message: "Server response time increased", priority: "medium" },
                      { message: "New vendor pending approval", priority: "low" },
                      { message: "Weekly backup completed", priority: "info" }
                    ].map((alert, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <p className="text-sm">{alert.message}</p>
                        <Badge variant={
                          alert.priority === "high" ? "destructive" : 
                          alert.priority === "medium" ? "default" : 
                          alert.priority === "low" ? "secondary" : "outline"
                        }>
                          {alert.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Site Settings */}
          <TabsContent value="site-settings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input 
                      id="company-name" 
                      value={siteSettings.companyName}
                      onChange={(e) => updateSetting("companyName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="logo-upload">Logo</Label>
                    <div className="flex items-center gap-2">
                      <Input id="logo-upload" type="file" accept="image/*" />
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="hero-title">Hero Section Title</Label>
                    <Input 
                      id="hero-title" 
                      value={siteSettings.heroTitle}
                      onChange={(e) => updateSetting("heroTitle", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-subtitle">Hero Section Subtitle</Label>
                    <Textarea 
                      id="hero-subtitle" 
                      value={siteSettings.heroSubtitle}
                      onChange={(e) => updateSetting("heroSubtitle", e.target.value)}
                    />
                  </div>
                  <Button onClick={handleSave} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={siteSettings.phone}
                      onChange={(e) => updateSetting("phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={siteSettings.email}
                      onChange={(e) => updateSetting("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea 
                      id="address" 
                      value={siteSettings.address}
                      onChange={(e) => updateSetting("address", e.target.value)}
                    />
                  </div>
                  <Button onClick={handleSave} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Contact Info
                  </Button>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Banner Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Active Banners</span>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Banner
                      </Button>
                    </div>
                    <div className="grid gap-4">
                      {["Summer Sale Banner", "New Arrivals Banner", "Featured Products Banner"].map((banner, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-10 bg-muted rounded"></div>
                            <span>{banner}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch defaultChecked />
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Management */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Product Management
                </CardTitle>
                <CardDescription>
                  Add, edit, and manage your product catalog
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <Input placeholder="Search products..." className="w-64" />
                      <Select>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shoes">Shoes</SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="accessories">Accessories</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    {[
                      { name: "Nike Air Max", price: "$120", category: "Shoes", status: "Active" },
                      { name: "Adidas Ultraboost", price: "$180", category: "Shoes", status: "Active" },
                      { name: "Casual T-Shirt", price: "$25", category: "Clothing", status: "Draft" }
                    ].map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-muted rounded"></div>
                          <div>
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-medium">{product.price}</span>
                          <Badge variant={product.status === "Active" ? "default" : "secondary"}>
                            {product.status}
                          </Badge>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vendors Management */}
          <TabsContent value="vendors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Vendor Management
                </CardTitle>
                <CardDescription>
                  Manage vendor accounts and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Input placeholder="Search vendors..." className="w-64" />
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Vendor
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    {[
                      { name: "Nike Store", email: "nike@store.com", products: 45, status: "Active" },
                      { name: "Adidas Official", email: "adidas@store.com", products: 38, status: "Active" },
                      { name: "Local Shoe Shop", email: "local@shoes.com", products: 12, status: "Pending" }
                    ].map((vendor, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{vendor.name}</h4>
                          <p className="text-sm text-muted-foreground">{vendor.email}</p>
                          <p className="text-sm text-muted-foreground">{vendor.products} products</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={vendor.status === "Active" ? "default" : "secondary"}>
                            {vendor.status}
                          </Badge>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delivery Management */}
          <TabsContent value="delivery" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Delivery Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: "#1234", customer: "John Doe", address: "123 Main St", status: "In Transit", time: "2 hours ago" },
                      { id: "#1235", customer: "Jane Smith", address: "456 Oak Ave", status: "Delivered", time: "1 hour ago" },
                      { id: "#1236", customer: "Bob Johnson", address: "789 Pine Rd", status: "Pending", time: "30 mins ago" }
                    ].map((order, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{order.id}</span>
                          <Badge variant={order.status === "Delivered" ? "default" : order.status === "In Transit" ? "secondary" : "outline"}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.address}</p>
                        <p className="text-xs text-muted-foreground mt-2">{order.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Boys</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Delivery Boy
                    </Button>
                    {[
                      { name: "Mike Wilson", phone: "+1 555-0101", status: "Available", orders: 3 },
                      { name: "Sarah Davis", phone: "+1 555-0102", status: "Busy", orders: 5 },
                      { name: "Tom Brown", phone: "+1 555-0103", status: "Available", orders: 2 }
                    ].map((boy, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{boy.name}</h4>
                            <p className="text-sm text-muted-foreground">{boy.phone}</p>
                            <p className="text-sm text-muted-foreground">{boy.orders} active orders</p>
                          </div>
                          <Badge variant={boy.status === "Available" ? "default" : "secondary"}>
                            {boy.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Theme Customization */}
          <TabsContent value="theme" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Theme Customization
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label>Primary Color</Label>
                    <div className="flex gap-2 mt-2">
                      <input type="color" defaultValue="#3b82f6" className="w-12 h-10 rounded border" />
                      <Input defaultValue="#3b82f6" className="flex-1" />
                    </div>
                  </div>
                  <div>
                    <Label>Secondary Color</Label>
                    <div className="flex gap-2 mt-2">
                      <input type="color" defaultValue="#64748b" className="w-12 h-10 rounded border" />
                      <Input defaultValue="#64748b" className="flex-1" />
                    </div>
                  </div>
                  <div>
                    <Label>Accent Color</Label>
                    <div className="flex gap-2 mt-2">
                      <input type="color" defaultValue="#f59e0b" className="w-12 h-10 rounded border" />
                      <Input defaultValue="#f59e0b" className="flex-1" />
                    </div>
                  </div>
                  <div>
                    <Label>Background Color</Label>
                    <div className="flex gap-2 mt-2">
                      <input type="color" defaultValue="#ffffff" className="w-12 h-10 rounded border" />
                      <Input defaultValue="#ffffff" className="flex-1" />
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Font Family</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="open-sans">Open Sans</SelectItem>
                      <SelectItem value="lato">Lato</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="dark-mode" />
                  <Label htmlFor="dark-mode">Enable Dark Mode by Default</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="animations" defaultChecked />
                  <Label htmlFor="animations">Enable Animations</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Menu Management */}
          <TabsContent value="menu" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MenuIcon className="h-5 w-5" />
                  Menu Management
                </CardTitle>
                <CardDescription>
                  Customize navigation menus and create new pages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Navigation Items</h4>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Menu Item
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {[
                      { title: "Home", url: "/", type: "Link" },
                      { title: "Today's Deals", url: "/todays-deals", type: "Page" },
                      { title: "Categories", url: "#", type: "Dropdown" },
                      { title: "Customer Care", url: "/customer-care", type: "Page" },
                      { title: "Wishlist", url: "/wishlist", type: "Page" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h5 className="font-medium">{item.title}</h5>
                          <p className="text-sm text-muted-foreground">{item.url}</p>
                          <Badge variant="outline" className="mt-1">
                            {item.type}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t">
                    <h4 className="font-medium mb-4">Create New Page</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="page-title">Page Title</Label>
                        <Input id="page-title" placeholder="Enter page title" />
                      </div>
                      <div>
                        <Label htmlFor="page-url">URL Slug</Label>
                        <Input id="page-url" placeholder="page-url" />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="page-content">Page Content</Label>
                        <Textarea id="page-content" placeholder="Enter page content..." rows={6} />
                      </div>
                      <Button className="md:col-span-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Page
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-8">
          <Button onClick={handleSave} size="lg">
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
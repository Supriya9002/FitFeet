import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, Clock, MessageSquare, HeadphonesIcon, Video } from "lucide-react";

export default function CustomerCare() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Support",
      description: "Speak with our experts",
      detail: "+91 1800-123-4567",
      availability: "24/7 Available",
      color: "bg-green-500"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with support team",
      detail: "Start Chat",
      availability: "Online Now",
      color: "bg-blue-500"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed help",
      detail: "support@fitfeet.in",
      availability: "Reply in 2 hours",
      color: "bg-purple-500"
    },
    {
      icon: Video,
      title: "Video Call",
      description: "Screen sharing support",
      detail: "Schedule Call",
      availability: "9 AM - 6 PM",
      color: "bg-orange-500"
    }
  ];

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by going to 'Order History' section and clicking on the order ID. You'll get real-time updates."
    },
    {
      question: "What is the return policy?",
      answer: "We offer 7-day easy returns for most products. Items should be in original condition with tags attached."
    },
    {
      question: "How do delivery charges work?",
      answer: "Delivery is free for orders above ₹499. For orders below that, we charge ₹40 delivery fee."
    },
    {
      question: "Can I change my delivery address?",
      answer: "Yes, you can change delivery address before the order is shipped. Contact our support team for assistance."
    }
  ];

  return (
    <PageLayout 
      title="Customer Care" 
      description="We're here to help you 24/7"
    >
      <div className="space-y-8">
        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactMethods.map((method, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <method.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                <p className="font-medium text-primary">{method.detail}</p>
                <Badge variant="outline" className="mt-2">
                  {method.availability}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Support Tabs */}
        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact Form</TabsTrigger>
            <TabsTrigger value="status">Service Status</TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-b-0">
                    <h4 className="font-medium mb-2">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Your Name" />
                  <Input placeholder="Your Email" />
                </div>
                <Input placeholder="Subject" />
                <textarea 
                  className="w-full min-h-32 p-3 border border-border rounded-md bg-background"
                  placeholder="Describe your issue in detail..."
                />
                <Button className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="status" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Website</span>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Operational
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Payment Gateway</span>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Operational
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Delivery Service</span>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Operational
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Emergency Contact */}
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6 text-center">
            <HeadphonesIcon className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Need Immediate Help?</h3>
            <p className="mb-4 opacity-90">Our support team is available 24/7 to assist you</p>
            <Button variant="secondary" size="lg">
              <Phone className="h-4 w-4 mr-2" />
              Call Now: +91 1800-123-4567
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
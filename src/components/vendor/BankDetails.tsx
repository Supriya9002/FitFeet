import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Building, Smartphone, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BankDetails {
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  bankName: string;
  accountType: string;
}

interface UPIDetails {
  upiId: string;
  mobileNumber: string;
  verified: boolean;
}

export function BankDetails() {
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    bankName: "",
    accountType: ""
  });

  const [upiDetails, setUpiDetails] = useState<UPIDetails>({
    upiId: "",
    mobileNumber: "",
    verified: false
  });

  const [bankSaved, setBankSaved] = useState(false);
  const [upiSaved, setUpiSaved] = useState(false);
  const { toast } = useToast();

  const handleBankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBankSaved(true);
    toast({
      title: "Bank Details Saved",
      description: "Your bank account details have been saved successfully!"
    });
  };

  const handleUPISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUpiDetails(prev => ({ ...prev, verified: true }));
    setUpiSaved(true);
    toast({
      title: "UPI Details Saved",
      description: "Your UPI details have been saved and verified!"
    });
  };

  const verifyUPI = () => {
    // Mock verification
    setUpiDetails(prev => ({ ...prev, verified: true }));
    toast({
      title: "UPI Verified",
      description: "Your UPI ID has been verified successfully!"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Payment Information</h2>
        <p className="text-muted-foreground">Add your bank details and UPI for receiving payments</p>
      </div>

      <Tabs defaultValue="bank" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bank" className="gap-2">
            <Building className="h-4 w-4" />
            Bank Account
          </TabsTrigger>
          <TabsTrigger value="upi" className="gap-2">
            <Smartphone className="h-4 w-4" />
            UPI Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bank">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Bank Account Details
                  </CardTitle>
                  <CardDescription>
                    Add your bank account for receiving payments from sales
                  </CardDescription>
                </div>
                {bankSaved && (
                  <Badge variant="success" className="gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Saved
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBankSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountHolder">Account Holder Name</Label>
                    <Input
                      id="accountHolder"
                      value={bankDetails.accountHolderName}
                      onChange={(e) => setBankDetails(prev => ({ ...prev, accountHolderName: e.target.value }))}
                      placeholder="Enter full name as per bank"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={bankDetails.bankName}
                      onChange={(e) => setBankDetails(prev => ({ ...prev, bankName: e.target.value }))}
                      placeholder="Enter bank name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      value={bankDetails.accountNumber}
                      onChange={(e) => setBankDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
                      placeholder="Enter account number"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ifsc">IFSC Code</Label>
                    <Input
                      id="ifsc"
                      value={bankDetails.ifscCode}
                      onChange={(e) => setBankDetails(prev => ({ ...prev, ifscCode: e.target.value.toUpperCase() }))}
                      placeholder="Enter IFSC code"
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="accountType">Account Type</Label>
                    <Select 
                      value={bankDetails.accountType} 
                      onValueChange={(value) => setBankDetails(prev => ({ ...prev, accountType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="savings">Savings Account</SelectItem>
                        <SelectItem value="current">Current Account</SelectItem>
                        <SelectItem value="business">Business Account</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <Shield className="h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Your bank details are encrypted and secure. We only use this information for payment processing.
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  Save Bank Details
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upi">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    UPI Details
                  </CardTitle>
                  <CardDescription>
                    Add your UPI ID for quick and easy payments
                  </CardDescription>
                </div>
                {upiSaved && (
                  <Badge variant="success" className="gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUPISubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <div className="flex gap-2">
                    <Input
                      id="upiId"
                      value={upiDetails.upiId}
                      onChange={(e) => setUpiDetails(prev => ({ ...prev, upiId: e.target.value }))}
                      placeholder="yourname@paytm"
                      required
                      className="flex-1"
                    />
                    {upiDetails.upiId && !upiDetails.verified && (
                      <Button type="button" variant="outline" onClick={verifyUPI}>
                        Verify
                      </Button>
                    )}
                  </div>
                  {upiDetails.verified && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      UPI ID verified successfully
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number (linked to UPI)</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={upiDetails.mobileNumber}
                    onChange={(e) => setUpiDetails(prev => ({ ...prev, mobileNumber: e.target.value }))}
                    placeholder="Enter mobile number"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Popular UPI Apps:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
                      <div>• Google Pay</div>
                      <div>• PhonePe</div>
                      <div>• Paytm</div>
                      <div>• BHIM UPI</div>
                      <div>• Amazon Pay</div>
                      <div>• PayU</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Shield className="h-4 w-4 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      UPI payments are instant and secure. You'll receive notifications for every transaction.
                    </p>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={!upiDetails.verified}>
                  Save UPI Details
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
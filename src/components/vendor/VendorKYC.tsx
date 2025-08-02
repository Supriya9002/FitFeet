import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CreditCard, Building2, X } from "lucide-react";

interface VendorKYCProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function VendorKYC({ onClose, onSubmit }: VendorKYCProps) {
  const [formData, setFormData] = useState({
    aadhaar: "",
    pan: "",
    gst: "",
    shopAddress: "",
    ownerName: "",
    bankAccount: "",
    ifscCode: "",
  });

  const [documents, setDocuments] = useState({
    aadhaarFile: null as File | null,
    panFile: null as File | null,
    gstFile: null as File | null,
    shopPhoto: null as File | null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setDocuments(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = () => {
    onSubmit({ ...formData, documents });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            KYC Verification
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            अपनी दुकान को verify करने के लिए documents upload करें
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ownerName">Shop Owner Name</Label>
                <Input
                  id="ownerName"
                  placeholder="दुकान मालिक का नाम"
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange("ownerName", e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aadhaar">Aadhaar Number</Label>
                  <Input
                    id="aadhaar"
                    placeholder="XXXX XXXX XXXX"
                    value={formData.aadhaar}
                    onChange={(e) => handleInputChange("aadhaar", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pan">PAN Number</Label>
                  <Input
                    id="pan"
                    placeholder="ABCDE1234F"
                    value={formData.pan}
                    onChange={(e) => handleInputChange("pan", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gst">GST Number <Badge variant="secondary">Optional</Badge></Label>
                <Input
                  id="gst"
                  placeholder="GST Number (अगर है तो)"
                  value={formData.gst}
                  onChange={(e) => handleInputChange("gst", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="shopAddress">Shop Address</Label>
                <Textarea
                  id="shopAddress"
                  placeholder="दुकान का पूरा पता"
                  value={formData.shopAddress}
                  onChange={(e) => handleInputChange("shopAddress", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Bank Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bank Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankAccount">Bank Account Number</Label>
                  <Input
                    id="bankAccount"
                    placeholder="Account Number"
                    value={formData.bankAccount}
                    onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input
                    id="ifscCode"
                    placeholder="IFSC Code"
                    value={formData.ifscCode}
                    onChange={(e) => handleInputChange("ifscCode", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Document Upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DocumentUpload
                label="Aadhaar Card"
                icon={<CreditCard className="w-4 h-4" />}
                file={documents.aadhaarFile}
                onFileChange={(file) => handleFileUpload("aadhaarFile", file)}
                required
              />
              
              <DocumentUpload
                label="PAN Card"
                icon={<CreditCard className="w-4 h-4" />}
                file={documents.panFile}
                onFileChange={(file) => handleFileUpload("panFile", file)}
                required
              />
              
              <DocumentUpload
                label="GST Certificate"
                icon={<FileText className="w-4 h-4" />}
                file={documents.gstFile}
                onFileChange={(file) => handleFileUpload("gstFile", file)}
                optional
              />
              
              <DocumentUpload
                label="Shop Photo"
                icon={<Building2 className="w-4 h-4" />}
                file={documents.shopPhoto}
                onFileChange={(file) => handleFileUpload("shopPhoto", file)}
                required
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Submit for Verification
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface DocumentUploadProps {
  label: string;
  icon: React.ReactNode;
  file: File | null;
  onFileChange: (file: File | null) => void;
  required?: boolean;
  optional?: boolean;
}

function DocumentUpload({ label, icon, file, onFileChange, required, optional }: DocumentUploadProps) {
  return (
    <div className="border-2 border-dashed border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium">{label}</span>
          {required && <Badge variant="destructive" className="text-xs">Required</Badge>}
          {optional && <Badge variant="secondary" className="text-xs">Optional</Badge>}
        </div>
        {file && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFileChange(null)}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      {file ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="w-4 h-4" />
          {file.name}
        </div>
      ) : (
        <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground">
          <Upload className="w-4 h-4" />
          Click to upload
          <input
            type="file"
            className="hidden"
            accept="image/*,.pdf"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                onFileChange(selectedFile);
              }
            }}
          />
        </label>
      )}
    </div>
  );
}
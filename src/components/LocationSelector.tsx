import { MapPin, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockLocations } from "@/data/mockData";
import { useState } from "react";

interface LocationSelectorProps {
  onLocationSelect: (pinCode: string, area: string) => void;
  onClose: () => void;
}

export function LocationSelector({ onLocationSelect, onClose }: LocationSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredLocations = mockLocations.filter(
    location => 
      location.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.pinCode.includes(searchTerm) ||
      location.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[80vh] overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Select Your Location
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Current Location Button */}
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => {
              // Simulate getting current location
              onLocationSelect("560001", "MG Road");
              onClose();
            }}
          >
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            Use Current Location
          </Button>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for your area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Popular Areas */}
          <div>
            <h4 className="font-medium mb-3 text-sm text-muted-foreground">POPULAR AREAS</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredLocations.map((location) => (
                <Button
                  key={location.pinCode}
                  variant="ghost"
                  className="w-full justify-between hover:bg-accent p-3 h-auto"
                  onClick={() => {
                    onLocationSelect(location.pinCode, location.area);
                    onClose();
                  }}
                >
                  <div className="text-left">
                    <div className="font-medium">{location.area}</div>
                    <div className="text-sm text-muted-foreground">
                      {location.city} - {location.pinCode}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Button>
              ))}
            </div>
          </div>

          {/* Manual Pin Code Entry */}
          <div className="pt-4 border-t">
            <div className="flex gap-2">
              <Input 
                placeholder="Enter PIN code"
                maxLength={6}
                pattern="[0-9]*"
              />
              <Button variant="outline">Set</Button>
            </div>
          </div>

          {/* Close Button */}
          <Button variant="outline" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
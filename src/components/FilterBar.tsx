import { Filter, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterState {
  category?: string;
  gender?: string;
  priceRange?: string;
  rating?: string;
  sortBy?: string;
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "shoes", label: "Shoes" },
  { value: "dresses", label: "Dresses" },
  { value: "accessories", label: "Accessories" },
  { value: "traditional", label: "Traditional" }
];

const genders = [
  { value: "all", label: "All Genders" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "kids", label: "Kids" }
];

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "0-500", label: "Under ₹500" },
  { value: "500-1000", label: "₹500 - ₹1000" },
  { value: "1000-2000", label: "₹1000 - ₹2000" },
  { value: "2000+", label: "Above ₹2000" }
];

const ratings = [
  { value: "all", label: "All Ratings" },
  { value: "4", label: "4★ & above" },
  { value: "3", label: "3★ & above" },
  { value: "2", label: "2★ & above" }
];

const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
  { value: "newest", label: "Newest First" }
];

export function FilterBar({ filters, onFilterChange, onClearFilters, activeFiltersCount }: FilterBarProps) {
  const updateFilter = (key: keyof FilterState, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value === "all" ? undefined : value
    });
  };

  return (
    <div className="bg-background border-b border-border py-3">
      <div className="container mx-auto px-4">
        {/* Mobile Filter Toggle */}
        <div className="flex items-center justify-between md:hidden mb-3">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
          
          {activeFiltersCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearFilters}
              className="text-destructive hover:text-destructive"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {/* Desktop Filters */}
        <div className="hidden md:flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          <Select 
            value={filters.category || "all"} 
            onValueChange={(value) => updateFilter("category", value)}
          >
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={filters.gender || "all"} 
            onValueChange={(value) => updateFilter("gender", value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {genders.map((gender) => (
                <SelectItem key={gender.value} value={gender.value}>
                  {gender.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={filters.priceRange || "all"} 
            onValueChange={(value) => updateFilter("priceRange", value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={filters.rating || "all"} 
            onValueChange={(value) => updateFilter("rating", value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ratings.map((rating) => (
                <SelectItem key={rating.value} value={rating.value}>
                  {rating.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select 
              value={filters.sortBy || "popularity"} 
              onValueChange={(value) => updateFilter("sortBy", value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {activeFiltersCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearFilters}
              className="text-destructive hover:text-destructive"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All ({activeFiltersCount})
            </Button>
          )}
        </div>

        {/* Active Filter Tags */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {filters.category && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {categories.find(c => c.value === filters.category)?.label}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => updateFilter("category", "all")}
                />
              </Badge>
            )}
            {filters.gender && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {genders.find(g => g.value === filters.gender)?.label}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => updateFilter("gender", "all")}
                />
              </Badge>
            )}
            {filters.priceRange && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {priceRanges.find(p => p.value === filters.priceRange)?.label}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => updateFilter("priceRange", "all")}
                />
              </Badge>
            )}
            {filters.rating && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {ratings.find(r => r.value === filters.rating)?.label}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => updateFilter("rating", "all")}
                />
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
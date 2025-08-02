export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  shopName: string;
  location: string;
  images: string[];
  sizes: string[];
  colors: string[];
  category: string;
  gender: string;
  inStock: boolean;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Nike Air Force 1 Low White",
    price: 7995,
    originalPrice: 8995,
    rating: 4.5,
    reviewCount: 124,
    shopName: "Rajesh Footwear",
    location: "Gandhi Nagar",
    images: ["/placeholder.svg"],
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["White", "Black"],
    category: "shoes",
    gender: "male",
    inStock: true
  },
  {
    id: "2", 
    name: "Adidas Ultraboost 22 Black",
    price: 12999,
    originalPrice: 15999,
    rating: 4.7,
    reviewCount: 89,
    shopName: "Sports Corner",
    location: "MG Road",
    images: ["/placeholder.svg"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black", "Blue", "Red"],
    category: "shoes",
    gender: "male", 
    inStock: true
  },
  {
    id: "3",
    name: "Women's Floral Summer Dress",
    price: 1299,
    originalPrice: 1999,
    rating: 4.3,
    reviewCount: 67,
    shopName: "Fashion Villa",
    location: "Commercial Street",
    images: ["/placeholder.svg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Pink", "Yellow"],
    category: "dresses",
    gender: "female",
    inStock: true
  },
  {
    id: "4",
    name: "Puma RS-X3 Sneakers",
    price: 6999,
    rating: 4.2,
    reviewCount: 45,
    shopName: "Shoe Palace",
    location: "Brigade Road",
    images: ["/placeholder.svg"],
    sizes: ["6", "7", "8", "9"],
    colors: ["White", "Black", "Red"],
    category: "shoes",
    gender: "female",
    inStock: false
  },
  {
    id: "5",
    name: "Kids Superhero T-Shirt",
    price: 499,
    originalPrice: 799,
    rating: 4.6,
    reviewCount: 156,
    shopName: "Little Stars",
    location: "JP Nagar",
    images: ["/placeholder.svg"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: ["Blue", "Red", "Green"],
    category: "toys",
    gender: "kids",
    inStock: true
  },
  {
    id: "6",
    name: "Traditional Kurti Set",
    price: 1899,
    originalPrice: 2499,
    rating: 4.4,
    reviewCount: 78,
    shopName: "Ethnic Wear Store",
    location: "Chickpet",
    images: ["/placeholder.svg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "Maroon", "Green"],
    category: "traditional",
    gender: "female",
    inStock: true
  },
  {
    id: "7",
    name: "Converse Chuck Taylor All Star",
    price: 3999,
    rating: 4.8,
    reviewCount: 203,
    shopName: "Canvas & Co",
    location: "Indiranagar",
    images: ["/placeholder.svg"],
    sizes: ["5", "6", "7", "8", "9", "10"],
    colors: ["Black", "White", "Red"],
    category: "shoes",
    gender: "male",
    inStock: true
  },
  {
    id: "8",
    name: "Elegant Evening Gown",
    price: 3499,
    originalPrice: 4999,
    rating: 4.1,
    reviewCount: 34,
    shopName: "Glamour Boutique",
    location: "UB City Mall",
    images: ["/placeholder.svg"],
    sizes: ["S", "M", "L"],
    colors: ["Black", "Navy", "Wine"],
    category: "dresses",
    gender: "female",
    inStock: true
  },
  // Medical Equipment
  {
    id: "9",
    name: "Digital Blood Pressure Monitor",
    price: 2499,
    originalPrice: 3499,
    rating: 4.6,
    reviewCount: 89,
    shopName: "HealthCare Plus",
    location: "Jayanagar",
    images: ["/placeholder.svg"],
    sizes: ["One Size"],
    colors: ["White"],
    category: "medical",
    gender: "unisex",
    inStock: true
  },
  {
    id: "10",
    name: "Pulse Oximeter",
    price: 899,
    originalPrice: 1299,
    rating: 4.3,
    reviewCount: 145,
    shopName: "Medical Store",
    location: "Malleshwaram",
    images: ["/placeholder.svg"],
    sizes: ["One Size"],
    colors: ["Blue", "Black"],
    category: "medical",
    gender: "unisex",
    inStock: true
  },
  // Toys
  {
    id: "11",
    name: "Educational Building Blocks",
    price: 799,
    originalPrice: 1199,
    rating: 4.7,
    reviewCount: 234,
    shopName: "Toy Kingdom",
    location: "Koramangala",
    images: ["/placeholder.svg"],
    sizes: ["One Size"],
    colors: ["Multicolor"],
    category: "toys",
    gender: "kids",
    inStock: true
  },
  {
    id: "12",
    name: "Remote Control Car",
    price: 1599,
    originalPrice: 2299,
    rating: 4.4,
    reviewCount: 67,
    shopName: "Fun World Toys",
    location: "BTM Layout",
    images: ["/placeholder.svg"],
    sizes: ["One Size"],
    colors: ["Red", "Blue"],
    category: "toys",
    gender: "kids",
    inStock: true
  },
  // Medicine/Pharmacy
  {
    id: "13",
    name: "Vitamin D3 Tablets",
    price: 299,
    rating: 4.2,
    reviewCount: 178,
    shopName: "Apollo Pharmacy",
    location: "Whitefield",
    images: ["/placeholder.svg"],
    sizes: ["60 Tablets"],
    colors: ["White"],
    category: "medicine",
    gender: "unisex",
    inStock: true
  },
  {
    id: "14",
    name: "Protein Powder",
    price: 2999,
    originalPrice: 3999,
    rating: 4.5,
    reviewCount: 289,
    shopName: "Health Corner",
    location: "HSR Layout",
    images: ["/placeholder.svg"],
    sizes: ["1kg", "2kg"],
    colors: ["Chocolate", "Vanilla"],
    category: "medicine",
    gender: "unisex",
    inStock: true
  },
  // Electronics
  {
    id: "15",
    name: "Wireless Bluetooth Headphones",
    price: 1999,
    originalPrice: 2999,
    rating: 4.3,
    reviewCount: 156,
    shopName: "Tech Zone",
    location: "Electronic City",
    images: ["/placeholder.svg"],
    sizes: ["One Size"],
    colors: ["Black", "White", "Blue"],
    category: "electronics",
    gender: "unisex",
    inStock: true
  },
  // Books
  {
    id: "16",
    name: "Self Help Book Collection",
    price: 599,
    originalPrice: 899,
    rating: 4.6,
    reviewCount: 98,
    shopName: "Book Paradise",
    location: "Church Street",
    images: ["/placeholder.svg"],
    sizes: ["Paperback"],
    colors: ["Mixed"],
    category: "books",
    gender: "unisex",
    inStock: true
  }
];

export interface Shop {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  categories: string[];
  isOpen: boolean;
  deliveryTime: string;
  image: string;
  pinCodes: string[];
}

export const mockShops: Shop[] = [
  {
    id: "1",
    name: "Rajesh Footwear",
    location: "Gandhi Nagar, Bangalore",
    rating: 4.5,
    reviewCount: 324,
    categories: ["shoes", "accessories"],
    isOpen: true,
    deliveryTime: "30-45 min",
    image: "/placeholder.svg",
    pinCodes: ["560009", "560002", "560001"]
  },
  {
    id: "2", 
    name: "Fashion Villa",
    location: "Commercial Street, Bangalore",
    rating: 4.3,
    reviewCount: 189,
    categories: ["dresses", "accessories"],
    isOpen: true,
    deliveryTime: "45-60 min",
    image: "/placeholder.svg",
    pinCodes: ["560001", "560002", "560025"]
  },
  {
    id: "3",
    name: "Sports Corner",
    location: "MG Road, Bangalore",
    rating: 4.7,
    reviewCount: 267,
    categories: ["shoes", "accessories"],
    isOpen: false,
    deliveryTime: "25-40 min",
    image: "/placeholder.svg",
    pinCodes: ["560001", "560025", "560042"]
  },
  {
    id: "4",
    name: "Ethnic Wear Store",
    location: "Chickpet, Bangalore",
    rating: 4.4,
    reviewCount: 145,
    categories: ["traditional", "dresses"],
    isOpen: true,
    deliveryTime: "40-55 min",
    image: "/placeholder.svg",
    pinCodes: ["560053", "560002", "560001"]
  }
];

export const mockLocations = [
  { pinCode: "560001", area: "MG Road", city: "Bangalore" },
  { pinCode: "560002", area: "Gandhi Nagar", city: "Bangalore" },
  { pinCode: "560009", area: "Rajajinagar", city: "Bangalore" },
  { pinCode: "560025", area: "Indiranagar", city: "Bangalore" },
  { pinCode: "560042", area: "Koramangala", city: "Bangalore" },
  { pinCode: "560053", area: "Chickpet", city: "Bangalore" }
];
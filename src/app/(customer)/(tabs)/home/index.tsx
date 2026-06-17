import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomerCategories } from "@/components/customer/customer-categories";
import { CustomerFilterModal } from "@/components/customer/customer-filter-modal";
import { CustomerHeader } from "@/components/customer/customer-header";
import { CustomerProducts } from "@/components/customer/customer-products";
import { CustomerPromoBanner } from "@/components/customer/customer-promo-banner";
import { CustomerSearchBar } from "@/components/customer/customer-search-bar";
import { CustomerServiceSelector } from "@/components/customer/customer-service-selector";

// Dynamic data mapping for categories and products by service
const SERVICE_DATA = {
  products: {
    categories: [
      {
        id: "electronic",
        title: "Electronic",
        icon: "phone-portrait-outline" as const,
      },
      { id: "clothing", title: "Clothing", icon: "shirt-outline" as const },
      { id: "grocery", title: "Grocery", icon: "basket-outline" as const },
      { id: "cosmetic", title: "Cosmetic", icon: "sparkles-outline" as const },
      { id: "pharmacy", title: "Pharmacy", icon: "medical-outline" as const },
    ],
    products: [
      {
        id: "p1",
        title: "Sneakers",
        price: 120,
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      },
      {
        id: "p2",
        title: "Smart Watch",
        price: 199,
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400",
      },
      {
        id: "p3",
        title: "Headphones",
        price: 89,
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      },
    ],
  },
  restaurant: {
    categories: [
      { id: "pizza", title: "Pizza", icon: "pizza-outline" as const },
      { id: "burger", title: "Burger", icon: "fast-food-outline" as const },
      { id: "sushi", title: "Sushi", icon: "leaf-outline" as const },
      { id: "desserts", title: "Desserts", icon: "ice-cream-outline" as const },
      { id: "drinks", title: "Beverages", icon: "cafe-outline" as const },
    ],
    products: [
      {
        id: "r1",
        title: "Margherita Pizza",
        price: 15,
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400",
      },
      {
        id: "r2",
        title: "Double Burger",
        price: 12,
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
      },
      {
        id: "r3",
        title: "California Sushi",
        price: 18,
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400",
      },
    ],
  },
  "car-rent": {
    categories: [
      { id: "sedan", title: "Sedan", icon: "car-sport-outline" as const },
      { id: "suv", title: "SUV", icon: "car-outline" as const },
      { id: "luxury", title: "Luxury", icon: "ribbon-outline" as const },
      { id: "electric", title: "Electric", icon: "flash-outline" as const },
      { id: "van", title: "Van", icon: "bus-outline" as const },
    ],
    products: [
      {
        id: "c1",
        title: "Tesla Model Y",
        price: 85,
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400",
      },
      {
        id: "c2",
        title: "Toyota RAV4 SUV",
        price: 60,
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400",
      },
      {
        id: "c3",
        title: "Ford Mustang GT",
        price: 110,
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1611245422472-3580556f8f53?w=400",
      },
    ],
  },
  "get-ride": {
    categories: [
      { id: "economy", title: "Economy", icon: "cash-outline" as const },
      { id: "comfort", title: "Comfort", icon: "sparkles-outline" as const },
      { id: "luxury", title: "Premium", icon: "star-outline" as const },
      { id: "moto", title: "Moto Ride", icon: "bicycle-outline" as const },
      { id: "bike", title: "Bicycle", icon: "walk-outline" as const },
    ],
    products: [
      {
        id: "g1",
        title: "Standard Ride",
        price: 8,
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1492664738988-2be91080becd?w=400",
      },
      {
        id: "g2",
        title: "Comfort Ride",
        price: 15,
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400",
      },
      {
        id: "g3",
        title: "Instant Moto",
        price: 5,
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400",
      },
    ],
  },
};

export default function CustomerHomeScreen() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<
    "products" | "restaurant" | "car-rent" | "get-ride"
  >("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("high-to-low");
  const [selectedCategory, setSelectedCategory] = useState("electronic");
  const [assets] = useAssets([require("@/assets/banner.png")]);

  // Handle service change and set default sub-category automatically
  const handleSelectService = (serviceId: string) => {
    const service = serviceId as
      | "products"
      | "restaurant"
      | "car-rent"
      | "get-ride";
    setSelectedService(service);
    const defaultCat = SERVICE_DATA[service].categories[0].id;
    setSelectedCategory(defaultCat);
  };

  const currentServiceData = SERVICE_DATA[selectedService];

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* Scroll View to cover entire screen content except floating bottom tab bar */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 110 }} // Leave padding for the floating bottom tab bar
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header & Logo */}
        <CustomerHeader
          name="Rahim Rehman"
          cartCount={1}
          notificationCount={1}
          onCartPress={() => router.push("/(customer)/cart")}
          onNotificationPress={() => console.log("Notifications pressed")}
        />

        {/* Top categories selection slider (Products, Restaurant, Car Rent, Get a ride) */}
        <CustomerServiceSelector
          selectedService={selectedService}
          onSelectService={handleSelectService}
        />

        {/* Search & Filter Bar */}
        <CustomerSearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onFilterPress={() => setIsFilterVisible(true)}
        />

        {/* Promos Banner */}
        <CustomerPromoBanner bannerUri={assets?.[0]?.localUri ?? undefined} />

        {/* Categories Row (dynamic based on selected service) */}
        <CustomerCategories
          categories={currentServiceData.categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Featured Products Grid (dynamic based on selected service) */}
        <CustomerProducts
          products={currentServiceData.products}
          onProductPress={(prod) => {
            router.push({
              pathname: "/(customer)/home/product-details" as any,
              params: {
                id: prod.id,
                title: prod.title,
                price: prod.price.toString(),
                rating: prod.rating.toString(),
                image: prod.image,
              },
            });
          }}
          onAddProduct={(id) => {
            console.log("Added product to cart:", id);
            router.push("/(customer)/cart");
          }}
        />
      </ScrollView>

      {/* Filter Modal */}
      <CustomerFilterModal
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </SafeAreaView>
  );
}

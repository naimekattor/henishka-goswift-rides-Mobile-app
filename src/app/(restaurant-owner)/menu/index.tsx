import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface SizeVariant {
  size: string;
  price: string;
  offer: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  rating: number;
  reviewsCount: number;
  category: "Pizza" | "Burger" | "Pasta" | "Salad" | "Desert";
  inStock: boolean;
  image: string;
  sizes: SizeVariant[];
  isPopular?: boolean;
  isBestSeller?: boolean;
  isBestOffer?: boolean;
}

interface Review {
  id: string;
  customerName: string;
  avatar: string;
  rating: number;
  time: string;
  content: string;
  reply?: string;
  showReplyInput?: boolean;
}

const INITIAL_MENU: MenuItem[] = [
  {
    id: "1",
    name: "Mountain BBQ Burger",
    description: "Flame-grilled premium beef patty, crispy smoked bacon, melted cheddar cheese, onion rings, and sweet hickory BBQ sauce.",
    price: "$5.99",
    rating: 4.5,
    reviewsCount: 128,
    category: "Burger",
    inStock: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&auto=format&fit=crop&q=80",
    sizes: [
      { size: "Medium", price: "5.99", offer: "" },
      { size: "Large", price: "7.99", offer: "6.99" },
    ],
    isPopular: true,
  },
  {
    id: "2",
    name: "Sunset Pizza",
    description: "Classic pizza dough topped with tangy herb-infused tomato marinara, fresh mozzarella slices, bell peppers, onions, and sweet tomatoes.",
    price: "30.29",
    rating: 4.8,
    reviewsCount: 94,
    category: "Pizza",
    inStock: true,
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=150&auto=format&fit=crop&q=80",
    sizes: [
      { size: "Small (8 inch)", price: "24.29", offer: "" },
      { size: "Medium (12 inch)", price: "30.29", offer: "" },
      { size: "Large (16 inch)", price: "35.29", offer: "32.29" },
    ],
    isBestSeller: true,
  },
  {
    id: "3",
    name: "Harvest Moon Sandwich",
    description: "Toasted whole grain bread packed with roasted turkey breast, crisp lettuce, ripe tomatoes, sliced avocados, and cranberry aioli.",
    price: "$5.99",
    rating: 4.3,
    reviewsCount: 42,
    category: "Desert",
    inStock: true,
    image: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=150&auto=format&fit=crop&q=80",
    sizes: [{ size: "Standard", price: "5.99", offer: "" }],
  },
  {
    id: "4",
    name: "Velvet Shake",
    description: "Rich, creamy vanilla bean milkshake blended with red velvet cake crumbs and topped with whipped cream and chocolate drizzle.",
    price: "$5.99",
    rating: 4.7,
    reviewsCount: 88,
    category: "Desert",
    inStock: false,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=150&auto=format&fit=crop&q=80",
    sizes: [{ size: "Regular", price: "5.99", offer: "" }],
    isBestOffer: true,
  },
];

const INITIAL_REVIEWS: Review[] = [
  {
    id: "1",
    customerName: "Maria Rodriguez",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    time: "2 days ago",
    content: "Absolutely amazing experience! The Pizza was authentic and delicious. The atmosphere is cozy and the staff is incredibly friendly.",
    reply: "Thank you Maria! We're so glad you loved the pizza. See you again soon!",
  },
  {
    id: "2",
    customerName: "Esther Howard",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    rating: 4,
    time: "2 days ago",
    content: "Absolutely amazing experience! The BBQ Burger was delicious, fresh beef, very filling. Highly recommend checking it out.",
  },
  {
    id: "3",
    customerName: "Robert Fox",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    time: "2 days ago",
    content: "The best food delivery in the city! Packaging was neat and the food arrived hot.",
  },
];

export default function RestaurantMenu() {
  const [menu, setMenu] = useState<MenuItem[]>(INITIAL_MENU);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [activeCategory, setActiveCategory] = useState<"All" | "Pizza" | "Burger" | "Pasta" | "Salad" | "Desert">("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Navigation state
  const [currentView, setCurrentView] = useState<"list" | "details" | "add" | "edit" | "reviews">("list");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formCategory, setFormCategory] = useState<MenuItem["category"]>("Pizza");
  const [formPrice, setFormPrice] = useState("");
  const [formSizes, setFormSizes] = useState<SizeVariant[]>([{ size: "", price: "", offer: "" }]);
  const [formPopular, setFormPopular] = useState(false);
  const [formBestSeller, setFormBestSeller] = useState(false);
  const [formBestOffer, setFormBestOffer] = useState(false);
  const [formPhotos, setFormPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=150&auto=format&fit=crop&q=80",
  ]);

  // Reply states
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});

  const filteredMenu = menu.filter((item) => {
    const matchesCat = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleStock = (id: string) => {
    setMenu((prev) =>
      prev.map((item) => (item.id === id ? { ...item, inStock: !item.inStock } : item))
    );
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem((prev) => (prev ? { ...prev, inStock: !prev.inStock } : null));
    }
  };

  const handleAddSizeRow = () => {
    setFormSizes((prev) => [...prev, { size: "", price: "", offer: "" }]);
  };

  const handleRemoveSizeRow = (index: number) => {
    setFormSizes((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSizeChange = (index: number, field: keyof SizeVariant, val: string) => {
    setFormSizes((prev) =>
      prev.map((v, idx) => (idx === index ? { ...v, [field]: val } : v))
    );
  };

  const openAddView = () => {
    setFormName("");
    setFormDesc("");
    setFormCategory("Pizza");
    setFormPrice("");
    setFormSizes([{ size: "", price: "", offer: "" }]);
    setFormPopular(false);
    setFormBestSeller(false);
    setFormBestOffer(false);
    setCurrentView("add");
  };

  const openEditView = (item: MenuItem) => {
    setFormName(item.name);
    setFormDesc(item.description);
    setFormCategory(item.category);
    setFormPrice(item.price.replace("$", ""));
    setFormSizes(item.sizes.length > 0 ? item.sizes : [{ size: "", price: "", offer: "" }]);
    setFormPopular(!!item.isPopular);
    setFormBestSeller(!!item.isBestSeller);
    setFormBestOffer(!!item.isBestOffer);
    setCurrentView("edit");
  };

  const handleSaveItem = () => {
    if (!formName) return;

    if (currentView === "add") {
      const newItem: MenuItem = {
        id: Math.random().toString(),
        name: formName,
        description: formDesc,
        price: formPrice ? `$${formPrice}` : `$${formSizes[0]?.price || "0.00"}`,
        rating: 5.0,
        reviewsCount: 0,
        category: formCategory,
        inStock: true,
        image: formPhotos[0] || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=80",
        sizes: formSizes.filter((s) => s.size && s.price),
        isPopular: formPopular,
        isBestSeller: formBestSeller,
        isBestOffer: formBestOffer,
      };
      setMenu((prev) => [...prev, newItem]);
    } else if (currentView === "edit" && selectedItem) {
      setMenu((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                name: formName,
                description: formDesc,
                price: formPrice ? `$${formPrice}` : `$${formSizes[0]?.price || "0.00"}`,
                category: formCategory,
                sizes: formSizes.filter((s) => s.size && s.price),
                isPopular: formPopular,
                isBestSeller: formBestSeller,
                isBestOffer: formBestOffer,
              }
            : item
        )
      );
      // Sync selected
      setSelectedItem((prev) =>
        prev
          ? {
              ...prev,
              name: formName,
              description: formDesc,
              price: formPrice ? `$${formPrice}` : `$${formSizes[0]?.price || "0.00"}`,
              category: formCategory,
              sizes: formSizes.filter((s) => s.size && s.price),
              isPopular: formPopular,
              isBestSeller: formBestSeller,
              isBestOffer: formBestOffer,
            }
          : null
      );
    }
    setCurrentView("list");
  };

  const handleDeleteItem = (id: string) => {
    setMenu((prev) => prev.filter((item) => item.id !== id));
    setSelectedItem(null);
    setCurrentView("list");
  };

  const handleReviewReply = (reviewId: string) => {
    const text = replyTexts[reviewId];
    if (!text) return;

    setReviews((prev) =>
      prev.map((rev) =>
        rev.id === reviewId
          ? { ...rev, reply: text, showReplyInput: false }
          : rev
      )
    );
    setReplyTexts((prev) => ({ ...prev, [reviewId]: "" }));
  };

  const toggleReplyInput = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((rev) =>
        rev.id === reviewId ? { ...rev, showReplyInput: !rev.showReplyInput } : rev
      )
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {currentView === "list" && (
        // Main list screen (Mockup 1)
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row justify-between items-center px-6 py-4 bg-white border-b border-gray-100">
            <View className="flex-row items-center">
              <TouchableOpacity className="p-1 mr-3">
                <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
              </TouchableOpacity>
              <Text className="text-brand-dark text-base font-bold">Menu Management</Text>
            </View>
            <TouchableOpacity
              onPress={openAddView}
              className="bg-[#E4792F] w-9 h-9 rounded-full items-center justify-center shadow"
            >
              <Ionicons name="add" size={22} color="white" />
            </TouchableOpacity>
          </View>

          {/* Search bar */}
          <View className="px-6 pt-4">
            <View className="bg-white border border-gray-200 rounded-2xl px-4 py-3 flex-row items-center gap-2 shadow-sm">
              <Ionicons name="search-outline" size={18} color="#6A7282" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search menu items"
                placeholderTextColor="#A0AEC0"
                className="flex-1 text-brand-dark text-sm p-0"
              />
            </View>
          </View>

          {/* Category Tabs slider */}
          <View className="py-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6">
              {(["All", "Pizza", "Burger", "Pasta", "Salad", "Desert"] as const).map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setActiveCategory(cat)}
                    className={`mr-3 px-5 py-2 rounded-full border ${
                      isActive
                        ? "bg-[#E4792F] border-transparent"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <Text className={`text-xs font-bold ${isActive ? "text-white" : "text-brand-gray"}`}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              <View className="w-6" />
            </ScrollView>
          </View>

          {/* Menu Items List */}
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
            {/* Nav to reviews quick entry */}
            <TouchableOpacity
              onPress={() => setCurrentView("reviews")}
              className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex-row justify-between items-center mb-4"
            >
              <View className="flex-row items-center gap-2">
                <Ionicons name="star" size={18} color="#E4792F" />
                <Text className="text-brand-dark text-xs font-bold">
                  View Rating & Customer Reviews
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#E4792F" />
            </TouchableOpacity>

            <View className="gap-4 pb-16">
              {filteredMenu.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setSelectedItem(item);
                    setCurrentView("details");
                  }}
                  activeOpacity={0.95}
                  className={`bg-white border border-gray-100 rounded-2xl p-4 flex-row gap-4 shadow-sm ${
                    !item.inStock ? "opacity-60" : ""
                  }`}
                >
                  <Image source={{ uri: item.image }} className="w-20 h-20 rounded-2xl" />
                  <View className="flex-1 justify-between py-0.5">
                    <View>
                      <View className="flex-row justify-between items-start">
                        <Text className="text-brand-dark text-sm font-bold flex-1 mr-2 leading-5">
                          {item.name}
                        </Text>
                        <View className="flex-row items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded">
                          <Ionicons name="star" size={10} color="#FFB020" />
                          <Text className="text-[9px] font-bold text-[#FFB020]">{item.rating}</Text>
                        </View>
                      </View>
                      <Text className="text-brand-gray text-[10px] mt-0.5 font-medium">
                        Category : {item.category}
                      </Text>
                    </View>

                    <Text className="text-[#E4792F] text-base font-extrabold mt-1">
                      ${item.price}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {currentView === "details" && selectedItem && (
        // Item Details View (Mockup 2)
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
            <TouchableOpacity onPress={() => setCurrentView("list")} className="p-1">
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Item Details</Text>
            <View className="w-8" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            {/* Hero Image */}
            <Image source={{ uri: selectedItem.image }} className="w-full h-64" />

            <View className="p-6">
              {/* Details card */}
              <View className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mb-6">
                <View className="flex-row justify-between items-center mb-3">
                  <View>
                    <Text className="text-brand-dark text-lg font-bold">{selectedItem.name}</Text>
                    <View className="flex-row items-center gap-1.5 mt-1">
                      <Ionicons name="star" size={14} color="#FFB020" />
                      <Text className="text-xs font-bold text-[#FFB020]">{selectedItem.rating}</Text>
                      <Text className="text-brand-gray text-xs">({selectedItem.reviewsCount} Reviews)</Text>
                    </View>
                  </View>

                  {/* Available Switch */}
                  <View className="items-end">
                    <Text className="text-brand-gray text-[10px] font-bold mb-1">
                      {selectedItem.inStock ? "Available" : "Unavailable"}
                    </Text>
                    <Switch
                      value={selectedItem.inStock}
                      onValueChange={() => toggleStock(selectedItem.id)}
                      trackColor={{ false: "#E2E8F0", true: "#FED7AA" }}
                      thumbColor={selectedItem.inStock ? "#E4792F" : "#A0AEC0"}
                    />
                  </View>
                </View>

                <Text className="text-[#E4792F] text-2xl font-extrabold mb-4">${selectedItem.price}</Text>

                <View className="border-t border-gray-50 pt-4 mb-4">
                  <Text className="text-brand-dark text-sm font-bold mb-1">Description</Text>
                  <Text className="text-brand-gray text-xs leading-5">{selectedItem.description}</Text>
                </View>

                {/* Sizing list */}
                <View className="border-t border-gray-50 pt-4 mb-4">
                  <Text className="text-brand-dark text-sm font-bold mb-2">Size Required</Text>
                  {selectedItem.sizes.map((s, index) => (
                    <View key={index} className="flex-row justify-between py-2 border-b border-gray-50 last:border-b-0">
                      <Text className="text-brand-gray text-xs font-medium">{s.size}</Text>
                      <Text className="text-brand-dark text-xs font-bold">${s.price}</Text>
                    </View>
                  ))}
                </View>

                <View className="border-t border-gray-50 pt-4 flex-row justify-between">
                  <Text className="text-brand-gray text-xs font-medium">Category</Text>
                  <Text className="text-brand-dark text-xs font-bold">{selectedItem.category}</Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View className="gap-3 pb-12">
                <TouchableOpacity
                  onPress={() => openEditView(selectedItem)}
                  className="w-full py-4 bg-[#E4792F] rounded-2xl items-center justify-center shadow"
                >
                  <Text className="text-white text-sm font-bold">Edit Item</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleDeleteItem(selectedItem.id)}
                  className="w-full py-4 bg-white border border-red-200 rounded-2xl items-center justify-center"
                >
                  <Text className="text-red-500 text-sm font-bold">Delete Item</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      {(currentView === "add" || currentView === "edit") && (
        // Add / Edit Forms (Mockup 3 & 4)
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
            <TouchableOpacity onPress={() => setCurrentView(selectedItem ? "details" : "list")} className="p-1">
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">
              {currentView === "add" ? "Add New Item" : "Edit Item"}
            </Text>
            <View className="w-8" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Image upload preview layout */}
            <View className="mb-5">
              <Text className="text-xs font-bold text-brand-dark mb-2">Upload Photos</Text>
              <View className="flex-row flex-wrap gap-3">
                {/* Photo Upload Card */}
                <TouchableOpacity className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 items-center justify-center bg-gray-50">
                  <Ionicons name="cloud-upload-outline" size={24} color="#6A7282" />
                  <Text className="text-[9px] text-brand-gray mt-1 text-center font-medium">
                    Upload Photo
                  </Text>
                </TouchableOpacity>

                {formPhotos.map((photo, index) => (
                  <View key={index} className="w-24 h-24 rounded-2xl relative">
                    <Image source={{ uri: photo }} className="w-full h-full rounded-2xl" />
                    <TouchableOpacity
                      onPress={() => setFormPhotos((prev) => prev.filter((_, idx) => idx !== index))}
                      className="absolute top-1 right-1 w-5 h-5 bg-[#E4792F] rounded-full items-center justify-center"
                    >
                      <Ionicons name="close" size={12} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>

            {/* Form Fields */}
            <View className="gap-4">
              <View>
                <Text className="text-xs font-bold text-brand-dark mb-1.5">Item name</Text>
                <TextInput
                  value={formName}
                  onChangeText={setFormName}
                  placeholder="Enter item name"
                  placeholderTextColor="#A0AEC0"
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                />
              </View>

              <View>
                <Text className="text-xs font-bold text-brand-dark mb-1.5">Categories</Text>
                <View className="flex-row flex-wrap gap-2">
                  {(["Pizza", "Burger", "Pasta", "Salad", "Desert"] as const).map((cat) => {
                    const isSelected = formCategory === cat;
                    return (
                      <TouchableOpacity
                        key={cat}
                        onPress={() => setFormCategory(cat)}
                        className={`px-4 py-2 rounded-xl border ${
                          isSelected
                            ? "bg-brand-orange/10 border-brand-orange"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        <Text className={`text-xs font-semibold ${isSelected ? "text-brand-orange" : "text-brand-gray"}`}>
                          {cat}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View>
                <Text className="text-xs font-bold text-brand-dark mb-1.5">Description</Text>
                <TextInput
                  value={formDesc}
                  onChangeText={setFormDesc}
                  placeholder="Write here..."
                  placeholderTextColor="#A0AEC0"
                  multiline
                  numberOfLines={4}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3 text-brand-dark text-sm min-h-[100px]"
                />
              </View>

              {/* Sizing collapsible accordion section */}
              <View className="border border-gray-100 rounded-2xl p-4 bg-gray-50/30">
                <View className="flex-row justify-between items-center mb-3">
                  <Text className="text-sm font-bold text-brand-dark">Size & Pricing</Text>
                  <TouchableOpacity onPress={handleAddSizeRow} className="flex-row items-center gap-1">
                    <Ionicons name="add-circle" size={18} color="#E4792F" />
                    <Text className="text-xs font-bold text-[#E4792F]">Add Size</Text>
                  </TouchableOpacity>
                </View>

                <View className="gap-3">
                  {formSizes.map((row, index) => (
                    <View key={index} className="flex-row gap-2 items-center">
                      <TextInput
                        value={row.size}
                        onChangeText={(t) => handleSizeChange(index, "size", t)}
                        placeholder="Size (e.g. Small)"
                        placeholderTextColor="#A0AEC0"
                        className="flex-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-brand-dark text-xs"
                      />
                      <TextInput
                        value={row.price}
                        onChangeText={(t) => handleSizeChange(index, "price", t)}
                        placeholder="Price"
                        placeholderTextColor="#A0AEC0"
                        keyboardType="decimal-pad"
                        className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-brand-dark text-xs"
                      />
                      <TextInput
                        value={row.offer}
                        onChangeText={(t) => handleSizeChange(index, "offer", t)}
                        placeholder="Offer"
                        placeholderTextColor="#A0AEC0"
                        keyboardType="decimal-pad"
                        className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-brand-dark text-xs"
                      />
                      {formSizes.length > 1 && (
                        <TouchableOpacity onPress={() => handleRemoveSizeRow(index)}>
                          <Ionicons name="trash-outline" size={16} color="red" />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </View>
              </View>

              {/* Additional Information Switches */}
              <View className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm mb-12">
                <Text className="text-sm font-bold text-brand-dark mb-3">Additional Information</Text>

                <View className="flex-row justify-between items-center py-2 border-b border-gray-50">
                  <Text className="text-xs font-semibold text-brand-dark">Popular Item</Text>
                  <Switch value={formPopular} onValueChange={setFormPopular} />
                </View>

                <View className="flex-row justify-between items-center py-2 border-b border-gray-50">
                  <Text className="text-xs font-semibold text-brand-dark">Best Seller</Text>
                  <Switch value={formBestSeller} onValueChange={setFormBestSeller} />
                </View>

                <View className="flex-row justify-between items-center py-2">
                  <Text className="text-xs font-semibold text-brand-dark">Best Offer</Text>
                  <Switch value={formBestOffer} onValueChange={setFormBestOffer} />
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Form action button */}
          <View className="p-6 border-t border-gray-100 bg-white">
            <TouchableOpacity
              onPress={handleSaveItem}
              className="w-full py-4 bg-[#E4792F] rounded-2xl items-center justify-center shadow"
            >
              <Text className="text-white text-sm font-bold">
                {currentView === "add" ? "Add Item" : "Save Changes"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {currentView === "reviews" && (
        // Ratings & Reviews View (Mockup 5)
        <View className="flex-1 bg-brand-bg">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
            <TouchableOpacity onPress={() => setCurrentView("list")} className="p-1">
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Rating & Review</Text>
            <View className="w-8" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Rating Stats Card */}
            <View className="bg-white rounded-2xl border border-gray-100 p-5 flex-row items-center gap-5 shadow-sm mb-6">
              <View className="items-center">
                <Text className="text-brand-dark text-3xl font-black">4.3</Text>
                <View className="flex-row items-center gap-0.5 my-1">
                  {[1, 2, 3, 4].map((i) => (
                    <Ionicons key={i} name="star" size={12} color="#FFB020" />
                  ))}
                  <Ionicons name="star-half" size={12} color="#FFB020" />
                </View>
                <Text className="text-brand-gray text-[10px]">24 Ratings</Text>
              </View>

              {/* Progress bars */}
              <View className="flex-1 gap-1">
                {[
                  { star: 5, val: 12 },
                  { star: 4, val: 6 },
                  { star: 3, val: 4 },
                  { star: 2, val: 1 },
                  { star: 1, val: 1 },
                ].map((row) => (
                  <View key={row.star} className="flex-row items-center gap-2">
                    <Text className="text-brand-gray text-[10px] w-2 font-bold">{row.star}</Text>
                    <View className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <View
                        style={{ width: `${(row.val / 24) * 100}%` }}
                        className="h-full bg-[#E4792F] rounded-full"
                      />
                    </View>
                    <Text className="text-brand-gray text-[10px] w-4 text-right font-medium">
                      {row.val}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Review List */}
            <View className="gap-4 pb-12">
              {reviews.map((rev) => (
                <View key={rev.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                  {/* Header */}
                  <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center gap-3">
                      <Image source={{ uri: rev.avatar }} className="w-10 h-10 rounded-full" />
                      <View>
                        <Text className="text-brand-dark text-sm font-bold">{rev.customerName}</Text>
                        <View className="flex-row gap-0.5 mt-0.5">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Ionicons key={i} name="star" size={10} color="#FFB020" />
                          ))}
                        </View>
                      </View>
                    </View>
                    <Text className="text-brand-gray text-[10px]">{rev.time}</Text>
                  </View>

                  <Text className="text-brand-gray text-xs leading-5 mb-3">{rev.content}</Text>

                  {/* Owner Reply if it exists */}
                  {rev.reply && (
                    <View className="bg-gray-50 border border-gray-100 rounded-xl p-3 mb-3">
                      <Text className="text-brand-dark text-xs font-bold mb-1">Sakura Garden Reply:</Text>
                      <Text className="text-brand-gray text-xs leading-4">{rev.reply}</Text>
                    </View>
                  )}

                  {/* Reply Button / Actions */}
                  <View className="flex-row gap-4 items-center">
                    <TouchableOpacity onPress={() => toggleReplyInput(rev.id)}>
                      <Text className="text-[#E4792F] text-xs font-bold">
                        {rev.reply ? "Edit Reply" : "Reply"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Reply Input Form */}
                  {rev.showReplyInput && (
                    <View className="mt-3 gap-2">
                      <TextInput
                        value={replyTexts[rev.id] || ""}
                        onChangeText={(t) => setReplyTexts((prev) => ({ ...prev, [rev.id]: t }))}
                        placeholder="Write your reply..."
                        placeholderTextColor="#A0AEC0"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-brand-dark text-xs min-h-[50px]"
                        multiline
                      />
                      <TouchableOpacity
                        onPress={() => handleReviewReply(rev.id)}
                        className="bg-[#E4792F] px-4 py-2 rounded-lg self-end"
                      >
                        <Text className="text-white text-xs font-bold">Send Reply</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

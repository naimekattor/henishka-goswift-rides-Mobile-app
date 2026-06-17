import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Switch,
  Modal,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
  isAvailable: boolean;
  stock?: number;
  category?: string;
}

export default function ProductManagement() {
  const router = useRouter();
  
  // Views: "main" (which contains Product List or Current Orders tabs), "add-step-1", "add-step-2", "details"
  const [activeView, setActiveView] = useState<"main" | "add-step-1" | "add-step-2" | "details">("main");
  
  // Sub-tabs in "main" view: "list" | "orders"
  const [activeTab, setActiveTab] = useState<"list" | "orders">("list");

  // Selected product for Details view
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter Modal
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterTags, setFilterTags] = useState<string[]>(["Sneakers", "Watch"]);

  // Mock Products list matching screenshots
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Sneaker", price: 89, image: require("@/assets/images/onboarding/2.png"), isAvailable: true, stock: 100, category: "Sneakers" },
    { id: "2", name: "Sneaker", price: 89, image: require("@/assets/images/onboarding/2.png"), isAvailable: false, stock: 100, category: "Sneakers" },
    { id: "3", name: "Sneaker", price: 89, image: require("@/assets/images/onboarding/2.png"), isAvailable: true, stock: 100, category: "Sneakers" },
    { id: "4", name: "Sneaker", price: 89, image: require("@/assets/images/onboarding/2.png"), isAvailable: false, stock: 100, category: "Sneakers" },
    { id: "5", name: "Sneaker", price: 89, image: require("@/assets/images/onboarding/2.png"), isAvailable: true, stock: 100, category: "Sneakers" },
    { id: "6", name: "Sneaker", price: 89, image: require("@/assets/images/onboarding/2.png"), isAvailable: false, stock: 100, category: "Sneakers" },
    { id: "7", name: "Sneaker", price: 89, image: require("@/assets/images/onboarding/2.png"), isAvailable: true, stock: 100, category: "Sneakers" },
    { id: "8", name: "Sneaker", price: 89, image: require("@/assets/images/onboarding/2.png"), isAvailable: true, stock: 100, category: "Sneakers" },
  ]);

  // Form State for Add Product
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [uploadedMainPhoto, setUploadedMainPhoto] = useState<string | null>(null);
  
  const [criteria1Active, setCriteria1Active] = useState(true);
  const [criteria1Colors, setCriteria1Colors] = useState("Black, Green, Blue");

  const [criteria2Active, setCriteria2Active] = useState(true);
  const [criteria2AttrName, setCriteria2AttrName] = useState("Size, Origin");
  const [criteria2Variations, setCriteria2Variations] = useState(["XL", "L", "XXL"]);

  // Step 2 Form States
  const [step2Stock, setStep2Stock] = useState("20");
  const [step2Color, setStep2Color] = useState("Black");
  const [step2DescSelect, setStep2DescSelect] = useState("Standard Product");
  const [step2TypeSelect, setStep2TypeSelect] = useState("Regular");
  const [uploadedMultiplePhotos, setUploadedMultiplePhotos] = useState<string[]>(["img1", "img2", "img3"]);
  const [returnTimeframe, setReturnTimeframe] = useState("7 Days");
  
  const [discountActive, setDiscountActive] = useState(true);
  const [discountPercent, setDiscountPercent] = useState("10%");
  const [discountStart, setDiscountStart] = useState("19/10/2026");
  const [discountEnd, setDiscountEnd] = useState("19/10/2026");

  const toggleAvailability = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isAvailable: !p.isAvailable } : p))
    );
  };

  const handleSimulatePhotoUpload = () => {
    setUploadedMainPhoto("simulated_uploaded_image.png");
  };

  const handleRemoveMainPhoto = () => {
    setUploadedMainPhoto(null);
  };

  const handleSaveProduct = () => {
    if (!formName || !formPrice) {
      Alert.alert("Missing Info", "Please fill in product name and price.");
      return;
    }

    const newProd: Product = {
      id: (products.length + 1).toString(),
      name: formName,
      price: parseFloat(formPrice),
      image: require("@/assets/images/onboarding/2.png"),
      isAvailable: true,
      stock: parseInt(step2Stock) || 20,
      category: formCategory || "General",
    };

    setProducts([newProd, ...products]);
    setActiveView("main");
    Alert.alert("Success", "Product successfully added!");
    
    // Clear form
    setFormName("");
    setFormPrice("");
    setFormDescription("");
    setFormCategory("");
    setUploadedMainPhoto(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* -------------------- MAIN PRODUCT LISTING & CURRENT ORDERS -------------------- */}
      {activeView === "main" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity
              onPress={() => router.replace("/(retailer)/dashboard" as any)}
              className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center bg-white shadow-sm"
            >
              <Ionicons name="chevron-back" size={20} color="#6A7282" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Product Management</Text>
            <View className="w-10" />
          </View>

          {/* Sub-tabs & Add Product Trigger */}
          <View className="flex-row px-6 py-3 bg-white border-b border-slate-100 items-center justify-between">
            <View className="flex-row gap-5">
              <TouchableOpacity
                onPress={() => setActiveTab("list")}
                className="pb-2 relative"
              >
                <Text
                  className={`text-xs font-bold ${
                    activeTab === "list" ? "text-brand-orange" : "text-brand-gray"
                  }`}
                >
                  Product List
                </Text>
                {activeTab === "list" && (
                  <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange rounded-full" />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveTab("orders")}
                className="pb-2 relative"
              >
                <Text
                  className={`text-xs font-bold ${
                    activeTab === "orders" ? "text-brand-orange" : "text-brand-gray"
                  }`}
                >
                  Current Orders
                </Text>
                {activeTab === "orders" && (
                  <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange rounded-full" />
                )}
              </TouchableOpacity>
            </View>

            {/* Float + Add Product link/button */}
            {activeTab === "list" && (
              <TouchableOpacity
                onPress={() => setActiveView("add-step-1")}
                className="flex-row items-center gap-1 bg-brand-orange/15 px-3 py-1.5 rounded-full"
              >
                <Ionicons name="add-circle" size={14} color="#E4792F" />
                <Text className="text-brand-orange text-[10px] font-bold">Add Product</Text>
              </TouchableOpacity>
            )}

            {/* Filter button under Current Orders */}
            {activeTab === "orders" && (
              <TouchableOpacity
                onPress={() => setShowFilterModal(true)}
                className="flex-row items-center gap-1 border border-brand-orange/20 bg-orange-50/50 px-3 py-1.5 rounded-full"
              >
                <Ionicons name="filter" size={12} color="#E4792F" />
                <Text className="text-brand-orange text-[10px] font-bold">Filters &gt;</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* TAB 1: Product List view */}
          {activeTab === "list" && (
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
              <View className="flex-row flex-wrap justify-between gap-y-4 mb-12">
                {products.map((product) => (
                  <View
                    key={product.id}
                    className="w-[48%] bg-white p-3.5 rounded-3xl border border-slate-100 shadow-sm"
                  >
                    {/* Image */}
                    <View className="w-full h-32 bg-slate-50 border border-slate-100 overflow-hidden items-center justify-center p-2 rounded-2xl relative mb-3">
                      <Image source={product.image} className="w-full h-full" resizeMode="contain" />
                    </View>
                    {/* Description details */}
                    <Text className="text-brand-dark text-xs font-bold">{product.name}</Text>
                    <Text className="text-brand-gray text-[10px] font-semibold mt-1">
                      {product.isAvailable ? "Available" : "Unavailable"}
                    </Text>
                    
                    {/* Toggle and Price */}
                    <View className="flex-row items-center justify-between mt-3 pt-2 border-t border-slate-50">
                      <Text className="text-brand-orange text-xs font-extrabold">${product.price}</Text>
                      <Switch
                        value={product.isAvailable}
                        onValueChange={() => toggleAvailability(product.id)}
                        trackColor={{ false: "#E2E8F0", true: "#fed7aa" }}
                        thumbColor={product.isAvailable ? "#E4792F" : "#A0AEC0"}
                        style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          )}

          {/* TAB 2: Current Orders view */}
          {activeTab === "orders" && (
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
              {/* If no tags matching filters, show empty state else list */}
              {filterTags.length === 0 ? (
                <View className="items-center justify-center py-32">
                  <Text className="text-brand-dark text-base font-bold">No products filtered</Text>
                </View>
              ) : (
                <View className="flex-row flex-wrap justify-between gap-y-4 mb-12">
                  {products.map((product) => (
                    <TouchableOpacity
                      key={product.id}
                      onPress={() => {
                        setSelectedProduct(product);
                        setActiveView("details");
                      }}
                      activeOpacity={0.9}
                      className="w-[48%] bg-white p-3.5 rounded-3xl border border-slate-100 shadow-sm"
                    >
                      <View className="w-full h-32 bg-slate-50 border border-slate-100 overflow-hidden items-center justify-center p-2 rounded-2xl mb-3">
                        <Image source={product.image} className="w-full h-full" resizeMode="contain" />
                      </View>
                      <Text className="text-brand-dark text-xs font-bold">
                        {product.name} ({product.stock})
                      </Text>
                      <Text className="text-brand-orange text-xs font-extrabold mt-2">${product.price}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </ScrollView>
          )}
        </View>
      )}

      {/* -------------------- ADD PRODUCT STEP 1 -------------------- */}
      {activeView === "add-step-1" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveView("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Add Product</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="gap-5 mb-12">
              <View className="gap-1.5">
                <Text className="text-xs font-bold text-brand-dark">Product Name</Text>
                <TextInput
                  value={formName}
                  onChangeText={setFormName}
                  placeholder="Enter product name"
                  placeholderTextColor="#A0AEC0"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-xs font-bold text-brand-dark">Product Price</Text>
                <TextInput
                  value={formPrice}
                  onChangeText={setFormPrice}
                  placeholder="Enter price"
                  placeholderTextColor="#A0AEC0"
                  keyboardType="numeric"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-xs font-bold text-brand-dark">Product Description</Text>
                <TextInput
                  value={formDescription}
                  onChangeText={setFormDescription}
                  placeholder="Enter description"
                  placeholderTextColor="#A0AEC0"
                  multiline
                  numberOfLines={3}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm min-h-[80px] text-left"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-xs font-bold text-brand-dark">Product Categories</Text>
                <TextInput
                  value={formCategory}
                  onChangeText={setFormCategory}
                  placeholder="Enter category (e.g. Sneakers)"
                  placeholderTextColor="#A0AEC0"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                />
              </View>

              {/* Product Thumbnail Picture Upload Box */}
              <View className="gap-1.5">
                <Text className="text-xs font-bold text-brand-dark">Product Thumbnail Picture</Text>
                <Text className="text-brand-gray text-[10px] mb-2 leading-4">
                  Upload a main image for your service (recommended: 400x400px)
                </Text>

                {uploadedMainPhoto ? (
                  <View className="w-full h-40 rounded-2xl bg-white border border-slate-200 items-center justify-center p-2 relative">
                    <Image
                      source={require("@/assets/images/onboarding/2.png")}
                      className="w-full h-full"
                      resizeMode="contain"
                    />
                    <TouchableOpacity
                      onPress={handleRemoveMainPhoto}
                      className="absolute top-2.5 right-2.5 bg-red-500 w-8 h-8 rounded-full items-center justify-center shadow"
                    >
                      <Ionicons name="close" size={18} color="white" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={handleSimulatePhotoUpload}
                    className="w-full h-40 border-2 border-dashed border-slate-300 rounded-2xl bg-white items-center justify-center"
                  >
                    <Ionicons name="cloud-upload-outline" size={32} color="#A0AEC0" />
                    <Text className="text-brand-dark text-xs font-bold mt-2">Upload Item Photo</Text>
                    <Text className="text-brand-gray text-[9px] mt-1">JPG, PNG up to 5MB</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Criteria 01 Card */}
              <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mt-2">
                <View className="flex-row items-center justify-between border-b border-slate-50 pb-3 mb-4">
                  <Text className="text-brand-dark text-sm font-bold">Criteria 01</Text>
                  <Switch
                    value={criteria1Active}
                    onValueChange={setCriteria1Active}
                    trackColor={{ false: "#E2E8F0", true: "#fed7aa" }}
                    thumbColor={criteria1Active ? "#E4792F" : "#A0AEC0"}
                  />
                </View>
                {criteria1Active && (
                  <View className="gap-1.5">
                    <Text className="text-[10px] font-bold text-brand-dark">Type all the colors</Text>
                    <TextInput
                      value={criteria1Colors}
                      onChangeText={setCriteria1Colors}
                      placeholder="e.g. Black, Green, Blue"
                      placeholderTextColor="#A0AEC0"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-brand-dark text-xs"
                    />
                  </View>
                )}
              </View>

              {/* Criteria 02 Card */}
              <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                <View className="flex-row items-center justify-between border-b border-slate-50 pb-3 mb-4">
                  <Text className="text-brand-dark text-sm font-bold">Criteria 02</Text>
                  <Switch
                    value={criteria2Active}
                    onValueChange={setCriteria2Active}
                    trackColor={{ false: "#E2E8F0", true: "#fed7aa" }}
                    thumbColor={criteria2Active ? "#E4792F" : "#A0AEC0"}
                  />
                </View>
                {criteria2Active && (
                  <View className="gap-4">
                    <View className="gap-1.5">
                      <Text className="text-[10px] font-bold text-brand-dark">Categories Attribute Name</Text>
                      <TextInput
                        value={criteria2AttrName}
                        onChangeText={setCriteria2AttrName}
                        placeholder="e.g. Size, Origin"
                        placeholderTextColor="#A0AEC0"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-brand-dark text-xs"
                      />
                    </View>

                    <View className="gap-1.5">
                      <Text className="text-[10px] font-bold text-brand-dark">Variations in Attribute</Text>
                      <View className="flex-row flex-wrap gap-2 mb-1">
                        {criteria2Variations.map((v, i) => (
                          <View key={i} className="flex-row items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
                            <Text className="text-brand-dark text-[10px] font-bold">{v}</Text>
                            <TouchableOpacity
                              onPress={() => setCriteria2Variations(criteria2Variations.filter((x) => x !== v))}
                            >
                              <Ionicons name="close-circle" size={12} color="#6A7282" />
                            </TouchableOpacity>
                          </View>
                        ))}
                      </View>
                      <TextInput
                        placeholder="Add variations (press Enter / separate by comma)"
                        onSubmitEditing={(e) => {
                          const text = e.nativeEvent.text.trim();
                          if (text && !criteria2Variations.includes(text)) {
                            setCriteria2Variations([...criteria2Variations, text]);
                          }
                        }}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-brand-dark text-xs"
                      />
                    </View>
                  </View>
                )}
              </View>

              {/* Continue button */}
              <TouchableOpacity
                onPress={() => setActiveView("add-step-2")}
                className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mt-4"
              >
                <Text className="text-white text-base font-bold">Continue</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- ADD PRODUCT STEP 2 (OPTIONS & PRICING) -------------------- */}
      {activeView === "add-step-2" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveView("add-step-1")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Add Product</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="gap-5 mb-12">
              {/* Option 01 Card Detail Layout */}
              <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative">
                <TouchableOpacity className="absolute top-4 right-4 bg-red-50 p-1.5 rounded-lg">
                  <Ionicons name="trash-outline" size={16} color="#EF4444" />
                </TouchableOpacity>

                <Text className="text-brand-dark text-sm font-bold mb-4">Option 01</Text>

                <View className="gap-4">
                  <View className="gap-1.5">
                    <Text className="text-[10px] font-bold text-brand-dark">Total Amount product</Text>
                    <TextInput
                      value={step2Stock}
                      onChangeText={setStep2Stock}
                      keyboardType="numeric"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-brand-dark text-xs"
                    />
                  </View>

                  <View className="gap-1.5">
                    <Text className="text-[10px] font-bold text-brand-dark">Select Color</Text>
                    <TextInput
                      value={step2Color}
                      onChangeText={setStep2Color}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-brand-dark text-xs"
                    />
                  </View>

                  <View className="gap-1.5">
                    <Text className="text-[10px] font-bold text-brand-dark">Product Description</Text>
                    <TextInput
                      value={step2DescSelect}
                      onChangeText={setStep2DescSelect}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-brand-dark text-xs"
                    />
                  </View>

                  <View className="gap-1.5">
                    <Text className="text-[10px] font-bold text-brand-dark">Select Type</Text>
                    <TextInput
                      value={step2TypeSelect}
                      onChangeText={setStep2TypeSelect}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-brand-dark text-xs"
                    />
                  </View>

                  {/* Multi-image preview selector */}
                  <View className="gap-1.5">
                    <Text className="text-[10px] font-bold text-brand-dark">Upload Image</Text>
                    <View className="flex-row gap-3 mt-1 items-center">
                      <TouchableOpacity className="w-14 h-14 bg-slate-100 rounded-xl border border-slate-200 items-center justify-center">
                        <Ionicons name="camera" size={18} color="#6A7282" />
                        <Text className="text-[7px] text-brand-gray mt-1">Choose file</Text>
                      </TouchableOpacity>

                      {/* Mini Preview cards matching mockup */}
                      {uploadedMultiplePhotos.map((item, idx) => (
                        <View key={idx} className="w-14 h-14 bg-[#F2F7FA] rounded-xl border border-slate-200 relative items-center justify-center p-1">
                          <Ionicons name="image" size={20} color="#E4792F" />
                          <TouchableOpacity
                            onPress={() => setUploadedMultiplePhotos(uploadedMultiplePhotos.filter((p) => p !== item))}
                            className="absolute -top-1.5 -right-1.5 bg-red-500 w-4 h-4 rounded-full items-center justify-center"
                          >
                            <Ionicons name="close" size={10} color="white" />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </View>

              {/* Product is returnable within selector */}
              <View className="gap-1.5">
                <Text className="text-xs font-bold text-brand-dark">Product is returnable within</Text>
                <TextInput
                  value={returnTimeframe}
                  onChangeText={setReturnTimeframe}
                  placeholder="Select return time"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                />
              </View>

              {/* Available for discount toggle card */}
              <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mt-2">
                <View className="flex-row items-center justify-between border-b border-slate-50 pb-3 mb-4">
                  <View className="flex-row items-center gap-1.5">
                    <Ionicons name="pricetag-outline" size={16} color="#E4792F" />
                    <Text className="text-brand-dark text-sm font-bold">Available for discount</Text>
                  </View>
                  <Switch
                    value={discountActive}
                    onValueChange={setDiscountActive}
                    trackColor={{ false: "#E2E8F0", true: "#fed7aa" }}
                    thumbColor={discountActive ? "#E4792F" : "#A0AEC0"}
                  />
                </View>

                {discountActive && (
                  <View className="gap-4">
                    <View className="gap-1.5">
                      <Text className="text-[10px] font-bold text-brand-dark">Discount Percentage</Text>
                      <TextInput
                        value={discountPercent}
                        onChangeText={setDiscountPercent}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-brand-dark text-xs"
                      />
                      <Text className="text-brand-gray text-[9px] leading-3 mt-1">
                        Discount Price and actual price will be shown
                      </Text>
                    </View>

                    <View className="flex-row gap-4">
                      <View className="flex-1 gap-1.5">
                        <Text className="text-[10px] font-bold text-brand-dark">Start Date</Text>
                        <TextInput
                          value={discountStart}
                          onChangeText={setFormPrice}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-brand-dark text-xs"
                        />
                      </View>
                      <View className="flex-1 gap-1.5">
                        <Text className="text-[10px] font-bold text-brand-dark">End Date</Text>
                        <TextInput
                          value={discountEnd}
                          onChangeText={setDiscountEnd}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-brand-dark text-xs"
                        />
                      </View>
                    </View>
                  </View>
                )}
              </View>

              {/* Action Save Button */}
              <TouchableOpacity
                onPress={handleSaveProduct}
                className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mt-4 shadow"
              >
                <Text className="text-white text-base font-bold">Continue</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- PRODUCT DETAILS OVERLAY VIEW -------------------- */}
      {activeView === "details" && selectedProduct && (
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveView("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Product Details</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pb-10">
            {/* Image Slider Mock Card with indicators */}
            <View className="w-full items-center justify-center bg-slate-50 py-10 relative">
              <Image source={selectedProduct.image} className="w-64 h-64" resizeMode="contain" />
              {/* Slider Dots */}
              <View className="flex-row gap-1.5 justify-center items-center mt-5">
                <View className="w-4 h-1.5 rounded-full bg-brand-orange" />
                <View className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <View className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              </View>
            </View>

            {/* Content Details */}
            <View className="p-6">
              {/* Product title timeline */}
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-brand-dark text-sm font-bold flex-1 mr-2">
                  Time : (20/12/25 - 12/08/25)
                </Text>
                <Text className="text-brand-orange text-xs font-bold bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                  In Stock: {selectedProduct.stock}
                </Text>
              </View>

              {/* Color badges row */}
              <View className="mb-4">
                <Text className="text-[10px] font-bold text-brand-dark mb-2">Color</Text>
                <View className="flex-row gap-3">
                  {["#F87171", "#9CA3AF", "#FDE68A", "#60A5FA"].map((c, i) => (
                    <View
                      key={i}
                      style={{ backgroundColor: c }}
                      className={`w-6 h-6 rounded-full border ${
                        i === 0 ? "border-brand-orange scale-110" : "border-transparent"
                      }`}
                    />
                  ))}
                </View>
              </View>

              {/* Review section */}
              <View className="flex-row items-center gap-1.5 mb-4">
                <Ionicons name="star" size={16} color="#E4792F" />
                <Text className="text-brand-dark text-xs font-bold">
                  Rating <Text className="text-brand-gray font-medium">4.5 (250 Review)</Text>
                </Text>
              </View>

              {/* Sizes section */}
              <View className="mb-6">
                <Text className="text-[10px] font-bold text-brand-dark mb-2">Size</Text>
                <View className="flex-row gap-3">
                  {["S", "M", "L", "XL"].map((s) => (
                    <View
                      key={s}
                      className={`w-10 h-8 rounded-lg items-center justify-center border ${
                        s === "M" ? "border-brand-orange bg-orange-50/50" : "border-slate-200"
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          s === "M" ? "text-brand-orange" : "text-brand-dark"
                        }`}
                      >
                        {s}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Product Quantity indicator */}
              <View className="bg-slate-50 border border-slate-100 p-4 rounded-2xl mb-6">
                <Text className="text-brand-dark text-xs font-bold">
                  Product Required : <Text className="text-brand-orange font-extrabold">20</Text>
                </Text>
              </View>

              {/* Order Notes Section */}
              <View className="border-t border-slate-100 pt-6">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-brand-dark text-sm font-bold">Note</Text>
                  <TouchableOpacity>
                    <Text className="text-brand-orange text-xs font-bold">View All</Text>
                  </TouchableOpacity>
                </View>

                {/* Simulated Order List Notes */}
                <View className="gap-4">
                  {[1, 2, 3].map((item) => (
                    <View key={item} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <Text className="text-brand-dark text-xs font-bold">Order#14641</Text>
                      <Text className="text-brand-gray text-[10px] leading-4 mt-1">
                        Our compact and foldable Bluetooth earbuds are renowned for their lightweight build, offering a convenient and portable solution for audiophiles on the go.
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- SLIDE-UP FILTERS MODAL -------------------- */}
      {showFilterModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showFilterModal}
          onRequestClose={() => setShowFilterModal(false)}
        >
          <View className="flex-1 bg-brand-dark/40 justify-end">
            <View className="bg-white rounded-t-3xl p-6 shadow-xl w-full">
              {/* Header */}
              <View className="flex-row items-center justify-between border-b border-slate-50 pb-3 mb-5">
                <Text className="text-brand-dark text-base font-bold">Filter by</Text>
                <TouchableOpacity onPress={() => setShowFilterModal(false)} className="p-1 rounded-full bg-slate-50">
                  <Ionicons name="close" size={20} color="#6A7282" />
                </TouchableOpacity>
              </View>

              {/* Filter inputs */}
              <View className="gap-4 mb-8">
                <View className="gap-1.5">
                  <Text className="text-xs font-semibold text-brand-dark">Date or date range</Text>
                  <View className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 flex-row justify-between items-center">
                    <Text className="text-brand-gray text-xs">Select a date</Text>
                    <Ionicons name="calendar-outline" size={16} color="#6A7282" />
                  </View>
                </View>

                <View className="gap-1.5">
                  <Text className="text-xs font-semibold text-brand-dark">Product name</Text>
                  <View className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 flex-row justify-between items-center">
                    <Text className="text-brand-gray text-xs">Select</Text>
                    <Ionicons name="chevron-down" size={16} color="#6A7282" />
                  </View>
                </View>

                {/* Filter pills */}
                <View className="flex-row gap-2 mt-2">
                  {filterTags.map((tag) => (
                    <View key={tag} className="flex-row items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                      <Text className="text-brand-dark text-[10px] font-bold">{tag}</Text>
                      <TouchableOpacity onPress={() => setFilterTags(filterTags.filter((t) => t !== tag))}>
                        <Ionicons name="close-circle" size={12} color="#6A7282" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>

              {/* Done button */}
              <TouchableOpacity
                onPress={() => setShowFilterModal(false)}
                className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center"
              >
                <Text className="text-white text-base font-bold">Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Switch,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Interfaces
interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  reply?: string;
  isReplying?: boolean;
}

interface ProductItem {
  id: string;
  name: string;
  price: number;
  image: any;
  rating: number;
}

export default function RetailerProfile() {
  const router = useRouter();

  // Screens: "main", "shop-details", "shop-wizard-1", "shop-wizard-2", "shop-wizard-3", "reviews", "security", "change-password", "terms", "help"
  const [activeScreen, setActiveScreen] = useState<
    | "main"
    | "shop-details"
    | "shop-wizard-1"
    | "shop-wizard-2"
    | "shop-wizard-3"
    | "reviews"
    | "security"
    | "change-password"
    | "terms"
    | "help"
  >("main");

  // State Management
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  // Shop Details Data (Dynamic)
  const [shopName, setShopName] = useState("Biffco Enterprises");
  const [shopAddress, setShopAddress] = useState("kazi Deiry, Taiger Pass, Chittagong");
  const [shopPhone, setShopPhone] = useState("+880 171 234 5678");
  const [shopEmail, setShopEmail] = useState("biffco@goswift.com");
  const [shopAbout, setShopAbout] = useState(
    "Biffco Enterprises offers whimsical fusion comfort food, like Cloud Burgers and Electric Soup. With a rotating mystery menu, flying nachos, and glowing decor, it's a fun, interactive dining experience where food surprises and delights in every bite."
  );
  const [shopHours, setShopHours] = useState("10:00 AM - 12:00 PM");

  // Temporary wizard state
  const [tempName, setTempName] = useState(shopName);
  const [tempPhone, setTempPhone] = useState(shopPhone);
  const [tempEmail, setTempEmail] = useState(shopEmail);
  const [tempAbout, setTempAbout] = useState(shopAbout);

  const [tempAddress, setTempAddress] = useState(shopAddress);
  const [tempRoad, setTempRoad] = useState("Taiger Pass");
  const [tempHouse, setTempHouse] = useState("12B");
  const [tempFloor, setTempFloor] = useState("3rd Floor");
  const [tempCity, setTempCity] = useState("Chittagong");
  const [tempDistrict, setTempDistrict] = useState("Chittagong");
  const [tempPostal, setTempPostal] = useState("4000");
  const [tempOpening, setTempOpening] = useState("10:00 AM");
  const [tempClosing, setTempClosing] = useState("12:00 PM");

  // Upload States
  const [wizardLogo, setWizardLogo] = useState<string | null>("uploaded_logo.png");
  const [wizardBanner, setWizardBanner] = useState<string | null>("uploaded_banner.png");
  const [tradeLicense, setTradeLicense] = useState<{ name: string; size: string } | null>({
    name: "trade_license_retailer.pdf",
    size: "1.4 MB",
  });
  const [uploadingLicense, setUploadingLicense] = useState(false);

  // Security Form States
  const [secPhone, setSecPhone] = useState("+8801712345678");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);

  // Mock Products list for shop details
  const [featuredProducts] = useState<ProductItem[]>([
    { id: "1", name: "Sneaker", price: 100, image: require("@/assets/images/onboarding/2.png"), rating: 4.5 },
    { id: "2", name: "Smart Watch", price: 100, image: require("@/assets/images/onboarding/2.png"), rating: 4.5 },
    { id: "3", name: "Headphone", price: 100, image: require("@/assets/images/onboarding/2.png"), rating: 4.5 },
    { id: "4", name: "Smart Watch", price: 100, image: require("@/assets/images/onboarding/2.png"), rating: 4.5 },
    { id: "5", name: "Headphone", price: 100, image: require("@/assets/images/onboarding/2.png"), rating: 4.5 },
    { id: "6", name: "Sneaker", price: 100, image: require("@/assets/images/onboarding/2.png"), rating: 4.5 },
  ]);

  // Mock Reviews matching Image 2 details
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      name: "Maria Rodriguez",
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely amazing experience! The Gallio Pinto was authentic and delicious. The atmosphere is cozy and the staff is incredibly friendly. The presentation was beautiful and every bite...",
    },
    {
      id: "2",
      name: "Esther Howard",
      rating: 4,
      date: "2 days ago",
      comment: "Absolutely amazing experience! The Gallio Pinto was authentic and delicious. The atmosphere is cozy and the staff is incredibly friendly. The presentation was beautiful and every bite...",
    },
    {
      id: "3",
      name: "Robert Fox",
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely amazing experience! The Gallio Pinto was authentic and delicious. The atmosphere is cozy and the staff is incredibly friendly. The presentation was beautiful and every bite...",
    },
    {
      id: "4",
      name: "Brooklyn Simmons",
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely amazing experience! The Gallio Pinto was authentic and delicious. The atmosphere is cozy and the staff is incredibly friendly. The presentation was beautiful and every bite...",
    },
  ]);

  const [replyText, setReplyText] = useState("");

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => {
          router.replace("/(auth)/login" as any);
        },
      },
    ]);
  };

  const handleStartWizard = () => {
    setTempName(shopName);
    setTempPhone(shopPhone);
    setTempEmail(shopEmail);
    setTempAbout(shopAbout);
    setActiveScreen("shop-wizard-1");
  };

  const handleWizardSubmit = () => {
    setShopName(tempName);
    setShopPhone(tempPhone);
    setShopEmail(tempEmail);
    setShopAbout(tempAbout);
    setShopAddress(tempAddress);
    setShopHours(`${tempOpening} - ${tempClosing}`);
    setActiveScreen("shop-details");
    Alert.alert("Success", "Shop Information updated successfully!");
  };

  const simulateDocUpload = () => {
    setUploadingLicense(true);
    setTimeout(() => {
      setTradeLicense({ name: "trade_license_final.pdf", size: "1.9 MB" });
      setUploadingLicense(false);
    }, 1200);
  };

  const handleSaveSecurity = () => {
    setShopPhone(secPhone);
    setActiveScreen("main");
    Alert.alert("Success", "Security settings saved.");
  };

  const handleSavePassword = () => {
    if (!oldPassword || !newPassword || !currentPassword) {
      Alert.alert("Error", "All password fields are required.");
      return;
    }
    setOldPassword("");
    setNewPassword("");
    setCurrentPassword("");
    setActiveScreen("security");
    Alert.alert("Success", "Password updated successfully!");
  };

  const handleToggleReply = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isReplying: !r.isReplying } : r))
    );
    setReplyText("");
  };

  const handleSubmitReply = (id: string) => {
    if (!replyText.trim()) return;
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, reply: replyText, isReplying: false } : r
      )
    );
    Alert.alert("Success", "Reply posted.");
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* -------------------- 1. PROFILE MAIN SCREEN -------------------- */}
      {activeScreen === "main" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => router.replace("/(retailer)/dashboard" as any)}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Profile</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Profile Card */}
            <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm items-center mb-6 relative">
              <View className="w-20 h-20 rounded-full overflow-hidden border border-slate-100 bg-[#FFF5F0] items-center justify-center mb-4 relative">
                <Ionicons name="basket" size={42} color="#E4792F" />
                <TouchableOpacity className="absolute bottom-0 right-0 bg-white border border-slate-100 w-6 h-6 rounded-full items-center justify-center shadow-sm">
                  <Ionicons name="create" size={12} color="#E4792F" />
                </TouchableOpacity>
              </View>
              <Text className="text-brand-dark text-base font-bold">{shopName}</Text>
              <Text className="text-brand-gray text-xs mt-1">Narayanganj, Sadar</Text>
            </View>

            {/* Menu options list */}
            <View className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm mb-6 gap-2">
              {/* Shop Profile */}
              <TouchableOpacity
                onPress={() => setActiveScreen("shop-details")}
                className="flex-row justify-between items-center py-3.5 border-b border-slate-50"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="storefront-outline" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Shop Profile</Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#A0AEC0" />
              </TouchableOpacity>

              {/* Security */}
              <TouchableOpacity
                onPress={() => setActiveScreen("security")}
                className="flex-row justify-between items-center py-3.5 border-b border-slate-50"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="lock-closed-outline" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Security</Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#A0AEC0" />
              </TouchableOpacity>

              {/* Notification Toggle */}
              <View className="flex-row justify-between items-center py-3 border-b border-slate-50">
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="notifications-outline" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Notification</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: "#E2E8F0", true: "#fed7aa" }}
                  thumbColor={notificationsEnabled ? "#E4792F" : "#A0AEC0"}
                />
              </View>

              {/* Help & Support */}
              <TouchableOpacity
                onPress={() => setActiveScreen("help")}
                className="flex-row justify-between items-center py-3.5 border-b border-slate-50"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="help-circle-outline" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Helpt & Support</Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#A0AEC0" />
              </TouchableOpacity>

              {/* Terms & Conditions */}
              <TouchableOpacity
                onPress={() => setActiveScreen("terms")}
                className="flex-row justify-between items-center py-3.5"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="document-text-outline" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Terms & Conditions</Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#A0AEC0" />
              </TouchableOpacity>
            </View>

            {/* Logout Outline button */}
            <TouchableOpacity
              onPress={handleLogout}
              className="border border-brand-orange rounded-3xl py-4 flex-row items-center justify-center gap-2 mb-12"
            >
              <Ionicons name="log-out-outline" size={18} color="#E4792F" />
              <Text className="text-brand-orange font-bold text-xs">Log Out</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 2. SHOP DETAILS SCREEN -------------------- */}
      {activeScreen === "shop-details" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Shop Details</Text>
            <TouchableOpacity
              onPress={handleStartWizard}
              className="flex-row items-center gap-0.5 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full"
            >
              <Ionicons name="create-outline" size={12} color="#E4792F" />
              <Text className="text-brand-dark text-[10px] font-bold">Edit</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Store title */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-1">
                <Text className="text-brand-dark text-lg font-bold">{shopName}</Text>
                <View className="flex-row items-center gap-1 mt-1">
                  <Ionicons name="location-sharp" size={14} color="#6A7282" />
                  <Text className="text-brand-gray text-xs font-semibold">{shopAddress}</Text>
                </View>
              </View>
              <View className="bg-orange-50 border border-brand-orange/20 px-3 py-1 rounded-full">
                <Text className="text-brand-orange text-[10px] font-bold">Shop</Text>
              </View>
            </View>

            {/* Banner picture */}
            <View className="w-full h-44 rounded-3xl overflow-hidden bg-slate-100 border border-slate-100 mb-5 relative justify-end">
              <View className="absolute inset-0 bg-slate-200" />
              <View className="absolute top-4 left-4 bg-brand-dark/50 px-3 py-1 rounded-full flex-row items-center gap-1">
                <View className="w-2 h-2 rounded-full bg-emerald-500" />
                <Text className="text-white text-[9px] font-bold">Active  {shopHours}</Text>
              </View>
            </View>

            {/* Description About */}
            <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-6">
              <Text className="text-brand-dark text-xs font-bold mb-2">About</Text>
              <Text className="text-brand-gray text-[11px] leading-5 font-semibold">
                {shopAbout}
              </Text>
              
              <TouchableOpacity
                onPress={() => setActiveScreen("reviews")}
                className="flex-row items-center gap-1.5 mt-5 border-t border-slate-50 pt-4"
              >
                <Ionicons name="star" size={16} color="#E4792F" />
                <Text className="text-brand-dark text-xs font-bold">
                  Rating <Text className="text-brand-gray font-medium">4.5 (250 Review)</Text>
                </Text>
              </TouchableOpacity>
            </View>

            {/* Featured Product Grid */}
            <View className="mb-12">
              <Text className="text-brand-dark text-sm font-bold mb-4">Featured Product</Text>
              <View className="flex-row flex-wrap justify-between gap-y-4">
                {featuredProducts.map((prod) => (
                  <View
                    key={prod.id}
                    className="w-[48%] bg-white p-3.5 rounded-3xl border border-slate-100 shadow-sm"
                  >
                    <View className="w-full h-28 bg-[#F2F7FA] rounded-2xl mb-3 items-center justify-center p-2 relative">
                      <Ionicons name="cube" size={32} color="#A0AEC0" />
                    </View>
                    <Text className="text-brand-dark text-[11px] font-bold" numberOfLines={1}>
                      {prod.name}
                    </Text>
                    
                    <View className="flex-row items-center gap-0.5 mt-1">
                      <Ionicons name="star" size={10} color="#E4792F" />
                      <Text className="text-brand-gray text-[9px] font-bold">{prod.rating}</Text>
                    </View>

                    <View className="flex-row justify-between items-center mt-3 pt-2 border-t border-slate-50">
                      <Text className="text-brand-orange text-xs font-extrabold">${prod.price}</Text>
                      <TouchableOpacity className="bg-brand-orange/10 p-1.5 rounded-lg">
                        <Ionicons name="basket" size={12} color="#E4792F" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 3. WIZARD STEP 1: BASIC INFO -------------------- */}
      {activeScreen === "shop-wizard-1" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("shop-details")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Shop Information</Text>
            <View className="w-6" />
          </View>

          {/* Steps Indicator Progress line */}
          <View className="flex-row px-12 py-3 bg-slate-50 items-center justify-between">
            <View className="h-1.5 bg-brand-orange rounded-full w-[30%]" />
            <View className="h-1.5 bg-slate-200 rounded-full w-[30%]" />
            <View className="h-1.5 bg-slate-200 rounded-full w-[30%]" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="items-center mb-6">
              <View className="w-16 h-16 rounded-full bg-brand-orange/10 items-center justify-center mb-3">
                <Ionicons name="storefront-outline" size={28} color="#E4792F" />
              </View>
              <Text className="text-brand-dark text-base font-bold">Basic Information</Text>
              <Text className="text-brand-gray text-[10px] text-center mt-1">Let's start with some basic details about your shop</Text>
            </View>

            <View className="gap-4 mb-12">
              {/* Shop Logo upload */}
              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Shop Logo</Text>
                <View className="flex-row gap-3 items-center">
                  <TouchableOpacity className="border border-slate-200 bg-white px-4 py-2.5 rounded-xl">
                    <Text className="text-brand-dark text-xs font-semibold">Choose file</Text>
                  </TouchableOpacity>
                  {wizardLogo && <Text className="text-brand-gray text-[10px] font-semibold">{wizardLogo}</Text>}
                </View>
              </View>

              {/* Shop Banner upload */}
              <View className="gap-1.5 mt-1">
                <Text className="text-[10px] font-bold text-brand-dark">Upload Shop Banner</Text>
                {wizardBanner ? (
                  <View className="w-full h-32 rounded-2xl bg-white border border-slate-200 items-center justify-center p-2 relative">
                    <Ionicons name="image" size={48} color="#A0AEC0" />
                    <TouchableOpacity
                      onPress={() => setWizardBanner(null)}
                      className="absolute top-2.5 right-2.5 bg-red-500 w-8 h-8 rounded-full items-center justify-center shadow"
                    >
                      <Ionicons name="close" size={18} color="white" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => setWizardBanner("banner_done.png")}
                    className="w-full h-32 border-2 border-dashed border-slate-300 rounded-2xl bg-white items-center justify-center"
                  >
                    <Ionicons name="cloud-upload-outline" size={24} color="#A0AEC0" />
                    <Text className="text-brand-dark text-xs font-bold mt-1">Upload Item Photo</Text>
                    <Text className="text-brand-gray text-[9px]">JPG, PNG up to 5MB</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Basic Inputs */}
              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Shop Name</Text>
                <TextInput
                  value={tempName}
                  onChangeText={setTempName}
                  placeholder="Enter store name"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Shop Contact Number</Text>
                <TextInput
                  value={tempPhone}
                  onChangeText={setTempPhone}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Shop Email Address</Text>
                <TextInput
                  value={tempEmail}
                  onChangeText={setTempEmail}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">About</Text>
                <TextInput
                  value={tempAbout}
                  onChangeText={setTempAbout}
                  multiline
                  numberOfLines={4}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold min-h-[100px] text-left"
                />
              </View>

              {/* Continue button */}
              <TouchableOpacity
                onPress={() => setActiveScreen("shop-wizard-2")}
                className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mt-4"
              >
                <Text className="text-white text-base font-bold">Continue</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 4. WIZARD STEP 2: SET LOCATION -------------------- */}
      {activeScreen === "shop-wizard-2" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("shop-wizard-1")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Shop Information</Text>
            <View className="w-6" />
          </View>

          {/* Steps Indicator Progress line */}
          <View className="flex-row px-12 py-3 bg-slate-50 items-center justify-between">
            <View className="h-1.5 bg-brand-orange rounded-full w-[30%]" />
            <View className="h-1.5 bg-brand-orange rounded-full w-[30%]" />
            <View className="h-1.5 bg-slate-200 rounded-full w-[30%]" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="items-center mb-5">
              <View className="w-16 h-16 rounded-full bg-brand-orange/10 items-center justify-center mb-3">
                <Ionicons name="location-outline" size={28} color="#E4792F" />
              </View>
              <Text className="text-brand-dark text-base font-bold">Set Your Location</Text>
              <Text className="text-brand-gray text-[10px] text-center mt-1">Help customer find your store</Text>
            </View>

            {/* Map visual panel with pin */}
            <View className="w-full h-44 rounded-2xl border border-gray-200 overflow-hidden bg-[#E5F1F6] relative justify-center items-center mb-5">
              <View className="absolute w-[200%] h-3 bg-[#D3E8F0] rotate-12 top-10" />
              <View className="absolute w-[200%] h-4 bg-[#D3E8F0] -rotate-45 bottom-12" />
              <View className="absolute w-4 h-full bg-white/60 left-12" />
              <View className="absolute w-28 h-20 bg-[#C5E1A5] rounded-xl left-4 bottom-4 opacity-70" />
              <View className="absolute w-20 h-16 bg-[#FFE082] rounded-xl right-6 top-4 opacity-70" />
              
              <View className="items-center justify-center z-10">
                <View className="w-8 h-8 rounded-full bg-brand-orange/30 items-center justify-center absolute scale-150" />
                <Ionicons name="location" size={32} color="#E4792F" />
              </View>
            </View>

            {/* Address fields */}
            <View className="gap-4 mb-12">
              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Shop Address</Text>
                <TextInput
                  value={tempAddress}
                  onChangeText={setTempAddress}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <TouchableOpacity
                onPress={() => setTempAddress("102/B Fashion Plaza, Taiger Pass, Chittagong")}
                className="flex-row items-center gap-1.5 -mt-2 self-start"
              >
                <Ionicons name="navigate-sharp" size={14} color="#E4792F" />
                <Text className="text-brand-orange text-xs font-bold">Use current location</Text>
              </TouchableOpacity>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Road/Street Name</Text>
                <TextInput
                  value={tempRoad}
                  onChangeText={setTempRoad}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <View className="flex-row gap-4">
                <View className="flex-1 gap-1.5">
                  <Text className="text-[10px] font-bold text-brand-dark">House No</Text>
                  <TextInput
                    value={tempHouse}
                    onChangeText={setTempHouse}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                  />
                </View>
                <View className="flex-1 gap-1.5">
                  <Text className="text-[10px] font-bold text-brand-dark">Floor No</Text>
                  <TextInput
                    value={tempFloor}
                    onChangeText={setTempFloor}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                  />
                </View>
              </View>

              <View className="flex-row gap-4">
                <View className="flex-1 gap-1.5">
                  <Text className="text-[10px] font-bold text-brand-dark">City</Text>
                  <TextInput
                    value={tempCity}
                    onChangeText={setTempCity}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                  />
                </View>
                <View className="flex-1 gap-1.5">
                  <Text className="text-[10px] font-bold text-brand-dark">District</Text>
                  <TextInput
                    value={tempDistrict}
                    onChangeText={setTempDistrict}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                  />
                </View>
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Postal Code</Text>
                <TextInput
                  value={tempPostal}
                  onChangeText={setTempPostal}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              {/* Hours Grid */}
              <View className="flex-row gap-4">
                <View className="flex-1 gap-1.5">
                  <Text className="text-[10px] font-bold text-brand-dark">Opening Time</Text>
                  <TextInput
                    value={tempOpening}
                    onChangeText={setTempOpening}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                  />
                </View>
                <View className="flex-1 gap-1.5">
                  <Text className="text-[10px] font-bold text-brand-dark">Closing Time</Text>
                  <TextInput
                    value={tempClosing}
                    onChangeText={setTempClosing}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                  />
                </View>
              </View>

              {/* Continue button */}
              <TouchableOpacity
                onPress={() => setActiveScreen("shop-wizard-3")}
                className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mt-4"
              >
                <Text className="text-white text-base font-bold">Continue</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 5. WIZARD STEP 3: LEGAL DOCUMENTS -------------------- */}
      {activeScreen === "shop-wizard-3" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("shop-wizard-2")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Shop Information</Text>
            <View className="w-6" />
          </View>

          {/* Steps Indicator Progress line */}
          <View className="flex-row px-12 py-3 bg-slate-50 items-center justify-between">
            <View className="h-1.5 bg-brand-orange rounded-full w-[30%]" />
            <View className="h-1.5 bg-brand-orange rounded-full w-[30%]" />
            <View className="h-1.5 bg-brand-orange rounded-full w-[30%]" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="items-center mb-5">
              <View className="w-16 h-16 rounded-full bg-brand-orange/10 items-center justify-center mb-3">
                <Ionicons name="document-text-outline" size={28} color="#E4792F" />
              </View>
              <Text className="text-brand-dark text-base font-bold">Legal Documents</Text>
              <Text className="text-brand-gray text-[10px] text-center mt-1">Please Upload the requirement documents to verify your store</Text>
            </View>

            <View className="gap-5 mb-12">
              {/* Document card */}
              <View className="bg-white border border-gray-100 rounded-2xl p-4 flex-row items-center justify-between shadow-sm">
                <View className="flex-1 mr-4">
                  <Text className="text-brand-dark text-xs font-bold">Trade Licences</Text>
                  <Text className="text-brand-gray text-[9px] mt-0.5">
                    {tradeLicense
                      ? `${tradeLicense.name} (${tradeLicense.size})`
                      : "Upload a clear copy of your trade licences"}
                  </Text>
                </View>
                {uploadingLicense ? (
                  <ActivityIndicator size="small" color="#E4792F" className="p-2" />
                ) : tradeLicense ? (
                  <TouchableOpacity
                    onPress={() => setTradeLicense(null)}
                    className="bg-red-50 p-2.5 rounded-full"
                  >
                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={simulateDocUpload}
                    className="bg-brand-orange/10 p-2.5 rounded-full"
                  >
                    <Ionicons name="arrow-up" size={18} color="#E4792F" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Submit button */}
              <TouchableOpacity
                onPress={handleWizardSubmit}
                disabled={!tradeLicense}
                activeOpacity={0.8}
                className={`w-full py-4 rounded-2xl items-center justify-center mt-4 ${
                  tradeLicense ? "bg-brand-orange" : "bg-brand-gray/30"
                }`}
              >
                <Text className="text-white text-base font-bold">Finish & Submit</Text>
              </TouchableOpacity>

              <View className="flex-row items-center justify-center gap-1.5 mt-2">
                <Ionicons name="lock-closed-outline" size={14} color="#6A7282" />
                <Text className="text-brand-gray text-[10px]">
                  Your documents are secure and will kept confidentials
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 6. RATINGS & REVIEWS SCREEN -------------------- */}
      {activeScreen === "reviews" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("shop-details")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Rating & Review</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Rating Summary Card */}
            <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex-row items-center justify-between mb-6">
              <View className="items-center justify-center w-[30%]">
                <Text className="text-brand-dark text-3xl font-extrabold">4.3</Text>
                <Text className="text-brand-gray text-[9px] font-semibold mt-1">24 Ratings</Text>
              </View>

              {/* Star distribution */}
              <View className="flex-1 gap-1 pl-4 border-l border-slate-50">
                {[5, 4, 3, 2, 1].map((stars, idx) => {
                  const widths = ["75%", "40%", "20%", "10%", "5%"];
                  const counts = [12, 6, 4, 2, 1];
                  return (
                    <View key={stars} className="flex-row items-center gap-2">
                      <View className="flex-row gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Ionicons
                            key={i}
                            name={i < stars ? "star" : "star-outline"}
                            size={8}
                            color="#E4792F"
                          />
                        ))}
                      </View>
                      <View className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <View style={{ width: widths[idx] as any }} className="h-full bg-brand-orange" />
                      </View>
                      <Text className="text-brand-gray text-[8px] font-bold w-4">{counts[idx]}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Feedbacks list */}
            <View className="mb-12">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-brand-dark text-sm font-bold">Feedback</Text>
                <TouchableOpacity>
                  <Text className="text-brand-orange text-xs font-bold">View All</Text>
                </TouchableOpacity>
              </View>

              <View className="gap-4">
                {reviews.map((rev) => (
                  <View
                    key={rev.id}
                    className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm gap-3"
                  >
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center gap-3">
                        <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center">
                          <Ionicons name="person" size={20} color="#A0AEC0" />
                        </View>
                        <View>
                          <Text className="text-brand-dark text-xs font-bold">{rev.name}</Text>
                          <View className="flex-row gap-0.5 mt-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Ionicons
                                key={i}
                                name={i < rev.rating ? "star" : "star-outline"}
                                size={9}
                                color="#E4792F"
                              />
                            ))}
                          </View>
                        </View>
                      </View>
                      <Text className="text-slate-400 text-[9px] font-semibold">{rev.date}</Text>
                    </View>

                    <Text className="text-brand-gray text-[10px] leading-4 font-medium">
                      {rev.comment}
                    </Text>

                    {/* Show existing reply if any */}
                    {rev.reply && (
                      <View className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl ml-2">
                        <Text className="text-brand-dark text-[10px] font-bold">Your Reply</Text>
                        <Text className="text-brand-gray text-[10px] leading-4 font-medium mt-1">
                          {rev.reply}
                        </Text>
                      </View>
                    )}

                    {/* Reply / Collapse Action */}
                    {!rev.reply && (
                      <View className="flex-row items-center justify-between border-t border-slate-50 pt-3 mt-1">
                        <View />
                        <TouchableOpacity onPress={() => handleToggleReply(rev.id)}>
                          <Text className="text-brand-orange text-[10px] font-bold">
                            {rev.isReplying ? "Cancel" : "Reply"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {/* Reply editor input */}
                    {rev.isReplying && (
                      <View className="mt-2 border-t border-slate-50 pt-4">
                        <TextInput
                          value={replyText}
                          onChangeText={setReplyText}
                          placeholder="Write here..."
                          placeholderTextColor="#A0AEC0"
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 text-xs text-brand-dark mb-3"
                        />
                        <View className="flex-row justify-end gap-3">
                          <TouchableOpacity
                            onPress={() => handleToggleReply(rev.id)}
                            className="px-3 py-1.5 rounded-lg bg-slate-100"
                          >
                            <Text className="text-brand-gray text-[9px] font-bold">Cancel</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => handleSubmitReply(rev.id)}
                            className="px-3 py-1.5 rounded-lg bg-brand-orange"
                          >
                            <Text className="text-white text-[9px] font-bold">Send Reply</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 7. SECURITY SCREEN -------------------- */}
      {activeScreen === "security" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Security</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="gap-5 mb-12">
              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Change Phone Number</Text>
                <TextInput
                  value={secPhone}
                  onChangeText={setSecPhone}
                  keyboardType="phone-pad"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <TouchableOpacity
                onPress={() => setActiveScreen("change-password")}
                className="flex-row items-center justify-between py-1 self-start"
              >
                <Text className="text-brand-orange text-xs font-bold">Change Password</Text>
                <Ionicons name="chevron-forward" size={14} color="#E4792F" className="ml-1" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSaveSecurity}
                className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mt-8"
              >
                <Text className="text-white text-base font-bold">Save Change</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 8. CHANGE PASSWORD SCREEN -------------------- */}
      {activeScreen === "change-password" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("security")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Security</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="gap-5 mb-12">
              {/* Old Password */}
              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Old Password</Text>
                <View className="w-full bg-white border border-gray-200 rounded-2xl flex-row items-center px-4">
                  <TextInput
                    value={oldPassword}
                    onChangeText={setOldPassword}
                    secureTextEntry={!showOld}
                    placeholder="********"
                    placeholderTextColor="#A0AEC0"
                    className="flex-1 py-3 text-brand-dark text-xs font-semibold"
                  />
                  <TouchableOpacity onPress={() => setShowOld(!showOld)}>
                    <Ionicons
                      name={showOld ? "eye-off-outline" : "eye-outline"}
                      size={18}
                      color="#6A7282"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* New Password */}
              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">New Password</Text>
                <View className="w-full bg-white border border-gray-200 rounded-2xl flex-row items-center px-4">
                  <TextInput
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!showNew}
                    placeholder="********"
                    placeholderTextColor="#A0AEC0"
                    className="flex-1 py-3 text-brand-dark text-xs font-semibold"
                  />
                  <TouchableOpacity onPress={() => setShowNew(!showNew)}>
                    <Ionicons
                      name={showNew ? "eye-off-outline" : "eye-outline"}
                      size={18}
                      color="#6A7282"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Current Password */}
              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Current Password</Text>
                <View className="w-full bg-white border border-gray-200 rounded-2xl flex-row items-center px-4">
                  <TextInput
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    secureTextEntry={!showCurrent}
                    placeholder="********"
                    placeholderTextColor="#A0AEC0"
                    className="flex-1 py-3 text-brand-dark text-xs font-semibold"
                  />
                  <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
                    <Ionicons
                      name={showCurrent ? "eye-off-outline" : "eye-outline"}
                      size={18}
                      color="#6A7282"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Action Button */}
              <TouchableOpacity
                onPress={handleSavePassword}
                className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mt-8"
              >
                <Text className="text-white text-base font-bold">Save Change</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 9. TERMS & CONDITIONS SCREEN -------------------- */}
      {activeScreen === "terms" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Terms & Condition</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-12">
              <Text className="text-brand-dark text-sm font-bold mb-4">Terms and Condition</Text>

              {[
                "Welcome to Ai. By using our services, you agree to abide by the terms and conditions outlined below. These terms govern your access to and",
                "use of Ai tools and services, so please review them carefully before proceeding.",
                "Ai provides innovative tools designed to enhance how you capture and manage voice recordings. Our services include voice-to-text transcription and AI-driven summarization, which are intended",
                "for lawful, ethical purposes only. You must ensure compliance with applicable laws, including obtaining consent from all participants when recording conversations. CleverTalk disclaims liability for any misuse of its tools.",
              ].map((clause, idx) => (
                <View key={idx} className="flex-row items-start gap-2 mb-4">
                  <Text className="text-brand-gray text-xs font-bold leading-5">{idx + 1}.</Text>
                  <Text className="text-brand-gray text-xs leading-5 flex-1 font-medium">{clause}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 10. HELP & SUPPORT SCREEN -------------------- */}
      {activeScreen === "help" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Help & Support</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-6">
              <Text className="text-brand-dark text-sm font-bold mb-4">Terms and Condition</Text>

              {[
                "Welcome to Ai. By using our services, you agree to abide by the terms and conditions outlined below. These terms govern your access to and",
                "use of Ai tools and services, so please review them carefully before proceeding.",
                "Ai provides innovative tools designed to enhance how you capture and manage voice recordings. Our services include voice-to-text transcription and AI-driven summarization, which are intended",
                "for lawful, ethical purposes only. You must ensure compliance with applicable laws, including obtaining consent from all participants when recording conversations. CleverTalk disclaims liability for any misuse of its tools.",
              ].map((clause, idx) => (
                <View key={idx} className="flex-row items-start gap-2 mb-4">
                  <Text className="text-brand-gray text-xs font-bold leading-5">{idx + 1}.</Text>
                  <Text className="text-brand-gray text-xs leading-5 flex-1 font-medium">{clause}</Text>
                </View>
              ))}
            </View>

            {/* Contacts Info */}
            <View className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-12">
              <Text className="text-brand-dark text-[10px] font-bold mb-1">Admin Phone for support</Text>
              <Text className="text-brand-gray text-xs font-semibold mb-6">+8801775551325</Text>

              <TouchableOpacity
                onPress={() => {
                  Alert.alert("Email Support", "Opening email application to contact support...");
                }}
                className="border border-brand-orange rounded-2xl py-3.5 flex-row items-center justify-center gap-2"
              >
                <Ionicons name="mail" size={16} color="#E4792F" />
                <Text className="text-brand-orange text-xs font-bold">Email Us</Text>
                <Ionicons name="arrow-forward" size={12} color="#E4792F" className="ml-0.5" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

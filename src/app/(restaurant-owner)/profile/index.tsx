import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Define TypeScript interfaces for our state structures
interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
  replies: string[];
  replyText: string;
  isReplying: boolean;
}

interface DaySchedule {
  day: string;
  opening: string;
  closing: string;
  active: boolean;
}

export default function RestaurantProfile() {
  const router = useRouter();
  
  // Navigation states
  const [activeScreen, setActiveScreen] = useState<
    | "main"
    | "shop-details"
    | "edit-step1"
    | "edit-step2"
    | "edit-step3"
    | "hours"
    | "reviews"
    | "terms"
    | "help"
  >("main");

  // Global settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Shop Info State (Centralized)
  const [shopInfo, setShopInfo] = useState({
    name: "Sakura Garden",
    rating: 4.5,
    reviewsCount: 250,
    location: "kazi Deiry, Tiger Pass, Chittagong",
    about: "Biffco Enterprises offers whimsical fusion comfort food, like Cloud Burgers and Electric Soup. With a rotating mystery menu, flying nachos, and glowing decor, it's a fun, interactive dining experience where food surprises and delights in every bite.",
    contactEmail: "Demomail@clive.com",
    contactPhone: "+85464634164634",
    website: "www.behance.net/sajib1100",
    facebook: "facebook.com/sajib1100",
    bannerImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=80",
    cuisineType: "Asian Fusion, Sushi",
    openingTime: "10:00 AM",
    closingTime: "12:00 PM",
    tradeLicenseUploaded: true,
    tradeLicenseName: "trade_license_2026.pdf",
    foodSafetyUploaded: true,
    foodSafetyName: "food_safety_cert.pdf",
  });

  // Temporarily holding form states during editing
  const [formName, setFormName] = useState(shopInfo.name);
  const [formPhone, setFormPhone] = useState(shopInfo.contactPhone);
  const [formEmail, setFormEmail] = useState(shopInfo.contactEmail);
  const [formCuisine, setFormCuisine] = useState(shopInfo.cuisineType);
  const [formAddress, setFormAddress] = useState(shopInfo.location);
  const [formOpening, setFormOpening] = useState(shopInfo.openingTime);
  const [formClosing, setFormClosing] = useState(shopInfo.closingTime);
  const [tempBanner, setTempBanner] = useState(shopInfo.bannerImage);
  const [tempTradeUploaded, setTempTradeUploaded] = useState(shopInfo.tradeLicenseUploaded);
  const [tempTradeName, setTempTradeName] = useState(shopInfo.tradeLicenseName);
  const [tempFoodUploaded, setTempFoodUploaded] = useState(shopInfo.foodSafetyUploaded);
  const [tempFoodName, setTempFoodName] = useState(shopInfo.foodSafetyName);

  // Store Hours State
  const [weeklySchedule, setWeeklySchedule] = useState<DaySchedule[]>([
    { day: "Sat", opening: "09:00 AM", closing: "09:00 PM", active: true },
    { day: "Sun", opening: "09:00 AM", closing: "09:00 PM", active: true },
    { day: "Mon", opening: "09:00 AM", closing: "09:00 PM", active: true },
    { day: "Tue", opening: "09:00 AM", closing: "09:00 PM", active: true },
    { day: "Wed", opening: "09:00 AM", closing: "09:00 PM", active: true },
    { day: "Thu", opening: "09:00 AM", closing: "09:00 PM", active: true },
    { day: "Fri", opening: "10:00 AM", closing: "10:00 PM", active: false },
  ]);

  // Holiday Mode State
  const [holidayDate, setHolidayDate] = useState("2026-07-04");
  const [holidayOpening, setHolidayOpening] = useState("11:00 AM");
  const [holidayClosing, setHolidayClosing] = useState("06:00 PM");

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      author: "Maria Rodriguez",
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely amazing experience! The Gallo Pinto was authentic and delicious. The atmosphere is cozy and the staff is incredibly friendly. The presentation was beautiful and every bite was memorable.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      replies: ["Thank you Maria! We appreciate your kind words and look forward to serving you again."],
      replyText: "",
      isReplying: false,
    },
    {
      id: "2",
      author: "Esther Howard",
      rating: 4,
      date: "3 days ago",
      comment: "Great food, fast service. The sushi platter was outstanding, though the wait time was a bit longer than expected. Definitely coming back to try the other entrees.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
      replies: [],
      replyText: "",
      isReplying: false,
    },
    {
      id: "3",
      author: "Robert Fox",
      rating: 5,
      date: "5 days ago",
      comment: "The dessert selection was out of this world. Highly recommend the matcha lava cake!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      replies: [],
      replyText: "",
      isReplying: false,
    },
  ]);

  // Triggered when entering edit flow
  const startEditing = () => {
    setFormName(shopInfo.name);
    setFormPhone(shopInfo.contactPhone);
    setFormEmail(shopInfo.contactEmail);
    setFormCuisine(shopInfo.cuisineType);
    setFormAddress(shopInfo.location);
    setFormOpening(shopInfo.openingTime);
    setFormClosing(shopInfo.closingTime);
    setTempBanner(shopInfo.bannerImage);
    setTempTradeUploaded(shopInfo.tradeLicenseUploaded);
    setTempTradeName(shopInfo.tradeLicenseName);
    setTempFoodUploaded(shopInfo.foodSafetyUploaded);
    setTempFoodName(shopInfo.foodSafetyName);
    setActiveScreen("edit-step1");
  };

  // Save the full 3-step form values
  const saveAllDetails = () => {
    setShopInfo({
      ...shopInfo,
      name: formName,
      contactPhone: formPhone,
      contactEmail: formEmail,
      cuisineType: formCuisine,
      location: formAddress,
      openingTime: formOpening,
      closingTime: formClosing,
      bannerImage: tempBanner,
      tradeLicenseUploaded: tempTradeUploaded,
      tradeLicenseName: tempTradeName,
      foodSafetyUploaded: tempFoodUploaded,
      foodSafetyName: tempFoodName,
    });
    Alert.alert("Success", "Restaurant information has been updated successfully.");
    setActiveScreen("shop-details");
  };

  const handleSimulateBannerUpload = () => {
    // Cycles banner image to show functional preview
    const alternativeBanners = [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=80",
    ];
    const currentIndex = alternativeBanners.indexOf(tempBanner);
    const nextIndex = (currentIndex + 1) % alternativeBanners.length;
    setTempBanner(alternativeBanners[nextIndex]);
  };

  // Update specific day status in schedule
  const toggleDayActive = (index: number) => {
    const updated = [...weeklySchedule];
    updated[index].active = !updated[index].active;
    setWeeklySchedule(updated);
  };

  const updateDayTime = (index: number, type: "opening" | "closing", val: string) => {
    const updated = [...weeklySchedule];
    updated[index][type] = val;
    setWeeklySchedule(updated);
  };

  // Add inline reply to a review
  const submitReply = (id: string) => {
    setReviews(
      reviews.map((rev) => {
        if (rev.id === id) {
          if (!rev.replyText.trim()) return rev;
          return {
            ...rev,
            replies: [...rev.replies, rev.replyText],
            replyText: "",
            isReplying: false,
          };
        }
        return rev;
      })
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* -------------------- 1. MAIN PROFILE MENU -------------------- */}
      {activeScreen === "main" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => router.replace("/(restaurant-owner)/dashboard")}>
              <Ionicons name="arrow-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold text-center flex-1">Profile</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Profile Info Card */}
            <View className="bg-white rounded-3xl border border-slate-100 p-6 items-center shadow-sm mb-6">
              <View className="relative mb-3">
                <Image
                  source={{ uri: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80" }}
                  className="w-24 h-24 rounded-full border border-slate-200"
                />
                <TouchableOpacity className="absolute bottom-0 right-0 bg-brand-orange w-8 h-8 rounded-full items-center justify-center border-2 border-white shadow-sm">
                  <Ionicons name="camera" size={14} color="#white" />
                </TouchableOpacity>
              </View>
              <Text className="text-brand-dark text-lg font-bold">{shopInfo.name}</Text>
              
              {/* Star Rating summary clickable to reviews */}
              <TouchableOpacity
                onPress={() => setActiveScreen("reviews")}
                className="flex-row items-center gap-1.5 mt-1 bg-orange-50 px-3 py-1 rounded-full border border-orange-100"
              >
                <Ionicons name="star" size={14} color="#E4792F" />
                <Text className="text-brand-orange text-xs font-bold">{shopInfo.rating}</Text>
                <Text className="text-brand-gray text-[10px] font-semibold">({shopInfo.reviewsCount} Reviews)</Text>
              </TouchableOpacity>
            </View>

            {/* List Menu */}
            <View className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm mb-6">
              {/* Option 1: My Restaurant */}
              <TouchableOpacity
                onPress={() => setActiveScreen("shop-details")}
                className="flex-row justify-between items-center py-4 px-2 border-b border-slate-100"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="restaurant" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">My Restaurant</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#6A7282" />
              </TouchableOpacity>

              {/* Option 2: Restaurant Hours */}
              <TouchableOpacity
                onPress={() => setActiveScreen("hours")}
                className="flex-row justify-between items-center py-4 px-2 border-b border-slate-100"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="time" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Restaurant Hours</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#6A7282" />
              </TouchableOpacity>

              {/* Option 3: Menu Management (switches to bottom Menu tab) */}
              <TouchableOpacity
                onPress={() => router.push("/(restaurant-owner)/menu")}
                className="flex-row justify-between items-center py-4 px-2 border-b border-slate-100"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="book" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Menu Management</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#6A7282" />
              </TouchableOpacity>

              {/* Option 4: Notification Toggle */}
              <View className="flex-row justify-between items-center py-4 px-2 border-b border-slate-100">
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="notifications" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Notification</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: "#E2E8F0", true: "#fbd38d" }}
                  thumbColor={notificationsEnabled ? "#E4792F" : "#A0AEC0"}
                />
              </View>

              {/* Option 5: Help & Support */}
              <TouchableOpacity
                onPress={() => setActiveScreen("help")}
                className="flex-row justify-between items-center py-4 px-2 border-b border-slate-100"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="help-circle" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Help & Support</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#6A7282" />
              </TouchableOpacity>

              {/* Option 6: Terms & Conditions */}
              <TouchableOpacity
                onPress={() => setActiveScreen("terms")}
                className="flex-row justify-between items-center py-4 px-2"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="document-text" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Terms & Conditions</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#6A7282" />
              </TouchableOpacity>
            </View>

            {/* Logout button */}
            <TouchableOpacity
              onPress={() => Alert.alert("Logout", "Are you sure you want to log out?")}
              className="bg-red-50 border border-red-100 rounded-2xl py-4 flex-row items-center justify-center gap-2 mb-12"
            >
              <Ionicons name="log-out-outline" size={18} color="#EF4444" />
              <Text className="text-red-500 font-bold text-xs">Log Out</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 2. SHOP DETAILS -------------------- */}
      {activeScreen === "shop-details" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Shop Details</Text>
            <TouchableOpacity
              onPress={startEditing}
              className="flex-row items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full"
            >
              <Ionicons name="create-outline" size={14} color="#E4792F" />
              <Text className="text-brand-orange text-xs font-bold">Edit</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Header info */}
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-1 pr-4">
                <Text className="text-brand-dark text-lg font-bold">{shopInfo.name}</Text>
                <View className="flex-row items-center gap-1 mt-1">
                  <Ionicons name="location" size={14} color="#6A7282" />
                  <Text className="text-brand-gray text-[11px] font-semibold flex-1" numberOfLines={1}>
                    {shopInfo.location}
                  </Text>
                </View>
              </View>
              <View className="bg-orange-500 px-3 py-1 rounded-full">
                <Text className="text-white text-[10px] font-bold">Shop</Text>
              </View>
            </View>

            {/* Banner Cover image */}
            <View className="relative h-48 rounded-2xl overflow-hidden mb-6 bg-slate-200">
              <Image source={{ uri: shopInfo.bannerImage }} className="w-full h-full" />
              {/* Active Badge */}
              <View className="absolute bottom-4 left-4 bg-black/70 px-3 py-1.5 rounded-full flex-row items-center gap-1.5">
                <View className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <Text className="text-white text-[10px] font-bold">
                  Active {shopInfo.openingTime} - {shopInfo.closingTime}
                </Text>
              </View>
            </View>

            {/* About */}
            <View className="mb-6 bg-white p-5 rounded-3xl border border-slate-100">
              <Text className="text-brand-dark text-sm font-bold mb-2">About</Text>
              <Text className="text-brand-gray text-xs leading-5">{shopInfo.about}</Text>

              {/* Rating summary */}
              <TouchableOpacity
                onPress={() => setActiveScreen("reviews")}
                className="flex-row items-center gap-1.5 mt-4 pt-4 border-t border-slate-50"
              >
                <Text className="text-brand-dark text-xs font-bold">Rating</Text>
                <Ionicons name="star" size={14} color="#E4792F" />
                <Text className="text-brand-orange text-xs font-bold">{shopInfo.rating}</Text>
                <Text className="text-brand-gray text-[10px]">({shopInfo.reviewsCount} Reviews)</Text>
                <Ionicons name="chevron-forward" size={12} color="#6A7282" className="ml-auto" />
              </TouchableOpacity>
            </View>

            {/* Contacts details */}
            <View className="bg-white p-5 rounded-3xl border border-slate-100 mb-12">
              <Text className="text-brand-dark text-sm font-bold mb-4">Contacts</Text>

              <View className="flex-row items-center gap-3 py-3 border-b border-slate-50">
                <Ionicons name="mail" size={16} color="#E4792F" />
                <Text className="text-brand-gray text-xs font-semibold">{shopInfo.contactEmail}</Text>
              </View>

              <View className="flex-row items-center gap-3 py-3 border-b border-slate-50">
                <Ionicons name="call" size={16} color="#E4792F" />
                <Text className="text-brand-gray text-xs font-semibold">{shopInfo.contactPhone}</Text>
              </View>

              <View className="flex-row items-center gap-3 py-3 border-b border-slate-50">
                <Ionicons name="globe" size={16} color="#E4792F" />
                <Text className="text-brand-gray text-xs font-semibold">{shopInfo.website}</Text>
              </View>

              <View className="flex-row items-center gap-3 py-3">
                <Ionicons name="logo-facebook" size={16} color="#E4792F" />
                <Text className="text-brand-gray text-xs font-semibold">{shopInfo.facebook}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 3. EDIT STEP 1: BASIC INFO -------------------- */}
      {activeScreen === "edit-step1" && (
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
            <TouchableOpacity onPress={() => setActiveScreen("shop-details")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Restaurant Information</Text>
            <View className="w-6" />
          </View>

          {/* Stepper bar (Step 1 active) */}
          <View className="flex-row px-8 py-3 bg-slate-50 justify-between items-center">
            <View className="flex-1 h-1 bg-brand-orange rounded-full mr-2" />
            <View className="flex-1 h-1 bg-slate-200 rounded-full mr-2" />
            <View className="flex-1 h-1 bg-slate-200 rounded-full" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="items-center mb-6 mt-2">
              <View className="bg-orange-50 w-12 h-12 rounded-full items-center justify-center mb-3">
                <Ionicons name="restaurant-outline" size={24} color="#E4792F" />
              </View>
              <Text className="text-brand-dark text-base font-bold">Basic Information</Text>
              <Text className="text-brand-gray text-xs text-center mt-1 px-4">
                Let's start with some basic details about your restaurant
              </Text>
            </View>

            {/* Banner upload preview */}
            <Text className="text-brand-dark text-xs font-bold mb-2">Upload Restaurant Banner</Text>
            <TouchableOpacity
              onPress={handleSimulateBannerUpload}
              className="border-2 border-dashed border-slate-200 rounded-2xl p-5 items-center justify-center mb-6 relative overflow-hidden"
            >
              {tempBanner ? (
                <View className="w-full items-center">
                  <Image source={{ uri: tempBanner }} className="w-full h-28 rounded-lg mb-2" />
                  <Text className="text-brand-orange text-[10px] font-bold">Tap to choose another photo</Text>
                </View>
              ) : (
                <View className="items-center py-4">
                  <Ionicons name="cloud-upload-outline" size={32} color="#6A7282" />
                  <Text className="text-brand-dark text-xs font-bold mt-2">Upload Item Photo</Text>
                  <Text className="text-brand-gray text-[10px] mt-1">JPG, PNG up to 5MB</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Form */}
            <View className="gap-4 mb-12">
              <View>
                <Text className="text-brand-dark text-xs font-bold mb-1.5">Restaurant Name</Text>
                <View className="flex-row items-center border border-slate-200 rounded-xl px-3 bg-slate-50">
                  <Ionicons name="business-outline" size={16} color="#6A7282" className="mr-2" />
                  <TextInput
                    value={formName}
                    onChangeText={setFormName}
                    placeholder="Enter your restaurant name"
                    className="flex-1 py-3 text-xs text-brand-dark"
                  />
                </View>
              </View>

              <View>
                <Text className="text-brand-dark text-xs font-bold mb-1.5">Restaurant Contact Number</Text>
                <View className="flex-row items-center border border-slate-200 rounded-xl px-3 bg-slate-50">
                  <Ionicons name="call-outline" size={16} color="#6A7282" className="mr-2" />
                  <TextInput
                    value={formPhone}
                    onChangeText={setFormPhone}
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    className="flex-1 py-3 text-xs text-brand-dark"
                  />
                </View>
              </View>

              <View>
                <Text className="text-brand-dark text-xs font-bold mb-1.5">Restaurant Email Address</Text>
                <View className="flex-row items-center border border-slate-200 rounded-xl px-3 bg-slate-50">
                  <Ionicons name="mail-outline" size={16} color="#6A7282" className="mr-2" />
                  <TextInput
                    value={formEmail}
                    onChangeText={setFormEmail}
                    placeholder="Enter email address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="flex-1 py-3 text-xs text-brand-dark"
                  />
                </View>
              </View>

              <View>
                <Text className="text-brand-dark text-xs font-bold mb-1.5">Cuisine Type</Text>
                <View className="flex-row items-center border border-slate-200 rounded-xl px-3 bg-slate-50">
                  <Ionicons name="pizza-outline" size={16} color="#6A7282" className="mr-2" />
                  <TextInput
                    value={formCuisine}
                    onChangeText={setFormCuisine}
                    placeholder="Enter cuisine type"
                    className="flex-1 py-3 text-xs text-brand-dark"
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Bottom CTA */}
          <View className="p-6 border-t border-slate-100 bg-white">
            <TouchableOpacity
              onPress={() => setActiveScreen("edit-step2")}
              className="bg-brand-orange w-full py-4 rounded-2xl items-center"
            >
              <Text className="text-white font-bold text-xs">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* -------------------- 4. EDIT STEP 2: LOCATION & TIME -------------------- */}
      {activeScreen === "edit-step2" && (
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
            <TouchableOpacity onPress={() => setActiveScreen("edit-step1")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Restaurant Information</Text>
            <View className="w-6" />
          </View>

          {/* Stepper bar (Step 2 active) */}
          <View className="flex-row px-8 py-3 bg-slate-50 justify-between items-center">
            <View className="flex-1 h-1 bg-brand-orange rounded-full mr-2" />
            <View className="flex-1 h-1 bg-brand-orange rounded-full mr-2" />
            <View className="flex-1 h-1 bg-slate-200 rounded-full" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="items-center mb-6 mt-2">
              <View className="bg-orange-50 w-12 h-12 rounded-full items-center justify-center mb-3">
                <Ionicons name="location-outline" size={24} color="#E4792F" />
              </View>
              <Text className="text-brand-dark text-base font-bold">Set Your Location</Text>
              <Text className="text-brand-gray text-xs text-center mt-1 px-4">
                Help customers find your restaurant location accurately
              </Text>
            </View>

            {/* Custom Map View UI placeholder */}
            <View className="h-44 rounded-2xl border border-slate-200 mb-4 overflow-hidden bg-sky-100 items-center justify-center relative shadow-inner">
              {/* Graphical grids */}
              <View className="absolute inset-0 border-b border-sky-200 border-dashed" style={{ top: "33%" }} />
              <View className="absolute inset-0 border-b border-sky-200 border-dashed" style={{ top: "66%" }} />
              <View className="absolute inset-0 border-r border-sky-200 border-dashed" style={{ left: "33%" }} />
              <View className="absolute inset-0 border-r border-sky-200 border-dashed" style={{ left: "66%" }} />
              {/* Green parks and paths */}
              <View className="absolute w-24 h-16 bg-emerald-100 rounded-full top-4 left-6 opacity-80" />
              <View className="absolute w-20 h-10 bg-emerald-100 rounded-full bottom-3 right-8 opacity-80" />
              {/* Pin */}
              <View className="bg-white/80 p-2.5 rounded-full shadow-md items-center justify-center">
                <Ionicons name="location" size={28} color="#E4792F" />
              </View>
              <Text className="absolute bottom-2 bg-white px-2 py-0.5 rounded text-[9px] font-bold text-brand-dark shadow-sm">
                Map View
              </Text>
            </View>

            <TouchableOpacity className="flex-row items-center justify-center gap-1.5 py-1 mb-6">
              <Ionicons name="navigate-circle" size={18} color="#E4792F" />
              <Text className="text-brand-orange text-xs font-bold">Use current location</Text>
            </TouchableOpacity>

            {/* Form Address */}
            <View className="gap-4 mb-12">
              <View>
                <Text className="text-brand-dark text-xs font-bold mb-1.5">Restaurant Address</Text>
                <View className="flex-row items-start border border-slate-200 rounded-xl px-3 py-1 bg-slate-50">
                  <Ionicons name="pin-outline" size={16} color="#6A7282" className="mt-2.5 mr-2" />
                  <TextInput
                    value={formAddress}
                    onChangeText={setFormAddress}
                    placeholder="Enter your address"
                    multiline
                    numberOfLines={2}
                    className="flex-1 text-xs text-brand-dark min-h-[50px] pt-2"
                  />
                </View>
              </View>

              {/* Time inputs */}
              <View className="flex-row gap-4">
                <View className="flex-1">
                  <Text className="text-brand-dark text-xs font-bold mb-1.5">Opening Time</Text>
                  <View className="flex-row items-center border border-slate-200 rounded-xl px-3 bg-slate-50">
                    <TextInput
                      value={formOpening}
                      onChangeText={setFormOpening}
                      placeholder="e.g. 10:00 AM"
                      className="flex-1 py-3 text-xs text-brand-dark"
                    />
                    <Ionicons name="time-outline" size={16} color="#6A7282" />
                  </View>
                </View>

                <View className="flex-1">
                  <Text className="text-brand-dark text-xs font-bold mb-1.5">Closing Time</Text>
                  <View className="flex-row items-center border border-slate-200 rounded-xl px-3 bg-slate-50">
                    <TextInput
                      value={formClosing}
                      onChangeText={setFormClosing}
                      placeholder="e.g. 12:00 PM"
                      className="flex-1 py-3 text-xs text-brand-dark"
                    />
                    <Ionicons name="time-outline" size={16} color="#6A7282" />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Bottom CTA */}
          <View className="p-6 border-t border-slate-100 bg-white">
            <TouchableOpacity
              onPress={() => setActiveScreen("edit-step3")}
              className="bg-brand-orange w-full py-4 rounded-2xl items-center"
            >
              <Text className="text-white font-bold text-xs">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* -------------------- 5. EDIT STEP 3: LEGAL DOCUMENTS -------------------- */}
      {activeScreen === "edit-step3" && (
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
            <TouchableOpacity onPress={() => setActiveScreen("edit-step2")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Restaurant Information</Text>
            <View className="w-6" />
          </View>

          {/* Stepper bar (Step 3 active) */}
          <View className="flex-row px-8 py-3 bg-slate-50 justify-between items-center">
            <View className="flex-1 h-1 bg-brand-orange rounded-full mr-2" />
            <View className="flex-1 h-1 bg-brand-orange rounded-full mr-2" />
            <View className="flex-1 h-1 bg-brand-orange rounded-full" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="items-center mb-6 mt-2">
              <View className="bg-orange-50 w-12 h-12 rounded-full items-center justify-center mb-3">
                <Ionicons name="document-text-outline" size={24} color="#E4792F" />
              </View>
              <Text className="text-brand-dark text-base font-bold">Legal Documents</Text>
              <Text className="text-brand-gray text-xs text-center mt-1 px-4">
                Please upload the required documents to verify your restaurant
              </Text>
            </View>

            {/* Document 1: Trade Licence */}
            <View className="mb-5 bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
              <Text className="text-brand-dark text-xs font-bold">Trade Licences</Text>
              <Text className="text-brand-gray text-[10px] mt-0.5">Upload a clear copy of your trade licenses</Text>
              
              <View className="flex-row items-center justify-between mt-4 bg-slate-50 border border-slate-100 rounded-2xl p-3.5">
                <View className="flex-row items-center gap-2.5">
                  <Ionicons
                    name={tempTradeUploaded ? "checkmark-circle" : "document"}
                    size={22}
                    color={tempTradeUploaded ? "#10B981" : "#6A7282"}
                  />
                  <Text className="text-brand-dark text-xs font-semibold" numberOfLines={1}>
                    {tempTradeUploaded ? tempTradeName : "No file chosen"}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setTempTradeUploaded(true);
                    setTempTradeName("trade_licence_renewed.pdf");
                  }}
                  className="bg-brand-orange/10 px-3 py-1.5 rounded-full"
                >
                  <Text className="text-brand-orange text-[10px] font-bold">
                    {tempTradeUploaded ? "Replace" : "Upload"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Document 2: Food Safety Certificate */}
            <View className="mb-8 bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
              <Text className="text-brand-dark text-xs font-bold">Food Safety Certificate</Text>
              <Text className="text-brand-gray text-[10px] mt-0.5">Upload your valid food safety certificate</Text>
              
              <View className="flex-row items-center justify-between mt-4 bg-slate-50 border border-slate-100 rounded-2xl p-3.5">
                <View className="flex-row items-center gap-2.5">
                  <Ionicons
                    name={tempFoodUploaded ? "checkmark-circle" : "document"}
                    size={22}
                    color={tempFoodUploaded ? "#10B981" : "#6A7282"}
                  />
                  <Text className="text-brand-dark text-xs font-semibold" numberOfLines={1}>
                    {tempFoodUploaded ? tempFoodName : "No file chosen"}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setTempFoodUploaded(true);
                    setTempFoodName("safety_certificate_v4.pdf");
                  }}
                  className="bg-brand-orange/10 px-3 py-1.5 rounded-full"
                >
                  <Text className="text-brand-orange text-[10px] font-bold">
                    {tempFoodUploaded ? "Replace" : "Upload"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Verification secure notice footer */}
            <View className="flex-row items-center gap-2 justify-center mb-12">
              <Ionicons name="lock-closed" size={14} color="#6A7282" />
              <Text className="text-brand-gray text-[10px] font-medium">
                Your documents are secure and will be kept confidential
              </Text>
            </View>
          </ScrollView>

          {/* Bottom CTA */}
          <View className="p-6 border-t border-slate-100 bg-white">
            <TouchableOpacity
              onPress={saveAllDetails}
              className="bg-brand-orange w-full py-4 rounded-2xl items-center"
            >
              <Text className="text-white font-bold text-xs">Finish & Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* -------------------- 6. MANAGE STORE HOURS -------------------- */}
      {activeScreen === "hours" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Manage Store Hours</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="mb-6 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
              <Text className="text-brand-dark text-sm font-bold mb-1">Regular Hours</Text>
              <Text className="text-brand-gray text-[10px] mb-4">Set your standard weekly schedule</Text>

              {/* Day List */}
              <View className="gap-3.5">
                {weeklySchedule.map((item, idx) => (
                  <View key={item.day} className="flex-row items-center justify-between py-1 border-b border-slate-50 pb-2">
                    <Text className="text-brand-dark text-xs font-bold w-10">{item.day}</Text>
                    
                    {/* Time select fields */}
                    <View className="flex-row items-center gap-2 flex-1 justify-center px-4">
                      <TextInput
                        value={item.opening}
                        onChangeText={(val) => updateDayTime(idx, "opening", val)}
                        placeholder="Opening"
                        editable={item.active}
                        className={`text-[10px] font-bold border border-slate-200 px-2 py-1.5 rounded-lg text-center w-20 bg-slate-50 ${
                          !item.active ? "opacity-50" : ""
                        }`}
                      />
                      <Ionicons name="arrow-forward" size={10} color="#A0AEC0" />
                      <TextInput
                        value={item.closing}
                        onChangeText={(val) => updateDayTime(idx, "closing", val)}
                        placeholder="Closing"
                        editable={item.active}
                        className={`text-[10px] font-bold border border-slate-200 px-2 py-1.5 rounded-lg text-center w-20 bg-slate-50 ${
                          !item.active ? "opacity-50" : ""
                        }`}
                      />
                    </View>

                    {/* Switch Toggle */}
                    <Switch
                      value={item.active}
                      onValueChange={() => toggleDayActive(idx)}
                      trackColor={{ false: "#E2E8F0", true: "#fbd38d" }}
                      thumbColor={item.active ? "#E4792F" : "#A0AEC0"}
                    />
                  </View>
                ))}
              </View>

              {/* Notice info banner */}
              <View className="mt-5 bg-orange-50/50 border border-brand-orange/20 rounded-2xl p-4 flex-row items-start gap-2.5">
                <Ionicons name="information-circle" size={18} color="#E4792F" className="mt-0.5" />
                <Text className="text-brand-orange text-[10px] leading-4 font-semibold flex-1">
                  These hours will repeat every week unless changed in Holiday Mode.
                </Text>
              </View>
            </View>

            {/* Holiday Mode */}
            <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-12">
              <Text className="text-brand-dark text-sm font-bold mb-1">Holiday Mode</Text>
              <Text className="text-brand-gray text-[10px] mb-4">Set special hours for a specific date</Text>

              <View className="gap-4">
                <View className="flex-row items-center border border-slate-200 rounded-xl px-3 bg-slate-50">
                  <Ionicons name="calendar-outline" size={16} color="#6A7282" className="mr-2" />
                  <TextInput
                    value={holidayDate}
                    onChangeText={setHolidayDate}
                    placeholder="YYYY-MM-DD"
                    className="flex-1 py-3 text-xs text-brand-dark"
                  />
                </View>

                <View className="flex-row gap-4">
                  <View className="flex-1">
                    <Text className="text-brand-dark text-[10px] font-bold mb-1">Opening Time</Text>
                    <View className="flex-row items-center border border-slate-200 rounded-xl px-3 bg-slate-50">
                      <TextInput
                        value={holidayOpening}
                        onChangeText={setHolidayOpening}
                        placeholder="e.g. 11:00 AM"
                        className="flex-1 py-2.5 text-xs text-brand-dark"
                      />
                    </View>
                  </View>

                  <View className="flex-1">
                    <Text className="text-brand-dark text-[10px] font-bold mb-1">Closing Time</Text>
                    <View className="flex-row items-center border border-slate-200 rounded-xl px-3 bg-slate-50">
                      <TextInput
                        value={holidayClosing}
                        onChangeText={setHolidayClosing}
                        placeholder="e.g. 06:00 PM"
                        className="flex-1 py-2.5 text-xs text-brand-dark"
                      />
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    Alert.alert("Success", `Holiday Mode schedule saved for ${holidayDate}`);
                  }}
                  className="bg-brand-orange rounded-xl py-3 items-center mt-2"
                >
                  <Text className="text-white text-xs font-bold">Apply Holiday Override</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 7. RATINGS & REVIEWS -------------------- */}
      {activeScreen === "reviews" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Rating & Review</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Average Rating Score Card */}
            <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex-row items-center mb-6">
              <View className="items-center justify-center border-r border-slate-100 pr-5 mr-5 w-24">
                <Text className="text-brand-dark text-3xl font-extrabold">4.3</Text>
                <Text className="text-brand-gray text-[9px] font-semibold mt-1">24 Ratings</Text>
              </View>

              {/* Progress bars */}
              <View className="flex-1 gap-1">
                {[
                  { star: 5, fill: "80%", count: 12 },
                  { star: 4, fill: "50%", count: 6 },
                  { star: 3, fill: "30%", count: 4 },
                  { star: 2, fill: "10%", count: 2 },
                  { star: 1, fill: "0%", count: 0 },
                ].map((item) => (
                  <View key={item.star} className="flex-row items-center gap-2">
                    <Text className="text-brand-dark text-[9px] font-bold w-2">{item.star}</Text>
                    <Ionicons name="star" size={8} color="#E4792F" />
                    <View className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <View className="h-full bg-brand-orange rounded-full" style={{ width: item.fill as any }} />
                    </View>
                    <Text className="text-brand-gray text-[9px] font-semibold w-4 text-right">
                      {item.count}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Feedback Listing */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-brand-dark text-sm font-bold">Feedback</Text>
              <TouchableOpacity>
                <Text className="text-brand-orange text-[10px] font-bold">View All</Text>
              </TouchableOpacity>
            </View>

            <View className="gap-4 mb-12">
              {reviews.map((rev) => (
                <View key={rev.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                  {/* Author Header */}
                  <View className="flex-row items-center gap-3 mb-2.5">
                    <Image source={{ uri: rev.avatar }} className="w-10 h-10 rounded-full bg-slate-100" />
                    <View className="flex-1">
                      <Text className="text-brand-dark text-xs font-bold">{rev.author}</Text>
                      <View className="flex-row items-center gap-1.5 mt-0.5">
                        <View className="flex-row gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Ionicons
                              key={i}
                              name="star"
                              size={10}
                              color={i < rev.rating ? "#E4792F" : "#E2E8F0"}
                            />
                          ))}
                        </View>
                        <Text className="text-brand-gray text-[9px] font-semibold">{rev.date}</Text>
                      </View>
                    </View>
                  </View>

                  <Text className="text-brand-gray text-[11px] leading-5 font-medium">{rev.comment}</Text>

                  {/* Replies already sent */}
                  {rev.replies.map((replyText, idx) => (
                    <View key={idx} className="mt-3.5 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <View className="flex-row items-center gap-1.5 mb-1">
                        <Ionicons name="arrow-undo" size={12} color="#E4792F" />
                        <Text className="text-brand-orange text-[10px] font-bold">Your Response</Text>
                      </View>
                      <Text className="text-brand-dark text-[10px] leading-4 font-semibold">{replyText}</Text>
                    </View>
                  ))}

                  {/* Inline reply action */}
                  {!rev.isReplying ? (
                    <TouchableOpacity
                      onPress={() => {
                        setReviews(
                          reviews.map((r) => (r.id === rev.id ? { ...r, isReplying: true } : r))
                        );
                      }}
                      className="mt-3.5 py-1 flex-row items-center gap-1"
                    >
                      <Ionicons name="chatbubble-ellipses-outline" size={14} color="#E4792F" />
                      <Text className="text-brand-orange text-[10px] font-bold">Reply</Text>
                    </TouchableOpacity>
                  ) : (
                    <View className="mt-3.5 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <TextInput
                        value={rev.replyText}
                        onChangeText={(text) => {
                          setReviews(
                            reviews.map((r) => (r.id === rev.id ? { ...r, replyText: text } : r))
                          );
                        }}
                        placeholder="Write here..."
                        multiline
                        className="text-[10px] leading-4 bg-white border border-slate-200 rounded-xl p-2.5 min-h-[50px]"
                      />
                      <View className="flex-row justify-end gap-2 mt-2">
                        <TouchableOpacity
                          onPress={() => {
                            setReviews(
                              reviews.map((r) => (r.id === rev.id ? { ...r, isReplying: false } : r))
                            );
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-200"
                        >
                          <Text className="text-brand-gray text-[9px] font-bold">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => submitReply(rev.id)}
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
          </ScrollView>
        </View>
      )}

      {/* -------------------- 8. TERMS & CONDITIONS -------------------- */}
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
                "Welcome to GoSwift Rides. By using our services, you agree to abide by the terms and conditions outlined below. These terms govern your access to and use of restaurant owner platforms and order distribution.",
                "Use of GoSwift tools and services, so please review them carefully before proceeding. All listings of cuisine pricing, active times, and delivery coordination must conform to standard regional regulations.",
                "GoSwift provides innovative tools designed to enhance how you capture and manage food deliveries and orders. Our services include voice-to-text transcription, AI-driven summarization, and routing details.",
                "For lawful, ethical purposes only. You must ensure compliance with applicable laws, including obtaining consent from all participants when recording and distributing orders. GoSwift disclaims liability for any misuse of its tools.",
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

      {/* -------------------- 9. HELP & SUPPORT -------------------- */}
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
                "Welcome to GoSwift Rides. By using our services, you agree to abide by the terms and conditions outlined below. These terms govern your access to and use of restaurant owner platforms and order distribution.",
                "Use of GoSwift tools and services, so please review them carefully before proceeding. All listings of cuisine pricing, active times, and delivery coordination must conform to standard regional regulations.",
                "GoSwift provides innovative tools designed to enhance how you capture and manage food deliveries and orders. Our services include voice-to-text transcription, AI-driven summarization, and routing details.",
                "For lawful, ethical purposes only. You must ensure compliance with applicable laws, including obtaining consent from all participants when recording and distributing orders. GoSwift disclaims liability for any misuse of its tools.",
              ].map((clause, idx) => (
                <View key={idx} className="flex-row items-start gap-2 mb-4">
                  <Text className="text-brand-gray text-xs font-bold leading-5">{idx + 1}.</Text>
                  <Text className="text-brand-gray text-xs leading-5 flex-1 font-medium">{clause}</Text>
                </View>
              ))}
            </View>

            {/* Contacts Support */}
            <View className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-12">
              <Text className="text-brand-dark text-xs font-bold mb-1">Admin Phone for support</Text>
              <Text className="text-brand-gray text-[11px] font-semibold mb-6">+8801775551325</Text>

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

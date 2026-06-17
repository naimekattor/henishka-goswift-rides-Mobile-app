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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

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

export default function RiderProfile() {
  const router = useRouter();

  // Navigation states
  const [activeScreen, setActiveScreen] = useState<
    | "main"
    | "personal-info"
    | "change-password"
    | "vehicle-info"
    | "verify-identity"
    | "select-vehicle"
    | "register-vehicle-info"
    | "ratings"
    | "terms"
    | "help"
  >("main");

  // Global settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Rider Personal Info state
  const [riderInfo, setRiderInfo] = useState({
    name: "Rahim Rehman",
    phone: "+088 019 800 12351",
    location: "Mohakhali, Dhaka, Bangladesh",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: "4.9",
    totalDeliveries: "1,248",
  });

  // Personal Info form states
  const [formName, setFormName] = useState(riderInfo.name);
  const [formPhone, setFormPhone] = useState(riderInfo.phone);
  const [formLocation, setFormLocation] = useState(riderInfo.location);

  // Password change states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);

  // Vehicle Information states
  const [vehicleInfo, setVehicleInfo] = useState({
    name: "Suzuki Gixxer Monotone",
    type: "Bike",
    number: "DHAKA METRO-LA-12-3456",
    verified: true,
    expiryDate: "12/31/2029",
  });

  // Vehicle Register Wizard states
  const [tempVehicleType, setTempVehicleType] = useState(vehicleInfo.type);
  const [tempVehicleName, setTempVehicleName] = useState(vehicleInfo.name);
  const [tempVehicleNumber, setTempVehicleNumber] = useState(vehicleInfo.number);
  const [tempExpiry, setTempExpiry] = useState(vehicleInfo.expiryDate);

  // Document upload state lists (stores thumbnail previews)
  const [identityDocs, setIdentityDocs] = useState([
    "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&auto=format&fit=crop&q=80",
  ]);
  const [licenseDocs, setLicenseDocs] = useState([
    "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&auto=format&fit=crop&q=80",
  ]);
  const [plateDocs, setPlateDocs] = useState([
    "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&auto=format&fit=crop&q=80",
  ]);

  // Review & Rating comments
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      author: "Maria Rodriguez",
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely amazing experience! The rider was very polite, fast, and delivered the food hot. Great communication throughout the process.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      replies: ["Thank you Maria! Pleasure delivering to you."],
      replyText: "",
      isReplying: false,
    },
    {
      id: "2",
      author: "Esther Howard",
      rating: 4,
      date: "3 days ago",
      comment: "Very quick drop off. Left the food at the doorstep as requested. Appreciate the care taken with the packaging.",
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
      comment: "Extremely fast delivery, reached before the estimated time!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      replies: [],
      replyText: "",
      isReplying: false,
    },
  ]);

  // Actions
  const handleSavePersonalInfo = () => {
    setRiderInfo({
      ...riderInfo,
      name: formName,
      phone: formPhone,
      location: formLocation,
    });
    Alert.alert("Success", "Personal information has been updated successfully.");
    setActiveScreen("main");
  };

  const handleSavePassword = () => {
    if (!oldPassword || !newPassword || !currentPassword) {
      Alert.alert("Error", "Please fill in all password fields.");
      return;
    }
    Alert.alert("Success", "Password updated successfully.");
    setOldPassword("");
    setNewPassword("");
    setCurrentPassword("");
    setActiveScreen("personal-info");
  };

  const handleSaveVehicleInfo = () => {
    setVehicleInfo({
      name: tempVehicleName,
      type: tempVehicleType,
      number: tempVehicleNumber,
      verified: true,
      expiryDate: tempExpiry,
    });
    Alert.alert("Success", "Vehicle documents submitted for verification.");
    setActiveScreen("vehicle-info");
  };

  const handleRemoveDoc = (type: "identity" | "license" | "plate", index: number) => {
    if (type === "identity") {
      setIdentityDocs(identityDocs.filter((_, i) => i !== index));
    } else if (type === "license") {
      setLicenseDocs(licenseDocs.filter((_, i) => i !== index));
    } else if (type === "plate") {
      setPlateDocs(plateDocs.filter((_, i) => i !== index));
    }
  };

  const handleSimulateDocUpload = (type: "identity" | "license" | "plate") => {
    const defaultImg = "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=100&auto=format&fit=crop&q=80";
    if (type === "identity") {
      setIdentityDocs([...identityDocs, defaultImg]);
    } else if (type === "license") {
      setLicenseDocs([...licenseDocs, defaultImg]);
    } else if (type === "plate") {
      setPlateDocs([...plateDocs, defaultImg]);
    }
  };

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
      {/* -------------------- 1. MAIN RIDER PROFILE -------------------- */}
      {activeScreen === "main" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => router.replace("/(food-rider)/dashboard/index" as any)}>
              <Ionicons name="arrow-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold text-center flex-1">Profile</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Rider profile Avatar card */}
            <View className="bg-white rounded-3xl border border-slate-100 p-6 items-center shadow-sm mb-6">
              <View className="relative mb-3">
                <Image source={{ uri: riderInfo.avatar }} className="w-24 h-24 rounded-full border border-slate-200" />
                <TouchableOpacity className="absolute bottom-0 right-0 bg-brand-orange w-8 h-8 rounded-full items-center justify-center border-2 border-white shadow-sm">
                  <Ionicons name="camera" size={14} color="white" />
                </TouchableOpacity>
              </View>
              <Text className="text-brand-dark text-lg font-bold">{riderInfo.name}</Text>
              <Text className="text-brand-gray text-[10px] font-semibold mt-0.5">{riderInfo.phone}</Text>
            </View>

            {/* Options list */}
            <View className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm mb-6">
              
              {/* Option 1: Personal Information */}
              <TouchableOpacity
                onPress={() => {
                  setFormName(riderInfo.name);
                  setFormPhone(riderInfo.phone);
                  setFormLocation(riderInfo.location);
                  setActiveScreen("personal-info");
                }}
                className="flex-row justify-between items-center py-4 px-2 border-b border-slate-100"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="person" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Personal Information</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#6A7282" />
              </TouchableOpacity>

              {/* Option 2: Vehicles Information */}
              <TouchableOpacity
                onPress={() => {
                  setTempVehicleName(vehicleInfo.name);
                  setTempVehicleType(vehicleInfo.type);
                  setTempVehicleNumber(vehicleInfo.number);
                  setTempExpiry(vehicleInfo.expiryDate);
                  setActiveScreen("vehicle-info");
                }}
                className="flex-row justify-between items-center py-4 px-2 border-b border-slate-100"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="bicycle" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Vehicles Information</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#6A7282" />
              </TouchableOpacity>

              {/* Option 3: My Rating */}
              <TouchableOpacity
                onPress={() => setActiveScreen("ratings")}
                className="flex-row justify-between items-center py-4 px-2 border-b border-slate-100"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="star" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">My Rating</Text>
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

      {/* -------------------- 2. PERSONAL INFORMATION EDIT -------------------- */}
      {activeScreen === "personal-info" && (
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
            <TouchableOpacity onPress={() => setActiveScreen("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Personal Information</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="items-center mb-6">
              <View className="relative">
                <Image source={{ uri: riderInfo.avatar }} className="w-24 h-24 rounded-full border border-slate-200" />
                <TouchableOpacity className="absolute bottom-0 right-0 bg-brand-orange w-8 h-8 rounded-full items-center justify-center border-2 border-white shadow-sm">
                  <Ionicons name="camera" size={14} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Inputs */}
            <View className="gap-5 mb-8">
              <View>
                <Text className="text-brand-dark text-xs font-bold mb-1.5">Name</Text>
                <View className="flex-row items-center border border-slate-200 rounded-xl px-3 bg-slate-50">
                  <TextInput
                    value={formName}
                    onChangeText={setFormName}
                    placeholder="Enter full name"
                    className="flex-1 py-3 text-xs text-brand-dark"
                  />
                </View>
              </View>

              <View>
                <Text className="text-brand-dark text-xs font-bold mb-1.5">Change Phone Number</Text>
                <View className="flex-row items-center border border-slate-200 rounded-xl px-3 bg-slate-50">
                  <TextInput
                    value={formPhone}
                    onChangeText={setFormPhone}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                    className="flex-1 py-3 text-xs text-brand-dark"
                  />
                </View>
              </View>

              <View>
                <Text className="text-brand-dark text-xs font-bold mb-1.5">Your Location</Text>
                <View className="flex-row items-start border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50">
                  <TextInput
                    value={formLocation}
                    onChangeText={setFormLocation}
                    placeholder="Enter location"
                    multiline
                    numberOfLines={3}
                    className="flex-1 text-xs text-brand-dark min-h-[70px]"
                  />
                </View>
              </View>
            </View>

            {/* Change password link */}
            <TouchableOpacity
              onPress={() => {
                setOldPassword("");
                setNewPassword("");
                setCurrentPassword("");
                setActiveScreen("change-password");
              }}
              className="flex-row items-center gap-1.5 mb-12"
            >
              <Text className="text-brand-orange text-xs font-bold">Change Password</Text>
              <Ionicons name="chevron-forward" size={12} color="#E4792F" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSavePersonalInfo}
              className="bg-brand-orange py-4 rounded-2xl items-center shadow-md mb-6"
            >
              <Text className="text-white font-bold text-xs">Save Change</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 3. CHANGE PASSWORD -------------------- */}
      {activeScreen === "change-password" && (
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
            <TouchableOpacity onPress={() => setActiveScreen("personal-info")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Personal Information</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="items-center mb-6">
              <Image source={{ uri: riderInfo.avatar }} className="w-24 h-24 rounded-full border border-slate-200" />
            </View>

            <View className="gap-5 mb-12">
              <View>
                <Text className="text-brand-dark text-xs font-bold mb-1.5">Old Password</Text>
                <View className="flex-row items-center border border-slate-200 rounded-xl px-3 bg-slate-50">
                  <TextInput
                    value={oldPassword}
                    onChangeText={setOldPassword}
                    placeholder="*******"
                    secureTextEntry={!showOldPass}
                    className="flex-1 py-3 text-xs text-brand-dark"
                  />
                  <TouchableOpacity onPress={() => setShowOldPass(!showOldPass)}>
                    <Ionicons name={showOldPass ? "eye" : "eye-off"} size={16} color="#6A7282" />
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <Text className="text-brand-dark text-xs font-bold mb-1.5">New Password</Text>
                <View className="flex-row items-center border border-slate-200 rounded-xl px-3 bg-slate-50">
                  <TextInput
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="*******"
                    secureTextEntry={!showNewPass}
                    className="flex-1 py-3 text-xs text-brand-dark"
                  />
                  <TouchableOpacity onPress={() => setShowNewPass(!showNewPass)}>
                    <Ionicons name={showNewPass ? "eye" : "eye-off"} size={16} color="#6A7282" />
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <Text className="text-brand-dark text-xs font-bold mb-1.5">Current Password</Text>
                <View className="flex-row items-center border border-slate-200 rounded-xl px-3 bg-slate-50">
                  <TextInput
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    placeholder="*******"
                    secureTextEntry={!showCurrentPass}
                    className="flex-1 py-3 text-xs text-brand-dark"
                  />
                  <TouchableOpacity onPress={() => setShowCurrentPass(!showCurrentPass)}>
                    <Ionicons name={showCurrentPass ? "eye" : "eye-off"} size={16} color="#6A7282" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSavePassword}
              className="bg-brand-orange py-4 rounded-2xl items-center shadow-md mb-6"
            >
              <Text className="text-white font-bold text-xs">Save Change</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 4. VEHICLE INFO OVERVIEW -------------------- */}
      {activeScreen === "vehicle-info" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Vehicle Info</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            
            {/* Active Verified Vehicle details card */}
            <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex-row items-center gap-4 mb-6">
              <View className="bg-orange-500 w-12 h-12 rounded-2xl items-center justify-center">
                <Ionicons name="bicycle" size={26} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-brand-dark text-sm font-bold">{vehicleInfo.name}</Text>
                <Text className="text-brand-gray text-[10px] font-semibold mt-0.5">{vehicleInfo.type}</Text>
              </View>
              <View className="bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-0.5 flex-row items-center gap-1">
                <Ionicons name="checkmark-circle" size={10} color="#10B981" />
                <Text className="text-emerald-500 text-[8px] font-bold">Verified</Text>
              </View>
            </View>

            {/* Documents Grid header with Edit button */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-brand-dark text-xs font-bold">Documents</Text>
              <TouchableOpacity
                onPress={() => setActiveScreen("verify-identity")}
                className="bg-orange-50 p-2 rounded-xl"
              >
                <Ionicons name="create-outline" size={16} color="#E4792F" />
              </TouchableOpacity>
            </View>

            {/* Document Card Grid */}
            <View className="flex-row gap-4 mb-12">
              {[
                { title: "Driving License", img: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=120&auto=format&fit=crop&q=80" },
                { title: "Number Plate", img: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=120&auto=format&fit=crop&q=80" },
                { title: "Passport", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=120&auto=format&fit=crop&q=80" },
              ].map((doc, idx) => (
                <View key={idx} className="flex-1 bg-white border border-slate-100 rounded-3xl p-3 items-center shadow-sm">
                  <Image source={{ uri: doc.img }} className="w-full h-24 rounded-2xl bg-slate-50 mb-2.5" />
                  <Text className="text-brand-dark text-[10px] font-extrabold text-center mb-1">{doc.title}</Text>
                  
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="checkmark-circle" size={10} color="#10B981" />
                    <Text className="text-emerald-500 text-[8px] font-bold">Verified</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 5. VEHICLE REGISTER STEP 1: IDENTITY -------------------- */}
      {activeScreen === "verify-identity" && (
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
            <TouchableOpacity onPress={() => setActiveScreen("vehicle-info")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Verify Identity</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <Text className="text-brand-gray text-xs leading-5 font-medium mb-6 text-center">
              Please upload a clear photo of your National ID or Passport. Upload front and back side.
            </Text>

            {/* Dashed upload box */}
            <TouchableOpacity
              onPress={() => handleSimulateDocUpload("identity")}
              className="border-2 border-dashed border-slate-200 rounded-3xl p-6 items-center justify-center mb-6"
            >
              <Ionicons name="cloud-upload" size={32} color="#E4792F" />
              <Text className="text-brand-dark text-xs font-bold mt-2">Upload Image</Text>
              <Text className="text-brand-gray text-[9px] mt-0.5">JPG, PNG up to 5MB</Text>
            </TouchableOpacity>

            {/* Previews */}
            <View className="flex-row gap-4 mb-12">
              {identityDocs.map((uri, idx) => (
                <View key={idx} className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-200">
                  <Image source={{ uri }} className="w-full h-full" />
                  <TouchableOpacity
                    onPress={() => handleRemoveDoc("identity", idx)}
                    className="absolute top-1 right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center border border-white"
                  >
                    <Ionicons name="close" size={12} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Continue button */}
          <View className="p-6 border-t border-slate-100 bg-white">
            <TouchableOpacity
              onPress={() => setActiveScreen("select-vehicle")}
              className="bg-brand-orange w-full py-4.5 rounded-2xl items-center shadow-md"
            >
              <Text className="text-white font-bold text-xs">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* -------------------- 6. VEHICLE REGISTER STEP 2: CHOOSE VEHICLE -------------------- */}
      {activeScreen === "select-vehicle" && (
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
            <TouchableOpacity onPress={() => setActiveScreen("verify-identity")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Select Vehicles</Text>
            <View className="w-6" />
          </View>

          <View className="flex-1 p-6">
            <Text className="text-brand-dark text-xs font-bold mb-4">Choose your riding vehicles</Text>

            <View className="gap-3 mb-12">
              {[
                { type: "Car", icon: "car-outline" },
                { type: "Bike", icon: "bicycle-outline" },
                { type: "Cycle", icon: "walk-outline" },
              ].map((item) => (
                <TouchableOpacity
                  key={item.type}
                  onPress={() => setTempVehicleType(item.type)}
                  className={`flex-row justify-between items-center p-4 rounded-2xl border ${
                    tempVehicleType === item.type
                      ? "border-brand-orange bg-orange-50/20"
                      : "border-slate-200 bg-slate-55"
                  }`}
                >
                  <View className="flex-row items-center gap-3.5">
                    <Ionicons name={item.icon as any} size={20} color={tempVehicleType === item.type ? "#E4792F" : "#6A7282"} />
                    <Text className={`text-xs font-bold ${tempVehicleType === item.type ? "text-brand-orange" : "text-brand-dark"}`}>
                      {item.type}
                    </Text>
                  </View>
                  <View className={`w-5 h-5 rounded-full border items-center justify-center ${
                    tempVehicleType === item.type ? "border-brand-orange" : "border-slate-300"
                  }`}>
                    {tempVehicleType === item.type && (
                      <View className="w-2.5 h-2.5 rounded-full bg-brand-orange" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Continue button */}
          <View className="p-6 border-t border-slate-100 bg-white">
            <TouchableOpacity
              onPress={() => setActiveScreen("register-vehicle-info")}
              className="bg-brand-orange w-full py-4.5 rounded-2xl items-center shadow-md"
            >
              <Text className="text-white font-bold text-xs">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* -------------------- 7. VEHICLE REGISTER STEP 3: DOCUMENT UPLOADS -------------------- */}
      {activeScreen === "register-vehicle-info" && (
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
            <TouchableOpacity onPress={() => setActiveScreen("select-vehicle")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Vehicles Info</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="gap-5 mb-6">
              <View>
                <Text className="text-brand-dark text-xs font-bold mb-1.5">Vehicle Name</Text>
                <View className="flex-row items-center border border-slate-200 rounded-xl px-3 bg-slate-50">
                  <TextInput
                    value={tempVehicleName}
                    onChangeText={setTempVehicleName}
                    placeholder="Enter vehicle name"
                    className="flex-1 py-3 text-xs text-brand-dark"
                  />
                </View>
              </View>

              <View>
                <Text className="text-brand-dark text-xs font-bold mb-1.5">Vehicle Number</Text>
                <View className="flex-row items-center border border-slate-200 rounded-xl px-3 bg-slate-50">
                  <TextInput
                    value={tempVehicleNumber}
                    onChangeText={setTempVehicleNumber}
                    placeholder="Enter vehicle number"
                    className="flex-1 py-3 text-xs text-brand-dark"
                  />
                </View>
              </View>
            </View>

            <Text className="text-brand-gray text-[10px] leading-4 font-semibold mb-4 text-center">
              A valid driving license is mandatory for all riders.
            </Text>

            {/* License Photo Front & Back */}
            <Text className="text-brand-dark text-xs font-bold mb-1.5">Upload License Photo front and back side</Text>
            <TouchableOpacity
              onPress={() => handleSimulateDocUpload("license")}
              className="border border-dashed border-slate-200 rounded-3xl p-5 items-center justify-center mb-4"
            >
              <Ionicons name="cloud-upload-outline" size={24} color="#E4792F" />
              <Text className="text-brand-dark text-[10px] font-bold mt-1">Upload Image</Text>
              <Text className="text-brand-gray text-[8px]">JPG, PNG up to 5MB</Text>
            </TouchableOpacity>

            <View className="flex-row gap-3 mb-5">
              {licenseDocs.map((uri, idx) => (
                <View key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200">
                  <Image source={{ uri }} className="w-full h-full" />
                  <TouchableOpacity
                    onPress={() => handleRemoveDoc("license", idx)}
                    className="absolute top-0.5 right-0.5 bg-red-500 rounded-full w-4.5 h-4.5 items-center justify-center border border-white"
                  >
                    <Ionicons name="close" size={10} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Expiry Date */}
            <View className="mb-5">
              <Text className="text-brand-dark text-xs font-bold mb-1.5">Expire Date</Text>
              <View className="flex-row items-center border border-slate-200 rounded-xl px-3 bg-slate-50">
                <TextInput
                  value={tempExpiry}
                  onChangeText={setTempExpiry}
                  placeholder="mm/dd/yyyy"
                  className="flex-1 py-3 text-xs text-brand-dark"
                />
                <Ionicons name="calendar-outline" size={16} color="#6A7282" />
              </View>
            </View>

            {/* Number Plate Photo */}
            <Text className="text-brand-dark text-xs font-bold mb-1.5">Upload number plate photo</Text>
            <TouchableOpacity
              onPress={() => handleSimulateDocUpload("plate")}
              className="border border-dashed border-slate-200 rounded-3xl p-5 items-center justify-center mb-4"
            >
              <Ionicons name="cloud-upload-outline" size={24} color="#E4792F" />
              <Text className="text-brand-dark text-[10px] font-bold mt-1">Upload Image</Text>
              <Text className="text-brand-gray text-[8px]">JPG, PNG up to 5MB</Text>
            </TouchableOpacity>

            <View className="flex-row gap-3 mb-12">
              {plateDocs.map((uri, idx) => (
                <View key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200">
                  <Image source={{ uri }} className="w-full h-full" />
                  <TouchableOpacity
                    onPress={() => handleRemoveDoc("plate", idx)}
                    className="absolute top-0.5 right-0.5 bg-red-500 rounded-full w-4.5 h-4.5 items-center justify-center border border-white"
                  >
                    <Ionicons name="close" size={10} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Confirm button */}
          <View className="p-6 border-t border-slate-100 bg-white">
            <TouchableOpacity
              onPress={handleSaveVehicleInfo}
              className="bg-brand-orange w-full py-4.5 rounded-2xl items-center shadow-md"
            >
              <Text className="text-white font-bold text-xs">Confirm & Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* -------------------- 8. RATINGS & REVIEWS -------------------- */}
      {activeScreen === "ratings" && (
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

            {/* Feedback listing */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-brand-dark text-sm font-bold">Feedback</Text>
              <TouchableOpacity>
                <Text className="text-brand-orange text-[10px] font-bold">View All</Text>
              </TouchableOpacity>
            </View>

            <View className="gap-4 mb-12">
              {reviews.map((rev) => (
                <View key={rev.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                  {/* Author header */}
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

                  {/* Inline reply actions */}
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

      {/* -------------------- 9. TERMS & CONDITIONS -------------------- */}
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
                "Welcome to GoSwift Rides. By using our services, you agree to abide by the terms and conditions outlined below. These terms govern your access to and use of rider platforms and delivery coordination.",
                "Use of GoSwift tools and services, so please review them carefully before proceeding. All listings of active vehicle information and document verification must conform to standards.",
                "GoSwift provides innovative tools designed to enhance food deliveries and order tracking. Our services include live location sharing and support desks.",
                "For lawful, ethical purposes only. You must ensure compliance with applicable laws, including safe driving and valid vehicle certification. GoSwift disclaims liability for any misuse of its tools.",
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

      {/* -------------------- 10. HELP & SUPPORT -------------------- */}
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
                "Welcome to GoSwift Rides. By using our services, you agree to abide by the terms and conditions outlined below. These terms govern your access to and use of rider platforms and delivery coordination.",
                "Use of GoSwift tools and services, so please review them carefully before proceeding. All listings of active vehicle information and document verification must conform to standards.",
                "GoSwift provides innovative tools designed to enhance food deliveries and order tracking. Our services include live location sharing and support desks.",
                "For lawful, ethical purposes only. You must ensure compliance with applicable laws, including safe driving and valid vehicle certification. GoSwift disclaims liability for any misuse of its tools.",
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

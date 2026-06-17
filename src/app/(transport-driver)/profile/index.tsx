import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  reply?: string;
  isReplying?: boolean;
}

export default function TransportDriverProfile() {
  const router = useRouter();

  const [activeScreen, setActiveScreen] = useState<
    | "main"
    | "personal-info"
    | "change-password"
    | "vehicle-info"
    | "verify-identity"
    | "select-vehicles"
    | "vehicles-form"
    | "terms"
    | "help"
    | "reviews"
  >("main");

  // Profile state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [driverName, setDriverName] = useState("Rahim Rehman");
  const [driverPhone, setDriverPhone] = useState("+880 171 234 5678");
  const [driverLocation, setDriverLocation] = useState("Narayanganj, Sadar");

  // Password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  // Vehicle Info state
  const [vehicleName, setVehicleName] = useState("Suzuki Gixxer Monotone");
  const [vehicleType] = useState("Motorcycle");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleExpiry, setVehicleExpiry] = useState("");

  // Upload simulation states
  const [licenseUploaded, setLicenseUploaded] = useState(true);
  const [numberPlateUploaded, setNumberPlateUploaded] = useState(true);
  const [passportUploaded, setPassportUploaded] = useState(true);
  const [identityFrontUploaded, setIdentityFrontUploaded] = useState(false);
  const [identityBackUploaded, setIdentityBackUploaded] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<"Car" | "Bike">("Bike");

  // Form uploads
  const [licenseFrontUploaded, setLicenseFrontUploaded] = useState(false);
  const [platePhotoUploaded, setPlatePhotoUploaded] = useState(false);

  // Reviews
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      name: "Maria Rodriguez",
      rating: 5,
      date: "1 days ago",
      comment:
        "Absolutely amazing experience! The Gallio Pinto was authentic and delicious. The atmosphere is cozy and the staff is incredibly friendly. The presentation was beautiful and every bite...",
    },
    {
      id: "2",
      name: "Esther Howard",
      rating: 4,
      date: "2 days ago",
      comment:
        "Absolutely amazing experience! The Gallio Pinto was authentic and delicious. The atmosphere is cozy and the staff is incredibly friendly. The presentation was beautiful and every bite...",
    },
    {
      id: "3",
      name: "Robert Fox",
      rating: 5,
      date: "2 days ago",
      comment:
        "Absolutely amazing experience! The Gallio Pinto was authentic and delicious. The atmosphere is cozy and the staff is incredibly friendly. The presentation was beautiful and every bite...",
    },
    {
      id: "4",
      name: "Brooklyn Simmons",
      rating: 3,
      date: "2 days ago",
      comment:
        "Absolutely amazing experience! The Gallio Pinto was authentic and delicious. The atmosphere is cozy and the staff is incredibly friendly. The presentation was beautiful...",
    },
  ]);
  const [replyText, setReplyText] = useState("");

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => router.replace("/(auth)/login" as any),
      },
    ]);
  };

  const handleSavePersonalInfo = () => {
    Alert.alert("Success", "Personal information updated.");
    setActiveScreen("main");
  };

  const handleSavePassword = () => {
    if (!oldPassword || !newPassword || !currentPassword) {
      Alert.alert("Error", "All password fields are required.");
      return;
    }
    setOldPassword("");
    setNewPassword("");
    setCurrentPassword("");
    setActiveScreen("personal-info");
    Alert.alert("Success", "Password changed successfully!");
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
      prev.map((r) => (r.id === id ? { ...r, reply: replyText, isReplying: false } : r))
    );
    Alert.alert("Success", "Reply posted.");
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* ==================== 1. MAIN PROFILE ==================== */}
      {activeScreen === "main" && (
        <View className="flex-1">
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => router.replace("/(transport-driver)/dashboard" as any)}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Profile</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Profile Card */}
            <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm items-center mb-6">
              <View className="w-20 h-20 rounded-full overflow-hidden border border-slate-100 bg-[#FFF5F0] items-center justify-center mb-4 relative">
                <Ionicons name="person" size={42} color="#E4792F" />
                <TouchableOpacity className="absolute bottom-0 right-0 bg-white border border-slate-100 w-6 h-6 rounded-full items-center justify-center shadow-sm">
                  <Ionicons name="create" size={12} color="#E4792F" />
                </TouchableOpacity>
              </View>
              <Text className="text-brand-dark text-base font-bold">{driverName}</Text>
              <Text className="text-brand-gray text-xs mt-0.5">+880 OF/GO 0126</Text>
            </View>

            {/* Menu Options */}
            <View className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm mb-6 gap-2">
              <TouchableOpacity
                onPress={() => setActiveScreen("personal-info")}
                className="flex-row justify-between items-center py-3.5 border-b border-slate-50"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="person-outline" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Personal Information</Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#A0AEC0" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveScreen("vehicle-info")}
                className="flex-row justify-between items-center py-3.5 border-b border-slate-50"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="car-sport-outline" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Vehicles Information</Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#A0AEC0" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveScreen("reviews")}
                className="flex-row justify-between items-center py-3.5 border-b border-slate-50"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="star-outline" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">My Rating</Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#A0AEC0" />
              </TouchableOpacity>

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

              <TouchableOpacity
                onPress={() => setActiveScreen("help")}
                className="flex-row justify-between items-center py-3.5 border-b border-slate-50"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="help-circle-outline" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Help & Support</Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#A0AEC0" />
              </TouchableOpacity>

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

            {/* Logout */}
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

      {/* ==================== 2. PERSONAL INFORMATION ==================== */}
      {activeScreen === "personal-info" && (
        <View className="flex-1">
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Personal Information</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Avatar */}
            <View className="items-center mb-6">
              <View className="w-20 h-20 rounded-full bg-[#FFF5F0] border border-slate-100 items-center justify-center relative">
                <Ionicons name="person" size={40} color="#E4792F" />
                <TouchableOpacity className="absolute bottom-0 right-0 bg-white border border-slate-100 w-6 h-6 rounded-full items-center justify-center shadow-sm">
                  <Ionicons name="create" size={12} color="#E4792F" />
                </TouchableOpacity>
              </View>
            </View>

            <View className="gap-4 mb-6">
              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Name</Text>
                <TextInput
                  value={driverName}
                  onChangeText={setDriverName}
                  placeholder="Enter full name"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Change Phone Number</Text>
                <TextInput
                  value={driverPhone}
                  onChangeText={setDriverPhone}
                  placeholder="Enter your phone number"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Your Location</Text>
                <View className="flex-row items-center">
                  <TextInput
                    value={driverLocation}
                    onChangeText={setDriverLocation}
                    placeholder="Enter location"
                    className="flex-1 bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                  />
                  <TouchableOpacity className="ml-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <Ionicons name="locate-outline" size={16} color="#6A7282" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Change Password Link */}
            <TouchableOpacity
              onPress={() => setActiveScreen("change-password")}
              className="flex-row items-center gap-1 mb-6"
            >
              <Text className="text-brand-orange text-xs font-bold">Change Password</Text>
              <Ionicons name="chevron-forward" size={14} color="#E4792F" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSavePersonalInfo}
              className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mb-12"
            >
              <Text className="text-white text-base font-bold">Save Change</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* ==================== 3. CHANGE PASSWORD ==================== */}
      {activeScreen === "change-password" && (
        <View className="flex-1">
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("personal-info")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Personal Information</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="items-center mb-6">
              <View className="w-20 h-20 rounded-full bg-[#FFF5F0] border border-slate-100 items-center justify-center">
                <Ionicons name="person" size={40} color="#E4792F" />
              </View>
            </View>

            <View className="gap-4 mb-6">
              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Old Password</Text>
                <TextInput
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  secureTextEntry
                  placeholder="••••••••"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">New Password</Text>
                <TextInput
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  placeholder="••••••••"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Current Password</Text>
                <TextInput
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry
                  placeholder="••••••••"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs"
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSavePassword}
              className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mb-12"
            >
              <Text className="text-white text-base font-bold">Save Change</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* ==================== 4. VEHICLE INFO ==================== */}
      {activeScreen === "vehicle-info" && (
        <View className="flex-1">
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Vehicle Info</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Vehicle Card */}
            <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-6">
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-brand-orange/10 items-center justify-center">
                    <Ionicons name="bicycle" size={20} color="#E4792F" />
                  </View>
                  <View>
                    <Text className="text-brand-dark text-sm font-bold">{vehicleName}</Text>
                    <Text className="text-brand-gray text-[10px] font-semibold">{vehicleType}</Text>
                  </View>
                </View>
                <View className="bg-emerald-50 px-2.5 py-1 rounded-full flex-row items-center gap-1">
                  <Ionicons name="checkmark-circle" size={12} color="#10B981" />
                  <Text className="text-emerald-500 text-[9px] font-bold">Verified</Text>
                </View>
              </View>

              {/* Documents */}
              <Text className="text-brand-dark text-xs font-bold mb-3">Documents</Text>
              <View className="flex-row gap-3 mb-4">
                {/* Driving License */}
                <View className="flex-1 items-center">
                  <View className="w-full h-20 bg-slate-100 rounded-xl items-center justify-center mb-1.5 border border-slate-200">
                    <Ionicons name="document-text" size={28} color="#A0AEC0" />
                  </View>
                  <Text className="text-brand-dark text-[9px] font-bold">Driving License</Text>
                  <Text className="text-emerald-500 text-[8px] font-bold">Verified</Text>
                </View>

                {/* Number Plate */}
                <View className="flex-1 items-center">
                  <View className="w-full h-20 bg-slate-100 rounded-xl items-center justify-center mb-1.5 border border-slate-200">
                    <Ionicons name="car" size={28} color="#A0AEC0" />
                  </View>
                  <Text className="text-brand-dark text-[9px] font-bold">Number Plate</Text>
                  <Text className="text-emerald-500 text-[8px] font-bold">Verified</Text>
                </View>

                {/* Passport */}
                <View className="flex-1 items-center">
                  <View className="w-full h-20 bg-slate-100 rounded-xl items-center justify-center mb-1.5 border border-slate-200">
                    <Ionicons name="id-card" size={28} color="#A0AEC0" />
                  </View>
                  <Text className="text-brand-dark text-[9px] font-bold">Passport</Text>
                  <Text className="text-emerald-500 text-[8px] font-bold">Verified</Text>
                </View>
              </View>
            </View>

            {/* Action buttons */}
            <View className="gap-3 mb-12">
              <TouchableOpacity
                onPress={() => setActiveScreen("vehicles-form")}
                className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center"
              >
                <Text className="text-white text-base font-bold">Edit Vehicle Info</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveScreen("verify-identity")}
                className="w-full py-4 border border-brand-orange rounded-2xl items-center justify-center"
              >
                <Text className="text-brand-orange text-base font-bold">Verify Identity</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveScreen("select-vehicles")}
                className="w-full py-4 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center"
              >
                <Text className="text-brand-dark text-base font-bold">Select Vehicles</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* ==================== 5. VERIFY IDENTITY ==================== */}
      {activeScreen === "verify-identity" && (
        <View className="flex-1">
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("vehicle-info")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Verify Identity</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <Text className="text-brand-dark text-sm font-bold mb-1">
              Please upload a clear photo of your National ID or Passport.
            </Text>
            <Text className="text-brand-gray text-xs font-semibold mb-6">
              Upload front and back side
            </Text>

            {/* Front side upload */}
            <TouchableOpacity
              onPress={() => setIdentityFrontUploaded(true)}
              className="w-full h-32 border-2 border-dashed border-slate-300 rounded-2xl bg-white items-center justify-center mb-4"
            >
              {identityFrontUploaded ? (
                <View className="items-center">
                  <Ionicons name="checkmark-circle" size={32} color="#10B981" />
                  <Text className="text-emerald-500 text-xs font-bold mt-1">Front uploaded</Text>
                </View>
              ) : (
                <View className="items-center">
                  <Ionicons name="cloud-upload-outline" size={28} color="#A0AEC0" />
                  <Text className="text-brand-dark text-xs font-bold mt-1">Upload Image</Text>
                  <Text className="text-brand-gray text-[9px]">JPG, PNG up to 5MB</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Uploaded thumbnails (simulated) */}
            {identityFrontUploaded && (
              <View className="flex-row gap-2 mb-6">
                <View className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 items-center justify-center relative">
                  <Ionicons name="image" size={20} color="#A0AEC0" />
                  <TouchableOpacity
                    onPress={() => setIdentityFrontUploaded(false)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 items-center justify-center"
                  >
                    <Ionicons name="close" size={10} color="white" />
                  </TouchableOpacity>
                </View>
                <View className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 items-center justify-center relative">
                  <Ionicons name="image" size={20} color="#A0AEC0" />
                  <TouchableOpacity className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 items-center justify-center">
                    <Ionicons name="close" size={10} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <TouchableOpacity
              onPress={() => {
                Alert.alert("Identity Submitted", "Your documents are being reviewed.");
                setActiveScreen("vehicle-info");
              }}
              className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mb-12"
            >
              <Text className="text-white text-base font-bold">Continue</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* ==================== 6. SELECT VEHICLES ==================== */}
      {activeScreen === "select-vehicles" && (
        <View className="flex-1">
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("vehicle-info")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Select Vehicles</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <Text className="text-brand-dark text-sm font-bold mb-6">Choose your riding vehicles</Text>

            <View className="gap-4 mb-8">
              {/* Car Option */}
              <TouchableOpacity
                onPress={() => setSelectedVehicle("Car")}
                className={`flex-row items-center justify-between p-5 rounded-2xl border ${
                  selectedVehicle === "Car"
                    ? "bg-orange-50 border-brand-orange"
                    : "bg-white border-slate-200"
                }`}
              >
                <View className="flex-row items-center gap-3">
                  <Ionicons name="car" size={24} color={selectedVehicle === "Car" ? "#E4792F" : "#6A7282"} />
                  <Text
                    className={`text-sm font-bold ${
                      selectedVehicle === "Car" ? "text-brand-orange" : "text-brand-dark"
                    }`}
                  >
                    Car
                  </Text>
                </View>
                <View
                  className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                    selectedVehicle === "Car" ? "border-brand-orange bg-brand-orange" : "border-slate-300"
                  }`}
                >
                  {selectedVehicle === "Car" && (
                    <Ionicons name="checkmark" size={12} color="white" />
                  )}
                </View>
              </TouchableOpacity>

              {/* Bike Option */}
              <TouchableOpacity
                onPress={() => setSelectedVehicle("Bike")}
                className={`flex-row items-center justify-between p-5 rounded-2xl border ${
                  selectedVehicle === "Bike"
                    ? "bg-orange-50 border-brand-orange"
                    : "bg-white border-slate-200"
                }`}
              >
                <View className="flex-row items-center gap-3">
                  <Ionicons name="bicycle" size={24} color={selectedVehicle === "Bike" ? "#E4792F" : "#6A7282"} />
                  <Text
                    className={`text-sm font-bold ${
                      selectedVehicle === "Bike" ? "text-brand-orange" : "text-brand-dark"
                    }`}
                  >
                    Bike
                  </Text>
                </View>
                <View
                  className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                    selectedVehicle === "Bike" ? "border-brand-orange bg-brand-orange" : "border-slate-300"
                  }`}
                >
                  {selectedVehicle === "Bike" && (
                    <Ionicons name="checkmark" size={12} color="white" />
                  )}
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                Alert.alert("Vehicle Selected", `You selected: ${selectedVehicle}`);
                setActiveScreen("vehicle-info");
              }}
              className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mb-12"
            >
              <Text className="text-white text-base font-bold">Continue</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* ==================== 7. VEHICLES INFO FORM ==================== */}
      {activeScreen === "vehicles-form" && (
        <View className="flex-1">
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("vehicle-info")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Vehicles Info</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="gap-4 mb-6">
              <View className="gap-1.5">
                <Text className="text-xs font-bold text-brand-dark">Vehicle Name</Text>
                <TextInput
                  value={vehicleName}
                  onChangeText={(t) => {/* setVehicleName(t) - for demo keep default */}}
                  placeholder="Enter vehicle name"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-xs font-bold text-brand-dark">Vehicle Number</Text>
                <TextInput
                  value={vehicleNumber}
                  onChangeText={setVehicleNumber}
                  placeholder="Enter vehicle number"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>
            </View>

            <Text className="text-brand-gray text-[10px] font-semibold mb-4">
              A valid driving license is mandatory for all riders.
            </Text>

            {/* License Upload */}
            <Text className="text-xs font-bold text-brand-dark mb-2">
              Upload License Photo front and back side
            </Text>
            <TouchableOpacity
              onPress={() => setLicenseFrontUploaded(true)}
              className="w-full h-28 border-2 border-dashed border-slate-300 rounded-2xl bg-white items-center justify-center mb-3"
            >
              {licenseFrontUploaded ? (
                <View className="items-center">
                  <Ionicons name="checkmark-circle" size={28} color="#10B981" />
                  <Text className="text-emerald-500 text-[10px] font-bold mt-1">Uploaded</Text>
                </View>
              ) : (
                <View className="items-center">
                  <Ionicons name="cloud-upload-outline" size={24} color="#A0AEC0" />
                  <Text className="text-brand-dark text-xs font-bold mt-1">Upload Image</Text>
                  <Text className="text-brand-gray text-[9px]">JPG, PNG up to 5MB</Text>
                </View>
              )}
            </TouchableOpacity>

            {licenseFrontUploaded && (
              <View className="flex-row gap-2 mb-6">
                <View className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 items-center justify-center relative">
                  <Ionicons name="image" size={20} color="#A0AEC0" />
                  <TouchableOpacity
                    onPress={() => setLicenseFrontUploaded(false)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 items-center justify-center"
                  >
                    <Ionicons name="close" size={10} color="white" />
                  </TouchableOpacity>
                </View>
                <View className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 items-center justify-center relative">
                  <Ionicons name="image" size={20} color="#A0AEC0" />
                  <TouchableOpacity className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 items-center justify-center">
                    <Ionicons name="close" size={10} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Expire Date */}
            <View className="gap-1.5 mb-6">
              <Text className="text-xs font-bold text-brand-dark">Expire Date</Text>
              <View className="flex-row items-center">
                <TextInput
                  value={vehicleExpiry}
                  onChangeText={setVehicleExpiry}
                  placeholder="mm/dd/yyyy"
                  className="flex-1 bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
                <TouchableOpacity className="ml-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <Ionicons name="calendar-outline" size={16} color="#6A7282" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Number Plate Upload */}
            <Text className="text-xs font-bold text-brand-dark mb-2">
              Upload number plate photo
            </Text>
            <TouchableOpacity
              onPress={() => setPlatePhotoUploaded(true)}
              className="w-full h-28 border-2 border-dashed border-slate-300 rounded-2xl bg-white items-center justify-center mb-3"
            >
              {platePhotoUploaded ? (
                <View className="items-center">
                  <Ionicons name="checkmark-circle" size={28} color="#10B981" />
                  <Text className="text-emerald-500 text-[10px] font-bold mt-1">Uploaded</Text>
                </View>
              ) : (
                <View className="items-center">
                  <Ionicons name="cloud-upload-outline" size={24} color="#A0AEC0" />
                  <Text className="text-brand-dark text-xs font-bold mt-1">Upload Image</Text>
                  <Text className="text-brand-gray text-[9px]">JPG, PNG up to 5MB</Text>
                </View>
              )}
            </TouchableOpacity>

            {platePhotoUploaded && (
              <View className="flex-row gap-2 mb-6">
                <View className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 items-center justify-center relative">
                  <Ionicons name="image" size={20} color="#A0AEC0" />
                  <TouchableOpacity
                    onPress={() => setPlatePhotoUploaded(false)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 items-center justify-center"
                  >
                    <Ionicons name="close" size={10} color="white" />
                  </TouchableOpacity>
                </View>
                <View className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 items-center justify-center relative">
                  <Ionicons name="image" size={20} color="#A0AEC0" />
                  <TouchableOpacity className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 items-center justify-center">
                    <Ionicons name="close" size={10} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <TouchableOpacity
              onPress={() => {
                Alert.alert("Vehicle Info Saved", "Your vehicle documents have been submitted.");
                setActiveScreen("vehicle-info");
              }}
              className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mb-12"
            >
              <Text className="text-white text-base font-bold">Confirm & Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* ==================== 8. TERMS & CONDITIONS ==================== */}
      {activeScreen === "terms" && (
        <View className="flex-1">
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Terms & Condition</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <Text className="text-brand-dark text-sm font-bold mb-4">Terms and Condition</Text>
            <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm gap-4 mb-12">
              <Text className="text-brand-gray text-[11px] leading-5">
                1. Welcome to Ai. By using our services, you agree to abide by the terms and conditions outlined below. These terms govern your access to and
              </Text>
              <Text className="text-brand-gray text-[11px] leading-5">
                2. use of Ai tools and services, so please review them carefully before proceeding.
              </Text>
              <Text className="text-brand-gray text-[11px] leading-5">
                3. Ai provides innovative tools designed to enhance how you capture and manage voice recordings. Our services include voice-to-text transcription and AI-driven summarization, which are intended
              </Text>
              <Text className="text-brand-gray text-[11px] leading-5">
                4. for lawful, ethical purposes only. You must ensure compliance with applicable laws, including obtaining consent from all participants when recording conversations. CleverTalk disclaims liability for any misuse of its tools.
              </Text>
            </View>
          </ScrollView>
        </View>
      )}

      {/* ==================== 9. HELP & SUPPORT ==================== */}
      {activeScreen === "help" && (
        <View className="flex-1">
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Help & Support</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <Text className="text-brand-dark text-sm font-bold mb-4">Terms and Condition</Text>
            <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm gap-4 mb-6">
              <Text className="text-brand-gray text-[11px] leading-5">
                1. Welcome to Ai. By using our services, you agree to abide by the terms and conditions outlined below. These terms govern your access to and
              </Text>
              <Text className="text-brand-gray text-[11px] leading-5">
                2. use of Ai tools and services, so please review them carefully before proceeding.
              </Text>
              <Text className="text-brand-gray text-[11px] leading-5">
                3. Ai provides innovative tools designed to enhance how you capture and manage voice recordings. Our services include voice-to-text transcription and AI-driven summarization, which are intended
              </Text>
              <Text className="text-brand-gray text-[11px] leading-5">
                4. for lawful, ethical purposes only. You must ensure compliance with applicable laws, including obtaining consent from all participants when recording conversations. CleverTalk disclaims liability for any misuse of its tools.
              </Text>
            </View>

            {/* Admin Phone */}
            <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-12">
              <Text className="text-brand-dark text-xs font-bold mb-1">Admin Phone for support</Text>
              <Text className="text-brand-dark text-sm font-bold mb-4">+8801715551325</Text>

              <TouchableOpacity
                onPress={() => Alert.alert("Email Support", "Opening email to support@goswift.com...")}
                className="flex-row items-center justify-center gap-2 border border-brand-orange py-3 rounded-2xl"
              >
                <Ionicons name="mail-outline" size={16} color="#E4792F" />
                <Text className="text-brand-orange text-xs font-bold">Email Us</Text>
                <View className="bg-brand-orange/10 px-1.5 py-0.5 rounded">
                  <Text className="text-brand-orange text-[9px] font-bold">+1</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* ==================== 10. RATING & REVIEW ==================== */}
      {activeScreen === "reviews" && (
        <View className="flex-1">
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Rating & Review</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Summary Card */}
            <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex-row items-center justify-between mb-6">
              <View className="items-center justify-center w-[30%]">
                <Text className="text-brand-dark text-3xl font-extrabold">4.3</Text>
                <View className="flex-row mt-1 gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Ionicons key={s} name="star" size={10} color={s <= 4 ? "#E4792F" : "#E2E8F0"} />
                  ))}
                </View>
                <Text className="text-brand-gray text-[9px] font-semibold mt-1">24 Ratings</Text>
              </View>

              <View className="flex-1 gap-1 pl-4 border-l border-slate-50">
                {[5, 4, 3, 2, 1].map((stars, idx) => {
                  const widths = ["50%", "25%", "12%", "8%", "5%"];
                  const counts = [12, 6, 3, 2, 1];
                  return (
                    <View key={stars} className="flex-row items-center gap-2">
                      <Text className="text-[9px] text-brand-dark font-bold w-2">{stars}</Text>
                      <Ionicons name="star" size={8} color="#E4792F" />
                      <View className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <View style={{ width: widths[idx] as any }} className="h-full bg-[#E4792F]" />
                      </View>
                      <Text className="text-[8px] text-brand-gray font-semibold w-4 text-right">
                        {counts[idx]}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Feedback header */}
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-brand-dark text-sm font-bold">Feedback</Text>
              <TouchableOpacity>
                <Text className="text-brand-orange text-xs font-bold">View All</Text>
              </TouchableOpacity>
            </View>

            {/* Reviews */}
            <View className="gap-4 mb-12">
              {reviews.map((rev) => (
                <View key={rev.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center gap-2">
                      <View className="w-8 h-8 rounded-full bg-slate-100 items-center justify-center">
                        <Ionicons name="person" size={16} color="#A0AEC0" />
                      </View>
                      <View>
                        <Text className="text-brand-dark text-xs font-bold">{rev.name}</Text>
                        <Text className="text-brand-gray text-[8px] font-semibold">{rev.date}</Text>
                      </View>
                    </View>
                    <View className="flex-row items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Ionicons
                          key={i}
                          name="star"
                          size={10}
                          color={i < rev.rating ? "#E4792F" : "#E2E8F0"}
                        />
                      ))}
                    </View>
                  </View>

                  <Text className="text-brand-dark text-[11px] leading-5 mt-2.5 font-medium">
                    {rev.comment}
                  </Text>

                  {rev.reply && (
                    <View className="bg-slate-50 border border-slate-100 p-3 rounded-2xl mt-3">
                      <Text className="text-brand-orange text-[9px] font-bold">Your Response:</Text>
                      <Text className="text-brand-dark text-[10px] mt-0.5 leading-4 font-semibold">
                        {rev.reply}
                      </Text>
                    </View>
                  )}

                  {!rev.reply && !rev.isReplying && (
                    <TouchableOpacity
                      onPress={() => handleToggleReply(rev.id)}
                      className="mt-2"
                    >
                      <Text className="text-brand-orange text-[10px] font-bold">Reply</Text>
                    </TouchableOpacity>
                  )}

                  {rev.isReplying && (
                    <View className="mt-3 gap-2">
                      <TextInput
                        value={replyText}
                        onChangeText={setReplyText}
                        placeholder="Write here."
                        className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-brand-dark min-h-[50px] text-left"
                        multiline
                      />
                      <View className="flex-row justify-end gap-2">
                        <TouchableOpacity
                          onPress={() => handleToggleReply(rev.id)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                        >
                          <Text className="text-brand-dark text-[10px] font-bold">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleSubmitReply(rev.id)}
                          className="px-3 py-1.5 rounded-lg bg-brand-orange"
                        >
                          <Text className="text-white text-[10px] font-bold">Submit</Text>
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
    </SafeAreaView>
  );
}

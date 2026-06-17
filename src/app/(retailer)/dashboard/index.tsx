import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface OrderItem {
  id: string;
  name: string;
  image: any;
  details: string;
}

interface DeliveryPerson {
  id: string;
  name: string;
  otp: string;
  distance: string;
  duration: string;
  image: any;
}

export default function RetailerDashboard() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);
  const [unreadNotifications, setUnreadNotifications] = useState(1);

  // Mock Orders matching the shirt listings in screenshot
  const newOrders: OrderItem[] = [
    {
      id: "1",
      name: "Checkered Shirt",
      image: require("@/assets/images/onboarding/1.png"), // Reusing existing assets to avoid build breakages
      details: "Size: Medium, Q: 4\nColor: Red, Size: L",
    },
    {
      id: "2",
      name: "Checkered Shirt",
      image: require("@/assets/images/onboarding/1.png"),
      details: "Size: Medium, Q: 4\nColor: Red, Size: L",
    },
    {
      id: "3",
      name: "Checkered Shirt",
      image: require("@/assets/images/onboarding/1.png"),
      details: "Size: Medium, Q: 4\nColor: Red, Size: L",
    },
  ];

  // Mock Delivery driver matching the Török Melinda card in screenshot
  const upcomingDrivers: DeliveryPerson[] = [
    {
      id: "1",
      name: "Török Melinda",
      otp: "664564",
      distance: "28km",
      duration: "10Min",
      image: require("@/assets/images/onboarding/2.png"),
    },
    {
      id: "2",
      name: "Török Melinda",
      otp: "664564",
      distance: "28km",
      duration: "10Min",
      image: require("@/assets/images/onboarding/2.png"),
    },
  ];

  const toggleStatus = () => {
    setIsOnline(!isOnline);
  };

  const handleNotificationPress = () => {
    setUnreadNotifications(0);
    Alert.alert("Notifications", "You have no new alerts.");
  };

  const handleCallDriver = (name: string) => {
    Alert.alert("Contacting Driver", `Calling ${name} at +880 171 234 5678...`);
  };

  const navigateToOrdersTab = () => {
    // Navigate using the tab route
    router.push("/(retailer)/orders" as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* Top Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
        <View className="w-12 h-12" />
        {/* GoSwift Logo */}
        <View className="flex-row items-center gap-1.5">
          <Image
            source={require("@/assets/logo.png")}
            className="w-32 h-10"
            resizeMode="contain"
          />
        </View>
        {/* Notification Bell */}
        <TouchableOpacity onPress={handleNotificationPress} className="relative p-2 rounded-full bg-slate-50">
          <Ionicons name="notifications-outline" size={22} color="#6A7282" />
          {unreadNotifications > 0 && (
            <View className="absolute top-1 right-1 w-4 h-4 rounded-full bg-brand-orange items-center justify-center">
              <Text className="text-white text-[9px] font-bold">1</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-5">
        {/* Store Profile Information Card */}
        <View className="flex-row items-center justify-between bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-6">
          <View className="flex-row items-center gap-4">
            <View className="w-16 h-16 rounded-full overflow-hidden border border-slate-100 bg-[#FFF5F0] items-center justify-center">
              <Ionicons name="basket" size={32} color="#E4792F" />
            </View>
            <View className="justify-center">
              <View className="flex-row items-center gap-1.5">
                <Text className="text-brand-dark text-base font-bold">Bankok Clothing Ltd.</Text>
                <View className="w-4 h-4 rounded-full bg-brand-orange items-center justify-center">
                  <Ionicons name="checkmark" size={10} color="#white" className="text-white font-bold" />
                </View>
              </View>
              <View className="flex-row items-center gap-1 mt-1">
                <Ionicons name="location-sharp" size={14} color="#6A7282" />
                <Text className="text-brand-gray text-xs font-semibold">Narayanganj, Sadar</Text>
              </View>
            </View>
          </View>

          {/* Online/Offline Status Pill Selector */}
          <TouchableOpacity
            onPress={toggleStatus}
            className={`flex-row items-center border rounded-full p-1 w-24 h-9 relative ${
              isOnline ? "border-brand-orange bg-white" : "border-slate-200 bg-white"
            }`}
          >
            {/* Slideable Toggle Background */}
            <View
              className={`absolute top-[3px] bottom-[3px] rounded-full w-[44px] ${
                isOnline ? "left-[3px] bg-emerald-500" : "right-[3px] bg-slate-300"
              }`}
            />
            {/* Text options */}
            <View className="flex-1 flex-row justify-between px-2.5 z-10">
              <Text className={`text-[10px] font-bold ${isOnline ? "text-white" : "text-slate-400"}`}>
                Online
              </Text>
              <Text className={`text-[10px] font-bold ${!isOnline ? "text-slate-600" : "text-slate-400"}`}>
                Offline
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Section: New Order */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-brand-dark text-base font-bold">New Order</Text>
            <TouchableOpacity onPress={navigateToOrdersTab}>
              <Text className="text-brand-orange text-xs font-bold">View All</Text>
            </TouchableOpacity>
          </View>

          {/* Orders Listing matching mockup */}
          <View className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden px-4">
            {newOrders.map((order, idx) => (
              <View
                key={order.id}
                className={`flex-row py-4 items-center ${
                  idx < newOrders.length - 1 ? "border-b border-slate-50" : ""
                }`}
              >
                {/* Item Thumbnail */}
                <View className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden items-center justify-center p-2 mr-4">
                  <Image source={order.image} className="w-full h-full" resizeMode="contain" />
                </View>
                {/* Details */}
                <View className="flex-1">
                  <Text className="text-brand-dark text-sm font-bold">{order.name}</Text>
                  <Text className="text-brand-gray text-[11px] font-semibold leading-4 mt-1">
                    {order.details}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Section: Upcoming Delivery Person */}
        <View className="mb-12">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-brand-dark text-base font-bold">Upcoming Delivery Person</Text>
            <TouchableOpacity onPress={navigateToOrdersTab}>
              <Text className="text-brand-orange text-xs font-bold">View All</Text>
            </TouchableOpacity>
          </View>

          {/* Delivery list cards */}
          <View className="gap-4">
            {upcomingDrivers.map((driver) => (
              <View
                key={driver.id}
                className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex-row items-center justify-between"
              >
                <View className="flex-row items-center gap-4">
                  {/* Photo */}
                  <View className="w-14 h-14 rounded-2xl bg-[#E6F4FE] overflow-hidden items-center justify-center border border-slate-50">
                    <Ionicons name="person" size={28} color="#208AEF" />
                  </View>
                  <View>
                    <Text className="text-brand-dark text-sm font-bold">{driver.name}</Text>
                    <Text className="text-brand-gray text-[11px] font-semibold mt-1">
                      OTP: <Text className="text-brand-orange">{driver.otp}</Text>
                    </Text>
                    <View className="flex-row items-center gap-1.5 mt-2">
                      <Ionicons name="navigate-outline" size={12} color="#10B981" />
                      <Text className="text-emerald-500 text-[10px] font-bold">
                        {driver.distance} <Text className="text-slate-400 font-semibold">({driver.duration})</Text>
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Call Button */}
                <TouchableOpacity
                  onPress={() => handleCallDriver(driver.name)}
                  className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 items-center justify-center shadow-sm"
                >
                  <Ionicons name="call" size={16} color="#E4792F" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function RiderProfile() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);

  const [riderInfo] = useState({
    name: "Rahim Rehman",
    id: "RIDER-9921",
    vehicle: "Suzuki Gixxer 155cc (Black)",
    plateNumber: "DHAKA METRO-LA-12-3456",
    rating: "4.9",
    totalDeliveries: "1,248",
    activeShift: "08:00 AM - 08:00 PM",
  });

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100 shadow-sm">
        <Text className="text-brand-dark text-base font-bold text-center flex-1">Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
        {/* Profile Card */}
        <View className="bg-white rounded-3xl border border-slate-100 p-6 items-center shadow-sm mb-6">
          <View className="relative mb-3">
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" }}
              className="w-24 h-24 rounded-full border border-slate-200"
            />
            <View className="absolute bottom-0 right-0 bg-emerald-500 w-6 h-6 rounded-full items-center justify-center border-2 border-white shadow-sm">
              <View className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </View>
          </View>
          <Text className="text-brand-dark text-lg font-bold">{riderInfo.name}</Text>
          <Text className="text-brand-gray text-[10px] font-semibold mt-0.5">ID: {riderInfo.id}</Text>

          {/* Quick stats grid */}
          <View className="flex-row mt-5 pt-5 border-t border-slate-50 w-full justify-around">
            <View className="items-center">
              <View className="flex-row items-center gap-1">
                <Ionicons name="star" size={13} color="#E4792F" />
                <Text className="text-brand-dark text-xs font-black">{riderInfo.rating}</Text>
              </View>
              <Text className="text-brand-gray text-[8px] font-bold mt-0.5">Rating</Text>
            </View>

            <View className="items-center">
              <Text className="text-brand-dark text-xs font-black">{riderInfo.totalDeliveries}</Text>
              <Text className="text-brand-gray text-[8px] font-bold mt-0.5">Deliveries</Text>
            </View>

            <View className="items-center">
              <Text className="text-brand-dark text-xs font-black">Active</Text>
              <Text className="text-brand-gray text-[8px] font-bold mt-0.5">Status</Text>
            </View>
          </View>
        </View>

        {/* Vehicle Information */}
        <View className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm mb-6">
          <Text className="text-brand-dark text-xs font-extrabold mb-4">Vehicle Details</Text>

          <View className="flex-row items-center gap-3.5 pb-3.5 border-b border-slate-50">
            <View className="bg-orange-50 p-2 rounded-xl">
              <Ionicons name="bicycle" size={18} color="#E4792F" />
            </View>
            <View>
              <Text className="text-brand-gray text-[9px] font-semibold">Vehicle Type & Model</Text>
              <Text className="text-brand-dark text-xs font-bold mt-0.5">{riderInfo.vehicle}</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3.5 pt-3.5">
            <View className="bg-orange-50 p-2 rounded-xl">
              <Ionicons name="card" size={18} color="#E4792F" />
            </View>
            <View>
              <Text className="text-brand-gray text-[9px] font-semibold">License Plate Number</Text>
              <Text className="text-brand-dark text-xs font-bold mt-0.5">{riderInfo.plateNumber}</Text>
            </View>
          </View>
        </View>

        {/* Settings & Configurations */}
        <View className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm mb-6">
          {/* Shift Details */}
          <View className="flex-row justify-between items-center py-3.5 px-2 border-b border-slate-100">
            <View className="flex-row items-center gap-3">
              <View className="bg-orange-50 p-2 rounded-xl">
                <Ionicons name="time" size={18} color="#E4792F" />
              </View>
              <View>
                <Text className="text-brand-dark text-xs font-bold">Shift Timings</Text>
                <Text className="text-brand-gray text-[9px] mt-0.5">{riderInfo.activeShift}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={14} color="#A0AEC0" />
          </View>

          {/* Push Notifications Switch */}
          <View className="flex-row justify-between items-center py-3.5 px-2 border-b border-slate-100">
            <View className="flex-row items-center gap-3">
              <View className="bg-orange-50 p-2 rounded-xl">
                <Ionicons name="notifications" size={18} color="#E4792F" />
              </View>
              <Text className="text-brand-dark text-xs font-bold">Push Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#E2E8F0", true: "#fbd38d" }}
              thumbColor={notificationsEnabled ? "#E4792F" : "#A0AEC0"}
            />
          </View>

          {/* Live Location Switch */}
          <View className="flex-row justify-between items-center py-3.5 px-2 border-b border-slate-100">
            <View className="flex-row items-center gap-3">
              <View className="bg-orange-50 p-2 rounded-xl">
                <Ionicons name="location" size={18} color="#E4792F" />
              </View>
              <Text className="text-brand-dark text-xs font-bold">Live Location Sharing</Text>
            </View>
            <Switch
              value={locationSharing}
              onValueChange={setLocationSharing}
              trackColor={{ false: "#E2E8F0", true: "#fbd38d" }}
              thumbColor={locationSharing ? "#E4792F" : "#A0AEC0"}
            />
          </View>

          {/* Help & Support */}
          <TouchableOpacity
            onPress={() => Alert.alert("Support", "Opening help desk support logs...")}
            className="flex-row justify-between items-center py-3.5 px-2 border-b border-slate-100"
          >
            <View className="flex-row items-center gap-3">
              <View className="bg-orange-50 p-2 rounded-xl">
                <Ionicons name="help-circle" size={18} color="#E4792F" />
              </View>
              <Text className="text-brand-dark text-xs font-bold">Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={14} color="#A0AEC0" />
          </TouchableOpacity>

          {/* Terms & Conditions */}
          <TouchableOpacity
            onPress={() => Alert.alert("Legal Docs", "Opening terms of service agreements...")}
            className="flex-row justify-between items-center py-3.5 px-2"
          >
            <View className="flex-row items-center gap-3">
              <View className="bg-orange-50 p-2 rounded-xl">
                <Ionicons name="document-text" size={18} color="#E4792F" />
              </View>
              <Text className="text-brand-dark text-xs font-bold">Terms of Service</Text>
            </View>
            <Ionicons name="chevron-forward" size={14} color="#A0AEC0" />
          </TouchableOpacity>
        </View>

        {/* Log out CTA */}
        <TouchableOpacity
          onPress={() => Alert.alert("Log Out", "Are you sure you want to log out from GoSwift?")}
          className="bg-red-50 border border-red-100 rounded-2xl py-4 flex-row items-center justify-center gap-2 mb-12"
        >
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text className="text-red-500 font-bold text-xs">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

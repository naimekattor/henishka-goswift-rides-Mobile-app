import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function RetailerProfile() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

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

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
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
          <View className="w-20 h-20 rounded-full overflow-hidden border border-slate-100 bg-[#FFF5F0] items-center justify-center mb-4">
            <Ionicons name="basket" size={42} color="#E4792F" />
          </View>
          <Text className="text-brand-dark text-base font-bold">Bankok Clothing Ltd.</Text>
          <Text className="text-brand-gray text-xs mt-1">+880 171 234 5678</Text>
        </View>

        {/* Options List */}
        <View className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm mb-6 gap-2">
          {/* Notifications Toggle */}
          <View className="flex-row justify-between items-center py-3 border-b border-slate-50">
            <View className="flex-row items-center gap-3">
              <View className="bg-orange-50 p-2 rounded-xl">
                <Ionicons name="notifications" size={18} color="#E4792F" />
              </View>
              <Text className="text-brand-dark text-xs font-bold">Notifications</Text>
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
            onPress={() => Alert.alert("Help & Support", "Opening customer help desk...")}
            className="flex-row justify-between items-center py-3 border-b border-slate-50"
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
            onPress={() => Alert.alert("Terms & Conditions", "Opening terms agreement...")}
            className="flex-row justify-between items-center py-3"
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

        {/* Log Out Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-50 border border-red-100 rounded-3xl py-4 flex-row items-center justify-center gap-2 mb-12"
        >
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text className="text-red-500 font-bold text-xs">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

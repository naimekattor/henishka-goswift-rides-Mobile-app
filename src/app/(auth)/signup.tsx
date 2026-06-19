import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface RoleOption {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
}

const ROLES: RoleOption[] = [
  {
    id: "customer",
    title: "Customer",
    description: "Order delicious meals, book instant rides, or rent your dream car—all in one place.",
    icon: "people-outline",
    route: "/(auth)/customer-signup",
  },
  {
    id: "restaurant",
    title: "Restaurant Partner",
    description: "Put your kitchen on the map, manage your menu, and reach thousands of hungry customers.",
    icon: "storefront-outline",
    route: "/(onboarding)/restaurant-onboarding",
  },
  {
    id: "delivery",
    title: "Delivery Partner",
    description: "Deliver fresh food to the community and earn on your own schedule. Your journey, your income.",
    icon: "bicycle-outline",
    route: "/(onboarding)/delivery-onboarding",
  },
  {
    id: "ride",
    title: "Ride Partner",
    description: "Drive people to their destinations safely and boost your daily earnings as a professional driver.",
    icon: "car-sport-outline",
    route: "/(onboarding)/ride-onboarding",
  },
  {
    id: "fleet",
    title: "Fleet Partner",
    description: "List your vehicles, manage bookings, and grow your rental business with ease.",
    icon: "car-outline",
    route: "/(onboarding)/fleet-onboarding",
  },
  {
    id: "retail",
    title: "Retail Partner",
    description: "Showcase your products to the world, manage sales, and expand your store's digital reach.",
    icon: "basket-outline",
    route: "/(onboarding)/retail-onboarding",
  },
];

export default function SignUpScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>("customer"); // Default to Customer matching the first active role in mockup

  const handleRoleSelect = (role: RoleOption) => {
    setSelectedRole(role.id);
    if (role.id === "restaurant" || role.id === "customer") {
      router.push(role.route as any);
    } else if (role.id === "fleet") {
      router.push("/(car-rental)/dashboard" as any);
    } else if (role.id === "ride") {
      router.push("/(transport-driver)/dashboard" as any);
    } else if (role.id === "delivery") {
      router.push("/(food-rider)/dashboard" as any);
    } else {
      alert(`${role.title} onboarding is coming soon! Only Customer and Restaurant Partner are active in this demo.`);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* Top Header with Back Button */}
      <View className="flex-row items-center px-6 pt-2 h-14">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center bg-white shadow-sm"
        >
          <Ionicons name="chevron-back" size={20} color="#6A7282" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 flex-1">
          {/* Logo Container */}
          <View className="items-center justify-center pt-2 pb-6">
            <Image
              source={require("@/assets/logo.png")}
              className="w-44 h-22"
              resizeMode="contain"
            />
          </View>

          {/* Header Text */}
          <View className="items-center mb-8 px-4">
            <Text className="text-brand-dark text-xl font-bold text-center leading-7">
              Choose How You Want to{"\n"}Use <Text className="text-brand-orange">Goswift Rides</Text>
            </Text>
          </View>

          {/* Roles List */}
          <View className="gap-4 pb-12">
            {ROLES.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <TouchableOpacity
                  key={role.id}
                  onPress={() => handleRoleSelect(role)}
                  activeOpacity={0.9}
                  className={`p-6 rounded-2xl border ${
                    isSelected
                      ? "bg-brand-orange border-transparent"
                      : "bg-white border-gray-200"
                  }`}
                  style={isSelected ? {
                    shadowColor: '#E4792F',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                    elevation: 3
                  } : undefined}
                >
                  {/* Top Row: Icon + Title */}
                  <View className="flex-row items-center gap-3 mb-2">
                    <Ionicons
                      name={role.icon}
                      size={24}
                      color={isSelected ? "white" : "#E4792F"}
                    />
                    <Text
                      className={`text-lg font-bold ${
                        isSelected ? "text-white" : "text-brand-dark"
                      }`}
                    >
                      {role.title}
                    </Text>
                  </View>

                  {/* Description */}
                  <Text
                    className="text-sm leading-5"
                    style={isSelected ? { color: 'rgba(255, 255, 255, 0.9)' } : { color: '#6A7282' }}
                  >
                    {role.description}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

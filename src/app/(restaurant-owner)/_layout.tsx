import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

export default function RestaurantOwnerLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#E4792F",
        tabBarInactiveTintColor: "#6A7282",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#E2E8F0",
          height: Platform.OS === "ios" ? 88 : 64,
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
          paddingTop: 10,
          elevation: 8,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="dashboard/index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "grid" : "grid-outline"} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders/index"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "restaurant" : "restaurant-outline"} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu/index"
        options={{
          title: "Menu",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "menu" : "menu-outline"} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="earnings/index"
        options={{
          title: "Earnings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "cash" : "cash-outline"} size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

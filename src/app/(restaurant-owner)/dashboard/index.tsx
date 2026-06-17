import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function RestaurantDashboard() {
  const [isOnline, setIsOnline] = useState(true);

  // Mock KPIs
  const kpis = [
    { title: "Today's Sales", value: "$482.90", icon: "cash-outline", change: "+12.4%", trend: "up" },
    { title: "Active Orders", value: "5", icon: "time-outline", change: "2 pending", trend: "neutral" },
    { title: "Store Rating", value: "4.8 ★", icon: "star-outline", change: "124 reviews", trend: "up" },
    { title: "Lifetime Payout", value: "$3,450", icon: "wallet-outline", change: "Completed", trend: "none" },
  ];

  // Mock recent orders
  const recentOrders = [
    { id: "GS-4089", items: "2x Classic Cheeseburger, 1x Fries", time: "5 mins ago", status: "New", price: "$24.50" },
    { id: "GS-4088", items: "1x Pepperoni Pizza (Large), 2x Coke", time: "12 mins ago", status: "Preparing", price: "$18.20" },
    { id: "GS-4087", items: "3x Chicken Wings, 1x Garlic Bread", time: "28 mins ago", status: "Ready", price: "$32.90" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* Top Header */}
      <View className="bg-white border-b border-gray-100 px-6 py-4 flex-row justify-between items-center shadow-sm">
        <View>
          <Text className="text-brand-gray text-xs">Welcome Back</Text>
          <Text className="text-brand-dark text-lg font-bold">Gourmet Hub</Text>
        </View>

        {/* Online / Offline switch */}
        <TouchableOpacity
          onPress={() => setIsOnline(!isOnline)}
          activeOpacity={0.8}
          className={`flex-row items-center gap-2 px-3 py-1.5 rounded-full border ${
            isOnline ? "bg-green-50 border-green-200" : "bg-gray-100 border-gray-200"
          }`}
        >
          <View className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`} />
          <Text className={`text-xs font-bold ${isOnline ? "text-green-700" : "text-gray-500"}`}>
            {isOnline ? "Online" : "Offline"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-6 py-4 flex-1">
        {/* KPI Grid */}
        <View className="flex-row flex-wrap justify-between gap-3 mb-6">
          {kpis.map((kpi, idx) => (
            <View key={idx} style={{ width: "47%" }} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
              <View className="flex-row justify-between items-center mb-2">
                <Ionicons name={kpi.icon as any} size={20} color="#E4792F" />
                {kpi.trend === "up" && (
                  <Text className="text-green-600 text-[10px] font-bold bg-green-50 px-1.5 py-0.5 rounded">
                    {kpi.change}
                  </Text>
                )}
                {kpi.trend === "neutral" && (
                  <Text className="text-amber-600 text-[10px] font-bold bg-amber-50 px-1.5 py-0.5 rounded">
                    {kpi.change}
                  </Text>
                )}
                {kpi.trend === "none" && (
                  <Text className="text-brand-gray text-[10px] font-bold bg-gray-50 px-1.5 py-0.5 rounded">
                    {kpi.change}
                  </Text>
                )}
              </View>
              <Text className="text-brand-gray text-xs font-medium">{kpi.title}</Text>
              <Text className="text-brand-dark text-lg font-bold mt-0.5">{kpi.value}</Text>
            </View>
          ))}
        </View>

        {/* Charts Mockup */}
        <View className="bg-white border border-gray-100 rounded-2xl p-4 mb-6 shadow-sm">
          <Text className="text-brand-dark text-sm font-bold mb-3">Today's Hourly Sales</Text>
          <View className="flex-row justify-between items-end h-28 pt-2">
            {[40, 20, 60, 80, 50, 90, 70, 85].map((val, idx) => (
              <View key={idx} className="items-center flex-1">
                <View
                  style={{ height: `${val}%` }}
                  className={`w-4 rounded-t-md ${
                    idx === 5 ? "bg-brand-orange" : "bg-brand-orange/40"
                  }`}
                />
                <Text className="text-[9px] text-brand-gray mt-1.5">{idx + 9}h</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Orders List */}
        <View className="bg-white border border-gray-100 rounded-2xl p-4 mb-10 shadow-sm">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-brand-dark text-sm font-bold">Recent Orders</Text>
            <TouchableOpacity>
              <Text className="text-brand-orange text-xs font-bold">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-3">
            {recentOrders.map((order) => (
              <View key={order.id} className="flex-row justify-between items-center py-2.5 border-b border-gray-50 last:border-b-0">
                <View className="flex-1 mr-3">
                  <View className="flex-row items-center gap-2 mb-1">
                    <Text className="text-brand-dark text-sm font-bold">{order.id}</Text>
                    <Text className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      order.status === "New" ? "bg-brand-orange/10 text-brand-orange" :
                      order.status === "Preparing" ? "bg-amber-100 text-amber-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {order.status}
                    </Text>
                  </View>
                  <Text className="text-brand-gray text-xs" numberOfLines={1}>
                    {order.items}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-brand-dark text-sm font-bold">{order.price}</Text>
                  <Text className="text-brand-gray text-[10px] mt-0.5">{order.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

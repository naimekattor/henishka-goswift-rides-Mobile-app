import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

interface Order {
  id: string;
  customer: string;
  itemsCount: number;
  time: string;
  status: "Preparing" | "Ready" | "Completed";
  orderNum: string;
}

export default function RestaurantDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [activeMenuOrderId, setActiveMenuOrderId] = useState<string | null>(null);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      customer: "Rahim Rehman",
      itemsCount: 2,
      time: "12 Feb · 8:30 PM",
      status: "Preparing",
      orderNum: "#2043",
    },
    {
      id: "2",
      customer: "Rahim Rehman",
      itemsCount: 2,
      time: "12 Feb · 8:30 PM",
      status: "Ready",
      orderNum: "#2043",
    },
    {
      id: "3",
      customer: "Rahim Rehman",
      itemsCount: 2,
      time: "12 Feb · 8:30 PM",
      status: "Completed",
      orderNum: "#2043",
    },
  ]);

  const updateStatus = (orderId: string, newStatus: "Preparing" | "Ready" | "Completed") => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
    setActiveMenuOrderId(null);
  };

  const getStatusStyle = (status: "Preparing" | "Ready" | "Completed") => {
    switch (status) {
      case "Preparing":
        return {
          bg: "bg-[#FFF8E6]",
          text: "text-[#FFB020]",
        };
      case "Ready":
        return {
          bg: "bg-[#FFF0EB]",
          text: "text-[#FF5C35]",
        };
      case "Completed":
        return {
          bg: "bg-[#E6F4EA]",
          text: "text-[#137333]",
        };
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Brand Header */}
        <View className="items-center pt-4 pb-2 bg-white">
          <View className="flex-row items-center gap-1.5">
            {/* Custom stylized GoSwift horn logo */}
            <View className="flex-row items-end">
              <View className="w-5 h-5 bg-[#E4792F] rounded-tr-[15px] rounded-bl-[15px] rotate-[15deg] mr-0.5" />
              <View className="w-3 h-3 bg-[#E4792F]/60 rounded-tr-[10px] rounded-bl-[10px] rotate-[15deg]" />
            </View>
            <Text className="text-brand-dark text-xl font-extrabold tracking-tight">
              <Text className="text-[#2E2E2D]">Goswift</Text>{" "}
              <Text className="text-[#E4792F]">Rides</Text>
            </Text>
          </View>
        </View>

        {/* Profile and Switch section */}
        <View className="bg-white px-6 py-4 flex-row justify-between items-center border-b border-gray-100">
          <View className="flex-row items-center gap-3">
            {/* Restaurant Avatar */}
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150&auto=format&fit=crop&q=80",
              }}
              className="w-16 h-16 rounded-full border border-gray-100"
            />
            <View>
              <View className="flex-row items-center gap-1">
                <Text className="text-brand-dark text-lg font-bold">Sakura Garden</Text>
                <Ionicons name="checkmark-circle" size={16} color="#E4792F" />
              </View>
              <Text className="text-brand-gray text-xs font-semibold mt-0.5">
                Restaurant ID : #RG456
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3">
            {/* Status Toggle Switch */}
            <TouchableOpacity
              onPress={() => setIsOnline(!isOnline)}
              activeOpacity={0.9}
              className="flex-row items-center bg-gray-50 border border-gray-200 rounded-full p-0.5 w-[110px]"
            >
              <View
                className={`flex-1 py-1 rounded-full items-center justify-center ${
                  isOnline ? "bg-[#10B981]" : "bg-transparent"
                }`}
              >
                <Text
                  className={`text-[9px] font-bold ${isOnline ? "text-white" : "text-brand-gray"}`}
                >
                  Online
                </Text>
              </View>
              <View
                className={`flex-1 py-1 rounded-full items-center justify-center ${
                  !isOnline ? "bg-brand-gray" : "bg-transparent"
                }`}
              >
                <Text
                  className={`text-[9px] font-bold ${!isOnline ? "text-white" : "text-brand-gray"}`}
                >
                  Offline
                </Text>
              </View>
            </TouchableOpacity>

            {/* Notification Bell */}
            <TouchableOpacity className="relative p-1.5 rounded-full bg-gray-50 border border-gray-200">
              <Ionicons name="notifications-outline" size={20} color="#2E2E2D" />
              <View className="absolute top-1 right-1 bg-[#E4792F] w-4.5 h-4.5 rounded-full items-center justify-center border border-white">
                <Text className="text-white text-[8px] font-bold">1</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View className="p-6">
          {/* Overview Card */}
          <View className="bg-[#A34E24] rounded-3xl p-5 mb-6 shadow-sm">
            <Text className="text-white text-base font-bold mb-4">Overview</Text>
            <View className="flex-row justify-between items-center">
              {/* Revenue */}
              <View className="flex-1 items-center">
                <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center mb-2">
                  <Ionicons name="logo-usd" size={18} color="white" />
                </View>
                <Text className="text-white/80 text-[10px] font-medium text-center">
                  Revenue Today
                </Text>
                <Text className="text-white text-sm font-bold mt-1 text-center">1,200 USD</Text>
              </View>

              {/* Divider */}
              <View className="h-10 w-[1px] bg-white/20" />

              {/* Order */}
              <View className="flex-1 items-center">
                <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center mb-2">
                  <Ionicons name="bag-handle" size={18} color="white" />
                </View>
                <Text className="text-white/80 text-[10px] font-medium text-center">
                  Order Today
                </Text>
                <Text className="text-white text-sm font-bold mt-1 text-center">42</Text>
              </View>

              {/* Divider */}
              <View className="h-10 w-[1px] bg-white/20" />

              {/* Rating */}
              <View className="flex-1 items-center">
                <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center mb-2">
                  <Ionicons name="star" size={18} color="white" />
                </View>
                <Text className="text-white/80 text-[10px] font-medium text-center">Rating</Text>
                <Text className="text-white text-sm font-bold mt-1 text-center">4.8(128)</Text>
              </View>
            </View>
          </View>

          {/* Recent Orders Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-brand-dark text-base font-bold">Recent Order</Text>
            <TouchableOpacity>
              <Text className="text-[#E4792F] text-xs font-bold">View All</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Orders List */}
          <View className="gap-4">
            {orders.map((order) => {
              const statusStyle = getStatusStyle(order.status);
              return (
                <View
                  key={order.id}
                  className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm relative"
                >
                  <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center gap-2">
                      <Text className="text-brand-dark text-base font-bold">
                        {order.customer}
                      </Text>
                      <TouchableOpacity
                        onPress={() => setActiveMenuOrderId(order.id)}
                        className={`${statusStyle.bg} px-3 py-1 rounded-full`}
                      >
                        <Text className={`${statusStyle.text} text-[10px] font-bold`}>
                          {order.status}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      onPress={() => setActiveMenuOrderId(order.id)}
                      className="p-1 rounded-full"
                    >
                      <Ionicons name="ellipsis-horizontal" size={18} color="#6A7282" />
                    </TouchableOpacity>
                  </View>

                  <Text className="text-brand-gray text-xs mb-3">Items: {order.itemsCount}</Text>

                  <View className="flex-row justify-between items-center pt-3 border-t border-gray-50">
                    <Text className="text-brand-dark text-xs font-bold">
                      Order {order.orderNum}
                    </Text>
                    <View className="flex-row items-center gap-1">
                      <Ionicons name="time-outline" size={12} color="#6A7282" />
                      <Text className="text-brand-gray text-[10px]">{order.time}</Text>
                    </View>
                  </View>

                  {/* Speech Bubble dropdown status update selector */}
                  {activeMenuOrderId === order.id && (
                    <View
                      style={{
                        position: "absolute",
                        top: 40,
                        right: 15,
                        zIndex: 10,
                      }}
                      className="bg-white border border-gray-200 rounded-2xl shadow-xl p-1 w-32"
                    >
                      <TouchableOpacity
                        onPress={() => updateStatus(order.id, "Preparing")}
                        className={`px-4 py-2.5 rounded-xl flex-row justify-between items-center ${
                          order.status === "Preparing" ? "bg-[#FFF8E6]/50" : ""
                        }`}
                      >
                        <Text
                          className={`text-xs font-bold ${
                            order.status === "Preparing" ? "text-[#FFB020]" : "text-brand-dark"
                          }`}
                        >
                          Preparing
                        </Text>
                        {order.status === "Preparing" && (
                          <Ionicons name="checkmark" size={14} color="#FFB020" />
                        )}
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => updateStatus(order.id, "Ready")}
                        className={`px-4 py-2.5 rounded-xl flex-row justify-between items-center ${
                          order.status === "Ready" ? "bg-[#FFF0EB]/50" : ""
                        }`}
                      >
                        <Text
                          className={`text-xs font-bold ${
                            order.status === "Ready" ? "text-[#FF5C35]" : "text-brand-dark"
                          }`}
                        >
                          Ready
                        </Text>
                        {order.status === "Ready" && (
                          <Ionicons name="checkmark" size={14} color="#FF5C35" />
                        )}
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => updateStatus(order.id, "Completed")}
                        className={`px-4 py-2.5 rounded-xl flex-row justify-between items-center ${
                          order.status === "Completed" ? "bg-[#E6F4EA]/50" : ""
                        }`}
                      >
                        <Text
                          className={`text-xs font-bold ${
                            order.status === "Completed" ? "text-[#137333]" : "text-brand-dark"
                          }`}
                        >
                          Completed
                        </Text>
                        {order.status === "Completed" && (
                          <Ionicons name="checkmark" size={14} color="#137333" />
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Dismiss floating dropdowns on press elsewhere */}
      {activeMenuOrderId !== null && (
        <Pressable
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 5,
          }}
          onPress={() => setActiveMenuOrderId(null)}
        />
      )}
    </SafeAreaView>
  );
}

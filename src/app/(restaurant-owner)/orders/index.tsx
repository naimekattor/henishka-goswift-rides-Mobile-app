import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface OrderItem {
  id: string;
  orderNum: string;
  customer: string;
  avatar: string;
  items: { name: string; qty: number; price: number; type: string; size?: string; image: string }[];
  time: string;
  status: "New" | "Preparing" | "Ready" | "Completed" | "Canceled";
  note?: string;
}

const INITIAL_ORDERS: OrderItem[] = [
  {
    id: "1",
    orderNum: "#2043",
    customer: "Rahim Rehman",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    items: [
      {
        name: "Four-Cheese Margherita Pizza with Sun-Dried Tomatoes",
        qty: 2,
        price: 15.14,
        type: "Pizza",
        size: "L Size",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&auto=format&fit=crop&q=80",
      },
    ],
    time: "12 Feb · 8:30 PM",
    status: "New",
    note: "This pizza features a rich blend of four cheeses—mozzarella, parmesan, fontina, and gorgonzola—topped with sun-dried tomatoes and fresh basil, all on a classic margherita base. It offers a perfect balance of creamy, tangy.",
  },
  {
    id: "2",
    orderNum: "#2044",
    customer: "Rahim Rehman",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
    items: [
      {
        name: "Mountain BBQ Burger",
        qty: 1,
        price: 5.99,
        type: "Burger",
        size: "M Size",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&auto=format&fit=crop&q=80",
      },
      {
        name: "Harvest Moon Sandwich",
        qty: 1,
        price: 5.99,
        type: "Sandwich",
        image: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=150&auto=format&fit=crop&q=80",
      },
      {
        name: "Sunset Pizza",
        qty: 1,
        price: 18.45,
        type: "Pizza",
        size: "L Size",
        image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=150&auto=format&fit=crop&q=80",
      },
    ],
    time: "12 Feb · 8:33 PM",
    status: "Preparing",
  },
  {
    id: "3",
    orderNum: "#2045",
    customer: "Rahim Rehman",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    items: [
      {
        name: "Velvet Shake",
        qty: 2,
        price: 5.99,
        type: "Dessert",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=150&auto=format&fit=crop&q=80",
      },
    ],
    time: "12 Feb · 8:30 PM",
    status: "Ready",
  },
  {
    id: "4",
    orderNum: "#2046",
    customer: "Rahim Rehman",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    items: [
      {
        name: "Edamame",
        qty: 1,
        price: 5.99,
        type: "Starters",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=150&auto=format&fit=crop&q=80",
      },
    ],
    time: "12 Feb · 8:30 PM",
    status: "Canceled",
  },
];

export default function RestaurantOrders() {
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState<"New Request" | "Current Order" | "Cancel Order">("New Request");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  // Tab filtering logic
  const getFilteredOrders = () => {
    return orders.filter((order) => {
      // Filter by tab status
      const matchesTab =
        activeTab === "New Request"
          ? order.status === "New"
          : activeTab === "Current Order"
          ? order.status === "Preparing" || order.status === "Ready" || order.status === "Completed"
          : order.status === "Canceled";

      // Filter by search query
      const matchesSearch =
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderNum.includes(searchQuery) ||
        order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesTab && matchesSearch;
    });
  };

  const calculateTotal = (order: OrderItem) => {
    return order.items.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);
  };

  const handleAccept = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "Preparing" } : o))
    );
    setSelectedOrder(null);
  };

  const handleDecline = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "Canceled" } : o))
    );
    setSelectedOrder(null);
  };

  const getStatusColor = (status: OrderItem["status"]) => {
    switch (status) {
      case "New":
        return "bg-brand-orange/10 text-brand-orange";
      case "Preparing":
        return "bg-[#FFF8E6] text-[#FFB020]";
      case "Ready":
        return "bg-[#FFF0EB] text-[#FF5C35]";
      case "Completed":
        return "bg-[#E6F4EA] text-[#137333]";
      case "Canceled":
        return "bg-red-50 text-red-500";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {selectedOrder ? (
        // Detailed full-screen order details sub-page (Design Mockup 4)
        <View className="flex-1 bg-brand-bg">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
            <TouchableOpacity onPress={() => setSelectedOrder(null)} className="p-1">
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Order Details</Text>
            <View className="w-8" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Top Order Summary Box */}
            <View className="bg-white rounded-2xl border border-gray-100 p-4 mb-4 flex-row items-center gap-3">
              <View className="w-12 h-12 rounded-xl bg-orange-50 items-center justify-center">
                <Ionicons name="cube-outline" size={24} color="#E4792F" />
              </View>
              <View className="flex-1">
                <View className="flex-row items-center gap-2">
                  <Text className="text-brand-dark text-sm font-bold">
                    Order : {selectedOrder.orderNum}
                  </Text>
                  <Text className="text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
                    NEW
                  </Text>
                </View>
                <Text className="text-brand-gray text-[10px] mt-0.5">
                  {selectedOrder.time} · {selectedOrder.items.length} Items
                </Text>
              </View>
              <Text className="text-[#E4792F] text-base font-extrabold">
                ${calculateTotal(selectedOrder)}
              </Text>
            </View>

            {/* Customer Details Box */}
            <View className="bg-white rounded-2xl border border-gray-100 p-4 mb-4 flex-row items-center gap-3">
              <Image
                source={{ uri: selectedOrder.avatar }}
                className="w-12 h-12 rounded-full"
              />
              <View>
                <Text className="text-brand-dark text-sm font-bold">
                  {selectedOrder.customer}
                </Text>
                <Text className="text-brand-gray text-xs mt-0.5">Customer</Text>
              </View>
            </View>

            {/* Items list card */}
            <View className="bg-white rounded-2xl border border-gray-100 p-4 mb-16">
              <View className="flex-row items-center gap-2 border-b border-gray-50 pb-3 mb-4">
                <Ionicons name="document-text-outline" size={18} color="#6A7282" />
                <Text className="text-brand-dark text-sm font-bold">Order Items</Text>
              </View>

              <View className="gap-4">
                {selectedOrder.items.map((item, index) => (
                  <View key={index} className="flex-row items-center gap-3">
                    <Image
                      source={{ uri: item.image }}
                      className="w-16 h-16 rounded-xl"
                    />
                    <View className="flex-1">
                      <Text className="text-brand-dark text-sm font-bold leading-5">
                        {item.name}
                      </Text>
                      <Text className="text-brand-gray text-[10px] mt-0.5">
                        {item.type} {item.size && `· ${item.size}`}
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-brand-dark text-xs font-semibold">
                        {item.qty}x
                      </Text>
                      <Text className="text-brand-dark text-sm font-bold mt-1">
                        ${(item.price * item.qty).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <View className="border-t border-gray-100 mt-4 pt-4 flex-row justify-between items-center">
                <Text className="text-brand-dark text-sm font-bold">Total Amount</Text>
                <Text className="text-[#E4792F] text-base font-extrabold">
                  ${calculateTotal(selectedOrder)}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Fixed Footer Buttons */}
          <View className="bg-white border-t border-gray-100 p-6 flex-row gap-4">
            <TouchableOpacity
              onPress={() => handleDecline(selectedOrder.id)}
              className="flex-1 py-4 border border-red-200 bg-white rounded-2xl items-center justify-center"
            >
              <Text className="text-red-500 text-sm font-bold">Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleAccept(selectedOrder.id)}
              className="flex-1 py-4 bg-[#E4792F] rounded-2xl items-center justify-center"
            >
              <Text className="text-white text-sm font-bold">Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Main list views (Mockup 1, 2, 3)
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center px-6 py-4 bg-white border-b border-gray-100">
            <TouchableOpacity className="p-1 mr-3">
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Order Details</Text>
          </View>

          {/* Custom Sub-header tabs slider */}
          <View className="bg-white px-6 py-2 flex-row gap-5 border-b border-gray-100">
            {(["New Request", "Current Order", "Cancel Order"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className={`pb-2 ${isActive ? "border-b-2 border-[#E4792F]" : ""}`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      isActive ? "text-[#E4792F]" : "text-brand-gray"
                    }`}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Search bar for lists */}
            {activeTab !== "New Request" && (
              <View className="bg-white border border-gray-200 rounded-2xl px-4 py-3 flex-row items-center gap-2 mb-4 shadow-sm">
                <Ionicons name="search-outline" size={18} color="#6A7282" />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search order"
                  placeholderTextColor="#A0AEC0"
                  className="flex-1 text-brand-dark text-sm p-0"
                />
              </View>
            )}

            {/* List of orders */}
            <View className="gap-4 pb-16">
              {getFilteredOrders().length === 0 ? (
                <View className="items-center justify-center py-20">
                  <Ionicons name="receipt-outline" size={48} color="#A0AEC0" />
                  <Text className="text-brand-gray text-xs mt-3">No orders found</Text>
                </View>
              ) : (
                getFilteredOrders().map((order) => {
                  if (activeTab === "New Request") {
                    // Item Detail Card for New Request (Design Mockup 1)
                    return (
                      <View
                        key={order.id}
                        className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
                      >
                        {/* Food Image and info */}
                        <View className="flex-row items-center gap-4 mb-4">
                          <Image
                            source={{ uri: order.items[0].image }}
                            className="w-20 h-20 rounded-2xl"
                          />
                          <View className="flex-1">
                            <Text className="text-brand-dark text-sm font-bold leading-5">
                              {order.items[0].name}
                            </Text>
                            <Text className="text-brand-gray text-[10px] mt-1">
                              Order {order.orderNum} · {order.time}
                            </Text>
                            <Text className="text-[#E4792F] text-base font-extrabold mt-1">
                              ${calculateTotal(order)}
                            </Text>
                          </View>
                        </View>

                        {/* Note */}
                        {order.note && (
                          <View className="mb-4">
                            <Text className="text-brand-dark text-xs font-bold mb-1">
                              Note
                            </Text>
                            <Text className="text-brand-gray text-[10px] leading-4">
                              {order.note}
                            </Text>
                          </View>
                        )}

                        {/* Quantity display */}
                        <View className="flex-row justify-between items-center border-t border-gray-50 pt-3 mb-4">
                          <Text className="text-brand-gray text-[10px] font-bold">
                            Quantity: {order.items[0].qty}
                          </Text>
                          <TouchableOpacity>
                            <Ionicons name="trash-outline" size={16} color="#6A7282" />
                          </TouchableOpacity>
                        </View>

                        {/* Actions */}
                        <View className="flex-row gap-3">
                          <TouchableOpacity
                            onPress={() => handleDecline(order.id)}
                            className="flex-1 py-3 bg-[#FFF5F5] rounded-xl items-center justify-center border border-red-100"
                          >
                            <Text className="text-red-500 text-xs font-bold">Reject</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => handleAccept(order.id)}
                            className="flex-1 py-3 bg-[#E4792F] rounded-xl items-center justify-center"
                          >
                            <Text className="text-white text-xs font-bold">Accept</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  } else {
                    // Regular order card in current list (Design Mockup 2 & 3)
                    const statusColor = getStatusColor(order.status);
                    return (
                      <TouchableOpacity
                        key={order.id}
                        onPress={() => setSelectedOrder(order)}
                        activeOpacity={0.95}
                        className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
                      >
                        <View className="flex-row justify-between items-center mb-2">
                          <View className="flex-row items-center gap-2">
                            <Text className="text-brand-dark text-base font-bold">
                              {order.customer}
                            </Text>
                            <View className={`${statusColor} px-2 py-0.5 rounded-full`}>
                              <Text className="text-[9px] font-bold">{order.status}</Text>
                            </View>
                          </View>

                          <TouchableOpacity className="p-1">
                            <Ionicons name="ellipsis-horizontal" size={18} color="#6A7282" />
                          </TouchableOpacity>
                        </View>

                        <Text className="text-brand-gray text-xs mb-3">
                          Items: {order.items.length}
                        </Text>

                        <View className="flex-row justify-between items-center pt-3 border-t border-gray-50">
                          <Text className="text-brand-dark text-xs font-bold">
                            Order {order.orderNum}
                          </Text>
                          <View className="flex-row items-center gap-1">
                            <Ionicons name="time-outline" size={12} color="#6A7282" />
                            <Text className="text-brand-gray text-[10px]">{order.time}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                })
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

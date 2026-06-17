import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface OrderItem {
  id: string;
  customer: string;
  items: { name: string; qty: number; note?: string }[];
  time: string;
  status: "New" | "Preparing" | "Ready" | "Completed";
  price: string;
  rider?: { name: string; phone: string; vehicle: string };
  address: string;
}

const INITIAL_ORDERS: OrderItem[] = [
  {
    id: "GS-4089",
    customer: "Henishka Patel",
    items: [
      { name: "Classic Cheeseburger", qty: 2, note: "No pickles" },
      { name: "Golden French Fries", qty: 1, note: "Extra crispy" }
    ],
    time: "5 mins ago",
    status: "New",
    price: "$24.50",
    address: "Apt 4B, 82 Riverside Ave, Metro City"
  },
  {
    id: "GS-4088",
    customer: "John Doe",
    items: [
      { name: "Pepperoni Pizza (Large)", qty: 1 },
      { name: "Coca Cola Zero (500ml)", qty: 2 }
    ],
    time: "12 mins ago",
    status: "Preparing",
    price: "$18.20",
    address: "142 Sweetwood St, Culinary District"
  },
  {
    id: "GS-4087",
    customer: "Sarah Smith",
    items: [
      { name: "Spicy Buffalo Chicken Wings", qty: 3, note: "Ranch dip included" },
      { name: "Garlic Bread with Cheese", qty: 1 }
    ],
    time: "28 mins ago",
    status: "Ready",
    price: "$32.90",
    rider: { name: "David Miller", phone: "+1 555-0192", vehicle: "Scooter (XY-8812)" },
    address: "Suite 12, Tech Hub Plaza, Sector 4"
  },
  {
    id: "GS-4086",
    customer: "Michael Brown",
    items: [
      { name: "Grilled Salmon Bowl", qty: 1 },
      { name: "Fresh Orange Juice", qty: 1 }
    ],
    time: "1 hour ago",
    status: "Completed",
    price: "$27.00",
    address: "59 Pine Street, Green Valley"
  }
];

export default function RestaurantOrders() {
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState<"New" | "Preparing" | "Ready" | "Completed">("New");
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  // Filter orders based on active tab
  const filteredOrders = orders.filter((order) => order.status === activeTab);

  const updateOrderStatus = (id: string, newStatus: "Preparing" | "Ready" | "Completed") => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          const updated: OrderItem = { ...o, status: newStatus };
          // Assign rider mockup if moving to Ready
          if (newStatus === "Ready" && !o.rider) {
            updated.rider = { name: "Alex Jones", phone: "+1 555-9081", vehicle: "Electric Bike (EB-901)" };
          }
          return updated;
        }
        return o;
      })
    );
    setSelectedOrder(null);
  };

  const handleDecline = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    setSelectedOrder(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* Top Header */}
      <View className="bg-white border-b border-gray-100 px-6 py-4 flex-row justify-between items-center shadow-sm">
        <Text className="text-brand-dark text-lg font-bold">Order Management</Text>
        <Text className="text-brand-orange text-xs font-bold">{orders.filter(o => o.status === "New").length} New</Text>
      </View>

      {/* Tabs */}
      <View className="bg-white px-4 py-2.5 flex-row justify-between border-b border-gray-100 shadow-sm">
        {(["New", "Preparing", "Ready", "Completed"] as const).map((tab) => {
          const count = orders.filter((o) => o.status === tab).length;
          const isSelected = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 items-center py-2 px-1 border-b-2 ${
                isSelected ? "border-brand-orange" : "border-transparent"
              }`}
            >
              <Text className={`text-xs font-bold ${isSelected ? "text-brand-orange" : "text-brand-gray"}`}>
                {tab} {count > 0 && `(${count})`}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* List */}
      <ScrollView showsVerticalScrollIndicator={false} className="px-6 py-4 flex-1">
        {filteredOrders.length === 0 ? (
          <View className="items-center justify-center py-16">
            <Ionicons name="receipt-outline" size={48} color="#A0AEC0" />
            <Text className="text-brand-gray text-sm font-semibold mt-3">No orders in this section</Text>
          </View>
        ) : (
          <View className="gap-4 pb-12">
            {filteredOrders.map((order) => (
              <TouchableOpacity
                key={order.id}
                onPress={() => setSelectedOrder(order)}
                activeOpacity={0.9}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
              >
                {/* Header */}
                <View className="flex-row justify-between items-center border-b border-gray-50 pb-3 mb-3">
                  <View>
                    <Text className="text-brand-dark text-base font-bold">{order.id}</Text>
                    <Text className="text-brand-gray text-xs mt-0.5">{order.customer}</Text>
                  </View>
                  <Text className="text-brand-orange text-base font-bold">{order.price}</Text>
                </View>

                {/* Items Summary */}
                <View className="mb-4">
                  {order.items.map((item, idx) => (
                    <Text key={idx} className="text-brand-dark text-sm mb-1">
                      {item.qty}x {item.name}
                    </Text>
                  ))}
                  <Text className="text-brand-gray text-[10px] mt-1">{order.time}</Text>
                </View>

                {/* Actions */}
                <View className="flex-row gap-3">
                  {order.status === "New" && (
                    <>
                      <TouchableOpacity
                        onPress={() => handleDecline(order.id)}
                        className="flex-1 py-3 bg-red-50 rounded-xl items-center"
                      >
                        <Text className="text-red-500 text-xs font-bold">Decline</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => updateOrderStatus(order.id, "Preparing")}
                        className="flex-1 py-3 bg-brand-orange rounded-xl items-center"
                      >
                        <Text className="text-white text-xs font-bold">Accept & Prepare</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  {order.status === "Preparing" && (
                    <TouchableOpacity
                      onPress={() => updateOrderStatus(order.id, "Ready")}
                      className="w-full py-3 bg-brand-orange rounded-xl items-center"
                    >
                      <Text className="text-white text-xs font-bold">Mark as Ready for Pickup</Text>
                    </TouchableOpacity>
                  )}
                  {order.status === "Ready" && (
                    <View className="w-full bg-green-50 border border-green-200 rounded-xl p-3 flex-row justify-between items-center">
                      <View>
                        <Text className="text-[10px] text-green-700 font-bold">RIDER ASSIGNED</Text>
                        <Text className="text-brand-dark text-xs font-bold mt-0.5">{order.rider?.name}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => updateOrderStatus(order.id, "Completed")}
                        className="bg-brand-orange px-4 py-2 rounded-lg"
                      >
                        <Text className="text-white text-xs font-bold">Picked Up</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {order.status === "Completed" && (
                    <View className="flex-row items-center gap-1.5 self-center">
                      <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                      <Text className="text-green-600 text-xs font-bold">Completed and Delivered</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Detail Modal */}
      {selectedOrder && (
        <Modal
          visible={!!selectedOrder}
          transparent
          animationType="slide"
          onRequestClose={() => setSelectedOrder(null)}
        >
          <View className="flex-1 bg-brand-dark/40 justify-end">
            <View className="bg-white rounded-t-[32px] p-6 max-h-[85%] shadow-xl">
              {/* Header */}
              <View className="flex-row justify-between items-center mb-6">
                <View>
                  <Text className="text-brand-dark text-lg font-bold">Order Details</Text>
                  <Text className="text-brand-gray text-xs mt-0.5">{selectedOrder.id}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setSelectedOrder(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                >
                  <Ionicons name="close" size={20} color="#6A7282" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} className="mb-6">
                {/* Customer Section */}
                <View className="mb-5 border-b border-gray-50 pb-4">
                  <Text className="text-[10px] font-bold text-brand-gray uppercase tracking-wider mb-1">
                    Customer
                  </Text>
                  <Text className="text-brand-dark text-sm font-bold">{selectedOrder.customer}</Text>
                  <Text className="text-brand-gray text-xs mt-1">{selectedOrder.address}</Text>
                </View>

                {/* Items Section */}
                <View className="mb-5 border-b border-gray-50 pb-4">
                  <Text className="text-[10px] font-bold text-brand-gray uppercase tracking-wider mb-2">
                    Items List
                  </Text>
                  {selectedOrder.items.map((item, idx) => (
                    <View key={idx} className="mb-3">
                      <View className="flex-row justify-between">
                        <Text className="text-brand-dark text-sm font-bold">
                          {item.qty}x {item.name}
                        </Text>
                      </View>
                      {item.note && (
                        <View className="flex-row items-center gap-1 mt-1 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-100 self-start">
                          <Ionicons name="information-circle-outline" size={14} color="#D97706" />
                          <Text className="text-[10px] text-amber-700 font-medium">Note: {item.note}</Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>

                {/* Rider details if assigned */}
                {selectedOrder.rider && (
                  <View className="mb-5 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <Text className="text-[10px] font-bold text-brand-gray uppercase tracking-wider mb-2">
                      Rider Information
                    </Text>
                    <Text className="text-brand-dark text-sm font-bold">{selectedOrder.rider.name}</Text>
                    <Text className="text-brand-gray text-xs mt-0.5">{selectedOrder.rider.vehicle}</Text>
                    <Text className="text-brand-gray text-xs mt-0.5">{selectedOrder.rider.phone}</Text>
                  </View>
                )}

                {/* Price summary */}
                <View className="flex-row justify-between items-center bg-brand-orange/5 p-4 rounded-2xl">
                  <Text className="text-brand-dark text-sm font-bold">Total Earnings</Text>
                  <Text className="text-brand-orange text-lg font-extrabold">{selectedOrder.price}</Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

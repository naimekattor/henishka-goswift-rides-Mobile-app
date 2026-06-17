import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Order {
  id: string;
  itemName: string;
  details: string;
  otp: string;
  distance: string;
  duration: string;
  price: number;
  image: any;
  status: "handoff" | "return" | "delivered" | "refund" | "cancelled";
}

export default function RetailerOrders() {
  const router = useRouter();
  const [activeMainTab, setActiveMainTab] = useState<"active" | "delivered" | "cancelled">("active");
  const [activeSubTab, setActiveSubTab] = useState<"handoff" | "returns">("handoff");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modals / Details states
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);
  const [showReturnModal, setShowReturnModal] = useState<Order | null>(null);

  // Mock Orders matching the details in the screenshots
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "PHU5096",
      itemName: "Gradient Graphic T-shirt",
      details: "Size: Medium, Color: White",
      otp: "664564",
      distance: "28km",
      duration: "10Min",
      price: 145,
      image: require("@/assets/images/onboarding/3.png"),
      status: "handoff",
    },
    {
      id: "PHU5097",
      itemName: "Gradient Graphic T-shirt",
      details: "Size: Medium, Color: White",
      otp: "664564",
      distance: "28km",
      duration: "10Min",
      price: 145,
      image: require("@/assets/images/onboarding/3.png"),
      status: "handoff",
    },
    {
      id: "PHU5098",
      itemName: "Gradient Graphic T-shirt",
      details: "Size: Medium, Color: White",
      otp: "664564",
      distance: "28km",
      duration: "10Min",
      price: 145,
      image: require("@/assets/images/onboarding/3.png"),
      status: "return",
    },
    {
      id: "PHU5099",
      itemName: "Gradient Graphic T-shirt",
      details: "Size: Medium, Color: White",
      otp: "664564",
      distance: "28km",
      duration: "10Min",
      price: 145,
      image: require("@/assets/images/onboarding/3.png"),
      status: "refund",
    },
    {
      id: "PHU5100",
      itemName: "Gradient Graphic T-shirt",
      details: "Size: Medium, Color: White",
      otp: "664564",
      distance: "28km",
      duration: "10Min",
      price: 145,
      image: require("@/assets/images/onboarding/3.png"),
      status: "cancelled",
    },
  ]);

  // Handle Handoff
  const handleHandoff = (orderId: string) => {
    Alert.alert("Confirm Handoff", "Are you sure you want to hand off this package to the driver?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Confirm",
        onPress: () => {
          setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status: "delivered" } : o))
          );
          Alert.alert("Success", "Order successfully handed off to driver!");
        },
      },
    ]);
  };

  // Handle Return Approval
  const handleAcceptReturn = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "refund" } : o))
    );
    setShowReturnModal(null);
    Alert.alert("Return Accepted", "Refund processing initiated.");
  };

  // Handle Return Rejection
  const handleRejectReturn = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "handoff" } : o))
    );
    setShowReturnModal(null);
    Alert.alert("Return Rejected", "The item return request has been rejected.");
  };

  // Filter logic
  const filteredOrders = orders.filter((o) => {
    // Search query match
    const matchesSearch =
      o.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Tab checks
    if (activeMainTab === "active") {
      if (activeSubTab === "handoff") {
        return o.status === "handoff";
      } else {
        return o.status === "return";
      }
    } else if (activeMainTab === "delivered") {
      return o.status === "delivered" || o.status === "refund";
    } else {
      return o.status === "cancelled";
    }
  });

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
        <TouchableOpacity
          onPress={() => router.replace("/(retailer)/dashboard" as any)}
          className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center bg-white shadow-sm"
        >
          <Ionicons name="chevron-back" size={20} color="#6A7282" />
        </TouchableOpacity>
        <Text className="text-brand-dark text-base font-bold">Order Management</Text>
        <View className="w-10" />
      </View>

      {/* Main Sub-tabs: Active, Delivered, Cancellation */}
      <View className="flex-row px-6 bg-white py-3 border-b border-slate-100 justify-between">
        {[
          { key: "active", label: "Active" },
          { key: "delivered", label: "Delivered" },
          { key: "cancelled", label: "Cancellation" },
        ].map((tab) => {
          const isSelected = activeMainTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveMainTab(tab.key as any)}
              className={`px-6 py-2.5 rounded-full ${
                isSelected ? "bg-brand-orange" : "bg-slate-50"
              }`}
            >
              <Text
                className={`text-xs font-bold ${
                  isSelected ? "text-white" : "text-brand-gray"
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Active Tab Sub-filters: Ready to handoff / Returns and Cancels */}
      {activeMainTab === "active" && (
        <View className="flex-row px-6 pt-4 gap-6">
          <TouchableOpacity
            onPress={() => setActiveSubTab("handoff")}
            className="pb-2 relative"
          >
            <Text
              className={`text-xs font-bold ${
                activeSubTab === "handoff" ? "text-brand-orange" : "text-brand-gray"
              }`}
            >
              Ready to handoff
            </Text>
            {activeSubTab === "handoff" && (
              <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange rounded-full" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveSubTab("returns")}
            className="pb-2 relative"
          >
            <Text
              className={`text-xs font-bold ${
                activeSubTab === "returns" ? "text-brand-orange" : "text-brand-gray"
              }`}
            >
              Returns and Cancels
            </Text>
            {activeSubTab === "returns" && (
              <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange rounded-full" />
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Search current order */}
      <View className="px-6 pt-4 pb-2">
        <View className="w-full bg-white border border-slate-100 rounded-2xl flex-row items-center px-4 shadow-sm">
          <Ionicons name="search-outline" size={18} color="#A0AEC0" className="mr-2" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search current order"
            placeholderTextColor="#A0AEC0"
            className="flex-1 py-3 text-xs text-brand-dark"
          />
        </View>
      </View>

      {/* Scrollable list */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-2">
        {filteredOrders.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Ionicons name="document-text-outline" size={48} color="#D1D5DB" />
            <Text className="text-brand-gray text-xs font-bold mt-4">No orders found</Text>
          </View>
        ) : (
          <View className="gap-4 pb-12">
            {activeMainTab === "active" && <Text className="text-brand-dark text-xs font-bold">Upcoming Handoff</Text>}
            
            {filteredOrders.map((order) => (
              <TouchableOpacity
                key={order.id}
                onPress={() => setSelectedOrderDetails(order)}
                activeOpacity={0.9}
                className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex-row items-center justify-between"
              >
                <View className="flex-row items-center gap-4 flex-1">
                  {/* Photo */}
                  <View className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden items-center justify-center p-2">
                    <Image source={order.image} className="w-full h-full" resizeMode="contain" />
                  </View>
                  <View className="flex-1 mr-2">
                    {/* Item title */}
                    <Text className="text-brand-dark text-xs font-bold">{order.itemName}</Text>
                    <Text className="text-brand-gray text-[10px] font-semibold mt-0.5">{order.details}</Text>
                    
                    {/* Handoff details */}
                    {order.status === "handoff" && (
                      <View className="mt-1">
                        <Text className="text-brand-gray text-[10px] font-bold">
                          OTP: <Text className="text-brand-orange">{order.otp}</Text>
                        </Text>
                        <View className="flex-row items-center gap-1 mt-1">
                          <Ionicons name="navigate-outline" size={10} color="#10B981" />
                          <Text className="text-emerald-500 text-[9px] font-bold">
                            {order.distance} <Text className="text-slate-400 font-semibold">({order.duration})</Text>
                          </Text>
                        </View>
                      </View>
                    )}

                    {/* Price and status */}
                    <Text className="text-brand-dark text-xs font-bold mt-2">${order.price}</Text>
                  </View>
                </View>

                {/* Status-based actions */}
                <View className="items-end">
                  {order.status === "handoff" && (
                    <TouchableOpacity
                      onPress={() => handleHandoff(order.id)}
                      className="px-4 py-2 rounded-xl bg-orange-50 border border-brand-orange/20"
                    >
                      <Text className="text-brand-orange text-[10px] font-bold">Handoff</Text>
                    </TouchableOpacity>
                  )}

                  {order.status === "return" && (
                    <TouchableOpacity
                      onPress={() => setShowReturnModal(order)}
                      className="px-4 py-2 rounded-xl bg-brand-orange"
                    >
                      <Text className="text-white text-[10px] font-bold">View Reason</Text>
                    </TouchableOpacity>
                  )}

                  {order.status === "delivered" && (
                    <View className="bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                      <Text className="text-emerald-500 text-[10px] font-bold">Delivered</Text>
                    </View>
                  )}

                  {order.status === "refund" && (
                    <View className="bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                      <Text className="text-amber-500 text-[10px] font-bold">Refund Processing</Text>
                    </View>
                  )}

                  {order.status === "cancelled" && (
                    <View className="bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
                      <Text className="text-red-500 text-[10px] font-bold">Cancelled</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* -------------------- 1. RETURNING REQUEST MODAL -------------------- */}
      {showReturnModal && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={!!showReturnModal}
          onRequestClose={() => setShowReturnModal(null)}
        >
          <View className="flex-1 bg-brand-dark/40 justify-center items-center px-6">
            <View className="bg-white rounded-3xl w-full p-6 shadow-xl relative">
              {/* Close Button */}
              <TouchableOpacity
                onPress={() => setShowReturnModal(null)}
                className="absolute top-4 right-4 p-1 rounded-full bg-slate-50"
              >
                <Ionicons name="close" size={20} color="#6A7282" />
              </TouchableOpacity>

              <Text className="text-brand-dark text-base font-bold mb-4">Returning request</Text>
              
              <Text className="text-brand-gray text-xs leading-5 mb-6">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
              </Text>

              {/* Action buttons matching mockup design */}
              <View className="flex-row gap-4">
                <TouchableOpacity
                  onPress={() => handleRejectReturn(showReturnModal.id)}
                  className="flex-1 py-3 border border-brand-orange rounded-xl items-center justify-center"
                >
                  <Text className="text-brand-orange text-xs font-bold">Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAcceptReturn(showReturnModal.id)}
                  className="flex-1 py-3 bg-brand-orange rounded-xl items-center justify-center"
                >
                  <Text className="text-white text-xs font-bold">Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* -------------------- 2. ORDER DETAILS MODAL / SCREEN OVERLAY -------------------- */}
      {selectedOrderDetails && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={!!selectedOrderDetails}
          onRequestClose={() => setSelectedOrderDetails(null)}
        >
          <SafeAreaView className="flex-1 bg-brand-bg">
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
              <TouchableOpacity
                onPress={() => setSelectedOrderDetails(null)}
                className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center bg-white shadow-sm"
              >
                <Ionicons name="chevron-back" size={20} color="#6A7282" />
              </TouchableOpacity>
              <Text className="text-brand-dark text-base font-bold">Order Details</Text>
              <View className="w-10" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
              {/* Ordered Items List */}
              <View className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm mb-6 gap-4">
                {/* Product Item 1: Smart Watch */}
                <View className="flex-row items-center justify-between py-2 border-b border-slate-50 pb-4">
                  <View className="flex-row items-center gap-4 flex-1">
                    <View className="w-14 h-14 bg-slate-50 rounded-2xl items-center justify-center p-2 border border-slate-100">
                      <Ionicons name="watch-outline" size={24} color="#E4792F" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-brand-dark text-xs font-bold">Smart Watch</Text>
                      <Text className="text-brand-gray text-[10px] font-semibold mt-0.5">Color: Black, Size: Medium</Text>
                      <Text className="text-brand-gray text-[10px] font-bold mt-1">1x <Text className="text-brand-dark font-extrabold">Size: Medium</Text></Text>
                    </View>
                  </View>
                  <Text className="text-brand-dark text-xs font-extrabold">$5.99</Text>
                </View>

                {/* Product Item 2: Headphone */}
                <View className="flex-row items-center justify-between py-2">
                  <View className="flex-row items-center gap-4 flex-1">
                    <View className="w-14 h-14 bg-slate-50 rounded-2xl items-center justify-center p-2 border border-slate-100">
                      <Ionicons name="headset-outline" size={24} color="#E4792F" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-brand-dark text-xs font-bold">Headphone</Text>
                      <Text className="text-brand-gray text-[10px] font-semibold mt-0.5">Color: Black, Size: Medium</Text>
                      <Text className="text-brand-gray text-[10px] font-bold mt-1">2x <Text className="text-brand-dark font-extrabold">Size: Medium</Text></Text>
                    </View>
                  </View>
                  <Text className="text-brand-dark text-xs font-extrabold">$5.99</Text>
                </View>
              </View>

              {/* Price Summary Panel */}
              <View className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm mb-12">
                <Text className="text-brand-dark text-sm font-bold mb-4">Price Summary</Text>

                <View className="gap-3.5 border-b border-slate-50 pb-4">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-brand-gray text-xs font-semibold">Total Items</Text>
                    <Text className="text-brand-dark text-xs font-bold">3 Items</Text>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <Text className="text-brand-gray text-xs font-semibold">Sub Total</Text>
                    <Text className="text-brand-dark text-xs font-bold">$29.95</Text>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <Text className="text-brand-gray text-xs font-semibold">Delivery Fee</Text>
                    <Text className="text-emerald-500 text-xs font-bold">Free</Text>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <Text className="text-brand-gray text-xs font-semibold">Tax (8%)</Text>
                    <Text className="text-brand-dark text-xs font-bold">$0.48</Text>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <Text className="text-brand-gray text-xs font-semibold">Order ID</Text>
                    <Text className="text-brand-dark text-xs font-bold">#PHU5096</Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-center pt-4">
                  <Text className="text-brand-dark text-sm font-bold">Total</Text>
                  <Text className="text-brand-orange text-base font-extrabold">$30.43</Text>
                </View>

                {selectedOrderDetails.status === "handoff" && (
                  <TouchableOpacity
                    onPress={() => {
                      handleHandoff(selectedOrderDetails.id);
                      setSelectedOrderDetails(null);
                    }}
                    className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mt-8"
                  >
                    <Text className="text-white text-base font-bold">Confirm & Handoff</Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      )}
    </SafeAreaView>
  );
}

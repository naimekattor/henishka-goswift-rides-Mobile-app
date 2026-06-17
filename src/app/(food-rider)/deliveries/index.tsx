import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface DeliveryItem {
  id: string;
  location: string;
  time: string;
  payout: number;
  receiver: string;
  pickup: string;
  delivery: string;
  distance: string;
  basePay: number;
  date: string;
}

export default function RiderDeliveries() {
  // Tabs: 'all' | 'active' | 'history'
  const [activeTab, setActiveTab] = useState<"all" | "active" | "history">("all");

  // Selected delivery for Receipt Details overlay
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryItem | null>(null);

  // Hardcoded list representing rider history
  const [deliveries] = useState<DeliveryItem[]>([
    {
      id: "H37895XTZ",
      location: "Mohakhali, Dhaka",
      time: "10:30 AM",
      payout: 32.95,
      receiver: "Paul Cortez",
      pickup: "Sakura Garden, 13, Park Place, Cashmoor",
      delivery: "Naraynagnaj, Sadar",
      distance: "1.5 KM",
      basePay: 29.95,
      date: "17th June 2026",
    },
    {
      id: "H37895XTY",
      location: "Mohakhali, Dhaka",
      time: "09:15 AM",
      payout: 25.50,
      receiver: "Robert Fox",
      pickup: "Margherita Pizza Hub, GEC Circle",
      delivery: "Agrabad, Halishahar",
      distance: "3.2 KM",
      basePay: 21.00,
      date: "17th June 2026",
    },
    {
      id: "H37895XTX",
      location: "Mohakhali, Dhaka",
      time: "Yesterday",
      payout: 18.20,
      receiver: "Esther Howard",
      pickup: "KFC Bistro, Lalkhan Bazar",
      delivery: "Tiger Pass, kazi Deiry",
      distance: "1.2 KM",
      basePay: 15.50,
      date: "16th June 2026",
    },
    {
      id: "H37895XTW",
      location: "Mohakhali, Dhaka",
      time: "Yesterday",
      payout: 42.00,
      receiver: "Brooklyn Simmons",
      pickup: "Burger King, Nasirabad",
      delivery: "Chittagong High Court Area",
      distance: "5.0 KM",
      basePay: 35.00,
      date: "16th June 2026",
    },
  ]);

  // Active Order representation
  const [activeOrder] = useState<DeliveryItem | null>({
    id: "AB1256XY78",
    location: "Naraynagnaj, Sadar",
    time: "Ongoing",
    payout: 8.50,
    receiver: "Paul Cortez",
    pickup: "Sakura Garden, 13, Park Place, Cashmoor",
    delivery: "Naraynagnaj, Sadar",
    distance: "12 KM",
    basePay: 6.00,
    date: "Today",
  });

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100 shadow-sm">
        <Text className="text-brand-dark text-base font-bold text-center flex-1">My Order</Text>
      </View>

      {/* Sub-tabs Filters */}
      <View className="flex-row px-6 py-4 gap-3 bg-white border-b border-slate-50">
        <TouchableOpacity
          onPress={() => setActiveTab("all")}
          className={`px-5 py-2 rounded-full border ${
            activeTab === "all"
              ? "bg-brand-orange border-brand-orange"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <Text className={`text-[11px] font-bold ${activeTab === "all" ? "text-white" : "text-brand-gray"}`}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("active")}
          className={`px-5 py-2 rounded-full border ${
            activeTab === "active"
              ? "bg-brand-orange border-brand-orange"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <Text className={`text-[11px] font-bold ${activeTab === "active" ? "text-white" : "text-brand-gray"}`}>
            Active Order
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("history")}
          className={`px-5 py-2 rounded-full border ${
            activeTab === "history"
              ? "bg-brand-orange border-brand-orange"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <Text className={`text-[11px] font-bold ${activeTab === "history" ? "text-white" : "text-brand-gray"}`}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
        {/* -------------------- 1. ACTIVE ORDER SECTION -------------------- */}
        {(activeTab === "all" || activeTab === "active") && (
          <View className="mb-6">
            {activeTab === "active" && <Text className="text-brand-dark text-xs font-bold mb-3">Active Order</Text>}
            {activeOrder ? (
              <View className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm">
                <View className="flex-row justify-between items-center border-b border-slate-50 pb-3 mb-4">
                  <View>
                    <Text className="text-brand-dark text-xs font-bold">Order #{activeOrder.id}</Text>
                    <Text className="text-brand-gray text-[9px] font-semibold mt-0.5">4 items</Text>
                  </View>
                  <View className="bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                    <Text className="text-brand-orange text-[9px] font-black">Active</Text>
                  </View>
                </View>

                {/* Receiver Info */}
                <View className="flex-row items-center justify-between bg-slate-50 rounded-2xl p-3 mb-4">
                  <View className="flex-row items-center gap-2">
                    <View className="bg-brand-orange/10 w-7 h-7 rounded-full items-center justify-center">
                      <Ionicons name="person" size={13} color="#E4792F" />
                    </View>
                    <View>
                      <Text className="text-brand-gray text-[9px]">Order Receiver</Text>
                      <Text className="text-brand-dark text-xs font-bold">{activeOrder.receiver}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => Alert.alert("Call Receiver", `Calling ${activeOrder.receiver}...`)}
                    className="bg-white border border-slate-200 p-2 rounded-full"
                  >
                    <Ionicons name="call" size={12} color="#E4792F" />
                  </TouchableOpacity>
                </View>

                {/* Route timeline */}
                <View className="pl-1 relative">
                  <View className="absolute left-3 top-4 bottom-4 w-0.5 bg-slate-200 border-l border-dashed border-slate-400" />

                  <View className="flex-row items-start gap-3 mb-4">
                    <View className="bg-orange-500 w-5.5 h-5.5 rounded-full items-center justify-center z-10 border-2 border-white shadow-sm">
                      <Ionicons name="storefront" size={8} color="white" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-brand-dark text-[9px] font-bold">Pickup Location</Text>
                      <Text className="text-brand-gray text-[9px] mt-0.5">{activeOrder.pickup}</Text>
                    </View>
                  </View>

                  <View className="pl-8 mb-3">
                    <View className="bg-slate-200/80 rounded-full px-2 py-0.5 w-14 items-center">
                      <Text className="text-brand-dark text-[8px] font-bold">{activeOrder.distance}</Text>
                    </View>
                  </View>

                  <View className="flex-row items-start gap-3">
                    <View className="bg-emerald-500 w-5.5 h-5.5 rounded-full items-center justify-center z-10 border-2 border-white shadow-sm">
                      <Ionicons name="pin" size={8} color="white" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-brand-dark text-[9px] font-bold">Delivery Location</Text>
                      <Text className="text-brand-gray text-[9px] mt-0.5">{activeOrder.delivery}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View className="bg-white rounded-3xl border border-slate-100 p-6 items-center shadow-sm">
                <Ionicons name="alert-circle-outline" size={36} color="#6A7282" />
                <Text className="text-brand-gray text-xs font-semibold mt-2">No active delivery at the moment.</Text>
              </View>
            )}
          </View>
        )}

        {/* -------------------- 2. HISTORY / RECENT ORDERS -------------------- */}
        {(activeTab === "all" || activeTab === "history") && (
          <View className="mb-12">
            <Text className="text-brand-dark text-xs font-bold mb-3">Recent Order</Text>
            <View className="gap-3">
              {deliveries.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSelectedDelivery(item)}
                  className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex-row justify-between items-center"
                >
                  <View className="flex-row items-center gap-3">
                    <View className="bg-orange-50 p-2.5 rounded-2xl">
                      <Ionicons name="document-text" size={18} color="#E4792F" />
                    </View>
                    <View>
                      <Text className="text-brand-dark text-xs font-bold">Order ID: {item.id}</Text>
                      <View className="flex-row items-center gap-1.5 mt-0.5">
                        <Ionicons name="location-outline" size={10} color="#6A7282" />
                        <Text className="text-brand-gray text-[9px] font-semibold">{item.location}</Text>
                      </View>
                    </View>
                  </View>

                  <View className="items-end gap-1.5">
                    <View className="bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
                      <Text className="text-emerald-500 text-[8px] font-bold">Complete</Text>
                    </View>
                    <Text className="text-brand-gray text-[8px] font-semibold">{item.time}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* -------------------- DELIVERY DETAILS RECEIPT OVERLAY -------------------- */}
      {selectedDelivery && (
        <View className="absolute inset-0 bg-black/60 z-50 justify-end">
          <View className="bg-white rounded-t-[40px] p-6 shadow-2xl max-h-[90%]">
            
            {/* Header */}
            <View className="flex-row justify-between items-center border-b border-slate-100 pb-4 mb-4">
              <TouchableOpacity onPress={() => setSelectedDelivery(null)}>
                <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
              </TouchableOpacity>
              <Text className="text-brand-dark text-base font-bold">Delivery Details</Text>
              <View className="w-6" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Map Route Image Preview Mockup */}
              <View className="h-36 rounded-2xl border border-slate-200 overflow-hidden bg-sky-50 items-center justify-center relative mb-5">
                {/* Visual road grid */}
                <View className="absolute w-full h-3 bg-white top-1/3 rotate-6" />
                <View className="absolute w-full h-3 bg-white top-2/3 -rotate-12" />
                {/* Pinned Route */}
                <View className="absolute w-28 h-1 bg-brand-orange top-1/2 -rotate-12 items-center justify-center flex-row">
                  <View className="w-2.5 h-2.5 bg-brand-orange border border-white rounded-full -left-1" />
                  <View className="w-2.5 h-2.5 bg-emerald-500 border border-white rounded-full -right-1 ml-auto" />
                </View>
                <Text className="absolute bottom-2 bg-white px-2 py-0.5 rounded text-[8px] font-bold text-brand-dark shadow-sm">
                  Route Map Overview
                </Text>
              </View>

              {/* Order Status Block */}
              <View className="flex-row justify-between items-center mb-4">
                <View>
                  <Text className="text-brand-dark text-sm font-extrabold">Order ID: {selectedDelivery.id}</Text>
                  <Text className="text-brand-gray text-[9px] font-semibold mt-0.5">{selectedDelivery.date}</Text>
                </View>
                <View className="bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                  <Text className="text-emerald-500 text-[9px] font-black">Complete</Text>
                </View>
              </View>

              {/* Receiver card */}
              <View className="flex-row items-center justify-between bg-slate-50 rounded-2xl p-3.5 mb-5 border border-slate-100">
                <View className="flex-row items-center gap-3">
                  <View className="bg-brand-orange/10 w-8 h-8 rounded-full items-center justify-center">
                    <Ionicons name="person" size={14} color="#E4792F" />
                  </View>
                  <View>
                    <Text className="text-brand-gray text-[9px] font-semibold">Order Receiver</Text>
                    <Text className="text-brand-dark text-xs font-bold">{selectedDelivery.receiver}</Text>
                  </View>
                </View>
                <TouchableOpacity className="bg-white border border-slate-200 p-2.5 rounded-full">
                  <Ionicons name="call" size={14} color="#E4792F" />
                </TouchableOpacity>
              </View>

              {/* Timeline route details */}
              <View className="pl-1 relative mb-6">
                <View className="absolute left-3.5 top-5 bottom-5 w-0.5 bg-slate-200 border-l border-dashed border-slate-400" />

                <View className="flex-row items-start gap-3 mb-5">
                  <View className="bg-orange-500 w-6 h-6 rounded-full items-center justify-center z-10 border-2 border-white shadow-sm">
                    <Ionicons name="storefront" size={10} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-brand-dark text-[10px] font-bold">Pickup Location</Text>
                    <Text className="text-brand-gray text-[9px] mt-0.5">{selectedDelivery.pickup}</Text>
                  </View>
                </View>

                <View className="pl-9 mb-4">
                  <View className="bg-slate-200/80 rounded-full px-2.5 py-0.5 w-16 items-center">
                    <Text className="text-brand-dark text-[8px] font-bold">{selectedDelivery.distance}</Text>
                  </View>
                </View>

                <View className="flex-row items-start gap-3">
                  <View className="bg-emerald-500 w-6 h-6 rounded-full items-center justify-center z-10 border-2 border-white shadow-sm">
                    <Ionicons name="pin" size={10} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-brand-dark text-[10px] font-bold">Delivery Location</Text>
                    <Text className="text-brand-gray text-[9px] mt-0.5">{selectedDelivery.delivery}</Text>
                  </View>
                </View>
              </View>

              {/* Earnings breakdown */}
              <View className="bg-slate-50 border border-slate-100 rounded-3xl p-5 mb-10">
                <Text className="text-brand-dark text-xs font-bold mb-3">Earning Breakdown</Text>
                
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-brand-gray text-[10px] font-medium">Base Pay</Text>
                  <Text className="text-brand-dark text-[11px] font-bold">${selectedDelivery.basePay.toFixed(2)}</Text>
                </View>

                <View className="flex-row justify-between items-center border-b border-slate-200/50 pb-3.5 mb-3.5">
                  <Text className="text-brand-gray text-[10px] font-medium">Distance ({selectedDelivery.distance})</Text>
                  <Text className="text-brand-dark text-[11px] font-bold">${(selectedDelivery.payout - selectedDelivery.basePay).toFixed(2)}</Text>
                </View>

                <View className="flex-row justify-between items-center">
                  <Text className="text-brand-dark text-xs font-black">Total Payout</Text>
                  <Text className="text-brand-orange text-sm font-black">${selectedDelivery.payout.toFixed(2)}</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface Transaction {
  id: string;
  location: string;
  payout: number;
  date: string;
  receiver: string;
  pickup: string;
  delivery: string;
  distance: string;
  basePay: number;
}

export default function RiderEarnings() {
  const [balance] = useState(1200.00);
  const [totalEarnings] = useState(450.00);
  const [completedCount] = useState(80);

  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Growth chart bar representation: day name, earning, height%
  const chartData = [
    { day: "Sat", amount: 220, height: "55%" },
    { day: "Sun", amount: 350, height: "80%" },
    { day: "Mon", amount: 180, height: "45%" },
    { day: "Tue", amount: 400, height: "95%" },
    { day: "Wed", amount: 240, height: "60%" },
    { day: "Thu", amount: 290, height: "70%" },
    { day: "Fri", amount: 190, height: "48%" },
  ];

  // Transaction Payout History
  const [transactions] = useState<Transaction[]>([
    {
      id: "H37895XTZ",
      location: "Mohakhali, Dhaka",
      payout: 8.50,
      date: "Today, 10:30 AM",
      receiver: "Paul Cortez",
      pickup: "Sakura Garden, 13, Park Place, Cashmoor",
      delivery: "Naraynagnaj, Sadar",
      distance: "1.5 KM",
      basePay: 6.00,
    },
    {
      id: "H37895XTY",
      location: "Mohakhali, Dhaka",
      payout: 12.00,
      date: "Today, 09:15 AM",
      receiver: "Robert Fox",
      pickup: "Margherita Pizza Hub, GEC Circle",
      delivery: "Agrabad, Halishahar",
      distance: "3.2 KM",
      basePay: 9.00,
    },
    {
      id: "H37895XTX",
      location: "Mohakhali, Dhaka",
      payout: 9.50,
      date: "Yesterday, 04:30 PM",
      receiver: "Esther Howard",
      pickup: "KFC Bistro, Lalkhan Bazar",
      delivery: "Tiger Pass, kazi Deiry",
      distance: "1.2 KM",
      basePay: 7.50,
    },
    {
      id: "H37895XTW",
      location: "Mohakhali, Dhaka",
      payout: 15.00,
      date: "Yesterday, 11:20 AM",
      receiver: "Brooklyn Simmons",
      pickup: "Burger King, Nasirabad",
      delivery: "Chittagong High Court Area",
      distance: "5.0 KM",
      basePay: 12.00,
    },
  ]);

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100 shadow-sm">
        <Text className="text-brand-dark text-base font-bold text-center flex-1">Earning</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
        
        {/* Available Balance orange Card */}
        <View className="bg-brand-orange rounded-3xl p-6 shadow-md mb-6 relative overflow-hidden">
          {/* Overlay graphic circles */}
          <View className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
          <View className="absolute -right-2 -bottom-2 w-24 h-24 bg-white/10 rounded-full" />

          <Text className="text-white/80 text-[10px] font-semibold uppercase tracking-wider">Available Balance</Text>
          <Text className="text-white text-3xl font-black mt-2">${balance.toFixed(2)} USD</Text>
          
          <TouchableOpacity
            onPress={() => Alert.alert("Withdrawal", "Initializing bank transfer processing details...")}
            className="bg-white/20 border border-white/30 rounded-2xl py-2.5 items-center mt-5 self-start px-5"
          >
            <Text className="text-white text-xs font-bold">Ready to withdraw</Text>
          </TouchableOpacity>
        </View>

        {/* Earning Growth chart container */}
        <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-brand-dark text-xs font-extrabold">Earning Growth</Text>
            <TouchableOpacity className="flex-row items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
              <Text className="text-brand-gray text-[9px] font-bold">Last 7 Days</Text>
              <Ionicons name="chevron-down" size={10} color="#6A7282" />
            </TouchableOpacity>
          </View>

          {/* Chart visual representation */}
          <View className="h-48 flex-row items-end justify-between px-2 pb-1 border-b border-slate-100 mb-2">
            {chartData.map((item) => (
              <View key={item.day} className="items-center flex-1">
                {/* Earning text indicator above bar */}
                <Text className="text-brand-orange text-[7px] font-bold mb-1.5">${item.amount}</Text>
                
                {/* Bar */}
                <View
                  className="w-5 bg-brand-orange rounded-t-lg"
                  style={{ height: item.height as any }}
                />
              </View>
            ))}
          </View>
          
          {/* X axis labels */}
          <View className="flex-row justify-between px-2">
            {chartData.map((item) => (
              <Text key={item.day} className="text-brand-gray text-[9px] font-semibold flex-1 text-center">
                {item.day}
              </Text>
            ))}
          </View>
        </View>

        {/* Summary metrics section */}
        <View className="flex-row gap-4 mb-6">
          <View className="flex-1 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex-row items-center gap-3">
            <View className="bg-orange-50 p-2.5 rounded-2xl">
              <Ionicons name="stats-chart" size={18} color="#E4792F" />
            </View>
            <View>
              <Text className="text-brand-gray text-[9px] font-semibold">Total Earning</Text>
              <Text className="text-brand-dark text-xs font-black mt-0.5">${totalEarnings.toFixed(2)}</Text>
            </View>
          </View>

          <View className="flex-1 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex-row items-center gap-3">
            <View className="bg-orange-50 p-2.5 rounded-2xl">
              <Ionicons name="checkmark-done" size={18} color="#E4792F" />
            </View>
            <View>
              <Text className="text-brand-gray text-[9px] font-semibold">Completed</Text>
              <Text className="text-brand-dark text-xs font-black mt-0.5">{completedCount}</Text>
            </View>
          </View>
        </View>

        {/* Recent Deliveries payouts listing */}
        <Text className="text-brand-dark text-xs font-bold mb-3.5">Recent Deliveries</Text>
        <View className="gap-3.5 mb-12">
          {transactions.map((tx) => (
            <TouchableOpacity
              key={tx.id}
              onPress={() => setSelectedTx(tx)}
              className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex-row justify-between items-center"
            >
              <View className="flex-row items-center gap-3">
                <View className="bg-orange-50 p-2 rounded-2xl">
                  <Ionicons name="document-text" size={18} color="#E4792F" />
                </View>
                <View>
                  <Text className="text-brand-dark text-xs font-bold">Order ID: {tx.id}</Text>
                  <View className="flex-row items-center gap-1 mt-0.5">
                    <Ionicons name="location-outline" size={9} color="#6A7282" />
                    <Text className="text-brand-gray text-[9px] font-semibold">{tx.location}</Text>
                  </View>
                </View>
              </View>
              <Text className="text-emerald-550 text-xs font-black">
                +${tx.payout.toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* -------------------- Payout Receipt details modal -------------------- */}
      {selectedTx && (
        <View className="absolute inset-0 bg-black/60 z-50 justify-end">
          <View className="bg-white rounded-t-[40px] p-6 shadow-2xl">
            {/* Header */}
            <View className="flex-row justify-between items-center border-b border-slate-100 pb-4 mb-4">
              <TouchableOpacity onPress={() => setSelectedTx(null)}>
                <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
              </TouchableOpacity>
              <Text className="text-brand-dark text-base font-bold">Delivery Details</Text>
              <View className="w-6" />
            </View>

            {/* Map overview mockup */}
            <View className="h-32 rounded-2xl border border-slate-200 overflow-hidden bg-sky-50 items-center justify-center relative mb-5">
              <View className="absolute w-full h-3 bg-white top-1/2 rotate-12" />
              <View className="absolute w-1 h-full bg-white left-1/2" />
              <View className="absolute w-20 h-1 bg-brand-orange top-1/2 rotate-12 flex items-center justify-center">
                <View className="w-2 h-2 bg-brand-orange border border-white rounded-full -left-1" />
                <View className="w-2 h-2 bg-emerald-500 border border-white rounded-full -right-1 ml-auto" />
              </View>
            </View>

            <View className="flex-row justify-between items-center mb-4">
              <View>
                <Text className="text-brand-dark text-xs font-extrabold">Order ID: {selectedTx.id}</Text>
                <Text className="text-brand-gray text-[9px] font-semibold mt-0.5">{selectedTx.date}</Text>
              </View>
              <View className="bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
                <Text className="text-emerald-500 text-[8px] font-bold">Complete</Text>
              </View>
            </View>

            {/* Receiver contact */}
            <View className="flex-row items-center justify-between bg-slate-50 rounded-2xl p-3 mb-4">
              <View className="flex-row items-center gap-2.5">
                <Ionicons name="person-circle" size={24} color="#E4792F" />
                <View>
                  <Text className="text-brand-gray text-[8px] font-semibold">Order Receiver</Text>
                  <Text className="text-brand-dark text-xs font-bold">{selectedTx.receiver}</Text>
                </View>
              </View>
            </View>

            {/* Path description */}
            <View className="gap-2.5 mb-5 pl-1">
              <View className="flex-row items-center gap-2">
                <Ionicons name="storefront" size={12} color="#E4792F" />
                <Text className="text-brand-gray text-[9px] font-semibold flex-1" numberOfLines={1}>
                  {selectedTx.pickup}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Ionicons name="pin" size={12} color="#10B981" />
                <Text className="text-brand-gray text-[9px] font-semibold flex-1" numberOfLines={1}>
                  {selectedTx.delivery}
                </Text>
              </View>
            </View>

            {/* Payout Details */}
            <View className="bg-slate-50 border border-slate-100 rounded-3xl p-4 mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-brand-gray text-[9px]">Base Pay</Text>
                <Text className="text-brand-dark text-[10px] font-bold">${selectedTx.basePay.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between items-center border-b border-slate-200/50 pb-2 mb-2">
                <Text className="text-brand-gray text-[9px]">Distance ({selectedTx.distance})</Text>
                <Text className="text-brand-dark text-[10px] font-bold">${(selectedTx.payout - selectedTx.basePay).toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-brand-dark text-[11px] font-bold">Total Payout</Text>
                <Text className="text-brand-orange text-xs font-black">${selectedTx.payout.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

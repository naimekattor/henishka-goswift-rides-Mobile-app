import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface PayoutTransaction {
  id: string;
  date: string;
  amount: string;
  bank: string;
  status: "Completed" | "Processing" | "Failed";
}

const PAST_PAYOUTS: PayoutTransaction[] = [
  { id: "TXN-9081", date: "June 10, 2026", amount: "$820.00", bank: "Chase Bank (****4890)", status: "Completed" },
  { id: "TXN-8762", date: "June 03, 2026", amount: "$640.50", bank: "Chase Bank (****4890)", status: "Completed" },
  { id: "TXN-8210", date: "May 27, 2026", amount: "$1,120.00", bank: "Chase Bank (****4890)", status: "Completed" },
  { id: "TXN-7911", date: "May 20, 2026", amount: "$510.20", bank: "Chase Bank (****4890)", status: "Completed" },
];

export default function RestaurantEarnings() {
  const [balance, setBalance] = useState(1280.50);
  const [payouts, setPayouts] = useState<PayoutTransaction[]>(PAST_PAYOUTS);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const handleWithdraw = () => {
    if (balance <= 0) return;
    setIsWithdrawing(true);

    // Simulate payout transfer to bank
    setTimeout(() => {
      const amtStr = `$${balance.toFixed(2)}`;
      const newTxn: PayoutTransaction = {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        date: "Today, Just now",
        amount: amtStr,
        bank: "Chase Bank (****4890)",
        status: "Processing"
      };

      setPayouts((prev) => [newTxn, ...prev]);
      setBalance(0);
      setIsWithdrawing(false);
      setWithdrawSuccess(true);

      // Dismiss success notification
      setTimeout(() => {
        setWithdrawSuccess(false);
      }, 3500);
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* Top Header */}
      <View className="bg-white border-b border-gray-100 px-6 py-4 shadow-sm">
        <Text className="text-brand-dark text-lg font-bold">Earnings & Payouts</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-6 py-4 flex-1">
        {/* Wallet Balance Card */}
        <View className="bg-brand-orange rounded-3xl p-6 mb-6 shadow-lg shadow-brand-orange/25">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-white/80 text-xs font-semibold">Wallet Balance</Text>
            <Ionicons name="wallet-outline" size={20} color="white" />
          </View>
          <Text className="text-white text-3xl font-extrabold mb-5">${balance.toFixed(2)}</Text>

          {/* Request Button */}
          {balance > 0 ? (
            <TouchableOpacity
              onPress={handleWithdraw}
              disabled={isWithdrawing}
              activeOpacity={0.8}
              className="bg-white py-3.5 rounded-2xl items-center justify-center flex-row gap-2"
            >
              {isWithdrawing ? (
                <ActivityIndicator size="small" color="#E4792F" />
              ) : (
                <>
                  <Text className="text-brand-orange text-sm font-bold">Withdraw to Chase Bank</Text>
                  <Ionicons name="arrow-forward" size={16} color="#E4792F" />
                </>
              )}
            </TouchableOpacity>
          ) : (
            <View className="bg-white/20 py-3.5 rounded-2xl items-center justify-center">
              <Text className="text-white/80 text-sm font-bold">No Funds Available for Payout</Text>
            </View>
          )}
        </View>

        {/* Success Toast */}
        {withdrawSuccess && (
          <View className="bg-green-50 border border-green-200 rounded-2xl p-4 flex-row items-center gap-3 mb-6">
            <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            <View className="flex-1">
              <Text className="text-green-800 text-sm font-bold">Withdrawal Initiated</Text>
              <Text className="text-green-700 text-xs mt-0.5">
                Funds are being transferred. Check Chase Bank account shortly.
              </Text>
            </View>
          </View>
        )}

        {/* Statistics Sheet */}
        <View className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm">
          <Text className="text-brand-dark text-sm font-bold mb-4">Financial Breakdown</Text>
          <View className="gap-3">
            <View className="flex-row justify-between">
              <Text className="text-brand-gray text-xs">Total Sales (Gross)</Text>
              <Text className="text-brand-dark text-xs font-bold">$4,850.00</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-brand-gray text-xs">Tax Collected</Text>
              <Text className="text-brand-dark text-xs font-bold">$388.00</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-brand-gray text-xs">Customer Tips</Text>
              <Text className="text-brand-dark text-xs font-bold">$212.50</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-brand-gray text-xs">GoSwift Commission (15%)</Text>
              <Text className="text-red-500 text-xs font-bold">-$727.50</Text>
            </View>
            <View className="border-t border-gray-100 pt-3 flex-row justify-between items-center mt-1">
              <Text className="text-brand-dark text-sm font-bold">Total Net Earnings</Text>
              <Text className="text-brand-orange text-base font-extrabold">$4,723.00</Text>
            </View>
          </View>
        </View>

        {/* Payout History */}
        <View className="mb-10">
          <Text className="text-brand-dark text-sm font-bold mb-4">Payout History</Text>
          <View className="gap-3">
            {payouts.map((txn) => (
              <View key={txn.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex-row justify-between items-center shadow-sm">
                <View>
                  <View className="flex-row items-center gap-2 mb-1">
                    <Text className="text-brand-dark text-sm font-bold">{txn.amount}</Text>
                    <Text className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      txn.status === "Completed" ? "bg-green-50 text-green-700" :
                      txn.status === "Processing" ? "bg-amber-50 text-amber-700" :
                      "bg-red-50 text-red-700"
                    }`}>
                      {txn.status}
                    </Text>
                  </View>
                  <Text className="text-brand-gray text-[10px]">{txn.bank} • {txn.date}</Text>
                </View>
                <Text className="text-brand-gray text-xs">{txn.id}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

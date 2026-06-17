import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Transaction {
  id: string;
  type: "payout" | "withdrawal";
  title: string;
  subtitle: string;
  date: string;
  amount: string;
  isPositive: boolean;
}

export default function TransportDriverWallet() {
  const router = useRouter();

  const [activeView, setActiveView] = useState<"home" | "transactions" | "withdraw" | "success">("home");

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "payout",
      title: "Order Payout",
      subtitle: "Order #10235",
      date: "May 18, 2025 2:30 PM",
      amount: "+$32.50",
      isPositive: true,
    },
    {
      id: "2",
      type: "withdrawal",
      title: "Daily Payout to Bank",
      subtitle: "Today, 1:15 PM",
      date: "May 18, 2025 2:30 PM",
      amount: "-450.00",
      isPositive: false,
    },
    {
      id: "3",
      type: "payout",
      title: "Order Payout",
      subtitle: "Order #10235",
      date: "May 18, 2025 2:30 PM",
      amount: "+$32.50",
      isPositive: true,
    },
    {
      id: "4",
      type: "payout",
      title: "Order Payout",
      subtitle: "Order #10235",
      date: "May 18, 2025 2:30 PM",
      amount: "+$32.50",
      isPositive: true,
    },
    {
      id: "5",
      type: "withdrawal",
      title: "Daily Payout to Bank",
      subtitle: "Today, 1:15 PM",
      date: "May 18, 2025 2:30 PM",
      amount: "-450.00",
      isPositive: false,
    },
    {
      id: "6",
      type: "payout",
      title: "Order Payout",
      subtitle: "Order #10235",
      date: "May 18, 2025 2:30 PM",
      amount: "+$32.50",
      isPositive: true,
    },
    {
      id: "7",
      type: "payout",
      title: "Order Payout",
      subtitle: "Order #10235",
      date: "May 18, 2025 2:30 PM",
      amount: "+$32.50",
      isPositive: true,
    },
  ];

  const chartData = [
    { day: "Sat", val: 30 },
    { day: "Sun", val: 50 },
    { day: "Mon", val: 40 },
    { day: "Tue", val: 75 },
    { day: "Wed", val: 60 },
    { day: "Thu", val: 90 },
    { day: "Fri", val: 80 },
  ];

  const handleWithdrawalSubmit = () => {
    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      Alert.alert("Missing Details", "Please enter all credit card details to withdraw.");
      return;
    }
    setActiveView("success");
  };

  const handleCopyToClipboard = () => {
    Alert.alert("Copied", "Transaction ID TXN-Z08GH0F34 copied to clipboard!");
  };

  const handleDownloadReceipt = () => {
    Alert.alert("Receipt Downloaded", "PDF transaction receipt has been saved to your storage.");
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* -------------------- WALLET HOME SCREEN -------------------- */}
      {activeView === "home" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => router.replace("/(transport-driver)/dashboard" as any)}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Wallet</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Available Balance Card */}
            <View className="bg-brand-orange p-6 rounded-3xl shadow-lg shadow-brand-orange/25 mb-6 relative overflow-hidden">
              <View className="absolute right-[-10px] bottom-[-20px] w-36 h-36 rounded-full bg-white/5" />
              <View className="absolute right-[40px] top-[-30px] w-24 h-24 rounded-full bg-white/5" />

              <Text className="text-white/80 text-xs font-bold mb-1">Available Balance</Text>
              <Text className="text-white text-3xl font-extrabold mb-6">$1,200.00 <Text className="text-xs font-semibold">USD</Text></Text>

              <TouchableOpacity
                onPress={() => setActiveView("withdraw")}
                className="bg-white/10 border border-white/20 rounded-2xl py-3 flex-row items-center justify-center gap-2"
              >
                <Ionicons name="card-outline" size={16} color="white" />
                <Text className="text-white text-xs font-bold">Ready to withdraw</Text>
              </TouchableOpacity>
            </View>

            {/* Weekly Earning Growth */}
            <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-6">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-brand-dark text-sm font-bold">Earning Growth</Text>
                <TouchableOpacity className="flex-row items-center gap-1 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full">
                  <Text className="text-brand-gray text-[10px] font-bold">This Week</Text>
                  <Ionicons name="chevron-down" size={12} color="#6A7282" />
                </TouchableOpacity>
              </View>

              <View className="h-44 flex-row">
                <View className="justify-between h-36 pr-2">
                  <Text className="text-[9px] text-brand-gray font-semibold">400$</Text>
                  <Text className="text-[9px] text-brand-gray font-semibold">300$</Text>
                  <Text className="text-[9px] text-brand-gray font-semibold">200$</Text>
                  <Text className="text-[9px] text-brand-gray font-semibold">100$</Text>
                  <Text className="text-[9px] text-brand-gray font-semibold">0$</Text>
                </View>

                <View className="flex-1">
                  <View className="h-36 relative border-l border-b border-gray-100 flex-row justify-between px-2 pt-2">
                    <View className="absolute top-[25%] left-0 right-0 h-[1px] bg-gray-100" />
                    <View className="absolute top-[50%] left-0 right-0 h-[1px] bg-gray-100" />
                    <View className="absolute top-[75%] left-0 right-0 h-[1px] bg-gray-100" />

                    {chartData.map((item, idx) => (
                      <View key={idx} className="flex-1 items-center justify-end h-full relative">
                        <View
                          style={{ height: `${item.val}%` }}
                          className="w-1.5 bg-[#E4792F]/15 rounded-t-full items-center justify-start"
                        >
                          <View className="w-3 h-3 rounded-full bg-[#E4792F] border-2 border-white -mt-0.5 shadow" />
                        </View>
                      </View>
                    ))}
                  </View>

                  <View className="flex-row justify-between pt-2 px-2">
                    {chartData.map((item) => (
                      <Text key={item.day} className="text-[9px] text-brand-gray font-semibold w-7 text-center">
                        {item.day}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            </View>

            {/* Recent Transactions */}
            <View className="mb-12">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-brand-dark text-sm font-bold">Recent Transactions</Text>
                <TouchableOpacity onPress={() => setActiveView("transactions")}>
                  <Text className="text-brand-orange text-xs font-bold">View All</Text>
                </TouchableOpacity>
              </View>

              <View className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden px-4">
                {transactions.slice(0, 5).map((item, idx) => (
                  <View
                    key={item.id}
                    className={`flex-row py-4 items-center justify-between ${
                      idx < 4 ? "border-b border-slate-50" : ""
                    }`}
                  >
                    <View className="flex-row items-center gap-3">
                      <View
                        className={`w-9 h-9 rounded-xl items-center justify-center ${
                          item.isPositive ? "bg-emerald-50" : "bg-slate-50"
                        }`}
                      >
                        <Ionicons
                          name={item.isPositive ? "trending-up" : "card-outline"}
                          size={16}
                          color={item.isPositive ? "#10B981" : "#6A7282"}
                        />
                      </View>
                      <View>
                        <Text className="text-brand-dark text-xs font-bold">{item.title}</Text>
                        <Text className="text-brand-gray text-[9px] font-semibold mt-0.5">{item.subtitle}</Text>
                      </View>
                    </View>
                    <View className="items-end">
                      <Text
                        className={`text-xs font-bold ${
                          item.isPositive ? "text-emerald-500" : "text-brand-dark"
                        }`}
                      >
                        {item.amount}
                      </Text>
                      <Text className="text-slate-400 text-[8px] font-semibold mt-0.5">
                        May 18, 2025 2:30 PM
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- TRANSACTION HISTORY -------------------- */}
      {activeView === "transactions" && (
        <View className="flex-1">
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveView("home")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Transaction</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden px-4 mb-12">
              {transactions.map((item, idx) => (
                <View
                  key={item.id}
                  className={`flex-row py-4 items-center justify-between ${
                    idx < transactions.length - 1 ? "border-b border-slate-50" : ""
                  }`}
                >
                  <View className="flex-row items-center gap-3">
                    <View
                      className={`w-9 h-9 rounded-xl items-center justify-center ${
                        item.isPositive ? "bg-emerald-50" : "bg-slate-50"
                      }`}
                    >
                      <Ionicons
                        name={item.isPositive ? "trending-up" : "card-outline"}
                        size={16}
                        color={item.isPositive ? "#10B981" : "#6A7282"}
                      />
                    </View>
                    <View>
                      <Text className="text-brand-dark text-xs font-bold">{item.title}</Text>
                      <Text className="text-brand-gray text-[9px] font-semibold mt-0.5">{item.subtitle}</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text
                      className={`text-xs font-bold ${
                        item.isPositive ? "text-emerald-500" : "text-brand-dark"
                      }`}
                    >
                      {item.amount}
                    </Text>
                    <Text className="text-slate-400 text-[8px] font-semibold mt-0.5">
                      {item.date}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- WITHDRAW FUNDS -------------------- */}
      {activeView === "withdraw" && (
        <View className="flex-1 bg-white">
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveView("home")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Withdraw Funds</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Revenue Today */}
            <View className="bg-slate-50 rounded-3xl p-5 border border-slate-100 shadow-sm items-center justify-center mb-6">
              <Text className="text-brand-gray text-[10px] font-bold">Revenue Today</Text>
              <Text className="text-brand-dark text-3xl font-extrabold mt-1">$1,200</Text>
            </View>

            {/* Calculations */}
            <View className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm mb-6 gap-3.5">
              <View className="flex-row justify-between items-center">
                <Text className="text-brand-gray text-xs font-semibold">Withdrawal Amount</Text>
                <Text className="text-brand-dark text-xs font-bold">$1,200</Text>
              </View>

              <View className="flex-row justify-between items-center border-b border-slate-50 pb-3.5">
                <Text className="text-brand-gray text-xs font-semibold">Processing Fee (2.5%)</Text>
                <Text className="text-brand-dark text-xs font-bold">-$2.95</Text>
              </View>

              <View className="flex-row justify-between items-center pt-2">
                <Text className="text-brand-dark text-xs font-bold">Total You'll receive</Text>
                <Text className="text-brand-orange text-sm font-extrabold">$1,197.02</Text>
              </View>
            </View>

            {/* Card Form */}
            <View className="gap-4 mb-12">
              <View className="gap-1.5">
                <Text className="text-xs font-bold text-brand-dark mb-1.5">Card Number</Text>
                <TextInput
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  placeholder="write here..."
                  placeholderTextColor="#A0AEC0"
                  keyboardType="numeric"
                  className="w-full bg-slate-50/50 border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                />
              </View>

              <View className="flex-row gap-4">
                <View className="flex-1 gap-1.5">
                  <Text className="text-xs font-bold text-brand-dark mb-1.5">Expiry Date</Text>
                  <TextInput
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                    placeholder="write here..."
                    placeholderTextColor="#A0AEC0"
                    className="w-full bg-slate-50/50 border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                  />
                </View>
                <View className="flex-1 gap-1.5">
                  <Text className="text-xs font-bold text-brand-dark mb-1.5">CVV</Text>
                  <TextInput
                    value={cvv}
                    onChangeText={setCvv}
                    placeholder="write here..."
                    placeholderTextColor="#A0AEC0"
                    keyboardType="numeric"
                    secureTextEntry
                    className="w-full bg-slate-50/50 border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                  />
                </View>
              </View>

              <View className="gap-1.5">
                <Text className="text-xs font-bold text-brand-dark mb-1.5">Cardholder Name</Text>
                <TextInput
                  value={cardholderName}
                  onChangeText={setCardholderName}
                  placeholder="write here..."
                  placeholderTextColor="#A0AEC0"
                  className="w-full bg-slate-50/50 border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                />
              </View>

              <TouchableOpacity
                onPress={handleWithdrawalSubmit}
                className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mt-4 shadow"
              >
                <Text className="text-white text-base font-bold">Confirm</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- WITHDRAW SUCCESS -------------------- */}
      {activeView === "success" && (
        <View className="flex-1 bg-white">
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="items-center justify-center pt-8 pb-10">
              <View className="w-40 h-40 bg-orange-50 rounded-full items-center justify-center mb-6">
                <Ionicons name="checkmark-circle" size={80} color="#E4792F" />
              </View>
            </View>

            <Text className="text-brand-dark text-xl font-bold text-center mb-2">
              Withdraw Successful
            </Text>
            <Text className="text-brand-gray text-xs text-center px-6 leading-5 mb-8">
              Please Check Your Notification, We Just Sent You A Message.
            </Text>

            <View className="bg-slate-50 border border-slate-100 rounded-3xl p-5 mb-8 gap-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-brand-gray text-[10px] font-bold">Transaction ID</Text>
                <TouchableOpacity onPress={handleCopyToClipboard} className="flex-row items-center gap-1 bg-white border border-slate-200 px-3 py-1 rounded-xl">
                  <Text className="text-brand-dark text-[10px] font-bold">TXN-Z08GH0F34</Text>
                  <Ionicons name="copy-outline" size={10} color="#6A7282" />
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center justify-between border-t border-slate-100 pt-4">
                <Text className="text-brand-gray text-[10px] font-bold">Date & Time</Text>
                <Text className="text-brand-dark text-[10px] font-semibold">May 13, 2026 at 2:33 PM</Text>
              </View>

              <View className="flex-row items-center justify-between border-t border-slate-100 pt-4">
                <Text className="text-brand-gray text-[10px] font-bold">Status</Text>
                <View className="bg-[#E4792F]/10 px-2 py-0.5 rounded">
                  <Text className="text-brand-orange text-[10px] font-bold">Processing</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleDownloadReceipt}
              className="w-full py-4 border border-brand-orange rounded-2xl flex-row items-center justify-center gap-2 mb-4"
            >
              <Ionicons name="download-outline" size={16} color="#E4792F" />
              <Text className="text-brand-orange text-xs font-bold">Download Receipt</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setCardNumber("");
                setExpiryDate("");
                setCvv("");
                setCardholderName("");
                setActiveView("home");
              }}
              className="w-full py-4 bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center mb-12"
            >
              <Text className="text-brand-dark text-xs font-bold">Back to Wallet</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

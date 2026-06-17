import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface Transaction {
  id: string;
  title: string;
  orderId: string;
  amount: string;
  type: "credit" | "debit";
  time: string;
}

const TRANSACTIONS: Transaction[] = [
  { id: "1", title: "Order Payout", orderId: "Order #10235", amount: "+$32.50", type: "credit", time: "May 18, 2025 2:30 PM" },
  { id: "2", title: "Daily Payout to Bank", orderId: "Bank Transfer", amount: "-$450.00", type: "debit", time: "Today, 1:15 PM" },
  { id: "3", title: "Order Payout", orderId: "Order #10234", amount: "+$32.50", type: "credit", time: "May 18, 2025 2:30 PM" },
  { id: "4", title: "Order Payout", orderId: "Order #10233", amount: "+$32.50", type: "credit", time: "May 18, 2025 2:30 PM" },
  { id: "5", title: "Daily Payout to Bank", orderId: "Bank Transfer", amount: "-$450.00", type: "debit", time: "May 18, 2025 2:30 PM" },
  { id: "6", title: "Order Payout", orderId: "Order #10232", amount: "+$32.50", type: "credit", time: "May 18, 2025 2:30 PM" },
];

export default function RestaurantEarnings() {
  const [currentView, setCurrentView] = useState<"wallet" | "transactions" | "withdraw" | "success">("wallet");
  const [transactions, setTransactions] = useState<Transaction[]>(TRANSACTIONS);

  // Form states
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholder, setCardholder] = useState("");

  const handleConfirmWithdraw = () => {
    // Navigate to success screen
    setCurrentView("success");
    // Insert a new transaction in history
    const newTx: Transaction = {
      id: Math.random().toString(),
      title: "Daily Payout to Bank",
      orderId: "Bank Payout",
      amount: "-$1,200.00",
      type: "debit",
      time: "Today, Just now",
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const getWeekDays = () => [
    { day: "Sun", val: 30 },
    { day: "Mon", val: 50 },
    { day: "Tue", val: 40 },
    { day: "Wed", val: 75 },
    { day: "Thu", val: 60 },
    { day: "Fri", val: 90 },
    { day: "Sat", val: 80 },
  ];

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {currentView === "wallet" && (
        // Main Wallet Screen (Mockup 1)
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center px-6 py-4 bg-white border-b border-gray-100 shadow-sm">
            <TouchableOpacity className="p-1 mr-3">
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Wallet</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Balance Card */}
            <View className="bg-[#A34E24] rounded-[32px] p-6 mb-6 shadow-sm">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-white/80 text-xs font-semibold">Available Balance</Text>
                <TouchableOpacity className="p-1">
                  <Ionicons name="ellipsis-horizontal" size={18} color="white" />
                </TouchableOpacity>
              </View>
              <Text className="text-white text-3xl font-black mb-5">$1,200.00 USD</Text>

              {/* Ready to withdraw button */}
              <TouchableOpacity
                onPress={() => setCurrentView("withdraw")}
                className="bg-white/15 py-3 rounded-2xl items-center justify-center border border-white/20"
              >
                <Text className="text-white text-xs font-bold">Ready to withdraw</Text>
              </TouchableOpacity>
            </View>

            {/* Line Chart card using CSS Styled Components */}
            <View className="bg-white rounded-3xl border border-gray-100 p-5 mb-6 shadow-sm">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-brand-dark text-sm font-bold">Earning Growth</Text>
                <TouchableOpacity className="flex-row items-center gap-1 border border-gray-200 px-3 py-1.5 rounded-xl bg-gray-50">
                  <Text className="text-brand-gray text-[10px] font-bold">This Week</Text>
                  <Ionicons name="chevron-down" size={10} color="#6A7282" />
                </TouchableOpacity>
              </View>

              {/* High Fidelity Custom View Chart */}
              <View className="h-44 flex-row">
                {/* Y Axis labels */}
                <View className="justify-between h-36 pr-2">
                  <Text className="text-[9px] text-brand-gray font-semibold">400$</Text>
                  <Text className="text-[9px] text-brand-gray font-semibold">300$</Text>
                  <Text className="text-[9px] text-brand-gray font-semibold">200$</Text>
                  <Text className="text-[9px] text-brand-gray font-semibold">100$</Text>
                  <Text className="text-[9px] text-brand-gray font-semibold">0$</Text>
                </View>

                {/* Plot Area */}
                <View className="flex-1">
                  <View className="h-36 relative border-l border-b border-gray-100 flex-row justify-between px-2 pt-2">
                    {/* Background grid lines */}
                    <View className="absolute top-[25%] left-0 right-0 h-[1px] bg-gray-100" />
                    <View className="absolute top-[50%] left-0 right-0 h-[1px] bg-gray-100" />
                    <View className="absolute top-[75%] left-0 right-0 h-[1px] bg-gray-100" />

                    {getWeekDays().map((item, idx) => (
                      <View key={idx} className="flex-1 items-center justify-end h-full relative">
                        {/* Earning bar */}
                        <View
                          style={{ height: `${item.val}%` }}
                          className="w-1.5 bg-[#E4792F]/15 rounded-t-full items-center justify-start"
                        >
                          {/* Dot marker */}
                          <View className="w-3.5 h-3.5 rounded-full bg-[#E4792F] border-2 border-white -mt-1 shadow" />
                        </View>
                      </View>
                    ))}
                  </View>

                  {/* X Axis days */}
                  <View className="flex-row justify-between pt-2 px-2">
                    {getWeekDays().map((item) => (
                      <Text key={item.day} className="text-[9px] text-brand-gray font-semibold w-7 text-center">
                        {item.day}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            </View>

            {/* Recent Transactions List */}
            <View className="mb-12">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-brand-dark text-base font-bold">Recent Transactions</Text>
                <TouchableOpacity onPress={() => setCurrentView("transactions")}>
                  <Text className="text-[#E4792F] text-xs font-bold">View All</Text>
                </TouchableOpacity>
              </View>

              <View className="gap-3">
                {transactions.slice(0, 3).map((tx) => (
                  <View
                    key={tx.id}
                    className="bg-white border border-gray-100 rounded-2xl p-4 flex-row justify-between items-center shadow-sm"
                  >
                    <View className="flex-row items-center gap-3">
                      <View
                        className={`w-10 h-10 rounded-xl items-center justify-center ${
                          tx.type === "credit" ? "bg-green-50" : "bg-orange-50"
                        }`}
                      >
                        <Ionicons
                          name={tx.type === "credit" ? "arrow-down-outline" : "arrow-up-outline"}
                          size={18}
                          color={tx.type === "credit" ? "#10B981" : "#E4792F"}
                        />
                      </View>
                      <View>
                        <Text className="text-brand-dark text-sm font-bold">{tx.title}</Text>
                        <Text className="text-brand-gray text-[10px] mt-0.5">
                          {tx.orderId} · {tx.time}
                        </Text>
                      </View>
                    </View>
                    <Text
                      className={`text-sm font-extrabold ${
                        tx.type === "credit" ? "text-green-600" : "text-brand-dark"
                      }`}
                    >
                      {tx.amount}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      {currentView === "transactions" && (
        // Transaction List View (Mockup 2)
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center px-6 py-4 bg-white border-b border-gray-100 shadow-sm">
            <TouchableOpacity onPress={() => setCurrentView("wallet")} className="p-1 mr-3">
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Transaction</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="gap-3 pb-16">
              {transactions.map((tx) => (
                <View
                  key={tx.id}
                  className="bg-white border border-gray-100 rounded-2xl p-4 flex-row justify-between items-center shadow-sm"
                >
                  <View className="flex-row items-center gap-3">
                    <View
                      className={`w-10 h-10 rounded-xl items-center justify-center ${
                        tx.type === "credit" ? "bg-green-50" : "bg-orange-50"
                      }`}
                    >
                      <Ionicons
                        name={tx.type === "credit" ? "arrow-down-outline" : "arrow-up-outline"}
                        size={18}
                        color={tx.type === "credit" ? "#10B981" : "#E4792F"}
                      />
                    </View>
                    <View>
                      <Text className="text-brand-dark text-sm font-bold">{tx.title}</Text>
                      <Text className="text-brand-gray text-[10px] mt-0.5">
                        {tx.orderId} · {tx.time}
                      </Text>
                    </View>
                  </View>
                  <Text
                    className={`text-sm font-extrabold ${
                      tx.type === "credit" ? "text-green-600" : "text-brand-dark"
                    }`}
                  >
                    {tx.amount}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {currentView === "withdraw" && (
        // Withdraw Funds Screen (Mockup 3)
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row items-center px-6 py-4 bg-white border-b border-gray-100">
            <TouchableOpacity onPress={() => setCurrentView("wallet")} className="p-1 mr-3">
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Withdraw Funds</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Amount Breakdown Card */}
            <View className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-6">
              <Text className="text-brand-dark text-center text-xs font-semibold mb-1">
                Revenue Today
              </Text>
              <Text className="text-brand-dark text-center text-3xl font-black mb-4">
                $1,200
              </Text>

              <View className="gap-3 border-t border-gray-200/60 pt-4">
                <View className="flex-row justify-between">
                  <Text className="text-brand-gray text-xs">Withdrawal Amount</Text>
                  <Text className="text-brand-dark text-xs font-bold">$1,200</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-brand-gray text-xs">Processing Fee (2.5%)</Text>
                  <Text className="text-brand-dark text-xs font-bold">-$2.95</Text>
                </View>
                <View className="flex-row justify-between items-center border-t border-gray-200/60 pt-3 mt-1">
                  <Text className="text-brand-dark text-xs font-bold">Total You'll receive</Text>
                  <Text className="text-[#E4792F] text-base font-extrabold">$1,197.02</Text>
                </View>
              </View>
            </View>

            {/* Inputs Card */}
            <View className="gap-4 mb-12">
              <View>
                <Text className="text-xs font-bold text-brand-dark mb-1.5">Card Number</Text>
                <TextInput
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  placeholder="write here..."
                  placeholderTextColor="#A0AEC0"
                  keyboardType="number-pad"
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                />
              </View>

              <View className="flex-row gap-4">
                <View className="flex-1">
                  <Text className="text-xs font-bold text-brand-dark mb-1.5">Expiry Date</Text>
                  <TextInput
                    value={expiry}
                    onChangeText={setExpiry}
                    placeholder="write here..."
                    placeholderTextColor="#A0AEC0"
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-xs font-bold text-brand-dark mb-1.5">CVV</Text>
                  <TextInput
                    value={cvv}
                    onChangeText={setCvv}
                    placeholder="write here..."
                    placeholderTextColor="#A0AEC0"
                    keyboardType="number-pad"
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                  />
                </View>
              </View>

              <View>
                <Text className="text-xs font-bold text-brand-dark mb-1.5">Cardholder Name</Text>
                <TextInput
                  value={cardholder}
                  onChangeText={setCardholder}
                  placeholder="write here..."
                  placeholderTextColor="#A0AEC0"
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                />
              </View>
            </View>

            {/* Confirm button */}
            <TouchableOpacity
              onPress={handleConfirmWithdraw}
              className="w-full py-4 bg-[#E4792F] rounded-2xl items-center justify-center shadow mb-12"
            >
              <Text className="text-white text-sm font-bold">Confirm</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {currentView === "success" && (
        // Withdraw Successful Screen (Mockup 4)
        <View className="flex-1 bg-white">
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Top graphic illustration area */}
            <View className="items-center py-8">
              <View className="w-40 h-40 bg-orange-50 rounded-full items-center justify-center mb-6">
                <Ionicons name="checkmark-circle" size={80} color="#E4792F" />
              </View>
              <Text className="text-brand-dark text-xl font-black">Withdraw Successful</Text>
              <Text className="text-brand-gray text-center text-xs mt-2 leading-5 px-6">
                Please Check Your Notification, We Just Sent You A Message.
              </Text>
            </View>

            {/* Info receipt */}
            <View className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-8">
              <View className="flex-row justify-between items-center pb-3 border-b border-gray-200/60 mb-3">
                <View>
                  <Text className="text-brand-gray text-[10px] font-semibold">Transaction ID</Text>
                  <Text className="text-brand-dark text-sm font-bold mt-0.5">TXN-Z08GH0F34</Text>
                </View>
                <TouchableOpacity className="p-2 bg-white rounded-xl border border-gray-200">
                  <Ionicons name="copy-outline" size={14} color="#6A7282" />
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-between items-center py-1">
                <Text className="text-brand-gray text-xs">Date & Time</Text>
                <Text className="text-brand-dark text-xs font-semibold">May 13, 2026 at 2:33 PM</Text>
              </View>

              <View className="flex-row justify-between items-center py-1 mt-1">
                <Text className="text-brand-gray text-xs">Status</Text>
                <Text className="text-[#E4792F] text-xs font-bold bg-orange-50 px-2 py-0.5 rounded">
                  Processing
                </Text>
              </View>
            </View>

            {/* Actions */}
            <View className="gap-3 pb-12">
              <TouchableOpacity
                onPress={() => {
                  setCardNumber("");
                  setExpiry("");
                  setCvv("");
                  setCardholder("");
                  setCurrentView("wallet");
                }}
                className="w-full py-4 bg-white border border-[#E4792F] rounded-2xl items-center justify-center flex-row gap-2"
              >
                <Ionicons name="download-outline" size={16} color="#E4792F" />
                <Text className="text-[#E4792F] text-sm font-bold">Download Receipt</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

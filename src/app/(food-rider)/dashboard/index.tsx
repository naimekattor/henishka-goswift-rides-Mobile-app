import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  Dimensions,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function RiderDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  
  // Stats
  const [todayEarnings, setTodayEarnings] = useState(45.00);
  const [completedOrders, setCompletedOrders] = useState(8);

  // Simulation State: 'idle' | 'new_request' | 'accepted' | 'picked_up'
  const [orderState, setOrderState] = useState<"idle" | "new_request" | "accepted" | "picked_up">("idle");
  const [countdown, setCountdown] = useState(23);
  
  // Custom Slider progress
  const [slideAnim] = useState(new Animated.Value(0));

  // Recent deliveries list
  const [recentDeliveries, setRecentDeliveries] = useState([
    { id: "H37895XTZ", location: "Mohakhali, Dhaka", time: "10:30 AM", payout: 8.50 },
    { id: "H37895XTY", location: "Mohakhali, Dhaka", time: "09:15 AM", payout: 12.00 },
    { id: "H37895XTX", location: "Mohakhali, Dhaka", time: "Yesterday", payout: 9.50 },
    { id: "H37895XTW", location: "Mohakhali, Dhaka", time: "Yesterday", payout: 15.00 },
  ]);

  // Countdown timer for new request simulation
  useEffect(() => {
    let interval: any;
    if (orderState === "new_request") {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setOrderState("idle");
            return 23;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [orderState]);

  // Reset slide animation when changing states
  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [orderState]);

  const handleSimulateRequest = () => {
    if (!isOnline) {
      Alert.alert("Offline", "Please switch your status to Online to receive requests.");
      return;
    }
    setCountdown(23);
    setOrderState("new_request");
  };

  const handleAcceptOrder = () => {
    setOrderState("accepted");
  };

  const handleRejectOrder = () => {
    setOrderState("idle");
  };

  // Simulate a sliding button action
  const triggerSliderAction = () => {
    Animated.timing(slideAnim, {
      toValue: width - 110, // slide boundary
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      if (orderState === "accepted") {
        // Picked up order
        setOrderState("picked_up");
      } else if (orderState === "picked_up") {
        // Delivered order!
        const orderPayout = 8.50;
        setTodayEarnings((prev) => prev + orderPayout);
        setCompletedOrders((prev) => prev + 1);
        
        // Add to history
        setRecentDeliveries([
          {
            id: `H${Math.floor(100000 + Math.random() * 900000)}XTZ`,
            location: "Naraynagnaj, Sadar",
            time: "Just Now",
            payout: orderPayout,
          },
          ...recentDeliveries,
        ]);
        
        Alert.alert(
          "Delivery Complete!",
          `Congratulations! You've successfully completed the delivery.\n+$${orderPayout.toFixed(2)} USD added to earnings.`,
          [{ text: "Awesome", onPress: () => setOrderState("idle") }]
        );
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* Scrollable Dashboard View */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        
        {/* Header Block */}
        <View className="bg-brand-orange px-6 pt-4 pb-12 rounded-b-[40px] shadow-md relative">
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row items-center gap-1">
              <Ionicons name="flash" size={20} color="#white" />
              <Text className="text-white text-lg font-black tracking-tight">Goswift Rides</Text>
            </View>
            <TouchableOpacity className="bg-white/20 p-2.5 rounded-full">
              <Ionicons name="notifications-outline" size={18} color="white" />
            </TouchableOpacity>
          </View>

          {/* User welcome card */}
          <View className="flex-row items-center gap-4">
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" }}
              className="w-16 h-16 rounded-full border-2 border-white"
            />
            <View>
              <Text className="text-white/80 text-xs font-semibold">Welcome back,</Text>
              <Text className="text-white text-base font-extrabold mt-0.5">Rahim Rehman</Text>
            </View>
          </View>
        </View>

        {/* Dashboard floating elements */}
        <View className="px-6 -mt-8">
          {/* Online Toggle Switch Card */}
          <View className="bg-white rounded-3xl border border-slate-100 p-4 flex-row justify-between items-center shadow-sm mb-5">
            <View className="flex-row items-center gap-3.5">
              <View className={`w-10 h-10 rounded-2xl items-center justify-center ${isOnline ? "bg-orange-50" : "bg-slate-50"}`}>
                <Ionicons name="wifi" size={20} color={isOnline ? "#E4792F" : "#6A7282"} />
              </View>
              <View>
                <Text className="text-brand-dark text-xs font-extrabold">
                  {isOnline ? "You're Online" : "You're Offline"}
                </Text>
                <Text className="text-brand-gray text-[10px] font-medium mt-0.5">
                  {isOnline ? "Waiting for new orders" : "Toggle to start receiving orders"}
                </Text>
              </View>
            </View>
            <Switch
              value={isOnline}
              onValueChange={(val) => {
                setIsOnline(val);
                if (!val) setOrderState("idle"); // reset order state if going offline
              }}
              trackColor={{ false: "#E2E8F0", true: "#fbd38d" }}
              thumbColor={isOnline ? "#E4792F" : "#A0AEC0"}
            />
          </View>

          {/* Today's Earning Metrics Summary */}
          <View className="flex-row gap-4 mb-6">
            <View className="flex-1 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex-row items-center gap-3.5">
              <View className="bg-orange-50 p-2.5 rounded-2xl">
                <Ionicons name="cash-outline" size={20} color="#E4792F" />
              </View>
              <View>
                <Text className="text-brand-gray text-[10px] font-semibold">Today's Earning</Text>
                <Text className="text-brand-dark text-sm font-black mt-0.5">${todayEarnings.toFixed(2)}</Text>
              </View>
            </View>

            <View className="flex-1 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex-row items-center gap-3.5">
              <View className="bg-orange-50 p-2.5 rounded-2xl">
                <Ionicons name="checkmark-done" size={20} color="#E4792F" />
              </View>
              <View>
                <Text className="text-brand-gray text-[10px] font-semibold">Completed</Text>
                <Text className="text-brand-dark text-sm font-black mt-0.5">{completedOrders}</Text>
              </View>
            </View>
          </View>

          {/* ----------------- ACTIVE ORDER CARD CONTROLLER ----------------- */}
          <Text className="text-brand-dark text-sm font-extrabold mb-3.5">Active Order</Text>

          {orderState === "idle" && (
            <View className="bg-white rounded-3xl border border-slate-100 p-6 items-center shadow-sm mb-6">
              {/* Illustration Map representation */}
              <View className="w-24 h-24 bg-orange-50/50 rounded-full items-center justify-center mb-4 relative">
                <Ionicons name="map-outline" size={42} color="#E4792F" />
                <View className="absolute bottom-1 right-2 bg-brand-orange w-5.5 h-5.5 rounded-full items-center justify-center border border-white">
                  <Ionicons name="pin" size={10} color="white" />
                </View>
              </View>
              <Text className="text-brand-dark text-sm font-extrabold">No Active Orders</Text>
              <Text className="text-brand-gray text-xs text-center font-medium mt-1.5 leading-5 px-4">
                You don't have any ongoing orders at the moment. Your active deliveries will appear here.
              </Text>
              {isOnline && (
                <TouchableOpacity
                  onPress={handleSimulateRequest}
                  className="bg-brand-orange mt-5 px-6 py-2.5 rounded-2xl shadow-sm"
                >
                  <Text className="text-white text-xs font-bold">Simulate Order Request</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Active order route display */}
          {(orderState === "accepted" || orderState === "picked_up") && (
            <View className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm mb-6">
              <View className="flex-row justify-between items-center border-b border-slate-50 pb-3 mb-4">
                <View>
                  <Text className="text-brand-dark text-xs font-extrabold">Order #AB1256XY78</Text>
                  <Text className="text-brand-gray text-[9px] font-semibold mt-0.5">4 items</Text>
                </View>
                <View className="bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                  <Text className="text-brand-orange text-[9px] font-black">
                    {orderState === "accepted" ? "To Pick Up" : "Delivering"}
                  </Text>
                </View>
              </View>

              {/* Customer Contact */}
              <View className="flex-row items-center justify-between bg-slate-50 rounded-2xl p-3.5 mb-4">
                <View className="flex-row items-center gap-2.5">
                  <View className="bg-brand-orange/10 w-7.5 h-7.5 rounded-full items-center justify-center">
                    <Ionicons name="person" size={14} color="#E4792F" />
                  </View>
                  <View>
                    <Text className="text-brand-gray text-[9px] font-semibold">Order Receiver</Text>
                    <Text className="text-brand-dark text-xs font-extrabold">Paul Cortez</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => Alert.alert("Call Receiver", "Calling Paul Cortez at +880 1712-345678...")}
                  className="bg-white border border-slate-200 p-2.5 rounded-full"
                >
                  <Ionicons name="call" size={14} color="#E4792F" />
                </TouchableOpacity>
              </View>

              {/* Route Timeline */}
              <View className="pl-1 relative mb-2">
                {/* Vertical Dotted line */}
                <View className="absolute left-3.5 top-5 bottom-5 w-0.5 bg-slate-200 border-l border-dashed border-slate-400" />

                {/* Pickup Address */}
                <View className="flex-row items-start gap-3 mb-5">
                  <View className="bg-orange-500 w-6 h-6 rounded-full items-center justify-center z-10 border-2 border-white shadow-sm">
                    <Ionicons name="storefront" size={10} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-brand-dark text-[10px] font-bold">Pickup Location</Text>
                    <Text className="text-brand-gray text-[9px] mt-0.5">
                      Sakura Garden, 13, Park Place, Cashmoor
                    </Text>
                  </View>
                </View>

                {/* Distance middle segment */}
                <View className="pl-9 mb-4">
                  <View className="bg-slate-200/70 border border-slate-300/65 rounded-full py-0.5 px-2.5 w-16 items-center">
                    <Text className="text-brand-dark text-[8px] font-bold">1.2 KM</Text>
                  </View>
                </View>

                {/* Dropoff Address */}
                <View className="flex-row items-start gap-3">
                  <View className="bg-emerald-500 w-6 h-6 rounded-full items-center justify-center z-10 border-2 border-white shadow-sm">
                    <Ionicons name="pin" size={10} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-brand-dark text-[10px] font-bold">Delivery Location</Text>
                    <Text className="text-brand-gray text-[9px] mt-0.5">Naraynagnaj, Sadar</Text>
                  </View>
                </View>
              </View>

              {/* Actions Sliders trigger */}
              <TouchableOpacity
                onPress={triggerSliderAction}
                className="bg-brand-orange mt-4 py-4.5 rounded-2xl items-center flex-row justify-center gap-2"
              >
                <Ionicons name="arrow-forward" size={16} color="white" />
                <Text className="text-white text-xs font-bold">
                  {orderState === "accepted" ? "Tap to Mark Picked Up" : "Tap to Complete Delivery"}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Recent Deliveries list */}
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-brand-dark text-sm font-extrabold">Recent Deliveries</Text>
            <TouchableOpacity>
              <Text className="text-brand-orange text-[10px] font-bold">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-3 mb-12">
            {recentDeliveries.map((item, index) => (
              <View
                key={index}
                className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex-row justify-between items-center"
              >
                <View className="flex-row items-center gap-3.5">
                  <View className="bg-orange-50 p-2 rounded-2xl">
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
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* -------------------- NEW REQUEST MODAL OVERLAY -------------------- */}
      {orderState === "new_request" && (
        <View className="absolute inset-0 bg-black/60 justify-end z-50">
          <View className="bg-white rounded-t-[40px] p-6 shadow-2xl">
            {/* Top countdown badge */}
            <View className="flex-row justify-between items-center mb-5">
              <View>
                <Text className="text-brand-dark text-base font-extrabold">New Request</Text>
                <Text className="text-brand-gray text-[10px] font-semibold mt-0.5">Delivery Nearby</Text>
              </View>
              <View className="border border-brand-orange w-11 h-11 rounded-full items-center justify-center bg-orange-50">
                <Text className="text-brand-orange text-xs font-black">{countdown}s</Text>
              </View>
            </View>

            {/* Address Steps details */}
            <View className="pl-1 relative mb-5">
              {/* Vertical path line */}
              <View className="absolute left-3.5 top-5 bottom-5 w-0.5 bg-slate-200 border-l border-dashed border-slate-350" />

              {/* Pickup info */}
              <View className="flex-row items-start gap-3 mb-6">
                <View className="bg-orange-500 w-6.5 h-6.5 rounded-full items-center justify-center border-2 border-white shadow-sm z-10">
                  <Ionicons name="storefront" size={10} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-brand-dark text-xs font-extrabold">Sakura Garden</Text>
                  <Text className="text-brand-gray text-[10px] mt-0.5">
                    13, Park Place, Cashmoor, RT 05/146 · <Text className="text-brand-orange font-bold">1.5 Km away Pickup</Text>
                  </Text>
                </View>
              </View>

              {/* Dropoff info */}
              <View className="flex-row items-start gap-3">
                <View className="bg-emerald-500 w-6.5 h-6.5 rounded-full items-center justify-center border-2 border-white shadow-sm z-10">
                  <Ionicons name="pin" size={10} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-brand-dark text-xs font-extrabold">Customer Drop-Off</Text>
                  <Text className="text-brand-gray text-[10px] mt-0.5">
                    Naraynagnaj, Sadar · <Text className="text-emerald-500 font-bold">2.8 Km away Delivery</Text>
                  </Text>
                </View>
              </View>
            </View>

            {/* Payout Earning Card */}
            <View className="bg-slate-50 border border-slate-100 rounded-3xl p-5 flex-row justify-between items-center mb-6">
              <Text className="text-brand-gray text-xs font-semibold">Estimated Earning</Text>
              <Text className="text-brand-orange text-xl font-black">$8.50</Text>
            </View>

            {/* CTA action buttons */}
            <View className="flex-row gap-4 mb-4">
              <TouchableOpacity
                onPress={handleRejectOrder}
                className="flex-1 border border-slate-200 py-4.5 rounded-2xl items-center bg-white"
              >
                <Text className="text-brand-gray font-bold text-xs">Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAcceptOrder}
                className="flex-1 bg-brand-orange py-4.5 rounded-2xl items-center shadow-md"
              >
                <Text className="text-white font-bold text-xs">Accept Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* -------------------- DETAILED ONGOING MAP OVERLAYS -------------------- */}
      {/* Pick Up ongoing overlay details */}
      {orderState === "accepted" && (
        <View className="absolute inset-0 bg-slate-900/10 pointer-events-none z-40 justify-end">
          {/* Custom Full-screen Map simulation layer */}
          <View className="absolute inset-0 bg-sky-100/60 flex items-center justify-center">
            {/* Draw custom path roads */}
            <View className="absolute w-full h-4 bg-white/95 rotate-12" style={{ top: "35%" }} />
            <View className="absolute w-full h-4 bg-white/95 -rotate-45" style={{ top: "55%" }} />
            <View className="absolute w-4 h-full bg-white/95 left-1/3" />
            
            {/* Path connector route orange line */}
            <View className="absolute w-28 h-1.5 bg-brand-orange/90 rounded-full rotate-45 flex items-center justify-center">
              <View className="w-3 h-3 bg-white border-2 border-brand-orange rounded-full" />
            </View>

            {/* Shop location tag marker */}
            <View className="absolute top-[40%] left-[62%] bg-white/90 px-3 py-1.5 rounded-full border border-slate-100 shadow flex-row items-center gap-1.5">
              <Ionicons name="storefront" size={12} color="#E4792F" />
              <Text className="text-brand-dark text-[9px] font-extrabold">Shop Location</Text>
            </View>

            {/* Delivery point marker */}
            <View className="absolute bottom-[35%] left-[20%] bg-white/90 px-3 py-1.5 rounded-full border border-slate-100 shadow flex-row items-center gap-1.5">
              <Ionicons name="pin" size={12} color="#10B981" />
              <Text className="text-brand-dark text-[9px] font-extrabold">Delivery Point</Text>
            </View>
          </View>

          {/* Non-passive interactive actions bottom overlay */}
          <View className="bg-white rounded-t-[40px] p-6 shadow-2xl pointer-events-auto w-full">
            <View className="flex-row justify-between items-center border-b border-slate-100 pb-3 mb-4">
              <View>
                <Text className="text-brand-dark text-base font-extrabold">Sakura Garden</Text>
                <Text className="text-brand-gray text-[10px] font-semibold mt-0.5">
                  13, Park Place, Cashmoor · <Text className="text-brand-orange font-bold">1.5KM</Text>
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => Alert.alert("Call Restaurant", "Calling Sakura Garden at +880 175-5551325...")}
                className="bg-brand-orange/10 p-3 rounded-full"
              >
                <Ionicons name="call" size={16} color="#E4792F" />
              </TouchableOpacity>
            </View>

            {/* Big Order counter counter */}
            <View className="bg-orange-50 border border-orange-100 rounded-3xl p-5 items-center mb-6">
              <Text className="text-brand-orange text-[10px] font-bold uppercase tracking-wider">Show this Order ID at Counter</Text>
              <Text className="text-brand-dark text-3xl font-black mt-1.5">#88215</Text>
            </View>

            {/* Slide Action simulation button */}
            <TouchableOpacity
              onPress={triggerSliderAction}
              className="bg-brand-orange w-full py-4.5 rounded-2xl items-center flex-row justify-center gap-2 shadow-md"
            >
              <Ionicons name="arrow-forward" size={16} color="white" />
              <Text className="text-white text-xs font-extrabold">Slide to Mark Picked Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Delivery ongoing overlay details */}
      {orderState === "picked_up" && (
        <View className="absolute inset-0 bg-slate-900/10 pointer-events-none z-40 justify-end">
          {/* Custom Full-screen Map simulation layer */}
          <View className="absolute inset-0 bg-sky-100/60 flex items-center justify-center">
            {/* Draw custom path roads */}
            <View className="absolute w-full h-4 bg-white/95 rotate-12" style={{ top: "35%" }} />
            <View className="absolute w-full h-4 bg-white/95 -rotate-45" style={{ top: "55%" }} />
            <View className="absolute w-4 h-full bg-white/95 left-1/3" />
            
            {/* Route path line */}
            <View className="absolute w-40 h-1.5 bg-brand-orange/90 rounded-full -rotate-12 flex items-center justify-center" />

            {/* Delivery point marker */}
            <View className="absolute bottom-[35%] left-[20%] bg-white/90 px-3 py-1.5 rounded-full border border-slate-100 shadow flex-row items-center gap-1.5">
              <Ionicons name="pin" size={12} color="#10B981" />
              <Text className="text-brand-dark text-[9px] font-extrabold">Customer Location</Text>
            </View>
          </View>

          {/* Bottom actions sheet */}
          <View className="bg-white rounded-t-[40px] p-6 shadow-2xl pointer-events-auto w-full">
            <View className="flex-row justify-between items-center border-b border-slate-100 pb-3 mb-4">
              <View>
                <Text className="text-brand-dark text-base font-extrabold">Paul Cortez</Text>
                <Text className="text-brand-gray text-[10px] font-semibold mt-0.5">
                  Naraynagnaj, Sadar · <Text className="text-emerald-500 font-bold">2.8KM</Text>
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => Alert.alert("Call Customer", "Calling Paul Cortez at +880 1712-345678...")}
                className="bg-brand-orange/10 p-3 rounded-full"
              >
                <Ionicons name="call" size={16} color="#E4792F" />
              </TouchableOpacity>
            </View>

            {/* Instructions box */}
            <View className="bg-slate-50 border border-slate-150 rounded-3xl p-5 mb-6">
              <Text className="text-brand-dark text-xs font-bold mb-1">Instruction</Text>
              <Text className="text-brand-gray text-[11px] leading-4.5 font-medium">
                Please knock to let me know it has arrived and then leave it at the doorstep
              </Text>
            </View>

            {/* Slide Action simulation button */}
            <TouchableOpacity
              onPress={triggerSliderAction}
              className="bg-brand-orange w-full py-4.5 rounded-2xl items-center flex-row justify-center gap-2 shadow-md"
            >
              <Ionicons name="checkmark-circle" size={16} color="white" />
              <Text className="text-white text-xs font-extrabold">Slide to Complete Delivery</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

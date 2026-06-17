import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type RideState = "idle" | "new-request" | "heading-pickup" | "heading-dropoff" | "completed";

export default function TransportDriverDashboard() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);
  const [rideState, setRideState] = useState<RideState>("idle");
  const [countdown, setCountdown] = useState(23);
  const screenWidth = Dimensions.get("window").width;
  const slideWidth = screenWidth - 120; // padding adjustments

  // Slide-to-action animation value
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Countdown timer for new ride request
  useEffect(() => {
    if (rideState === "new-request" && countdown > 0) {
      const timer = setTimeout(() => setCountdown((p) => p - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (rideState === "new-request" && countdown <= 0) {
      setRideState("idle");
      setCountdown(23);
    }
  }, [rideState, countdown]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0 && gestureState.dx < slideWidth) {
          slideAnim.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > slideWidth * 0.65) {
          // Threshold reached - advance state
          Animated.spring(slideAnim, {
            toValue: slideWidth,
            useNativeDriver: false,
          }).start(() => {
            handleSlideComplete();
            slideAnim.setValue(0);
          });
        } else {
          // Reset
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const handleSlideComplete = () => {
    if (rideState === "heading-pickup") {
      setRideState("heading-dropoff");
    } else if (rideState === "heading-dropoff") {
      setRideState("completed");
    }
  };

  const handleAcceptRide = () => {
    setRideState("heading-pickup");
    setCountdown(23);
  };

  const handleRejectRide = () => {
    setRideState("idle");
    setCountdown(23);
  };

  const handleNewRide = () => {
    if (!isOnline) {
      Alert.alert("Offline", "Go online to receive ride requests.");
      return;
    }
    setCountdown(23);
    setRideState("new-request");
  };

  const handleTripDone = () => {
    setRideState("idle");
  };

  const toggleStatus = () => {
    setIsOnline(!isOnline);
    if (isOnline) {
      setRideState("idle");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* ============= IDLE / MAP HOME SCREEN ============= */}
      {rideState === "idle" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100 z-10">
            <View className="flex-row items-center gap-3">
              <View className="w-11 h-11 rounded-full bg-[#FFF5F0] border border-slate-100 items-center justify-center">
                <Ionicons name="person" size={22} color="#E4792F" />
              </View>
              <View>
                <Text className="text-brand-gray text-[9px] font-semibold">Welcome back</Text>
                <Text className="text-brand-dark text-sm font-bold">Rahim Rehman</Text>
              </View>
            </View>

            {/* Online / Offline Toggle */}
            <TouchableOpacity
              onPress={toggleStatus}
              className={`flex-row items-center border rounded-full p-1 w-28 h-9 relative ${
                isOnline ? "border-brand-orange bg-white" : "border-slate-200 bg-white"
              }`}
            >
              <View
                className={`absolute top-[3px] bottom-[3px] rounded-full w-[50px] ${
                  isOnline ? "left-[3px] bg-emerald-500" : "right-[3px] bg-slate-300"
                }`}
              />
              <View className="flex-1 flex-row justify-between px-3 z-10">
                <Text className={`text-[10px] font-bold ${isOnline ? "text-white" : "text-slate-400"}`}>
                  Online
                </Text>
                <Text className={`text-[10px] font-bold ${!isOnline ? "text-slate-600" : "text-slate-400"}`}>
                  Offline
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Status Line */}
          <View className="px-6 py-2 bg-white border-b border-slate-50">
            <Text className={`text-xs font-bold ${isOnline ? "text-emerald-500" : "text-slate-400"}`}>
              {isOnline ? "You're Online" : "You're Offline"}
            </Text>
          </View>

          {/* Fake Map Area */}
          <View className="flex-1 bg-[#E5F1F6] relative">
            {/* Simulated map roads & parks */}
            <View className="absolute w-[200%] h-4 bg-[#FDDCB5] rotate-12 top-[20%]" />
            <View className="absolute w-[200%] h-3 bg-[#FDDCB5] -rotate-[25deg] top-[55%]" />
            <View className="absolute w-[200%] h-3 bg-white/60 rotate-[45deg] bottom-[30%]" />
            <View className="absolute w-full h-2 bg-white/50 top-[40%]" />
            <View className="absolute w-32 h-28 bg-[#C5E1A5]/50 rounded-2xl left-4 top-16" />
            <View className="absolute w-24 h-20 bg-[#FFE082]/40 rounded-2xl right-6 top-32" />
            <View className="absolute w-28 h-24 bg-[#C5E1A5]/40 rounded-2xl right-10 bottom-40" />
            <Text className="absolute bottom-20 left-8 text-[11px] text-slate-500 font-bold tracking-widest opacity-30">SUNNYDALE</Text>

            {/* Driver location pin */}
            <View className="absolute top-[45%] left-[45%] items-center justify-center z-10">
              <View className="w-10 h-10 rounded-full bg-brand-orange/20 items-center justify-center">
                <Ionicons name="navigate" size={20} color="#E4792F" />
              </View>
            </View>

            {/* Today's Earning Floating Card */}
            <View className="absolute top-4 left-6 right-6 flex-row gap-3">
              <View className="flex-1 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <Text className="text-brand-gray text-[9px] font-bold">Today's Earning</Text>
                <View className="flex-row items-center gap-1.5 mt-1">
                  <View className="w-5 h-5 rounded bg-brand-orange/10 items-center justify-center">
                    <Ionicons name="logo-usd" size={10} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-lg font-extrabold">$45.00</Text>
                </View>
              </View>
              <View className="flex-1 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <Text className="text-brand-gray text-[9px] font-bold">Completed</Text>
                <View className="flex-row items-center gap-1.5 mt-1">
                  <View className="w-5 h-5 rounded bg-emerald-50 items-center justify-center">
                    <Ionicons name="checkmark-circle" size={10} color="#10B981" />
                  </View>
                  <Text className="text-brand-dark text-lg font-extrabold">8</Text>
                </View>
              </View>
            </View>

            {/* Simulate New Ride Button */}
            <TouchableOpacity
              onPress={handleNewRide}
              className="absolute bottom-6 left-6 right-6 bg-brand-orange py-4 rounded-2xl items-center justify-center shadow-lg shadow-brand-orange/30"
            >
              <Text className="text-white text-sm font-bold">
                {isOnline ? "Simulate New Ride Request" : "Go Online First"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ============= NEW RIDE REQUEST OVERLAY ============= */}
      {rideState === "new-request" && (
        <View className="flex-1">
          {/* Header (same as idle) */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100 z-10">
            <View className="flex-row items-center gap-3">
              <View className="w-11 h-11 rounded-full bg-[#FFF5F0] border border-slate-100 items-center justify-center">
                <Ionicons name="person" size={22} color="#E4792F" />
              </View>
              <View>
                <Text className="text-brand-gray text-[9px] font-semibold">Welcome back</Text>
                <Text className="text-brand-dark text-sm font-bold">Rahim Rehman</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={toggleStatus}
              className="flex-row items-center border border-brand-orange rounded-full p-1 w-28 h-9 relative bg-white"
            >
              <View className="absolute top-[3px] bottom-[3px] rounded-full w-[50px] left-[3px] bg-emerald-500" />
              <View className="flex-1 flex-row justify-between px-3 z-10">
                <Text className="text-[10px] font-bold text-white">Online</Text>
                <Text className="text-[10px] font-bold text-slate-400">Offline</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="px-6 py-2 bg-white border-b border-slate-50">
            <Text className="text-xs font-bold text-emerald-500">You're Online</Text>
          </View>

          {/* Map with overlay */}
          <View className="flex-1 bg-[#E5F1F6] relative">
            <View className="absolute w-[200%] h-4 bg-[#FDDCB5] rotate-12 top-[20%]" />
            <View className="absolute w-[200%] h-3 bg-[#FDDCB5] -rotate-[25deg] top-[55%]" />
            <View className="absolute w-full h-2 bg-white/50 top-[40%]" />

            {/* Today's Earning (dimmed) */}
            <View className="absolute top-4 left-6 right-6 flex-row gap-3 opacity-40">
              <View className="flex-1 bg-white p-4 rounded-2xl border border-slate-100">
                <Text className="text-brand-gray text-[9px] font-bold">Today's Earning</Text>
                <View className="flex-row items-center gap-1.5 mt-1">
                  <View className="w-5 h-5 rounded bg-brand-orange/10 items-center justify-center">
                    <Ionicons name="logo-usd" size={10} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-lg font-extrabold">$45.00</Text>
                </View>
              </View>
              <View className="flex-1 bg-white p-4 rounded-2xl border border-slate-100">
                <Text className="text-brand-gray text-[9px] font-bold">Completed</Text>
                <View className="flex-row items-center gap-1.5 mt-1">
                  <View className="w-5 h-5 rounded bg-emerald-50 items-center justify-center">
                    <Ionicons name="checkmark-circle" size={10} color="#10B981" />
                  </View>
                  <Text className="text-brand-dark text-lg font-extrabold">8</Text>
                </View>
              </View>
            </View>

            {/* New Ride Request Bottom Sheet */}
            <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-xl border-t border-slate-100">
              {/* Title row with countdown */}
              <View className="flex-row items-center justify-between mb-5">
                <Text className="text-brand-dark text-base font-bold">New Ride Request</Text>
                <View className="w-10 h-10 rounded-full border-2 border-brand-orange items-center justify-center">
                  <Text className="text-brand-orange text-xs font-extrabold">{countdown}s</Text>
                </View>
              </View>

              {/* Pickup & Drop-off locations */}
              <View className="gap-4 mb-5">
                <View className="flex-row items-start gap-3">
                  <View className="w-7 h-7 rounded-full bg-brand-orange items-center justify-center mt-0.5">
                    <View className="w-2.5 h-2.5 rounded-full bg-white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-brand-dark text-xs font-bold">Pickup Location</Text>
                    <Text className="text-brand-gray text-[10px] font-semibold mt-0.5">
                      13, Park Place, Cashmoor, RT 05/146
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-start gap-3">
                  <View className="w-7 h-7 rounded-full bg-emerald-500 items-center justify-center mt-0.5">
                    <Ionicons name="location" size={14} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-brand-dark text-xs font-bold">Drop-Off Location</Text>
                    <Text className="text-brand-gray text-[10px] font-semibold mt-0.5">
                      Naraynagnaj, Sadar
                    </Text>
                  </View>
                </View>
              </View>

              {/* Mini route map */}
              <View className="w-full h-20 rounded-2xl bg-[#E5F1F6] border border-slate-100 mb-5 relative overflow-hidden items-center justify-center">
                <View className="absolute w-[80%] h-0.5 bg-brand-orange top-[50%]" />
                <View className="absolute left-[15%] top-[35%] w-3 h-3 rounded-full bg-brand-orange" />
                <View className="absolute right-[15%] top-[35%] w-3 h-3 rounded-full bg-emerald-500" />
                {/* Curved line dots */}
                <View className="absolute left-[30%] top-[25%] w-1.5 h-1.5 rounded-full bg-brand-orange/40" />
                <View className="absolute left-[50%] top-[20%] w-1.5 h-1.5 rounded-full bg-brand-orange/40" />
                <View className="absolute left-[70%] top-[25%] w-1.5 h-1.5 rounded-full bg-brand-orange/40" />
              </View>

              {/* Estimated Earning */}
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-brand-dark text-sm font-bold">Estimated Earning</Text>
                <Text className="text-brand-orange text-xl font-extrabold">$8.50</Text>
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={handleRejectRide}
                  className="flex-1 py-3.5 border border-brand-orange rounded-xl items-center justify-center"
                >
                  <Text className="text-brand-orange text-xs font-bold">Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleAcceptRide}
                  className="flex-1 py-3.5 bg-brand-orange rounded-xl items-center justify-center"
                >
                  <Text className="text-white text-xs font-bold">Accept & Pick Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* ============= HEADING TO PICKUP ============= */}
      {rideState === "heading-pickup" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-center px-6 py-4 bg-white border-b border-slate-100">
            <Text className="text-brand-dark text-base font-bold">Heading To Pickup</Text>
          </View>

          {/* Map Area */}
          <View className="flex-1 bg-[#E5F1F6] relative">
            <View className="absolute w-[200%] h-4 bg-[#FDDCB5] rotate-12 top-[20%]" />
            <View className="absolute w-[200%] h-3 bg-[#FDDCB5] -rotate-[25deg] top-[55%]" />
            <View className="absolute w-full h-2 bg-white/50 top-[40%]" />
            <View className="absolute w-32 h-28 bg-[#C5E1A5]/50 rounded-2xl left-4 top-16" />

            {/* Route line */}
            <View className="absolute top-[30%] left-[20%] w-[60%] h-0.5 bg-brand-orange" />
            <View className="absolute top-[28%] left-[20%] w-3 h-3 rounded-full bg-brand-orange" />
            <View className="absolute top-[28%] right-[20%] w-3 h-3 rounded-full bg-emerald-500" />

            {/* Bottom Sheet */}
            <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-xl border-t border-slate-100">
              {/* Rider info */}
              <View className="flex-row items-center gap-3 mb-5">
                <View className="w-11 h-11 rounded-full bg-slate-100 items-center justify-center">
                  <Ionicons name="person" size={22} color="#A0AEC0" />
                </View>
                <View className="flex-1">
                  <Text className="text-brand-dark text-sm font-bold">Rahim Rehman</Text>
                  <Text className="text-brand-gray text-[10px] font-semibold">1.5M Away</Text>
                </View>
              </View>

              {/* Pickup location */}
              <View className="flex-row items-start gap-3 mb-5">
                <View className="w-7 h-7 rounded-full bg-brand-orange items-center justify-center mt-0.5">
                  <View className="w-2.5 h-2.5 rounded-full bg-white" />
                </View>
                <View className="flex-1">
                  <Text className="text-brand-dark text-xs font-bold">Pickup Location</Text>
                  <Text className="text-brand-gray text-[10px] font-semibold mt-0.5">
                    13, Park Place, Cashmoor, RT 05/146
                  </Text>
                </View>
              </View>

              {/* Slide to Arrive */}
              <View className="h-14 bg-orange-50 rounded-2xl relative overflow-hidden border border-brand-orange/20">
                <Animated.View
                  {...panResponder.panHandlers}
                  style={{ transform: [{ translateX: slideAnim }] }}
                  className="absolute left-1 top-1 bottom-1 w-12 h-12 rounded-xl bg-brand-orange items-center justify-center z-10"
                >
                  <Ionicons name="chevron-forward" size={20} color="white" />
                </Animated.View>
                <View className="flex-1 items-center justify-center">
                  <Text className="text-brand-orange text-xs font-bold">Slide to Arrive</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* ============= HEADING DROP-OFF ============= */}
      {rideState === "heading-dropoff" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-center px-6 py-4 bg-white border-b border-slate-100">
            <Text className="text-brand-dark text-base font-bold">Heading Drop-Off</Text>
          </View>

          {/* Map Area */}
          <View className="flex-1 bg-[#E5F1F6] relative">
            <View className="absolute w-[200%] h-4 bg-[#FDDCB5] rotate-12 top-[20%]" />
            <View className="absolute w-[200%] h-3 bg-[#FDDCB5] -rotate-[25deg] top-[55%]" />
            <View className="absolute w-full h-2 bg-white/50 top-[40%]" />
            <View className="absolute w-24 h-20 bg-[#FFE082]/40 rounded-2xl right-6 top-32" />

            {/* Route line */}
            <View className="absolute top-[35%] left-[15%] w-[70%] h-0.5 bg-brand-orange" />
            <View className="absolute top-[33%] left-[15%] w-3 h-3 rounded-full bg-brand-orange" />
            <View className="absolute top-[33%] right-[15%] w-3 h-3 rounded-full bg-red-500" />

            {/* Bottom Sheet */}
            <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-xl border-t border-slate-100">
              {/* Rider info */}
              <View className="flex-row items-center gap-3 mb-5">
                <View className="w-11 h-11 rounded-full bg-slate-100 items-center justify-center">
                  <Ionicons name="person" size={22} color="#A0AEC0" />
                </View>
                <View className="flex-1">
                  <Text className="text-brand-dark text-sm font-bold">Rahim Rehman</Text>
                  <Text className="text-emerald-500 text-[10px] font-bold">Picked up</Text>
                </View>
              </View>

              {/* Drop-off location */}
              <View className="flex-row items-start gap-3 mb-5">
                <View className="w-7 h-7 rounded-full bg-emerald-500 items-center justify-center mt-0.5">
                  <Ionicons name="location" size={14} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-brand-dark text-xs font-bold">Drop-Off Location</Text>
                  <Text className="text-brand-gray text-[10px] font-semibold mt-0.5">
                    13, Park Place, Cashmoor, RT 05/146
                  </Text>
                </View>
              </View>

              {/* Slide to Start Trip */}
              <View className="h-14 bg-orange-50 rounded-2xl relative overflow-hidden border border-brand-orange/20">
                <Animated.View
                  {...panResponder.panHandlers}
                  style={{ transform: [{ translateX: slideAnim }] }}
                  className="absolute left-1 top-1 bottom-1 w-12 h-12 rounded-xl bg-brand-orange items-center justify-center z-10"
                >
                  <Ionicons name="chevron-forward" size={20} color="white" />
                </Animated.View>
                <View className="flex-1 items-center justify-center">
                  <Text className="text-brand-orange text-xs font-bold">Slide to Start Trip</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* ============= TRIP COMPLETED ============= */}
      {rideState === "completed" && (
        <View className="flex-1 bg-white">
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Success Checkmark */}
            <View className="items-center justify-center pt-10 pb-8">
              <View className="w-32 h-32 bg-orange-50 rounded-full items-center justify-center mb-6">
                <Ionicons name="checkmark-circle" size={72} color="#E4792F" />
              </View>
            </View>

            <Text className="text-brand-dark text-xl font-bold text-center mb-2">Trip Completed</Text>

            {/* You Earned */}
            <View className="items-center mb-8">
              <Text className="text-brand-gray text-xs font-semibold">You Earned</Text>
              <Text className="text-brand-orange text-4xl font-extrabold mt-1">$1,200</Text>
            </View>

            {/* Details Card */}
            <View className="bg-slate-50 border border-slate-100 rounded-3xl p-5 gap-4 mb-8">
              <View className="flex-row justify-between items-center">
                <Text className="text-brand-gray text-xs font-semibold">Trip Fee</Text>
                <Text className="text-brand-dark text-xs font-bold">$1,200.00</Text>
              </View>
              <View className="flex-row justify-between items-center border-t border-slate-100 pt-4">
                <Text className="text-brand-dark text-xs font-bold">Total You'll receive</Text>
                <Text className="text-brand-orange text-sm font-extrabold">$1,200.00</Text>
              </View>
            </View>

            {/* Back Home */}
            <TouchableOpacity
              onPress={handleTripDone}
              className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mb-12"
            >
              <Text className="text-white text-base font-bold">Back to Home</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

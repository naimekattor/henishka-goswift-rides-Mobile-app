import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  PanResponder,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <View className="flex-1 bg-brand-bg">
      {/* ============= IDLE / MAP HOME SCREEN ============= */}
      {rideState === "idle" && (
        <View className="flex-1 relative">
          {/* Fake Map Area (spans full screen) */}
          <View className="absolute inset-0 bg-[#E5F1F6]">
            {/* Simulated map roads & parks */}
            <View key="road-1" style={{ position: "absolute", width: "200%", height: 16, backgroundColor: "#FDDCB5", transform: [{ rotate: "12deg" }], top: "20%" }} />
            <View key="road-2" style={{ position: "absolute", width: "200%", height: 12, backgroundColor: "#FDDCB5", transform: [{ rotate: "-25deg" }], top: "55%" }} />
            <View key="road-3" style={{ position: "absolute", width: "200%", height: 12, backgroundColor: "rgba(255, 255, 255, 0.6)", transform: [{ rotate: "45deg" }], bottom: "30%" }} />
            <View key="road-4" style={{ position: "absolute", width: "100%", height: 8, backgroundColor: "rgba(255, 255, 255, 0.5)", top: "40%" }} />
            <View key="park-1" className="absolute w-32 h-28 bg-[#C5E1A5]/50 rounded-2xl left-4 top-16" />
            <View key="park-2" className="absolute w-24 h-20 bg-[#FFE082]/40 rounded-2xl right-6 top-32" />
            <View key="park-3" className="absolute w-28 h-24 bg-[#C5E1A5]/40 rounded-2xl right-10 bottom-40" />
            <Text className="absolute bottom-20 left-8 text-[11px] text-slate-500 font-bold tracking-widest opacity-30">SUNNYDALE</Text>

            {/* Driver location pin */}
            <View 
              key="driver-pin" 
              style={{ position: "absolute", top: "50%", left: "50%", transform: [{ translateX: -20 }, { translateY: -20 }] }} 
              className="items-center justify-center"
            >
              <View className="w-10 h-10 rounded-full bg-brand-orange/20 items-center justify-center">
                <Ionicons name="navigate" size={20} color="#E4792F" />
              </View>
            </View>
          </View>

          {/* Safe Area layout for cards */}
          <SafeAreaView className="flex-1 bg-transparent" edges={["top"]}>
            {/* Top Floating Card */}
            <View className="bg-white rounded-[24px] p-5 shadow-lg border border-slate-100/50 mx-4 mt-2">
              {/* Row 1: Profile & Welcome */}
              <View className="flex-row items-center gap-4">
                <Image
                  source={require("@/assets/images/driver-avatar.png")}
                  className="w-14 h-14 rounded-full bg-slate-100"
                />
                <View>
                  <Text className="text-slate-400 text-sm font-medium">Welcome back,</Text>
                  <Text className="text-brand-dark text-lg font-bold">Rahim Rehman</Text>
                </View>
              </View>

              {/* Row 2: Status Text and Toggle */}
              <View className="flex-row items-center justify-between mt-5">
                <Text className="text-slate-700 text-[15px] font-semibold">
                  {isOnline ? "You're Online" : "You're Offline"}
                </Text>

                {/* Online / Offline Toggle */}
                <TouchableOpacity
                  onPress={toggleStatus}
                  className={`relative flex-row w-[160px] h-[38px] rounded-full border bg-white overflow-hidden p-0.5 items-center ${
                    isOnline ? "border-[#48C86C]" : "border-slate-300"
                  }`}
                >
                  <View
                    style={{
                      position: "absolute",
                      top: 2,
                      bottom: 2,
                      left: isOnline ? 2 : 80,
                      width: 76,
                      borderRadius: 999,
                      backgroundColor: isOnline ? "#48C86C" : "#94A3B8",
                    }}
                  />

                  <View className="flex-1 items-center justify-center z-10">
                    <Text
                      className={`text-[13px] font-semibold ${
                        isOnline ? "text-white" : "text-slate-700"
                      }`}
                    >
                      Online
                    </Text>
                  </View>

                  <View className="flex-1 items-center justify-center z-10">
                    <Text
                      className={`text-[13px] font-semibold ${
                        !isOnline ? "text-white" : "text-slate-700"
                      }`}
                    >
                      Offline
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Bottom Floating Card (Earnings) */}
            <View className="bg-white rounded-[24px] p-5 shadow-lg border border-slate-100/50 mx-4 mt-3 flex-row items-center justify-between">
              {/* Left Column: Today's Earning */}
              <View className="flex-1 flex-row items-center gap-3">
                <View className="w-12 h-12 rounded-full bg-[#FFF5F0] items-center justify-center">
                  <Ionicons name="wallet-outline" size={24} color="#E4792F" />
                </View>
                <View>
                  <Text className="text-slate-400 text-xs font-semibold">Today's Earning</Text>
                  <Text className="text-brand-dark text-lg font-bold mt-0.5">$45.00</Text>
                </View>
              </View>

              {/* Vertical Divider */}
              <View className="h-8 w-[1px] bg-slate-200 mx-2" />

              {/* Right Column: Completed */}
              <View className="flex-1 flex-row items-center gap-3 pl-2">
                <View className="w-12 h-12 rounded-full bg-[#EBFDF2] items-center justify-center">
                  <Ionicons name="bag-handle-outline" size={24} color="#13B05C" />
                </View>
                <View>
                  <Text className="text-slate-400 text-xs font-semibold">Completed</Text>
                  <Text className="text-brand-dark text-lg font-bold mt-0.5">8</Text>
                </View>
              </View>
            </View>
          </SafeAreaView>

          {/* Simulate New Ride Button */}
          <TouchableOpacity
            onPress={handleNewRide}
            className="absolute bottom-6 left-6 right-6 bg-brand-orange py-4 rounded-2xl items-center justify-center shadow-lg shadow-brand-orange/30 z-20"
          >
            <Text className="text-white text-sm font-bold">
              {isOnline ? "Simulate New Ride Request" : "Go Online First"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ============= NEW RIDE REQUEST OVERLAY ============= */}
      {rideState === "new-request" && (
        <View className="flex-1 relative">
          {/* Background Map */}
          <View className="absolute inset-0 bg-[#E5F1F6]">
            {/* Simulated map roads & parks */}
            <View key="road-1" style={{ position: "absolute", width: "200%", height: 16, backgroundColor: "#FDDCB5", transform: [{ rotate: "12deg" }], top: "20%" }} />
            <View key="road-2" style={{ position: "absolute", width: "200%", height: 12, backgroundColor: "#FDDCB5", transform: [{ rotate: "-25deg" }], top: "55%" }} />
            <View key="road-3" style={{ position: "absolute", width: "200%", height: 12, backgroundColor: "rgba(255, 255, 255, 0.6)", transform: [{ rotate: "45deg" }], bottom: "30%" }} />
            <View key="road-4" style={{ position: "absolute", width: "100%", height: 8, backgroundColor: "rgba(255, 255, 255, 0.5)", top: "40%" }} />
            <View key="park-1" className="absolute w-32 h-28 bg-[#C5E1A5]/50 rounded-2xl left-4 top-16" />
            <View key="park-2" className="absolute w-24 h-20 bg-[#FFE082]/40 rounded-2xl right-6 top-32" />
            <View key="park-3" className="absolute w-28 h-24 bg-[#C5E1A5]/40 rounded-2xl right-10 bottom-40" />
            <Text className="absolute bottom-20 left-8 text-[11px] text-slate-500 font-bold tracking-widest opacity-30">SUNNYDALE</Text>

            {/* Driver location pin */}
            <View 
              key="driver-pin" 
              style={{ position: "absolute", top: "50%", left: "50%", transform: [{ translateX: -20 }, { translateY: -20 }] }} 
              className="items-center justify-center"
            >
              <View className="w-10 h-10 rounded-full bg-brand-orange/20 items-center justify-center">
                <Ionicons name="navigate" size={20} color="#E4792F" />
              </View>
            </View>
          </View>

          {/* Underlay Earning Card & Header (dimmed behind modal) */}
          <SafeAreaView className="flex-1 bg-transparent opacity-30" edges={["top"]}>
            {/* Top Floating Card */}
            <View className="bg-white rounded-[24px] p-5 border border-slate-100/50 mx-4 mt-2">
              <View className="flex-row items-center gap-4">
                <Image
                  source={require("@/assets/images/driver-avatar.png")}
                  className="w-14 h-14 rounded-full bg-slate-100"
                />
                <View>
                  <Text className="text-slate-400 text-sm font-medium">Welcome back,</Text>
                  <Text className="text-brand-dark text-lg font-bold">Rahim Rehman</Text>
                </View>
              </View>
              <View className="flex-row items-center justify-between mt-5">
                <Text className="text-slate-700 text-[15px] font-semibold">You're Online</Text>
                <View className="w-[160px] h-[38px] rounded-full border border-[#48C86C] bg-white p-0.5 flex-row items-center">
                  <View className="w-20 h-8 rounded-full bg-[#48C86C] items-center justify-center">
                    <Text className="text-white text-[13px] font-semibold">Online</Text>
                  </View>
                  <View className="flex-1 items-center justify-center">
                    <Text className="text-slate-700 text-[13px] font-semibold">Offline</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Bottom Floating Card */}
            <View className="bg-white rounded-[24px] p-5 border border-slate-100/50 mx-4 mt-3 flex-row items-center justify-between">
              <View className="flex-1 flex-row items-center gap-3">
                <View className="w-12 h-12 rounded-full bg-[#FFF5F0] items-center justify-center">
                  <Ionicons name="wallet-outline" size={24} color="#E4792F" />
                </View>
                <View>
                  <Text className="text-slate-400 text-xs font-semibold">Today's Earning</Text>
                  <Text className="text-brand-dark text-lg font-bold mt-0.5">$45.00</Text>
                </View>
              </View>
              <View className="h-8 w-[1px] bg-slate-200 mx-2" />
              <View className="flex-1 flex-row items-center gap-3 pl-2">
                <View className="w-12 h-12 rounded-full bg-[#EBFDF2] items-center justify-center">
                  <Ionicons name="bag-handle-outline" size={24} color="#13B05C" />
                </View>
                <View>
                  <Text className="text-slate-400 text-xs font-semibold">Completed</Text>
                  <Text className="text-brand-dark text-lg font-bold mt-0.5">8</Text>
                </View>
              </View>
            </View>
          </SafeAreaView>

          {/* Semi-transparent Dark Backdrop for Modal */}
          <View className="absolute inset-0 bg-black/60 z-30 justify-center items-center px-4">
            {/* Centered Modal Card */}
            <View className="bg-white rounded-[32px] p-6 w-full shadow-2xl border border-slate-100">
              {/* Header Row: Title & Countdown */}
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-slate-800 text-[22px] font-bold">New Ride Request</Text>
                <View className="w-12 h-12 rounded-full border-2 border-brand-orange items-center justify-center bg-white">
                  <Text className="text-brand-orange text-sm font-extrabold">{countdown}s</Text>
                </View>
              </View>

              {/* Location Connector Path */}
              <View className="flex-row items-start gap-4 mb-5 relative">
                {/* Visual Connector Dot & Line indicator column */}
                <View className="items-center mt-1">
                  <View className="w-7 h-7 rounded-full border-[5px] border-brand-orange bg-white items-center justify-center" />
                  {/* Vertical dotted connector line */}
                  <View className="w-[1px] h-[34px] border-l border-dashed border-brand-orange my-1" />
                  <View className="w-7 h-7 rounded-full bg-[#13B05C] items-center justify-center">
                    <Ionicons name="location" size={14} color="white" />
                  </View>
                </View>

                {/* Location text description labels column */}
                <View className="flex-1 gap-4">
                  {/* Pickup */}
                  <View>
                    <Text className="text-slate-400 text-xs font-semibold">Pickup Location</Text>
                    <Text className="text-slate-800 text-[14px] font-bold mt-0.5">
                      13, Park Place, Cashmoor, RT 05/146
                    </Text>
                  </View>
                  {/* Drop-off */}
                  <View>
                    <Text className="text-slate-400 text-xs font-semibold">Drop-Off Location</Text>
                    <Text className="text-slate-800 text-[14px] font-bold mt-0.5">
                      Naraynagnaj, Sadar
                    </Text>
                  </View>
                </View>
              </View>

              {/* Route Map Graphic */}
              <View className="w-full h-[150px] rounded-[24px] border border-slate-100 mb-5 relative overflow-hidden">
                <Image
                  source={require("@/assets/images/route-map.png")}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Estimated Earning Card */}
              <View className="flex-row items-center justify-between border border-slate-100 bg-white p-4 rounded-[18px] mb-6">
                <Text className="text-slate-700 text-[15px] font-bold">Estimated Earning</Text>
                <Text className="text-brand-orange text-[28px] font-black">$8.50</Text>
              </View>

              {/* Bottom Actions Row */}
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={handleRejectRide}
                  className="flex-1 py-4 border border-brand-orange bg-white rounded-[16px] items-center justify-center"
                >
                  <Text className="text-brand-orange text-base font-bold">Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleAcceptRide}
                  className="flex-1 py-4 bg-brand-orange rounded-[16px] items-center justify-center shadow-md shadow-brand-orange/20"
                >
                  <Text className="text-white text-base font-bold">Accept & Pick Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* ============= HEADING TO PICKUP ============= */}
      {rideState === "heading-pickup" && (
        <View className="flex-1 relative">
          {/* Fake Map Area (full screen) */}
          <View className="absolute inset-0 bg-[#E5F1F6]">
            {/* Simulated map roads & parks */}
            <View key="road-1" style={{ position: "absolute", width: "200%", height: 16, backgroundColor: "#FDDCB5", transform: [{ rotate: "12deg" }], top: "20%" }} />
            <View key="road-2" style={{ position: "absolute", width: "200%", height: 12, backgroundColor: "#FDDCB5", transform: [{ rotate: "-25deg" }], top: "55%" }} />
            <View key="road-3" style={{ position: "absolute", width: "200%", height: 12, backgroundColor: "rgba(255, 255, 255, 0.6)", transform: [{ rotate: "45deg" }], bottom: "30%" }} />
            <View key="road-4" style={{ position: "absolute", width: "100%", height: 8, backgroundColor: "rgba(255, 255, 255, 0.5)", top: "40%" }} />
            <View key="park-1" className="absolute w-32 h-28 bg-[#C5E1A5]/50 rounded-2xl left-4 top-16" />
            <View key="park-2" className="absolute w-24 h-20 bg-[#FFE082]/40 rounded-2xl right-6 top-32" />
            <View key="park-3" className="absolute w-28 h-24 bg-[#C5E1A5]/40 rounded-2xl right-10 bottom-40" />
            <Text className="absolute bottom-[280px] left-8 text-[11px] text-slate-500 font-bold tracking-widest opacity-30">SUNNYDALE</Text>

            {/* Winding orange route path */}
            <View style={{ position: "absolute", top: "35%", left: "25%", width: 80, height: 40, borderLeftWidth: 3, borderBottomWidth: 3, borderColor: "#E4792F", borderBottomLeftRadius: 20 }} />
            <View style={{ position: "absolute", top: "40%", left: "45%", width: 60, height: 50, borderRightWidth: 3, borderTopWidth: 3, borderColor: "#E4792F", borderTopRightRadius: 20 }} />
            
            {/* Location marker dots */}
            <View style={{ position: "absolute", top: "34%", left: "24%", width: 10, height: 10, borderRadius: 5, backgroundColor: "#E4792F" }} />
            <View style={{ position: "absolute", top: "44%", left: "59%", width: 16, height: 16, borderRadius: 8, backgroundColor: "white", borderWidth: 2, borderColor: "#E4792F", alignItems: "center", justifyContent: "center" }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#E4792F" }} />
            </View>
          </View>

          {/* Floating Bottom Card Panel */}
          <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-6 shadow-2xl border-t border-slate-100">
            {/* Drag Handle */}
            <View className="w-12 h-1 bg-slate-200 rounded-full self-center mb-5" />

            {/* Title */}
            <Text className="text-slate-800 text-[22px] font-bold mb-4">Heading To Pickup</Text>

            {/* Rider Info Card */}
            <View className="bg-[#F8FAFC] border border-slate-100 p-4 rounded-[20px] flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-3">
                <Image
                  source={require("@/assets/images/driver-avatar.png")}
                  className="w-12 h-12 rounded-full bg-slate-200"
                />
                <View>
                  <Text className="text-slate-800 text-[16px] font-bold">Rahim Rehman</Text>
                  <Text className="text-slate-400 text-xs font-semibold mt-0.5">
                    <Text className="text-brand-orange font-bold">1.5KM</Text> Away
                  </Text>
                </View>
              </View>
              {/* Phone call button */}
              <TouchableOpacity className="w-10 h-10 rounded-full bg-[#FFF2EB] items-center justify-center">
                <Ionicons name="call" size={18} color="#E4792F" />
              </TouchableOpacity>
            </View>

            {/* Pickup Location Card */}
            <View className="bg-[#F8FAFC] border border-slate-100 p-4 rounded-[20px] flex-row items-center gap-3 mb-5">
              <View className="w-10 h-10 rounded-full bg-[#FFF2EB] items-center justify-center">
                <Ionicons name="location" size={20} color="#E4792F" />
              </View>
              <View className="flex-1">
                <Text className="text-slate-400 text-[11px] font-semibold">Pickup Location</Text>
                <Text className="text-slate-800 text-sm font-bold mt-0.5">
                  13, Park Place, Cashmoor, RT 05/146
                </Text>
              </View>
            </View>

            {/* Slide to Arrive Slider */}
            <View className="h-14 bg-[#FFF2EB] rounded-full relative overflow-hidden border border-brand-orange/10">
              <Animated.View
                {...panResponder.panHandlers}
                style={{ transform: [{ translateX: slideAnim }] }}
                className="absolute left-1 top-1 bottom-1 w-12 h-12 rounded-full bg-brand-orange items-center justify-center z-10"
              >
                <Ionicons name="chevron-forward" size={20} color="white" />
              </Animated.View>
              <View className="flex-1 items-center justify-center">
                <Text className="text-brand-orange text-[15px] font-bold">Slide to Arrive</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* ============= HEADING DROP-OFF ============= */}
      {rideState === "heading-dropoff" && (
        <View className="flex-1 relative">
          {/* Fake Map Area (full screen) */}
          <View className="absolute inset-0 bg-[#E5F1F6]">
            {/* Simulated map roads & parks */}
            <View key="road-1" style={{ position: "absolute", width: "200%", height: 16, backgroundColor: "#FDDCB5", transform: [{ rotate: "12deg" }], top: "20%" }} />
            <View key="road-2" style={{ position: "absolute", width: "200%", height: 12, backgroundColor: "#FDDCB5", transform: [{ rotate: "-25deg" }], top: "55%" }} />
            <View key="road-3" style={{ position: "absolute", width: "200%", height: 12, backgroundColor: "rgba(255, 255, 255, 0.6)", transform: [{ rotate: "45deg" }], bottom: "30%" }} />
            <View key="road-4" style={{ position: "absolute", width: "100%", height: 8, backgroundColor: "rgba(255, 255, 255, 0.5)", top: "40%" }} />
            <View key="park-1" className="absolute w-32 h-28 bg-[#C5E1A5]/50 rounded-2xl left-4 top-16" />
            <View key="park-2" className="absolute w-24 h-20 bg-[#FFE082]/40 rounded-2xl right-6 top-32" />
            <View key="park-3" className="absolute w-28 h-24 bg-[#C5E1A5]/40 rounded-2xl right-10 bottom-40" />
            <Text className="absolute bottom-[280px] left-8 text-[11px] text-slate-500 font-bold tracking-widest opacity-30">SUNNYDALE</Text>

            {/* Winding orange route path */}
            <View style={{ position: "absolute", top: "35%", left: "25%", width: 80, height: 40, borderLeftWidth: 3, borderBottomWidth: 3, borderColor: "#E4792F", borderBottomLeftRadius: 20 }} />
            <View style={{ position: "absolute", top: "40%", left: "45%", width: 60, height: 50, borderRightWidth: 3, borderTopWidth: 3, borderColor: "#E4792F", borderTopRightRadius: 20 }} />
            
            {/* Location marker dots */}
            <View style={{ position: "absolute", top: "34%", left: "24%", width: 10, height: 10, borderRadius: 5, backgroundColor: "#E4792F" }} />
            <View style={{ position: "absolute", top: "44%", left: "59%", width: 16, height: 16, borderRadius: 8, backgroundColor: "white", borderWidth: 2, borderColor: "#E4792F", alignItems: "center", justifyContent: "center" }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#E4792F" }} />
            </View>
          </View>

          {/* Floating Bottom Card Panel */}
          <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-6 shadow-2xl border-t border-slate-100">
            {/* Drag Handle */}
            <View className="w-12 h-1 bg-slate-200 rounded-full self-center mb-5" />

            {/* Title */}
            <Text className="text-slate-800 text-[22px] font-bold mb-4">Heading Drop-Off</Text>

            {/* Rider Info Card */}
            <View className="bg-[#F8FAFC] border border-slate-100 p-4 rounded-[20px] flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-3">
                <Image
                  source={require("@/assets/images/driver-avatar.png")}
                  className="w-12 h-12 rounded-full bg-slate-200"
                />
                <View>
                  <Text className="text-slate-800 text-[16px] font-bold">Rahim Rehman</Text>
                  <Text className="text-slate-400 text-xs font-semibold mt-0.5">Pickuped</Text>
                </View>
              </View>
              {/* Phone call button */}
              <TouchableOpacity className="w-10 h-10 rounded-full bg-[#FFF2EB] items-center justify-center">
                <Ionicons name="call" size={18} color="#E4792F" />
              </TouchableOpacity>
            </View>

            {/* Drop-Off Location Card */}
            <View className="bg-[#F8FAFC] border border-slate-100 p-4 rounded-[20px] flex-row items-center gap-3 mb-5">
              <View className="w-10 h-10 rounded-full bg-[#FFF2EB] items-center justify-center">
                <Ionicons name="location" size={20} color="#E4792F" />
              </View>
              <View className="flex-1">
                <Text className="text-slate-400 text-[11px] font-semibold">Drop-Off Location</Text>
                <Text className="text-slate-800 text-sm font-bold mt-0.5">
                  13, Park Place, Cashmoor, RT 05/146
                </Text>
              </View>
            </View>

            {/* Slide to Start Trip Slider */}
            <View className="h-14 bg-[#FFF2EB] rounded-full relative overflow-hidden border border-brand-orange/10">
              <Animated.View
                {...panResponder.panHandlers}
                style={{ transform: [{ translateX: slideAnim }] }}
                className="absolute left-1 top-1 bottom-1 w-12 h-12 rounded-full bg-brand-orange items-center justify-center z-10"
              >
                <Ionicons name="chevron-forward" size={20} color="white" />
              </Animated.View>
              <View className="flex-1 items-center justify-center">
                <Text className="text-brand-orange text-[15px] font-bold">Slide to Start Trip</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* ============= TRIP COMPLETED ============= */}
      {rideState === "completed" && (
        <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
            {/* Success Checkmark Badge */}
            <View className="items-center justify-center pt-12 pb-6">
              <View className="w-24 h-24 bg-brand-orange rounded-full items-center justify-center mb-6 shadow-lg shadow-brand-orange/30">
                <Ionicons name="checkmark" size={48} color="white" />
              </View>
              <Text className="text-slate-800 text-[26px] font-bold text-center">Trip Completed</Text>
            </View>

            {/* You Earned Section */}
            <View className="items-center mb-8">
              <Text className="text-slate-400 text-sm font-semibold">You Earned</Text>
              <Text className="text-brand-orange text-[42px] font-black mt-1">$1,200</Text>
            </View>

            {/* Details Card */}
            <View className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm mb-10">
              <View className="flex-row justify-between items-center py-1">
                <Text className="text-slate-400 text-[14px] font-semibold">Trip Fee</Text>
                <Text className="text-slate-800 text-[14px] font-bold">$1,200.00</Text>
              </View>
              
              {/* Dashed Divider */}
              <View className="w-full h-[1px] border-t border-dashed border-slate-200 my-4" />

              <View className="flex-row justify-between items-center py-1">
                <Text className="text-slate-800 text-[14px] font-bold">Total You'll receive</Text>
                <Text className="text-brand-orange text-[16px] font-extrabold">$1,200.00</Text>
              </View>
            </View>

            {/* Back Home Button */}
            <TouchableOpacity
              onPress={handleTripDone}
              className="w-full py-4 bg-brand-orange rounded-[18px] items-center justify-center mb-12 shadow-lg shadow-brand-orange/20"
            >
              <Text className="text-white text-base font-bold">Back to Home</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
}

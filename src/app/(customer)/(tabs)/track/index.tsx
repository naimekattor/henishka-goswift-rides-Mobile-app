import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TrackScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header bar */}
      <View className="flex-row items-center justify-center px-6 pt-4 pb-2 h-16 absolute">
        <TouchableOpacity
          onPress={() => router.back()}
          className=" w-12 h-12 rounded-full border border-gray-200 items-center justify-center bg-white shadow-sm"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 5,
            elevation: 2,
          }}
        >
          <Ionicons name="chevron-back" size={20} color="#6A7282" />
        </TouchableOpacity>
        <Text className="text-brand-dark text-xl font-bold">Track Order</Text>
      </View>

      {/* Main Track View */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        className="bg-[#F9F7F6]/50"
      >
        {/* Mock Map View Card */}
        <View className="relative w-full h-80 overflow-hidden bg-gray-100 border-b border-gray-200">
          {/* Mock Map Image from Unsplash */}
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600",
            }}
            className="w-full h-full opacity-90"
            resizeMode="cover"
          />

          {/* Route path vector markers overlay */}
          <View className="absolute top-1/3 left-1/3 bg-orange-500 w-6 h-6 rounded-full border-2 border-white items-center justify-center shadow">
            <Ionicons name="location" size={12} color="#FFFFFF" />
          </View>
          <View className="absolute top-1/2 left-1/2 bg-blue-500 w-8 h-8 rounded-full border-2 border-white items-center justify-center shadow">
            <FontAwesome6 name="car-side" size={14} color="#FFFFFF" />
          </View>

          {/* Map pin status badge top right */}
          <View
            className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-2xl px-3 py-1.5 shadow-sm border border-gray-200 flex-row items-center gap-1.5"
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <View className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <Text className="text-brand-dark text-[10px] font-bold">
              GPS Live
            </Text>
          </View>
        </View>

        {/* Floating Tracking Card */}
        <View className="px-6 -mt-6">
          <View
            className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xl"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.08,
              shadowRadius: 16,
              elevation: 10,
            }}
          >
            {/* Status & ETA Header */}
            <View
              className="flex-row justify-between items-center pb-4 border-b border-gray-100"
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text className="text-brand-gray text-[10px] font-bold uppercase tracking-wider">
                  Estimated Delivery
                </Text>
                <Text className="text-brand-dark text-xl font-black mt-0.5">
                  15 - 20 Mins
                </Text>
              </View>
              <View className="bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
                <Text
                  className="text-brand-primary text-xs font-bold"
                  style={{ color: "#F97316" }}
                >
                  En Route
                </Text>
              </View>
            </View>

            {/* Delivery address display */}
            <View
              className="py-4 border-b border-gray-100 flex-row gap-3"
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <View
                className="w-8 h-8 rounded-full bg-orange-55/10 items-center justify-center"
                style={{ backgroundColor: "rgba(249, 115, 22, 0.08)" }}
              >
                <Ionicons name="location" size={16} color="#F97316" />
              </View>
              <View className="flex-1">
                <Text className="text-brand-gray text-[10px] font-semibold">
                  Delivery Address
                </Text>
                <Text
                  className="text-brand-dark text-xs font-bold leading-4 mt-0.5"
                  numberOfLines={1}
                >
                  49, Bir Uttam AK Khandakar Road, Dhaka
                </Text>
              </View>
            </View>

            {/* Courier / Driver Profile */}
            <View
              className="py-4 flex-row items-center justify-between"
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                className="flex-row items-center gap-3"
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
                  }}
                  className="w-11 h-11 rounded-full border border-gray-100 bg-white"
                />
                <View>
                  <Text className="text-brand-dark font-extrabold text-sm">
                    Rahim Rehman
                  </Text>
                  <Text className="text-brand-gray text-[10px] font-medium mt-0.5">
                    Honda Civic (G - 1023)
                  </Text>
                </View>
              </View>

              {/* Action buttons */}
              <View
                className="flex-row gap-2.5"
                style={{ flexDirection: "row" }}
              >
                <TouchableOpacity className="w-9 h-9 rounded-full border border-gray-200 bg-white justify-center items-center">
                  <Ionicons name="call" size={16} color="#F97316" />
                </TouchableOpacity>
                <TouchableOpacity className="w-9 h-9 rounded-full border border-gray-200 bg-white justify-center items-center">
                  <Ionicons
                    name="chatbubble-ellipses"
                    size={16}
                    color="#F97316"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Timeline Status tracker */}
        <View className="px-6 py-8 pb-32">
          <Text className="text-brand-dark text-base font-bold mb-4">
            Order Status
          </Text>

          <View className="gap-5 pl-2 relative">
            {/* Vertical dashed line behind timeline dots */}
            <View
              className="absolute left-4.5 top-2 bottom-6 w-[2px] bg-gray-100"
              style={{ left: 16 }}
            />

            {/* Step 1 */}
            <View className="flex-row gap-4" style={{ flexDirection: "row" }}>
              <View className="w-8 h-8 rounded-full bg-green-500 justify-center items-center z-10">
                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
              </View>
              <View className="flex-1 justify-center">
                <Text className="text-brand-dark text-sm font-bold">
                  Order Confirmed
                </Text>
                <Text className="text-gray-400 text-[10px] mt-0.5">
                  10:32 AM • Payment received
                </Text>
              </View>
            </View>

            {/* Step 2 */}
            <View className="flex-row gap-4" style={{ flexDirection: "row" }}>
              <View className="w-8 h-8 rounded-full bg-green-500 justify-center items-center z-10">
                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
              </View>
              <View className="flex-1 justify-center">
                <Text className="text-brand-dark text-sm font-bold">
                  Preparing Your Order
                </Text>
                <Text className="text-gray-400 text-[10px] mt-0.5">
                  10:35 AM • Preparing food/items
                </Text>
              </View>
            </View>

            {/* Step 3 */}
            <View className="flex-row gap-4" style={{ flexDirection: "row" }}>
              <View className="w-8 h-8 rounded-full bg-orange-500 justify-center items-center z-10">
                <Ionicons name="walk" size={14} color="#FFFFFF" />
              </View>
              <View className="flex-1 justify-center">
                <Text className="text-brand-dark text-sm font-bold">
                  Driver is En Route
                </Text>
                <Text className="text-gray-400 text-[10px] mt-0.5">
                  10:44 AM • Near Dhaka Main Road
                </Text>
              </View>
            </View>

            {/* Step 4 */}
            <View className="flex-row gap-4" style={{ flexDirection: "row" }}>
              <View className="w-8 h-8 rounded-full bg-gray-100 justify-center items-center z-10 border border-gray-200">
                <Ionicons name="home-outline" size={14} color="#8E8E93" />
              </View>
              <View className="flex-1 justify-center">
                <Text className="text-gray-400 text-sm font-medium">
                  Delivered
                </Text>
                <Text className="text-gray-400 text-[10px] mt-0.5">
                  Expected by 11:05 AM
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

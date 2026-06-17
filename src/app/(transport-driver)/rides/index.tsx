import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface RideItem {
  id: string;
  pickupAddress: string;
  dropoffAddress: string;
  status: "On Going" | "Complete";
  estimatedEarning: string;
}

export default function TransportDriverRides() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<"On Going" | "History">("On Going");

  const ongoingRides: RideItem[] = [
    {
      id: "RD-1001",
      pickupAddress: "13, Park Place, Cashmoor, RT 05/146",
      dropoffAddress: "Naraynagnaj, Sadar",
      status: "On Going",
      estimatedEarning: "$8.50",
    },
  ];

  const historyRides: RideItem[] = [
    {
      id: "RD-0987",
      pickupAddress: "13, Park Place, Cashmoor, RT 05/146",
      dropoffAddress: "Naraynagnaj, Sadar",
      status: "Complete",
      estimatedEarning: "$8.50",
    },
    {
      id: "RD-0954",
      pickupAddress: "13, Park Place, Cashmoor, RT 05/146",
      dropoffAddress: "Naraynagnaj, Sadar",
      status: "Complete",
      estimatedEarning: "$8.50",
    },
    {
      id: "RD-0921",
      pickupAddress: "13, Park Place, Cashmoor, RT 05/146",
      dropoffAddress: "Naraynagnaj, Sadar",
      status: "Complete",
      estimatedEarning: "$8.50",
    },
  ];

  const displayedRides = selectedTab === "On Going" ? ongoingRides : historyRides;

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
        <TouchableOpacity onPress={() => router.replace("/(transport-driver)/dashboard" as any)}>
          <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
        </TouchableOpacity>
        <Text className="text-brand-dark text-base font-bold">Ride</Text>
        <View className="w-6" />
      </View>

      {/* Tabs: On Going / History */}
      <View className="flex-row px-6 py-4 bg-white border-b border-slate-50">
        <TouchableOpacity
          onPress={() => setSelectedTab("On Going")}
          className={`flex-1 py-3 rounded-xl items-center justify-center mr-2 ${
            selectedTab === "On Going"
              ? "bg-brand-orange"
              : "bg-white border border-slate-200"
          }`}
        >
          <Text
            className={`text-xs font-bold ${
              selectedTab === "On Going" ? "text-white" : "text-brand-dark"
            }`}
          >
            On Going
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("History")}
          className={`flex-1 py-3 rounded-xl items-center justify-center ml-2 ${
            selectedTab === "History"
              ? "bg-brand-orange"
              : "bg-white border border-slate-200"
          }`}
        >
          <Text
            className={`text-xs font-bold ${
              selectedTab === "History" ? "text-white" : "text-brand-dark"
            }`}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      {/* Rides List */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
        {displayedRides.length === 0 ? (
          <View className="items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 p-6">
            <View className="w-16 h-16 rounded-full bg-slate-50 items-center justify-center mb-4">
              <Ionicons name="car-sport-outline" size={32} color="#A0AEC0" />
            </View>
            <Text className="text-brand-dark font-bold text-sm">No Rides Yet</Text>
            <Text className="text-brand-gray text-[10px] text-center mt-1">
              {selectedTab === "On Going"
                ? "No active rides at the moment. Go online to receive requests."
                : "Your completed ride history will appear here."}
            </Text>
          </View>
        ) : (
          <View className="gap-5 mb-12">
            {displayedRides.map((ride) => (
              <View
                key={ride.id}
                className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm"
              >
                {/* Mini Map Thumbnail */}
                <View className="w-full h-28 rounded-2xl bg-[#E5F1F6] border border-slate-100 mb-4 relative overflow-hidden">
                  {/* Simulated map roads */}
                  <View className="absolute w-[200%] h-2 bg-[#FDDCB5] rotate-12 top-[30%]" />
                  <View className="absolute w-[200%] h-2 bg-[#FDDCB5] -rotate-[20deg] top-[60%]" />
                  <View className="absolute w-20 h-16 bg-[#C5E1A5]/50 rounded-xl left-3 top-2" />
                  <View className="absolute w-16 h-12 bg-[#FFE082]/40 rounded-xl right-8 bottom-2" />
                  {/* Route pin */}
                  <View className="absolute top-[40%] left-[40%]">
                    <Ionicons name="location" size={20} color="#EF4444" />
                  </View>
                </View>

                {/* Locations */}
                <View className="gap-3 mb-4">
                  <View className="flex-row items-start gap-3">
                    <View className="w-6 h-6 rounded-full bg-brand-orange items-center justify-center mt-0.5">
                      <View className="w-2 h-2 rounded-full bg-white" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-brand-dark text-xs font-bold">Pickup Location</Text>
                      <Text className="text-brand-gray text-[10px] font-semibold mt-0.5">
                        {ride.pickupAddress}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-start gap-3">
                    <View className="w-6 h-6 rounded-full bg-emerald-500 items-center justify-center mt-0.5">
                      <Ionicons name="location" size={12} color="white" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-brand-dark text-xs font-bold">Drop-Off Location</Text>
                      <Text className="text-brand-gray text-[10px] font-semibold mt-0.5">
                        {ride.dropoffAddress}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Status badge */}
                <View
                  className={`self-start px-3 py-1 rounded-full mb-4 ${
                    ride.status === "On Going" ? "bg-amber-50" : "bg-emerald-50"
                  }`}
                >
                  <Text
                    className={`text-[10px] font-bold ${
                      ride.status === "On Going" ? "text-amber-500" : "text-emerald-500"
                    }`}
                  >
                    {ride.status}
                  </Text>
                </View>

                {/* Estimated Earning */}
                <View className="flex-row items-center justify-between pt-3 border-t border-slate-50">
                  <Text className="text-brand-dark text-xs font-bold">Estimated Earning</Text>
                  <Text className="text-brand-orange text-base font-extrabold">
                    {ride.estimatedEarning}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

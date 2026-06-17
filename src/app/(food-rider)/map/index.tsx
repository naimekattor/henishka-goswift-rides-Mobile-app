import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function RiderMap() {
  return (
    <SafeAreaView className="flex-1 bg-sky-100">
      {/* Full screen Map Background using styled React Native views representing streets */}
      <View style={StyleSheet.absoluteFill} className="bg-[#E5E9F0]">
        
        {/* Styled Roads */}
        {/* Horizontal & Diagonal Avenues */}
        <View className="absolute bg-white h-7.5 w-full rotate-[15deg] shadow-sm" style={{ top: "25%" }} />
        <View className="absolute bg-white h-8 w-full -rotate-[12deg] shadow-sm" style={{ top: "45%" }} />
        <View className="absolute bg-white h-7.5 w-full rotate-[35deg] shadow-sm" style={{ top: "65%" }} />
        
        {/* Vertical & Intersecting Streets */}
        <View className="absolute bg-white w-7.5 h-full left-1/4 -rotate-6 shadow-sm" />
        <View className="absolute bg-white w-8 h-full left-2/3 rotate-[20deg] shadow-sm" />
        
        {/* Park/Green Area mockups */}
        <View className="absolute w-28 h-20 bg-[#D8E6D3] rounded-full top-8 left-12 opacity-80" />
        <View className="absolute w-36 h-28 bg-[#D8E6D3] rounded-full bottom-16 right-4 opacity-75" />
        <View className="absolute w-24 h-16 bg-[#D8E6D3] rounded-3xl top-1/2 left-[55%] opacity-85" />

        {/* Text/Street Labels */}
        <Text className="absolute text-[8px] font-bold text-slate-400 rotate-[15deg]" style={{ top: "23%", left: "40%" }}>
          Persia Ave
        </Text>
        <Text className="absolute text-[8px] font-bold text-slate-400 -rotate-[12deg]" style={{ top: "43%", left: "15%" }}>
          Geneva Ave
        </Text>
        <Text className="absolute text-[9px] font-black text-slate-500 tracking-widest uppercase" style={{ top: "58%", left: "45%" }}>
          Sunnydale
        </Text>
        <Text className="absolute text-[8px] font-bold text-slate-400 rotate-[90deg]" style={{ top: "35%", left: "20%" }}>
          Athens St
        </Text>

        {/* Current location pin marker and callout overlay */}
        <View className="absolute top-[48%] left-[45%] items-center justify-center">
          {/* Location radar wave */}
          <View className="w-20 h-20 bg-brand-orange/15 rounded-full items-center justify-center absolute z-0" />
          
          {/* Pin */}
          <View className="z-10 items-center">
            {/* Speech bubble */}
            <View className="bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-md mb-1.5 flex-row items-center gap-1.5">
              <View className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              <Text className="text-brand-dark text-[9px] font-black tracking-tight whitespace-nowrap">
                Your Current Location
              </Text>
            </View>
            {/* Orange Pin Icon */}
            <Ionicons name="location" size={32} color="#E4792F" className="shadow" />
          </View>
        </View>
      </View>

      {/* Transparent Floating Header for screen indicator */}
      <View className="absolute top-12 left-6 right-6 flex-row items-center justify-between pointer-events-none">
        <View className="bg-white/95 px-5 py-3 rounded-2xl shadow border border-slate-100 flex-row items-center gap-2">
          <Ionicons name="compass" size={16} color="#E4792F" />
          <Text className="text-brand-dark text-xs font-extrabold">GPS Navigation Active</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

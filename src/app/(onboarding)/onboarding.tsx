import { useState, useRef } from "react";
import { View, Text, ScrollView, useWindowDimensions, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/button";

const ONBOARDING_DATA = [
  {
    image: require("@/assets/images/onboarding/1.png"),
    title: "Delicious Food, Delivered Fast",
    subtitle: "Fresh food, real-time tracking. Order local, tap away!",
  },
  {
    image: require("@/assets/images/onboarding/2.png"),
    title: "Move Around With Ease",
    subtitle: "Safe, reliable rides. Professional drivers, anytime, anywhere",
  },
  {
    image: require("@/assets/images/onboarding/3.png"),
    title: "Your Perfect Drive, Your Way",
    subtitle: "Premium cars, by the day or week. Drive free, on your terms.",
  },
];

export default function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const router = useRouter();

  const handleScroll = (event: any) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / width);
    setActiveIndex(index);
  };

  const handleContinue = () => {
    if (activeIndex < ONBOARDING_DATA.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (activeIndex + 1) * width,
        animated: true,
      });
    } else {
      router.replace("/(auth)/login");
    }
  };

  const handleBack = () => {
    if (activeIndex > 0) {
      scrollViewRef.current?.scrollTo({
        x: (activeIndex - 1) * width,
        animated: true,
      });
    }
  };

  const handleSkip = () => {
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg justify-between">
      {/* Header bar */}
      <View className="flex-row justify-between items-center px-6 pt-2 h-14">
        {activeIndex > 0 ? (
          <TouchableOpacity
            onPress={handleBack}
            className="w-12 h-12 rounded-full border border-gray-200 items-center justify-center bg-white shadow-sm"
          >
            <Ionicons name="chevron-back" size={20} color="#6A7282" />
          </TouchableOpacity>
        ) : (
          <View className="w-12 h-12" />
        )}

        <TouchableOpacity onPress={handleSkip} className="flex-row items-center gap-1">
          <Text className="text-brand-gray text-base font-semibold">Skip</Text>
          <Ionicons name="arrow-forward" size={16} color="#6A7282" />
        </TouchableOpacity>
      </View>

      {/* Pages Container */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="flex-1"
      >
        {ONBOARDING_DATA.map((item, index) => (
          <View key={index} style={{ width }} className="flex-1 justify-center items-center px-8">
            <View className="flex-1 justify-center items-center w-full">
              <Image
                source={item.image}
                className="w-72 h-72"
                resizeMode="contain"
              />
            </View>

            <View className="items-center pb-8">
              <Text className="text-brand-dark text-2xl font-bold text-center mb-3">
                {item.title}
              </Text>
              <Text className="text-brand-gray text-base text-center leading-6 max-w-[280px]">
                {item.subtitle}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Indicators and Button Section */}
      <View className="px-6 pb-10 items-center gap-8">
        {/* Page Dots */}
        <View className="flex-row gap-2 justify-center items-center">
          {ONBOARDING_DATA.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full ${
                activeIndex === index
                  ? "w-6 bg-brand-orange"
                  : "w-2 bg-brand-gray/20"
              }`}
            />
          ))}
        </View>

        {/* Continue Button */}
        <Button
          title="Continue"
          iconName="arrow-forward"
          onPress={handleContinue}
        />
      </View>
    </SafeAreaView>
  );
}

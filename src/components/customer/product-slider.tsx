import { Image, ScrollView, View } from "react-native";

interface ProductSliderProps {
  productSlides: string[];
  activeSlide: number;
  onScroll: (event: any) => void;
  screenWidth: number;
}

export default function ProductSlider({
  productSlides,
  activeSlide,
  onScroll,
  screenWidth,
}: ProductSliderProps) {
  return (
    <View className="bg-white relative">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={{ width: screenWidth, height: 256 }}
      >
        {productSlides.map((slideUri, index) => (
          <Image
            key={index}
            source={{ uri: slideUri }}
            style={{ width: screenWidth, height: 256 }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Paginator dots */}
      <View className="flex-row gap-2 mt-4 mb-2 justify-center">
        {productSlides.map((_, i) => (
          <View
            key={i}
            className={`h-2 rounded-full ${
              activeSlide === i ? "w-6" : "w-2"
            }`}
            style={{
              backgroundColor: activeSlide === i ? "#F97316" : "#E5E7EB",
            }}
          />
        ))}
      </View>
    </View>
  );
}

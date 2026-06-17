import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductSlider from "@/components/customer/product-slider";
import ProductSpecs from "@/components/customer/product-specs";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Helper to return dynamic descriptions matching selected items
const getProductDescription = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("sneaker")) {
    return "Step into comfort with these high-performance athletic sneakers. Engineered with responsive cushioning and a breathable mesh upper, they provide all-day support and flexibility for running, training, or everyday wear.";
  } else if (lower.includes("watch")) {
    return "Stay connected and track your fitness goals with this premium Smart Watch. Featuring a vibrant always-on display, heart rate monitor, sleep tracking, and multi-day battery life.";
  } else if (lower.includes("headphone")) {
    return "Experience immersive high-fidelity sound with these noise-canceling wireless headphones. Designed with memory foam ear cushions and advanced drivers for rich bass and crisp highs.";
  } else if (lower.includes("phone")) {
    return "Experience top-tier speed and absolute brilliance with this next-generation Smart Phone. Equipped with a triple-lens pro camera system and long-lasting intelligent battery.";
  } else if (
    lower.includes("pizza") ||
    lower.includes("burger") ||
    lower.includes("sushi")
  ) {
    return "Indulge in freshly prepared culinary delights. Made with the finest organic ingredients and crafted by master chefs to satisfy your gourmet cravings.";
  }
  return "A premium choice engineered with high-quality components for long-lasting convenience and premium day-to-day comfort.";
};

// Helper to return dynamic slide images
const getProductSlides = (title: string, defaultImage: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("sneaker")) {
    return [
      defaultImage,
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600",
    ];
  } else if (lower.includes("watch")) {
    return [
      defaultImage,
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600",
    ];
  } else if (lower.includes("headphone")) {
    return [
      defaultImage,
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600",
    ];
  }
  return [defaultImage, defaultImage, defaultImage];
};

export default function ProductDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Retrieve parameters or set defaults
  const id = (params.id as string) || "p1";
  const title = (params.title as string) || "Smart Watch";
  const price = parseFloat((params.price as string) || "155");
  const rating = parseFloat((params.rating as string) || "4.2");
  const image =
    (params.image as string) ||
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400";

  // States
  const [selectedColor, setSelectedColor] = useState("dark-grey");
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [activeSlide, setActiveSlide] = useState(0);

  const originalPrice = price * 2; // Mock original price
  const descriptionText = getProductDescription(title);
  const productSlides = getProductSlides(title, image);

  // Monitor slide transitions
  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const pageNum = Math.round(contentOffset / viewSize);
    setActiveSlide(pageNum);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      {/* Back Button (Floating) */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="w-12 h-12 rounded-full border border-gray-200 justify-center items-center bg-white absolute top-14 left-6 z-10 shadow-sm"
      >
        <Ionicons name="chevron-back" size={20} color="#6A7282" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 150 }} // Increased bottom padding to prevent bottom floating bar overlap
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image Carousel Slider Component */}
        <ProductSlider
          productSlides={productSlides}
          activeSlide={activeSlide}
          onScroll={handleScroll}
          screenWidth={SCREEN_WIDTH}
        />

        {/* Content details wrapper (removed flex-1 constraint to allow ScrollView to function correctly) */}
        <View className="px-6 pt-4 bg-[#F9F7F6]/40 rounded-t-[40px] border-t border-gray-100">
          {/* Title & Shop Info */}
          <View className="flex-row justify-between items-center mt-2">
            <View className="flex-1 pr-4">
              <Text className="text-brand-dark text-2xl font-bold">
                {title}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-brand-dark text-sm font-semibold">
                Mobile Store
              </Text>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80",
                }}
                className="w-8 h-8 rounded-full border border-gray-100 bg-white"
              />
            </View>
          </View>

          {/* Pricing Row */}
          <View className="flex-row items-center mt-3">
            <Text className="text-2xl font-bold" style={{ color: "#F97316" }}>
              ${price}
            </Text>
            <Text className="text-gray-400 line-through text-lg font-semibold ml-2">
              ${originalPrice}
            </Text>
          </View>

          {/* Rating Badge */}
          <View className="flex-row items-center gap-2 mt-3">
            <View
              className="flex-row items-center gap-1 px-3 py-1 rounded-full"
              style={{ backgroundColor: "rgba(249, 115, 22, 0.08)" }}
            >
              <Ionicons name="star" size={14} color="#F97316" />
              <Text className="font-bold text-sm" style={{ color: "#F97316" }}>
                {rating}
              </Text>
            </View>
            <Text className="text-brand-gray text-xs font-semibold">
              132 Reviews
            </Text>
          </View>

          {/* Size & Color Specs Component */}
          <ProductSpecs
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />

          {/* Product Description */}
          <View className="mt-8">
            <Text className="text-brand-dark text-base font-bold mb-2">
              Product description
            </Text>
            <Text className="text-brand-gray text-sm leading-6">
              {descriptionText}
            </Text>
          </View>

          {/* Reviews Row */}
          <View className="mt-8 mb-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-brand-dark text-base font-bold">
                Review
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(customer)/home/rating-reviews" as any)}
              >
                <Text
                  className="font-semibold text-sm"
                  style={{ color: "#F97316" }}
                >
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            {/* Mock review 1 */}
            <View className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-3">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center gap-2">
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
                    }}
                    className="w-8 h-8 rounded-full"
                  />
                  <View>
                    <Text className="text-brand-dark font-bold text-xs">
                      Maria Rodriguez
                    </Text>
                    <View className="flex-row gap-0.5 mt-0.5">
                      {[1, 2, 3].map((s) => (
                        <Ionicons
                          key={s}
                          name="star"
                          size={10}
                          color="#FFD700"
                        />
                      ))}
                      {[4, 5].map((s) => (
                        <Ionicons
                          key={s}
                          name="star-outline"
                          size={10}
                          color="#E5E7EB"
                        />
                      ))}
                    </View>
                  </View>
                </View>
                <Text className="text-gray-400 text-[10px]">2 days ago</Text>
              </View>
              <Text
                className="text-brand-gray text-xs leading-5"
                numberOfLines={2}
              >
                Absolutely amazing experience! The Gallo Pinto was authentic and
                delicious. The atmosphere is cozy and the staff is incredibly
                friendly...{" "}
                <Text className="font-semibold" style={{ color: "#F97316" }}>
                  Read more
                </Text>
              </Text>
            </View>

            {/* Mock review 2 */}
            <View className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center gap-2">
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
                    }}
                    className="w-8 h-8 rounded-full"
                  />
                  <View>
                    <Text className="text-brand-dark font-bold text-xs">
                      Esther Howard
                    </Text>
                    <View className="flex-row gap-0.5 mt-0.5">
                      {[1, 2, 3, 4].map((s) => (
                        <Ionicons
                          key={s}
                          name="star"
                          size={10}
                          color="#FFD700"
                        />
                      ))}
                      {[5].map((s) => (
                        <Ionicons
                          key={s}
                          name="star-outline"
                          size={10}
                          color="#E5E7EB"
                        />
                      ))}
                    </View>
                  </View>
                </View>
                <Text className="text-gray-400 text-[10px]">2 days ago</Text>
              </View>
              <Text
                className="text-brand-gray text-xs leading-5"
                numberOfLines={2}
              >
                The material feels extremely premium and fits beautifully.
                Highly recommend this store for anyone looking for quality
                gadgets.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Action Row */}
      <View
        className="absolute bottom-6 bg-white rounded-full border border-gray-100 flex-row items-center px-4 py-2.5 gap-4 shadow-lg shadow-black/10"
        style={{
          alignSelf: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        {/* Cart Button */}
        <TouchableOpacity
          onPress={() => router.push("/(customer)/cart")}
          className="w-12 h-12 rounded-full border border-gray-200 justify-center items-center bg-white shadow-sm"
        >
          <FontAwesome6 name="opencart" size={20} color="#6A7282" />
        </TouchableOpacity>

        {/* Counter selector */}
        <View className="flex-row items-center bg-white rounded-full px-2.5 py-1 border border-gray-200 gap-3">
          <TouchableOpacity
            onPress={() => quantity > 1 && setQuantity(quantity - 1)}
            className="w-7 h-7 rounded-full justify-center items-center shadow-sm"
            style={{ backgroundColor: "#F97316" }}
          >
            <Ionicons name="remove" size={16} color="#FFFFFF" />
          </TouchableOpacity>
          <Text className="text-brand-dark font-bold text-base min-w-[20px] text-center">
            {quantity}
          </Text>
          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            className="w-7 h-7 rounded-full justify-center items-center shadow-sm"
            style={{ backgroundColor: "#F97316" }}
          >
            <Ionicons name="add" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Buy Now Button */}
        <TouchableOpacity
          onPress={() => router.push("/(customer)/cart")}
          className="px-6 py-3 rounded-full justify-center items-center shadow-sm"
          style={{ backgroundColor: "#F97316" }}
        >
          <Text className="text-white font-bold text-sm">Buy now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

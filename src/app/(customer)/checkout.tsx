import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckoutAddress from "../../components/customer/checkout-address";
import CheckoutSummary from "../../components/customer/checkout-summary";

export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Retrieve passed cart params or set default
  const baseItemsCount = parseInt((params.totalItems as string) || "0");
  const baseAmount = parseFloat((params.totalAmount as string) || "0.00");

  // Input states
  const [address, setAddress] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  // Promo code states
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Dynamic cost calculations
  const discountAmount = baseAmount * (discountPercent / 100);
  const finalTotal = Math.max(0, baseAmount - discountAmount);

  // Use Location Handler
  const handleUseCurrentLocation = async () => {
    setIsLocating(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied.");
        setIsLocating(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      // Call OpenStreetMap Nominatim reverse geocoding API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.coords.latitude}&lon=${location.coords.longitude}`,
        {
          headers: {
            "User-Agent": "HaniskaApp/1.0",
          },
        },
      );
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress(
          `Lat: ${location.coords.latitude.toFixed(4)}, Lon: ${location.coords.longitude.toFixed(4)}`,
        );
      }
    } catch (error) {
      console.log(error);
      alert("Failed to get current location. Please enter it manually.");
    } finally {
      setIsLocating(false);
    }
  };

  // Promo Apply Handler
  const handleApplyPromo = () => {
    setPromoError(null);
    const code = promoCode.trim().toUpperCase();

    if (!code) {
      setPromoError("Please enter a code");
      return;
    }

    if (code === "WELCOME10") {
      setDiscountPercent(10);
      setAppliedPromo("WELCOME10 (10%)");
      setPromoCode("");
      setShowPromoInput(false);
    } else if (code === "HANISKA") {
      setDiscountPercent(20);
      setAppliedPromo("HANISKA (20%)");
      setPromoCode("");
      setShowPromoInput(false);
    } else if (code === "FREE5") {
      // Custom flat calculation represented as percentage helper or direct amount
      setDiscountPercent(15); // mock flat 15% discount for FREE5
      setAppliedPromo("FREE5 (15%)");
      setPromoCode("");
      setShowPromoInput(false);
    } else {
      setPromoError("Invalid promo code");
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setDiscountPercent(0);
    setPromoError(null);
  };

  const handleProceedPayment = () => {
    // console.log("payment", address);
    if (!address.trim()) {
      alert("Please enter or select a delivery address.");
      return;
    }
    router.push({
      pathname: "/(customer)/payment",
      params: {
        totalAmount: finalTotal.toFixed(2),
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
        {/* Header bar */}
        <View className="flex-row items-center justify-center px-6 pt-4 pb-2 relative h-16 bg-white">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-6 w-12 h-12 rounded-full border border-gray-200 items-center justify-center bg-white shadow-sm"
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
          <Text className="text-brand-dark text-xl font-bold">Your Order</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          className="bg-[#F9F7F6]/50"
        >
          <View className="flex-1 px-6 pt-4">
            {/* Delivery details subcomponent */}
            <CheckoutAddress
              address={address}
              setAddress={setAddress}
              specialInstructions={specialInstructions}
              setSpecialInstructions={setSpecialInstructions}
              isLocating={isLocating}
              onUseCurrentLocation={handleUseCurrentLocation}
            />

            {/* Order total & promo subcomponent */}
            <CheckoutSummary
              baseItemsCount={baseItemsCount}
              baseAmount={baseAmount}
              appliedPromo={appliedPromo}
              discountAmount={discountAmount}
              finalTotal={finalTotal}
              showPromoInput={showPromoInput}
              setShowPromoInput={setShowPromoInput}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              onApplyPromo={handleApplyPromo}
              onRemovePromo={handleRemovePromo}
              promoError={promoError}
              setPromoError={setPromoError}
            />

            {/* Proceed Button (scrolling naturally, prevents keyboard overlapping) */}
            <View className="mt-4 mb-2">
              <TouchableOpacity
                onPress={handleProceedPayment}
                className="w-full py-4 rounded-2xl justify-center items-center shadow-lg shadow-black/10"
                style={{ backgroundColor: "#F97316" }}
              >
                <Text className="text-white font-bold text-base">
                  Proceed to Payment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

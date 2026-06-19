import { FontAwesome6 } from "@expo/vector-icons";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";

interface CheckoutAddressProps {
  address: string;
  setAddress: (addr: string) => void;
  specialInstructions: string;
  setSpecialInstructions: (inst: string) => void;
  isLocating: boolean;
  onUseCurrentLocation: () => void;
}

export default function CheckoutAddress({
  address,
  setAddress,
  specialInstructions,
  setSpecialInstructions,
  isLocating,
  onUseCurrentLocation,
}: CheckoutAddressProps) {
  return (
    <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-4">
      {/* Delivery address */}
      <Text className="text-brand-dark text-sm font-bold mb-3">
        Delivery Address
      </Text>
      <View className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 mb-3">
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your location"
          placeholderTextColor="#A0AAB9"
          className="text-brand-dark text-xs leading-4 min-h-[40px] text-left"
          multiline
        />
      </View>

      {/* Use current location trigger */}
      <TouchableOpacity
        onPress={onUseCurrentLocation}
        disabled={isLocating}
        className="flex-row items-center gap-1.5 py-1 mb-2"
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        {isLocating ? (
          <ActivityIndicator size="small" color="#F97316" className="mr-1" />
        ) : (
          <FontAwesome6
            name="location-arrow"
            size={12}
            color="#F97316"
            className="mr-1"
          />
        )}
        <Text className="font-bold text-xs" style={{ color: "#F97316" }}>
          {isLocating ? "Locating..." : "Use current location"}
        </Text>
      </TouchableOpacity>

      {/* Line Separator */}
      <View className="h-[1px] bg-gray-100 my-4" />

      {/* Special Instructions */}
      <Text className="text-brand-dark text-sm font-bold mb-3">
        Special Instructions
      </Text>
      <View className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">
        <TextInput
          value={specialInstructions}
          onChangeText={setSpecialInstructions}
          placeholder="Special request? Let's know...."
          placeholderTextColor="#A0AAB9"
          className="text-brand-dark text-xs leading-4 min-h-[60px] text-start"
          multiline
          numberOfLines={3}
        />
      </View>
    </View>
  );
}

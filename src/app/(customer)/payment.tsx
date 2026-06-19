import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentScreen() {
  const router = useRouter();

  // Card details state
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  // Helper to format Card Number with spaces (xxxx xxxx xxxx xxxx)
  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    const limited = cleaned.slice(0, 16);
    const matches = limited.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(" ");
    } else {
      return cleaned;
    }
  };

  // Helper to format Expiry Date (MM/YY)
  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    const limited = cleaned.slice(0, 4);
    if (limited.length >= 2) {
      return `${limited.slice(0, 2)}/${limited.slice(2)}`;
    }
    return limited;
  };

  const handleConfirm = () => {
    if (!cardNumber || cardNumber.length < 19) {
      alert("Please enter a valid 16-digit card number.");
      return;
    }
    if (!expiryDate || expiryDate.length < 5) {
      alert("Please enter a valid expiry date (MM/YY).");
      return;
    }
    if (!cvv || cvv.length < 3) {
      alert("Please enter a valid CVV.");
      return;
    }
    if (!cardholderName.trim()) {
      alert("Please enter the cardholder's name.");
      return;
    }

    // Go to payment success screen
    router.replace("/(customer)/payment-success");
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
          <Text className="text-brand-dark text-xl font-bold">Add Your Card</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          className="bg-[#F9F7F6]/50"
        >
          <View className="flex-1 px-6 pt-4">
            {/* Visual credit card preview */}
            <View
              className="w-full h-48 rounded-3xl p-6 mb-8 relative overflow-hidden"
              style={{
                backgroundColor: "#F97316",
                shadowColor: "#F97316",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.2,
                shadowRadius: 15,
                elevation: 8,
              }}
            >
              {/* Card glossy highlights */}
              <View className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mt-10" />
              <View className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full" />

              <View className="flex-row justify-between items-center mb-6" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text className="text-white text-xl font-bold italic">Finaci</Text>
                <Text className="text-white text-2xl font-black italic">VISA</Text>
              </View>

              {/* Number display */}
              <Text className="text-white text-xl font-semibold tracking-[4px] mb-6">
                {cardNumber || "**** **** **** ****"}
              </Text>

              {/* Holder & expiry date details */}
              <View className="flex-row justify-between items-end mt-auto" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
                <View>
                  <Text className="text-white/70 text-[9px] uppercase tracking-wider mb-0.5">
                    Card Holder name
                  </Text>
                  <Text className="text-white text-sm font-bold capitalize">
                    {cardholderName || "Rahim Rehman"}
                  </Text>
                </View>

                <View className="items-end">
                  <Text className="text-white/70 text-[9px] uppercase tracking-wider mb-0.5">
                    Expiry Date
                  </Text>
                  <Text className="text-white text-sm font-bold">
                    {expiryDate || "02/30"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Inputs Form card */}
            <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm gap-4">
              {/* Card Number */}
              <View>
                <Text className="text-brand-gray text-xs font-semibold mb-2">
                  Card Number
                </Text>
                <View className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                  <TextInput
                    value={cardNumber}
                    onChangeText={(t) => setCardNumber(formatCardNumber(t))}
                    placeholder="write here..."
                    placeholderTextColor="#A0AAB9"
                    className="text-brand-dark text-xs leading-4 text-left"
                    keyboardType="numeric"
                    maxLength={19}
                  />
                </View>
              </View>

              {/* Expiry Date & CVV side-by-side */}
              <View className="flex-row gap-4" style={{ flexDirection: "row" }}>
                <View className="flex-1">
                  <Text className="text-brand-gray text-xs font-semibold mb-2">
                    Expiry Date
                  </Text>
                  <View className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                    <TextInput
                      value={expiryDate}
                      onChangeText={(t) => setExpiryDate(formatExpiryDate(t))}
                      placeholder="write here..."
                      placeholderTextColor="#A0AAB9"
                      className="text-brand-dark text-xs leading-4 text-left"
                      keyboardType="numeric"
                      maxLength={5}
                    />
                  </View>
                </View>

                <View className="flex-1">
                  <Text className="text-brand-gray text-xs font-semibold mb-2">
                    CVV
                  </Text>
                  <View className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                    <TextInput
                      value={cvv}
                      onChangeText={(t) => setCvv(t.replace(/\D/g, "").slice(0, 3))}
                      placeholder="write here..."
                      placeholderTextColor="#A0AAB9"
                      className="text-brand-dark text-xs leading-4 text-left"
                      keyboardType="numeric"
                      secureTextEntry
                      maxLength={3}
                    />
                  </View>
                </View>
              </View>

              {/* Cardholder Name */}
              <View>
                <Text className="text-brand-gray text-xs font-semibold mb-2">
                  Cardholder Name
                </Text>
                <View className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                  <TextInput
                    value={cardholderName}
                    onChangeText={setCardholderName}
                    placeholder="write here..."
                    placeholderTextColor="#A0AAB9"
                    className="text-brand-dark text-xs leading-4 text-left"
                    autoCapitalize="words"
                  />
                </View>
              </View>
            </View>

            {/* Confirm Button (scrolled at bottom, prevents keyboard overlaps) */}
            <View className="mt-6 mb-2">
              <TouchableOpacity
                onPress={handleConfirm}
                className="w-full py-4 rounded-2xl justify-center items-center shadow-lg shadow-black/10"
                style={{ backgroundColor: "#F97316" }}
              >
                <Text className="text-white font-bold text-base">Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

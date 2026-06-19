import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface CheckoutSummaryProps {
  baseItemsCount: number;
  baseAmount: number;
  appliedPromo: string | null;
  discountAmount: number;
  finalTotal: number;
  showPromoInput: boolean;
  setShowPromoInput: (show: boolean) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  onApplyPromo: () => void;
  onRemovePromo: () => void;
  promoError: string | null;
  setPromoError: (err: string | null) => void;
}

export default function CheckoutSummary({
  baseItemsCount,
  baseAmount,
  appliedPromo,
  discountAmount,
  finalTotal,
  showPromoInput,
  setShowPromoInput,
  promoCode,
  setPromoCode,
  onApplyPromo,
  onRemovePromo,
  promoError,
  setPromoError,
}: CheckoutSummaryProps) {
  return (
    <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-6">
      <Text className="text-brand-dark text-sm font-bold border-b border-gray-100 pb-3 mb-3">
        Order Items
      </Text>

      <View className="gap-3.5 pb-4 border-b border-dashed border-gray-200">
        <View
          className="flex-row justify-between items-center"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text className="text-brand-gray text-xs font-semibold">
            Total Items
          </Text>
          <Text className="text-brand-dark text-xs font-bold">
            {baseItemsCount} Items
          </Text>
        </View>
        <View
          className="flex-row justify-between items-center"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text className="text-brand-gray text-xs font-semibold">
            Total amount
          </Text>
          <Text className="text-xs font-bold" style={{ color: "#F97316" }}>
            ${baseAmount.toFixed(2)}
          </Text>
        </View>

        {appliedPromo && (
          <View
            className="flex-row justify-between items-center"
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text className="text-green-600 text-xs font-semibold">
              Discount
            </Text>
            <Text className="text-green-600 text-xs font-bold">
              -${discountAmount.toFixed(2)}
            </Text>
          </View>
        )}
      </View>

      {appliedPromo && (
        <View
          className="flex-row justify-between items-center pt-3 pb-3 border-b border-dashed border-gray-200"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text className="text-brand-dark text-xs font-bold">Total</Text>
          <Text className="text-sm font-bold" style={{ color: "#F97316" }}>
            ${finalTotal.toFixed(2)}
          </Text>
        </View>
      )}

      {/* Promo input toggler or active view */}
      <View className="mt-3">
        {appliedPromo ? (
          <View
            className="flex-row items-center justify-between bg-green-50/50 border border-green-200/50 rounded-2xl p-3"
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              className="flex-row items-center gap-2"
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text className="text-green-700 text-xs font-bold">
                Code {appliedPromo} applied
              </Text>
            </View>
            <TouchableOpacity onPress={onRemovePromo} className="p-1">
              <Ionicons name="trash-outline" size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
        ) : showPromoInput ? (
          <View className="gap-2">
            <View
              className="flex-row items-center gap-3"
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <View
                className="flex-1 flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-3 h-11"
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="pricetag-outline" size={16} color="#6A7282" />
                <TextInput
                  value={promoCode}
                  onChangeText={(t) => {
                    setPromoCode(t);
                    setPromoError(null);
                  }}
                  placeholder="Try WELCOME10 or HANISKA"
                  placeholderTextColor="#A0AAB9"
                  className="flex-1 ml-2 text-brand-dark text-xs h-full text-left"
                  autoCapitalize="characters"
                />
              </View>
              <TouchableOpacity
                onPress={onApplyPromo}
                className="px-5 h-11 justify-center items-center rounded-xl"
                style={{ backgroundColor: "#F97316" }}
              >
                <Text className="text-white font-bold text-xs">Apply</Text>
              </TouchableOpacity>
            </View>
            {promoError && (
              <Text className="text-red-500 text-[10px] font-semibold pl-2">
                {promoError}
              </Text>
            )}
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setShowPromoInput(true)}
            className="flex-row items-center gap-2 py-1.5"
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="pricetag-outline" size={16} color="#F97316" />
            <Text className="font-bold text-xs" style={{ color: "#F97316" }}>
              Add promo code
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

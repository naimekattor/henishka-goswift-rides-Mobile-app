import { Text, View } from "react-native";

interface CartSummaryProps {
  itemsCount: number;
  subTotal: number;
  tax: number;
  grandTotal: number;
}

export default function CartSummary({
  itemsCount,
  subTotal,
  tax,
  grandTotal,
}: CartSummaryProps) {
  return (
    <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mt-4 mb-10">
      <Text className="text-brand-dark text-sm font-bold border-b border-gray-100 pb-3">
        Price Summary
      </Text>

      <View className="gap-3.5 py-4 border-b border-dashed border-gray-200">
        <View className="flex-row justify-between items-center" style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text className="text-brand-gray text-xs font-semibold">
            Total Items
          </Text>
          <Text className="text-brand-dark text-xs font-bold">
            {itemsCount} Items
          </Text>
        </View>
        <View className="flex-row justify-between items-center" style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text className="text-brand-gray text-xs font-semibold">
            Sub Total
          </Text>
          <Text className="text-brand-dark text-xs font-bold">
            ${subTotal.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between items-center" style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text className="text-brand-gray text-xs font-semibold">
            Delivery Fee
          </Text>
          <Text className="text-green-500 text-xs font-bold">Free</Text>
        </View>
        <View className="flex-row justify-between items-center" style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text className="text-brand-gray text-xs font-semibold">
            Tax (8%)
          </Text>
          <Text className="text-brand-dark text-xs font-bold">
            ${tax.toFixed(2)}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center pt-4" style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text className="text-brand-dark text-xs font-bold">Total</Text>
        <Text className="text-base font-bold" style={{ color: "#F97316" }}>
          ${grandTotal.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HISTORY_ITEMS = [
  {
    id: "h1",
    shop: "Mobile Store",
    orderId: "#ORD-99120",
    date: "June 15, 2026",
    price: 340.5,
    itemsCount: 2,
    status: "Delivered",
  },
  {
    id: "h2",
    shop: "Pizzeria Brand",
    orderId: "#ORD-98441",
    date: "June 12, 2026",
    price: 35.8,
    itemsCount: 3,
    status: "Delivered",
  },
  {
    id: "h3",
    shop: "Sleek Gadgets Shop",
    orderId: "#ORD-97103",
    date: "June 08, 2026",
    price: 155.0,
    itemsCount: 1,
    status: "Cancelled",
  },
];

export default function HistoryScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header bar */}
      <View className="flex-row items-center justify-center px-6 pt-4 pb-2 relative h-16 bg-white border-b border-gray-100">
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
        <Text className="text-brand-dark text-xl font-bold">Order History</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-[#F9F7F6]/50 flex-1 px-6 pt-4"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="gap-4">
          {HISTORY_ITEMS.map((item) => (
            <View
              key={item.id}
              className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm"
            >
              {/* Top row */}
              <View className="flex-row justify-between items-center pb-3 border-b border-gray-100" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                  <Text className="text-brand-dark font-extrabold text-sm">
                    {item.shop}
                  </Text>
                  <Text className="text-gray-400 text-[9px] mt-0.5 font-semibold">
                    Order ID: {item.orderId}
                  </Text>
                </View>
                <View
                  className="px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor:
                      item.status === "Delivered"
                        ? "rgba(16, 185, 129, 0.08)"
                        : "rgba(239, 68, 68, 0.08)",
                  }}
                >
                  <Text
                    className="text-[10px] font-bold"
                    style={{
                      color: item.status === "Delivered" ? "#10B981" : "#EF4444",
                    }}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>

              {/* Detail row */}
              <View className="flex-row justify-between items-center pt-3" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                  <Text className="text-brand-gray text-[10px] font-medium">
                    {item.date}
                  </Text>
                  <Text className="text-brand-dark text-xs font-bold mt-1">
                    {item.itemsCount} Items • ${item.price.toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => router.push("/(customer)/cart")}
                  className="px-4 py-2 border border-gray-200 rounded-xl bg-gray-50"
                >
                  <Text className="text-brand-dark font-bold text-[10px]">
                    Reorder
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

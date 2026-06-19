import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CustomerFilterModalProps {
  visible: boolean;
  onClose: () => void;
  minPrice: string;
  setMinPrice: (price: string) => void;
  maxPrice: string;
  setMaxPrice: (price: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export function CustomerFilterModal({
  visible,
  onClose,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
}: CustomerFilterModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Semi-transparent backdrop */}
      <View className="flex-1 bg-black/40 justify-center items-center px-6">
        <View className="w-full bg-white rounded-3xl p-6 shadow-xl relative">
          {/* Close button */}
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-4 right-4 w-8 h-8 justify-center items-center"
          >
            <Ionicons name="close" size={24} color="#6A7282" />
          </TouchableOpacity>

          {/* Header title */}
          <Text className="text-xl font-bold text-center mt-2 mb-6" style={{ color: "#F97316" }}>
            Filter by
          </Text>

          {/* Price Range Section */}
          <View className="mb-6">
            <Text className="text-brand-dark font-semibold text-sm mb-3">
              Price Range
            </Text>
            <View className="flex-row justify-between gap-4">
              <TextInput
                value={minPrice}
                onChangeText={setMinPrice}
                placeholder="Min Price"
                placeholderTextColor="#AAAAAA"
                keyboardType="numeric"
                className="flex-1 bg-[#F5F6F7] border border-gray-100 rounded-xl px-4 py-3 text-brand-dark text-sm"
              />
              <TextInput
                value={maxPrice}
                onChangeText={setMaxPrice}
                placeholder="Max Price"
                placeholderTextColor="#AAAAAA"
                keyboardType="numeric"
                className="flex-1 bg-[#F5F6F7] border border-gray-100 rounded-xl px-4 py-3 text-brand-dark text-sm"
              />
            </View>
          </View>

          {/* Sort by Section */}
          <View className="mb-8">
            <Text className="text-brand-dark font-semibold text-sm mb-3">
              Sort by
            </Text>
            <View className="flex-row justify-between gap-3">
              {/* High to low */}
              <TouchableOpacity
                onPress={() => setSortBy("high-to-low")}
                className="flex-1 py-3 px-2 rounded-xl justify-center items-center border"
                style={
                  sortBy === "high-to-low"
                    ? { borderColor: "#F97316", backgroundColor: "white" }
                    : { borderColor: "#F3F4F6", backgroundColor: "#F9F9FA" }
                }
              >
                <Text
                  className="text-xs font-bold"
                  style={{ color: sortBy === "high-to-low" ? "#F97316" : "#AAAAAA" }}
                >
                  High To low Price
                </Text>
              </TouchableOpacity>

              {/* Low to high */}
              <TouchableOpacity
                onPress={() => setSortBy("low-to-high")}
                className="flex-1 py-3 px-2 rounded-xl justify-center items-center border"
                style={
                  sortBy === "low-to-high"
                    ? { borderColor: "#F97316", backgroundColor: "white" }
                    : { borderColor: "#F3F4F6", backgroundColor: "#F9F9FA" }
                }
              >
                <Text
                  className="text-xs font-bold"
                  style={{ color: sortBy === "low-to-high" ? "#F97316" : "#AAAAAA" }}
                >
                  Low To High Price
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Modal Continue button */}
          <TouchableOpacity
            onPress={onClose}
            className="w-full py-4 rounded-2xl justify-center items-center shadow-sm"
            style={{ backgroundColor: "#F97316" }}
          >
            <Text className="text-white font-bold text-base">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

import { Text, TouchableOpacity, View } from "react-native";

export const COLORS = [
  { id: "beige", value: "#F5E6D3" },
  { id: "dark-grey", value: "#6A7282" },
  { id: "peach", value: "#FADBD8" },
  { id: "light-blue", value: "#D6EAF8" },
];

export const SIZES = ["S", "M", "L", "XL"];

interface ProductSpecsProps {
  selectedColor: string;
  setSelectedColor: (id: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

export default function ProductSpecs({
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
}: ProductSpecsProps) {
  return (
    <View>
      {/* Color Selector */}
      <View className="mt-6">
        <Text className="text-brand-gray text-sm font-semibold mb-3">
          Color
        </Text>
        <View className="flex-row gap-3">
          {COLORS.map((color) => {
            const isSelected = selectedColor === color.id;
            return (
              <TouchableOpacity
                key={color.id}
                onPress={() => setSelectedColor(color.id)}
                className="w-9 h-9 rounded-full justify-center items-center"
                style={{
                  borderWidth: isSelected ? 1.5 : 0,
                  borderColor: "#F97316",
                }}
              >
                <View
                  className="w-7 h-7 rounded-full border border-gray-200"
                  style={{ backgroundColor: color.value }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Size Selector & Stock */}
      <View className="mt-6">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-brand-gray text-sm font-semibold">
            Size
          </Text>
          <Text className="text-xs font-semibold" style={{ color: "#F97316" }}>
            Stock: 200
          </Text>
        </View>
        <View className="flex-row gap-3">
          {SIZES.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <TouchableOpacity
                key={size}
                onPress={() => setSelectedSize(size)}
                className="w-12 h-10 rounded-xl justify-center items-center border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: isSelected ? "#F97316" : "#E5E7EB",
                  borderWidth: isSelected ? 1.5 : 1,
                }}
              >
                <Text
                  className="font-bold text-sm"
                  style={{ color: isSelected ? "#F97316" : "#6A7282" }}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (delta: number) => void;
}

export default function CartItemRow({ item, onQuantityChange }: CartItemRowProps) {
  return (
    <View className="flex-row bg-white rounded-2xl p-3 border border-gray-100 shadow-sm relative w-full">
      {/* Left: Product Image */}
      <View className="w-20 h-20 rounded-xl bg-orange-50 justify-center items-center overflow-hidden mr-3">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Right: details info */}
      <View className="flex-1 justify-between py-0.5">
        <View>
          <Text className="text-brand-dark font-bold text-sm leading-4">
            {item.title}
          </Text>
          <Text className="text-brand-gray text-[10px] mt-0.5 font-medium leading-3">
            Color: {item.color}
          </Text>
          <Text className="text-brand-gray text-[10px] font-medium leading-3">
            Size: {item.size}
          </Text>
        </View>
        <Text className="font-bold text-xs" style={{ color: "#F97316" }}>
          ${item.price}
        </Text>
      </View>

      {/* Plus / Minus counter selector */}
      <View className="flex-row items-center gap-2.5 self-center">
        <TouchableOpacity
          onPress={() => onQuantityChange(-1)}
          className="w-6 h-6 rounded-full bg-gray-50 border border-gray-200 justify-center items-center"
        >
          <Ionicons name="remove" size={14} color="#6A7282" />
        </TouchableOpacity>
        <Text className="text-brand-dark font-bold text-xs">
          {item.quantity}
        </Text>
        <TouchableOpacity
          onPress={() => onQuantityChange(1)}
          className="w-6 h-6 rounded-full bg-gray-50 border border-gray-200 justify-center items-center"
        >
          <Ionicons name="add" size={14} color="#F97316" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

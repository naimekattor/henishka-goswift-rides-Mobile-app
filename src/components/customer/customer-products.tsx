import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export interface ProductItem {
  id: string;
  title: string;
  price: number;
  rating: number;
  image: string;
}

interface CustomerProductsProps {
  products: ProductItem[];
  onProductPress?: (product: ProductItem) => void;
  onAddProduct?: (id: string) => void;
}

export function CustomerProducts({
  products,
  onProductPress,
  onAddProduct,
}: CustomerProductsProps) {
  return (
    <View className="px-6 pt-3">
      <Text className="text-brand-dark text-lg font-bold mb-3.5">
        Featured Products
      </Text>

      {/* 3 Grid Cards */}
      <View className="flex-row justify-between w-full gap-2">
        {products.map((prod) => (
          <TouchableOpacity
            key={prod.id}
            onPress={() => onProductPress?.(prod)}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm justify-between flex-1 overflow-hidden"
            activeOpacity={0.9}
          >
            {/* Product image from internet */}
            <View className="w-full h-24 bg-[#F3F4F6]">
              <Image
                source={{ uri: prod.image }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>

            {/* Info */}
            <View className="gap-0.5 p-2">
              <View className="flex flex-row justify-between items-center gap-2">
                {/* Title */}
                <Text
                  className="text-brand-dark font-bold text-xs flex-1"
                  numberOfLines={1}
                >
                  {prod.title}
                </Text>
                {/* Rating */}
                <View className="flex-row items-center gap-0.5 shrink-0">
                  <Ionicons name="star" size={10} color="#FFD700" />
                  <Text className="text-brand-gray text-[10px] font-semibold">
                    {prod.rating}
                  </Text>
                </View>
              </View>

              {/* Price and Add button */}
              <View className="flex-row justify-between items-center mt-2">
                <Text
                  className="font-bold text-xs"
                  style={{ color: "#F97316" }}
                >
                  ${prod.price}
                </Text>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation(); // Prevent navigating when adding to cart
                    onAddProduct?.(prod.id);
                  }}
                  className="w-6 h-6 rounded-full justify-center items-center"
                  style={{ backgroundColor: "rgba(249, 115, 22, 0.08)" }}
                >
                  <Ionicons name="add" size={14} color="#F97316" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

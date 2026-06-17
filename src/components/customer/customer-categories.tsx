import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface CategoryItem {
  id: string;
  title: string;
  icon: any;
}

interface CustomerCategoriesProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export function CustomerCategories({
  categories,
  selectedCategory,
  onSelectCategory,
}: CustomerCategoriesProps) {
  return (
    <View className="px-6 py-3 mb-2">
      <View className="flex-row justify-between w-full gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const tintColor = isActive ? "#F97316" : "#AAAAAA";
          return (
            <TouchableOpacity
              key={cat.id}
              onPress={() => onSelectCategory(cat.id)}
              className="items-center flex-1 p-1 aspect-square gap-1 py-2"
              activeOpacity={0.8}
              style={{ 
                backgroundColor: "#FFFFFF",
                borderRadius: 10,
              }}
            >
              <Ionicons name={cat.icon} size={22} color={tintColor} />
              <Text 
                className="text-[11px] font-semibold text-center"
                style={{ color: tintColor }}
              >
                {cat.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

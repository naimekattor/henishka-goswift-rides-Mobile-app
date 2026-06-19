import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CustomerSearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onFilterPress?: () => void;
}

export function CustomerSearchBar({
  searchQuery,
  onSearchQueryChange,
  onFilterPress,
}: CustomerSearchBarProps) {
  return (
    <View className="flex-row gap-3 px-6 py-2">
      <View className="flex-1 bg-white border border-gray-200 rounded-2xl flex-row items-center px-4 shadow-sm">
        <Ionicons name="search-outline" size={20} color="#AAAAAA" />
        <TextInput
          value={searchQuery}
          onChangeText={onSearchQueryChange}
          placeholder="Search nearby services"
          placeholderTextColor="#AAAAAA"
          className="flex-1 py-3 pl-2 text-brand-dark text-sm"
        />
      </View>
      <TouchableOpacity
        onPress={onFilterPress}
        className="w-12 h-12 rounded-2xl bg-white border border-gray-200 justify-center items-center shadow-sm"
      >
        <Ionicons name="options-outline" size={20} color="#F97316" />
      </TouchableOpacity>
    </View>
  );
}

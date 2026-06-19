import { ScrollView, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const SERVICES = [
  { id: "products", title: "Products", icon: "storefront-outline" as const },
  { id: "restaurant", title: "Restaurant", icon: "restaurant-outline" as const },
  { id: "car-rent", title: "Car Rent", icon: "car-outline" as const },
  { id: "get-ride", title: "Get a ride", icon: "location-outline" as const },
];

interface CustomerServiceSelectorProps {
  selectedService: string;
  onSelectService: (id: string) => void;
}

export function CustomerServiceSelector({
  selectedService,
  onSelectService,
}: CustomerServiceSelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="py-3"
      contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
    >
      {SERVICES.map((service) => {
        const isActive = selectedService === service.id;
        const tintColor = isActive ? "#F97316" : "#AAAAAA";
        return (
          <TouchableOpacity
            key={service.id}
            onPress={() => onSelectService(service.id)}
            className="flex-row items-center bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm gap-2"
            style={{ 
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 1,
            }}
            activeOpacity={0.8}
          >
            <Ionicons name={service.icon} size={18} color={tintColor} />
            <Text 
              className="font-bold text-xs" 
              style={{ color: tintColor }}
            >
              {service.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface CustomerHeaderProps {
  avatarUrl?: string;
  name: string;
  cartCount?: number;
  notificationCount?: number;
  onCartPress?: () => void;
  onNotificationPress?: () => void;
}

export function CustomerHeader({
  avatarUrl = "https://media.istockphoto.com/id/1463675975/photo/portrait-of-young-woman-in-pink-shirt-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=AH-eu5hWWiz9fC0PlQ9pjHt50ohWvg4mX3nPXINofCA=",
  name,
  cartCount = 1,
  notificationCount = 1,
  onCartPress,
  onNotificationPress,
}: CustomerHeaderProps) {
  return (
    <View>
      {/* Top App Logo (Centered) */}
      <View className="items-center pt-3 pb-1 bg-brand-bg">
        <Image
          source={require("@/assets/logo.png")}
          className="w-44 h-14"
          resizeMode="contain"
        />
      </View>

      {/* User Info & Actions Bar */}
      <View className="flex-row items-center justify-between px-6 py-3">
        {/* Left Side: Avatar & Welcome Text */}
        <View className="flex-row items-center gap-3">
          {/* Circular Avatar Image */}
          <View className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 shadow-sm bg-white">
            <Image
              source={{ uri: avatarUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <View>
            <Text className="text-brand-gray text-[13px] font-medium leading-4">Welcome back,</Text>
            <Text className="text-brand-dark text-base font-bold leading-5">{name}</Text>
          </View>
        </View>

        {/* Right Side: Cart & Notification Icons */}
        <View className="flex-row gap-3 items-center">
          {/* Cart Icon */}
          <TouchableOpacity 
            onPress={onCartPress}
            className="w-10 h-10 rounded-full bg-white border border-gray-100 justify-center items-center relative shadow-sm"
          >
            <FontAwesome6 name="opencart" size={18} color="#6A7282" />
            <View 
              className="absolute -top-1.5 -right-1.5 rounded-full justify-center items-center" 
              style={{ backgroundColor: "#F97316" , width:20, height:20 }}
            >
              <Text className="text-[10px] font-bold text-white leading-none">{cartCount}</Text>
            </View>
          </TouchableOpacity>

          {/* Notification Bell Icon */}
          <TouchableOpacity 
            onPress={onNotificationPress}
            className="w-10 h-10 rounded-full bg-white border border-gray-100 justify-center items-center relative shadow-sm"
          >
            <Ionicons name="notifications-outline" size={20} color="#6A7282" />
            <View 
              className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full justify-center items-center" 
              style={{ backgroundColor: "#F97316" , width:20, height:20 }}
            >
              <Text className="text-[10px] font-bold text-white leading-none">{notificationCount}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

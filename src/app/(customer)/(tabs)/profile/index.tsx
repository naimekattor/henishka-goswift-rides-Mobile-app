import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MENU_ITEMS = [
  { id: "edit", label: "Edit Profile", icon: "person-outline" },
  { id: "payment", label: "Payment Methods", icon: "card-outline" },
  { id: "notifications", label: "Notifications", icon: "notifications-outline" },
  { id: "settings", label: "Settings", icon: "settings-outline" },
  { id: "help", label: "Help & Support", icon: "help-circle-outline" },
];

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    alert("Logged out successfully");
    router.replace("/(auth)/login");
  };

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
        <Text className="text-brand-dark text-xl font-bold">My Profile</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-[#F9F7F6]/50 flex-1 px-6 pt-6"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* User Card */}
        <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm items-center mb-6">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
            }}
            className="w-20 h-20 rounded-full border border-gray-100 bg-white mb-3"
          />
          <Text className="text-brand-dark text-lg font-bold">Esther Howard</Text>
          <Text className="text-gray-400 text-xs font-semibold mt-0.5">
            esther.howard@example.com
          </Text>
        </View>

        {/* Menu list */}
        <View className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm mb-6">
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              className={`flex-row items-center justify-between py-3.5 ${
                index < MENU_ITEMS.length - 1 ? "border-b border-gray-50" : ""
              }`}
              style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
            >
              <View className="flex-row items-center gap-3" style={{ flexDirection: "row", alignItems: "center" }}>
                <View className="w-8 h-8 rounded-full bg-orange-50 justify-center items-center">
                  <Ionicons name={item.icon as any} size={16} color="#F97316" />
                </View>
                <Text className="text-brand-dark text-sm font-semibold">
                  {item.label}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#A0AAB9" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="w-full py-4 bg-red-50 border border-red-100 rounded-2xl justify-center items-center flex-row gap-2"
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}
        >
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text className="text-red-500 font-bold text-sm">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

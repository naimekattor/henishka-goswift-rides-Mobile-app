import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Button } from "@/components/button";

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleConfirm = () => {
    console.log("Password reset confirmed");
    router.replace("/(auth)/login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      className="bg-brand-bg"
    >
      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="justify-between px-6 pb-10" style={{ flexGrow: 1 }}>
            <View>
              {/* Top Bar with Back Button */}
              <View className="flex-row items-center pt-2 h-14">
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="w-12 h-12 rounded-full border border-gray-200 items-center justify-center bg-white shadow-sm"
                >
                  <Ionicons name="chevron-back" size={20} color="#6A7282" />
                </TouchableOpacity>
              </View>

              {/* Headers */}
              <View className="pt-8 pb-10">
                <Text className="text-brand-dark text-3xl font-bold mb-3">
                  Reset Your Password
                </Text>
              </View>

              {/* Form */}
              <View className="gap-5">
                {/* Password field */}
                <View className="gap-2">
                  <Text className="text-sm font-semibold text-brand-dark">Password</Text>
                  <View className="w-full bg-white border border-gray-200 rounded-2xl flex-row items-center px-5">
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      placeholder="********"
                      placeholderTextColor="#A0AEC0"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      className="flex-1 py-4 text-brand-dark text-base"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      className="p-1"
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={22}
                        color="#6A7282"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Confirm Password field */}
                <View className="gap-2">
                  <Text className="text-sm font-semibold text-brand-dark">Confirm Password</Text>
                  <View className="w-full bg-white border border-gray-200 rounded-2xl flex-row items-center px-5">
                    <TextInput
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      placeholder="********"
                      placeholderTextColor="#A0AEC0"
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      className="flex-1 py-4 text-brand-dark text-base"
                    />
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="p-1"
                    >
                      <Ionicons
                        name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                        size={22}
                        color="#6A7282"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Confirm Button */}
            <View className="w-full mt-8">
              <Button title="Confirm" onPress={handleConfirm} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

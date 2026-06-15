import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Button } from "@/components/button";

export default function ForgotScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    console.log("Forgot Password requested for email:", email);
    router.push("/(auth)/otp");
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-between px-6 pb-10">
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
                  Confirm Your Email
                </Text>
                <Text className="text-brand-gray text-base leading-6">
                  We will send you a verification code
                </Text>
              </View>

              {/* Email input field */}
              <View className="w-full">
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter email address"
                  placeholderTextColor="#A0AEC0"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-brand-dark text-base"
                />
              </View>
            </View>

            {/* Continue Button */}
            <View className="w-full mt-8">
              <Button title="Continue" onPress={handleContinue} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

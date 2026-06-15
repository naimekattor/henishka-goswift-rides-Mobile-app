import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Button } from "@/components/button";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignIn = () => {
    console.log("Sign in with email:", email);
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
          className="px-6"
        >
          {/* Logo container */}
          <View className="items-center justify-center pt-12 pb-10">
            <Image
              source={require("@/assets/logo.png")}
              className="w-56 h-28"
              resizeMode="contain"
            />
          </View>

          {/* Form */}
          <View className="flex-1 gap-5">
            {/* Email field */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-brand-dark">Email</Text>
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

            {/* Forgot Password Link */}
            <TouchableOpacity
              onPress={() => router.push("/(auth)/forgot")}
              className="align-self-end self-end"
            >
              <Text className="text-brand-orange text-sm font-bold">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <View className="mt-4">
              <Button title="Sign In" onPress={handleSignIn} />
            </View>
          </View>

          {/* Bottom Footer */}
          <View className="items-center justify-end pb-8 pt-6">
            <View className="flex-row items-center gap-1">
              <Text className="text-brand-gray text-base">Don’t have an account?</Text>
              <TouchableOpacity onPress={() => console.log("Sign up clicked")}>
                <Text className="text-brand-orange text-base font-bold underline">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

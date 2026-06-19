import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Button } from "@/components/button";

export default function CustomerSignupScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const router = useRouter();

  const handleSignUp = () => {
    console.log("Customer signing up:", { name, phone, email });
    // Navigate to OTP with flow indicator
    router.push("/(auth)/otp?flow=customer-signup");
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

              {/* Header Texts */}
              <View className="items-center pt-4 pb-6">
                <Text className="text-brand-dark text-3xl font-bold text-center">
                  Create account
                </Text>
                <Text className="text-brand-gray text-base text-center mt-2">
                  Join us for the best experience
                </Text>
              </View>

              {/* Form Inputs */}
              <View className="gap-4">
                {/* Name */}
                <View className="gap-2">
                  <Text className="text-sm font-semibold text-brand-dark">Name</Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter full name"
                    placeholderTextColor="#A0AEC0"
                    autoCapitalize="words"
                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-brand-dark text-base"
                  />
                </View>

                {/* Phone */}
                <View className="gap-2">
                  <Text className="text-sm font-semibold text-brand-dark">Phone Number</Text>
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Enter phone number"
                    placeholderTextColor="#A0AEC0"
                    keyboardType="phone-pad"
                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-brand-dark text-base"
                  />
                </View>

                {/* Email */}
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

                {/* Password */}
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

                {/* Confirm Password */}
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

              {/* Submit Button */}
              <View className="mt-8">
                <Button title="Sign In" onPress={handleSignUp} />
              </View>

              {/* OR Divider */}
              <View className="flex-row items-center justify-center my-6 gap-3">
                <View className="flex-1 h-[1px] bg-gray-200" />
                <Text className="text-brand-gray text-xs font-bold uppercase tracking-wider">OR</Text>
                <View className="flex-1 h-[1px] bg-gray-200" />
              </View>

              {/* Google Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="w-full py-4 px-6 rounded-2xl flex-row items-center justify-center gap-3 bg-white border border-gray-200 shadow-sm"
              >
                <Ionicons name="logo-google" size={20} color="#EA4335" />
                <Text className="text-base font-bold text-[#2F3542]">
                  Connect with Google
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer Log In Link */}
            <View className="items-center justify-end pb-4 pt-8">
              <View className="flex-row items-center gap-1">
                <Text className="text-brand-gray text-base">Already have an account?</Text>
                <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
                  <Text className="text-brand-orange text-base font-bold underline">Log In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

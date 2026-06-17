import { Button } from "@/components/button";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OtpScreen() {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);
  const router = useRouter();
  const { flow } = useLocalSearchParams();

  const handleContinue = () => {
    console.log("OTP code submitted:", code);
    if (flow === "customer-signup") {
      router.replace("/(customer)" as any);
    } else {
      router.push("/(auth)/reset-password");
    }
  };

  const handleBoxPress = () => {
    inputRef.current?.focus();
  };

  // Helper to render the circular digit boxes
  const renderCodeBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 4; i++) {
      const char = code[i] || "";
      const isFocused = code.length === i;

      boxes.push(
        <View
          key={i}
          className={`w-14 h-14 rounded-full justify-center items-center shadow-sm ${
            char
              ? "bg-brand-orange"
              : isFocused
              ? "bg-white border-2 border-brand-orange"
              : "bg-white border border-gray-200"
          }`}
        >
          <Text
            className={`text-xl font-bold text-center ${
              char ? "text-white" : "text-brand-dark"
            }`}
          >
            {char ? "*" : ""}
          </Text>
        </View>
      );
    }
    return boxes;
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
                  Activation Code
                </Text>
                <Text className="text-brand-gray text-base leading-6">
                  A code has been sent to your Email containing a code to reset your password.
                </Text>
              </View>

              {/* Digit Slots Wrapper */}
              <Pressable
                onPress={handleBoxPress}
                className="flex-row justify-center gap-4 py-4"
              >
                {renderCodeBoxes()}
              </Pressable>

              {/* Hidden Input field to grab focus */}
              <TextInput
                ref={inputRef}
                value={code}
                onChangeText={(text) => {
                  if (text.length <= 4) {
                    setCode(text.replace(/[^0-9]/g, ""));
                  }
                }}
                keyboardType="number-pad"
                maxLength={4}
                style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
              />

              {/* Resend Action */}
              <View className="items-center mt-8">
                <Text className="text-brand-gray text-sm">
                  if you didn't receive a code!{" "}
                  <TouchableOpacity onPress={() => console.log("Resend code clicked")}>
                    <Text className="text-brand-orange text-sm font-bold underline align-middle">
                      Click Here..
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>

            {/* Continue Button */}
            <View className="w-full mt-8">
              <Button title="Continue" onPress={handleContinue} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

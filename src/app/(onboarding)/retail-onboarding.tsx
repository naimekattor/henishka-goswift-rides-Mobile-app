import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function RetailOnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);

  // Form State
  const [storeName, setStoreName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [storeType, setStoreType] = useState(""); // E.g., Clothing, Electronics, Grocery

  const [address, setAddress] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");

  // Upload States
  const [tradeLicense, setTradeLicense] = useState<{ name: string; size: string } | null>(null);
  const [taxCertificate, setTaxCertificate] = useState<{ name: string; size: string } | null>(null);
  const [uploadingLicense, setUploadingLicense] = useState(false);
  const [uploadingTax, setUploadingTax] = useState(false);

  // Modals for Selection
  const [showOpenTimeModal, setShowOpenTimeModal] = useState(false);
  const [showCloseTimeModal, setShowCloseTimeModal] = useState(false);

  const TIME_OPTIONS = [
    "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
  ];

  // Validation
  const isBasicInfoValid = storeName && phone && email && storeType;
  const isLocationValid = address && openingTime && closingTime;
  const isDocsValid = tradeLicense && taxCertificate;

  const handleNext = () => {
    if (step === 1 && isBasicInfoValid) setStep(2);
    else if (step === 2 && isLocationValid) setStep(3);
    else if (step === 3 && isDocsValid) setStep(4);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const handleUseCurrentLocation = () => {
    setAddress("102/B Fashion Plaza, Sadar Road, Narayanganj");
  };

  const simulateUpload = (type: "license" | "tax") => {
    if (type === "license") {
      setUploadingLicense(true);
      setTimeout(() => {
        setTradeLicense({ name: "retail_license_2026.pdf", size: "1.8 MB" });
        setUploadingLicense(false);
      }, 1200);
    } else {
      setUploadingTax(true);
      setTimeout(() => {
        setTaxCertificate({ name: "tax_registration_cert.pdf", size: "950 KB" });
        setUploadingTax(false);
      }, 1200);
    }
  };

  const removeFile = (type: "license" | "tax") => {
    if (type === "license") setTradeLicense(null);
    else setTaxCertificate(null);
  };

  const renderStepIcon = () => {
    switch (step) {
      case 1:
        return (
          <View className="w-16 h-16 rounded-full bg-brand-orange/10 items-center justify-center mb-4">
            <Ionicons name="basket-outline" size={32} color="#E4792F" />
          </View>
        );
      case 2:
        return (
          <View className="w-16 h-16 rounded-full bg-brand-orange/10 items-center justify-center mb-4">
            <Ionicons name="location-outline" size={32} color="#E4792F" />
          </View>
        );
      case 3:
        return (
          <View className="w-16 h-16 rounded-full bg-brand-orange/10 items-center justify-center mb-4">
            <Ionicons name="document-text-outline" size={32} color="#E4792F" />
          </View>
        );
      default:
        return null;
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View className="gap-5">
            {/* Step 1 Title */}
            <View className="items-center mb-2">
              <Text className="text-brand-dark text-xl font-bold">Store Information</Text>
              <Text className="text-brand-gray text-xs text-center mt-1">
                Let's set up the core details of your retail store
              </Text>
            </View>

            {/* Inputs */}
            <View className="gap-4">
              <View className="gap-1.5">
                <Text className="text-xs font-semibold text-brand-dark">Store / Brand Name</Text>
                <TextInput
                  value={storeName}
                  onChangeText={setStoreName}
                  placeholder="Enter your store name (e.g. Bankok Clothing Ltd.)"
                  placeholderTextColor="#A0AEC0"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-xs font-semibold text-brand-dark">Business Phone Number</Text>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Enter phone number"
                  placeholderTextColor="#A0AEC0"
                  keyboardType="phone-pad"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-xs font-semibold text-brand-dark">Email Address</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter email address"
                  placeholderTextColor="#A0AEC0"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-xs font-semibold text-brand-dark">Store Category</Text>
                <TextInput
                  value={storeType}
                  onChangeText={setStoreType}
                  placeholder="Enter store category (e.g. Clothing, Electronics)"
                  placeholderTextColor="#A0AEC0"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                />
              </View>
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              onPress={handleNext}
              disabled={!isBasicInfoValid}
              activeOpacity={0.8}
              className={`w-full py-4 rounded-2xl items-center justify-center mt-4 ${
                isBasicInfoValid ? "bg-brand-orange" : "bg-brand-gray/30"
              }`}
            >
              <Text className="text-white text-base font-bold">Continue</Text>
            </TouchableOpacity>
          </View>
        );

      case 2:
        return (
          <View className="gap-5">
            {/* Step 2 Title */}
            <View className="items-center mb-1">
              <Text className="text-brand-dark text-xl font-bold">Set Store Location</Text>
              <Text className="text-brand-gray text-xs text-center mt-1">
                Pin your retail physical store address for dispatchers
              </Text>
            </View>

            {/* Mock Map View */}
            <View className="w-full h-44 rounded-2xl border border-gray-200 overflow-hidden bg-[#E5F1F6] relative justify-center items-center">
              <View className="absolute w-[200%] h-3 bg-[#D3E8F0] rotate-12 top-10" />
              <View className="absolute w-[200%] h-4 bg-[#D3E8F0] -rotate-45 bottom-12" />
              <View className="absolute w-4 h-full bg-white/60 left-12" />
              <View className="absolute w-6 h-full bg-white/60 right-24" />
              <View className="absolute w-full h-4 bg-white/60 top-20" />
              <View className="absolute w-28 h-20 bg-[#C5E1A5] rounded-xl left-4 bottom-4 opacity-70" />
              <View className="absolute w-20 h-16 bg-[#FFE082] rounded-xl right-6 top-4 opacity-70" />

              {/* Bouncing Pin and Pulse */}
              <View className="items-center justify-center z-10">
                <View className="w-8 h-8 rounded-full bg-brand-orange/30 items-center justify-center absolute scale-150" />
                <Ionicons name="location" size={38} color="#E4792F" />
              </View>
            </View>

            {/* Address Input */}
            <View className="gap-1.5">
              <Text className="text-xs font-semibold text-brand-dark">Store Location Address</Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="Enter physical address"
                placeholderTextColor="#A0AEC0"
                className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
              />
            </View>

            {/* Use current location Link */}
            <TouchableOpacity
              onPress={handleUseCurrentLocation}
              className="flex-row items-center gap-1.5 -mt-2 self-start"
            >
              <Ionicons name="location-outline" size={16} color="#E4792F" />
              <Text className="text-brand-orange text-xs font-bold">Use current location</Text>
            </TouchableOpacity>

            {/* Time Settings Grid */}
            <View className="flex-row gap-4 mt-1">
              <View className="flex-1 gap-1.5">
                <Text className="text-xs font-semibold text-brand-dark">Opening Time</Text>
                <TouchableOpacity
                  onPress={() => setShowOpenTimeModal(true)}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 flex-row justify-between items-center"
                >
                  <Text className={`text-sm ${openingTime ? "text-brand-dark" : "text-brand-gray"}`}>
                    {openingTime || "Select Time"}
                  </Text>
                  <Ionicons name="time-outline" size={18} color="#A0AEC0" />
                </TouchableOpacity>
              </View>

              <View className="flex-1 gap-1.5">
                <Text className="text-xs font-semibold text-brand-dark">Closing Time</Text>
                <TouchableOpacity
                  onPress={() => setShowCloseTimeModal(true)}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 flex-row justify-between items-center"
                >
                  <Text className={`text-sm ${closingTime ? "text-brand-dark" : "text-brand-gray"}`}>
                    {closingTime || "Select Time"}
                  </Text>
                  <Ionicons name="time-outline" size={18} color="#A0AEC0" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Time Picker Modals */}
            {(showOpenTimeModal || showCloseTimeModal) && (
              <View className="absolute top-0 bottom-0 left-0 right-0 bg-brand-dark/40 z-50 items-center justify-center px-6">
                <View className="bg-white rounded-3xl w-full max-h-72 p-5 shadow-xl">
                  <Text className="text-brand-dark text-base font-bold mb-3 text-center">
                    Select {showOpenTimeModal ? "Opening" : "Closing"} Time
                  </Text>
                  <ScrollView className="max-h-48" showsVerticalScrollIndicator={false}>
                    {TIME_OPTIONS.map((time) => (
                      <TouchableOpacity
                        key={time}
                        onPress={() => {
                          if (showOpenTimeModal) {
                            setOpeningTime(time);
                            setShowOpenTimeModal(false);
                          } else {
                            setClosingTime(time);
                            setShowCloseTimeModal(false);
                          }
                        }}
                        className="py-3 border-b border-gray-100 items-center"
                      >
                        <Text className="text-brand-dark text-sm">{time}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <TouchableOpacity
                    onPress={() => {
                      setShowOpenTimeModal(false);
                      setShowCloseTimeModal(false);
                    }}
                    className="mt-3 py-2 bg-brand-gray/10 rounded-xl items-center"
                  >
                    <Text className="text-brand-dark text-sm font-semibold">Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Continue Button */}
            <TouchableOpacity
              onPress={handleNext}
              disabled={!isLocationValid}
              activeOpacity={0.8}
              className={`w-full py-4 rounded-2xl items-center justify-center mt-4 ${
                isLocationValid ? "bg-brand-orange" : "bg-brand-gray/30"
              }`}
            >
              <Text className="text-white text-base font-bold">Continue</Text>
            </TouchableOpacity>
          </View>
        );

      case 3:
        return (
          <View className="gap-5">
            {/* Step 3 Title */}
            <View className="items-center mb-1">
              <Text className="text-brand-dark text-xl font-bold">Verify Store Business</Text>
              <Text className="text-brand-gray text-xs text-center mt-1">
                Upload business certificates to activate full commercial sales
              </Text>
            </View>

            {/* Document Cards */}
            <View className="gap-4">
              {/* Card 1: Trade License */}
              <View className="bg-white border border-gray-100 rounded-2xl p-4 flex-row items-center justify-between shadow-sm">
                <View className="flex-1 mr-4">
                  <Text className="text-brand-dark text-sm font-bold">Trade Licences</Text>
                  <Text className="text-brand-gray text-xs mt-0.5">
                    {tradeLicense
                      ? `${tradeLicense.name} (${tradeLicense.size})`
                      : "Upload a copy of your retail trade license"}
                  </Text>
                </View>
                {uploadingLicense ? (
                  <ActivityIndicator size="small" color="#E4792F" className="p-2" />
                ) : tradeLicense ? (
                  <TouchableOpacity
                    onPress={() => removeFile("license")}
                    className="bg-red-50 p-2.5 rounded-full"
                  >
                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => simulateUpload("license")}
                    className="bg-brand-orange/10 p-2.5 rounded-full"
                  >
                    <Ionicons name="arrow-up" size={18} color="#E4792F" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Card 2: Tax Registration Certificate */}
              <View className="bg-white border border-gray-100 rounded-2xl p-4 flex-row items-center justify-between shadow-sm">
                <View className="flex-1 mr-4">
                  <Text className="text-brand-dark text-sm font-bold">Tax Certificate (TIN)</Text>
                  <Text className="text-brand-gray text-xs mt-0.5">
                    {taxCertificate
                      ? `${taxCertificate.name} (${taxCertificate.size})`
                      : "Upload tax registration documents"}
                  </Text>
                </View>
                {uploadingTax ? (
                  <ActivityIndicator size="small" color="#E4792F" className="p-2" />
                ) : taxCertificate ? (
                  <TouchableOpacity
                    onPress={() => removeFile("tax")}
                    className="bg-red-50 p-2.5 rounded-full"
                  >
                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => simulateUpload("tax")}
                    className="bg-brand-orange/10 p-2.5 rounded-full"
                  >
                    <Ionicons name="arrow-up" size={18} color="#E4792F" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Finish & Submit Button */}
            <TouchableOpacity
              onPress={handleNext}
              disabled={!isDocsValid}
              activeOpacity={0.8}
              className={`w-full py-4 rounded-2xl items-center justify-center mt-4 ${
                isDocsValid ? "bg-brand-orange" : "bg-brand-gray/30"
              }`}
            >
              <Text className="text-white text-base font-bold">Finish & Submit</Text>
            </TouchableOpacity>

            <View className="flex-row items-center justify-center gap-1.5 mt-2">
              <Ionicons name="lock-closed-outline" size={14} color="#6A7282" />
              <Text className="text-brand-gray text-xs">
                Your documents are secure and kept confidential
              </Text>
            </View>
          </View>
        );

      case 4:
        return (
          <View className="items-center justify-center py-10">
            {/* Success icon matching premium standards */}
            <View className="w-24 h-24 rounded-full border-4 border-brand-orange bg-white items-center justify-center mb-8 shadow-lg shadow-brand-orange/10">
              <Ionicons name="checkmark" size={54} color="#E4792F" />
            </View>

            <Text className="text-brand-dark text-2xl font-bold text-center mb-3">
              Application Submitted!
            </Text>
            <Text className="text-brand-gray text-sm text-center leading-6 px-4 mb-10">
              Thank you for registering your retail store. Our team will review your business credentials. This process typically takes up to 24 hours.
            </Text>

            {/* Navigation straight to Retailer Dashboard */}
            <TouchableOpacity
              onPress={() => router.replace("/(retailer)/dashboard" as any)}
              activeOpacity={0.8}
              className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center shadow-lg shadow-brand-orange/25"
            >
              <Text className="text-white text-base font-bold">Enter Dashboard (Demo Mode)</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header navigation */}
        {step < 4 && (
          <View className="flex-row items-center justify-between px-6 pt-2 h-14">
            <TouchableOpacity
              onPress={handleBack}
              className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center bg-white shadow-sm"
            >
              <Ionicons name="chevron-back" size={20} color="#6A7282" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Retailer Onboarding</Text>
            <View className="w-10" />
          </View>
        )}

        {/* Scrollable Container */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="px-6 flex-1"
        >
          <View className="flex-1 justify-center py-6">
            {renderStepIcon()}
            {renderStepContent()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

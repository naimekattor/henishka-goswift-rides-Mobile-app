import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentSuccessScreen() {
  const router = useRouter();

  // Review states
  const [showReviewModal, setShowReviewModal] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isDoneReview, setIsDoneReview] = useState(false);

  const handleSendReview = () => {
    if (rating === 0) {
      alert("Please choose a star rating.");
      return;
    }
    // Transition to the "Done!" state
    setIsDoneReview(true);
  };

  const handleCloseModal = () => {
    setShowReviewModal(false);
    setIsDoneReview(false);
    setRating(0);
    setComment("");
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      {/* Seamless view with illustrations */}
      <View className="flex-1 items-center justify-center px-6 pb-20">
        {/* Payment success illustration */}
        <Image
          source={require("../../../assets/illustrations/payment_successful.png")}
          className="w-72 h-72 mb-6"
          resizeMode="contain"
        />

        {/* Title */}
        <Text className="text-brand-dark text-2xl font-black mb-3">
          Payment Successful
        </Text>

        {/* Subtitle */}
        <Text className="text-gray-400 text-center text-sm px-6 leading-5">
          Please Check Your Notification, We Just Sent You A Message.
        </Text>
      </View>

      {/* Bottom Continue Browsing button */}
      <View className="px-6 py-4 absolute bottom-6 left-6 right-6">
        <TouchableOpacity
          onPress={() => router.replace("/(customer)" as any)}
          className="w-full py-4 rounded-2xl justify-center items-center shadow-lg shadow-black/10"
          style={{ backgroundColor: "#F97316" }}
        >
          <Text className="text-white font-bold text-base">
            Continue Browsing
          </Text>
        </TouchableOpacity>
      </View>

      {/* Review Modal Overlay */}
      <Modal
        visible={showReviewModal}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View className="flex-1 bg-black/40 justify-center items-center px-6">
            <TouchableWithoutFeedback>
              <View className="bg-white rounded-[32px] w-full max-w-[320px] relative p-6 shadow-2xl">
                {!isDoneReview ? (
                  // Review card details state
                  <View>
                    {/* Header line with close click */}
                    <View className="flex-row justify-between items-center mb-4 pb-2 border-b border-gray-100" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <Text className="text-brand-dark font-extrabold text-base">
                        Review
                      </Text>
                      <TouchableOpacity onPress={handleCloseModal} className="p-1">
                        <Ionicons name="close" size={20} color="#6A7282" />
                      </TouchableOpacity>
                    </View>

                    {/* Driver / Shop Info */}
                    <View className="flex-row items-center gap-3 mb-6" style={{ flexDirection: "row", alignItems: "center" }}>
                      <Image
                        source={{
                          uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
                        }}
                        className="w-12 h-12 rounded-full border border-gray-100 bg-white"
                      />
                      <View className="flex-1">
                        <Text className="text-brand-dark font-bold text-sm">
                          Rahim Rehman
                        </Text>
                        <Text className="text-gray-400 text-[10px]">
                          Honda Civic
                        </Text>
                        {/* License badge */}
                        <View className="bg-gray-100 rounded px-2 py-0.5 mt-1 self-start">
                          <Text className="text-brand-dark text-[9px] font-bold">
                            G - 1023
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Star selection buttons */}
                    <View className="flex-row justify-center gap-1.5 mb-5" style={{ flexDirection: "row", justifyContent: "center" }}>
                      {[1, 2, 3, 4, 5].map((starIndex) => {
                        const isStarred = starIndex <= rating;
                        return (
                          <TouchableOpacity
                            key={starIndex}
                            onPress={() => setRating(starIndex)}
                            className="p-1"
                          >
                            <Ionicons
                              name={isStarred ? "star" : "star-outline"}
                              size={32}
                              color={isStarred ? "#FFB800" : "#D1D5DB"}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </View>

                    {/* Feedback textarea */}
                    <View className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 mb-5">
                      <TextInput
                        value={comment}
                        onChangeText={setComment}
                        placeholder="Write here..."
                        placeholderTextColor="#A0AAB9"
                        className="text-brand-dark text-xs leading-4 min-h-[60px] text-left"
                        multiline
                        numberOfLines={3}
                      />
                    </View>

                    {/* Submit Review */}
                    <TouchableOpacity
                      onPress={handleSendReview}
                      className="w-full py-3.5 rounded-2xl justify-center items-center shadow-sm"
                      style={{ backgroundColor: "#F97316" }}
                    >
                      <Text className="text-white font-bold text-sm">Send</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  // Done state overlay (checkmark overlapping top border)
                  <View className="pt-6 relative items-center">
                    {/* Overlapping top check badge */}
                    <View
                      className="absolute -top-[56px] w-16 h-16 rounded-full items-center justify-center border-4 border-white"
                      style={{
                        backgroundColor: "#F97316",
                        shadowColor: "#F97316",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.2,
                        shadowRadius: 5,
                        elevation: 4,
                      }}
                    >
                      <Ionicons name="checkmark" size={32} color="#FFFFFF" />
                    </View>

                    {/* Done texts */}
                    <Text className="text-brand-dark font-extrabold text-lg mb-1 mt-2 text-center">
                      Done!
                    </Text>
                    <Text className="text-gray-400 text-xs text-center mb-5">
                      Thank you for your review
                    </Text>

                    {/* Gold rating display */}
                    <View className="flex-row justify-center gap-1.5 mb-6" style={{ flexDirection: "row", justifyContent: "center" }}>
                      {[1, 2, 3, 4, 5].map((starIndex) => {
                        const isStarred = starIndex <= rating;
                        return (
                          <Ionicons
                            key={starIndex}
                            name={isStarred ? "star" : "star-outline"}
                            size={24}
                            color={isStarred ? "#FFB800" : "#D1D5DB"}
                          />
                        );
                      })}
                    </View>

                    {/* Close button */}
                    <TouchableOpacity
                      onPress={handleCloseModal}
                      className="w-full py-3.5 rounded-2xl justify-center items-center shadow-sm"
                      style={{ backgroundColor: "#F97316" }}
                    >
                      <Text className="text-white font-bold text-sm">Close</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

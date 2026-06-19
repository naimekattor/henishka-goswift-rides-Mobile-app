import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const RATING_STARS = [
  { starCount: 5, reviewCount: 12, percentage: 60 },
  { starCount: 4, reviewCount: 6, percentage: 30 },
  { starCount: 3, reviewCount: 4, percentage: 20 },
  { starCount: 2, reviewCount: 2, percentage: 10 },
  { starCount: 1, reviewCount: 1, percentage: 5 },
];

const REVIEWS = [
  {
    id: "r1",
    name: "Maria Rodriguez",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    rating: 3,
    date: "2 days ago",
    comment: "Absolutely amazing experience! The Gallo Pinto was authentic and delicious. The atmosphere is cozy and the staff is incredibly friendly. The presentation was beautiful and every bite.",
  },
  {
    id: "r2",
    name: "Esther Howard",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
    rating: 4,
    date: "2 days ago",
    comment: "Absolutely amazing experience! The Gallo Pinto was authentic and delicious. The atmosphere is cozy and the staff is incredibly friendly. The presentation was beautiful.",
  },
  {
    id: "r3",
    name: "Robert Fox",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    rating: 3,
    date: "2 days ago",
    comment: "Absolutely amazing experience! The Gallo Pinto was authentic and delicious. The atmosphere is cozy and the staff is incredibly friendly. The presentation was beautiful.",
  },
  {
    id: "r4",
    name: "Brooklyn Simmons",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    rating: 4,
    date: "2 days ago",
    comment: "Absolutely amazing experience! The Gallo Pinto was authentic and delicious. The atmosphere is cozy and the staff is incredibly friendly. The presentation was beautiful.",
  },
  {
    id: "r5",
    name: "Arlene McCoy",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    rating: 5,
    date: "2 days ago",
    comment: "Absolutely amazing experience! The Gallo Pinto was authentic and delicious. The atmosphere is cozy and the staff is incredibly friendly. The presentation was beautiful.",
  },
];

export default function RatingReviewsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header bar */}
      <View className="flex-row items-center justify-center px-6 pt-4 pb-2 relative h-16 bg-white">
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
        <Text className="text-brand-dark text-xl font-bold">Rating & Review</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Rating score summary section (no card wrap, matches design 100%) */}
        <View className="px-6 py-8 bg-white" style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Left score info */}
          <View className="pl-4" style={{ alignItems: "center", justifyContent: "center" }}>
            <Text className="text-brand-dark text-4xl font-extrabold">4.3</Text>
            <Text className="text-gray-400 text-xs font-semibold mt-1">24 Ratings</Text>
          </View>

          {/* Right star bars breakdown */}
          <View style={{ flex: 1, gap: 8, paddingRight: 8, paddingLeft: 16 }}>
            {RATING_STARS.map((star) => (
              <View key={star.starCount} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                {/* Stars index (right-aligned to end at same line) */}
                <View style={{ flexDirection: "row", gap: 2, justifyContent: "flex-end", width: 64 }}>
                  {Array.from({ length: star.starCount }).map((_, i) => (
                    <Ionicons key={i} name="star" size={11} color="#FFB800" />
                  ))}
                </View>

                {/* Progress bar container (transparent track) */}
                <View style={{ flex: 1, height: 6, justifyContent: "center" }}>
                  <View 
                    style={{ 
                      height: 6,
                      borderRadius: 3,
                      width: `${star.percentage}%`,
                      backgroundColor: "#F97316"
                    }} 
                  />
                </View>

                {/* Star reviews count number */}
                <Text className="text-brand-gray text-[11px] font-bold text-right" style={{ width: 16 }}>
                  {star.reviewCount}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Feedback List Section */}
        <View className="px-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-brand-dark text-base font-bold">Feedback</Text>
            <TouchableOpacity>
              <Text className="text-xs font-bold" style={{ color: "#F97316" }}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Render feedback reviews list */}
          <View className="gap-3">
            {REVIEWS.map((rev) => (
              <View key={rev.id} className="bg-[#F9F7F6]/50 p-5 rounded-3xl border border-gray-100">
                <View className="flex-row justify-between items-center mb-3">
                  <View className="flex-row items-center gap-3.5">
                    {/* User profile picture */}
                    <Image
                      source={{ uri: rev.avatar }}
                      className="w-10 h-10 rounded-full border border-gray-100 bg-white"
                    />
                    <View>
                      <Text className="text-brand-dark font-bold text-sm">{rev.name}</Text>
                      {/* Star ratings indicator */}
                      <View className="flex-row gap-0.5 mt-0.5">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Ionicons key={i} name="star" size={10} color="#FFB800" />
                        ))}
                        {Array.from({ length: 5 - rev.rating }).map((_, i) => (
                          <Ionicons key={i} name="star-outline" size={10} color="#E5E7EB" />
                        ))}
                      </View>
                    </View>
                  </View>
                  <Text className="text-gray-400 text-xs">{rev.date}</Text>
                </View>
                <Text className="text-brand-gray text-xs leading-5">
                  {rev.comment} <Text className="font-semibold" style={{ color: "#F97316" }}>Read more...</Text>
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

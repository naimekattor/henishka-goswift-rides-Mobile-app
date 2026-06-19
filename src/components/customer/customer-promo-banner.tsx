import { ImageBackground, View } from "react-native";

interface CustomerPromoBannerProps {
  bannerUri?: string;
}

export function CustomerPromoBanner({ bannerUri }: CustomerPromoBannerProps) {
  return (
    <View className="w-full h-24 my-4 relative overflow-hidden bg-gray-950">
      <ImageBackground
        source={bannerUri ? { uri: bannerUri } : undefined}
        className="w-full h-full justify-end"
        resizeMode="cover"
      />
    </View>
  );
}

import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomerTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const tabs = [
    {
      id: "home",
      label: "Home",
      activeIcon: "home",
      inactiveIcon: "home-outline",
    },
    {
      id: "track",
      label: "Track",
      activeIcon: "location",
      inactiveIcon: "location-outline",
    },
    {
      id: "history",
      label: "History",
      activeIcon: "time",
      inactiveIcon: "time-outline",
    },
    {
      id: "profile",
      label: "Profile",
      activeIcon: "person",
      inactiveIcon: "person-outline",
    },
  ];

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const tabInfo = tabs.find((t) => t.id === route.name);

        if (!tabInfo) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: isFocused ? "#F97316" : "transparent",
                  borderRadius: 22,
                  overflow: "hidden",
                },
              ]}
            >
              <Ionicons
                name={
                  isFocused
                    ? (tabInfo.activeIcon as any)
                    : (tabInfo.inactiveIcon as any)
                }
                size={22}
                color={isFocused ? "#FFFFFF" : "#8E8E93"}
              />
            </View>
            <Text
              style={[
                styles.tabLabel,
                {
                  color: isFocused ? "#F97316" : "#8E8E93",
                  fontWeight: isFocused ? "bold" : "500",
                },
              ]}
            >
              {tabInfo.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
    width: 320,
    height: 82,
    backgroundColor: "#FFFFFF",
    borderRadius: 41,
    borderWidth: 1,
    borderColor: "#F3F4F6", // border-gray-100
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 10.5,
  },
});

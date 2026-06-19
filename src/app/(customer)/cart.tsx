import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Image,
  PanResponder,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItemRow from "../../components/customer/cart-item-row";
import CartSummary from "../../components/customer/cart-summary";

// Mock cart items initially
const INITIAL_ITEMS = [
  {
    id: "c1",
    title: "Smart Watch",
    price: 155,
    quantity: 1,
    size: "Medium",
    color: "Black 'M' Size",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=150",
  },
  {
    id: "c2",
    title: "Smart Phone",
    price: 155,
    quantity: 1,
    size: "Medium",
    color: "Black 'M' Size",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150",
  },
  {
    id: "c3",
    title: "Headphone",
    price: 155,
    quantity: 1,
    size: "Medium",
    color: "Black 'M' Size",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150",
  },
];

// Custom pure-JS Swipeable row container
interface SwipeableItemProps {
  children: React.ReactNode;
  onDelete: () => void;
}

function SwipeableItem({ children, onDelete }: SwipeableItemProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const isSwiped = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only set responder on horizontal drag
        return Math.abs(gestureState.dx) > 10 && Math.abs(gestureState.dy) < 8;
      },
      onPanResponderMove: (_, gestureState) => {
        let newX = gestureState.dx;
        if (isSwiped.current) {
          newX = -80 + gestureState.dx;
        }
        // Restrict drag bounds: only leftwards (negative values) up to -110px
        if (newX > 0) newX = 0;
        if (newX < -110) newX = -110;
        translateX.setValue(newX);
      },
      onPanResponderRelease: (_, gestureState) => {
        const threshold = -40;
        const finalX = gestureState.dx < threshold ? -80 : 0;

        Animated.spring(translateX, {
          toValue: finalX,
          useNativeDriver: true,
          tension: 40,
          friction: 8,
        }).start(() => {
          isSwiped.current = finalX === -80;
        });
      },
    }),
  ).current;

  const reset = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      isSwiped.current = false;
    });
  };

  return (
    <View className="relative w-full overflow-hidden mb-3">
      {/* Red Delete background button revealed on swipe */}
      <View
        style={{
          position: "absolute",
          right: 0,
          top: 10,
          bottom: 0,
          width: 80,
        }}
        className="bg-red-100 rounded-2xl justify-center items-center h-20"
      >
        <TouchableOpacity
          onPress={() => {
            reset();
            onDelete();
          }}
          className="w-full h-full justify-center items-center"
        >
          <Ionicons name="trash" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* Main card view floating above */}
      <Animated.View
        style={{
          transform: [{ translateX }],
        }}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  );
}

export default function CartScreen() {
  const router = useRouter();
  const [items, setItems] = useState(INITIAL_ITEMS);

  // Math totals calculation
  const subTotal = items.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );
  const tax = subTotal * 0.08;
  const grandTotal = subTotal > 0 ? subTotal + tax : 0;

  const handleQuantityChange = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      }),
    );
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddMockItem = () => {
    const randomId = "c-rand-" + Math.floor(Math.random() * 1000);
    const mockItem = {
      id: randomId,
      title: "Smart Phone Pro",
      price: 299,
      quantity: 1,
      size: "Medium",
      color: "Black 'L' Size",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150",
    };
    setItems((prev) => [...prev, mockItem]);
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg" edges={["top"]}>
      {/* Header bar */}
      <View className="flex-row items-center justify-between px-6 pt-2 h-14 ">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center bg-white"
        >
          <Ionicons name="chevron-back" size={20} color="#6A7282" />
        </TouchableOpacity>

        <Text className="text-brand-dark text-lg font-bold">My Cart</Text>

        {/* Mock Item Creator top right */}
        <TouchableOpacity
          onPress={handleAddMockItem}
          className="w-10 h-10 rounded-full justify-center items-center"
        >
          <Ionicons name="add-circle" size={30} color="#F97316" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6 pt-4"
      >
        {/* Cart list wrapper */}
        {items.length === 0 ? (
          <View className="items-center justify-center pt-14 pb-8">
            <Image
              source={require("@/assets/illustrations/empty_cart.png")}
              className="w-64 h-64"
              resizeMode="contain"
            />
            <Text className="text-brand-dark text-xl font-bold mt-6 text-center">
              Your Cart Is Empty!
            </Text>
            <Text className="text-brand-gray text-sm text-center px-4 mt-2 leading-5">
              Start exploring delicious meals and add them here.
            </Text>
          </View>
        ) : (
          items.map((item) => (
            <SwipeableItem key={item.id} onDelete={() => handleDelete(item.id)}>
              <CartItemRow
                item={item}
                onQuantityChange={(delta) => handleQuantityChange(item.id, delta)}
              />
            </SwipeableItem>
          ))
        )}

        {/* Price summary panel card component */}
        {items.length > 0 && (
          <CartSummary
            itemsCount={items.length}
            subTotal={subTotal}
            tax={tax}
            grandTotal={grandTotal}
          />
        )}
      </ScrollView>

      {/* Checkout Proceed or Let's Explore Button */}
      {items.length === 0 ? (
        <View className="px-6 py-4 bg-white border-t border-gray-100">
          <TouchableOpacity
            onPress={() => router.push("/(customer)" as any)}
            className="w-full py-4 rounded-2xl justify-center items-center shadow-sm"
            style={{ backgroundColor: "#F97316" }}
          >
            <Text className="text-white font-bold text-base">
              Let's Explore
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="px-6 py-4 bg-white border-t border-gray-100">
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(customer)/checkout",
                params: {
                  totalItems: items.reduce((acc, curr) => acc + curr.quantity, 0),
                  totalAmount: grandTotal.toFixed(2),
                },
              })
            }
            className="w-full py-4 rounded-2xl justify-center items-center shadow-sm"
            style={{ backgroundColor: "#F97316" }}
          >
            <Text className="text-white font-bold text-base">Proceed</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

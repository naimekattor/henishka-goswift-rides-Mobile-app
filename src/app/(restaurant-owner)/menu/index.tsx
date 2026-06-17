import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TextInput, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: "Burgers" | "Sides" | "Desserts" | "Beverages";
  inStock: boolean;
  image?: string;
  tags?: string[];
}

const INITIAL_MENU: MenuItem[] = [
  {
    id: "M1",
    name: "Classic Cheeseburger",
    description: "Premium beef patty, cheddar cheese, lettuce, tomato, house sauce.",
    price: "$9.99",
    category: "Burgers",
    inStock: true,
    tags: ["Bestseller", "Spicy"]
  },
  {
    id: "M2",
    name: "Double Bacon BBQ Burger",
    description: "Two patties, crispy bacon, cheddar, onion rings, hickory BBQ sauce.",
    price: "$13.49",
    category: "Burgers",
    inStock: true,
    tags: ["Chef Special"]
  },
  {
    id: "M3",
    name: "Golden French Fries",
    description: "Crispy skin-on sea salt potato fries.",
    price: "$3.99",
    category: "Sides",
    inStock: true
  },
  {
    id: "M4",
    name: "Buffalo Onion Rings",
    description: "Spicy battered thick-cut sweet white onions.",
    price: "$5.49",
    category: "Sides",
    inStock: false
  },
  {
    id: "M5",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten chocolate center.",
    price: "$6.99",
    category: "Desserts",
    inStock: true,
    tags: ["Sweet"]
  },
  {
    id: "M6",
    name: "Craft Lemonade",
    description: "Freshly squeezed lemons, pure cane sugar, mint garnish.",
    price: "$2.99",
    category: "Beverages",
    inStock: true
  }
];

export default function RestaurantMenu() {
  const [menu, setMenu] = useState<MenuItem[]>(INITIAL_MENU);
  const [activeCategory, setActiveCategory] = useState<"Burgers" | "Sides" | "Desserts" | "Beverages">("Burgers");

  // Form states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState<"Burgers" | "Sides" | "Desserts" | "Beverages">("Burgers");

  const filteredMenu = menu.filter((item) => item.category === activeCategory);

  const toggleStock = (id: string) => {
    setMenu((prev) =>
      prev.map((item) => (item.id === id ? { ...item, inStock: !item.inStock } : item))
    );
  };

  const handleAddItem = () => {
    if (!newName || !newPrice) return;
    const newItem: MenuItem = {
      id: Math.random().toString(),
      name: newName,
      description: newDesc,
      price: newPrice.startsWith("$") ? newPrice : `$${newPrice}`,
      category: newCategory,
      inStock: true
    };
    setMenu((prev) => [...prev, newItem]);
    resetForm();
  };

  const handleEditItem = () => {
    if (!editingItem || !newName || !newPrice) return;
    setMenu((prev) =>
      prev.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              name: newName,
              description: newDesc,
              price: newPrice.startsWith("$") ? newPrice : `$${newPrice}`,
              category: newCategory
            }
          : item
      )
    );
    resetForm();
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setNewName(item.name);
    setNewDesc(item.description);
    setNewPrice(item.price);
    setNewCategory(item.category);
    setShowAddModal(true);
  };

  const resetForm = () => {
    setNewName("");
    setNewDesc("");
    setNewPrice("");
    setNewCategory("Burgers");
    setEditingItem(null);
    setShowAddModal(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* Top Header */}
      <View className="bg-white border-b border-gray-100 px-6 py-4 flex-row justify-between items-center shadow-sm">
        <Text className="text-brand-dark text-lg font-bold">Menu Management</Text>
        <TouchableOpacity
          onPress={() => setShowAddModal(true)}
          className="bg-brand-orange w-10 h-10 rounded-full items-center justify-center shadow-md shadow-brand-orange/20"
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <View className="bg-white py-3 border-b border-gray-100">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
          {(["Burgers", "Sides", "Desserts", "Beverages"] as const).map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setActiveCategory(cat)}
                className={`mr-3 px-5 py-2.5 rounded-full border ${
                  isSelected
                    ? "bg-brand-orange border-transparent"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <Text className={`text-xs font-bold ${isSelected ? "text-white" : "text-brand-gray"}`}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Menu List */}
      <ScrollView showsVerticalScrollIndicator={false} className="px-6 py-4 flex-1">
        <View className="gap-4 pb-20">
          {filteredMenu.map((item) => (
            <View
              key={item.id}
              className={`bg-white border border-gray-100 rounded-2xl p-4 flex-row shadow-sm ${
                !item.inStock ? "opacity-60" : ""
              }`}
            >
              {/* Product Info */}
              <View className="flex-1 justify-between mr-4">
                <View>
                  <View className="flex-row items-center flex-wrap gap-1 mb-1">
                    <Text className="text-brand-dark text-base font-bold">{item.name}</Text>
                    {item.tags?.map((tag) => (
                      <Text
                        key={tag}
                        className="text-[9px] font-bold text-brand-orange bg-brand-orange/10 px-1.5 py-0.5 rounded-md"
                      >
                        {tag}
                      </Text>
                    ))}
                  </View>
                  <Text className="text-brand-gray text-xs leading-4" numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>

                <View className="flex-row justify-between items-center mt-3 pt-2 border-t border-gray-50">
                  <Text className="text-brand-dark text-base font-extrabold">{item.price}</Text>

                  {/* Stock Toggle and Edit Button */}
                  <View className="flex-row items-center gap-3">
                    <TouchableOpacity
                      onPress={() => openEditModal(item)}
                      className="bg-gray-50 p-2 rounded-xl border border-gray-100"
                    >
                      <Ionicons name="pencil" size={14} color="#6A7282" />
                    </TouchableOpacity>

                    <View className="flex-row items-center gap-1.5">
                      <Text className="text-[10px] text-brand-gray font-bold">
                        {item.inStock ? "In Stock" : "Out"}
                      </Text>
                      <Switch
                        value={item.inStock}
                        onValueChange={() => toggleStock(item.id)}
                        trackColor={{ false: "#E2E8F0", true: "#FED7AA" }}
                        thumbColor={item.inStock ? "#E4792F" : "#A0AEC0"}
                        style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <Modal visible={showAddModal} transparent animationType="slide" onRequestClose={resetForm}>
          <View className="flex-1 bg-brand-dark/40 justify-end">
            <View className="bg-white rounded-t-[32px] p-6 max-h-[85%] shadow-xl">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-brand-dark text-lg font-bold">
                  {editingItem ? "Edit Menu Item" : "Add Menu Item"}
                </Text>
                <TouchableOpacity
                  onPress={resetForm}
                  className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                >
                  <Ionicons name="close" size={20} color="#6A7282" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} className="gap-4 mb-6">
                <View className="gap-1.5">
                  <Text className="text-xs font-semibold text-brand-dark">Item Name</Text>
                  <TextInput
                    value={newName}
                    onChangeText={setNewName}
                    placeholder="Enter item name"
                    placeholderTextColor="#A0AEC0"
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                  />
                </View>

                <View className="gap-1.5">
                  <Text className="text-xs font-semibold text-brand-dark">Price</Text>
                  <TextInput
                    value={newPrice}
                    onChangeText={setNewPrice}
                    placeholder="e.g. 9.99"
                    placeholderTextColor="#A0AEC0"
                    keyboardType="decimal-pad"
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                  />
                </View>

                <View className="gap-1.5">
                  <Text className="text-xs font-semibold text-brand-dark">Category</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {(["Burgers", "Sides", "Desserts", "Beverages"] as const).map((cat) => {
                      const isSelected = newCategory === cat;
                      return (
                        <TouchableOpacity
                          key={cat}
                          onPress={() => setNewCategory(cat)}
                          className={`px-4 py-2 rounded-xl border ${
                            isSelected
                              ? "bg-brand-orange/10 border-brand-orange"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          <Text className={`text-xs font-semibold ${isSelected ? "text-brand-orange" : "text-brand-gray"}`}>
                            {cat}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                <View className="gap-1.5">
                  <Text className="text-xs font-semibold text-brand-dark">Description</Text>
                  <TextInput
                    value={newDesc}
                    onChangeText={setNewDesc}
                    placeholder="Describe this dish..."
                    placeholderTextColor="#A0AEC0"
                    multiline
                    numberOfLines={3}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-brand-dark text-sm min-h-[80px]"
                  />
                </View>

                <TouchableOpacity
                  onPress={editingItem ? handleEditItem : handleAddItem}
                  className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mt-4 shadow-lg shadow-brand-orange/20"
                >
                  <Text className="text-white text-base font-bold">
                    {editingItem ? "Save Changes" : "Add Item"}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

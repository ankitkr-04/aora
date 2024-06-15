import { Image, Text, View } from "react-native";

export default function Index() {
  return (
    <View
  className="flex-1 items-center justify-center bg-gray-100"
    >
      <Text className="text-2xl font-pblack">Edit app/index.tsx to edit this screen.</Text>
      <Image
        source={require("../assets/icons/bookmark.png")}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}

import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";

export default function Index() {
  return (
    <View
  className="flex-1 items-center justify-center bg-white"
    >
      <Text className="text-2xl font-pblack">Aora!</Text>
      <StatusBar style="auto" />
      <Link href='/home'>Home</Link>
    </View>
  ); 
}

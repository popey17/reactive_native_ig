import { Button } from "@expo/ui/swift-ui";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://placehold.jp/500x500.png" }}
        style={styles.img}
        contentFit="cover"
      />
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
      <TextInput style={styles.input} placeholder="Enter your name" />
      <Link href="/about">About</Link>
      <Button onPress={() => router.push("/about")}>
        <Text>About</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  img: {
    width: "100%",
    height: "auto",
    aspectRatio: 1,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

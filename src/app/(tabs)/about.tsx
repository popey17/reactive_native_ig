import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export default function About() {
	return (
		<View style={styles.container}>
			<Text>About Page</Text>
			<Image
				source={{ uri: 'https://placehold.jp/500x500.png' }}
				style={styles.img}
				contentFit="cover"
			/>
		</View>
	);
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    img: {
        width: "100%",
        height: "auto",
        aspectRatio: 1
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10
    }
});

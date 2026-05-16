import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onborading() {

  const [name, setName] = useState("")
  const [useName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [profileImage, setProfileImage] = useState< string | null >(null)

  const handleComplete = () => {

  }

  const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }

  }

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

  if (!permission.granted) {
    Alert.alert("Permission denied", "Camera access is required");
    return;
  }

  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    quality: 0.8,
  });

  if (!result.canceled) {
    console.log(result.assets[0].uri);
  }
  }

  const showImgPicker = () => {
    Alert.alert("Select Profile Image", "Choose an option",[
      {text: "Camera", onPress: takePhoto},
      {text: "Photo Library", onPress: pickImage},
      {text: "Cancel", style: "cancel"}
    ]);
  }

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text>Add your information to complete the signUp</Text>
        </View>
        <View style={styles.form}>
          <TouchableOpacity style={styles.imgContainer} onPress={showImgPicker}>
            {
              profileImage ? ( 
                <Image source={{ uri:profileImage }} style={styles.profileImg} /> 
              ) : (
                <View style={styles.placeholderImg}>
                  <Text style={styles.placeholderText}>+</Text>
                </View>
              )
            }
            <View style={styles.editTag}>
              <Text style={styles.editText}>Edit</Text>
            </View>
          </TouchableOpacity>
          <TextInput
            placeholder="Name"
            secureTextEntry
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Username"
            secureTextEntry
            autoCapitalize="words"
            value={useName}
            onChangeText={setUserName}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleComplete}>
            {
            isLoading ? (<ActivityIndicator size={24} color="#fff" />) : (<Text style={styles.buttonText}>Complete Setup</Text>)
            }
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "100%",
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  form: {
    alignItems: "center"
  },
  imgContainer: {
    marginBottom: 32,
    position: "relative",
    display: "flex"
  },
  placeholderImg: {
    width: 100,
    height: 100,
    backgroundColor: "#b4f0f4",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#46c9db",
    borderStyle: "dashed"
  },
    profileImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 40,
    color: "#46c9db"
  },
  editText: {
    fontSize: 14,
    color: "#ebebeb"
  },
  editTag: {
    backgroundColor: "#46c9db",
    position: "absolute",
    bottom: 3,
    right: -4,
    paddingHorizontal: 8,
    paddingVertical: 2, 
    borderRadius: 50
  },  
  input: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
    button: {
    width: "100%",
    backgroundColor: "blue",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

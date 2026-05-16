import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function signup() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const { signUp } = useAuth();

  useEffect(() => {
    router.replace("/(auth)/onboarding")
  },[])

  const handleSubmit = async ():Promise<void> => {
    if(!email || !password) {
      Alert.alert("Email and password needed")
    }

    setIsLoading(true);

    try {
      await signUp(email, password);
    } catch (error) {
      Alert.alert("Fail to signUp")
    }finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sign Up</Text>
        <View>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            {
            isLoading ? (<ActivityIndicator size={24} color="#fff" />) : (<Text style={styles.buttonText}>Sign Up</Text>)
            }
          </TouchableOpacity>
          <View style={styles.signupContainer}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.signupText}>Login</Text>
            </TouchableOpacity>
          </View>
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
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    // height: 40,
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
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    color: "blue",
    fontWeight: "bold",
  },
});

import React from "react";
import CustomButton from "components/CustomButton";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen } from "expo-router";
import { View, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "context/GlobalProvider";

SplashScreen.preventAutoHideAsync();

const Home = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) return <Redirect href="/Home" />;

  return (
    <SafeAreaView className="bg-[#631b82] h-full">
      
        <View className="w-full items-center min-h-[85vh] px-4">
          {/* Logo Section */}
          <Image source={images.logo} style={{ width: 100, height: 60 }} resizeMode="contain" />
          <Text className="text-lg text-yellow-400 font-pbold mt-2">
            Your Stage, Your Stories
          </Text>

          {/* Main Banner */}
          <Image source={images.cards} style={{ width: 350, height: 220 }} resizeMode="contain" />

          {/* Main Text */}
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              Unleash Your Creativity with
              <Text className="text-yellow-500"> Streamify</Text>
            </Text>
            <Text className="text-sm font-pregular text-gray-200 mt-4 text-center">
              Share your stories, showcase your talent, and explore an endless
              stream of creativity from people across the globe.
            </Text>
          </View>

          {/* Feature Highlights */}
          <View className="bg-[#7749b8] p-4 rounded-xl mt-6 shadow-lg">
            <Text className="text-lg font-pbold text-white">🚀 What Makes Aura Special?</Text>
            <Text className="text-sm font-pregular text-gray-200 mt-3">
              - 📤 <Text className="text-yellow-300">Share Your Vision:</Text> Upload your
              videos and share your creativity.
            </Text>
            <Text className="text-sm font-pregular text-gray-200">
              - 🎥 <Text className="text-yellow-300">Explore the World:</Text> Watch unique
              videos from creators like you.
            </Text>
            <Text className="text-sm font-pregular text-gray-200">
              - 💬 <Text className="text-yellow-300">Build Connections:</Text> Interact,
              Connect with the life of others.
            </Text>
            <Text className="text-sm font-pregular text-gray-200">
              - 📱 <Text className="text-yellow-300">Seamless Anywhere:</Text> Stream and
              upload on-the-go with Aura's sleek app experience.
            </Text>
          </View>

          {/* Call to Action */}
          <CustomButton
            title="Connect Now – Join the Movement!"
            handleOnPress={() => navigation.navigate("Signin")}
            contentContainerStyle="bg-yellow-500 text-center text-white rounded-md mt-8 px-4 py-3"
          />
        </View>
      
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Home;

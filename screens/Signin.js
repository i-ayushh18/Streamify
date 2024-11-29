import React, { useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from 'components/CustomButton'; // Adjust the path as necessary
import { images } from '../constants';
import Formfield from 'components/Formfield';
import { useNavigation } from '@react-navigation/native';
import { signIn } from 'lib/appwrite';
import { useFonts } from 'expo-font'; // Import useFonts from expo-font

const Signin = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load the font using expo-font
  const [fontsLoaded] = useFonts({
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Wait for fonts to load
  }

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      navigation.navigate('AppHome');
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center border-purple-500 p-6 bg-[#631b82]">
      <View className="items-center">
        {/* Logo Section */}
        <Image
          source={images.logo18}
          resizeMode="contain"
          className="w-[345px] h-[100px] my-12"
          style={{
            shadowColor: '#FFD700',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.8,
            shadowRadius: 20,
          }}
        />

        {/* Title Section */}
        <Text
          style={{
            fontSize: 27,
            color: 'white',
            textDecorationLine: 'underline',
            fontFamily: 'PoppinsBold',
            marginVertical: 10,
            textAlign: 'center',
          }}
        >
          Welcome to{' '}
          <Text style={{ color: '#88e9ff', fontFamily: 'PoppinsRegular' }}>
            Streamify!!
          </Text>
        </Text>

        {/* Form Section */}
        <View
          style={{
            width: '100%',
            padding: 20,
            backgroundColor: '#210745',
            borderRadius: 20,
            borderWidth: 2,
            borderColor: '#6A0572',
            shadowColor: '#000',
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 15,
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          {/* Email Field */}
          <Formfield
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-5"
            keyboardType="email-address"
          />

          {/* Password Field */}
          <Formfield
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
            secureTextEntry
          />

          {/* Submit Button */}
          <CustomButton
            title="Sign in"
            handleOnPress={submit}
            containerStyles="mt-6 bg-[#f1c40f] rounded-lg"
            isLoading={isSubmitting}
          />
        </View>

        {/* Sign Up Navigation */}
        <View className="flex-row justify-center pt-6 gap-2">
          <Text className="text-lg text-[#B0B0B0]">Don't have an account?</Text>
          <Text
            onPress={() => navigation.navigate('Signup')}
            className="text-lg text-[#FFD700] font-bold"
          >
            Sign Up
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signin;

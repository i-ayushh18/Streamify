import React, { useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from 'components/CustomButton'; // Adjust the path as necessary
import { images } from '../constants';
import Formfield from 'components/Formfield';
import { Link } from 'expo-router';
import { createUser } from '../lib/appwrite';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation(); // Accessing the navigation prop
  const [form, setform] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    setisSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      navigation.navigate('Signin')
    } catch (error) {
      console.error('Error during signup:', error); // Log the error
      Alert.alert('Error', error.message);
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center p-4 bg-[#631b82]">
      <Image
        source={images.logo18}
        resizeMode='contain'
        className='w-[345px] h-[100px] px-3 my-55'
      />
      <Text className='text-2xl text-white font-semibold mt-10'>Sign up to <Text className='text-[#88e9ff] text-3xl underline'>Streamify</Text></Text>
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
      
      
      <Formfield
        title="Username"
        value={form.username}
        handleChangeText={(e) => setform({ ...form, username: e })}
        otherStyles="mt-10"
      />
      <Formfield
        title="Email"
        value={form.email}
        handleChangeText={(e) => setform({ ...form, email: e })}
        otherStyles="mt-7"
        keyboardType="email-address"
      />
      <Formfield
        title="Password"
        value={form.password}
        handleChangeText={(e) => setform({ ...form, password: e })}
        otherStyles="mt-7"
      />
      <CustomButton
        title="Sign up" // Changed to "Sign up"
        handleOnPress={submit}
        containerStyles="mt-7"
        isLoading={isSubmitting}
      />
      </View>
      <View className='justify-center pt-5 flex-row gap-2'>
        <Text className='text-lg text-gray-100'>Have an account already?</Text>
        <Text onPress={() => navigation.navigate('Signin')} className='text-lg text-yellow-500'>Sign in</Text>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

import { View, Text, TextInput,Image } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {icons} from '../constants'

const Formfield = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100'>{title}</Text>
      <View className='border-2 border-purple-400 w-full h-16 px-4 bg-[#7749b8] rounded-2xl flex-row'>
        <TextInput
          className='flex-1 text-white text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {title==='Password' && (
          <TouchableOpacity onPress={()=>
            setShowPassword(!showPassword)}>
              <Image source={!showPassword?icons.eye:icons.eyehide} className='w-8 h-8 mt-3' resizeMode='contain'/>
            </TouchableOpacity>
          )}
      </View>
    </View>
  );
};

export default Formfield;

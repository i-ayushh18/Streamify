import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';

const CustomButton = ({ title, handleOnPress, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handleOnPress}
      activeOpacity={0.7}
      className={`bg-[#c38c05] border-2 border-yellow-300 rounded-lg p-2 mt-4 ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text className="text-white text-center">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

import React, { useState } from 'react';
import { View, TextInput, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation
import { icons } from '../constants';

const SearchInput = ({ initialQuery }) => {
  const [query, setQuery] = useState(initialQuery || '');
  const navigation = useNavigation(); // Get the navigation instance

  const handleSearch = () => {
    if (!query) {
      return Alert.alert('Missing query', 'Please input something to search');
    }
    // Navigate to the search screen with the query as a parameter
    navigation.push('Search', { query });
  };

  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-200 rounded-2xl flex-row space-x-4">
      <TextInput
        className="text-white text-base mt-0.5 flex-1"
        value={query}
        placeholder="Search for a Video Topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Image
          source={icons.search}
          className="w-5 h-5 mt-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

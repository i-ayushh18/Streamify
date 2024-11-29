import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { icons } from 'constants';

const VideoCard = ({ video: { title, thumbnail, video, creator: { username, avatar } } }) => {
  
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-y-yellow-200 p-0.5">
            <Image source={{ uri: avatar }} className="w-full h-full rounded-lg" resizeMode="cover" />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-sm text-white" numberOfLines={2}>
              {title}
            </Text>
            <Text className="text-xs text-white" numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
        <View>
          <Image source={icons.menu} className="mt-3 w-4 h-4" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          style={{ width: '100%', height: 300, borderRadius: 10, marginTop: 10 }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
              
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          style={{
            position: 'relative',
            width: '100%',
            height: 300, // Ensure the container has height for the video
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={{ uri: thumbnail }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 10,
            }}
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            style={{
              width: 50,
              height: 50,
              position: 'absolute',
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;

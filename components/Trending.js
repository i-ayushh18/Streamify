import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import * as Animatable from 'react-native-animatable';

// Zoom animation for active and inactive items
const zoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1 },
};

const zoomOut = {
  0: { scale: 1 },
  1: { scale: 0.9 },
};

const TrendingItem = ({ activeItem, item, setActiveItem }) => {
  const [play, setPlay] = useState(false);

  // Fallbacks for undefined properties
  const videoUri = item?.video || ''; // Fallback to empty string if undefined
  const thumbnailUri = item?.thumbnail || ''; // Fallback to empty string if undefined
  const videoTitle = item?.title || 'No title';

  return (
    <Animatable.View
      style={{ marginRight: 20 }}
      animation={activeItem?.$id === item?.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: videoUri }} // Use the video URI safely
          style={{ width: 200, height: 280, borderRadius: 35, marginTop: 10 }}
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
          style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}
          activeOpacity={0.7}
          onPress={() => {
            setActiveItem(item); // Set the active item when clicked
            setPlay(true); // Play the video when clicked
          }}
        >
          <ImageBackground
            source={{ uri: thumbnailUri }} // Use the thumbnail URI safely
            style={{
              width: 200,
              height: 280,
              borderRadius: 35,
              marginVertical: 10,
              overflow: 'hidden',
              shadowColor: 'black',
              shadowOpacity: 0.4,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
            }}
            resizeMode="cover"
            onError={() => console.log('Image load error')}
          >
            <View
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: [{ translateX: -24 }, { translateY: -24 }],
              }}
            >
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                {videoTitle}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts = [] }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  // Return loading or empty state if no posts are provided
  if (posts.length === 0) {
    return <Text style={{ textAlign: 'center', marginTop: 20, color: 'white' }}>Loading...</Text>;
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item?.$id || 'unknown'} // Fallback to 'unknown' if $id is undefined
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} setActiveItem={setActiveItem} />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Trending;

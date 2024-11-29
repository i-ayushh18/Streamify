import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, Image, RefreshControl,Alert } from 'react-native';
import { images } from 'constants';
import SearchInput from 'components/SearchInput';
import Trending from 'components/Trending';
import EmptyState from 'components/EmptyState';
import { useState,useEffect } from 'react';
import { getAllPosts,getLatestPosts, searchPosts } from 'lib/appwrite';
import useAppwrite from 'lib/useAppwrite';
import VideoCard from 'components/VideoCard';
import { useLocalSearchParams } from 'expo-router';


const Search = () => {
  const {query}=useLocalSearchParams()
    const {data:posts,refetch}=useAppwrite(()=>searchPosts(query));
    
    useEffect(()=>{
      refetch()
    },[query])
    // console.log(posts)
    return (
        <SafeAreaView className='bg-[#1E1E2D] h-full'>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id} // Use item.id and convert it to string
                renderItem={({ item }) => ( // Destructure item here
                    <VideoCard video={item}/>
                )}
                ListHeaderComponent={() => (
                    <View className='my-6 px-4 '>
                        <View className='justify-between items-start flex-row mb-6'>
                            <View>
                                <Text className='text-lg text-gray-100'>Search Results</Text>
                                <Text className='text-2xl text-white'>[query]</Text>
                            </View>
                        
                        </View>
                        <View className='mt-6 mb-8'>
                        <SearchInput initialQuery={query}/>

                        </View>
                        
                      </View>
                )}
                ListEmptyComponent={()=>(
                    <EmptyState
                     title="No Videos Found"
                     subtitle="No videos found for the search"

                    />
                )}
                
                
            />
        </SafeAreaView>
    );
}

export default Search;


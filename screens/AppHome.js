import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, Image, RefreshControl,Alert } from 'react-native';
import { images } from 'constants';
import SearchInput from 'components/SearchInput';
import Trending from 'components/Trending';
import EmptyState from 'components/EmptyState';
import { useState,useEffect } from 'react';
import { getAllPosts,getLatestPosts } from 'lib/appwrite';
import useAppwrite from 'lib/useAppwrite';
import VideoCard from 'components/VideoCard';


const AppHome = () => {
    const {data:posts,refetch}=useAppwrite(getAllPosts)
    const {data:latestPosts}=useAppwrite(getLatestPosts)

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh=async()=>{
        setRefreshing(true);
        await refetch();
        //re call videos->if any new in the chart
        setRefreshing(false);
    }
    // console.log(posts)
    return (
        <SafeAreaView className='bg-[#070109] h-full'>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id} // Use item.id and convert it to string
                renderItem={({ item }) => ( // Destructure item here
                    <VideoCard video={item}/>
                )}
                ListHeaderComponent={() => (
                    <View className='my-6 px-4 space-y-6'>
                        <View className='justify-between items-start flex-row mb-6'>
                            <View>
                                <Text className='text-lg text-gray-100'>Welcome Back</Text>
                                <Text className='text-2xl text-white'>AyushVerma</Text>
                            </View>
                        <View className='mt-1.5'>
                            <Image
                            source={images.logo18}
                            className='w-12 h-12 mr-3 '
                            resizeMode='contain'
                            />
                        </View>
                        </View>
                        <SearchInput/>
                        {/* <View className='w-full flex-1 pt-5 pb-8'>
                            <Text className='text-gray-100 text-lg'>
                                Latest Videos
                            </Text>
                            <Trending posts={latestPosts ?? []}/>
                        </View> */}

                    </View>
                )}
                ListEmptyComponent={()=>(
                    <EmptyState
                     title="No Videos Found"
                     subtitle="Be the first one to upload the video"

                    />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                
            />
        </SafeAreaView>
    );
}

export default AppHome;
import { View, Text,Image} from 'react-native'
import React from 'react'
import { images } from 'constants'
import CustomButton from './CustomButton'

const EmptyState = ({title,subtitle}) => {
  return (
    <View className='justify-center items-center px-4'>
        <Image source={images.empty} className='w-[270px] h-[215px]' resizeMode='contain'/>
        <Text className='text-sm text-gray-100 '>{title}</Text>
        <Text className=' text-xl text-white'>{subtitle}</Text>
        <CustomButton
        title="create Video"
        handleOnPress={() => navigation.navigate('/create')}
        containerStyles="w-full my-"
        
        />
      
    </View>
  )
}

export default EmptyState
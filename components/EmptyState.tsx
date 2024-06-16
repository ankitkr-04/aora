import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

interface EmptyStateProps {
    title: string,
    subtitle?: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
    return (
        <View className='justify-center items-center px-4'>
            <Image source={images.empty} className='w-[270px] h-[250px]' resizeMode='contain' />

            <Text className='font-psemibold text-center mt-2 text-white text-xl'>
                {title}
            </Text>
            <Text className='font-pmedium text-sm text-gray-100'>
                {subtitle}
            </Text>

            <CustomButton
                containerStyles='w-full my-5'
                title='Create a Video'
                handlePress={() => router.push('/create')}
            />
        </View>
    )
}

export default EmptyState
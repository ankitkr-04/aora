import { icons } from '@/constants';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export interface PostProps {
    item: {
        title: string;
        thumbnail: string;
        prompt: string;
        video: string;
        users: {
            username: string;
            avatar: string;
        };
    };
}

const VideoCard: React.FC<PostProps> = ({ item }) => {
    // console.log(item);

    const { title, thumbnail, prompt, video: videoUrl, users: { username, avatar } } = item;

    const [playing, setPlaying] = useState<boolean>(false);


    return (
        <View className='flex-col items-center px-4 mb-14'>
            <View className='flex-row gap-3 items-start'>
                <View className='justify-center flex-row items-center flex-1'>
                    <View className='w-[46px] h-[46px] rounded-lg justify-center items-center p-0.5 border border-secondary'>
                        <Image source={{ uri: avatar }} resizeMode='cover' className='w-full h-full rounded-lg' />
                    </View>

                    <View className='flex-1  justify-center ml-3 gap-y-1'>
                        <Text className='text-white font-psemibold text-sm'>
                            {title}
                        </Text>
                        <Text className='text-xs text-gray-100 font-pregular'>
                            {username}
                        </Text>
                    </View>
                </View>

                <View className='pt-2'>
                    <Image source={icons.menu} resizeMode='contain' className='w-4 h-4' />
                </View>
            </View>
            {playing ? (
                <Text className='text-white '>Playing</Text>
            ) : (

                <TouchableOpacity
                    className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
                    activeOpacity={0.7}
                    onPress={() => setPlaying(true)}
                >
                    <Image source={{ uri: thumbnail }} resizeMode='cover' className='w-full h-full rounded-xl mt-3' />
                    <Image source={icons.play} resizeMode='contain' className='w-12 h-12 absolute' />

                </TouchableOpacity>

            )}


        </View>
    );
};



export default VideoCard;

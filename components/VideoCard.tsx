import { icons } from '@/constants';

import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable, TouchableWithoutFeedback } from 'react-native';
import VideoPlayer from './VideoPlayer';
import { Models } from 'react-native-appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import { router } from 'expo-router';
import useAppwrite from '@/lib/useAppwrite';
import { likePost, unlikePost } from '@/lib/appwrite';

export interface PostProps {
    $id: string;
    title: string;
    thumbnail: string;
    prompt: string;
    video: string;
    users: {
        username: string;
        avatar: string;
    };
    likedBy: {
        $id: string;
    }[]

}

export interface PostsProps {
    item: PostProps;
}


const VideoCard: React.FC<PostsProps> = ({ item }) => {



    const { user } = useGlobalContext();
    const [visible, setVisible] = useState<boolean>(false);
    const { title, thumbnail, prompt, video: videoUrl, users: { username, avatar }, } = item;
    const [playing, setPlaying] = useState<boolean>(false);

    const [saved, setSaved] = useState<boolean>(false);

    useEffect(() => {
        if (user) {

            const isLiked = item.likedBy.some(like => like.$id === user.$id);
            setSaved(isLiked);
        }

    }, [])


    const handleLikeButton = async () => {
        if (!user) router.push("/signin");

        if (saved) {
            try {
                await unlikePost(item.$id, user);
                setSaved(false);
            } catch (error: any) {
                throw new Error('Failed Unliking Post', error.message || 'An error occurred while Unliking post');
            }

        } else {
            try {
                await likePost(item.$id, user);
                setSaved(false);
            }
            catch (error: any) {
                throw new Error('Failed Liking Post', error.message || 'An error occurred while Liking post');
            }
        }
    }



    return (
        <TouchableWithoutFeedback
            onPress={() => setVisible(false)}
        >
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
                        <TouchableOpacity
                            onPress={() => setVisible(!visible)}
                            className='p-1 rounded-lg'
                            activeOpacity={0.7}
                        >
                            <Image source={icons.menu} resizeMode='contain' className='w-4 h-4' />
                        </TouchableOpacity>

                        {visible && (
                            <>

                                <TouchableOpacity
                                    className='absolute w-24 h-8 items-center justify-center right-6 top-3 bg-white/20 rounded-xl  px-3'
                                    onPress={handleLikeButton}
                                >


                                    <View className='flex-row items-center gap-1 justify-center'>
                                        <Image source={icons.love} resizeMode='contain' className='w-4 h-4 ' tintColor='red' />
                                        <Text className='text-white font-psemibold text-sm'>
                                            {saved ? 'Saved' : 'Save'}
                                        </Text>

                                    </View>
                                </TouchableOpacity>

                            </>

                        )}

                    </View>
                </View>
                {playing ? (
                    <VideoPlayer videoUrl={videoUrl} styles='w-full h-60 rounded-xl' setPlaying={setPlaying} />
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
        </TouchableWithoutFeedback>
    );
};



export default VideoCard;

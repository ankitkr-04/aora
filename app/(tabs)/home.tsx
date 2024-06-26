import React, { useState } from 'react';
import { FlatList, Image, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import EmptyState from '@/components/EmptyState';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import VideoCard, { PostsProps } from '@/components/VideoCard';
import { images } from '@/constants';
import { getAllPost, getLatestPosts } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

const Home = () => {
  const { data: posts, loading, refetch } = useAppwrite(getAllPost);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const {user} = useGlobalContext();

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        className=''
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }: { item: any }) => (
          <VideoCard item={item} />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Welcome back,
                </Text>
                <Text className='font-psemibold text-white text-2xl'>
                  {user?.username}
                </Text>
              </View>
              <View className='mt-1.5'>
                <Image
                  source={images.logoSmall}
                  resizeMode='contain'
                  className='w-9 h-9'
                />
              </View>
            </View>
            <SearchInput initialQuery='' />
            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-2'>
                Trending Videos
              </Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='Be the First one to upload a video'
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <StatusBar style='light' backgroundColor='#161622' />
    </SafeAreaView>
  );
}

export default Home;

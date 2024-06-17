import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import VideoCard from '@/components/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getAllPost, getLikedPost, searchPost } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const Search = () => {

  const { user } = useGlobalContext();

  const { data: posts, loading, refetch } = useAppwrite(() => getLikedPost(user?.$id));

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        className=''
        data={posts}
        keyExtractor={(item) => item.$id}

        renderItem={({ item }: { item: any }) => (
          <VideoCard item={item} />
          // <Text className='text-white'>{item.title}</Text>
        )}

        ListHeaderComponent={() => (
          <View className='my-6 px-4 '>

            <View>
              <Text className='font-psemibold text-white text-2xl'>
                Saved Videos
              </Text>
              <Text className='font-pmedium text-sm text-gray-100'>
                Liked videos will appear here
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='Nothing to see here, try searching for something else.'
          />)}


      />

      <StatusBar style='light' backgroundColor='#161622'></StatusBar>
    </SafeAreaView>
  )
}

export default Search
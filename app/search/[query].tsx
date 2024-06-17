import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import VideoCard from '@/components/VideoCard'
import { searchPost } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const Search = () => {
  const { query } = useLocalSearchParams();
  const searchQuery = query as string;
  const { data: posts, loading, refetch } = useAppwrite(() => searchPost(searchQuery));

  useEffect(() => {
    refetch();
  }, [query]);

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

            <Text className='font-pmedium text-sm text-gray-100'>
              Search Results,
            </Text>
            <Text className='font-psemibold text-white text-2xl'>
              {query}
            </Text>
            <View className=' mb-8 mt-6'>
              <SearchInput initialQuery={searchQuery} />
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
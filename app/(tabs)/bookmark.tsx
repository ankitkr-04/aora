import EmptyState from '@/components/EmptyState'
import VideoCard from '@/components/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getLikedPost } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const Search = () => {

  const { user } = useGlobalContext();

  const { data: posts, loading, refetch } = useAppwrite(() => getLikedPost(user?.$id));

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  
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

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

      />

      <StatusBar style='light' backgroundColor='#161622'></StatusBar>
    </SafeAreaView>
  )
}

export default Search
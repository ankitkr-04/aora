import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import { images } from '@/constants'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { FlatList, Image, RefreshControl, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        className=''
        data={[{ key: 'a' }, { key: 'b' }, { key: 'c' }]}
        keyExtractor={(item) => item.key}

        renderItem={({ item }) => (
          <Text className='text-white text-3xl'>{item.key}</Text>
        )}

        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Welcome back,
                </Text>
                <Text className='font-psemibold text-white text-2xl'>
                  Ankit Kumar
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
            <SearchInput handleChange={() => { }} value='' />

            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>
                Trending Videos
              </Text>
              <Trending posts={[{ id: '1' }, { id: '2' }, { id: '3' }] ?? []} />
            </View>

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='Be the First one to upload a video'
          />)}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

      />

      <StatusBar style='light' backgroundColor='#161622'></StatusBar>
    </SafeAreaView>
  )
}

export default Home
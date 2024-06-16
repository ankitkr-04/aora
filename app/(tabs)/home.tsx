import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'

const Home = () => {
  return (
    <SafeAreaView className='bg-primary'>
      <FlatList
        className=''
        data={[{ key: 'a' }, { key: 'b' }]}
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
            </View>

          </View>
        )}

      />
      <StatusBar style='light' backgroundColor='#161622'></StatusBar>
    </SafeAreaView>
  )
}

export default Home
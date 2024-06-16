import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export interface PostProps {
  id: string,
  title?: string,
}
interface TrendingProps {
  posts: PostProps[]

}

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  return (
    <SafeAreaView>
      <FlatList
        horizontal
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text className='text-white text-xl'>{item.id}</Text>
          </View>
        )}
      />

    </SafeAreaView>
  )
}

export default Trending
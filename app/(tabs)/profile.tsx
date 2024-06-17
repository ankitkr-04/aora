import EmptyState from '@/components/EmptyState'
import InfoBox from '@/components/InfoBox'
import VideoCard from '@/components/VideoCard'
import { icons } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getUserPosts, signOut } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts, loading, refetch } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace('/sign-in');
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
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity
              className='w-full items-end mb-10'
              onPress={logout}
            >
              <Image source={icons.logout} resizeMode='contain' className='w-6 h-6' />
            </TouchableOpacity>

            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
              <Image source={{ uri: user?.avatar }} resizeMode='cover' className='w-[90%] h-[90%] rounded-lg' />
            </View>

            <InfoBox
              title={user?.username}
              subtitle={user?.email}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />

            <View className='flex-row mt-4'>
              <InfoBox
                title={posts.length.toString() || '0'}
                subtitle='Posts'
                containerStyles='mr-10'
                titleStyles='text-xl'
              />

              <InfoBox
                title='1.8k'
                subtitle='Followers'

                titleStyles='text-xl'
              />
            </View>



          </View>

        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='Nothing to see here, Start uploading videos to see them here.'
          />)}


      />

      <StatusBar style='light' backgroundColor='#161622'></StatusBar>
    </SafeAreaView>
  )
}

export default Profile
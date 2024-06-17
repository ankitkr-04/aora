import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '@/constants'
import CustomButton from '@/components/CustomButton'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { createVideo } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

export interface FormProps {
  title: string;
  video: any;
  thumbnail: any;
  prompt: string;
  userId?: string;

}123456789

const Create = () => {
  const { user } = useGlobalContext();
  const [form, setForm] = useState<FormProps>({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
    // userId: '',

  });

  const [uploading, setUploading] = useState(false);

  const openPicker = async (type: 'video' | 'image') => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: type === 'image' ?
        ImagePicker.MediaTypeOptions.Images :
        ImagePicker.MediaTypeOptions.Videos,
      
      aspect: [4, 3],
      quality: 1,
    })

    if (!res.canceled) {
      if (type === 'video') {
        setForm({ ...form, video: res.assets[0] })
      }
      if (type === 'image') {
        setForm({ ...form, thumbnail: res.assets[0] })
      }
    }

  }


  const submit = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    setUploading(true);
    try {

      await createVideo({
        ...form, userId: user.$id
      });


      // Alert.alert('Success', 'Post published successfully');
      router.push('/home');

    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
      });
    }
  }


  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl text-white font-psemibold'>
          Upload New Video
        </Text>

        <FormField
          title='Video Title'
          value={form.title}
          placeholder='Enter video title'
          handleChange={(e) => setForm({ ...form, title: e })}
          styles='mt-10'
        />

        <View className='mt-7 space-y-2'>
          <Text className='text-base mx-2 text-gray-100 font-pmedium'>
            Upload Video
          </Text>
          <TouchableOpacity
            onPress={() => openPicker('video')}
          >
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className='w-full h-64 rounded-2xl'
                shouldPlay
                
                resizeMode={ResizeMode.COVER}


              />
            ) : (
              <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                <View className='w-14 h-14 border border-secondary-100 justify-center items-center rounded-xl '>
                  <Image
                    className='w-1/2 h-1/2'
                    source={icons.upload}
                    resizeMode='contain'

                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>


        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Thumbnail
          </Text>

          <TouchableOpacity
            onPress={() => openPicker('image')}
          >
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode='cover'
                className='w-full h-64 rounded-2xl'
              />
            ) : (
              <View className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-1'>

                <Image
                  className='w-5 h-5'
                  source={icons.upload}
                  resizeMode='contain'
                />
                <Text className='text-gray-100 text-sm font-pmedium'>
                  Upload a Thumbnail
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title='AI Prompt'
          value={form.prompt}
          placeholder='Enter AI Prompt used to generate video'
          handleChange={(e) => setForm({ ...form, prompt: e })}
          styles='mt-7'
        />

        <CustomButton
          title='Submit & Publsih'
          isLoading={uploading}
          handlePress={submit}
          containerStyles='mt-7'
        />


      </ScrollView>
    </SafeAreaView>
  )
}

export default Create
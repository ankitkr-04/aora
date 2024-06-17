import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '@/constants'
import CustomButton from '@/components/CustomButton'


const Create = () => {
  const [form, setForm] = useState({
    title: '',
    video: null ,
    thumbnail: null,
    prompt: '',
  });

  const [uploading, setUploading] = useState(false);

  const submit = () => {
    console.log(form)
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
          >
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className='w-full h-64 rounded-2xl'
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping

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
import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'

const SignUp = () => {
  const [form, setForm] = useState({
    username: "", email: "", password: ""
  });
  const [isSubmitting, setisSubmitting] = useState(false);

  const handleSignUp = () => {

  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text className='text-semibold font-psemibold text-2xl text-white mt-10'>
            Sign Up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChange={(e) => setForm({ ...form, username: e })}
            styles='mt-10'
          />

          <FormField
            title="Email"
            value={form.email}
            handleChange={(e) => setForm({ ...form, email: e })}
            keyBoardType='email-address'
            styles='mt-7'
          />
          <FormField
            title="Password"
            value={form.password}
            handleChange={(e) => setForm({ ...form, password: e })}

            styles='mt-7'
          />
          <CustomButton
            title='Sign Up'
            containerStyles='mt-7'
            handlePress={handleSignUp}
            isLoading={isSubmitting}
          />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Already have an account?
            </Text>
            <Link href='/sign-in' className='text-lg font-psemibold text-secondary' >Log In</Link>

          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default SignUp
import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { signIn } from '@/lib/appwrite'

const SignIn = () => {
  const [form, setForm] = useState({
    email: "", password: ""
  });
  const [isSubmitting, setisSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!form.email || !form.password)
      Alert.alert('Error', 'Please fill all the fields');
    setisSubmitting(true);
    try {

      await signIn(form.email, form.password);
      router.replace('/home');
      
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setisSubmitting(false);
    }
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
            Log In to Aora
          </Text>

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
            title='Log In'
            containerStyles='mt-7'
            handlePress={handleLogin}
            isLoading={isSubmitting}
          />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account?
            </Text>
            <Link href='/sign-up' className='text-lg font-psemibold text-secondary' >Sign Up</Link>

          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default SignIn
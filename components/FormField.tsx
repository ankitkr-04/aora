import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants';
interface FormFieldProps {
    title: string,
    value: string,
    placeholder?: string,
    handleChange: (e: string) => void,
    keyBoardType?: string,
    styles?: string

}

const FormField: React.FC<FormFieldProps> = ({ title, value, placeholder, handleChange, keyBoardType, styles }) => {
    const [showPass, setShowPass] = useState(false);
    return (

        <View className={`space-y-2 ${styles}`} >
            <Text className='text-base mx-2 text-gray-100 font-medium'>{title}</Text>
            <View
                className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 
                        rounded-2xl focus:border-secondary items-center flex-row'
            >
                <TextInput
                    className='flex-1 text-white font-psemibold text-base'
                    value={value}
                    placeholder={placeholder}
                    onChangeText={handleChange}
                    secureTextEntry={title === 'Password' && !showPass}
                    placeholderTextColor={'#8D8D8D'}

                />
                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                        <Image source={!showPass ? icons.eye : icons.eyeHide} className='w-6 h-6' resizeMode='contain' />
                    </TouchableOpacity>
                )}

            </View>
        </View >
    )
}

export default FormField
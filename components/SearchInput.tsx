import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants';
interface SearchInputProps {
    value: string,
    // placeholder?: string,
    handleChange: (e: string) => void,
    keyBoardType?: string,
    styles?: string

}

const SearchInput: React.FC<SearchInputProps> = ({ value, handleChange, keyBoardType, styles }) => {
    return (
        <View
            className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 
                        rounded-2xl  focus:border-secondary items-center flex-row'
        >
            <TextInput
                className='text-base mt-0.5 text-white flex-1 font-pregular'
                value={value}
                placeholder="Search for a video Topic"
                onChangeText={handleChange}
                placeholderTextColor='#7b7b8b'

            />

            <TouchableOpacity >
                <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
            </TouchableOpacity>

        </View>

    )
}

export default SearchInput
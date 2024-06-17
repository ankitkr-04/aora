import { View, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants';
import { router, usePathname } from 'expo-router';

interface SearchInputProps {
    initialQuery: string;

}
const SearchInput: React.FC<SearchInputProps> = ({ initialQuery }) => {
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || '');

    return (
        <View
            className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 
                        rounded-2xl  focus:border-secondary items-center flex-row'
        >
            <TextInput
                className='text-base mt-0.5 text-white flex-1 font-pregular'
                value={query}
                placeholder="Search for a video Topic"
                onChangeText={(e) => setQuery(e)}
                placeholderTextColor='#cdcde0'

            />

            <TouchableOpacity
                onPress={() => {
                    if (!query)
                        Alert.alert('Missing Fields', 'Please enter a search query')

                    if (pathname.startsWith('/search'))
                        router.setParams({ query });
                    else
                        router.push(`/search/${query}`);



                }}
            >
                <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
            </TouchableOpacity>

        </View>

    )
}

export default SearchInput
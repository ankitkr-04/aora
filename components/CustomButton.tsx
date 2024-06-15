import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface ButtonProps {
    title: string
    containerStyles?: string,
    textStyles?: string,
    handlePress: () => void,
    isLoading?: boolean

}

const CustomButton: React.FC<ButtonProps> = ({ title, containerStyles, textStyles, handlePress, isLoading }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={isLoading}
            className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        >
            <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton
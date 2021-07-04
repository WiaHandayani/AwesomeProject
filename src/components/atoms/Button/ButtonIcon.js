import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { IconBack } from '../../../assets'

const ButtonIcon = ({...rest}) => {
    return (
        <TouchableOpacity {...rest}>
            <Image source={IconBack} style={{width: 25, height:25}}/>
        </TouchableOpacity>
    )
}

export default ButtonIcon

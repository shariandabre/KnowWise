import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Avatar, Divider } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const Features = () => {
  return (
    <View className='flex flex-row justify-between  items-center mt-4 '>
      <View className='flex-1 h-44 shadow-lg shadow-slate-950 bg-slate-900/50 rounded-lg border  p-4'>
        <View className='flex flex-1 flex-col justify-between items-start dark:text-white'>
          <Avatar.Icon size={50} className='bg-slate-800 shadow-lg shadow-slate-950 ' icon="graphql" />
          <View className='flex flex-row justify-between items-center'>
            <Text style={{ fontFamily: 'Inter' }} className='dark:text-gray-300 text-[24px] flex-1 leading-6 font-bold ' >Create Flowchart</Text>
            <Pressable onPress={() => router.push("/textToflowchart")}>
              <Ionicons color="#fff" size={23} name="arrow-forward" className='flex-1' /></Pressable>
          </View>
        </View>
      </View>
      <Divider className='w-2' />
      <View className='flex-1 h-44 shadow-lg shadow-slate-950 bg-slate-900/50 rounded-lg border  p-4'>
        <View className='flex flex-1 flex-col justify-between items-start dark:text-white'>
          <Avatar.Icon size={50} className='bg-slate-800 shadow-lg shadow-slate-950 ' icon="android-messages" />
          <View className='flex flex-row justify-between items-center'>
            <Text style={{ fontFamily: 'Inter' }} className='dark:text-gray-300 text-[24px] flex-1 leading-6 font-bold ' >Let the A.I Explain</Text>
            <Pressable onPress={() => router.push("/textToexplain")}>
              <Ionicons color="#fff" size={23} name="arrow-forward" className='flex-1' /></Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Features
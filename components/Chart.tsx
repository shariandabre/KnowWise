import { View, Text, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { ActivityIndicator } from 'react-native-paper';

const Chart = () => {
  const [Data, setData] = useState(null)

  const getScore = async () => {
    try {
      const value = await AsyncStorage.getItem('score');
      if (value !== null) {
        setData(JSON.parse(value))
        console.log(JSON.parse(value))
      }
    } catch (e) {
      console.log(e)
    }
  };

  useFocusEffect(React.useCallback(() => {
    getScore()
  }, []))


  if (Data === null) {
    return (
      <View className='w-full h-[220px] bg-slate-950/50 rounded-lg'>
        <ActivityIndicator/>
      </View>
    )
  }

  const labels = Data.map(item => Object.keys(item)[0]);
  const data = Data.map(item => Object.values(item)[0]);

  return (
    <View className='flex justify-center items-center'>
      <View className='border border-gray-700 rounded-lg'>
        <LineChart
          data={{
            labels: labels,
            datasets: [{ data: data }]
          }}
          width={Dimensions.get("window").width - 20}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundGradientFrom: "rgb(2 ,6 ,23)",
            backgroundGradientTo: "rgb(2 ,6 ,23)",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#fff"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    </View>
  )
}

export default Chart

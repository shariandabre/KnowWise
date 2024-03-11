import { View, Text, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import FavFiles from "../../components/FavFiles";
import Chart from "@/components/Chart";
import Features from "@/components/Features";
import * as NavigationBar from 'expo-navigation-bar';

const width = Dimensions.get('window').width;
const Tab1 = () => {

  NavigationBar.setBackgroundColorAsync("rgb(2, 6, 23)");


  return (
    <>
      <View className="bg-slate-950 flex-1 p-2">
        <Chart />
        <Features />
        <FavFiles/>
        </View>

    </>
  );
};

export default Tab1;

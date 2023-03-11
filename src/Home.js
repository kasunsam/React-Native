import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DiscoverMovies from '../src/Components/DiscoverMovies'
import Styles from './Style'
import TrendingPeople from '../src/Components/TrendingPeople'
import TrendingMovies from '../src/Components/TrendingMovies'

const Stack = createNativeStackNavigator();

const Home = (props) => {
  return (
    <ScrollView style={Styles.sectionBg2}>
    <View style={Styles.sectionBg}>
     <DiscoverMovies />
     <ScrollView style={Styles.sectionBg}>
        <TrendingPeople title="Trending People" url="https://api.themoviedb.org/3/trending/person/week?api_key=e78ebf9d0763c6348517d3820a40f675" />
        <TrendingMovies title="Trending Movies" url="https://api.themoviedb.org/3/movie/top_rated?api_key=e78ebf9d0763c6348517d3820a40f675" navigation={props.navigation} /> 
     </ScrollView>    
    </View>
    </ScrollView>
  )
}

export default Home
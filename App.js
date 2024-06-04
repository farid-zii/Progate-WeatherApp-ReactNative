import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import WeatherSearch from './src/components/WeatherSearch'
import WeatherInfo from './src/components/WeatherInfo'
import axios from 'axios'
import { BASE_URL,API_KEY } from './src/helper/constant'

const App = () => {
  const [weatherData,setWeatherData]=useState()
  const searchWeather =(location)=>{
    console.log(location)
    axios.get(`${BASE_URL}?q=${location},id&APPID=${API_KEY}`).then((res)=>{
      console.log(res)
      const data = res.data

      data.visibility /=1000
      data.visibility = data.visibility.toFixed(2)
      data.main.temp -=273.15

      //Konversi Kelvin ke Celcius
      data.main.temp = data.main.temp.toFixed(2)
      setWeatherData(data)

      console.log(data)
    }).catch((err)=>{
      console.log(err)
    })
    // console.log("hai")
  } 
  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} />
      {weatherData && <WeatherInfo weatherData={weatherData} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})

export default App
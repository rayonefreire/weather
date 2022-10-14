import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

import * as Location from 'expo-location';
import axios from 'axios';

import { styles } from './styles';

type Props = {
  coord: {
    lon: number,
    lat: number
  },
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }
  ],
  base: string,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number
  },
  visibility: number,
  wind: {
    speed: number,
    deg: number,
    gust: number
  },
  rain: {
    '1h': number
  },
  clouds: {
    all: number
  },
  dt: number,
  sys: {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number
  },
  timezone: number,
  id: number,
  name: string,
  cod: number         
}

export function Home(){
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(String);

  // dados retornados da api
  const [name, setName] = useState(String);
  const [country, setCountry] = useState(String);
  const [temp, setTemp] = useState(Number);
  const [tempMax, setTempMax] = useState(Number);
  const [tempMin, setTempMin] = useState(Number);
  const [description, setDescription] = useState(String);
  const [feelsLike, setFeelsLike] = useState(Number);
  const [humidity, setHumidity] = useState(Number);
  const [pressure, setPressure] = useState(Number);
  const [windSpeed, setWindSpeed] = useState(Number);
  const [visibility, setVisibily] = useState(Number);

  let data = {} as Props;

  async function getLocationAndApi() {
    setLoading(true);
    
    // pede permissão para acessar a localização do usúario
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status != 'granted') {
      Alert.alert("Permissão negada.");
      return;
    }

    // pega a localização atual do usúario
    const location = await Location.getCurrentPositionAsync({});

    // faz a requisição a api de clima
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=09a42d74922cbe1e63b34d62aaf96652&lang=pt_br`)
    .then(response => {
      console.log(response);
      data = response.data;

      setTemp(Math.floor(data.main.temp - 273.15));
      setTempMax(Math.floor(data.main.temp_max - 273.15));
      setTempMin(Math.floor(data.main.temp_min - 273.15));
      setName(data.name);
      setCountry(data.sys.country);
      setFeelsLike(Math.floor(data.main.feels_like - 273.15));
      setHumidity(data.main.humidity);
      setPressure(data.main.pressure);
      setWindSpeed(data.wind.speed);
      setVisibily(data.visibility);

      data.weather.map(item => {
        setDescription(item.description)
      });
    })
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }

  async function handleGetWeatherCity() {
    setLoading(true);

    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=09a42d74922cbe1e63b34d62aaf96652&lang=pt_br`)
      .then(response => {
        console.log(response);
        data = response.data;

        setTemp(Math.floor(data.main.temp - 273.15));
        setTempMax(Math.floor(data.main.temp_max - 273.15));
        setTempMin(Math.floor(data.main.temp_min - 273.15));
        setName(data.name);
        setCountry(data.sys.country);

        data.weather.map(item => {
          setDescription(item.description)
        });
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getLocationAndApi();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
    >
      <ImageBackground
        source={{ uri: 'https://www.huaweicentral.com/wp-content/uploads/2022/06/Weather.jpg' }}
        resizeMode='cover'
        style={{ flex: 1, justifyContent: 'center'}}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {
            loading ?
            <ActivityIndicator size='large' color="white" /> :

            <View style={styles.container}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.cidade}>
                  { name } / { country }
                </Text>

                <Text style={styles.temp}>
                  { temp }°
                </Text>

                <Text style={styles.description}>
                  { description }
                </Text>
              </View>

              <View style={{ flexDirection :'row', alignItems: 'center' }}>
                <Text style={styles.max_min}>
                  Máx: { tempMax }°
                </Text>

                <Text style={styles.max_min}>
                  Min: { tempMin }°
                </Text>
              </View>

              <View style={styles.main}>
                <Text style={styles.text}>
                  Percepção humana: { feelsLike }
                </Text>

                <Text style={styles.text}>
                  Humidade: { humidity }
                </Text>

                <Text style={styles.text}>
                  Pressão: { pressure }
                </Text>

                <Text style={styles.text}>
                  Velocidade do vento: { windSpeed }
                </Text>

                <Text style={styles.text}>
                  Visibilidade: { visibility }
                </Text>
              </View>

              <View style={styles.form}>
                <TextInput
                  placeholder='Procure uma cidade'
                  placeholderTextColor='lightgray'
                  onChangeText={setCity}
                  style={styles.input}
                />

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleGetWeatherCity}
                >
                  <Text style={styles.titleButton}>Buscar</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>     
  );
}
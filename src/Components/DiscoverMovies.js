import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {SliderBox} from 'react-native-image-slider-box';
import {GET} from '../Services/API';
import Constants from '../Constants';


const DiscoverMovies = props => {

    const [movies, setMovies] = useState([]);
    const [images, setImages] = useState([]);    

    useEffect(() => {

        const getMovies = async () => {

            fetch("https://api.themoviedb.org/3/discover/movie?api_key=e78ebf9d0763c6348517d3820a40f675")
            .then((response) => response.json())
            .then((data) => {
            //   console.log(data)

              const images = data.results.map(
                data => `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
              );
        
              let backImages = [];
              for (let i = 0; i < 10; ++i) {
                backImages = [...backImages, images[i]];
              }
        
              setImages(backImages); 

            })
           

        };
        getMovies();
      }, []);

  return (
    <View>
      <SliderBox
        images={images}
        dotColor={Constants.secondaryColor}
        onCurrentImagePressed={index =>
          props.navigation.navigate('MovieDetails', {movieId: movies[index].id})
        }
      />
    </View>
  )
}

export default DiscoverMovies
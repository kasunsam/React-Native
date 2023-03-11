import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
//import {IMAGE_POSTER_URL} from '../config';
//import {GET} from '../Services/API';
import Styles from '../Style';
import Loader from './Loader';
import Icon from 'react-native-vector-icons/Entypo';
import Constants from '../Constants';
import TrendingPeople from './TrendingPeople';
import TrendingMovies from './TrendingMovies';
// import YoutubePlayer from 'react-native-youtube-iframe';

const MovieDetails = props => {

const [loading, setLoading] = useState(true);
const [details, setDetails] = useState();    

useEffect(() => {
    const getDetails = async () => {

      fetch(`https://api.themoviedb.org/3/movie/${props.route.params.movieId}?api_key=e78ebf9d0763c6348517d3820a40f675`)
      .then((response) => response.json())
          .then((data) => {
              console.log(data.result)
              setDetails(data);
              setLoading(false);
          })

    };

    getDetails();
  }, []);

  const getGenre = () => {
    return details.genres.map(genre => (
      <View style={Styles.genreContainer}>
        <Text style={Styles.genre}>{genre.name}</Text>
      </View>
    ));
  };  

  return (
    <ScrollView style={Styles.sectionBg}>
      {loading ? (
        <Loader />
      ) : (
        <View>
    <View>
    </View>

          <View>
            <Image
              source={{uri: `https://image.tmdb.org/t/p/original${details.backdrop_path}`}}
              style={Styles.imageBg}
            />
          </View>
          <Text style={Styles.detailsMovieTitle}>{details.original_title}</Text>
          {details.homepage ? (
            <View style={Styles.linkContainer}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(details.homepage);
                }}>
                <Icon name="link" color={Constants.textColor} size={22} />
              </TouchableOpacity>
            </View>
          ) : null}

          <Text style={Styles.heading}>OVERVIEW</Text>
          <Text style={Styles.overview}>{details.overview}</Text>

          <View style={Styles.detailsContainer}>
            <View>
              <Text style={Styles.heading}>BUDGET</Text>
              <Text style={Styles.details}>$ {details.budget}</Text>
            </View>

            <View>
              <Text style={Styles.heading}>DURATION</Text>
              <Text style={Styles.details}>{details.runtime} min.</Text>
            </View>

            <View>
              <Text style={Styles.heading}>RELEASE DATE</Text>
              <Text style={Styles.details}>{details.release_date}</Text>
            </View>
          </View>

          <Text style={Styles.heading}>GENRE</Text>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            {getGenre()}
          </View>

          <TrendingPeople title="Casts" url={`https://api.themoviedb.org/3/movie/${props.route.params.movieId}/credits`} />

          {/* <TrendingPeople
            title="CAST"
            url={`https://api.themoviedb.org/3/movie/${props.route.params.movieId}/credits`}
            isForPage="details"
          /> */}

          <TrendingMovies
            title="Similer Movies"
            navigation={props.navigation}
            url={`https://api.themoviedb.org/3/movie/${props.route.params.movieId}/similar`}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default MovieDetails
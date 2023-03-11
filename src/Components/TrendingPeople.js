import React, {useEffect, useState} from 'react';
import {View, Image, FlatList, Text} from 'react-native';
import Styles from '../Style';
import Loader from './Loader';

const TrendingPeople = props => {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState();

  useEffect(() => {
    const getPeople = async () => {


// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    fetch(props.url)
    .then((response) => response.json())
    .then((data) => {
    // console.log(data)

    setPeople(props.isForPage === 'details' ? data.cast : data.results);
    setLoading(false);

    })
    };

    getPeople();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
        <Text style={Styles.heading}>{props.title}</Text>
          <FlatList
            keyExtractor={item => item.id}
            data={people}
            renderItem={displayPeople}
            horizontal
          />
        </View>
      )}
    </View>
  );
};

const displayPeople = ({item}) => {
  return (
    <View style={Styles.trendingPeopleContainer}>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/original${item.profile_path}`}}
        style={Styles.trendingPeopleImage}
      />
      <Text style={Styles.trendingPeopleName}>{item.name}</Text>
    </View>
  );
};

export default TrendingPeople;
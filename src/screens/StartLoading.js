import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {container} from './../resoureces/styles/GlobalStyles';
import {BLACK, PRIMERY} from '../color';

export default function StartLoading() {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container1}>
        <Image source={require('../img/logo.png')} style={styles.image1} />
      </View>
      <View style={styles.container2}>
        <Image
          source={require('../../assets/images/Phinocchio.png')}
          style={styles.image2}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image1: {
    width: '80%',
    height: '100%',
    resizeMode: 'cover',
  },
  image2: {
    width: '120%',
    height: '120%',
    resizeMode: 'contain',
  },
});

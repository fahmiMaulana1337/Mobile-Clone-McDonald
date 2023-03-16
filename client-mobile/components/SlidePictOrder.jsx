import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    ImageBackground,
    Animated,
    useWindowDimensions,
  } from 'react-native';
import React, {useRef} from 'react';

const SlidePictOrder = () =>{
    const images = new Array(1).fill(
        'https://cdn.wallpapersafari.com/64/32/s928lu.png'
      );
      images.push('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZr1oh9wW63y6P0re5M7APWVi-tO3crek-Cw&usqp=CAU')
      images.push('https://e1.pxfuel.com/desktop-wallpaper/502/165/desktop-wallpaper-mcdonalds.jpg')
      const scrollX = useRef(new Animated.Value(0)).current;

      const {width: windowWidth} = useWindowDimensions();
    return(
        <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],{useNativeDriver:false})}
          scrollEventThrottle={1}>
          {images.map((image, imageIndex) => {
            return (
              <View style={{width: windowWidth, height: 100}} key={imageIndex}>
                <ImageBackground source={{uri: image}} style={styles.card}>
                </ImageBackground>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {images.map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[styles.normalDot, {width}]}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollContainer: {
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      flex: 1,
      borderRadius: 5,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    normalDot: {
      width: 8,
      borderRadius: 4,
      backgroundColor: 'silver',
      marginHorizontal: 4,
    },
    indicatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
export default SlidePictOrder
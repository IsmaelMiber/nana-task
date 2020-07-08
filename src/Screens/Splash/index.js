import React, { useState, useEffect } from "react";
import { View, Image, Animated } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useDispatch, useStore } from "react-redux";
import { resetError } from "../../redux/actions/error";
import getStyle from "./styles";

const logo = require("../../../assets/images/logo.png");

function Splash(props) {
  var styles = getStyle();
  var dispatch = useDispatch();
  var store = useStore();
  var navigation = useNavigation();
  var [scaling] = useState(new Animated.Value(0));

  useEffect(function componentDidMount() {
    var unsubscribe = store.subscribe(() => {
      var state = store.getState();
      if (state.error.length == 0) {
        startAnimation();
        unsubscribe();
      }
    });
    dispatch(resetError());
  }, []);

  function startAnimation() {
    Animated.timing(scaling, {
      toValue: 1,
      duration: 1000,
      delay: 0,
      useNativeDriver: true,
    }).start(onAnimationEnd);
  }

  function onAnimationEnd({ finished }) {
    if (finished) {
      goToProducts();
    }
  }

  function goToProducts() {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "ProductsScreen" }],
      }),
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ scale: scaling }],
          opacity: scaling,
          ...styles.logoContainer,
        }}
      >
        <Image source={logo} resizeMode="contain" style={styles.img} />
      </Animated.View>
    </View>
  );
}

export default React.memo(Splash);

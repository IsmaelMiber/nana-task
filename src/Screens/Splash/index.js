import React, { useState, useEffect } from "react";
import { View, Image, Animated } from "react-native";
import styles from "./styles";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { resetError } from "../../redux/actions/error";
import store from "../../redux/store";

const logo = require("../../../assets/images/logo.png");

function Splash(props) {
  var { resetError } = props;
  var navigation = useNavigation();
  var [scaling] = useState(new Animated.Value(0));

  useEffect(() => {
    startAnimation();
    var unsubscribe = store.subscribe(() => {
      var state = store.getState();
      if (state.error.length == 0) {
        goToProducts();
        unsubscribe();
      }
    });
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
      resetError();
    }
  }

  function goToProducts() {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "SettingScreen" }],
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

function mapDispatchToProps(dispatch, ownProps) {
  return {
    resetError: () => dispatch(resetError()),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Splash);

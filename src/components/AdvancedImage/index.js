import React, { useState } from "react";
import { View, Image, Text, ActivityIndicator, StyleSheet } from "react-native";

function AdvancedImage({
  uri,
  alternateText = "",
  imgContainerStyle,
  alternateTextStyle,
  activityIndicatorProps = {},
  ...imageProps
}) {
  var [loading, setLoading] = useState(true);
  var [showAlternateText, setAlternateText] = useState(false);

  var {
    size = "small",
    style: activityIndicatorStyle,
    color: activityIndicatorColor,
  } = activityIndicatorProps;
  return (
    <View style={[styles.productImgContainer, imgContainerStyle]}>
      {loading ? (
        <ActivityIndicator
          style={[styles.fly, activityIndicatorStyle]}
          size={size}
          color={activityIndicatorColor}
        />
      ) : null}
      {showAlternateText ? (
        <Text
          style={[styles.fly, alternateTextStyle]}
        >{`${alternateText} photo`}</Text>
      ) : null}
      <Image
        source={{ uri }}
        style={styles.img}
        onLoadEnd={() => {
          if (loading) {
            setLoading(false);
          }
        }}
        onError={() => {
          setLoading(false);
          setAlternateText(true);
        }}
        {...imageProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: "100%",
  },
  productImgContainer: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  fly: {
    position: "absolute",
  },
});

export default React.memo(AdvancedImage);

import React, { useState } from "react";
import { View, Image, Text, ActivityIndicator } from "react-native";
import getStyle from "./styles";

function AdvancedImage({
  uri,
  alternateText = "",
  imgContainerStyle,
  alternateTextStyle,
  activityIndicatorProps = {},
  ...imageProps
}) {
  var styles = getStyle();
  var [loading, setLoading] = useState(true);
  var [showAlternateText, setAlternateText] = useState(false);

  var {
    size = "large",
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

export default React.memo(AdvancedImage);

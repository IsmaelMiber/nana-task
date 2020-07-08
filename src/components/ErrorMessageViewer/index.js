import React from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";
import getStyle from "./styles";

function ErrorMessageViewer(props) {
  var styles = getStyle();
  var error = useSelector(state => state.error);
  var message;
  if (error == "network_error") {
    message = "please, check your connection...";
  } else if (error == "not_found") {
    message = "item doesn't exists, please check it later";
  } else {
    message = "please, reload app";
  }
  return <Text style={styles.errorText}>{message}</Text>;
}

export default React.memo(ErrorMessageViewer);

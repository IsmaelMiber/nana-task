import { StyleSheet } from "react-native";
import Responsive from "../../utils/Responsive";

function getStyle() {
  var { calcFont } = Responsive;
  return StyleSheet.create({
    errorText: {
      fontSize: calcFont(13),
    },
  });
}

export default getStyle;

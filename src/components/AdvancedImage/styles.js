import { StyleSheet } from "react-native";
import Responsive from "../../utils/Responsive";

function getStyle() {
  var { calcHeight } = Responsive;
  return StyleSheet.create({
    img: {
      width: "100%",
      height: "100%",
    },
    productImgContainer: {
      width: "100%",
      height: calcHeight(300),
      justifyContent: "center",
      alignItems: "center",
    },
    fly: {
      position: "absolute",
    },
  });
}

export default getStyle;

import { StyleSheet } from "react-native";
import Responsive from "../../utils/Responsive";
import getGlobalStyle from "../../styles/global";

function getStyle() {
  var { calcHeight } = Responsive;
  return StyleSheet.create({
    ...getGlobalStyle(),
    productImgContainer: {
      width: "100%",
      height: calcHeight(300),
      justifyContent: "center",
      alignItems: "center",
    },
  });
}

export default getStyle;

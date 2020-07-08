import { StyleSheet } from "react-native";
import Responsive from "../../utils/Responsive";
import getGlobalStyle from "../../styles/global";

function getStyle() {
  var { calcWidth } = Responsive;
  return StyleSheet.create({
    ...getGlobalStyle(),
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    img: {
      height: "100%",
      width: "100%",
    },
    logoContainer: {
      width: calcWidth(200),
      height: calcWidth(200),
    },
  });
}

export default getStyle;

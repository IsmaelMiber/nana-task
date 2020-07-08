import { StyleSheet } from "react-native";
import Responsive from "../../utils/Responsive";
import getGlobalStyle from "../../styles/global";

export default function getStyle() {
  var { calcWidth, calcHeight } = Responsive;

  return StyleSheet.create({
    ...getGlobalStyle(),
    container: {
      flex: 1,
    },
    productContainer: {
      padding: calcWidth(16),
    },
    productImgContainer: {
      width: "100%",
      height: calcHeight(300),
      justifyContent: "center",
      alignItems: "center",
    },
    productDetails: {
      paddingHorizontal: calcWidth(10),
      marginTop: calcHeight(10),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
}

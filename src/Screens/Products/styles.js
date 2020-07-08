import { StyleSheet } from "react-native";
import Responsive from "../../utils/Responsive";

export default function getStyle() {
  var { calcWidth, calcHeight, calcFont } = Responsive;

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    center: {
      justifyContent: "center",
      alignItems: "center",
    },
    img: {
      width: "100%",
      height: "100%",
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
    fly: {
      position: "absolute",
    },
    nameText: {
      fontSize: calcFont(15),
    },
    priceText: {
      fontSize: calcFont(15),
    }
  });
}

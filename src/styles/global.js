import { StyleSheet } from "react-native";
import Responsive from "../utils/Responsive";

export default function getGlobalStyle() {
  var { calcFont } = Responsive;
  return StyleSheet.create({
    img: {
      width: "100%",
      height: "100%",
    },
    fly: {
      position: "absolute",
    },
    center: {
      justifyContent: "center",
      alignItems: "center",
    },
    nameText: {
      fontSize: calcFont(15),
    },
    priceText: {
      fontSize: calcFont(15),
    },
  });
}

import { StyleSheet } from "react-native";
import Responsive from "../../utils/Responsive";

export default function getStyle() {
  var { calcWidth, calcHeight, calcFont } = Responsive;
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: Responsive.calcWidth(16),
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    center: {
      justifyContent: "center",
      alignItems: "center",
    },
    sliderContainer: { alignItems: "center" },
    productDetails: {
      marginVertical: calcHeight(20),
      justifyContent: "space-between",
    },
    sliderDotsContainer: {
      position: "absolute",
      bottom: calcHeight(10),
    },
    dot: {
      width: calcWidth(10),
      height: calcWidth(10),
      marginHorizontal: calcWidth(5),
      borderRadius: calcWidth(10 / 2),
    },
    scoreCircle: {
      width: calcWidth(40),
      height: calcWidth(40),
      borderRadius: calcWidth(40 / 2),
      borderWidth: calcWidth(1),
      borderColor: "#000",
      justifyContent: "center",
      alignItems: "center",
      marginRight: calcWidth(5),
    },
    reviewText: { flex: 1, fontSize: calcFont(11) },
    reviewContainer: {
      marginBottom: calcHeight(10),
    },
    reviewsTitle: {
      marginRight: calcWidth(10),
      fontSize: calcFont(12)
    },
    nameText: {
      fontSize: calcFont(15),
    },
    priceText: {
      fontSize: calcFont(15),
    },
    scoreText: {
      fontSize: calcFont(13),
    },
    moreBtn: {
      borderWidth: calcWidth(2),
      borderRadius: calcWidth(16),
      borderColor: "#000",
      backgroundColor: "#eee",
      padding: calcWidth(10),
      alignSelf: "flex-start",
      marginTop: calcHeight(10),
    },
    showMoreText: {
      fontSize: calcFont(13)
    }
  });
}

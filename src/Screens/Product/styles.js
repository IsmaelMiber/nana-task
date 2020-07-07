import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
    marginVertical: 20,
    justifyContent: "space-between",
  },
  sliderDotsContainer: {
    position: "absolute",
    bottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
    borderRadius: 10 / 2,
  },
  scoreCircle: {
    width: 40,
    height: 40,
    borderRadius: 50 / 2,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  reviewText: { flex: 1 },
  reviewContainer: {
    marginBottom: 10,
  },
  reviewsTitle: {
    marginRight: 10,
  }
});

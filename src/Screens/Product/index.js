import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { getProduct } from "../../API";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import AdvancedImage from "../../components/AdvancedImage";
import styles from "./styles";
import HighToLowSvg from "../../../assets/images/icons/highToLow.svg";
import LowToHighSvg from "../../../assets/images/icons/lowToHigh.svg";
import OriginalSortSvg from "../../../assets/images/icons/normal.svg";
import { connect } from "react-redux";
import { setError } from "../../redux/actions/error";
import ErrorMessageViewer from "../../components/ErrorMessageViewer";

function Product(props) {
  var { width } = useWindowDimensions();
  const SLIDER_ITEM_WIDTH = width - 32;

  var { route = {}, error } = props;
  var { params = {} } = route;
  var { id, price } = params;
  var [productDetails, setProductDetails] = useState({});
  var [loading, setLoading] = useState(true);

  useEffect(() => {
    var { setError } = props;
    fetchProductDetails();

    async function fetchProductDetails() {
      var response = await getProduct(id);

      if (typeof response == "string") {
        setError(response);
      } else {
        setProductDetails(response);
        setLoading(false);
      }
    }
  }, []);

  var [currentSliderItem, setSliderItem] = useState(0);
  var { name = "", reviews = [], pictures = [] } = productDetails || {};
  var [sortType, setSortType] = useState("normal");
  var [reviewsCountToShow, setReviewsCountToShow] = useState(1);

  function renderItem({ item, index }) {
    var { photo } = item;
    return (
      <View style={{ width: SLIDER_ITEM_WIDTH }}>
        <AdvancedImage uri={photo} resizeMode="contain" alternateText={name} />
      </View>
    );
  }

  function renderListFooterComponent() {
    return (
      <View style={[styles.row, styles.sliderDotsContainer]}>
        {pictures.map((pic, index) => {
          return (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    currentSliderItem == index ? "#000" : "rgba(0, 0, 0, 0.4)",
                },
              ]}
            />
          );
        })}
      </View>
    );
  }

  function sortBasedOnType() {
    var newReviewsToBeShowed = reviews.slice(-reviewsCountToShow);
    newReviewsToBeShowed.reverse();
    if (sortType != "normal") {
      newReviewsToBeShowed.sort(function compareScores(first, second) {
        if (sortType == "high") {
          return second.score - first.score;
        } else {
          return first.score - second.score;
        }
      });
    }
    return newReviewsToBeShowed;
  }

  function sortOnPress() {
    switch (sortType) {
      case "normal":
        setSortType("high");
        break;
      case "high":
        setSortType("low");
        break;
      case "low":
      default:
        setSortType("normal");
    }
  }

  function renderSortIcon() {
    switch (sortType) {
      case "normal":
        return <OriginalSortSvg width={25} height={25} />;
      case "high":
        return <HighToLowSvg width={25} height={25} />;
      case "low":
        return <LowToHighSvg width={25} height={25} />;
    }
  }

  function showMoreReviews() {
    if (reviewsCountToShow < reviews.length) {
      setReviewsCountToShow(reviewsCountToShow + 1);
    }
  }

  return (
    <ScrollView
      style={[styles.container]}
      contentContainerStyle={loading ? [{ flex: 1 }, styles.center] : null}
    >
      {loading ? (
        error.length > 0 ? (
          <ErrorMessageViewer />
        ) : (
          <ActivityIndicator />
        )
      ) : (
        <View>
          <View style={styles.sliderContainer}>
            <FlatList
              horizontal
              data={pictures}
              renderItem={renderItem}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              onScrollEndDrag={e => {
                var { targetContentOffset } = e.nativeEvent;
                setSliderItem(targetContentOffset.x / SLIDER_ITEM_WIDTH);
              }}
              keyExtractor={(item, index) => "key" + index}
            />
            {renderListFooterComponent()}
          </View>

          <View style={[styles.row, styles.productDetails]}>
            <Text>{name}</Text>
            <Text>{price}</Text>
          </View>

          {reviews.length > 0 ? (
            <View>
              <View style={styles.row}>
                <Text style={styles.reviewsTitle}>Comments</Text>
                <TouchableOpacity onPress={sortOnPress}>
                  {renderSortIcon()}
                </TouchableOpacity>
              </View>

              {sortBasedOnType().map(({ review, score }, index) => {
                return (
                  <View
                    key={index}
                    style={[styles.row, styles.reviewContainer]}
                  >
                    <View style={styles.scoreCircle}>
                      <Text>{score}</Text>
                    </View>
                    <Text style={styles.reviewText}>{review}</Text>
                  </View>
                );
              })}

              {reviewsCountToShow != reviews.length ? (
                <TouchableOpacity onPress={showMoreReviews}>
                  <Text>Show More</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null}
        </View>
      )}
    </ScrollView>
  );
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    setError: error => dispatch(setError(error)),
  };
}

function mapStateToProps(state, ownProps) {
  return {
    error: state.error,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Product);

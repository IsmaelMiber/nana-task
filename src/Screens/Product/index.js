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
import getStyle from "./styles";
import HighToLowSvg from "../../../assets/images/icons/highToLow.svg";
import LowToHighSvg from "../../../assets/images/icons/lowToHigh.svg";
import OriginalSortSvg from "../../../assets/images/icons/normal.svg";
import { useSelector, useDispatch } from "react-redux";
import { setError, resetError } from "../../redux/actions/error";
import ErrorMessageViewer from "../../components/ErrorMessageViewer";
import Responsive from "../../utils/Responsive";

function Product(props) {
  var styles = getStyle();
  var { width } = useWindowDimensions();
  const SLIDER_ITEM_WIDTH = Math.round(width - Responsive.calcWidth(32));

  var error = useSelector(state => state.error);
  var dispatch = useDispatch();

  var { route = {} } = props;
  var { params = {} } = route;
  var { id, price } = params;

  var [productDetails, setProductDetails] = useState({});
  var [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();

    async function fetchProductDetails() {
      var response = await getProduct(id);

      if (typeof response == "string") {
        dispatch(setError(response));
      } else {
        setProductDetails(response);
        setLoading(false);
        dispatch(resetError());
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
        return (
          <OriginalSortSvg
            width={Responsive.calcWidth(25)}
            height={Responsive.calcWidth(25)}
          />
        );
      case "high":
        return (
          <HighToLowSvg
            width={Responsive.calcWidth(25)}
            height={Responsive.calcWidth(25)}
          />
        );
      case "low":
        return (
          <LowToHighSvg
            width={Responsive.calcWidth(25)}
            height={Responsive.calcWidth(25)}
          />
        );
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
      contentContainerStyle={
        loading || error.length > 0 ? [{ flex: 1 }, styles.center] : null
      }
    >
      {loading && error.length == 0 ? <ActivityIndicator size="large" /> : null}

      {error.length > 0 ? <ErrorMessageViewer /> : null}

      {!loading && error.length == 0 ? (
        <View>
          {pictures && pictures.length > 0 ? (
            <View style={styles.sliderContainer}>
              <FlatList
                horizontal
                data={pictures}
                renderItem={renderItem}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                onScroll={e => {
                  var { contentOffset } = e.nativeEvent;
                  var offset = Math.round(contentOffset.x);
                  if (
                    offset >= 0 &&
                    offset <= (pictures.length - 1) * SLIDER_ITEM_WIDTH
                  ) {
                    let itemIndex = offset / SLIDER_ITEM_WIDTH;
                    setSliderItem(itemIndex);
                  }
                }}
                keyExtractor={(item, index) => "key" + index}
              />
              {renderListFooterComponent()}
            </View>
          ) : null}
          <View style={[styles.row, styles.productDetails]}>
            {name ? <Text style={styles.nameText}>{name}</Text> : null}
            {price ? <Text style={styles.nameText}>{`${price} $`}</Text> : null}
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
                    {score ? (
                      <View style={styles.scoreCircle}>
                        <Text style={styles.scoreText}>{score}</Text>
                      </View>
                    ) : null}
                    {review ? (
                      <Text style={styles.reviewText}>{review}</Text>
                    ) : null}
                  </View>
                );
              })}

              {reviewsCountToShow != reviews.length ? (
                <TouchableOpacity
                  style={styles.moreBtn}
                  onPress={showMoreReviews}
                >
                  <Text style={styles.showMoreText}>Show More</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null}
        </View>
      ) : null}
    </ScrollView>
  );
}

export default React.memo(Product);

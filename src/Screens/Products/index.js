import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AdvancedImage from "../../components/AdvancedImage";
import getStyle from "./styles";
import { setError, resetError } from "../../redux/actions/error";
import { getProducts } from "../../API";
import ErrorMessageViewer from "../../components/ErrorMessageViewer";

function Products(props) {
  var styles = getStyle();
  var error = useSelector(state => state.error);
  var dispatch = useDispatch();

  var navigation = useNavigation();
  var [products, setProducts] = useState([]);
  var [loading, setLoading] = useState(true);

  //get product that has name as it is essantialy thing about any product regardless the price or photo
  products = products.filter(({ name }) => name);
  useEffect(function componentDidMount() {
    fetchProducts();

    async function fetchProducts() {
      var response = await getProducts();

      if (typeof response == "string") {
        dispatch(setError(response));
      } else {
        setProducts(response);
        setLoading(false);
        dispatch(resetError());
      }
    }
  }, []);

  function renderItem({ item, index }) {
    var { id, name = "", totalReviews, price, photo } = item;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductScreen", {
            id,
            price,
          })
        }
        style={styles.productContainer}
      >
        <AdvancedImage uri={photo} alternateText={name} resizeMode="contain" />
        <View style={styles.productDetails}>
          {name ? <Text style={styles.nameText}>{name}</Text> : null}
          {price ? <Text style={styles.priceText}>{`${price}$`}</Text> : null}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        styles.container,
        loading || error.length > 0 ? styles.center : null,
      ]}
    >
      {loading && error.length == 0 ? <ActivityIndicator size="large" /> : null}

      {error.length > 0 ? <ErrorMessageViewer /> : null}

      {!loading && error.length == 0 && products && products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => "key" + item.id}
        />
      ) : null}
    </View>
  );
}

export default React.memo(Products);

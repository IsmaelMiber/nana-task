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
import styles from "./styles";
import { setError, resetError } from "../../redux/actions/error";
import { getProducts } from "../../API";
import ErrorMessageViewer from "../../components/ErrorMessageViewer";

function Products(props) {
  var error = useSelector(state => state.error);
  var dispatch = useDispatch();

  var navigation = useNavigation();
  var [products, setProducts] = useState([]);
  var [loading, setLoading] = useState(true);

  //get product that has name as it is essantialy thing about any product regardless the price or photo
  products = products.filter(({ name }) => name);
  useEffect(() => {
    fetchProductDetails();

    async function fetchProductDetails() {
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
          {name ? <Text>{name}</Text> : null}
          {price ? <Text>{`${price}$`}</Text> : null}
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
      {loading && error.length == 0 ? <ActivityIndicator /> : null}

      {error.length > 0 ? <ErrorMessageViewer /> : null}

      {!loading && error.length == 0 ? (
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

export default Products;

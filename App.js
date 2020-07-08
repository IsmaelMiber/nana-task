import React from "react";

import { SafeAreaView } from "react-native";

// Screens
import SplashScreen from "./src/Screens/Splash";
import ProductsScreen from "./src/Screens/Products";
import ProductScreen from "./src/Screens/Product";

// Navigator
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Store
import { Provider } from "react-redux";
import store from "./src/redux/store";

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

export default App;

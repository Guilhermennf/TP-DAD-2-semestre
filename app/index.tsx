import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen } from "./screens/Home";
import { CEPScreen } from "./screens/CEP";
import { BancosScreen } from "./screens/Bancos";

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer independent={true}>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: "Início" }}
                />
                <Drawer.Screen
                    name="CEP"
                    component={CEPScreen}
                    options={{ title: "Consulta CEP" }}
                />
                <Drawer.Screen
                    name="Bancos"
                    component={BancosScreen}
                    options={{ title: "Lista de Bancos" }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

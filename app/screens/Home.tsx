import * as React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";

export function HomeScreen() {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-xl">Bem-vindo à Brasil API Demo</Text>
        </View>
    );
}

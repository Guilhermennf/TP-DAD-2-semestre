import * as React from "react";
import { View, TextInput } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Card, CardContent } from "~/components/ui/card";
import { SearchIcon } from "lucide-react-native";
import { useTheme } from "@react-navigation/native";

type Endereco = {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
};

export function CEPScreen() {
    const [cep, setCep] = React.useState("");
    const [endereco, setEndereco] = React.useState<Endereco | null>(null);

    const buscarCEP = async () => {
        try {
            const response = await fetch(
                `https://brasilapi.com.br/api/cep/v1/${cep}`
            );
            const data = await response.json();
            setEndereco(data);
        } catch (error) {
            console.error(error);
        }
    };

    const { colors } = useTheme();

    return (
        <View className="flex-1 p-4">
            <Text className={`text-xl mb-4 text-dark`}>Consulta CEP</Text>
            <TextInput
                className="border p-2 rounded mb-4"
                placeholder="Digite o CEP"
                value={cep}
                onChangeText={setCep}
            />
            <Button
                className="flex-row items-center bg-blend-darken"
                onPress={buscarCEP}
            >
                <SearchIcon size={16} color={colors.text} />
                <Text>Buscar</Text>
            </Button>

            {endereco && (
                <Card className="mt-4">
                    <CardContent>
                        <Text className={colors.text}>
                            Logradouro: {endereco.street}
                        </Text>
                        <Text className={colors.text}>
                            Bairro: {endereco.neighborhood}
                        </Text>
                        <Text className={colors.text}>
                            Cidade: {endereco.city}
                        </Text>
                        <Text className={colors.text}>
                            Estado: {endereco.state}
                        </Text>
                    </CardContent>
                </Card>
            )}
        </View>
    );
}

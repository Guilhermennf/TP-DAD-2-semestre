import * as React from "react";
import { View, FlatList } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent } from "~/components/ui/card";

type Banco = {
    code: number;
    name: string;
    ispb: string;
};

export function BancosScreen() {
    const [bancos, setBancos] = React.useState<Banco[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch("https://brasilapi.com.br/api/banks/v1")
            .then((response) => response.json())
            .then((data) => setBancos(data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View className="flex-1 p-4">
            <Text className="text-xl mb-4 text-dark">Lista de Bancos</Text>
            {loading ? (
                <Text className="text-dark">Carregando...</Text>
            ) : (
                <FlatList
                    data={bancos}
                    keyExtractor={(item) => item.code?.toString() || ""}
                    renderItem={({ item }) => (
                        <Card className="mb-2">
                            <CardContent>
                                <Text className="font-bold">{item.name}</Text>
                                <Text>Código: {item.code}</Text>
                                <Text>ISPB: {item.ispb}</Text>
                            </CardContent>
                        </Card>
                    )}
                />
            )}
        </View>
    );
}

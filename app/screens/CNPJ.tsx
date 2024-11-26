import * as React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent } from "~/components/ui/card";

type CNPJData = {
    razao_social: string;
    nome_fantasia: string;
    cnpj: string;
    situacao_cadastral: string;
    logradouro: string;
    numero: string;
    municipio: string;
    uf: string;
    cep: string;
};

export function CNPJScreen() {
    const [cnpj, setCnpj] = React.useState("");
    const [data, setData] = React.useState<CNPJData | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleSearch = async () => {
        if (cnpj.length !== 14) {
            setError("CNPJ deve ter 14 dígitos");
            return;
        }

        setLoading(true);
        setError("");
        setData(null);

        try {
            const response = await fetch(
                `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`
            );
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "CNPJ não encontrado");
            }

            setData(result);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Erro ao buscar CNPJ"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 p-4">
            <Text className="text-xl mb-4 text-dark">Consulta CNPJ</Text>

            <View className="flex-row mb-4">
                <TextInput
                    className="flex-1 h-10 border rounded-l px-2 bg-white text-dark"
                    placeholder="Digite o CNPJ (apenas números)"
                    value={cnpj}
                    onChangeText={setCnpj}
                    keyboardType="numeric"
                    maxLength={14}
                />
                <TouchableOpacity
                    className="bg-blue-500 px-4 rounded-r justify-center"
                    onPress={handleSearch}
                    disabled={loading}
                >
                    <Text className="text-white">Buscar</Text>
                </TouchableOpacity>
            </View>

            {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

            {loading ? <Text className="text-dark">Carregando...</Text> : null}

            {data ? (
                <Card className="mb-4">
                    <CardContent>
                        <Text className="font-bold text-lg mb-2">
                            {data.razao_social}
                        </Text>
                        <Text className="mb-1">
                            Nome Fantasia: {data.nome_fantasia}
                        </Text>
                        <Text className="mb-1">CNPJ: {data.cnpj}</Text>
                        <Text className="mb-1">
                            Situação: {data.situacao_cadastral}
                        </Text>
                        <Text className="mb-1">
                            Endereço: {data.logradouro}, {data.numero}
                        </Text>
                        <Text className="mb-1">
                            Cidade: {data.municipio} - {data.uf}
                        </Text>
                        <Text>CEP: {data.cep}</Text>
                    </CardContent>
                </Card>
            ) : null}
        </View>
    );
}

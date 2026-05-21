import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getMunicipios } from '../services/ibgeService';
import { Municipio, Estado } from '../types/ibge';

export default function MunicipiosScreen({ route }: any) {
  const { estado } = route.params as { estado: Estado };
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    getMunicipios(estado.sigla)
      .then(setMunicipios)
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;
  if (erro) return <Text style={styles.center}>{erro}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>📍 {estado.nome}</Text>
      <ScrollView nestedScrollEnabled={true} bounces={true}>
        {municipios.map((item) => (
          <View key={String(item.id)} style={styles.item}>
            <Text style={styles.nome}>{item.nome}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  center: { flex: 1, textAlign: 'center', marginTop: 100 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  item: { paddingVertical: 10, borderBottomWidth: 1, borderColor: '#ddd' },
  nome: { fontSize: 16 },
});

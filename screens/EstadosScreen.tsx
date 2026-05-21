import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { getEstados } from '../services/ibgeService';
import { Estado } from '../types/ibge';

export default function EstadosScreen({ navigation }: any) {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    getEstados()
      .then(setEstados)
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;
  if (erro) return <Text style={styles.center}>{erro}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Estados do Brasil 🇧🇷</Text>
      <ScrollView nestedScrollEnabled={true} bounces={true}>
        {estados.map((item) => (
          <TouchableOpacity
            key={String(item.id)}
            style={styles.item}
            onPress={() => navigation.navigate('Municipios', { estado: item })}
          >
            <Text style={styles.sigla}>{item.sigla}</Text>
            <Text style={styles.nome}>{item.nome}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 16 },
  center: { flex: 1, textAlign: 'center', marginTop: 100 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  item: { flexDirection: 'row', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderColor: '#ddd' },
  sigla: { fontWeight: 'bold', width: 40, color: '#2e7d32' },
  nome: { fontSize: 16 },
});
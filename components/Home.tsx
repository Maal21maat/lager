import { StyleSheet, Text, Image, ScrollView } from 'react-native';
import warehouse from '../assets/warehouse.jpg';
import Stock from './Stock.tsx';
import { Base, Typography } from '../styles';


export default function Home({route, products, setProducts}) {
  return (
    <ScrollView style={styles.base}>
      <Text style={styles.header}>Lager-Appen</Text>
      <Image source={warehouse} style={{ width: 300, height: 220, marginBottom: 28 }} />
      <Stock products={products} setProducts={setProducts}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  base: Base.base,
  header:Typography.header1,
});

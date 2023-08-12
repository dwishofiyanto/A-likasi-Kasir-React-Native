import React , { useState,setState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Modal from "react-native-modal";
// import { FlatGrid } from 'react-native-super-grid';

export default function Example() {
  const [data_produk, setItems] = useState([
    { nama_produk: 'sampo', harga_jual: 2000,jumlah:1, code: '#1abc9c' },
    {  nama_produk: 'sabun mandi', harga_jual: 40000,jumlah:1, code: '#2ecc71' },
    {  nama_produk: 'gula pasir',harga_jual: 2000,jumlah:1, code: '#3498db' },
   
  ]);

  function proses_input()
  {
    // let produk = setItems();
    // produk.push({
    //   nama_produk:'sssss',
    //   harga_jual:2,
    //   jumlah:1,
    //   code:2,
    // });
    // setItems({produk});
  }
  const [modal_input_penjualan, set_modal_input_penjualan] = useState(false);
  function tampilmodal()
  {
    set_modal_input_penjualan(true);
  }
  return (
    <View style={styles.contain}>
      <Text onPress={() => set_modal_input_penjualan(true)}>tambah  </Text>
      
      <FlatList
      itemDimension={130}
      data={data_produk}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
          <Text style={styles.itemName}>Nama Produk {item.nama_produk}</Text>
         
          <Text style={styles.itemCode}>{item.jumlah} X {item.harga_jual.toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.')}</Text>
        </View>
      )}
    />
     
     <Modal isVisible={modal_input_penjualan}>
        <View style={{ flex: 1, backgroundColor:'white' }}>
          <Text>I am the modal content!</Text>
          <Text onPress={() => proses_input()}>simpan</Text>
          <Text onPress={() => set_modal_input_penjualan(false)}>BATAL</Text>
        </View>
      </Modal>
      </View>
   
    
  );
}

const styles = StyleSheet.create({
  contain:
{
  flex:1,
},
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to register the user

import React, { useState } from 'react';
import {
  View,
  ScrollView,  StyleSheet,

  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const TambahProduk = ({ navigation }) => {
  let [nama_produk, set_nama_produk] = useState('');
  let [gambar, set_gambar] = useState('');
  let [barcode, set_barcode] = useState('');
  let [stok, set_stok] = useState('');
  let [harga_beli, set_harga_beli] = useState('');
  let [harga_jual, set_harga_jual] = useState('');

  let register_user = () => {
    //console.log(nama_produk, userContact, userAddress);

    if (!nama_produk) {
      alert('Masukkan Nama Produk');
      return;
    }
    
   
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO penjualan_detail ( id_penjualan,id_produk,harga_beli,harga_jual,jumlah,sub_total,tanggal) VALUES (?,?,?,?,?,?)',
        [nama_produk, gambar, barcode, stok, harga_beli, harga_jual],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Produk berhasil ditambahkan',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.push('LihatProduk'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Registration Failed');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>

              <Text style={styles.text}>Nama Produk</Text>
              <Mytextinput
                placeholder="Masukkan Nama Produk"
                onChangeText={
                  (nama_produk) => set_nama_produk(nama_produk)
                }
                style={{ padding: 10 }}
              />
              
              
              <Mybutton title="MASUKKAN" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'left',
            color: 'grey'
          }}>
          Example of SQLite Database in React Native
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TambahProduk;
const styles = StyleSheet.create({
text: {
  fontSize: 16,
  textAlign: 'left',
  color: 'black',
  marginTop: 16,
  marginLeft: 35,
  marginRight: 35,
}
});
// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import React, {useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'UserDatabase.db'});

const HomeScreen = ({navigation}) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='transaksi'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS transaksi', []);
            txn.executeSql(
<<<<<<< HEAD
              'CREATE TABLE IF NOT EXISTS penjualan(id INTEGER PRIMARY KEY AUTOINCREMENT, nama_pelanggan VARCHAR(20), total_item INT(10), total_harga INT(255), total_diskon INT(255), bayar VARCHAR(255), diterima VARCHAR(255), tanggal VARCHAR(255), jumlah VARCHAR(255))',
=======
              'CREATE TABLE IF NOT EXISTS transaksi(id INTEGER PRIMARY KEY AUTOINCREMENT, invoice VARCHAR(20), nama_pelanggan VARCHAR(255), total_harga INT(255), total_diskon INT(255), bayar VARCHAR(255), tanggal VARCHAR(255))',
>>>>>>> bf4cdb4e4db194f20abb3dc04190232a2844569f
              [],
            );
          }
        },
<<<<<<< HEAD
=======
      );
    });
  }, []);

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='transaksi_detail'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS transaksi_detail', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS transaksi_detail(id INTEGER PRIMARY KEY AUTOINCREMENT, id_transaksi INT(255), id_produk INT(255), harga_jual INT(255), harga_beli INT(255), jumlah INT(255), diskon INT(255), sub_total INT(255), tanggal VARCHAR(255))',
              [],
            );
          }
        },
>>>>>>> bf4cdb4e4db194f20abb3dc04190232a2844569f
      );
    });
  }, []);

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='produk'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS produk', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS produk(id INTEGER PRIMARY KEY AUTOINCREMENT, nama_produk VARCHAR(20),gambar VARCHAR(255), barcode VARCHAR(255),  stok INT(10), harga_beli VARCHAR(255), harga_jual VARCHAR(255), tanggal VACHAR(255),jumlah VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
<<<<<<< HEAD
          <Mytext text="KASIR PINTERR" />
=======
          <Mytext text="KASR SMART" />
>>>>>>> bf4cdb4e4db194f20abb3dc04190232a2844569f

          <Mybutton
            title=" KELOLA PRODUK"
            customClick={() => navigation.navigate('LihatProduk')}
          />
          <Mybutton
            title="TRANSAKSI PENJUALAN"
            customClick={() => navigation.navigate('DataPenjualan')}
          />

          <Mybutton
            title="TRANSAKSI"
            customClick={() => navigation.navigate('Transaksi')}
          />
          <Mybutton
            title="UPLOAD GAMBAR"
            customClick={() => navigation.navigate('UploadImage')}
          />

<<<<<<< HEAD
          {/* <Mybutton
=======
          <Mybutton
>>>>>>> bf4cdb4e4db194f20abb3dc04190232a2844569f
            title="KAMERA"
            customClick={() => navigation.navigate('Kamera')}
          />

          <Mybutton
            title="EXPORT"
            customClick={() => navigation.navigate('Export')}
<<<<<<< HEAD
          /> */}
=======
          />
>>>>>>> bf4cdb4e4db194f20abb3dc04190232a2844569f
        </View>
        {/* <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}>
          Example of SQLite Database in React Native
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
          www.aboutreact.com
        </Text> */}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

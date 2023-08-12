// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to update the user

import React, {useEffect, useState} from 'react';
import {useRef} from 'react';
// import {  TextInput } from 'react-native';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  TextInput,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
var db = openDatabase({name: 'UserDatabase.db'});

const EditProduk = ({route, navigation}) => {
  const scanner = useRef(null);
  const [scan, setScan] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setResult(null);
  }, []);

  const onSuccess = e => {
    setResult(e.data);
    set_barcode(e.data);
    setScan(false);
  };

  let params = route.params;
  let produk = params ? params.data : undefined;

  let [inputId, setId] = useState('');
  let [nama_produk, set_nama_produk] = useState('');
  let [gambar, set_gambar] = useState('');
  let [barcode, set_barcode] = useState('');
  let [stok, set_stok] = useState('');
  let [harga_beli, set_harga_beli] = useState('');
  let [harga_jual, set_harga_jual] = useState('');
  let ids = 8;
  useEffect(() => {
    if (produk) {
      setId(produk.id);
      set_nama_produk(produk.nama_produk);
      set_gambar(produk.gambar);
      set_barcode(produk.barcode);
      set_stok(produk.stok);
      set_harga_beli(produk.harga_beli);
      set_harga_jual(produk.harga_jual);
    }
  }, [produk]);

  let updateUser = () => {
    // console.log(id, nama_produk, harga_beli, stok);

    if (!nama_produk) {
      alert('Masukkan Nama Produk');
      return;
    }
    // if (!harga_beli) {
    //   alert('Masukkan Harga Beli');
    //   return;
    // }
    // if (!stok) {
    //   alert('Masukkan Stok Produk');
    //   return;
    // }
    if (barcode == '') {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE produk set nama_produk=?,gambar=?, barcode=?, stok=?, harga_beli=?,  harga_jual=? where id=?',
          [nama_produk, gambar, barcode, stok, harga_beli, harga_jual, inputId],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Produk berhasil diubah',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.push('LihatProduk'),
                  },
                ],
                {cancelable: false},
              );
            } else alert('Updation Failed');
          },
        );
      });
    }
    else
    {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM produk where barcode=?',
          [barcode],
          (tx, results_tampil) => {
            if (results_tampil.rows.length > 0) {
              db.transaction(tx => {
                tx.executeSql(
                  'UPDATE produk set nama_produk=?,gambar=?, stok=?, harga_beli=?,  harga_jual=? where id=?',
                  [nama_produk, gambar, stok, harga_beli, harga_jual, inputId],
                  (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                      Alert.alert(
                        'Success',
                        'Barcode tidak dapat diedit, karena sudah digunakan di produk ' +
                        results_tampil.rows.item(0).nama_produk,
                        [
                          {
                            text: 'Ok',
                            onPress: () => navigation.push('LihatProduk'),
                          },
                        ],
                        {cancelable: false},
                      );
                    } else alert('Updation Failed');
                  },
                );
              });
              //alert('Barcode sudah digunakan di produk'+results.rows.item[0]);
              // alert(
              //   'Barcode tidak dapat diedit, karena sudah digunakan di produk ' +
              //     results.rows.item(0).nama_produk,
              // );
            } else {
              db.transaction(tx => {
                tx.executeSql(
                  'UPDATE produk set nama_produk=?,gambar=?, barcode=?, stok=?, harga_beli=?,  harga_jual=? where id=?',
                  [nama_produk, gambar, barcode, stok, harga_beli, harga_jual, inputId],
                  (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                      Alert.alert(
                        'Success',
                        'Produk berhasil diubah',
                        [
                          {
                            text: 'Ok',
                            onPress: () => navigation.push('LihatProduk'),
                          },
                        ],
                        {cancelable: false},
                      );
                    } else alert('Updation Failed');
                  },
                );
              });
            }
          },
        );
      });
    }
   
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {!scan && (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Mybutton
            title="KEMBALI"
            customClick={() => navigation.push('LihatProduk')}
          />
          <View style={{flex: 1}}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <KeyboardAvoidingView
                behavior="padding"
                style={{flex: 1, justifyContent: 'space-between'}}>
                <Mytextinput
                  value={'' + inputId}
                  maxLength={10}
                  style={{padding: 10}}
                  keyboardType="numeric"
                />

                <Text style={styles.text}>Nama Produk</Text>
                <Mytextinput
                  placeholder="Masukkan Nama Produk"
                  value={'' + nama_produk}
                  onChangeText={nama_produk => set_nama_produk(nama_produk)}
                  style={{padding: 10}}
                />
                <Text style={styles.text}>Gambar Produk</Text>
                <Mytextinput
                  placeholder="Masukkan Gambar Produk"
                  value={'' + gambar}
                  onChangeText={gambar => set_gambar(gambar)}
                  style={{padding: 10}}
                />

                <Text style={styles.text}>Barcode Produk</Text>
                <Mytextinput
                  placeholder="Masukkan Barcode Produk"
                  value={'' + barcode}
                  onChangeText={barcode => set_barcode(barcode)}
                  style={{padding: 10}}
                />
                <TouchableOpacity onPress={() => setScan(true)}>
                  <Text>SCAN BARCODE</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Stok Produk</Text>
                <Mytextinput
                  placeholder="Masukkan Stok Produk"
                  value={'' + stok}
                  onChangeText={stok => set_stok(stok)}
                  keyboardType="numeric"
                  style={{padding: 10}}
                />

                <Text style={styles.text}>Harga Beli / Modal Produk</Text>
                <Mytextinput
                  placeholder="Masukkan Harga Beli / Modal Produk"
                  value={'' + harga_beli}
                  onChangeText={harga_beli => set_harga_beli(harga_beli)}
                  keyboardType="numeric"
                  style={{padding: 10}}
                />

                <Text style={styles.text}>Haga Jual Produk</Text>
                <Mytextinput
                  placeholder="Masukkan Harga Jual Produk"
                  value={'' + harga_jual}
                  onChangeText={harga_jual => set_harga_jual(harga_jual)}
                  keyboardType="numeric"
                  style={{padding: 10}}
                />
                <Mybutton title="SIMPAN PRODUK" customClick={updateUser} />
              </KeyboardAvoidingView>
            </ScrollView>
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
      )}

      
{scan && (
            <QRCodeScanner
              onRead={onSuccess}
              ref={scanner}
              // flashMode={RNCamera.Constants.FlashMode.torch}
              reactivate={true}
              showMarker={true}
              //   cameraStyle={{ width: 200, alignSelf:'center'}}
              bottomContent={
                <View>
                  <TouchableOpacity
                    style={styles.buttonTouchable}
                    onPress={() => scanner.current.reactive()}>
                    <Text style={styles.buttonText}>OK. Got it!</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setScan(false)}>
                    <Text>Batal</Text>
                  </TouchableOpacity>
                </View>

                //   <TouchableOpacity style={styles.buttonTouchable}>
                //   <Text style={styles.buttonText}>OK. Got it!</Text>
                // </TouchableOpacity>
              }
            />
          )}
    </SafeAreaView>
  );
};

export default EditProduk;

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    color: 'black',
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
});

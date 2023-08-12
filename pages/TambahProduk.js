// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to register the user
import {useEffect, useRef} from 'react';
import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
var db = openDatabase({name: 'UserDatabase.db'});

const TambahProduk = ({navigation}) => {
  let [nama_produk, set_nama_produk] = useState('');
  let [gambar, set_gambar] = useState('');
  let [barcode, set_barcode] = useState('');
  let [stok, set_stok] = useState('');
  let [harga_beli, set_harga_beli] = useState('');
  let [harga_jual, set_harga_jual] = useState('');

  const scanner = useRef(null);
  const [scan, setScan] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setResult(null);
  }, []);

  const onSuccess = e => {
    const check = e.data.substring(0, 4);
    setScan(false);
    if (check === 'http') {
     
      alert('Kode Barcode Harus Angka');
    } else {
      setResult(e.data);
      set_barcode(e.data);
    }
   
   
  };

  let register_user = () => {
    //console.log(nama_produk, userContact, userAddress);

    if (!nama_produk) {
      alert('Masukkan Nama Produk');
      return;
    }
    if (!stok) {
      alert('Masukkan Stok Produk ');
      return;
    }
    if (!harga_beli) {
      alert('Masukkan Harga Beli / Modal Produk');
      return;
    }
    if (!harga_jual) {
      alert('Masukkan Harga Jual Produk');
      return;
    }

    if (barcode == '') {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO produk ( nama_produk,gambar,barcode,stok,harga_beli,harga_jual,jumlah) VALUES (?,?,?,?,?,?,?)',
          [
            nama_produk,
            gambar,
            barcode,
            stok,
            harga_beli,
            harga_jual,
            0,
          ],
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
                {cancelable: false},
              );
            } else alert('Registration Failed');
          },
        );
      });
    } else {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM produk where barcode=?',
          [barcode],
          (tx, results) => {
            if (results.rows.length > 0) {
              //alert('Barcode sudah digunakan di produk'+results.rows.item[0]);
              alert(
                'Barcode sudah digunakan di produk ' +
                  results.rows.item(0).nama_produk,
              );
            } else {
              db.transaction(function (tx) {
                tx.executeSql(
                  'INSERT INTO produk ( nama_produk,gambar,barcode,stok,harga_beli,harga_jual,jumlah) VALUES (?,?,?,?,?,?,?)',
                  [
                    nama_produk,
                    gambar,
                    barcode,
                    stok,
                    harga_beli,
                    harga_jual,
                    0,
                  ],
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
                        {cancelable: false},
                      );
                    } else alert('Registration Failed');
                  },
                );
              });
            }
          },
        );
      });
    }

    // db.transaction(function (tx) {
    //   tx.executeSql(
    //     'INSERT INTO produk ( nama_produk,gambar,barcode,stok,harga_beli,harga_jual,jumlah) VALUES (?,?,?,?,?,?,?)',
    //     [nama_produk, gambar, barcode, stok, harga_beli, harga_jual, 0],
    //     (tx, results) => {
    //       console.log('Results', results.rowsAffected);
    //       if (results.rowsAffected > 0) {
    //         Alert.alert(
    //           'Success',
    //           'Produk berhasil ditambahkan',
    //           [
    //             {
    //               text: 'Ok',
    //               onPress: () => navigation.push('LihatProduk'),
    //             },
    //           ],
    //           {cancelable: false},
    //         );
    //       } else alert('Registration Failed');
    //     },
    //   );
    // });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          {!scan && (
            <ScrollView keyboardShouldPersistTaps="handled">
              <KeyboardAvoidingView
                behavior="padding"
                style={{flex: 1, justifyContent: 'space-between'}}>
                <Text style={styles.text}>Nama Produk</Text>
                <Mytextinput
                  placeholder="Masukkan Nama Produk"
                  onChangeText={nama_produk => set_nama_produk(nama_produk)}
                  style={{padding: 10}}
                />

                <Text style={styles.text}>Gambar Produk</Text>
                <Mytextinput
                  placeholder="Masukkan Gambar Produk"
                  onChangeText={gambar => set_gambar(gambar)}
                  style={{padding: 10}}
                />

                <Text style={styles.text}>Barcode Produk</Text>
                <Mytextinput
                  placeholder="Masukkan Barcode Produk"
                  value={barcode}
                  onChangeText={barcode => set_barcode(barcode)}
                  style={{padding: 10}}
                />
                <TouchableOpacity onPress={() => setScan(true)}>
                  <Text>SCAN BARCODE</Text>
                </TouchableOpacity>

                <Text style={styles.text}>Stok Produk</Text>
                <Mytextinput
                  placeholder="Masukkan Stok Produk"
                  onChangeText={stok => set_stok(stok)}
                  maxLength={10}
                  keyboardType="numeric"
                  style={{padding: 10}}
                />

                <Text style={styles.text}>Harga Beli / Modal Produk</Text>
                <Mytextinput
                  placeholder="Masukkan Harga Beli/Modal Produk"
                  onChangeText={harga_beli => set_harga_beli(harga_beli)}
                  maxLength={10}
                  keyboardType="numeric"
                  style={{padding: 10}}
                />

                <Text style={styles.text}>Haga Jual Produk</Text>
                <Mytextinput
                  placeholder="Masukkan Harga Jual Produk"
                  onChangeText={harga_jual => set_harga_jual(harga_jual)}
                  maxLength={10}
                  keyboardType="numeric"
                  style={{padding: 10}}
                />

                <Mybutton title="Submit" customClick={register_user} />
              </KeyboardAvoidingView>
            </ScrollView>
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
        </View>
        {/* <Text
          style={{
            fontSize: 18,
            textAlign: 'left',
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

export default TambahProduk;
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    textAlign: 'left',
    color: 'black',
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
});

import React, {Component, component, useState, Fragment} from 'react';
// import React, {} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import Mytextinput from './components/Mytextinput';
import {
  faArrowLeft,
  faBarcode,
  faCircleArrowLeft,
  faFastBackward,
  faLeftLong,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
  TextInput,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {SimpleGrid} from 'react-native-super-grid';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {openDatabase} from 'react-native-sqlite-storage';
import Modal from 'react-native-modal';
var db = openDatabase({name: 'UserDatabase.db'});
// const pindah = ({ navigation }) => {

//   };
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProduk: [],

      dataPesanan: [],
      sub_total: 0,
      nomor_urut: 0,
      bayar: 0,
      kembali: 0,
      kembali_fix: 0,
      kurang: 0,
      modal_input_penjualan: false,
      modal_input_bayar: false,
      scan: false,
      ScanResult: false,
      result: null,
    };
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM produk', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          dataProduk: temp,
        });
      });
    });
  }
  // const [modal_input_penjualan, set_modal_input_penjualan] = useState(false);
  // function tampilmodal()
  // {
  //   set_modal_input_penjualan(true);
  // }

  onSuccess = e => {
    const check = e.data.substring(0, 4);
    // console.log('scanned data' + check);
    this.setState({
      result: e.data,
      scan: false,
      ScanResult: true,
    });
    if (check === 'http') {
      // Linking.openURL(e.data).catch(err =>
      //   console.error('An error occured', err), );
      alert('Kode Barcode Harus Angka');
    } else {
      let dataProduk = this.state.dataProduk;
      let dataPesanan = this.state.dataPesanan;
      let ketemu = 0;
      let nomor_urut = this.state.nomor_urut;
      var item_pesanan = dataPesanan.find(item => item.barcode === e.data);
      var item_produk = dataProduk.find(item => item.barcode === e.data);
      if (item_produk == null) {
        //jika belum tedaftar
        alert('blm terdaftar');
      } else {
        //jika ada di produk
        if (item_pesanan == null) {
          nomor_urut++;

          dataPesanan.push({
            barcode: item_produk.barcode,
            gambar: item_produk.gambar,
            harga_beli: item_produk.harga_beli,
            harga_jual: item_produk.harga_jual,
            id: item_produk.id,
            jumlah: item_produk.jumlah,
            nama_produk: item_produk.nama_produk,
            stok: item_produk.stok,
            tanggal: item_produk.tanggal,
            nomor_urut: nomor_urut,
          });
          dataPesanan[dataPesanan.length - 1].jumlah++;
          dataPesanan[dataPesanan.length - 1].nomor_urut++;

          ketemu = 0;
        } else {
          item_pesanan.jumlah++;

          ketemu = 1;
        }
        this.setState({dataPesanan});
        this.setState({nomor_urut});

        let sub_total = 0;
        for (let i = 0; i < dataPesanan.length; i++) {
          sub_total += dataPesanan[i].jumlah * dataPesanan[i].harga_jual;
          //sub_total = sub_total
        }
        this.setState({sub_total});
      }
      this.setState({
        result: e.data,
        scan: false,
        ScanResult: true,
      });
    }
  };
  activeQR = () => {
    this.setState({
      scan: true,
    });
  };
  scanAgain = () => {
    this.setState({
      scan: true,
      ScanResult: false,
    });
  };

  tampil_modal() {
    this.setState({modal_input_penjualan: true});
  }
  tampil_modal_input_bayar() {
    this.setState({modal_input_bayar: true});
  }

  componentDidMount() {
    let sub_total = this.state.sub_total;
    let dataProduk = this.state.dataProduk;
    console.log(dataProduk);
    for (let i = 0; i < dataProduk.length; i++) {
      sub_total = dataProduk[i].jumlah * dataProduk[i].harga_jual;
    }
    console.log(sub_total);
  }

  tambahPesanan1 = index => {
    let dataProduk = this.state.dataProduk;
    let dataPesanan = this.state.dataPesanan;
    let ketemu = 0;
    let nomor_urut = this.state.nomor_urut;
    var item_pesanan = dataPesanan.find(item => item.id === index);
    var item_produk = dataProduk.find(item => item.id === index);
    if (item_pesanan == null) {
      nomor_urut++;

      dataPesanan.push({
        barcode: item_produk.barcode,
        gambar: item_produk.gambar,
        harga_beli: item_produk.harga_beli,
        harga_jual: item_produk.harga_jual,
        id: item_produk.id,
        jumlah: item_produk.jumlah,
        nama_produk: item_produk.nama_produk,
        stok: item_produk.stok,
        tanggal: item_produk.tanggal,
        nomor_urut: nomor_urut,
      });
      dataPesanan[dataPesanan.length - 1].jumlah++;
      dataPesanan[dataPesanan.length - 1].nomor_urut++;

      ketemu = 0;
    } else {
      item_pesanan.jumlah++;

      ketemu = 1;
    }
    this.setState({dataPesanan});
    this.setState({nomor_urut});

    let sub_total = 0;
    for (let i = 0; i < dataPesanan.length; i++) {
      sub_total += dataPesanan[i].jumlah * dataPesanan[i].harga_jual;
      //sub_total = sub_total
    }
    this.setState({sub_total});
    this.setState({modal_input_penjualan: false});
  };

  tambahPesanan2 = index => {
    let dataPesanan = this.state.dataPesanan;
    var item = dataPesanan.find(item => item.id === index);
    console.log(item);
    item.jumlah++;
    this.setState({item});

    let sub_total = 0;
    for (let i = 0; i < dataPesanan.length; i++) {
      sub_total += dataPesanan[i].jumlah * dataPesanan[i].harga_jual;
      //sub_total = sub_total
    }
    this.setState({sub_total});
  };
  hapusPesanan = index => {
    let dataPesanan = this.state.dataPesanan;
    const item_hapus = this.state.dataPesanan.find(item => item.id === index);

    dataPesanan.splice(
      dataPesanan.findIndex(a => a.id === item_hapus.id),
      1,
    );
    this.setState({dataPesanan});

    let sub_total = 0;
    for (let i = 0; i < dataPesanan.length; i++) {
      sub_total += dataPesanan[i].jumlah * dataPesanan[i].harga_jual;
    }
    this.setState({sub_total});
  };
  kurangiPesanan = index => {
    let dataPesanan = this.state.dataPesanan;
    const item_hapus = this.state.dataPesanan.find(item => item.id === index);
    //var dataPesanan =  this.state.dataPesanan.find(item => item.id === index);
    // console.log(dataPesanan)
    if (item_hapus.jumlah > 1) {
      item_hapus.jumlah--;
      this.setState({item_hapus});
      // dataProduk[index].jumlah--;
    } else {
      dataPesanan.splice(
        dataPesanan.findIndex(a => a.id === item_hapus.id),
        1,
      );
      this.setState({dataPesanan});
    }

    let sub_total = 0;
    for (let i = 0; i < dataPesanan.length; i++) {
      sub_total += dataPesanan[i].jumlah * dataPesanan[i].harga_jual;
    }
    this.setState({sub_total});
  };

  kurangiPesanan2 = index => {
    // let dataProduk = this.state.dataProduk;
    let dataPesanan = this.state.dataPesanan;
    console.log(dataPesanan[index]);
    if (dataPesanan[index].jumlah > 1) {
      dataPesanan[index].jumlah--;
      // dataProduk[index].jumlah--;
    } else {
      dataPesanan.splice(index, 1);
    }
    this.setState({dataPesanan});

    let sub_total = 0;
    for (let i = 0; i < dataPesanan.length; i++) {
      sub_total += dataPesanan[i].jumlah * dataPesanan[i].harga_jual;
    }
    this.setState({sub_total});
  };

  render() {
    // const {text, setText} = useState('');
    const {scan, ScanResult, result} = this.state;

    const desccription =
      'QR code (abbreviated from Quick Response Code) is the trademark for a type of matrix barcode (or two-dimensional barcode) first designed in 1994 for the automotive industry in Japan. A barcode is a machine-readable optical label that contains information about the item to which it is attached. In practice, QR codes often contain data for a locator, identifier, or tracker that points to a website or application. A QR code uses four standardized encoding modes (numeric, alphanumeric, byte/binary, and kanji) to store data efficiently; extensions may also be used.';

    return (
      <View style={{flex: 1}}>
        {!scan && (
          // <Text>
          //   {result && <Text>{JSON.stringify(result, null, 2)}</Text>}
          //   <TouchableOpacity
          //     onPress={this.scanAgain}
          //     style={styles.buttonTouchable}>

          //   </TouchableOpacity>

          // </Text>

          <View style={styles.container}>
            <View style={styles.rowm}>
              <View style={[styles.boxm, styles.box2m]}>
                <Text
                  onPress={() => this.props.navigation.navigate('HomeScreen')}>
                  {' '}
                  <FontAwesomeIcon
                    icon={faCircleArrowLeft}
                    color={'skyblue'}
                    size={25}
                  />
                </Text>
              </View>
              <View style={[styles.boxm, styles.box3m]}>
                {/* {result &&  <Text>R{result.data}</Text>} */}

                <TextInput
                  placeholder="Barcode"
                  keyboardType="numeric"
                  value={this.state.result}
                  style={{
                    padding: 5,
                    borderColor: 'skyblue',
                    borderRadius: 15,
                    borderWidth: 1,
                  }}
                />
              </View>
              <View style={[styles.boxm, styles.twom]}>
                <View style={[styles.boxm, styles.isi_twom]}>
                  <TouchableOpacity
                    style={styles.btnTambah}
                    onPress={this.scanAgain}>
                    <FontAwesomeIcon
                      icon={faBarcode}
                      size={20}
                      color={'white'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnTambah}
                    onPress={() =>
                      this.setState({modal_input_penjualan: true})
                    }>
                    <FontAwesomeIcon icon={faPlus} size={20} color={'white'} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.list_produk}>
              <FlatList
                data={this.state.dataPesanan
                  .slice()
                  .sort((a, b) => b.nomor_urut - a.nomor_urut)}
                renderItem={({item, index}) => (
                  <View style={styles.row}>
                    <View style={[styles.box2]}>
                      <Image
                        style={{width: '100%', height: '100%'}}
                        resizeMode={'stretch'}
                        source={{
                          uri: 'https://www.bhinneka.com/_next/image?url=https%3A%2F%2Fstatic.bmdstatic.com%2Fgk%2Fproduction%2Fa21b5a8e3d5dec5a8ee674cb73beac89.jpg&w=64&q=75',
                        }}
                      />
                    </View>
                    <View style={[styles.box, styles.two]}>
                      <Text>{item.nama_produk}</Text>
                      <Text>
                        {'Rp ' +
                          item.harga_jual
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
                          ' x ' +
                          item.jumlah}
                      </Text>
                      <Text>
                        Total Harga :{' '}
                        {(item.harga_jual * item.jumlah)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          borderWidth: 2,
                          borderColor: 'skyblue',
                        }}>
                        <TouchableOpacity style={{flex: 1}}
                        onPress={() => this.kurangiPesanan2(item.id)}
                        >
                          <Text>-</Text>
                        </TouchableOpacity>
                        <Text style={{flex: 1}}>{item.jumlah}</Text>
                        <TouchableOpacity
                          style={{flex: 1}}
                          onPress={() => this.tambahPesanan2(item.id)}>
                          <Text>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={[styles.box, styles.box3]}>
                      <View></View>
                      <View style={{marginTop: 10}}>
                        <Text onPress={() => this.hapusPesanan(item.id)}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            color={'skyblue'}
                            size={25}
                          />
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>

            <Modal
              isVisible={this.state.modal_input_penjualan}
              style={styles.modal}>
              <View>
                <FlatList
                  data={this.state.dataProduk
                    .slice()
                    .sort((a, b) => a.harga_jual - b.harga_jual)}
                  renderItem={({item, index}) => (
                    <View>
                      <Text>{item.nama_produk}</Text>
                      <Text>
                        {item.harga_jual
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      </Text>

                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{flex: 1}}>
                          <Text>-</Text>
                        </TouchableOpacity>
                        <Text style={{flex: 1}}>{item.jumlah}</Text>
                        <TouchableOpacity
                          style={{flex: 1}}
                          onPress={() => this.tambahPesanan1(item.id)}>
                          <Text>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
                <Text onPress={() => proses_input()}>simpan</Text>
                <Text
                  onPress={() => this.setState({modal_input_penjualan: false})}>
                  BATAL
                </Text>
              </View>
            </Modal>
            <Modal
              isVisible={this.state.modal_input_bayar}
              style={styles.modal}>
              <View>
                <FlatList
                  data={this.state.dataPesanan
                    .slice()
                    .sort((a, b) => a.harga_jual - b.harga_jual)}
                  renderItem={({item, index}) => (
                    <View>
                      <Text>{item.nama_produk}</Text>
                      <Text>
                        {'Rp ' +
                          item.harga_jual
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
                          ' x ' +
                          item.jumlah +
                          ' Rp ' +
                          (item.harga_jual * item.jumlah)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      </Text>
                    </View>
                  )}
                />
                <Text>TOTAL {this.state.sub_total}</Text>
                <Text>Nama Pembeli</Text>
                <TextInput
                  placeholder="Nama Pembeli"
                  style={{
                    padding: 5,
                    borderColor: 'skyblue',
                    borderRadius: 15,
                    borderWidth: 1,
                  }}
                />
                <Text>Bayar</Text>
                <TextInput
                  placeholder="Input Bayar"
                  keyboardType="numeric"
                  value={
                    '' +
                    this.state.bayar
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                  }
                  onChangeText={e => {
                    var bayar = e.replace(/[^a-zA-Z0-9 ]/g, '');
                    kembali = bayar - this.state.sub_total;
                    kurang = bayar - this.state.sub_total;
                    if (kembali < 0) {
                      this.setState({kembali: 0});
                    } else {
                      this.setState({kembali});
                    }
                    if (kurang > 0) {
                      this.setState({kurang: 0});
                    } else {
                      this.setState({kurang});
                    }
                   

                    this.setState({bayar: bayar});

                    
                  }}
                  style={{
                    padding: 5,
                    borderColor: 'skyblue',
                    borderRadius: 15,
                    borderWidth: 1,
                  }}
                />
                <Text>Kembali</Text>
                <TextInput
                  keyboardType="numeric"
                  value={
                    '' +
                    this.state.kembali
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                  }
                  style={{
                    padding: 5,
                    borderColor: 'skyblue',
                    borderRadius: 15,
                    borderWidth: 1,
                  }}
                />
                <Text>
                  Kurang{' '}
                  {this.state.kurang
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </Text>
                <Text onPress={() => proses_input()}>simpan</Text>
                <Text onPress={() => this.setState({modal_input_bayar: false})}>
                  BATAL
                </Text>
              </View>
            </Modal>
            <Button
              color={'blue'}
              onPress={() =>
                this.tampil_modal_input_bayar(this.state.dataPesanan)
              }
              title={
                'BAYAR Rp ' +
                this.state.sub_total
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
              }
            />
          </View>
        )}
        {scan && (
          <QRCodeScanner
            onRead={this.onSuccess}
            ref={node => {
              this.scanner = node;
            }}
            // flashMode={RNCamera.Constants.FlashMode.torch}
            reactivate={true}
            showMarker={true}
            //   cameraStyle={{ width: 200, alignSelf:'center'}}
            bottomContent={
              <View>
                <TouchableOpacity
                  style={styles.buttonTouchable}
                  onPress={() => this.scanner.reactivate()}>
                  <Text style={styles.buttonText}>OK. Got it!</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({scan: false})}>
                  <Text>Batal</Text>
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </View>
    );
  }
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  containerm: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 100,
  },
  rowm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  boxm: {
    flex: 1,
  },
  box2m: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box3m: {
    flex: 3,
    marginLeft: 5,
    marginRight: 5,
  },
  twom: {
    fleX: 1,
    // justifyContent: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  isi_twom: {
    flexDirection: 'row',
    // flex: 0,
  },
  list_produk: {
    flex: 1,
    marginTop: 5,
  },
  row: {
    margin: 5,
    borderColor: 'skyblue',
    borderWidth: 2,

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

    borderRadius: 10,
    marginBottom: 15,
  },
  box: {
    flex: 1,
  },
  box2: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    // width: '15%',
    width: 100,
    margin: 5,
  },

  box3: {
    // backgroundColor: 'blue',
    flexDirection: 'column',
    flex: 0,
    // justifyContent: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  two: {
    flex: 2,
    margin: 5,
  },
  modal: {
    backgroundColor: 'white',
    margin: 0, // This is the important style you need to set
    alignItems: undefined,
    justifyContent: undefined,
  },
  btnTambah: {
    margin: 1,
    padding: 10,
    backgroundColor: 'skyblue',
    borderRadius: 5,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    elevation: 5,
  },

  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

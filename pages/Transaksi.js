import React, {Component, component} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
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
      id_transaksi:null,
      invoice:0,
      dataPesanan: [],
      sub_total: 0,
      nomor_urut: 0,
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

    db.transaction(tx => {
      tx.executeSql('SELECT * from transaksi order by id desc limit 1', [], 
      (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          id_transaksi: temp,
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
    var data_invoice = this.state.id_transaksi;
    if(data_invoice == "")
    {
      this.setState({invoice: 1});
     
    }
    else
    {
      var item_produk = data_invoice.find(item => item.id >= 0);
    var nomor_invoice = item_produk.id + 1;
    this.setState({invoice: nomor_invoice});
  
    }
   // var item_produk = dataProduk.find(item => item.barcode === e.data);
   
    this.setState({modal_input_bayar: true});
    //console.log(this.state.invoice);
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
  onDeleteBTN () {
   console.log('ok');
}
  proses_input () {
   // alert('pross');
   var invoice = this.state.invoice;
   var nama_pembeli = this.state.nama_pembeli;
   var total_harga = this.state.sub_total;
   var bayar = this.state.bayar;
  //  this.state = {pesan:"pertama default"};
  //  var pesan = 10;
  //  var [state, setState] = usestate("old value");
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO transaksi ( id,invoice,nama_pelanggan,total_harga,total_diskon,bayar,tanggal) VALUES (?,?,?,?,?,?,?)',
        [
          invoice,
          invoice,
          nama_pembeli,
          total_harga,
          0,
          bayar,
          3,
          
        ],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
         
          // if (results.rowsAffected > 0) {
          //   this.setState({pesan: "prosws simpan nota berhasil"});
          // } else 
          // {
          //   this.setState({pesan: "prosws simpan nota berhasil"});
          // }
          var temp = 9
          this.setState({pesan: temp,});
          // this.setState({
          //   id_transaksi: temp,
          // });
        },
      );
      
    });
 
    // this.setState({pesan: "prosws simpan nota berhasil"})
    this.setState({modal_input_bayar: false});
    this.setState({modal_nota: true});
   //  console.log(this.state.count);
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
        <FlatGrid
          itemDimension={130}
          data={this.state.dataProduk
            .slice()
            .sort((a, b) => a.harga_jual - b.harga_jual)}
          // data={this.state.dataProduk}

          renderItem={({item, index}) => (
            <View>
              {/* <Text>{index}</Text> */}
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
        <Text onPress={() => this.props.navigation.navigate('HomeScreen')}>
          KEMBALI
        </Text>
        <Text>Data Pesanan</Text>
        {/* arrayContoh.slice().sort((a, b) => b.like - a.like) */}
        <FlatList
          itemDimension={130}
          // data={this.state.dataPesanan}
          data={this.state.dataPesanan
            .slice()
            .sort((a, b) => b.nomor_urut - a.nomor_urut)}
          renderItem={({item, index}) => (
            <View>
              {/* <Text>{index}</Text> */}
              <Text>{item.nama_produk}</Text>
              <Text>
                {item.harga_jual
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </Text>
              <Text>{index}</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => this.kurangiPesanan(item.id)}>
                  <Text>-</Text>
                </TouchableOpacity>
                <Text style={{flex: 1}}>{item.jumlah}</Text>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => this.tambahPesanan2(item.id)}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
              <Text>
                Total Harga :{' '}
                {(item.harga_jual * item.jumlah)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </Text>
            </View>
          )}
        />
        <Text>
          Sub totoal{' '}
          {this.state.sub_total
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
        </Text>
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

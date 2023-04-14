import React, {Component, component} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {SimpleGrid} from 'react-native-super-grid';
import {openDatabase} from 'react-native-sqlite-storage';
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

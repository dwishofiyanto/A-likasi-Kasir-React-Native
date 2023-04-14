// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to view all the user*/

import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFastBackward, faPlus} from '@fortawesome/free-solid-svg-icons';
// import {faBack} from '@fortawesome/free-solid-svg-icons';
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';
import {
  FlatList,
  Image,
  Text,
  View,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Mybutton,
  StyleSheet,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
// import Mybutton from './components/Mybutton';
import XLSX from 'xlsx';
import {faBackwardStep} from '@fortawesome/free-solid-svg-icons';

var db = openDatabase({name: 'UserDatabase.db'});
// const RegisterUser = ({ navigation }) => {
const DataProduk = ({route, navigation}) => {
  const DeleteUser = ({navigation}) => {
    Alert('ha');
  };

  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM produk order by id desc',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        },
      );
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: '#808080',
        }}
      />
    );
  };

  const Hapus = id => {
    //let [inputUserId, setInputUserId] = useState('');

    db.transaction(tx => {
      tx.executeSql('DELETE FROM  produk where id=?', [id], (tx, results) => {
        // alert( results.rowsAffected)
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'Data produk berhasil dihapus',
            [
              {
                text: 'Ok',
                onPress: () => navigation.push('LihatProduk'),
              },
            ],
            {cancelable: false},
          );
        } else {
          alert('Gagal hapus produk');
        }
      });
    });
  };
  let listItemView = item => {
    return (
      // <View style={styles.container}>
      //   <View>
      //     <Text style={styles.nama}  onPress={() => navigation.push('EditProduk', {data:item})}>{item.nama_produk}</Text>
      //     <Text style={styles.noHP}>Stok : {item.stok}</Text>
      //     <Text style={styles.noHP}>Harga Beli : {item.harga_beli}</Text>
      //     <Text style={styles.noHP}>Harga Jual : {item.harga_jual}</Text>
      //     <Text>EDIT</Text>
      //   </View>
      //   <View style={styles.icon}>
      //     <Text onPress={() => navigation.push('EditProduk', {data:item})}>
      //       <FontAwesomeIcon icon={faEdit} color={'orange'} size={25}/>
      //    </Text>
      //    <Text onPress={() => Hapus(item.id)}>
      //    <FontAwesomeIcon icon={faTimes} color={'red'} size={25}/>
      //    </Text>

      //   </View>
      // </View>
      <View style={styles.row}>
        <View style={[styles.box, styles.box2]}>
          <Image
            style={{width: 100, height: 100}}
            resizeMode={'stretch'}
            source={{
              uri: 'https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
          />
        </View>
        <View style={[styles.box, styles.two]}>
          <Text style={styles.nama}>{item.nama_produk}</Text>
          <Text>Stok : {item.stok}</Text>
          <Text>Harga Beli : {item.harga_beli}</Text>
          <Text>Harga Jual : {item.harga_jual}</Text>
        </View>
        <View style={[styles.box, styles.box3]}>
          <Text onPress={() => navigation.push('EditProduk', {data: item})}>
            <FontAwesomeIcon icon={faEdit} color={'orange'} size={25} />
          </Text>
          <Text onPress={() => Hapus(item.id)}>
            <FontAwesomeIcon icon={faTimes} color={'red'} size={25} />
          </Text>
        </View>
      </View>
    );
  };

  return (
    // <View style={{ flex: 1, backgroundColor: '' }}>

    //     <Text  onPress={() => navigation.push('HomeScreen')}>KEMBALI</Text>
    //     <View style={styles.header}>
    //       <Text style={styles.title}>Daftar poduk</Text>
    //       <View style={styles.garis} />
    //     </View>

    //   <View style={styles.list_produk}>
    //     <FlatList
    //         data={flatListItems}
    //         ItemSeparatorComponent={listViewItemSeparator}
    //         keyExtractor={(item, index) => index.toString()}
    //         renderItem={({ item }) => listItemView(item)}
    //       />
    //   </View>

    //   <View style={styles.wrapperButton}>
    //       <TouchableOpacity style={styles.btnTambah} onPress={() => navigation.navigate('Registerp')}>
    //         <FontAwesomeIcon icon={faPlus} size={20} color={'white'}/>
    //       </TouchableOpacity>
    //   </View>
    // </View>
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <Text style={{ }}>HEADER</Text> */}
          <View style={[styles.box_header, styles.box_header2]}>
            <Text onPress={() => navigation.push('HomeScreen')}>
              {' '}
              <FontAwesomeIcon
                icon={faBackwardStep}
                color={'orange'}
                size={25}
              />
            </Text>
          </View>
          <View style={[styles.box_header, styles.box_header1]}>
            <Text>DAFTAR PRODUK</Text>
          </View>
        </View>

        <View style={styles.list_produk}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
          />
        </View>
      </View>
      <View style={styles.wrapperButton}>
        <TouchableOpacity
          style={styles.btnTambah}
          onPress={() => navigation.navigate('Registerp')}>
          <FontAwesomeIcon icon={faPlus} size={20} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DataProduk;

const styles = StyleSheet.create({
  // page: {
  //   flex: 1,
  // },
  // header: {
  //   paddingHorizontal: 30,
  //   paddingTop: 30,
  // },
  // list_produk:{
  //   paddingHorizontal: 5,

  // },
  // title: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  // garis: {
  //   borderWidth: 1,
  //   marginTop: 10,
  // },
  // wrapperButton: {
  //   flex: 1,
  //   position: 'absolute',
  //   bottom: 0,
  //   right: 0,
  //   margin: 30,
  // },
  // btnTambah: {
  //   padding: 20,
  //   backgroundColor: 'skyblue',
  //   borderRadius: 30,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,

  //   elevation: 5,
  // },

  // container: {
  //   flexDirection: 'row',
  //   padding: 15,
  //   backgroundColor: 'white',
  //   borderRadius: 5,
  //   marginBottom: 20,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,

  //   elevation: 5,
  // },
  // nama: {
  //   fontWeight: 'bold',
  //   fontSize: 16,
  // },
  // noHP: {
  //   fontSize: 12,
  //   color: 'gray',
  // },
  // icon: {
  //   flexDirection: 'column',
  //   flex: 1,
  //   // justifyContent: 'flex-end',
  //   justifyContent: 'center',
  //   alignItems: 'center',

  // },
  nama: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    height: 40,

    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: '#a9a9a9',
    zIndex: 10,
  },
  list_produk: {
    flex: 1,
    marginTop: 50,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

    backgroundColor: '#f5fffa',
    borderRadius: 5,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  box_header: {
    flex: 5,
    height: 40,
    backgroundColor: '#a9a9a9',
    textAlign: 'center',
    color: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    flex: 1,
    // height: 100,
    // backgroundColor: 'red',
  },
  box2: {
    // backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box_header2: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    borderBottomLeftRadius: 15,
  },
  box_header1: {
    borderBottomRightRadius: 15,
  },
  box3: {
    // backgroundColor: 'blue',
    flexDirection: 'column',
    flex: 0,
    // justifyContent: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  two: {
    flex: 2,
  },

  wrapperButton: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 30,
  },
  btnTambah: {
    padding: 20,
    backgroundColor: 'skyblue',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

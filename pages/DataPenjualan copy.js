// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to view all the user*/

import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faFastBackward, faPlus} from '@fortawesome/free-solid-svg-icons';
// import {faBack} from '@fortawesome/free-solid-svg-icons';
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';
import { FlatList,Image,TextInput,Button, Text, View, SafeAreaView, Alert, TouchableOpacity, Mybutton,StyleSheet } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
// import Mybutton from './components/Mybutton';
import XLSX from 'xlsx';
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
// import {DatePicker} from 'react-native-datepicker';
var db = openDatabase({ name: 'UserDatabase.db' });
// const RegisterUser = ({ navigation }) => {
const DataPenjualan = ({route, navigation }) => {


  const [datePicker, setDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  function showDatePicker() {
    setDatePicker(true);
  };

 

  function onDateSelected(event, value) {
    
    setDate(value);
    setTime(time);
    setDatePicker(false);
  };





 
// let [date, setDate] = useState('');
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM produk order by id desc',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
         
          width: '100%',
          backgroundColor: '#808080'
        }}
      />
    );
  };

  const Hapus = (id) => {
   ;
    //let [inputUserId, setInputUserId] = useState('');

  
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM  produk where id=?',
         [id],
          (tx, results) => {
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
                { cancelable: false }
              );
            } else {
             alert('Gagal hapus produk');
            }
          }
        );
      });
  
  }
  let listItemView = (item) => {
    return (
     
    <View style={styles.row}>
      <View style={[styles.box, styles.box2]}>
      <Image
          style={{ width: 100, height: 100 }}
          resizeMode={'stretch'}
          source={{ uri: 'https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} />
      </View> 
      <View style={[styles.box, styles.two]}>
            <Text style={styles.nama} >{item.nama_produk}</Text>
            <Text>Stok : {item.stok}</Text> 
            <Text>Harga Beli : {item.harga_beli}</Text> 
            <Text>Harga Jual : {item.harga_jual}</Text>
       
      </View> 
      <View style={[styles.box, styles.box3]}>
      <Text onPress={() => navigation.push('EditProduk', {data:item})}>
        <FontAwesomeIcon icon={faEdit} color={'orange'} size={25}/>
        </Text>
        <Text onPress={() => Hapus(item.id)}>
        <FontAwesomeIcon icon={faTimes} color={'red'} size={25}/>
       </Text>
      
      </View> 
    </View> 
    );

    
  };

  return (
    
    <View style={{flex:1}}>
      <View style={styles.container}>
        <View style={styles.header}>
            {/* <Text style={{ }}>HEADER</Text> */}
            <View style={[styles.box_header, styles.box_header2]}><Text onPress={() => navigation.push('HomeScreen')}> <FontAwesomeIcon icon={faBackwardStep} color={'orange'} size={25}  /></Text></View> 
            <View style={[styles.box_header,styles.box_header1]}><Text>PENJUALAN</Text></View>
        </View>

        {/* <View style={styles.list_produk}>
          <FlatList
              data={flatListItems}
              ItemSeparatorComponent={listViewItemSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => listItemView(item)}
          />
        </View> */}
        <View style={styles.list_produk}>
          <Text>Tanggal</Text>
         
          {/* <Text style={styles.text}>Date = {date.toLocaleDateString('Id')}</Text>
          <Text style={styles.text}>Date = {time.toLocaleString('Id')}</Text> */}
          {datePicker && (
          <DateTimePicker
            value={date}
          
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onDateSelected}
           
            style={styles.datePicker}
          />
        )}
        {!datePicker && (
         <TextInput
               
                value={'' + date.toLocaleDateString('Id')+' ' + time.toLocaleTimeString()}
                // onChangeText={
                //   (date) => setDate(date)
                // }
                onFocus={() => showDatePicker()}
               
                style={{ padding: 10, borderWidth: 1, }}
              /> )}
         {/* {!datePicker && (
          <View style={{ margin: 10 }}>
            <Button title="Show Date Picker" color="green" onPress={showDatePicker} />
          </View>
        )} */}

          {/* <DatePicker
          style={styles.datePickerStyle}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate="01-01-2019"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        /> */}
        <Text onPress={() => navigation.push('TambahPenjualan')}>Detail Tambah</Text>

        <FlatList
              data={flatListItems}
              ItemSeparatorComponent={listViewItemSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => listItemView(item)}
          />



        <Text>Total</Text>
        <Text>Rp 30000</Text>
        <Text>Bayar</Text>
        <Text>Rp 40000</Text>
        <Text>Kembalian</Text>
        <Text>Rp 30000</Text>

        <Button title='SIMPAN'/>
        </View>
      </View>
      <View style={styles.wrapperButton}>
        <TouchableOpacity style={styles.btnTambah} onPress={() => navigation.navigate('Registerp')}>
        <FontAwesomeIcon icon={faPlus} size={20} color={'white'}/>
        </TouchableOpacity>
      </View>
    </View>
 
  );
};

export default DataPenjualan;

const styles = StyleSheet.create({
  
  nama: {
      fontWeight: 'bold',
      fontSize: 16,
    },
  container: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    flex : 1,
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
    zIndex: 10
  },
 list_produk:{
  marginTop:50
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
    flex: 2
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
    
  MainContainer: {
    flex: 1,
    padding: 6,
    alignItems: 'center',
    backgroundColor: 'white'
  },

  text: {
    fontSize: 25,
    color: 'red',
    padding: 3,
    marginBottom: 10,
    textAlign: 'center'
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },

  });
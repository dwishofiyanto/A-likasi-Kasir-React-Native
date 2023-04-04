import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import React, {Component,useEffect} from 'react';
import { openDatabase } from 'react-native-sqlite-storage';
import {
  View,StyleSheet,TouchableOpacity,

  Text
} from 'react-native';
var db = openDatabase({ name: 'UserDatabase.db' });
// useEffect(() => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       'SELECT * FROM produk order by id desc',
//       [],
//       (tx, results) => {
//         var temp = [];
//         for (let i = 0; i < results.rows.length; ++i)
//           temp.push(results.rows.item(i));
//         setFlatListItems(temp);
//       }
//     );
//   });
// }, []);
export default class Home extends Component {
  
  render(){
    return(
      <View style={styles.page}>
        <Text>Halaman produk</Text>
        <View style={styles.wrapperButton}>
          <TouchableOpacity style={styles.btnTambah}  onPress={() => this.props.navigation.navigate('Registerp')}>
            <FontAwesomeIcon icon={faPlus} size={20} color={'white'}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
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
  }
 
  });
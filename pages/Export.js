/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text, TouchableOpacity, PermissionsAndroid, ToastAndroid, Alert} from 'react-native';
var RNFS = require('react-native-fs');
import XLSX from 'xlsx';

const Export = () => {

  // function to handle exporting
  const exportDataToExcel = () => {

    // Created Sample data
    let sample_data_to_export = [
      {id: '1', name: 'First User'},
      ];

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sample_data_to_export)    
    XLSX.utils.book_append_sheet(wb,ws,"Users")
    const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});

    // Write generated excel to Storage
    RNFS.writeFile(RNFS.DownloadDirectoryPath + '/tesss1.xlsx', wbout, 'ascii').then((r)=>{
     //console.log('Success');
     alert('Export data sukses');
     RNFS.downloadFile({
      fromUrl: 'http://www.mywebsite.com/react-native-pdfurl.pdf',
      toFile: `${RNFS.DocumentDirectoryPath}/react-native-pdfurl.pdf`,
    }).promise.then((r) => {
      console.log('yo yo yo ');
      this.setState({ isDone: true });

      const path = `${RNFS.DocumentDirectoryPath}/react-native-pdfurl.pdf`;
      FileViewer.open(path)
      .then(() => {
          // success
      })
      .catch(error => {
          // error
      });

      RNFS.readDir(RNFS.DocumentDirectoryPath).then(files => {
          console.log(files);
      })
        .catch(err => {

            console.log(err.message, err.code);

        });
    });
    
    }).catch((e)=>{
      console.log('Error', e);
    });

  }
  const handleClick = async () => {

    try{
      // Check for Permission (check if permission is already given or not)
      let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

      if(!isPermitedExternalStorage){

        // Ask for permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage permission needed",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );

        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted (calling our exportDataToExcel function)
          exportDataToExcel();
          console.log("Permission granted");
        } else {
          // Permission denied
          console.log("Permission denied");
        }
      }else{
         // Already have Permission (calling our exportDataToExcel function)
         exportDataToExcel();
      }
    }catch(e){
      console.log('Error while checking permission');
      console.log(e);
      return
    }
    
  };

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <TouchableOpacity
        onPress={() => handleClick()}
        style={{
          width: '50%',
          paddingVertical: 10,
          paddingHorizontal: 15,
          backgroundColor: 'blue',
          marginVertical: 20,
        }}>
        <Text style={{textAlign: 'center', color: 'white'}}>
          Export to Excel
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Export;
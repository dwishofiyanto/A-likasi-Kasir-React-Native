import {View, Text, StyleSheet, TouchableOpacity, Linking, Alert} from 'react-native';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {useState, useEffect, useRef} from 'react';
const Kamera = () => {
  const scanner = useRef(null);
  const [scan, setScan] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setResult(null);
  }, []);

  const onSuccess = e => {
    setResult(e);
    setScan(false);
   
  };
  return !scan ? (
    <View>
        { result && <View><Text>{JSON.stringify(result, null, 2)}</Text></View>}
        { result && <Text>{JSON.stringify(result.data, null, 2)}</Text>}
      <TouchableOpacity onPress={() => setScan(true)}>
        <Text>START SCAN</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <QRCodeScanner
      onRead={onSuccess}
     
      ref={scanner}
      // flashMode={RNCamera.Constants.FlashMode.torch}
      reactivate={true}
      showMarker={true}
      
    //   cameraStyle={{ width: 200, alignSelf:'center'}}
      bottomContent={
        <View>
          <TouchableOpacity style={styles.buttonTouchable} onPress={() => scanner.current.reactive()}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setScan(false)}><Text>Batal</Text></TouchableOpacity>
        </View>

        //   <TouchableOpacity style={styles.buttonTouchable}>
        //   <Text style={styles.buttonText}>OK. Got it!</Text>
        // </TouchableOpacity>
      }
    />
  );
};

export default Kamera;

const styles = StyleSheet.create({
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













// import React, {Component, component} from 'react';

// import {
//   AppRegistry,
//   StyleSheet,
//   Text,View,
//   TouchableOpacity,
//   Linking
// } from 'react-native';

// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';
// import ViewPropTypes from 'deprecated-react-native-prop-types';
// class Kamera extends Component {
//   onSuccess = e => {
//     Linking.openURL(e.data).catch(err =>
//       console.error('An error occured', err)
//     );
//   };

//   render() {
//     return (
//         <View propTypes={ViewPropTypes}>
//       <QRCodeScanner
//         onRead={this.onSuccess}
//         flashMode={RNCamera.Constants.FlashMode.torch}
//         topContent={
//           <Text style={styles.centerText}>
//             Go to{' '}
//             <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
//             your computer and scan the QR code.
//           </Text>
//         }
//         bottomContent={
//           <TouchableOpacity style={styles.buttonTouchable}>
//             <Text style={styles.buttonText}>OK. Got it!</Text>
//           </TouchableOpacity>
//         }
//       />
//       </View>
//     );
//   }
// }
// export default Kamera;
// const styles = StyleSheet.create({
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: '#777'
//   },
//   textBold: {
//     fontWeight: '500',
//     color: '#000'
//   },
//   buttonText: {
//     fontSize: 21,
//     color: 'rgb(0,122,255)'
//   },
//   buttonTouchable: {
//     padding: 16
//   }
// });

// // AppRegistry.registerComponent('default', () => Kamera);
// import React, {Component, component} from 'react';

// import {
//   AppRegistry,
//   StyleSheet,
//   Text,View,
//   TouchableOpacity,
//   Linking
// } from 'react-native';

// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';
// import ViewPropTypes from 'deprecated-react-native-prop-types';
// class Kamera extends Component {
//   onSuccess = e => {
//     Linking.openURL(e.data).catch(err =>
//       console.error('An error occured', err)
//     );
//   };

//   render() {
//     return (
//         <View propTypes={ViewPropTypes}>
//       <QRCodeScanner
//         onRead={this.onSuccess}
//         flashMode={RNCamera.Constants.FlashMode.torch}
//         topContent={
//           <Text style={styles.centerText}>
//             Go to{' '}
//             <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
//             your computer and scan the QR code.
//           </Text>
//         }
//         bottomContent={
//           <TouchableOpacity style={styles.buttonTouchable}>
//             <Text style={styles.buttonText}>OK. Got it!</Text>
//           </TouchableOpacity>
//         }
//       />
//       </View>
//     );
//   }
// }
// export default Kamera;
// const styles = StyleSheet.create({
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: '#777'
//   },
//   textBold: {
//     fontWeight: '500',
//     color: '#000'
//   },
//   buttonText: {
//     fontSize: 21,
//     color: 'rgb(0,122,255)'
//   },
//   buttonTouchable: {
//     padding: 16
//   }
// });

// // AppRegistry.registerComponent('default', () => Kamera);

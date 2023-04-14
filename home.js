// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './pages/HomeScreen';
import RegisterUser from './pages/RegisterUser';
import UpdateUser from './pages/UpdateUser';
import ViewUser from './pages/ViewUser';
import ViewAllUser from './pages/ViewAllUser';
import DeleteUser from './pages/DeleteUser';
import TambahProduk from './pages/TambahProduk';
import DataProduk from './pages/DataProduk';
import DataProduk1 from './pages/DataProduk1';
import EditProduk from './pages/EditProduk';
import Transaksi from './pages/Transaksi';
import TambahPenjualan from './pages/TambahPenjualan';
import { FlatList, Text, View, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import DataPenjualan from './pages/DataPenjualan';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
           
            headerShown:false,
          
           
          }}
        />
         <Stack.Screen
          name="EditProduk"
          component={EditProduk}
          options={{
           
            headerShown:false,
          
           
          }}
        />

<Stack.Screen
          name="Transaksi"
          component={Transaksi}
          options={{
           
            headerShown:false,
          
           
          }}
        />


        <Stack.Screen
          name="TambahPenjualan"
          component={TambahPenjualan}
          options={{
           
            headerShown:false,
          
           
          }}
        />
       
       
        <Stack.Screen
          name="Update"
          component={UpdateUser}
          options={{
            title: 'Update User', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterUser}
          options={{
            title: 'Register User1', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Registerp"
          component={TambahProduk}
          options={{
            title: 'Tambah Produk', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
            
          }}
        />
         <Stack.Screen
          name="DataPenjualan"
          component={DataPenjualan}
          options={{
            headerShown:false,
          }}
        />
        <Stack.Screen
          name="LihatProduk"
          component={DataProduk}
          options={{
           
            headerShown:false,
          
           
          }}
        />
        <Stack.Screen
          name="LihatProduk1"
          component={DataProduk1}
          options={{
           
            headerShown:false,
          
           
          }}
        />
        <Stack.Screen
          name="Delete"
          component={DeleteUser}
          options={{
            title: 'Delete User', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
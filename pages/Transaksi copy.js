// import React, {Component, component} from 'react';
// import { View, Text } from 'react-native';
// class App extends Component{
//     constructor(props){
//         super(props);
//         this.state ={};
//     }
//     render(){
//         return <View><Text>ssssss</Text></View>
//     }
// }

// export default App;

import React, {Component, component} from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { SimpleGrid } from 'react-native-super-grid';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
// const pindah = ({ navigation }) => {
    
//   };
class App extends Component{
   
    constructor(props){
        super(props);
        this.state ={
            dataProduk:[
                // {nama_produk: 'hanpone', harga:2000,jumlah:0},
                // {nama_produk: 'sampo', harga:2500,jumlah:0},
                // {nama_produk: 'saa', harga:1000,jumlah:0},
                // {nama_produk: 'sa', harga:1500,jumlah:0},
            ],

            dataPesanan:[

            ],
            sub_total:0,
            
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
    componentDidMount()
    {
        let sub_total = this.state.sub_total;
        let dataProduk = this.state.dataProduk;
        console.log(dataProduk);
        for(let i=0; i < dataProduk.length; i++)
        {
            sub_total = dataProduk[i].jumlah * dataProduk[i].harga_jual;
           
        }
        console.log(sub_total);
    }
    tambahPesanan1 = index =>
    {
        // itemLogs.push({
        //     color:   csh.val().color,
        //     time:   csh.val().timem,
        //     name: 'YOUR_NAME_GOES_HERE'
        // });
        
        let dataProduk = this.state.dataProduk;
        let dataPesanan = this.state.dataPesanan;
        let ketemu = 0;
        console.log(dataProduk)
        for(let i=0; i < dataPesanan.length; i++)
        {
            if(dataProduk[index].nama_produk == dataPesanan[i].nama_produk)
            {
                dataPesanan[i].jumlah++;
                dataProduk[index].jumlah++;
                ketemu = 1;
            }
        }
        if(!ketemu)
        {
           
            dataPesanan.push(JSON.parse(JSON.stringify(dataProduk[index])));
            dataPesanan[dataPesanan.length - 1].jumlah++;
           
            dataProduk[index].jumlah++;
            ketemu = 0;
           
        }
       
        this.setState({dataProduk, dataPesanan});

        let sub_total = 0;
        for(let i=0; i < dataPesanan.length; i++)
        {
            sub_total += dataPesanan[i].jumlah * dataPesanan[i].harga_jual;
            //sub_total = sub_total 
           
        }
        this.setState({sub_total});
        console.log(sub_total)
        
       dataPesanan.sort();
    }
    // tambahPesanan = index =>
    // {
    //     let dataProduk = this.state.dataProduk;
    //     let dataPesanan = this.state.dataPesanan;
    //     let ketemu = 0;
      
    //     for(let i=0; i < dataPesanan.length; i++)
    //     {
    //         if(dataProduk[index].nama_produk == dataPesanan[i].nama_produk)
    //         {
    //             dataPesanan[i].jumlah++;
    //             dataProduk[index].jumlah++;
    //             ketemu = 1;
    //         }
    //     }
    //     if(!ketemu)
    //     {
           
    //         dataPesanan.push(JSON.parse(JSON.stringify(dataProduk[index])));
    //         dataPesanan[dataPesanan.length - 1].jumlah++;
           
    //         dataProduk[index].jumlah++;
    //         ketemu = 0;
           
    //     }
       
    //     this.setState({dataProduk, dataPesanan});

    //     let sub_total = 0;
    //     for(let i=0; i < dataPesanan.length; i++)
    //     {
    //         sub_total += dataPesanan[i].jumlah * dataPesanan[i].harga_jual;
    //         //sub_total = sub_total 
           
    //     }
    //     this.setState({sub_total});
    //     // console.log(sub_total)
        
    //    // dataPesanan.sort();
    // }

    tambahPesanan2 = index =>
    {
     
        // let dataProduk = this.state.dataProduk;
        let dataPesanan = this.state.dataPesanan;
        dataPesanan[index].jumlah++;
        this.setState({dataPesanan});

        let sub_total = 0;
        for(let i=0; i < dataPesanan.length; i++)
        {
            sub_total += dataPesanan[i].jumlah * dataPesanan[i].harga_jual;
            //sub_total = sub_total 
           
        }
        this.setState({sub_total});
        //console.log(dataPesanan[index])
        // if(dataPesanan[index].jumlah > 1)
        // {
        //     dataPesanan[index].jumlah--;
        //     // dataProduk[index].jumlah--;
        // }
        // else
        // {
        //     dataPesanan.splice(index, 1);
        // }
        // this.setState({dataPesanan});

        // let sub_total = 0;
        // for(let i=0; i < dataPesanan.length; i++)
        // {
        //     sub_total += dataPesanan[i].jumlah * dataPesanan[i].harga_jual;
           
        // }
        // this.setState({sub_total});
    }
    kurangiPesanan = index =>
    {
     
        // let dataProduk = this.state.dataProduk;
        let dataPesanan = this.state.dataPesanan;
        console.log(dataPesanan[index])
        if(dataPesanan[index].jumlah > 1)
        {
            dataPesanan[index].jumlah--;
            // dataProduk[index].jumlah--;
        }
        else
        {
            dataPesanan.splice(index, 1);
        }
        this.setState({dataPesanan});

        let sub_total = 0;
        for(let i=0; i < dataPesanan.length; i++)
        {
            sub_total += dataPesanan[i].jumlah * dataPesanan[i].harga_jual;
           
        }
        this.setState({sub_total});
        // else
        // {
        //     // dataPesanan.splice(index, 1);
        //     // dataProduk[index].jumlah--;
        // }
        // this.setState({dataPesanan, dataProduk});
        // if(dataProduk[index].jumlah >= 1)
        // {
        //     if(dataPesanan[index].jumlah > 1)
        //     {
        //         dataPesanan[index].jumlah--;
        //         dataProduk[index].jumlah--;
        //     }
        //     else
        //     {
        //         dataPesanan.splice(index, 1);
        //         dataProduk[index].jumlah--;
        //     }
           
        // }
        
        
    }
    render(){
        return (
            <View style={{flex: 1,}}>
            <FlatGrid
            itemDimension={130}
            data={this.state.dataProduk.slice().sort((a, b) => b.harga_jual - a.harga_jual)}
            
            renderItem={({ item, index }) => (
                <View>
                    {/* <Text>{index}</Text> */}
                     <Text>{item.nama_produk}</Text>
                     <Text>{item.harga_jual.toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.')}</Text>
                     
                     <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{flex:1}} ><Text>-</Text></TouchableOpacity>
                        <Text style={{flex:1}}>{item.jumlah}</Text>
                        <TouchableOpacity style={{flex:1}} onPress={()  => this.tambahPesanan1(index)}><Text>+</Text></TouchableOpacity>
                    </View>
                     
                </View>
               
            )}
            />
        <Text onPress={() =>this.props.navigation.navigate('HomeScreen')}>KEMBALI</Text>
        <Text >Data Pesanan</Text>
        {/* arrayContoh.slice().sort((a, b) => b.like - a.like) */}
        <FlatList
            itemDimension={130}
            data={this.state.dataPesanan.slice().sort((a, b) => b.harga_jual - a.harga_jual)}
            renderItem={({ item,index }) => (
                <View>
                    {/* <Text>{index}</Text> */}
                     <Text>{item.nama_produk}</Text>
                     <Text>{item.harga_jual.toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.')}</Text>
                     <Text>{item.jumlah}</Text>
                     <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{flex:1}}  onPress={()  => this.kurangiPesanan(index)}><Text>-</Text></TouchableOpacity>
                        <Text style={{flex:1}}>{item.jumlah}</Text>
                        <TouchableOpacity style={{flex:1}} onPress={()  => this.tambahPesanan2(index)}><Text>+</Text></TouchableOpacity>
                    </View>
                    <Text>Total Harga : {(item.harga_jual * item.jumlah).toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.')}</Text>
                     
                </View>
               
            )}
            />
            <Text>Sub totoal {this.state.sub_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.')}</Text>
        </View>
        );
        
    }
}

export default App;
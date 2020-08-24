
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, Alert, ScrollView, 
  FlatList, TouchableOpacity, Dimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
const axios = require('axios');
import ProductItem from './components/ProductItem';
import { Button, ThemeProvider, Header } from 'react-native-elements';

// you can set your style right here, it'll be propagated to application
const theme = {
  Button: {
    titleStyle: {
      color: 'white',
    },
  },
};
export const IP = 'http://10.0.0.4:5000';

export default function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();  
    
  }, []);

  function fetchAllUsers() {    
    try {
      axios.get(IP+'/users')
      .then((response) => {
        //console.log(response);
        setUsers(response.data);
        
      }).catch(function(error){
        console.log(error); // Network Error
        console.log(error.status); // undefined
        console.log(error.code); // undefined
        });
    } catch (error) { 
      console.log("error");
    } 
  };

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => 
        {
          Alert.alert("clicked");
        }
      }>
        <ProductItem user={item} ip={IP}></ProductItem>     
    </TouchableOpacity>
  );

  return (
    <ThemeProvider theme={theme}>
      <View>
      
          <FlatList
          ListHeaderComponent={
          <>
            <Header
              statusBarProps={{ barStyle: 'light-content' }}
              barStyle="light-content"
              containerStyle={{
                backgroundColor: '#3D6DCC',
                justifyContent: 'space-around',
              }}
              leftComponent={{ icon: 'menu', color: '#fff' }}
              centerComponent={{ text: 'Users', style: { color: '#fff' } }}
              rightComponent={{ icon: 'home', color: '#fff' }}
            />
            <Text>Take a look at the list of recipes below:</Text>
          </>}
          data={users}
          renderItem={this.renderItem}
          keyExtractor={item => item.email}
          />
       </View>   
    </ThemeProvider>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: Dimensions.get('window').width-5
  },
  tableTitle: {
    fontSize:30,
    paddingTop: 10
  }
});

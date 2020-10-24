import React from 'react';
import { View, Text ,StyleSheet, FlatList,TouchableOpacity, TextInput, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class HomeScreen extends React.Component {
  state = {
    username: '',
    email: '',
    phone:''
  }
  handleName = (text) => {
      this.setState({ username: text })
  }
  handleEmail = (text) => {
      this.setState({ email: text })
  }
  handlePhone = (text) => {
    this.setState({ phone: text })
  }
   login = (username, email, phone) => {
    fetch('http://172.16.25.82/tr_reactnative/insert.php',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name: username,
        email: email,
        phone_number:phone
      }),        
    }).then((response) => response.json())
    .then((responseJson) => {
      Alert.alert(responseJson);
    }).catch((error) =>{
      console.error(error);
    })
}
  render(){
    return (
      <View style={styles.container,{flex:1}}>
        <View style={{flex:1, justifyContent:'center', flexDirection:'column'}}> 
        <TextInput
              style={styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Username..."
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {this.handleName}
          />

          <TextInput
              style={styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Email..."
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {this.handleEmail}
          />
          <TextInput
              style={styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Phone Number..."
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {this.handlePhone}
          />
          <TouchableOpacity
              style = {styles.submitButton}
              onPress={
                () => this.login(this.state.username, this.state.email, this.state.phone)
              }
              >
              <Text style={ styles.submitButtonText}>SAVE</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style = {styles.submitButton}
              onPress={
                () => {this.props.navigation.navigate("Data Users");
              }}
              >
              <Text style={ styles.submitButtonText}>View Lish students</Text>
          </TouchableOpacity>
        </View>

      </View>
      
    );
  }
}

class DetailsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading:true,
      dataSource:[]
    }
  }

  Action_Click(id, name, email, phone_number){
    this.props.navigation.navigate("Update User",{
      id: id,
      name: name,
      email: email,
      phone_number: phone_number
    })
  }

  componentDidMount(){
    fetch('http://172.16.25.82/tr_reactnative/getdataUsers.php')
    .then((response)=>response.json())
    .then((responseJson) => {
      this.setState({
        isLoading:false,
        dataSource:responseJson
      })
    })
  }

  _renderItem = ({item,index}) => {
    return(
      <View style={styles.item}>
        <Text onPress={this.Action_Click.bind(this,
            item.id,
            item.name,
            item.email,
            item.phone_number
          )}
        >
            {item.name}
        </Text>
      </View>
    )
  }
  render(){
    let {dataSource, isLoading} = this.state
    return (
      <View style={styles.containerDatastudents}>
        <FlatList
          data={dataSource}
          renderItem={this._renderItem}
          keyExtractor = {(item,index) => index.toString()}
        >
        </FlatList>
      </View>
    );
  }

};


class UpdateDataUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      TextInputId: '',
      TextInputName: '',
      TextInputEmail: '',
      TextInputPhoneNumber: ''
    }
  }

  componentDidMount(){    
    this.setState({
      TextInputId : this.props.route.params.id,
      TextInputName : this.props.route.params.name,
      TextInputEmail : this.props.route.params.email,
      TextInputPhoneNumber : this.props.route.params.phone_number
    })
  }

  UpdateUser= () =>{
    fetch('http://172.16.25.82/tr_reactnative/update.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id : this.state.TextInputId,
        name : this.state.TextInputName,
        email : this.state.TextInputEmail,
        phone_number : this.state.TextInputPhoneNumber
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
      }).catch((error) => {
        console.error(error);
      });
  }

  DeleteUser= () =>{
    fetch('http://172.16.25.82/tr_reactnative/delete.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id : this.state.TextInputId
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
      }).catch((error) => {
        console.error(error);
      });
  }
  render(){
    return (
      <View style={styles.container,{flex:1}}>
        <View style={{flex:1, justifyContent:'center', flexDirection:'column'}}> 
        <TextInput
              style={styles.input}
              placeholder = "Username..."
              placeholderTextColor = "#9a73ef"
              onChangeText={ TextInputValue => this.setState({ TextInputName : TextInputValue }) }
              value={this.state.TextInputName}
          />

          <TextInput
              style={styles.input}
              placeholder = "Email..."
              placeholderTextColor = "#9a73ef"
              onChangeText={ TextInputValue => this.setState({ TextInputEmail : TextInputValue }) }
              value={this.state.TextInputEmail}
          />
          <TextInput
              style={styles.input}
              placeholder = "Phone Number..."
              placeholderTextColor = "#9a73ef"
              onChangeText={ TextInputValue => this.setState({ TextInputPhoneNumber : TextInputValue }) }
              value={this.state.TextInputPhoneNumber}
          />
          <TouchableOpacity
              style = {styles.submitButton}
              onPress={this.UpdateUser}
              >
              <Text style={ styles.submitButtonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style = {styles.submitButton}
              onPress={this.DeleteUser}
              >
              <Text style={ styles.submitButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
};


const Stack = createStackNavigator(
);

export default class App extends React.Component{
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#009688',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
          <Stack.Screen name='Student management' component={HomeScreen} />
          <Stack.Screen name='Data Users' component={DetailsScreen} />
          <Stack.Screen name='Update User' component={UpdateDataUser} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
} 
  
const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    input: {
        margin: 15,
        height: 40,
        padding:10,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: '#009688',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius:4
    },
    submitButtonText: {
        color: 'white',
        textAlign:'center',
        textTransform:'uppercase'
    },
    containerDatastudents:{
      flex:1,
      paddingTop:20,
      marginLeft:5,
      marginRight:5
    },

    item:{
      padding:10,
      borderBottomWidth:1,
      borderBottomColor:'#ddd'
    },

    MainContainer: {
      alignItems: 'center',
      flex: 1,
      paddingTop: 30,
      backgroundColor: '#fff'
    }
  })

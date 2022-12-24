import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';

export default class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      
    }
  }
  
  render(){
  return (
    <View style={styles.container}>
      <Text style={styles.topText}>Quantum Chess</Text>
      <TouchableOpacity style={styles.button}
      onPress={() => {
        this.props.navigation.navigate('Playscreen')
      }}
      >
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topText : {
    fontSize : 30,
    margin : 20,
  },
  button : {
    paddingVertical : 15,
    paddingHorizontal : 30,
    backgroundColor : 'teal'
  },
  buttonText : {
    fontSize : 20,
    color : 'white'
  }
});

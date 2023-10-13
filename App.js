import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SwitchExample extends React.Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };

  watchID = null;

  componentDidMount() {
    if (navigator.geolocation) {
      this.watchID = navigator.geolocation.watchPosition((position) => {
        const lastPosition = JSON.stringify(position);
        this.setState({ lastPosition });
      });
    } else {
      console.log('Geolocation is not supported.');
    }
  }

  componentWillUnmount() {
    if (navigator.geolocation && this.watchID) {
      navigator.geolocation.clearWatch(this.watchID);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.boldText}>Initial position:</Text>
        <Text>{this.state.initialPosition}</Text>
        <Text style={styles.boldText}>Current position:</Text>
        <Text>{this.state.lastPosition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

class AsyncStorageExample extends React.Component {
  state = {
    name: "",
  };

  async componentDidMount() {
    const name = await AsyncStorage.getItem("name");
    if (name) {
      this.setState({ name });
    }
  }

  setName = (name) => {
    AsyncStorage.setItem("name", name);
    this.setState({ name });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên của bạn"
          onChangeText={(name) => this.setState({ name })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.setName(this.state.name)}
        >
          <Text style={styles.buttonText}>Lưu</Text>
        </TouchableOpacity>
        <Text style={styles.name}>{this.state.name}</Text>
      </View>
    );
  }
}

const App = () => {
  const showAlert = () => {
    Alert.alert(
      'Thông báo',
      'Đây là nội dung thông báo!',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK pressed')
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
      <Text>Chương trình React Native với Alert</Text>
      <TouchableOpacity onPress={showAlert}>
        <Text>Hiển thị thông báo</Text>
      </TouchableOpacity>
      <SwitchExample />
      <AsyncStorageExample />
    </View>
  );
};

export default App;

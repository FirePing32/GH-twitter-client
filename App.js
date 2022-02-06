import React, { useState } from 'react';
import { View, TextInput, ScrollView, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'react-native-elements'
import srcCode from './api/code'

const SERVER = 'NODEJS_BACKEND_SERVER_URL'

const App = () => {

  const [cur_length, setCurLength] = useState(0);
  const [def_tweet_length, setDefTweetLength] = useState(280);
  const [def_gist_length, setDefGistLength] = useState(32);
  const [gistid, setGist] = useState('');
  const [tweet, setTweet] = useState('');
  const [disable, setDisable] = useState(true);

  const tweet_status = () => {

    fetch(SERVER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: tweet,
        content: srcCode(gistid),
        token: 'TOKEN'
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      Alert.alert(
        "Info",
        "Tweeted successfully !",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    })
    .catch((error) => {
      console.error('Error:', error);
      Alert.alert(
        "Info",
        "Unable to tweet !",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    });

  }

  const set_tweet_data = (data) => {
    setCurLength(data.length);
    setTweet(data)
    tweetDisableBtn(data)
  }
  const set_gist_data = (data) => {
    setGist(data)
    gistDisableBtn(data)
  }

  const gistDisableBtn = (data) => {
    if ((data.length === 32) && (tweet.length !== 0)) {
      setDisable(false)
    }
    else {
      setDisable(true)
    }
  }

  const tweetDisableBtn = (data) => {
    if ((gistid.length === 32) && (data.length !== 0)) {
      setDisable(false)
    }
    else {
      setDisable(true)
    }
  }


  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView} contentContainerStyle={{ flexGrow : 1, justifyContent : 'center' }}>
    <View>
      <Text style={{ color: "#ffffff", fontFamily: "GothamMedium", margin: 20, fontSize: 20, marginBottom: 100, alignSelf: "center" }}>Twitter client for @FirePing32</Text>
      <TextInput
        style={{ width: '80%', justifyContent: "center", fontFamily: "GothamMedium", color: "#ffffff", alignSelf: "center", borderColor: "#ffffff", borderWidth: 2, borderRadius: 10, padding: 20, margin: 10 }}
        placeholder="What's happening?"
        multiline={true}
        placeholderTextColor="#AAAAAA"
        selectionColor="#ffffff"
        onChangeText={(data) => {set_tweet_data(data)}}
        maxLength={def_tweet_length}
      />
      <TextInput
        style={{ width: '80%', justifyContent: "center", fontFamily: "GothamMedium", color: "#ffffff", alignSelf: "center", borderColor: "#ffffff", borderWidth: 2, borderRadius: 10, padding: 20, margin: 10 }}
        placeholder="Gist ID"
        multiline={true}
        placeholderTextColor="#AAAAAA"
        selectionColor="#ffffff"
        onChangeText={(data) => {set_gist_data(data)}}
        maxLength={def_gist_length}
      />
      <Text style={{ color: "#ffffff", fontFamily: "GothamMedium", fontSize: 15, marginTop: 30, alignSelf: "center", justifyContent: "center", flex: 1 }}>{cur_length}</Text>
      <Button
        title="Tweet"
        color="blue"
        titleStyle={{ fontFamily: "GothamMedium" }}
        buttonStyle={{ width: 120, alignSelf: "center", margin: 50, borderRadius: 50 }}
        onPress={() => tweet_status()}
        disabled={disable}
        disabledStyle={{ backgroundColor: "#3792cb", color: "#000080" }}
        >
      </Button>
      </View>
      </ScrollView>
    </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
    },
    scrollView: {
      backgroundColor: '#17202a'
    }
  });

export default App;
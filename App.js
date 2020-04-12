import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, FlatList, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios'
import { Dimensions } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const Stack = createStackNavigator();


function AllPosts({ navigation }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/posts')
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error))
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('DETAILS', { id: item.id })}
          >
            <Image style={styles.tinyLogo} source={{ uri: 'https://source.unsplash.com/random/' + item.id }} resizeMode='stretch' />
            <Text > {item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id + ""}
        extraData={posts}
      />
    </View>
  );
}
function DETAILS({ route }) {
  const [post, setPost] = useState({});
  useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/posts/' + route.params.id)
      .then((response) => setPost(response.data))
      .catch((error) => console.error(error))
  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image style={styles.tinyLogo} source={{ uri: 'https://source.unsplash.com/random/' + post.id }} resizeMode='stretch' />
      <Text>{post.title}</Text>
      <Text>{post.body}</Text>
      {console.log()}

    </View>
  );
}

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ALLPOSTS" component={AllPosts}
        options={{
          title: 'PostsList',
          headerTitleStyle: { fontWeight: 'bold', color: '#ffff', alignSelf: 'center', },
          headerStyle: { backgroundColor: '#9E00F9', },
        }} />
      <Stack.Screen name="DETAILS" component={DETAILS}
        options={{
          title: 'PostsList',
          headerTitleStyle: { fontWeight: 'bold', color: '#ffff', alignSelf: 'center', },
          headerStyle: { backgroundColor: '#9E00F9', },
        }} />
    </Stack.Navigator>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        upperCaseLabel: false,
        activeTintColor: 'white',
        inactiveTintColor: '#6300AB',
        labelStyle: { fontSize: 30, fontWeight: 'bold', fontFamily: "montserrat_regular" },
        tabStyle: { justifyContent: 'center' },
        style: { backgroundColor: '#9E00F9', },
      }}>
      <Tab.Screen name="Posts" component={HomeScreen} />
      <Tab.Screen name="Profile" component={SettingsScreen} />
    </Tab.Navigator >
  );
}


export default function App() {
  return (
    // <SafeAreaView style={styles.container}>
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'space-around',
    width: screenWidth,
  },
  tinyLogo: {
    width: screenWidth,
    height: screenHeight / 4,
    margin: 5,
    borderRadius: 30,
  },
});

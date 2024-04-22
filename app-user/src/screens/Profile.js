import React from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";

const Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <View style={{alignItems:"center"}}>
        <Image
          style={{ width: 150, height: 150, marginTop: 50 }}
          source={{
            uri: "https://res.cloudinary.com/dcc0yhyjq/image/upload/v1713780667/products/user-avatar_o6ceck.png",
          }}
        />
        <Text style={{textAlign:"center", fontSize: 25, fontWeight:"500"}}>Hello</Text>
        <TouchableOpacity style={{
            width: 300,
            backgroundColor: "#87D796",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
            alignContent: "center",
          }}>
        <Text style={{textAlign:"center"}}>Your Information</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
            width: 300,
            backgroundColor: "#87D796",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
            alignContent: "center",
            marginTop: 10
          }}>
        <Text style={{textAlign:"center"}}>Your Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
            width: 300,
            backgroundColor: "#87D796",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
            alignContent: "center",
            marginTop: 10
          }}>
        <Text style={{textAlign:"center"}}>Log Out</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

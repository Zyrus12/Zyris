import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Butones from "../styles/button";
import CryptoJs from "crypto-js";
import Feather from "react-native-vector-icons/Feather";

const EncScreen = ({ navigation }) => {
  const [checkPass, setCheckPass] = useState(true);
  const [checkKey, setCheckKey] = useState(true);
  const [pass, setPass] = useState("");
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");

  function showPass() {
    setCheckPass(!checkPass);
  }

  function showKey() {
    setCheckKey(!checkKey);
  }

  function checkEnc() {
    if (message == "") {
      alert("Please make sure to enter a text.");
      setEncrypted("");
    } else if (pass == "") {
      alert("Please make sure to enter a password.");
      setEncrypted("");
    } else if (pass.indexOf(" ") >= 0) {
      alert("You cannot enter a space in password.");
      setEncrypted("");
    } else {
      encryption(message, pass);
    }
  }

  function checkDec() {
    if (ciphertext == "") {
      alert("Please make sure to enter a cipher or encrypted text.");
      setDecrypted("");
    } else if (key == "") {
      alert("Please make sure to enter a key or password.");
      setDecrypted("");
    } else if (key.indexOf(" ") >= 0) {
      alert("You cannot enter a space in password.");
      setDecrypted("");
    } else {
      decryption(ciphertext, key);
    }
  }

  function encryption(Message, Password) {
    var salt = CryptoJs.lib.WordArray.random(128 / 8);
    var iv = CryptoJs.lib.WordArray.random(128 / 8);
    var key = CryptoJs.PBKDF2(Password, salt, {
      keySize: 128 / 32,
    });

    var encrypted = CryptoJs.AES.encrypt(Message, key, { iv: iv });
    var finalEncryption =
      salt.toString() + iv.toString() + encrypted.toString();
    console.log(finalEncryption);
    console.log("==================================");
    setEncrypted(finalEncryption);
    return finalEncryption;
  }

  function decryption(finalEncryption, Password) {
    var salt = CryptoJs.enc.Hex.parse(finalEncryption.substr(0, 32));
    var iv = CryptoJs.enc.Hex.parse(finalEncryption.substr(32, 32));
    var encrypted = finalEncryption.substr(64);

    var key = CryptoJs.PBKDF2(Password, salt, {
      keySize: 128 / 32,
    });

    var decrypted = CryptoJs.AES.decrypt(encrypted, key, { iv: iv });
    console.log(decrypted);
    var finalDecrypted = decrypted.toString(CryptoJs.enc.Utf8);
    console.log("Decypted: " + decrypted.toString(CryptoJs.enc.Utf8));
    setDecrypted(finalDecrypted);
    if (finalDecrypted == "") {
      alert("Wrong password. Please enter the right password");
      setDecrypted("");
    } else {
      return decrypted;
    }
  }

  return (
    <ScrollView style={styles.scroller}>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.card}>
          <Text style={styles.userName}>Encryption inedit ko na</Text>

          <View style={styles.action}>
            <Feather name="shield" color="#000000" size={23} />

            <TextInput
              placeholder="Enter message"
              placeholderTextColor="#000000"
              style={styles.textInput}
              multiline={true}
              autoCapitalize="none"
              onChangeText={(val) => setMessage(val)}
            />
            {message != "" ? (
              <Feather name="check-circle" color="#000000" size={23} />
            ) : null}
          </View>
          <View style={styles.action}>
            <Feather name="lock" color="#000000" size={23} />
            <TextInput
              placeholder="Enter password"
              placeholderTextColor="#000000"
              value={pass}
              secureTextEntry={checkPass}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setPass(val)}
            />
            <TouchableOpacity onPress={showPass}>
              {checkPass ? (
                <Feather name="eye-off" color="#000000" size={23} />
              ) : (
                <Feather name="eye" color="#000000" size={23} />
              )}
            </TouchableOpacity>
          </View>

          <Butones text="Encrypt" onPress={() => checkEnc(message, pass)} />
        </View>

        <View style={styles.card}>
          <Text style={styles.userName}>Ciphertext</Text>
          <Text style={styles.result} selectable={true}>
            {" "}
            {encrypted}{" "}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.userName}>Decryption</Text>

          <View style={styles.action}>
            <Feather name="shield" color="#000000" size={23} />
            <TextInput
              placeholder="Enter ciphertext"
              placeholderTextColor="#000000"
              style={styles.textInput}
              multiline={true}
              autoCapitalize="none"
              onChangeText={(val) => setCiphertext(val)}
            />
            {ciphertext != "" ? (
              <Feather name="check-circle" color="#000000" size={23} />
            ) : null}
          </View>
          <View style={styles.action}>
            <Feather name="lock" color="#000000" size={23} />
            <TextInput
              placeholder="Enter password"
              placeholderTextColor="#000000"
              value={key}
              secureTextEntry={checkKey}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setKey(val)}
            />
            <TouchableOpacity onPress={showKey}>
              {checkKey ? (
                <Feather name="eye-off" color="#000000" size={23} />
              ) : (
                <Feather name="eye" color="#000000" size={23} />
              )}
            </TouchableOpacity>
          </View>

          <Butones text="Decrypt" onPress={() => checkDec(ciphertext, key)} />
        </View>

        <View style={styles.card}>
          <Text style={styles.userName}>Plaintext</Text>
          <Text style={styles.result} selectable={true}>
            {" "}
            {decrypted}{" "}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default EncScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",

    padding: 20,
  },
  scroller: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .9)",
  },
  textInput: {
    flex: 1,
    paddingLeft: 8,
    color: "#000000",
    fontSize: 12,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: "#000000",
    paddingBottom: 5,
    marginBottom: 10,
    marginLeft: "8%",
    marginRight: "8%",
  },
  card: {
    backgroundColor: "rgba(131, 238, 255, 0.8)",
    width: "100%",
    marginBottom: 20,
    borderRadius: 10,
    paddingBottom: 8,
    paddingTop: 8,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#83EEFF",
    marginTop: 25,
  },
  userName: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 8,
    color: "black",
    textAlign: "center",
    fontFamily: "Roboto",
  },
  aboutUser: {
    fontSize: 12,
    textAlign: "justify",
    marginBottom: 10,
    color: "black",
    marginLeft: "10%",
    marginRight: "10%",
  },
  result: {
    fontSize: 12,
    textAlign: "left",
    marginBottom: 10,
    color: "black",
    marginLeft: "10%",
    marginRight: "10%",
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 5,
    marginTop: 10,
  },
  userBtn: {
    borderColor: "rgba(255,192,203, .7)",
    borderWidth: 3,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: "#fff",
    padding: 5,
    fontSize: 18,
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
    borderWidth: 2,
    borderColor: "transparent",
    paddingBottom: 15,
    borderBottomColor: "#83EEFF",
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    color: "rgba(131, 238, 255, 0.8)",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../../assets/colors';
import ws from '../../../../utils/Socket';
const ChatPasien = ({ route, navigation }) => {
  console.log(route.params);
  const [messages, setMessages] = useState([]);
  const { data } = route.params;
  const [user, setUser] = useState({});

  ws.socket.onmessage = function (event) {
    const chat = JSON.parse(event.data);
    // cek dulu conversation id yg diterima sesuai dengan conversation ini nggak?
    // if (chat.conversation_id === conv_id) { //conv_id dpt dr yg udah dioper pas milih chat
      // intinya sih update messagenya wkwk ngga ngerti pake useState lik help yes yg benernya <3
      setMessages([...messages, {
        _id: chat.ID,
        text: chat.message,
        createdAt: chat.CreatedAt, // berguna buat mana yg duluan 
        user: { _id: chat.user_id }, //user_id berguna untuk kanan kirinya chat, tergantung ini dilihat dr hp siapa
      }])
      console.log(`[message] Data received from server: ${event.data}`);
    // }
  };

  useEffect(() => {
    //jangan lupa ganti pake fetch getConversationByID ke backend biar dapet list chat yg lalu
    // ini kan cuma dummy dulu ya HEHE
    setMessages([
      {
        _id: 1,
        text: data.message[0],
        createdAt: data.createdAt,
        user: data.user,
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const chat = {
      conversation_id: 1, //isi pake id conversationnya ntar
      user_id: 10, // isi pake user yg login
      type: "TEXT", // ini biarin dulu keknya blm ada kirim gambar(?)
      message: messages[0]['text'] //gini kah untuk ngambil message paling baru?._. harusnya iya...
    };
    ws.socket.send(JSON.stringify(chat));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1, //user yg login
        }}
        // renderBubble={renderBubble}
        alwaysShowSend
        // renderSend={renderSend}
        // renderInputToolbar={renderInputToolbar}
        textInputStyle={{ color: colors.black }}
        placeholderTextColor={colors.gray}
      />
    </View>
  );
};

export default ChatPasien;

const styles = StyleSheet.create({});

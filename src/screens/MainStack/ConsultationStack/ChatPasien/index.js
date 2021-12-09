/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../../assets/colors';
const ChatPasien = ({route, navigation}) => {
  console.log(route.params);
  const [messages, setMessages] = useState([]);
  const {data} = route.params;
  const [user, setUser] = useState({});
  useEffect(() => {
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
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        // renderBubble={renderBubble}
        alwaysShowSend
        // renderSend={renderSend}
        // renderInputToolbar={renderInputToolbar}
        textInputStyle={{color: colors.black}}
        placeholderTextColor={colors.gray}
      />
    </View>
  );
};

export default ChatPasien;

const styles = StyleSheet.create({});

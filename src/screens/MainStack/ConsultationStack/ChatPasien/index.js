/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../../assets/colors';
import {services} from '../../../../utils/Services';
import ws from '../../../../utils/Socket';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {handleRefreshToken} from '../../../../redux/action/auth';
import {v4 as uuidv4} from 'uuid';

const ChatPasien = ({route, navigation}) => {
  // console.log(route.params);
  const dispatch = useDispatch();
  const authStore = useSelector(state => state.auth);
  const [ourId, setOurId] = useState(authStore.userData.result.ID);
  const [messages, setMessages] = useState([]);
  const {data} = route.params;

  // ws.socket.onmessage = function (event) {
  //   const chat = JSON.parse(event.data);
  //   // cek dulu conversation id yg diterima sesuai dengan conversation ini nggak?
  //   // if (chat.conversation_id === conv_id) { //conv_id dpt dr yg udah dioper pas milih chat
  //     // intinya sih update messagenya wkwk ngga ngerti pake useState lik help yes yg benernya <3
  //     setMessages([...messages, {
  //       _id: chat.ID,
  //       text: chat.message,
  //       createdAt: chat.CreatedAt, // berguna buat mana yg duluan
  //       user: { _id: chat.user_id }, //user_id berguna untuk kanan kirinya chat, tergantung ini dilihat dr hp siapa
  //     }])
  //     console.log(`[message] Data received from server: ${event.data}`);
  //   // }
  // };

  const getRefreshToken = async (service, payload) => {
    var token = '';
    await dispatch(handleRefreshToken({service, payload}))
      .then(value => {
        token = value.result.access;
      })
      .catch(error => {
        console.log(error);
      });
    return token;
  };

  useEffect(() => {
    const fetchAllConv = async () => {
      const refreshToken = {
        refresh: authStore.userToken.result.refresh,
      };
      const token = await getRefreshToken('refreshToken', refreshToken);
      const ID = await authStore.userData.result.ID;
      services
        .fetchAllConversationByID(token, ID)
        .then(dataConv => {
          const firstUser = dataConv.result.first_user_id;
          const secondUser = dataConv.result.second_user_id;
          dataConv.result.chats
            .slice(0)
            .reverse()
            .map(conv => {
              const objMessage = {};
              if (
                ourId === dataConv.result.first_name_user ||
                ourId === conv.user_id
              ) {
                console.log(firstUser);
                Object.assign(objMessage, {
                  _id: uuidv4(),
                  text: conv.message,
                  createdAt: conv.CreatedAt,
                  user: {
                    _id: secondUser,
                    name: 'halo',
                  },
                });
              } else {
                console.log(secondUser);
                Object.assign(objMessage, {
                  _id: uuidv4(),
                  text: conv.message,
                  createdAt: conv.CreatedAt,
                  user: {
                    _id: firstUser,
                    name: 'hola',
                  },
                });
              }
              console.log(objMessage);
              setMessages(messages => [...messages, objMessage]);
            });
        })
        .catch(error => {
          console.log(error);
        });
    };
    fetchAllConv();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const chat = {
      conversation_id: 1, //isi pake id conversationnya ntar
      user_id: 10, // isi pake user yg login
      type: 'TEXT', // ini biarin dulu keknya blm ada kirim gambar(?)
      message: messages[0]['text'], //gini kah untuk ngambil message paling baru?._. harusnya iya...
    };
    ws.socket.send(JSON.stringify(chat));
  }, []);

  // console.log(messages.chats);

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
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
        textInputStyle={{color: colors.black}}
        placeholderTextColor={colors.gray}
      />
    </View>
  );
};

export default ChatPasien;

const styles = StyleSheet.create({});

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import colors from '../../../../assets/colors';
import {services} from '../../../../utils/Services';
import ws from '../../../../utils/Socket';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {handleRefreshToken} from '../../../../redux/action/auth';
import uuid from 'react-native-uuid';

const ChatPasien = ({route}) => {
  const dispatch = useDispatch();
  const authStore = useSelector(state => state.auth);
  const [ourId, setOurId] = useState(authStore.userData.result.ID);
  const [messages, setMessages] = useState([]);
  const {data} = route.params;
  console.log(data);
  useEffect(() => {
    ws.socket.onmessage = function (event) {
      const chat = JSON.parse(event.data);
      if (data.conv_id === chat.result.conversation_id) {
        setMessages([
          {
            _id: chat.result.ID,
            text: chat.result.message,
            createdAt: chat.result.CreatedAt, // berguna buat mana yg duluan
            user: {
              _id: chat.result.user_id,
              name: data.user.name,
            }, //user_id berguna untuk kanan kirinya chat, tergantung ini dilihat dr hp siapa
          },
          ...messages,
        ]);
      }
      console.log(`[message] Data received from server: ${event.data}`);
    };
  });

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
      const arrMessage = [];
      services
        .fetchAllConversationByID(token, data.conv_id)
        .then(dataConv => {
          const firstUser = dataConv.result.first_user.ID;
          const secondUser = dataConv.result.second_user.ID;
          dataConv.result.chats
            .slice(0)
            .reverse()
            .map(conv => {
              const objMessage = {};
              if (ourId === conv.user_id) {
                Object.assign(objMessage, {
                  _id: uuid.v4(),
                  text: conv.message,
                  createdAt: conv.CreatedAt,
                  user: {
                    _id: firstUser,
                    name: `${dataConv.result.first_user.first_name} ${dataConv.result.first_user.last_name}`,
                  },
                });
              } else {
                Object.assign(objMessage, {
                  _id: uuid.v4(),
                  text: conv.message,
                  createdAt: conv.CreatedAt,
                  user: {
                    _id: secondUser,
                    name: `${dataConv.result.second_user.first_name} ${dataConv.result.second_user.last_name}`,
                  },
                });
              }
              arrMessage.push(objMessage);
            });
          setMessages(arrMessage);
        })
        .catch(error => {
          console.log(error);
        });
    };
    fetchAllConv();
  }, []);

  const onSend = useCallback((messages = []) => {
    // setMessages(previousMessages =>
    //   GiftedChat.append(previousMessages, messages),
    // );

    const chat = {
      conversation_id: data.conv_id, //isi pake id conversationnya ntar
      user_id: ourId, // isi pake user yg login
      type: 'TEXT', // ini biarin dulu keknya blm ada kirim gambar(?)
      message: messages[0].text, //gini kah untuk nga  mbil message paling baru?._. harusnya iya...
    };

    ws.socket.send(JSON.stringify(chat));
  }, []);

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

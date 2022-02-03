import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import RtcEngine, {
  RtcEngineContext,
} from 'react-native-agora';
import { useDispatch, useSelector } from 'react-redux';

import Item from './Item';

const config = require('../agora.config.json');

const JoinChannelAudio = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.userData.result.ID);
  const [channelId, setChannelId] = useState(config.channelId);
  const [isJoined, setIsJoined] = useState(false);
  const [openMicrophone, setOpenMicrophone] = useState(true);
  const [enableSpeakerphone, setEnableSpeakerphone] = useState(true);
  const [playEffect, setPlayEffect] = useState(false);
  const [peerIds, setPeerIds] = useState([]);

  const _engine = useRef(null)

  useEffect(() => {
    const _initEngine = async () => {
      _engine.current = await RtcEngine.createWithContext(
        new RtcEngineContext(config.appId),
      );
      await _engine.current.enableAudio();
      _addListeners();
    };

    _initEngine();

    return () => {
      if (_engine.current) {
        _engine.current.destroy();
        _engine.current = null;
      }
    }
  }, []);

  const _addListeners = () => {
    _engine.current?.addListener('Warning', warningCode => {
      console.info('Warning', warningCode);
    });
    _engine.current?.addListener('Error', errorCode => {
      console.info('Error', errorCode);
    });
    _engine.current?.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.info('JoinChannelSuccess', channel, uid, elapsed);
      setIsJoined(true);
    });
    _engine.current?.addListener('LeaveChannel', stats => {
      console.info('LeaveChannel', stats);
      setIsJoined(false);
    });
    _engine.current?.addListener('UserJoined', (uid, elapsed) => {
      console.info('UserJoined', uid, elapsed);
      if (peerIds.indexOf(uid) === -1) {
        setPeerIds([...peerIds, uid]);
      };
    });
    _engine.current?.addListener('UserOffline', (uid, reason) => {
      console.info('UserOffline', uid, reason);
      peerIds.filter(id => id !== uid);
    });
  };

  const _joinChannel = async () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      ).then(granted => {
        if (granted) {
          console.log("Permission granted")
        } else {
          console.log("Permission denied")
        }
      }).catch(err => {
        console.warn(err)
      })
    }

    await _engine.current?.joinChannel(
      config.token,
      channelId,
      null,
      userId,
    );
  };
  const _onChangeRecordingVolume = value => {
    _engine.current?.adjustRecordingSignalVolume(value * 400);
  };

  const _onChangePlaybackVolume = value => {
    _engine.current?.adjustPlaybackSignalVolume(value * 400);
  };

  const _toggleInEarMonitoring = isEnabled => {
    _engine.current?.enableInEarMonitoring(isEnabled);
  };

  const _onChangeInEarMonitoringVolume = value => {
    _engine.current?.setInEarMonitoringVolume(value * 400);
  };

  const _leaveChannel = async () => {
    await _engine.current?.leaveChannel();
  };

  const _switchMicrophone = () => {
    _engine.current?.enableLocalAudio(!openMicrophone)
      .then(() => {
        setOpenMicrophone(!openMicrophone);
      })
      .catch(err => {
        console.warn('enableLocalAudio', err);
      });
  };

  const _switchSpeakerphone = () => {
    _engine.current?.setEnableSpeakerphone(!enableSpeakerphone)
      .then(() => {
        setEnableSpeakerphone(!enableSpeakerphone);
      })
      .catch(err => {
        console.warn('setEnableSpeakerphone', err);
      });
  };

  const _switchEffect = () => {
    if (playEffect) {
      _engine.current?.stopEffect(1)
        .then(() => {
          setPlayEffect(false);
        })
        .catch(err => {
          console.warn('stopEffect', err);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TextInput
          style={styles.input}
          onChangeText={text => setChannelId(text)}
          placeholder={'Channel ID'}
          value={channelId}
        />
        <Button
          onPress={isJoined ? _leaveChannel : _joinChannel}
          title={`${isJoined ? 'Leave' : 'Join'} channel`}
        />
      </View>
      {isJoined && (
        <View style={styles.float}>
          <Item
            title={`Microphone ${openMicrophone ? 'on' : 'off'}`}
            btnOnPress={_switchMicrophone}
          />
          <Item
            title={enableSpeakerphone ? 'Speakerphone' : 'Earpiece'}
            btnOnPress={_switchSpeakerphone}
          />
          <Item
            title={`${playEffect ? 'Stop' : 'Play'} effect`}
            btnOnPress={_switchEffect}
          />
          <Item
            title={'RecordingVolume'}
            isShowSlider
            onSliderValueChange={_onChangeRecordingVolume}
          />
          <Item
            title={'PlaybackVolume'}
            isShowSlider={true}
            onSliderValueChange={_onChangePlaybackVolume}
          />
          <Item
            title={'InEar Monitoring Volume'}
            isShowSlider
            isShowSwitch
            onSwitchValueChange={_toggleInEarMonitoring}
            onSliderValueChange={_onChangeInEarMonitoringVolume}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  float: {
    width: '100%',
    position: 'absolute',
    alignItems: 'flex-start',
    bottom: 20,
  },
  top: {
    width: '100%',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default JoinChannelAudio; 
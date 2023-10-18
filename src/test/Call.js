import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const CallScreen = ({callerName, onAccept, onReject}) => {
  return (
    <View>
      <Text>Incoming Call from {callerName}</Text>
      <TouchableOpacity onPress={onAccept}>
        <Text>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onReject}>
        <Text>Reject</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CallScreen;

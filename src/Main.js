import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {NewConnection} from './Connection';

const singalR = require('@microsoft/signalr');
let Connection = '';
export default function Main() {
  const [UserName, setUserName] = useState('');
  const [userList, SetUsersList] = useState([]);
  useEffect(() => {
    CreateSignalRConnection();
  }, []);

  function CreateSignalRConnection() {
    Connection = NewConnection();
    StartConnection(Connection);
  }

  async function StartConnection(connection) {
    if (connection) {
      console.log('this is my connection', connection);
      if (
        !connection ||
        connection.state === 'Disconnected' ||
        !connection.state !== signalR.HubConnectionState.Connecting ||
        signalR.HubConnectionState.Connected
      ) {
        connection
          .start()
          .then(() => {
            setUserName(Connection.state);
            Connection.on('ReceiveUserList', res => {
              console.log('on recieveuserlist', res);
              SetUsersList(res);
            });
          })
          .catch(err => {
            console.log(err);
            setTimeout(() => {
              console.log('retrying');
              StartConnection(Connection);
            }, 20000);
          });
      }
    }
  }
  async function CloseConnection() {
    await Connection.on('clearUsers', res => {
      console.log(res);
      console.log('users are cleared');
    });
  }
  async function onClose() {
    Connection.onclose(async () => {
      await start();
    });
  }

  return (
    <View>
      <Text>{`connection is ${UserName}`}</Text>
      <View>
        <Text>Connected Users Are:</Text>
        {userList?.map(res => {
          return (
            <TouchableOpacity onPress={() => onClose()}>
              <Text>{res.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Pressable
        style={{backgroundColor: 'red', position: 'absolute', bottom: 20}}>
        <Text style={{textAlign: 'center'}}>Close All Connection</Text>
      </Pressable>
    </View>
  );
}

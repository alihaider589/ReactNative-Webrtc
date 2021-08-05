import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {NewConnection} from './Connection';

const singalR = require('@microsoft/signalr');
let Connection = '';
export default function Main() {
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
      if (!connection || connection.state === 'Disconnected') {
        connection
          .start()
          .then(() => {
            console.log(
              '--------------this is my then connection--------------',
              Connection,
            );

            Connection.on('ReceiveUserList', res => {
              console.log('on recieveuserlist', res);
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
  async function onClose() {
    Connection.onclose(async () => {
      await start();
    });
  }

  return (
    <View>
      <Text>{`connection is ${Connection?.state}`}</Text>
    </View>
  );
}

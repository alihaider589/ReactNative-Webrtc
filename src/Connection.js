const signalR = require('@microsoft/signalr');

const API = 'http://103.121.120.27:980/hubs/serverhub';
// const API = 'http://39743cc69d6c.ngrok.io/hubs/serverhub';

// export function NewConnection() {
//   return new signalR.HubConnectionBuilder()
//     .withUrl(`${API}?userName=ali`)
//     .withAutomaticReconnect({
//       nextRetryDelayInMilliseconds: retryContext => {
//         if (retryContext.elapsedMilliseconds < 30000) {
//           // If we've been reconnecting for less than 30 seconds so far,
//           // wait between 0 and 2 seconds before the next reconnect attempt.
//           return Math.random() * 2000;
//         } else {
//           // If we've been reconnecting for more than 60 seconds so far, stop reconnecting.
//           return null;
//         }
//       },
//     })
//     .build();
// }
export function NewConnection() {
  return new signalR.HubConnectionBuilder()
    .withUrl(API + '?username=ali')
    .configureLogging(signalR.LogLevel.Debug)

    .build();
}

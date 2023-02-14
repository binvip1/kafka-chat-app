import React, {useState} from 'react';
import SockJsClient from 'react-stomp';
import './App.css';
import { LoginForm } from './components/LoginForm/LoginForm';
import { Input } from './components/Input/Input';
import { chatAPI } from './services/chatapi';
import { Messages } from './components/Messages/Messages';

const SOCKET_URL = 'http://localhost:8080/ws-chat';

function App() {
  const [message, setMessage] = useState([]);
  const [user, setUser] = useState(null);

  //set chat color
  function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  }

  let onMessageReceived = (msg) => {
    console.log("New message received");
    setMessage(message.concat(msg));
  }

  let onSendMessage = (msgText) => {
    chatAPI.sendMessage(user.username, msgText).then(res => {
      console.log('Sent', res);
    }).catch(err => {
      console.log("Error occured while sending message to api");
    })
  }

  let handleLoginSubmit = (username) => {
    console.log(username, " Logged in");

    setUser({
      username: username,
      color: randomColor(),
    })
  }

  return (
    <div className="App">
      {!!user ?
        (
          <>
            <SockJsClient
              url={SOCKET_URL}
              topics={['/topic/group']}
              onConnect={console.log("Connected!")}
              onDisconnect={console.log("Disconnected!")}
              onMessage={msg => onMessageReceived(msg)}
              debug={false}
            />
            <Messages
              messages={message}
              currentUser={user}
            />
            <Input onSendMessage={onSendMessage}/>
          </>
        ) :
        <LoginForm onSubmit={handleLoginSubmit}/>
      }
    </div>
  )
}

export default App;

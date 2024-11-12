import { useState } from 'react';
import { RiRobot2Line } from "react-icons/ri";

export const Chat = () => {
  const [messages, setMessages] = useState([{
    text: "hola",
    sender:"user"
  },
  {
    text: "xd",
    sender:"bot"
  }]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      // Agrega el nuevo mensaje al array de mensajes
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput(''); // Limpia el campo de entrada
    }
  };


  return (
    <>
      <ul className="flex text-white">
        {messages.map((message, index) => (
          <li key={index}>
            {
              message.sender !== 'user' &&
            <i className="rounded-full bg-neutral-800"><RiRobot2Line /></i>
            }
            <p>{message.text}</p>
            </li>
        ))}
      </ul>

    </>
  );
};

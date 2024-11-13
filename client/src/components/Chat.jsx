import { useState } from 'react';
import { RiRobot2Line } from "react-icons/ri";

export const Chat = () => {
  const [messages, setMessages] = useState([{
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia voluptatem ex ullam velit veniam totam! Dignissimos at eligendi velit, commodi itaque officiis dolor modi reiciendis pariatur repudiandae aliquid. Est deleniti magni molestias ut corporis dolorem ducimus tempore sapiente, velit accusantium praesentium soluta dignissimos modi, ipsam quia? Perspiciatis molestiae reiciendis expedita unde possimus. Suscipit assumenda aliquid ut quis ea, fugit nisi alias voluptatem ipsum amet, eum possimus nesciunt, in a odit accusantium placeat? Ipsa cupiditate vero aliquid hic porro non eveniet corporis dolor, sunt ad, modi alias fugit et minus magni!",
    sender: "user"
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia voluptatem ex ullam velit veniam totam! Dignissimos at eligendi velit, commodi itaque officiis dolor modi reiciendis pariatur repudiandae aliquid. Est deleniti magni molestias ut corporis dolorem ducimus tempore sapiente, velit accusantium praesentium soluta dignissimos modi, ipsam quia? Perspiciatis molestiae reiciendis expedita unde possimus. Suscipit assumenda aliquid ut quis ea, fugit nisi alias voluptatem ipsum amet, eum possimus nesciunt, in a odit accusantium placeat? Ipsa cupiditate vero aliquid hic porro non eveniet corporis dolor, sunt ad, modi alias fugit et minus magni!",
    sender: "bot"
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia voluptatem ex ullam velit veniam totam! Dignissimos at eligendi velit, commodi itaque officiis dolor modi reiciendis pariatur repudiandae aliquid. Est deleniti magni molestias ut corporis dolorem ducimus tempore sapiente, velit accusantium praesentium soluta dignissimos modi, ipsam quia? Perspiciatis molestiae reiciendis expedita unde possimus. Suscipit assumenda aliquid ut quis ea, fugit nisi alias voluptatem ipsum amet, eum possimus nesciunt, in a odit accusantium placeat? Ipsa cupiditate vero aliquid hic porro non eveniet corporis dolor, sunt ad, modi alias fugit et minus magni!",
    sender: "user"
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia voluptatem ex ullam velit veniam totam! Dignissimos at eligendi velit, commodi itaque officiis dolor modi reiciendis pariatur repudiandae aliquid. Est deleniti magni molestias ut corporis dolorem ducimus tempore sapiente, velit accusantium praesentium soluta dignissimos modi, ipsam quia? Perspiciatis molestiae reiciendis expedita unde possimus. Suscipit assumenda aliquid ut quis ea, fugit nisi alias voluptatem ipsum amet, eum possimus nesciunt, in a odit accusantium placeat? Ipsa cupiditate vero aliquid hic porro non eveniet corporis dolor, sunt ad, modi alias fugit et minus magni!",
    sender: "bot"
  },


]);
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
      <ul className="px-52">

        {messages.map((msg, index) => (
          <li key={index} className={`mb-10 text-neutral-200 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>

            <div className={`${msg.sender !== 'user' && "flex space-x-2"}`}>
              {
                msg.sender !== 'user' &&
                <i className="rounded-full bg-neutral-800 p-3 border-neutral-500 border-2 h-fit"><RiRobot2Line /></i>
              }
              <p className={`inline-block p-2 rounded-s-3xl rounded-ee-3xl rounded-se-md  ${msg.sender === 'user' && 'bg-neutral-800 text-neutral-200'} shadow`}>
                {msg.text}
              </p>
            </div>

          </li>
        ))}

      </ul>
    </>
  );
};

import { useState, useRef, useEffect } from 'react';
import { Form } from "./Form";
import { useFetchAI } from "../hooks/useAI"
import { RiRobot2Line } from "react-icons/ri";

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const { fetchAI, loading } = useFetchAI()

  const handleSend = async (e) => {
    e.preventDefault();

    if (input.trim()) {
      setInput('');
      setMessages([...messages, { text: input, sender: 'user' }]);
      try {
        await fetchAI(input, setMessages);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='flex flex-col h-full'>
      <ul className="flex-1 overflow-y-auto px-32 md:px-52 py-4" >
        {messages.map((msg, index) => (
          <li key={index} className={`mb-10 text-neutral-200 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`${msg.sender !== 'user' && "flex space-x-2"}`}>
              {msg.sender !== 'user' && (
                <i className="rounded-full bg-neutral-800 p-3 border-neutral-500 border-2 h-fit">
                  <RiRobot2Line />
                </i>
              )}
              <p className={`inline-block p-2 rounded-s-3xl rounded-ee-3xl rounded-se-md ${msg.sender === 'user' && 'bg-neutral-800 text-neutral-200'}`}>
                {msg.text}
              </p>
            </div>
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
      <div className="p-4 bg-neutral-900 mt-auto w-full">
        <Form setInput={setInput} input={input} handleSend={handleSend} loading={loading} />
      </div>
    </div>
  );
};

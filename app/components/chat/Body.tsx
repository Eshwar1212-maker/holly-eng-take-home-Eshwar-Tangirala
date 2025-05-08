"use client"

import { FC, useState } from 'react'
import Message from './Message'
import { Message as MessageType } from '@/types'
import Form from './Form'

interface BodyProps {
  messages?: MessageType
}

const Body: FC<BodyProps> = ({ messages }) => {
  const [conversationMessages, setConversationMessages] = useState<MessageType[]>([]);

  const handleAddMessage = (message: MessageType) => {
    setConversationMessages(prevMessages => [...prevMessages, message]); // Preserve previous messages
  };

  return (
    <div className="mt-16 bg-gray-900 rounded-lg h-[800px] flex flex-col max-w-[80%] m-auto">
      <h1 className="py-20 text-center">Hollys Voice Chat</h1>
      <div className="flex flex-col w-[100%]">
        {conversationMessages.map((m, i) => (
          <Message key={i} message={m} />
        ))}
      </div>
      <Form handleAddMessage={handleAddMessage} />
    </div>
  );
}

export default Body;

import { Message as MessageType } from '@/types'
import { FC } from 'react'

interface MessageProps {
  message: MessageType | undefined

}
const Message: FC<MessageProps> = ({
  message,

}) => {
  return (
    <p className={message!.sender === "CHATBOT" ? 'text-xl mr-auto text-blue-400 pl-10' : "text-xl ml-auto text-white pr-10"}>
      {message!.message}
    </p>
  )
}

export default Message
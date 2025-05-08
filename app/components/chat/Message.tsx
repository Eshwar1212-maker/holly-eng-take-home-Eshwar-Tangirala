import { Message as MessageType } from '@/types'
import { FC } from 'react'

interface MessageProps {
  message: MessageType | undefined

}
const Message: FC<MessageProps> = ({
  message,

}) => {
  return (
    <p className={message!.sender === "CHATBOT" ? 'text-md mr-auto text-blue-400 pl-10 max-w-[60%] my-3' : "text-md ml-auto text-white pr-10 max-w-[60%] my-3"}>
      {message!.message}
    </p>
  )
}

export default Message
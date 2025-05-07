"use client"

import { Message } from '@/types'
import { useState, type FC } from 'react'
interface FormProps {
  handleAddMessage: (message: Message) => void
}
const Form: FC<FormProps> = ({
  handleAddMessage
}) => {

  const [input, setInput] = useState("")
  
  return (
    <form
    className='flex items-center fixed bottom-10 w-[80%]'
    onSubmit={(e) => {
      e.preventDefault()
      handleAddMessage({message: input, sender: "USER"})
    }}
    >
        <input 
        className='text-black font-light py-2 px-4 w-full rounded-full focus:outline-none bg-white'
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
        }}
        />
        <button
        className='text-sm p-3 bg-blue-900 rounded-lg cursor-pointer'
        type='submit'
        >
            Send 
        </button>
    </form>
  )
}

export default Form
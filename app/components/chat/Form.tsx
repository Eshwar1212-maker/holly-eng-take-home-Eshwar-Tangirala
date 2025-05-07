"use client"

import { Message } from '@/types'
import { filterJobData } from '@/utils/chat-parsing/filterJobData'
import { useState, type FC } from 'react'

interface FormProps {
  handleAddMessage: (message: Message) => void
}
const Form: FC<FormProps> = ({
  handleAddMessage
}) => {

  const [input, setInput] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleAddMessage({ message: input, sender: "USER" });

    const { jobDescription, salaryData: filteredSalaryData } = filterJobData(input);

    console.log("Filtered Job Description:", jobDescription);
    console.log("Filtered Salary Data:", filteredSalaryData);
  }

  return (
    <form
      className='flex items-center fixed bottom-10 w-[80%]'
      onSubmit={handleSubmit}
    >
      <input 
        className='text-black font-light py-2 px-4 w-full rounded-full focus:outline-none bg-white'
        value={input}
        onChange={(e) => setInput(e.target.value)}
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

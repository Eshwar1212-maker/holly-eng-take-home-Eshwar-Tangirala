"use client";

import { Message } from "@/types";
import { filterJobData } from "@/utils/chat-parsing/filterJobData";
import { useState, type FC } from "react";

interface FormProps {
  handleAddMessage: (message: Message) => void;
}

const Form: FC<FormProps> = ({ handleAddMessage }) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleAddMessage({ message: input, sender: "USER" });

    const prompt = input;

    try {
      const { jobDescription, salaryData: filteredSalaryData } = filterJobData(input);

      const salRange: number[] = []
      
      if(filteredSalaryData){
        Object.values(filteredSalaryData).map((val) => {
          if (val){
            salRange.push(val)
          }
        })
        }
    
      const fullPrompt = `
        User Query: ${prompt}
        Job Description: ${jobDescription?.description || 'No description available'}
        Salary Range: ${filteredSalaryData ? `${salRange[2]} - ${salRange[salRange.length - 1]}` : 'Not available'}
        Just answer with the information needed in a concise sentence.
        Answer:
      `;      

      setIsLoading(true)
      setInput(""); 
      const response = await fetch('https://api.cohere.ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_COHERE_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'command-xlarge',
          prompt: fullPrompt,
          max_tokens: 100,
        }),
      });

      const data = await response.json();

      const chatbotMessage: Message = { message: data.text.trim(), sender: "CHATBOT" };
      setIsLoading(false)
      handleAddMessage(chatbotMessage);
      
    } catch (error) {
      console.error("Error while fetching Cohere response:", error);
      const errorMessage: Message = { message: "Sorry, I couldn't process your request, Please try again later", sender: "CHATBOT" };
      handleAddMessage(errorMessage);
    }

  
  };

  return (
    <form className="flex items-center fixed bottom-10 w-[80%]" onSubmit={handleSubmit}>
      <input
        className="text-black font-light py-2 px-4 w-full rounded-full focus:outline-none bg-white"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button 
      className="text-sm p-3 bg-blue-900 rounded-lg cursor-pointer" 
      type="submit"
      disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Send"}
      </button>
    </form>
  );
};

export default Form;

"use client";

import { Message } from "@/types";
import { filterJobData } from "@/utils/chat-parsing/filterJobData";
import { useState, type FC } from "react";

interface FormProps {
  handleAddMessage: (message: Message) => void;
}

const Form: FC<FormProps> = ({ handleAddMessage }) => {
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleAddMessage({ message: input, sender: "USER" });

    const prompt = input;

    try {
      const { jobDescription, salaryData: filteredSalaryData } = filterJobData(input);

      const fullPrompt = `
        User Query: ${prompt}
        Job Description: ${jobDescription?.description || 'No description available'}
        Salary Range: ${filteredSalaryData ? `${filteredSalaryData['Salary grade 1']} - ${filteredSalaryData['Salary grade 2']}` : 'Not available'}
        Answer:
      `;

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
      handleAddMessage(chatbotMessage);
    } catch (error) {
      console.error("Error while fetching Cohere response:", error);
      const errorMessage: Message = { message: "Sorry, I couldn't process your request.", sender: "CHATBOT" };
      handleAddMessage(errorMessage);
    }

    setInput(""); // Reset input field after submitting
  };

  return (
    <form className="flex items-center fixed bottom-10 w-[80%]" onSubmit={handleSubmit}>
      <input
        className="text-black font-light py-2 px-4 w-full rounded-full focus:outline-none bg-white"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="text-sm p-3 bg-blue-900 rounded-lg cursor-pointer" type="submit">
        Send
      </button>
    </form>
  );
};

export default Form;

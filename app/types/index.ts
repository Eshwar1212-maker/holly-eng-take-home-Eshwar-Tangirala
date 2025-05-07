export type Message = {
    message: string,
    sender: "CHATBOT" | "USER"
}

export interface JobPosting {
    jurisdiction: string;
    code: string;
    title: string;
    description: string;
  }
  
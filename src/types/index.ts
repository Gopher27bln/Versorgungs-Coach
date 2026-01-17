export type Sender = 'user' | 'coach' | 'advisor';

export interface Document {
  id: string;
  title: string;
  date: string;
  type: string;
  content: string;
}

export interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  timestamp: string;
}

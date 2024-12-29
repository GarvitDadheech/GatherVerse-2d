import { Message as MessageType } from "../interfaces";
export const AVAILABLE_REACTIONS = ["👍", "❤️", "😂", "😮", "😢", "😡"];

export const MOCK_MESSAGES: MessageType[] = [
  {
    id: 1,
    user: "Alice",
    content: "Hello!",
    timestamp: "2023-01-01T12:00:00Z",
    avatar: "/api/placeholder/32/32",
    type: "text",
    reactions: [{ emoji: "👍", count: 1, users: ["Bob"] }],
  },
  {
    id: 2,
    user: "Bob",
    content: "Hi Alice!",
    timestamp: "2023-01-01T12:01:00Z",
    avatar: "/api/placeholder/32/32",
    type: "text",
    reactions: [],
  },
];

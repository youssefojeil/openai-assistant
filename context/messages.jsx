import { nanoid } from 'nanoid';
import { createContext, useState } from 'react';

export const MessagesContext = createContext({
  messages: [],
  isMessageUpdating: false,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
});

export function MessagesProvider({ children }) {
  const [isMessageUpdating, setIsMessageUpdating] = useState(false);
  const [messages, setMessages] = useState([
    { id: nanoid(), text: 'Hello, how can i help you?', isUserMessage: false },
  ]);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const removeMessage = (id) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const updateMessage = (id, updateFn) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === id) {
          return {
            ...message,
            text: updateFn(message.text),
          };
        }
        return message;
      })
    );
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        addMessage,
        removeMessage,
        updateMessage,
        isMessageUpdating,
        setIsMessageUpdating,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

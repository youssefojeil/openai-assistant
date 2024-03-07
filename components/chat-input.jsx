'use client';

import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const ChatInput = ({ className, ...props }) => {
  const [input, setInput] = useState('');

  const { mutate: sendMessage, isLoading } = useMutation({
    mutationFn: async (message) => {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [message] }),
      });

      return response.body;
    },

    onSuccess: async (stream) => {
      if (!stream) throw new Error('No Stream found');

      const reader = stream.getReader();
      const decoder = new TextDecoder();

      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        console.log(chunkValue);
      }
    },
  });

  return (
    <div {...props} className={cn('border-t border-zinc-300 ', className)}>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();

              const message = {
                id: nanoid(),
                isUserMessage: true,
                text: input,
              };

              sendMessage(message);
            }
          }}
          rows={2}
          maxRows={4}
          autoFocus
          placeholder="Write a message..."
          className="peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default ChatInput;

'use client';

import { useState } from 'react';
import { Input } from '../Input/Index';
import { Message } from '../Message';

const ChatWindow = () => {
  const [value, setValue] = useState<string>('');

  return (
    <div className="border border-red-500 container flex flex-col py-8 relative">
      <Message.Root>
        <Message.Icon src="/icons/man.png" />
        <div className="flex flex-col gap-4">
          <Message.Content
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies
      magna sed tristique gravida. In euismod condimentum sem dignissim
      accumsan. Nulla faucibus odio vel felis efficitur consequat. Quisque mi
      ipsum, feugiat et pulvinar sed, convallis ac urna. Aenean sed magna sed
      felis iaculis malesuada eu nec sapien."
          />
          <Message.Action>
            <Message.Button>Sim</Message.Button>
            <Message.Button>Não</Message.Button>
          </Message.Action>
        </div>
      </Message.Root>
      <Input.Root>
        <Input.Text value={value} onChange={setValue} />
        <Input.Audio />
      </Input.Root>
    </div>
  );
};

export default ChatWindow;

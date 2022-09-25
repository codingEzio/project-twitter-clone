import React, { useState } from 'react';
import {
  PhotographIcon,
  SearchCircleIcon,
  EmojiHappyIcon,
  CalendarIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline';

export const TweetBox = () => {
  const [input, setInput] = useState<string>('');

  return (
    <div className="flex space-x-2 p-5">
      <img
        src="https://via.placeholder.com/350x350?text=Avatar"
        alt="Placeholder user avatar"
        className="h-14 w-14 object-cover rounded-full mt-4"
      />

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            type="text"
            placeholder="What's Happening?"
            value={input}
            onChange={event => setInput(event.target.value)}
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>

            <button
              className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40"
              disabled={!input}
            >
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

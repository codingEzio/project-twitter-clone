import React, { useState, useRef } from 'react';
import {
  PhotographIcon,
  SearchCircleIcon,
  EmojiHappyIcon,
  CalendarIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';

export const TweetBox = () => {
  const [input, setInput] = useState<string>('');
  const { data: session } = useSession();

  const [image, setImage] = useState<string>('');
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    if (!imageInputRef.current?.value) {
      return;
    }

    setImage(imageInputRef.current.value);

    imageInputRef.current.value = '';
    setImageUrlBoxIsOpen(false);
  };

  return (
    <div className="flex space-x-2 p-5">
      <img
        src={
          session?.user?.image ||
          'https://via.placeholder.com/350x350?text=Avatar'
        }
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
              <PhotographIcon
                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>

            <button
              className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40"
              disabled={!input || !session}
            >
              Tweet
            </button>
          </div>

          {imageUrlBoxIsOpen && (
            <form className="rounded-lg mt-5 flex bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                type="text"
                placeholder="Enter Image URL"
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add Image
              </button>
            </form>
          )}

          {image && (
            <img
              src={image}
              alt="Images waiting to be posted with the tweet"
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lgs"
            />
          )}
        </form>
      </div>
    </div>
  );
};

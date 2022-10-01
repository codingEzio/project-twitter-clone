import React from 'react';
import { Tweet } from '../typing';
import TimeAgo from 'react-timeago';

interface Props {
  tweet: Tweet;
}

function Tweet({ tweet }: Props) {
  return (
    <div className="flex flex-col space-x-3 border-y p-5 border-gray-100">
      <div className="flex space-x-3">
        <img
          src={tweet.profileImg}
          alt="User's profile image"
          className="h-10 w-10 rounded-full object-cover"
        />

        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, '').toLowerCase()}
            </p>

            <TimeAgo
              date={tweet._createdAt}
              className="text-sm text-gray-500"
            />
          </div>

          <p>{tweet.text}</p>
          {tweet.image && (
            <img
              src={tweet.image}
              alt="Images posted with current tweet"
              className="m-5 ml-0 mb-1 rounded-lg object-cover shadow-xl"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Tweet;

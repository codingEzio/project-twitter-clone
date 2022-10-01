import { RefreshIcon } from '@heroicons/react/outline';
import React from 'react';
import { Tweet } from '../typing';
import { TweetBox } from './TweetBox';
import TweetComponent from '../components/Tweet';

interface Props {
  tweets: Tweet[];
}

export const Feed = ({ tweets }: Props) => {
  return (
    <div className="col-span-5 mt-2 px-2">
      {/* Manual refreshing icon */}
      <div className="col-span-7 lg:col-span-5">
        <div className="flex items-center justify-between">
          <h1 className="p-5 pb-0 text-xl font-bold">Refresh</h1>
          <RefreshIcon className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
        </div>
      </div>

      {/* Tweetbox */}
      <div>
        <TweetBox />
      </div>

      {/* Feed */}
      <div>
        {tweets.map(tweet => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

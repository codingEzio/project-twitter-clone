import React, { useState, useEffect } from 'react';
import { CommentBody, Tweet } from '../typing';
import TimeAgo from 'react-timeago';
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline';
import { Comment } from '../typing';
import { fetchComments } from '../utils/fetchComment';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface Props {
  tweet: Tweet;
}

function Tweet({ tweet }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  const { data: session } = useSession();

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);

    setComments(comments);
  };

  const postComment = async () => {
    const commentInfo: CommentBody = {
      tweetId: tweet._id,
      comment: input,
      username: session?.user?.name || 'Unknown User',
      profileImg:
        session?.user?.image ||
        'https://via.placeholder.com/350x350?text=Profile+Image',
    };

    const result = await fetch('/api/addComment', {
      body: JSON.stringify(commentInfo),
      method: 'POST',
    });

    const json = await result.json();

    const newComments = await fetchComments(tweet._id);
    setComments(newComments);

    toast('Commented Added', {
      icon: '🥸',
    });

    return json;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postComment();

    setInput('');
    setCommentBoxVisible(false);
  };

  useEffect(() => {
    refreshComments();
  }, []);

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

      <div className="flex justify-between mt-5">
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ChatAlt2Icon
            onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
            className="h-5 w-5"
          />
          <p>{comments.length}</p>
        </div>

        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>

        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <SwitchHorizontalIcon className="h-5 w-5" />
        </div>

        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <UploadIcon className="h-5 w-5" />
        </div>
      </div>

      {/* Comment Box logic */}

      {commentBoxVisible && (
        <form onSubmit={handleSubmit} className="mt-3 flex space-x-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            type="text"
            placeholder="Write a comment..."
            className="flex-1 rounded-lg p-2 outline-none"
          />
          <button
            disabled={!input}
            type="submit"
            className="text-twitter disable:text-gray-200"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
          {comments.map(comment => (
            <div key={comment._id} className="flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />

              <img
                src={comment.profileImg}
                alt="Image posted with comment"
                className="h-7 w-7 object-cover rounded-full"
              />

              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @{comment.username.replace(/\s+/g, '').toLowerCase()}
                  </p>

                  <TimeAgo
                    date={comment._createdAt}
                    className="text-sm text-gray-500"
                  />
                </div>
              </div>

              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tweet;

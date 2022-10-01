// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { groq } from 'next-sanity';
import { sanityClient } from '../../sanity';
import { Comment } from '../../typing';

const commentQuery = groq`
*[
    _type == 'comment' &&
    references( *[_type == 'tweet' && _id == '8b47fb43-6b4d-4050-a7f6-6d06bb3f6526']._id )
  ]

  {
    _id,
    ...
  } | order(_createdAt desc)
`;

type Data = Comment[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { tweetId } = req.query;

  const comments: Comment[] = await sanityClient.fetch(commentQuery);

  res.status(200).json(comments);
}

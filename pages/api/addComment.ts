// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { CommentBody } from '../../typing';

type Data = {
  message: string;
};

// Accessible from http://localhost:3000/api/hello
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const comment: CommentBody = JSON.parse(req.body);

  const mutations = {
    mutations: [
      {
        create: {
          _type: 'comment',
          comment: comment.comment,
          username: comment.username,
          profileImg: comment.profileImg,
          tweet: {
            _type: 'reference',
            _ref: comment.tweetId,
          },
        },
      },
    ],
  };

  const apiEndPoint = 'https://'.concat(
    `${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`,
    '.api.sanity.io',
    '/v2021-10-21/data',
    '/mutate',
    `/${process.env.NEXT_PUBLIC_SANITY_DATESET}`,
  );

  const result = await fetch(apiEndPoint, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
    },
    body: JSON.stringify(mutations),
    method: 'POST',
  });

  const json = await result.json();

  res.status(200).json({ message: 'Commented' });
}

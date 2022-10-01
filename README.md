
## Initialization

### Foreword

> Try to build a Twitter clone from [🔴 Let's build Twitter 2.0 with REACT.JS! (Next.js, Sanity CMS, Typescript, SSR, Tailwind & NextAuth)](https://www.youtube.com/watch?v=rCselwxbUgA)

### Preparation

##### Init

> `npx create-next-app --example with-tailwindcss proj-twitter-clone`

##### Post-init

```bash
# Icons
yarn add @heroicons/react@v1


# Twitter timeline content
yarn add @react-twitter-embed


# Datastore for content
# Consider it as a no-code DB management Software (like BeeKeeper)
yarn global add @sanity/cli
sanity init --coupon sonny2022

cd sanity && sanity start


# Sanity toolkit for Next.js
# Consider it as utilities for the datastore to integrate with Next.js
yarn add next-sanity @portabletext/react @sanity/image-url
```

### Functionality

##### Fetching Tweet

> [GROQ](https://dorelljames.com/blog/groq-a-graphql-alternative/): Similar syntax to GraphQL, but designed for fetching/filtering JSON

- `/pages/api/getTweets.ts`
  - Build the *GROQ* string which queries the tweets data from Sanity
  - Build the typing both for the returned data and for the sake of TypeScript
  - Let *Sanity Client* use *GROQ* to do the request and get the data
- `/utils/fetchTweet.ts`
  > Higher level abstraction for the pages to use
- `pages/index.tsx`
  > Call our pre-built fetch APIs and render those data been returned

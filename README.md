
## Initilization

### Foreword

> Try to build a Twitter clone from [🔴 Let's build Twitter 2.0 with REACT.JS! (Next.js, Sanity CMS, Typescript, SSR, Tailwind & NextAuth)](https://www.youtube.com/watch?v=rCselwxbUgA)

### Install

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
```

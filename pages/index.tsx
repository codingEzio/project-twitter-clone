import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Feed } from '../components/Feed';
import { Sidebar } from '../components/Sidebar';
import Widgets from '../components/Widgets';
import { Tweet } from '../typing';
import { fetchTweets } from '../utils/fetchTweet';

interface Props {
  tweets: Tweet[];
}

const Home = ({ tweets }: Props) => {
  console.log(tweets);

  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Twitter Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-cols-9">
        {/* Sidebar */}
        <Sidebar />

        {/* Feed */}
        <Feed />

        {/* Widgets */}
        <Widgets />
      </main>
    </div>
  );
};

export default Home;

// Enable server-side rendering (compile those .js code on the server)
export const getServerSideProps: GetServerSideProps = async context => {
  const tweets = await fetchTweets();

  return {
    props: {
      tweets,
    },
  };
};

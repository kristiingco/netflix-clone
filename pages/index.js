import Head from "next/head";
import Banner from "../components/banner/Banner";
import NavBar from "../components/nav-bar/NavBar";
import SectionCards from "../components/card/SectionCards";

import {
  getVideos,
  getPopularVideos,
  getWatchItAgainVideos,
} from "../lib/videos";

import styles from "../styles/Home.module.css";
import useRedirectUser from "../utils/redirectUser";

export async function getServerSideProps(context) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userId, token } = await useRedirectUser(context);

  const bangtanVideos = await getVideos("bts music video");
  const maplestoryVideos = await getVideos("maplestory official");
  const pokemonVideos = await getVideos("pokemon official");
  const genshinVideos = await getVideos("genshin impact official");
  const popularVideos = await getPopularVideos();
  const watchItAgainVideos = await getWatchItAgainVideos(token, userId);
  return {
    props: {
      bangtanVideos,
      maplestoryVideos,
      pokemonVideos,
      genshinVideos,
      popularVideos,
      watchItAgainVideos,
    },
  };
}

export default function Home({
  bangtanVideos,
  maplestoryVideos,
  pokemonVideos,
  genshinVideos,
  popularVideos,
  watchItAgainVideos = [],
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <NavBar />
        <Banner
          videoId="WMweEpGlu_U"
          title="Butter by BTS"
          subTitle="Stream legends now!"
          imgUrl="https://i.ytimg.com/vi/WMweEpGlu_U/maxresdefault.jpg"
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title="BTS" videos={bangtanVideos} size="large" />
          <SectionCards
            title="Watch It Again"
            videos={watchItAgainVideos}
            size="small"
          />
          <SectionCards
            title="Maplestory"
            videos={maplestoryVideos}
            size="small"
          />
          <SectionCards title="Pokemon" videos={pokemonVideos} size="medium" />
          <SectionCards
            title="Genshin Impact"
            videos={genshinVideos}
            size="small"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
}

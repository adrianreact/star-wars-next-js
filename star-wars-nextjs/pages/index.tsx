import Head from 'next/head';
import Link from 'next/link';

import { HomeProps } from '../types/Home.types';
import { Planet } from '../types/Planets.types';

import styles from '../styles/Home.module.css';

const Home = ({ planets }: HomeProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Star Wars Navigation System</title>
        <meta name="description" content="Star Wars Navigation System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Star Wars Navigation System</h1>

        <div className={styles.grid}>
          {planets.map(({ name, url }: Planet) => {
            return (
              <Link key={name} href={String(url.split('/api').pop())}>
                <a className={styles.card}>
                  <h2>{name}</h2>
                </a>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const response = await fetch(String(process.env.API_URL));
  const data = await response.json();

  return {
    props: {
      planets: data.results,
    },
  };
};

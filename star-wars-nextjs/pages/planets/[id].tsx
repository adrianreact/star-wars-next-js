import Head from 'next/head';
import { GetStaticProps } from 'next';

import { PlanetPageProps, Planet as PlanetType } from '../../types/Planets.types';

import styles from '../../styles/Planets.module.css';

const Planet = ({ planet }: PlanetPageProps) => {
  console.log(planet);
  const { name, climate, orbital_period, rotation_period, surface_water } = planet;

  return (
    <div>
      <Head>
        <title>{name}</title>
        <meta name="description" content={`${name} description`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3>
          Planet name: <span>{name}</span>
        </h3>

        <h5>
          Climate: <span>{climate}</span>
        </h5>

        <ul className={styles.list}>
          <li>
            Orbital period: <span>{orbital_period}</span>
          </li>
          <li>
            Rotation period: <span>{rotation_period}</span>
          </li>
          <li>
            Surface water: <span>{surface_water}</span>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Planet;

export const getStaticPaths = async () => {
  const response = await fetch(String(process.env.API_URL));
  const data = await response.json();

  const paths = data.results.map((planet: PlanetType) => ({
    params: { id: String(planet.url.split('planets/').pop()?.slice(0, -1)) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const id = context.params?.id;
  const response = await fetch(String(process.env.API_URL) + id);
  const data = await response.json();

  return {
    props: {
      planet: data,
    },
  };
};

import Hero from "app/components/Hero";

import styles from "./Home.module.scss";

import RecommendedTrips from "./components/RecommendedTrips";

export default function Home() {
  return (
    <main>
      <Hero />

      <RecommendedTrips />
    </main>
  );
}

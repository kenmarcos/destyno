export const useHero = () => {
  const goToRecommendedTrips = () => {
    window.scrollTo({
      top: document.getElementById("recommendedTrips")?.offsetTop,
      behavior: "smooth",
    });
  };

  return {
    goToRecommendedTrips,
  };
};

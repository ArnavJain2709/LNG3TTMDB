import { useLocation } from "@solidjs/router";
import styles from "./DetailsPage.module.css"; // Import CSS Module for styling

const DetailsPage = () => {
  const location = useLocation();
  const details = location.state?.details || {}; // Get details from state
  const type = location.pathname.split("/")[2]; // Determine type from URL

  if (!details) {
    return <div>No details available</div>;
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${details.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${details.poster_path}`;

  return (
    <div class={styles.detailsPage}>
      <div
        class={styles.background}
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div class={styles.overlay}>
          <div class={styles.posterContainer}>
            <img src={posterUrl} alt={details.title} class={styles.poster} />
          </div>
          <div class={styles.info}>
            <h1 class={styles.title}>{details.title}</h1>
            <p class={styles.description}>{details.overview}</p>
            <p class={styles.additionalInfo}>
              Release Date: {details.release_date || details.first_air_date}
            </p>
            <p class={styles.additionalInfo}>Rating: {details.vote_average}</p>
            {/* Add more fields as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;

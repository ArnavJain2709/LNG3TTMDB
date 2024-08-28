export async function fetchCastWithImages(id, mediaType) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=647a0da34d4e88de809e8522efed4baf`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch cast for ${mediaType} with ID ${id}`);
    }
    const data = await response.json();
    const cast = data.cast || [];

    // Filter out cast members without a profile path and limit to a maximum of 10 cast members
    const castWithImages = cast
      .filter((member) => member.profile_path)
      .slice(0, 10);

    // Map each cast member to include the full image URL
    return castWithImages.map((member) => ({
      ...member,
      profile_image: `https://image.tmdb.org/t/p/w500${member.profile_path}`,
    }));
  } catch (error) {
    console.error(
      `Error fetching cast with images for ${mediaType} with ID ${id}:`,
      error
    );
    return [];
  }
}

export async function fetchRecommendations(id, mediaType) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations?api_key=647a0da34d4e88de809e8522efed4baf`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch recommendations for ${mediaType} with ID ${id}`
      );
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(
      `Error fetching recommendations for ${mediaType} with ID ${id}:`,
      error
    );
    return [];
  }
}

export async function fetchTrending() {
  try {
    // Fetch trending movies
    const trendingMoviesResponse = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=647a0da34d4e88de809e8522efed4baf"
    );
    if (!trendingMoviesResponse.ok) {
      throw new Error("Failed to fetch trending movies");
    }
    const trendingMoviesData = await trendingMoviesResponse.json();
    const trendingMovies = trendingMoviesData.results || [];

    // Fetch trending TV shows
    const trendingShowsResponse = await fetch(
      "https://api.themoviedb.org/3/trending/tv/day?api_key=647a0da34d4e88de809e8522efed4baf"
    );
    if (!trendingShowsResponse.ok) {
      throw new Error("Failed to fetch trending TV shows");
    }
    const trendingShowsData = await trendingShowsResponse.json();
    const trendingShows = trendingShowsData.results || [];

    // Combine the results from movies and TV shows
    const combinedTrending = [...trendingMovies, ...trendingShows];

    // Sort the combined array by popularity in ascending order
    // const sortedTrending = combinedTrending.sort(
    //   (a, b) => a.vote_average - b.vote_average
    // );

    return combinedTrending;
  } catch (error) {
    console.error("Error fetching trending movies and shows:", error);
    return [];
  }
}

export async function fetchMovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=647a0da34d4e88de809e8522efed4baf"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

export async function fetchTvShows() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=647a0da34d4e88de809e8522efed4baf"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch TV shows");
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    return [];
  }
}

export async function searchContent(searchTerm) {
  try {
    // First, search for movies, TV shows, and people
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=647a0da34d4e88de809e8522efed4baf&query=${encodeURIComponent(
        searchTerm
      )}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }
    const data = await response.json();
    const results = data.results || [];

    // If there are any people in the results, fetch their credits
    const peopleResults = results.filter(
      (item) => item.media_type === "person"
    );
    const creditsPromises = peopleResults.map((person) =>
      fetch(
        `https://api.themoviedb.org/3/person/${person.id}/combined_credits?api_key=647a0da34d4e88de809e8522efed4baf`
      )
        .then((res) => res.json())
        .then((creditsData) => creditsData.cast || [])
    );

    const creditsResults = await Promise.all(creditsPromises);

    // Combine all results
    const combinedResults = [
      ...results.filter((item) => item.media_type !== "person"),
      ...creditsResults.flat(),
    ];

    // Remove duplicates based on id
    const uniqueResults = Array.from(
      new Set(combinedResults.map((item) => item.id))
    ).map((id) => combinedResults.find((item) => item.id === id));

    return uniqueResults;
  } catch (error) {
    console.error("Error searching content:", error);
    return [];
  }
}

export async function getCast(id, mediaType) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=647a0da34d4e88de809e8522efed4baf`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch cast");
    }
    const data = await response.json();
    return data.cast || [];
  } catch (error) {
    console.error("Error fetching cast:", error);
    return [];
  }
}

export function getBackdropUrl(backdropPath) {
  const size = "w1280";
  const baseUrl = "https://image.tmdb.org/t/p/";
  if (!backdropPath) {
    console.log("No backdrop path provided");
    return null; // Return null if no backdrop path is provided
  }
  return `${baseUrl}${size}${backdropPath}`;
}

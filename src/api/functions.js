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

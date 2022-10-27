export const APIkey = process.env.API_KEY;


//Remember to hide API Key
const requests = {
    fetchTrending: `https://api.themoviedb.org/3/trending/all/day?api_key=${APIkey}&language=en_US`,

    fetchPopularMovie: `https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}&language=en-US&page=1`,
    fetchUpcomingMovie: `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIkey}&language=en-US&page=1`,
    fetchTopRatedMovie: `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIkey}&language=en-US`,
    fetchActionMovie: `https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&language=en-US&with_genres=28`,
    fetchAnimationMovie: `https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&language=en-US&with_genres=16`,
    fetchDramaMovie: `https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&language=en-US&with_genres=18`,
    fetchRomanceMovie: `https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&language=en-US&with_genres=10749`,
    
    fetchNetflixOriginal: `https://api.themoviedb.org/3/discover/tv?api_key=${APIkey}&with_networks=213`,
    fetchTopRatedTV: `https://api.themoviedb.org/3/tv/top_rated?api_key=${APIkey}&language=en-US&page=1`,
    fetchPopularTV: `https://api.themoviedb.org/3/tv/popular?api_key=${APIkey}&language=en-US&page=1`,
    fetchActionTV: `https://api.themoviedb.org/3/discover/tv?api_key=${APIkey}&language=en-US&with_genres=10759`,
    fetchAnimationTV: `https://api.themoviedb.org/3/discover/tv?api_key=${APIkey}&language=en-US&with_genres=16`,
    fetchDramaTV: `https://api.themoviedb.org/3/discover/tv?api_key=${APIkey}&language=en-US&with_genres=18`,
    fetchDocumentaryTV : `https://api.themoviedb.org/3/discover/tv?api_key=${APIkey}&language=en-US&with_genres=99`,
}


export default requests;
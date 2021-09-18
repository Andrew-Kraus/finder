import './index.css';
import '../vendor/normalize.css';
import MusicAuthApi from './MusicAuthApi';
import MusicFetchTracks from './MusicFetchTracks';
import { REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET } from '../pass';

const header = document.querySelector('.header');

const notFound = document.querySelector('.results__not-found-container');
const musicSubmit = document.querySelector('.news__submit');

const TOKEN = 'https://accounts.spotify.com/api/token';
const TRACKS = 'https://api.spotify.com/v1/playlists/2nbGdBSqvY8h9KCEekn2PA/tracks';

const musicAuthApi = new MusicAuthApi(REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET, TOKEN);
const musicFetchTracks = new MusicFetchTracks(TRACKS, musicAuthApi, notFound);

window.addEventListener('scroll', () => {
  header.classList.toggle('sticky', window.scrollY > 0);
});

window.addEventListener('load', () => {
  musicAuthApi.onPageLoad();
});

musicSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  musicFetchTracks.fetchTracks();
});

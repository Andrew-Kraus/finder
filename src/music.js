import './index.css';
import '../vendor/normalize.css';
import MusicAuthApi from './MusicAuthApi';
import MusicFetchTracks from './MusicFetchTracks';

const header = document.querySelector('.header');

const client_id = "717cad3f2d7f43529fbacd9d746b63db";
const client_secret = "075e40d5a43a494f86291cad0e8501ca";
const refresh_token = 'AQB6ZJvQPgvAcFPawiLHiJsLBZVDbtirKf9fpatcaDirQ547ZKt1QtGfRsnZtVMZecpnybslIzHWgJPnydlWfc6SjFLlEgkDua2pw_lG-TSiPDMZaVS73JZBwHujqCQDQ8M';

const notFound = document.querySelector('.results__not-found-container');
const musicSubmit = document.querySelector('.news__submit');

const TOKEN = 'https://accounts.spotify.com/api/token';
const TRACKS = 'https://api.spotify.com/v1/playlists/2nbGdBSqvY8h9KCEekn2PA/tracks';

const musicAuthApi = new MusicAuthApi(refresh_token, client_id, client_secret, TOKEN);
const musicFetchTracks = new MusicFetchTracks(TRACKS, musicAuthApi, notFound);

window.addEventListener('scroll', () => {
  header.classList.toggle('sticky', window.scrollY > 0);
});

window.addEventListener('load', () => {
  musicAuthApi.onPageLoad();
});

musicSubmit.addEventListener('click', () => {
  musicFetchTracks.fetchTracks();
});

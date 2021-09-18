const musicResults = document.querySelector('.music__result');

export default class MusicFetchTracks {
  constructor(url, musicAuthApi, notFound) {
    this.url = url;
    this.musicAuthApi = musicAuthApi;
    this.notFound = notFound;
  }

  fetchTracksApi = () => {
    let access_token = localStorage.getItem('access_token');
    return fetch(this.url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if ( res.status == 401 ){
       this.musicAuthApi.refreshAccessToken();
      }
      });
  }

  fetchTracks = () => {
    this.preloader(true);
    this.fetchTracksApi()
      .then((data) => {
        musicResults.innerHTML = '';
        console.log(data);
        const inputTrack = document.querySelector('.news__input').value.toLowerCase();
        for (let i = 0; i < 101; i++) {
          if (inputTrack === data.items[i].track.name.toLowerCase()) {
            this.musicResults.insertAdjacentHTML('beforeend',
              `
          <iframe class="iframe-settings" src="https://open.spotify.com/embed/track/${data.items[i].track.id}?theme=0" width="320px" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          `);
          } else if (inputTrack === data.items[i].track.artists[0].name.toLowerCase()) {
            musicResults.insertAdjacentHTML('beforeend',
              `
          <iframe class="iframe-settings" src="https://open.spotify.com/embed/track/${data.items[i].track.id}?theme=0" width="320px" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          `);
          } else if (inputTrack === data.items[i].track.artists[0].name.toLowerCase() + ' ' + data.items[i].track.name.toLowerCase() ||
            inputTrack === data.items[i].track.name.toLowerCase() + ' ' + data.items[i].track.artists[0].name.toLowerCase() ||
            inputTrack === data.items[i].track.artists[0].name.toLowerCase() + ' - ' + data.items[i].track.name.toLowerCase() ||
            inputTrack === data.items[i].track.name.toLowerCase() + ' - ' + data.items[i].track.artists[0].name.toLowerCase()) {
            musicResults.insertAdjacentHTML('beforeend',
              `
          <iframe class="iframe-settings" src="https://open.spotify.com/embed/track/${data.items[i].track.id}?theme=0" width="320px" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          `);
          }
        }
      })
      .catch((err) => console.log(err))
      .then(() => {
        this.checkForEmpty();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.preloader(false);
      });
    }

  checkForEmpty = () => {
    if (musicResults.innerHTML === '') {
      this.notFound.style.display = 'flex';
    } else {
      this.notFound.style.display = 'none';
    }
  }

  preloader = isLoading => {
    this.spinner = document.querySelector('.preloader');

    isLoading
      ? this.spinner.style.display = 'flex'
      : this.spinner.style.display = 'none';
  }

}

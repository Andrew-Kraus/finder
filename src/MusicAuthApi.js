export default class MusicAuthApi {
  constructor(refreshToken, clientId, clientSecret, token) {
    this.refreshToken = refreshToken;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.token = token;
  }

  refreshAccessToken() {
    let body = 'grant_type=refresh_token';
    body += '&refresh_token=' + this.refreshToken;
    body += '&client_id=' + this.clientId;
    this.callAuthApi(body);
  }

  callAuthApi(body) {
    fetch(this.token, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(this.clientId + ":" + this.clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data.access_token !== undefined) {
          let access_token = data.access_token;
          localStorage.setItem('access_token', access_token);
        }
        this.onPageLoad();
      });
  }

  onPageLoad() {
    let access_token = localStorage.getItem('access_token');
    if (access_token == null) {
      this.refreshAccessToken();
    }
  }
}

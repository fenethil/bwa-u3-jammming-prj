// User_ID: d429bab487ad4d2bbdc692782a504fee
// User_Secret: 7baf970c8c3c446e8a661bc061a5e481

// https://api.spotify.com/v1/users/{user_id}/playlists
// https://api.spotify.com/v1/me

//Credentials
const appID = 'd429bab487ad4d2bbdc692782a504fee';
let redirectUri = 'https://jammming_pv_v4.surge.sh/';
const spotifyEndPoint = 'https://api.spotify.com/v1/search?type=track';
let userAccessToken = '';
let tokenTime = '';
let tokenUrl = '';
let userID = '';
let playlistID = '';


let Spotify = {


    // check if there is an access token
  getAccessToken (){
    if(userAccessToken !== '') {
      return new Promise(resolve => resolve(userAccessToken))}

    // check if the userToken has just been obtained
    // if yes, the url of the page would contain a hash fragment
    // the hash fragment contain the token and its expiration time in seconds
    if(userAccessToken === '' && window.location.href !== redirectUri) {
      tokenUrl = window.location.href;
      userAccessToken = tokenUrl.split('en=').pop().split('&').shift();
      tokenTime =   tokenUrl.split('expires_in=').pop().split('&').shift();
      window.setTimeout(() => userAccessToken = '', tokenTime * 1000);
      window.history.pushState('Access Token', null, '/');
      return new Promise(resolve => resolve(userAccessToken));
    }

    // if there is no token at all then asks the user to log in their spotify account
    if(userAccessToken === '' && window.location.href === redirectUri ){
    window.location.assign('https://accounts.spotify.com/authorize?client_id='
    + appID
    + '&response_type=token&scope=playlist-modify-private&redirect_uri='
    + redirectUri)}
  },

  // Access the Spotify tracks according the keyword with the user Access Token,

  search(keyword) {
    return Spotify.getAccessToken().then(() => {

    return fetch(
      'https://cors-anywhere.herokuapp.com/'
      + spotifyEndPoint
      +'&q='
      + keyword,
      {headers: {Authorization: `Bearer ${userAccessToken}`}}
    )}
    ).then(response => {return response.json()}
    ).then(jsonResponse => {
      if (jsonResponse.tracks.items) {
        return jsonResponse.tracks.items.map(tracks => (
          {
            id:       tracks.id,
            name:     tracks.name,
            artist:   tracks.artists[0].name,
            album:    tracks.album.name,
            uri:      tracks.uri
          }
        ))
      } else {return []}
    })

  },

// method that pushes the created playlist in the user spotify account
  postNewPlaylist(playlistName, tracks) {

      return fetch(
        'https://cors-anywhere.herokuapp.com/'
        + 'https://api.spotify.com/v1/me',
        {headers: {Authorization: `Bearer ${userAccessToken}`}}
      ).then(response => {return response.json()}
      ).then(jsonResponse => {
        if (jsonResponse) {
          userID = jsonResponse.id
          return userID
        }
      }).then(()=> {

      return fetch(
        'https://cors-anywhere.herokuapp.com/'
        + 'https://api.spotify.com/v1/users/'
        + userID
        + '/playlists',
        {
        headers: {  'Authorization': `Bearer ${userAccessToken}`,
                    'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({'name': playlistName})
      })}
        ).then(response => {
          if(response.ok){
            return response.json().then(
              jsonResponse => {
                if (jsonResponse) {
                  playlistID = jsonResponse.id
                  return playlistID
                }
              }
            )
          }
        }).then(()=>{
      return fetch(
        'https://cors-anywhere.herokuapp.com/'
        + 'https://api.spotify.com/v1/users/'
        + userID
        + '/playlists/'
        + playlistID
        + '/tracks',
        {
        headers: {  Authorization: `Bearer ${userAccessToken}`,
                    'Content-Type': 'application/json'  },
        method: 'POST',
        body: JSON.stringify({'uris': tracks})
      })}
        ).then(response => {return response.json()}
        ).then(jsonResponse => {
          if (jsonResponse) {
          }
        })
  }

}

export default Spotify;

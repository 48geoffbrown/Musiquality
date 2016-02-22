/**
 * Created by geoffbrown1 on 2/22/16.
 */
var app = angular.module('artistHome', []);

app.controller('ArtistHomeController', ArtistHomeController);

function ArtistHomeController($http) {
  // controller data and functions
  var ah = this;
  ah.artist = '';
  ah.results = '';
  ah.found = '';
  ah.news = '';
  ah.purchase1 = '';
  ah.purchase2 = '';
  ah.purchase3 = '';
  ah.track1 = '';
  ah.track2 = '';
  ah.track3 = '';
  ah.track1Name = '';
  ah.track2Name = '';
  ah.track3Name = '';
  ah.artistSearchHome = artistSearchHome;
  //nc.songPlay = songPlay;

  function artistSearchHome(artist) {
    ah.results = '';
    ah.found = '';
    $http.get('https://api.spotify.com/v1/search?q=' + artist + '&type=artist').then(function (response) {
      ah.results = response.data.artists.items[0].images[1].url;
      ah.found = response.data.artists.items[0].name;
      $http.get('https://api.spotify.com/v1/search?q=' + artist + '&type=track').then(function (response) {
        ah.track1 = response.data.tracks.items[0].preview_url;
        ah.track2 = response.data.tracks.items[1].preview_url;
        ah.track3 = response.data.tracks.items[2].preview_url;
        ah.track1Name = response.data.tracks.items[0].name;
        ah.track2Name = response.data.tracks.items[1].name;
        ah.track3Name = response.data.tracks.items[2].name;
        ah.purchase1 = 'http://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Ddigital-music&field-keywords='+ artist + '+' + ah.track1Name;
        ah.purchase2 = 'http://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Ddigital-music&field-keywords='+ artist + '+' + ah.track2Name;
        ah.purchase3 = 'http://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Ddigital-music&field-keywords='+ artist + '+' + ah.track3Name;
        ah.news = 'http://www.billboard.com/search/site/' + artist + '?f[0]=ss_bb_type%3Aarticle';
        ah.bio = 'https://en.wikipedia.org/wiki/' + artist;
      });
    });
    console.log(artist + '2');
    ah.artist = '';
  }
}
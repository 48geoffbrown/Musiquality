/**
 * Created by DanTutt on 2/19/16.
 */
var app = angular.module('songTitle', []);

app.controller('TitleController', TitleController);

function TitleController($http, artistService, $state) {
  var tc = this;
  tc.song = '';
  tc.bandPic = '';
  tc.results = '';
  tc.songTitleSearch = songTitleSearch;
  tc.audioObject = null;
  tc.playTrack = playTrack;
  tc.pauseTrack = pauseTrack;
  tc.currentArtist = currentArtist;
  tc.hideAlert = hideAlert;

  function songTitleSearch(song) {

      $http.get('https://api.spotify.com/v1/search?q=' + song + '&type=track').then(function (response) {
        tc.results = response.data.tracks.items;
        if(tc.results == '') {
          tc.noResults = true;
        }
      });
  }

  function currentArtist(id) {
    artistService.id = id;
    $state.go('tabsController.artistHome');
  }


  function playTrack(track) {
    if (tc.audioObject !== null) {
      tc.audioObject.pause();
      tc.audioObject = new Audio(track);
      tc.audioObject.play();
    }
    else {
      tc.audioObject = new Audio(track);
      tc.audioObject.play();
    }
  }

  function pauseTrack() {
    tc.audioObject.pause();
  }
  function hideAlert(){
    tc.noResults = false;
  }


}





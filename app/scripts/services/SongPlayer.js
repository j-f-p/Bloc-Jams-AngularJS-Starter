(function() {
  function SongPlayer() {
    /**
    * @desc scope object
    * @type {Object}
    */
    let SongPlayer = {};
    /**
    * @desc song object
    * @type {Object}
    */
    let currentSong = null;
    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    let currentBuzzObject = null;

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file
    * @param {Object} song
    */
    let setSong = function(song) {
      if(currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl,
      { formats: ['mp3'], preload: true} );

      currentSong = song;
    };

    /**
    * @function playSong
    * @desc Plays set song
    * @param {Object} song
    */
    let playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    /**
    * @function play
    * @desc executes logic for playing song upon click of play button
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      if(currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (currentSong===song) {
        if(currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
        }
      }
    };

    /**
    * @function play
    * @desc executes logic for pausing song upon click of pause button
    * @param {Object} song
    */
    SongPlayer.pause = function(song) {
        currentBuzzObject.pause();
        song.playing = false;
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();

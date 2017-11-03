(function() {
  function timecode(SongPlayer) {
    return function(secondsString) {
      return SongPlayer.formatTime(secondsString);
    };
  }

  angular
    .module('blocJams')
    .filter('timecode', ['SongPlayer', timecode]);
})();

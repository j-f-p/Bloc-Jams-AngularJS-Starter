(function() {
  function timecode() {
    return function(secondsString) {
      let seconds = Number.parseFloat(secondsString);

      if(Number.isNaN(seconds)) return '-:--';

      let wholeSeconds = Math.floor(seconds);
      let minutes = Math.floor(wholeSeconds/60);
      let remainingSeconds = wholeSeconds % 60;

      let output = minutes + ':';
      if(remainingSeconds<10) output+='0';
      output+=remainingSeconds;

      return output;
    };
  }

  angular
    .module('blocJams')
    .filter('timecode', timecode);
})();

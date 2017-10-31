(function() {
  function timecode() {
    return function(secondsString) {
      return buzz.toTimer( Number.parseFloat(secondsString) );
    };
  }

  angular
    .module('blocJams')
    .filter('timecode', timecode);
})();

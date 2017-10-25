(function() {
  function seekBar() {
    let calculatePercent = function(seekBar, event) {
      let offsetX = event.pageX - seekBar.offset().left;
      let seekBarWidth = seekBar.width();
      let offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;
    };

    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      scope: { },
      link: function(scope, element, attributes) {
        scope.value = 0;
        scope.max = 100;

        let seekBar = $(element);

        let percentString = function() {
          let value = scope.value;
          let max = scope.max;
          let percent = value / max * 100;
          return percent + "%";
        };

        scope.fillStyle = function() {
          return {width: percentString()};
        };

        scope.onClickSeekBar = function(event) {
          let percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
        };
      }
    };
  }

  angular
    .module('blocJams')
    .directive('seekBar', seekBar);
})();

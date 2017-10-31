(function() {
  function seekBar($document) {
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
      scope: {
        onChange: '&'
      },
      link: function(scope, element, attributes) {
        scope.value = 0;
        scope.max = 100;

        let seekBar = $(element);

        attributes.$observe('avalue', function(newValue) {
          scope.value = newValue;
        });

        attributes.$observe('max', function(newValue) {
          scope.max = newValue;
        })

        let percentString = function() {
          let value = scope.value;
          let max = scope.max;
          let percent = value / max * 100;
          return percent + "%";
        };

        scope.fillStyle = function() {
          return {width: percentString()};
        };

        scope.thumbStyle = function () {
          return {left: percentString()};
        };

        scope.onClickSeekBar = function(event) {
          let percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
          notifyOnChange(scope.value);
        };

        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event){
            let percent = calculatePercent(seekBar, event);
            scope.$apply(function() {
              scope.value = percent * scope.max;
              notifyOnChange(scope.value);
            });
          });

          $document.bind('mouseup.thumb', function() {
            $document.unbind('mousemove.thumb');
            $document.unbind('mouseup.thumb');
          });
        };

        let notifyOnChange = function(newValue) {
          if(typeof scope.onChange==='function') {
            scope.onChange({kvalue: newValue});
          }
        };
      }
    };
  }

  angular
    .module('blocJams')
    .directive('seekBar', ['$document', seekBar]);
})();

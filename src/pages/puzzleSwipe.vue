<template>
  <div class="puzzle-swipe">
    <canvas id="canvas" width="300" height="300">
      cannot support canvas
    </canvas>
    <ul id="game" class="grid-x small-up-3">
      <li class="cell"><img></li>
      <li class="cell"><img></li>
      <li class="cell"><img></li>
      <li class="cell"><img></li>
      <li class="cell"><img></li>
      <li class="cell"><img></li>
      <li class="cell"><img></li>
      <li class="cell"><img></li>
      <li class="cell"><img></li>
    </ul>
  </div>
</template>

<style rel='stylesheet/scss' lang="scss" scoped>
  .puzzle-swipe{
    #canvas {
      display: none;
    }
    #game{
      min-height: 300px;
      .cell{
        padding: 2px;
      }
    }
  }
</style>

<script>
  export default {
    mounted(){
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      var $game = $('#game');
      var $lis = $game.find('li');
      var image = new Image();
      var oriArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      var imgArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      var App = {
        bind: function() {
          //阻止手机上浏览器的弹性下拉。。。
          $('.puzzle-phone').on('touchstart', function(e) {
            e.preventDefault();
          });

          $lis.on('swipeLeft', function(e) {
            e.preventDefault();
            var $this = $(this);
            var index = $this.index();
            var html = $this.html();
            var $prev = $this.prev();
            if ($.inArray(index, [3, 6]) > -1 || $prev.size() <= 0) {
              return false;
            }
            $this.html($prev.html());
            $prev.html(html);
            App.check();
          });

          $lis.on('swipeRight', function(e) {
            e.preventDefault();
            var $this = $(this);
            var index = $this.index();
            var html = $this.html();
            var $next = $this.next();
            if ($.inArray(index, [2, 5]) > -1 || $next.size() <= 0) {
              return false;
            }
            $this.html($next.html());
            $next.html(html);
            App.check();
          });

          $lis.on('swipeUp', function(e) {
            e.preventDefault();
            var $this = $(this);
            var html = $this.html();
            var index = $this.index() - 3;
            var $up = $lis.eq(index);
            if (index >= 0 && $up.size() > 0) {
              $this.html($up.html());
              $up.html(html);
              App.check();
            }
          });

          $lis.on('swipeDown', function(e) {
            e.preventDefault();
            var $this = $(this);
            var html = $this.html();
            var index = $this.index() + 3;
            var $down = $lis.eq(index);
            if (index < 9 && $down.size() > 0) {
              $this.html($down.html());
              $down.html(html);
              App.check();
            }
          });
        },
        randomImage: function() {
          imgArr.sort(function(a, b) {
            return Math.random() - Math.random();
          });

          var index = 1;
          for (var i=0; i<3; i++) {
            for (var j=0; j<3; j++) {
              ctx.drawImage(image, 300*j, 300*i, 300, 300, 0, 0, 300, 300);
              $lis.eq(imgArr[index-1]-1).find('img').data('seq', index).attr('src', canvas.toDataURL('image/jpeg'));
              index++;
            }
          }
        },
        check: function() {
          var resArr = [];
          $('#game img').each(function(k, v) {
            resArr.push(v.getAttribute("data-seq"));
          });
          if (resArr.join("") === oriArr.join("")) {
            setTimeout(function() {
              alert("游戏结束!")
            }, 300);
          }
        },
        start: function() {
          image.src = 'static/puzzle/shulan.jpg';
          image.onload = function() {
            App.randomImage(true);
          }
          this.bind();
        },
      };
      App.start();
    }
  }
</script>

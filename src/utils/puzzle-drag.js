export function Puzzle() {
  this.canvas = document.getElementById('canvas');
  this.context = this.canvas.getContext('2d');
  var container = document.querySelector("#game")
  this.imgLikeArr = container.querySelectorAll('img');
  this.imgArr = Array.prototype.slice.call(this.imgLikeArr);
  this.step = 0
}

Puzzle.prototype = {
  init: function (url) {
    var image = new Image(), self = this;
    image.src = url;

    image.onload = function () {
      self.randomImg();
      self.renderImg(image);
      self.dragEvent();
    };
  },

  //canvas绘制图片
  renderImg: function (image) {
    var index = 0;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        this.context.drawImage(image, 300 * j, 300 * i, 300, 600, 0, 0, 300, 300);
        this.imgArr[index].src = this.canvas.toDataURL('image/jpeg');
        this.imgArr[index].id = index;
        index++;
      }
    }
  },
  //监听事件
  dragEvent: function () {
    var contain = document.getElementById('game'), self = this;

    //监听dragstart设置拖拽数据
    on(contain, 'dragstart', function (ev) {
      var target = getTarget(ev);

      if (target.tagName.toLowerCase() == "img") {
        ev.dataTransfer.setData('id', ev.target.id);
      }
    });

    on(contain, 'drop', function (ev) {
      var target = getTarget(ev);

      if (target.tagName.toLowerCase() == "img") {
        var originObj = document.getElementById(ev.dataTransfer.getData('id'));
        var cache = {
          'src': originObj.src,
          'id': originObj.id
        };
        var endObj = ev.target.querySelector('img') || ev.target;

        originObj.src = endObj.src;
        originObj.id = endObj.id;
        endObj.src = cache.src;
        endObj.id = cache.id;

        if (originObj.id != endObj.id) {
          self.steps();
        }

        self.isSuccess();
      }
    });

    //取消浏览器默认行为使元素可拖放.
    on(contain, 'dragover', function (ev) {
      ev.preventDefault();
    });

  },
  //实现小块图片的随机排序
  randomImg: function () {
    this.imgArr.sort(function () {
      return Math.random() - Math.random();
    });
  },
  //记录步数
  steps: function () {
    this.step ++
    console.log(this.step)
  },
  //游戏结束
  over: function () {
    console.log('game over!')
  },
  //判断游戏是否完成
  isSuccess: function () {
    var container = document.querySelector("#game")
    var imgLikeArr = container.querySelectorAll('img'),
      imgArr = Array.prototype.slice.call(imgLikeArr),
      len = imgArr.length, i,
      flag = true, self = this;

    for (i = 0; i < len; i++) {
      if (imgArr[i].id != i) {
        flag = false;
      }
    }

    if (flag) {
      setTimeout(function () {
        self.over();
      }, 200);
    }
  }
}

function on(ele, type, handler) {
  if (ele.addEventListener) {
    return ele.addEventListener(type, handler, false);
  } else if (ele.attachEvent) {
    return ele.attachEvent('on' + type, function () {
      handler.call(ele);
    });
  } else {
    return ele['on' + type] = handler;
  }
}

function getTarget(e) {
  var getEvent = e || window.event;
  return getEvent.target || getEvent.srcElement;
}


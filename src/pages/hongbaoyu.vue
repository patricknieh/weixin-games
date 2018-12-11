<template>
  <div id="game" class="hongbaoyu">
    <div class="score">得分：<span>{{score}}</span></div>
    <div id="box" class="box"></div>
  </div>
</template>

<script>
  import T from '../utils/tools'

  export default {
    methods: {
      hit(target1, target2, callback) {
        /*检测碰撞元素上下左右的位置*/
        let target1Top = target1.offsetTop,
          target1Foot = target1.offsetTop + target1.offsetHeight,
          target1Left = target1.offsetLeft,
          target1Right = target1.offsetLeft + target1.offsetWidth;
        /*被碰撞元素的上下左右的位置*/
        let target2Top = target2.offsetTop,
          target2Foot = target2.offsetTop + target2.offsetHeight,
          target2Left = target2.offsetLeft,
          target2Right = target2.offsetLeft + target2.offsetWidth;
        if (target1Foot > target2Top && target1Right > target2Left && target1Top < target2Foot && target1Left < target2Right) callback()
      },
      hitEffects(target,type){
        let $container = $('#game')
        let div = document.createElement("div")
        if(type === 'good'){
          div.innerText = '+5'
          div.setAttribute('class','plus')
        }else {
          div.innerText = '-20'
          div.setAttribute('class','minus')
        }
        $container.append(div)
        div.style.left = target.style.left
        div.style.top = target.style.top
        this.effects.push(div)
      },
      random: function (min, max) {
        if (arguments.length === 2) {
          return Math.floor(min + Math.random() * ((max + 1) - min))
        } else {
          return null;
        }
      },
      random2() {
        var sum = 0,
          factor = 0,
          random = Math.random(),
          arr1 = [1, 0],
          arr2 = [0.9, 0.1] //生成1的概率为90%

        for (var i = arr2.length - 1; i >= 0; i--) {
          sum += arr2[i]; // 统计概率总和
        }
        ;
        random *= sum; // 生成概率随机数
        for (var i = arr2.length - 1; i >= 0; i--) {
          factor += arr2[i];
          if (random <= factor)
            return arr1[i];
        }
        ;
        return null;
      },
      touchMove() {
        let $box = $('.box')
        $(document).on('touchmove', ev => {
          let touchX = ev.originalEvent.targetTouches[0].clientX
          if (touchX < 0) {
            $box.css('left', 0)
          } else if (touchX + 50 > window.innerWidth) {
            $box.css('left', window.innerWidth - 50)
          } else {
            $box.css('left', touchX)
          }
        })
      },
      emitter() {
        let $container = $('#game')
        let div = document.createElement("div")
        let type = this.random2()
        if(type === 0){
          div.setAttribute('class','bad')
        }else {
          div.setAttribute('class','good')
        }
        $container.append(div)
        let max = window.innerWidth - div.offsetWidth
        $(div).css({
          left: this.random(0,max),
          top: 0
        })
        this.circles.push(div)
      },
      moveAndHit(){
        let circles = this.circles
        let effects = this.effects
        let ens = 5

        let box = document.getElementById('box')

        for(let i=0;i<circles.length;i++){
          let speed = parseInt(circles[i].style.top.substring(0,3))
          speed+=ens;
          circles[i].style.top = speed + "px"

          this.hit(box,circles[i],() => {
            if(circles[i].className === 'good'){
              this.score += 5
              this.hitEffects(circles[i],'good')
              createjs.Sound.play("goodSound")
            }else {
              this.score -= 20
              this.hitEffects(circles[i],'bad')
              createjs.Sound.play("badSound")
            }
            this.removeCircle(i)
          })
          if(speed > window.innerHeight) this.removeCircle(i)
        }

        for(let j=0;j<effects.length;j++){
          let speed = parseInt(effects[j].style.top.substring(0,3))
          speed-=ens;
          effects[j].style.top = speed + "px"

          if(speed < window.innerHeight - 200) this.removeEffect(j)
        }
      },
      removeCircle(index){
        let contaienr = document.getElementById('game')
        let circles = this.circles
        contaienr.removeChild(circles[index])
        circles.splice(index,1)
      },
      removeEffect(index){
        let contaienr = document.getElementById('game')
        let effects = this.effects
        contaienr.removeChild(effects[index])
        effects.splice(index,1)
      },
      initGame() {
        this.touchMove()
        let emitter = T.intv(this.emitter,1000)
        let moveAndHit = setInterval(this.moveAndHit,20)
      }
    },
    data() {
      return {
        score: 0,
        circles: [],
        effects: [],
        clearTimer: null
      }
    },
    mounted() {
      this.initGame()
      createjs.Sound.alternateExtensions = ["mp3"]
      createjs.Sound.registerSound("/static/hongbaoyu/good.mp3", "goodSound")
      createjs.Sound.registerSound("/static/hongbaoyu/bad.mp3", "badSound")
      createjs.Sound.registerSound("/static/hongbaoyu/background.mp3", "background")
      $(document).on('click',ev => {
        createjs.Sound.play("background", {loop:100})
      })
    }
  }
</script>

<style rel='stylesheet/scss' lang="scss">
  .hongbaoyu {
    width: 100%;
    height: 100%;
    .score {
      width: 100%;
      text-align: center;
      font-size: 20px;
      padding-top: 20px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
    }
    .good{
      width: 50px;
      height: 50px;
      border-radius: 100%;
      position: absolute;
      background: #ee612b;
    }
    .bad{
      width: 50px;
      height: 50px;
      border-radius: 100%;
      position: absolute;
      background: #acacac;
    }
    .plus{
      position: absolute;
      color: #ee612b;
      font-size: 20px;
      display: inline-block;
      animation: 500ms linear forwards disappear;
    }
    .minus{
      position: absolute;
      color: #4b59ee;
      font-size: 20px;
      display: inline-block;
      animation: 500ms linear forwards disappear;
    }
    .box {
      width: 50px;
      height: 50px;
      background: #333333;
      position: absolute;
      left: calc(50% - 25px);
      bottom: 0;
    }
  }
  @keyframes disappear {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }
</style>

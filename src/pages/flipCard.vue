<template>
  <div class="guess-holder">
    <div class="grid-x small-up-3 doors">
      <div class="cell" data-title="1"><img src="@/assets/flipCard/cell01.png"></div>
      <div class="cell" data-title="2"><img src="@/assets/flipCard/cell02.png"></div>
      <div class="cell" data-title="3"><img src="@/assets/flipCard/cell03.png"></div>
      <div class="cell" data-title="4"><img src="@/assets/flipCard/cell04.png"></div>
      <div class="cell" data-title="5"><img src="@/assets/flipCard/cell05.png"></div>
      <div class="cell" data-title="6"><img src="@/assets/flipCard/cell06.png"></div>
      <div class="cell" data-title="7"><img src="@/assets/flipCard/cell07.png"></div>
      <div class="cell" data-title="8"><img src="@/assets/flipCard/cell08.png"></div>
      <div class="cell" data-title="9"><img src="@/assets/flipCard/cell09.png"></div>
      <div id="result"></div>
      <div id="finalResult"></div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      getContent: function (title) {
        switch (title) {
          case 1:
            return {
              img: 'result01'
            }
            break
          case 2:
            return {
              img: 'result02'
            }
            break
          case 3:
            return {
              img: 'result03'
            }
            break
          case 4:
            return {
              img: 'result04'
            }
            break
          case 5:
            return {
              img: 'result05'
            }
            break
          case 6:
            return {
              img: 'result06'
            }
            break
          case 7:
            return {
              img: 'result07'
            }
            break
          case 8:
            return {
              img: 'result08'
            }
            break
          case 9:
            return {
              img: 'result09'
            }
            break
          default:
            return null
        }
      }
    },
    mounted () {
      const vm = this

      $('.cell').on('click',function () {
        let _this = this
        let result = $('#result')
        let contentData = vm.getContent($(_this).data('title'))
        let homePath = window.location.origin
        console.log(contentData)
        let htmlContent = '<div>' +
          '<img src="' + homePath + '/static/flipCard/' +
          contentData.img +
          '.jpg">' +
          '</div>'
        if(!vm.isChecked){
          $(_this).css({
            animation: 'rotateMiddle 1s',
          })
          setTimeout(function () {
            $(_this).html(htmlContent).find(">div").css({
              background: 'white',
              height: '100%'
            })
            result.html(htmlContent).css({
              zIndex: 10,
              position: 'absolute',
              top: '35%',
              left: '35%',
              width: $(_this).width(),
              height: $(_this).height(),
              background: 'white',
              animation: 'scaleToCenter 1s forwards',
            })
            $('.cell').animate({
              opacity: 0
            })

            setTimeout(function () {
              result.css({
                display: 'none'
              })
              $('#finalResult').html(htmlContent).css({
                width: result.width() * 3,
                height: result.height() * 3,
                background: 'white',
                position: 'absolute',
                top: '6%',
                left: '6%',
                zIndex: 12,
              }).offset({
                top:result.top,
                left:result.left,
              }).click(function () {
                // do click
              })
            },1000)
          },1000)
        }
      })
    },
  }
</script>

<style rel='stylesheet/scss' lang="scss">
  .guess-holder{
    width:100%;
    height:100%;
    position: relative;
    z-index:2;
    .doors{
      position: relative;
      padding: 10px;
      .cell{
        padding: 5px;
      }
      img{
        width: 100%;
        height: 100%;
        border: 1px solid red;
      }
    }
    .space{
      height:2em;
    }
    .title-text{
      color: #ffffff;
      text-align: center;
      position: relative;
      top: 42px;
      font-size: 20px;
    }
    .title{
      display: block;
      margin:auto;
      margin-bottom: 1em;
    }
    .target{
      width: 10em;
      height: 10em;
      display: block;
      margin: auto;
      border: 5px solid #00e7ff;
      border-radius: 10px;
      margin-bottom: 1em;
    }
    .hint{
      color: #ffffff;
      text-align: center;
      font-weight: bolder;
      width: 85%;
      margin: 1em auto;
    }
    .button{
      outline: none;
      color: #ffffff;
      font-size: 20px;
      font-weight: bolder;
      width: 84%;
      height: 2.5em;
      background: #FF0092;
      border-radius: 100px;
      display: block;
      margin:auto;
      margin-top: 40px;
      img{
        height:40%;
      }
    }
  }
  @keyframes rotateMiddle {
    from{
      transform: rotateY(0);
    }
    to{
      transform: rotateY(360deg);
    }
  }
  @keyframes scaleToCenter {
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
      transform: scale(3);
    }
  }
</style>

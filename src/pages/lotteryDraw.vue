<template>
  <div class="lottery-draw" id="lottery">
    <div class="lottery">
      <div class="row">
        <div class="columns box" id="box_1">
          <img src="static/lotteryDraw/award_1.png" alt="award">
        </div>
        <div class="columns box" id="box_2">
          <img src="static/lotteryDraw/award_2.png" alt="award">
        </div>
        <div class="columns box" id="box_3">
          <img src="static/lotteryDraw/award_3.png" alt="award">
        </div>
      </div>
      <div class="row">
        <div class="columns box" id="box_8">
          <img src="static/lotteryDraw/award_0.png" alt="award">
        </div>
        <div id="start" class="columns container" @click="getFortune">
          <img v-if="buttonPush" src="static/lotteryDraw/start_down.png" alt="start">
          <img v-else="" src="static/lotteryDraw/start_up.png" alt="start">
        </div>
        <div class="columns box" id="box_4">
          <img src="static/lotteryDraw/award_0.png" alt="award">
        </div>
      </div>
      <div class="row">
        <div class="columns box" id="box_7">
          <img src="static/lotteryDraw/award_7.png" alt="award">
        </div>
        <div class="columns box" id="box_6">
          <img src="static/lotteryDraw/award_6.png" alt="award">
        </div>
        <div class="columns box" id="box_5">
          <img src="static/lotteryDraw/award_5.png" alt="award">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      iterArrByTurn: function(arr,turn) {
        let iter = arr[Symbol.iterator]()
        let pointer
        let recordNum = this.record
        return new Promise(function (resolve,reject) {
          let timer = setInterval(function () {
            pointer = iter.next()
            if(pointer.done) {
              recordNum ++
              if(turn === recordNum){
                clearInterval(timer)
                resolve()
              }else {
                iter = null
                iter = arr[Symbol.iterator]()
                pointer = iter.next()
                $('.box').removeClass('active')
                pointer.value.classList.add('active')
              }
            }else {
              $('.box').removeClass('active')
              pointer.value.classList.add('active')
            }
          },100)
        })
      },
      iterArrByIndex: function(arr,index) {
        let iter = arr[Symbol.iterator]()
        let pointer
        let i = 0
        return new Promise(function (resolve,reject) {
          let timer = setInterval(function () {
            pointer = iter.next()
            i ++
            if(i == index) {
              clearInterval(timer)
              $('.box').removeClass('active')
              pointer.value.classList.add('active')
              resolve()
            }else {
              $('.box').removeClass('active')
              pointer.value.classList.add('active')
            }
          },300)
        })
      },
      getAwardInfo: function (index) {
        switch (index) {
          case 1:
            return '周杰伦演唱会门票'
            break
          case 2:
            return '《2017中国专利运营状况研究报告》'
            break
          case 3:
            return '小米5000毫安移动电源'
            break
          case 4:
          case 8:
            return '谢谢参与'
            break
          case 5:
            return '可充电电子秤'
            break
          case 6:
            return 'QQ音乐会员1个月'
            break
          case 7:
            return '微信红包丨请到七弦琴公众号领取'
            break
        }
      },
      getFortune: function (wxId,sid) {
        if(this.buttonPush) return
        this.buttonPush = true

        $('#lottery').css('overflow-y','hidden')

        // 手动设置
        const data = {
          firstDraw: false,
          resultId: "8aad3e3362707cb5016270bdba82011b",
          rewardResult: 2,
          statusCode: 3
        }

        let vm = this
        let status = data.statusCode
        let index = data.rewardResult

        vm.index = index
        switch (status) {
          case 3:
            //开始转盘
            let arr = []
            for(let i=0;i<8;i++) arr[i] = $('#box_' + (i+1))[0]
            vm.iterArrByTurn(arr,3).then(() => {
              vm.iterArrByIndex(arr,index).then(() => {
                setTimeout(() => {
                  $('#lottery').css('overflow-y','scroll')
                  console.log(`恭喜你抽到了 ${vm.getAwardInfo(index)}`)
                },1500)
              })
            })
            break
        }
      },
    },
    data () {
      return {
        record: 0,
        index: 0,
        buttonPush:false,
      }
    },
  }
</script>

<style rel='stylesheet/scss' lang="scss">
  .lottery-draw{
    position: relative;
    z-index:2;
    padding:0 1.5em 0 1.5em;
    width:100%;
    height:100%;
    overflow-y: scroll;
    .active{
      background: #ffffff !important;
    }
    .lottery{
      margin-bottom:1em;
      z-index:3;
      position: relative;
      .row{
        display: flex;
        .columns{
          margin-left:.2em;
          margin-bottom:.2em;
          padding:0;
          .button{
            width:100%;
            height:100%;
          }
          .start-up{
            width: 100%;
            height: 100%!important;

            background: #FF0092;
            font-size: 28px;
            font-weight: bolder;
            color: #ffffff;
            border-radius: 10px;
            display: block;
            text-align: center;
            padding: 1.1em .5em;
          }
          .start-down{
            width: 100%;
            height: 100%!important;

            background: #b15205;
            font-size: 28px;
            font-weight: bolder;
            color: #ffffff;
            border-radius: 10px;
            display: block;
            text-align: center;
            padding: 1.1em .5em;
          }
        }
      }
    }
    .box,.container{
      background: #4438CF;
      border: 1px solid #2B2484;
      border-radius: 8px;
    }
    .container{
      position: relative;
      z-index: 2;
      font-size:14px;
      border-radius: 8px;
      padding: 10px;
    }
  }
</style>

<template>
  <div class="puzzle-pc">
    <canvas id="canvas">
      cannot support canvas
    </canvas>
    <ul id="game" class="grid-x small-up-3">
      <li class="cell"><img draggable="true" id="0"></li>
      <li class="cell"><img draggable="true" id="1"></li>
      <li class="cell"><img draggable="true" id="2"></li>
      <li class="cell"><img draggable="true" id="3"></li>
      <li class="cell"><img draggable="true" id="4"></li>
      <li class="cell"><img draggable="true" id="5"></li>
      <li class="cell"><img draggable="true" id="6"></li>
      <li class="cell"><img draggable="true" id="7"></li>
      <li class="cell"><img draggable="true" id="8"></li>
    </ul>
  </div>
</template>

<style rel='stylesheet/scss' lang="scss" scoped>
  .puzzle-pc{
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
  import {Puzzle} from "../utils/puzzlePc";

  export default {
    mounted(){
      var puzzle = new Puzzle();
      puzzle.init('static/puzzle/test.jpg');
    }
  }
</script>

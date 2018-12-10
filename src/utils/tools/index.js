let tools = {
  nextTime: 0,
  intv: function (callback,speed) {
    return setInterval(() => {
      let now = new Date().getTime();
      if (now >= this.nextTime) {
        callback()
        this.nextTime = now + Math.random()*speed
      }
    }, 300)
  }
}

export default tools

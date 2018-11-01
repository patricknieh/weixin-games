export const wxMakeAuthUrl = (path) => {
  var uri = encodeURIComponent(path);
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx788bea80b7764d78&redirect_uri=${uri}&response_type=code&scope=snsapi_userinfo&state=3&connect_redirect=1#wechat_redirect`;
}

export const wxConfig = (id) => {
  let title = `XXXXXXXXXX`,
    desc = `XXXXXXXXXX`,
    link = `XXXXXXXXXX`,
    imgUrl = `XXXXXXXXXX`;

  return {
    title,
    desc,
    link,
    imgUrl
  }
}

export const wxShare =  ({title, desc, link, imgUrl}, success, cancel)  => {
  wx.ready(() => {
    // “分享给朋友”
    wx.onMenuShareAppMessage({
      title,
      desc,
      link,
      imgUrl,
      success,
      cancel
    })
    // “分享到朋友圈”
    wx.onMenuShareTimeline({
      title,
      link,
      imgUrl,
      success,
      cancel
    })
    // 分享到QQ
    wx.onMenuShareQQ({
      title,
      desc,
      link,
      imgUrl,
      success,
      cancel
    })
    // 分享到腾讯微博
    wx.onMenuShareWeibo({
      title,
      desc,
      link,
      imgUrl,
      success,
      cancel
    })
    // 分享到QQ空间
    wx.onMenuShareQZone({
      title,
      desc,
      link,
      imgUrl,
      success,
      cancel
    })
  })
}

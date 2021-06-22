export const base64 = require("./plugins/base64");

export const rpx2px = (rpx) => {
  return (rpx / 750) * wx.getSystemInfoSync().windowWidth
}

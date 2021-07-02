/**
 * 以模块的形式抛出
 * 派发一个等待处理，需要有代码处理的事件'
 */
module.exports = Behavior({
  definitionFilter(defFields) {
    defFields.methods.triggerWaitingEvent = function (type, data = {}) {
      return new Promise((resolve, reject) => {
        let eventCallback = (res) => { 
          resolve(res)
          console.log('eventCallbackres', res)
        }
        
        Object.assign(data, { eventCallback })    //分配
        this.triggerEvent(type, data)             //触发事件
      })
    }
  },
})
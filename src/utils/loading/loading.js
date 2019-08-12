import Vue from 'vue'
import LoadingTemplate from './loading.vue'

const Loading = Vue.extend(LoadingTemplate)

let instance,count = 0

export default {
  open () {
    count++
    if (!instance) {
      instance = new Loading({
        el: document.createElement('div')
      })
    }
    if (instance.visible) return
    document.body.appendChild(instance.$el)

    Vue.nextTick(() => {
      instance.visible = true
    })
  },
  close () {
    count--
    if (instance && count === 0) {
      instance.visible = false
    }
  }
}

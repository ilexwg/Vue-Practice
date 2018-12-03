Vue.directive('time', {
  bind(el, binding) {
    el.innerHTML = TimeUtils.getFormatTime(binding.value);
    el._timer = setInterval(function () {
      el.innerHTML = TimeUtils.getFormatTime(binding.value);
    }, 60000);
  },
  unbind(el) {
    clearInterval(el._timer);
    delete el._timer;
  }
});


let app = new Vue({
  el: '#app',
  data: {
    timeNow: Date.now(),
    timeBefore: 1488930695721
  }
});
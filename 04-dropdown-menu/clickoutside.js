Vue.directive('clickoutside', {
  bind(el, binding) {
    function handleClick(e) {
      if (el.contains(e.target)) {
        return false;
      }
      if (binding.expression) {
        binding.value(e);
      }
    }
    el.handleClick = handleClick;
    document.addEventListener('click', handleClick);
  },
  unbind(el, binding) {
    document.removeEventListener('click', el.handleClick);
    delete el.handleClick;
  }
});
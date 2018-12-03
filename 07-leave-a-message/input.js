Vue.component('v-input', {
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  render(h) {
    let _this = this;

    return h('div', [
      h('span', '昵称: '),
      h('input', {
        attrs: {
          type: 'text'
        },
        domProps: {
          value: this.value
        },
        on: {
          input(evt) {
            _this.value = evt.target.value;
            _this.$emit('input', evt.target.value);
          }
        }
      })
    ]);
  }
});

Vue.component('v-textarea', {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  render(h) {
    let _this = this;

    return h('div', [
      h('span', '留言内容: '),
      h('textarea', {
        attrs: {
          placeholder: '请输入留言内容...'
        },
        domProps: {
          value: this.value
        },
        ref: 'message',
        on: {
          input(evt) {
            _this.value = evt.target.value;
            _this.$emit('input', evt.target.value);
          }
        }
      })
    ]);
  },
  methods: {
    focus() {
      this.$refs.message.focus();
    }
  }
});
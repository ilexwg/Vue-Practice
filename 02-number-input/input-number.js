function isValueNumber(value) {
  return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
}

Vue.component('input-number', {
  template: `
    <div class="input-number input-group">
      <input
        type="text"
        class="form-control"
        :value="currentValue"
        @change="handleChange"
      >
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          @click="handlePlus"
        ><i class="fas fa-plus"></i></button>
        <button
          class="btn btn-outline-secondary"
          @click="handleMinus"
        ><i class="fas fa-minus"></i></button>
      </div>
    </div>
  `,
  data() {
    return {
      currentValue: this.value
    };
  },
  props: {
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    value: {
      type: Number,
      default: 0
    }
  },
  watch: {
    currentValue(val) {
      this.$emit('input', val);
      this.$emit('on-change', val);
    },
    value(val) {
      this.updateValue(val);
    }
  },
  methods: {
    handlePlus() {
      if (this.currentValue >= this.max) return;
      this.currentValue++;
    },
    handleMinus() {
      if (this.currentValue <= this.min) return;
      this.currentValue--;
    },
    updateValue(val) {
      val = val > this.max ? this.max : val;
      val = val < this.min ? this.min : val;
      this.currentValue = val;
    },
    handleChange(evt) {
      let val = evt.target.value.trim();
      let { max, min } = this;

      if (isValueNumber(val)) {
        val = Number(val);
        if (val > max) {
          this.currentValue = max;
        } else if (val < min) {
          this.currentValue = min;
        } else {
          this.currentValue = val;
        }
      } else {
        evt.target.value = this.currentValue;
      }
    }
  },
  mounted() {
    this.updateValue(this.value);
  }
});
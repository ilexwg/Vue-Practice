Vue.component('tabs', {
  template: `
    <div class="tabs">
      <div class="tabs-bar">
        <div
          v-for="(item, index) in navList"
          :class="tabClass(item)"
          @click="handleChange(index)"
        >{{ item.label }}</div>
      </div>
      <div class="tabs-content">
        <slot></slot>
      </div>
    </div>
  `,
  data() {
    return {
      currentValue: this.value,
      navList: []
    };
  },
  props: {
    value: {
      type: [String, Number]
    }
  },
  methods: {
    tabClass(item) {
      return [
        'tabs-tab',
        {
          'tabs-tab-active': item.name === this.currentValue
        }
      ];
    },
    handleChange(index) {
      let name = this.navList[index].name;
      this.currentValue = name;
      this.$emit('input', name);
    },
    getTabs() {
      return this.$children.filter(item => {
        return item.$options.name === 'pane';
      });
    },
    updateStatus() {
      let tabs = this.getTabs();
      tabs.forEach((tab) => {
        tab.show = (tab.name === this.currentValue);
      });
    },
    updateNav() {
      this.navList = [];
      let tabs = this.getTabs();
      tabs.forEach((pane, index) => {
        if (!pane.name) {
          pane.name = index;
        }
        this.navList.push({
          label: pane.label,
          name: pane.name || index
        });
        if (index === 0 && !this.currentValue) {
          this.currentValue = pane.name;
        }
      });
      this.updateStatus();
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
    currentValue() {
      this.updateStatus();
    }
  }
});
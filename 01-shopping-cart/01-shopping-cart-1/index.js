let app = new Vue({
  el: '#app',
  data: {
    list: [
      {
        id: 1,
        name: 'iPhone 7',
        price: 100,
        count: 1,
        isChecked: true
      },
      {
        id: 2,
        name: 'iPad Pro',
        price: 200,
        count: 1,
        isChecked: true
      },
      {
        id: 3,
        name: 'MacBook Pro',
        price: 300,
        count: 1,
        isChecked: true
      }
    ]
  },
  methods: {
    handleReduce(index) {
      if (this.list[index].count === 1) {
        return;
      }
      this.list[index].count--;
    },
    handleAdd(index) {
      this.list[index].count++;
    },
    handleRemove(index) {
      this.list.splice(index, 1);
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      for (let item of this.list) {
        if (item.isChecked) {
          total += item.price * item.count;
        }
      }
      return total.toString().replace(/\B(?=(\d{3})+$)/g, ',')
    },
    allChecked: {
      get() {
        return this.list.every(item => item.isChecked);
      },
      set(val) {
        if (val) {
          this.list.forEach(item => item.isChecked = true);
        } else {
          this.list.forEach(item => item.isChecked = false);
        }
      }
    }
  }
});
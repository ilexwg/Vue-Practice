let app = new Vue({
  el: '#app',
  data: {
    list: [
      {
        classify: '3C数码',
        subList: [
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
      {
        classify: '水果蔬菜',
        subList: [
          {
            id: 1,
            name: '苹果',
            price: 1,
            count: 1,
            isChecked: true
          },
          {
            id: 2,
            name: '香蕉',
            price: 2,
            count: 1,
            isChecked: true
          },
          {
            id: 3,
            name: '菠萝',
            price: 3,
            count: 1,
            isChecked: true
          }
        ]
      },
      {
        classify: '办公文具',
        subList: [
          {
            id: 1,
            name: '钢笔',
            price: 10,
            count: 1,
            isChecked: true
          },
          {
            id: 2,
            name: '圆珠笔',
            price: 20,
            count: 1,
            isChecked: true
          }
        ]
      },
    ]
  },
  methods: {
    handleReduce(index, subIndex) {
      let item = this.list[index].subList[subIndex];
      if (item.count === 1) {
        return;
      }
      item.count--;
    },
    handleAdd(index, subIndex) {
      let item = this.list[index].subList[subIndex];
      item.count++;
    },
    handleRemove(index, subIndex) {
      this.list[index].subList.splice(subIndex, 1);
      if (!this.list[index].subList.length) {
        this.list.splice(index, 1);
      }
    },
    getIndex(index, subIndex) {
      let itemIndex = 0;
      for (let i = 0; i < index; i++) {
        itemIndex += this.list[i].subList.length;
      }
      return itemIndex += (subIndex + 1);
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      for (let item of this.list) {
        for (let subItem of item.subList) {
          if (subItem.isChecked) {
            total += subItem.price * subItem.count;
          }
        }
      }
      return total.toString().replace(/\B(?=(\d{3})+$)/g, ',')
    },
    allChecked: {
      get() {
        return this.list.every(item => {
          return item.subList.every(subItem => subItem.isChecked);
        });
      },
      set(val) {
        if (val) {
          this.list.forEach(item => {
            item.subList.forEach(item => item.isChecked = true);
          });
        } else {
          this.list.forEach(item => {
            item.subList.forEach(item => item.isChecked = false);
          });
        }
      }
    }
  }
});
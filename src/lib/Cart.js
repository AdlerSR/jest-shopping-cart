export default class Cart {
  items = [];

  getTotal() {
    return this.items.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);
  }

  add(item) {
    const equalItem = this.items.find(
      (localItem) => localItem.product === item.product,
    );

    if (equalItem) {
      let itemIndex = this.items.findIndex(
        (itemData) => itemData.product === equalItem.product,
      );

      this.items.forEach((itemData, index) =>
        index === itemIndex
          ? { ...itemData, quantity: (equalItem.quantity += item.quantity) }
          : itemData,
      );

      return;
    }

    this.items.push(item);
  }

  remove(product) {
    let index = this.items.findIndex((item) => item.product === product);

    this.items.splice(index, 1);
  }

  summary() {
    const total = this.getTotal();
    const items = this.items;

    return { total, items };
  }

  checkout() {
    const { total, items } = this.summary();

    this.items = [];

    return { total, items };
  }
}

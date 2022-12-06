import { find, remove, findIndex } from 'lodash';

export default class Cart {
  items = [];

  getTotal() {
    return this.items.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);
  }

  updateEqualItemQuantity(item, equalItem) {
    let itemIndex = this.items.findIndex(
      (itemData) => itemData.product === equalItem.product,
    );

    this.items.forEach((itemData, index) =>
      index === itemIndex
        ? { ...itemData, quantity: (equalItem.quantity += item.quantity) }
        : itemData,
    );
  }

  add(item) {
    const equalItem = this.items.find(
      (localItem) => localItem.product === item.product,
    );

    if (equalItem) {
      this.updateEqualItemQuantity(item, equalItem);

      return;
    }

    this.items.push(item);
  }

  remove(product) {
    let index = this.items.findIndex((item) => item.product === product);

    this.items.splice(index, 1);
  }
}

import Dinero from 'dinero.js';

Dinero.defaultCurrency = 'BRL';
Dinero.defaultPrecision = 2;

const calculateDiscount = (item, amount) => {
  if (item.quantity > item.condition.minimum) {
    return amount.percentage(item.condition.percentage);
  }

  return Dinero({ amount: 0 });
};

const calculateQuantityDiscount = (item, amount) => {
  if (item.quantity > item.condition.quantity) {
    return amount.percentage(50);
  }

  return Dinero({ amount: 0 });
};

export default class Cart {
  items = [];

  getTotal() {
    return this.items.reduce((acc, item) => {
      const amount = Dinero({ amount: item.quantity * item.product.price });
      let discount = Dinero({ amount: 0 });

      if (item.condition?.percentage) {
        discount = calculateDiscount(item, amount);
      }

      if (item.condition?.quantity) {
        discount = calculateQuantityDiscount(item, amount);
      }

      return acc.add(amount).subtract(discount);
    }, Dinero({ amount: 0 }));
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
    const total = this.getTotal().getAmount();
    const items = this.items;

    return { total, items };
  }

  checkout() {
    const { total, items } = this.summary();

    this.items = [];

    return { total, items };
  }
}

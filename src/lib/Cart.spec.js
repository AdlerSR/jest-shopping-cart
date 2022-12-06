import Cart from './Cart';

describe('Cart', () => {
  let cart;

  let product = {
    title: 'Adidas running shoes - men',
    price: 35388,
  };

  let product2 = {
    title: 'Adidas running shoes - woman',
    price: 35390,
  };

  beforeEach(() => {
    cart = new Cart();
  });

  it('should return 0 when getTotal() is executed in a newly created instance', () => {
    expect(cart.getTotal()).toEqual(0);
  });

  it('should multiply quantity and price and receive the total amount', () => {
    cart.add({
      product,
      quantity: 2,
    });

    expect(cart.getTotal()).toEqual(70776);
  });

  it('should update total when have more than one item', () => {
    cart.add({
      product,
      quantity: 2,
    });

    cart.add({
      product: product2,
      quantity: 2,
    });

    expect(cart.getTotal()).toEqual(141556);
  });

  it('should add product quantity to equal item and update total', () => {
    cart.add({
      product,
      quantity: 2,
    });

    cart.add({
      product,
      quantity: 1,
    });

    expect(cart.getTotal()).toEqual(106164);
  });

  it('should update total when a product is removed', () => {
    cart.add({
      product,
      quantity: 2,
    });

    cart.add({
      product: product2,
      quantity: 2,
    });

    cart.remove(product2);

    expect(cart.getTotal()).toEqual(70776);
  });
});

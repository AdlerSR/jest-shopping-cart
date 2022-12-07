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

  describe('getTotal()', () => {
    it('should return 0 when getTotal() is executed in a newly created instance', () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('should multiply quantity and price and receive the total amount', () => {
      cart.add({
        product,
        quantity: 2,
      });

      expect(cart.getTotal().getAmount()).toEqual(70776);
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

      expect(cart.getTotal().getAmount()).toEqual(141556);
    });

    it('should add product quantity to equal item and update total', () => {
      cart.add({
        product: product2,
        quantity: 1,
      });

      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product,
        quantity: 1,
      });

      expect(cart.items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            product: product2,
            quantity: 1,
          }),
        ]),
      );

      expect(cart.getTotal().getAmount()).toEqual(141554);
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

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });
  });

  describe('checkout()', () => {
    it('should return an object with the total and the list of items', () => {
      cart.add({ product, quantity: 2 });
      cart.add({ product: product2, quantity: 3 });

      expect(cart.checkout()).toMatchSnapshot();
    });

    it('should return an object with the total and the list of items when summary() is called', () => {
      cart.add({ product, quantity: 2 });
      cart.add({ product: product2, quantity: 3 });

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });

    it('should reset the cart when checkout() is called', () => {
      cart.add({ product: product2, quantity: 3 });

      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('should apply percentage discount when certain quantity threshold is passed', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({ product, condition, quantity: 3 });

      expect(cart.getTotal().getAmount()).toEqual(74315);
    });
  });
});

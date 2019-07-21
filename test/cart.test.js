const Cart = require('../src/cart');
const CartItem = require('../src/cart-item');
const chai = require('chai');
const assert = chai.assert;

let nowStub = new Date(2019, 7, 24);

const timeService = {
    now: function() {
        return nowStub;
    }
}
describe('Cart', function() {
    let cart;
    
    beforeEach(function() {
        cart = new Cart({ timeService });
    });

    it('will not allow adding items with quantity 0', function() {
        try {
            cart.addItem(new CartItem({
                name: 'Detergent', 
                quantity: 0, 
                price: 12, 
                active: true
            }));
            assert.fail('should throw exception');
        } catch {

        }
    });

    it('will not allow adding items with quantities less then 2 if price is less then 1', function() {
        try {
            cart.addItem(new CartItem({
                name: 'Detergent', 
                quantity: 1, 
                price: .5, 
                active: true
            }));
            assert.fail('should throw exception');
        } catch {

        }
    });

    it('will calculate the price of the items in the cart when adding multiple items', function() {
        cart.addItem(new CartItem({
             name: 'Detergent', 
             quantity: 2, 
             price: 1.5, 
             active: true
        }));
        cart.addItem(new CartItem({
             name: 'Vegetables', 
             quantity: 3, 
             price: .5, 
             active: true
        }));
        cart.addItem(new CartItem({
             name: 'Coffee', 
             quantity: 1, 
             price: 7, 
             active: true
        }));

        assert.equal(cart.total, 11.5, 'Total is not correct');
    });

    it('will calculate the price of the items in the cart when deleting items', function() {    
        //Arrange
        cart.addItem(new CartItem({
             name: 'Detergent', 
             quantity: 2, 
             price: 1.5, 
             active: true
        }));
        cart.addItem(new CartItem({
             name: 'Vegetables', 
             quantity: 3, 
             price: .5, 
             active: true
        }));
        cart.addItem(new CartItem({
             name: 'Coffee', 
             quantity: 1, 
             price: 7, 
             active: true
        }));

        //Act
        cart.deleteItem("Coffee");

        //Assert 
        assert.equal(cart.total, 4.5, 'Total is not correct');
    });

    it('will update cart when deleting items', function() {
        //Arrange
          cart.addItem(new CartItem({
               name: 'Vegetables', 
               quantity: 3, 
               price: .5, 
               active: true
          }));
          cart.addItem(new CartItem({
               name: 'Coffee', 
               quantity: 1, 
               price: 7, 
               active: true
          }));
          const newUpdate = new Date(2020, 7, 25);
          nowStub = newUpdate;
  
          //Act
          cart.deleteItem("Coffee");
  
          //Assert 
          assert.equal(cart.lastUpdate, newUpdate, 'LastUpdate is not correct');
      });
});
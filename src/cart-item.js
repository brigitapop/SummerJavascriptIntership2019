module.exports = class CartItem {
    constructor({ name, quantity, price, active }) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.active = active;
    }

    get subTotal() {
        return this.quantity * this.price;
    }
}
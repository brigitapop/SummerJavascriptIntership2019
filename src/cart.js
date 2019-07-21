module.exports = class Cart {
    constructor({ timeService }) {
        this._timeService = timeService;
        this._items = [];
        this._lastUpdate = this._timeService.now();
    }

    get items() {
        return this._items;
    }

    get lastUpdate() {
        return this._lastUpdate;
    }

    get total() {
        return this.items.reduce((total, item) => total + item.subTotal, 0);
    }

    addItem(item) {
        if (item.quantity < 1) {
            throw new Exception('Quantity should be at least one!');
        }

        //if (item.price < 1 && item.quantity < 2)
        //    throw new Exception('For items that cost less then $1 you should buy 2;');

        this._items.push(item);
        this._lastUpdate = this._timeService.now();
    }

    deleteItem(name) {
        let position = this._items.findIndex(item => item.name == name);
        this._items.splice(position, 1);
        this._lastUpdate = this._timeService.now();
    }

    updateItem(name, quantity) {
        let item = this._items.find(item => item.name == name);
        item.quantity = quantity;
        this._lastUpdate = this._timeService.now();
    }

    checkout() {
        if (this.items.length < 1) {
            throw new Exception('Cart is empty');
        }
    }
}
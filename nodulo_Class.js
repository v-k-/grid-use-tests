export default class Order {

    static fromCart(cart) {
        var newOrder = new Order();
        newOrder.items = cart.items;
        newOrder.sum = cart.sum;

        return newOrder;
    }

    static fromOrder(id, order) {
        var newOrder = new Order();
        newOrder.id = id;
        newOrder.items = order.items;
        newOrder.sum = order.sum;

        return newOrder;
    }
}

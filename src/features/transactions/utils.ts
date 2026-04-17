import type { Order, TransactionFilters } from './types';

export function filterOrders(
  orders: Order[],
  filters: TransactionFilters
): Order[] {
  return orders.filter((order) => {
    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchesSearch =
        order.customerName.toLowerCase().includes(q) ||
        order.customerPhone.includes(q) ||
        order.orderNumber.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    // Status
    if (filters.status !== 'all' && order.status !== filters.status) return false;

    // Payment Method
    if (filters.paymentMethod !== 'all' && order.paymentMethod !== filters.paymentMethod) return false;

    // Fulfillment Type
    if (filters.fulfillmentType !== 'all' && order.fulfillmentType !== filters.fulfillmentType) return false;

    // Date range
    if (filters.dateFrom) {
      const orderDate = new Date(order.orderDate).toISOString().split('T')[0];
      if (orderDate < filters.dateFrom) return false;
    }
    if (filters.dateTo) {
      const orderDate = new Date(order.orderDate).toISOString().split('T')[0];
      if (orderDate > filters.dateTo) return false;
    }

    return true;
  });
}

export function getOrderStats(orders: Order[]) {
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => sum + o.totalPrice, 0);
  const totalItems = orders
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => {
      const itemCount = o.items.reduce((s, i) => s + i.quantity, 0);
      return sum + (itemCount > 0 ? itemCount : 1);
    }, 0);
  const unpaidOrders = orders.filter((o) => o.status === 'unpaid').length;
  const completedOrders = orders.filter((o) => o.status === 'completed').length;
  const pendingOrders = orders.filter((o) => o.status === 'unpaid' || o.status === 'ready' || o.status === 'shipped').length;
  const failedOrders = orders.filter((o) => o.status === 'failed').length;

  return {
    totalOrders,
    totalRevenue,
    totalItems,
    completedOrders,
    pendingOrders,
    failedOrders,
    unpaidOrders,
  };
}

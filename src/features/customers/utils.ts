import type { Customer, CustomerFilters, Review, ReviewFilters } from './types';

// ========================
// CUSTOMER FILTERS & STATS
// ========================

export function filterCustomers(customers: Customer[], filters: CustomerFilters): Customer[] {
  return customers.filter((c) => {
    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!c.name.toLowerCase().includes(q) && !c.phone.includes(q)) return false;
    }
    // Total spent
    const spent = parseFloat(c.total_spent);
    if (filters.totalSpent === 'gt' && filters.totalSpentMin !== undefined) {
      if (spent <= filters.totalSpentMin) return false;
    }
    if (filters.totalSpent === 'lt' && filters.totalSpentMax !== undefined) {
      if (spent >= filters.totalSpentMax) return false;
    }
    if (filters.totalSpent === 'between' && filters.totalSpentMin !== undefined && filters.totalSpentMax !== undefined) {
      if (spent < filters.totalSpentMin || spent > filters.totalSpentMax) return false;
    }
    // Last order
    if (filters.lastVisit !== 'all' && c.last_order_at) {
      const visitDate = new Date(c.last_order_at);
      const now = new Date();
      if (filters.lastVisit === 'today') {
        if (visitDate.toDateString() !== now.toDateString()) return false;
      } else if (filters.lastVisit === 'this_week') {
        const weekAgo = new Date(now); weekAgo.setDate(weekAgo.getDate() - 7);
        if (visitDate < weekAgo) return false;
      } else if (filters.lastVisit === 'this_month') {
        if (visitDate.getMonth() !== now.getMonth() || visitDate.getFullYear() !== now.getFullYear()) return false;
      } else if (filters.lastVisit === 'before_date' && filters.lastVisitDateEnd) {
        if (visitDate > new Date(filters.lastVisitDateEnd)) return false;
      } else if (filters.lastVisit === 'after_date' && filters.lastVisitDateStart) {
        if (visitDate < new Date(filters.lastVisitDateStart)) return false;
      }
    }
    return true;
  });
}

// ========================
// REVIEW FILTERS & STATS
// ========================

export function filterReviews(reviews: Review[], filters: ReviewFilters): Review[] {
  return reviews.filter((r) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (
        !r.customerName.toLowerCase().includes(q) &&
        !r.orderId.toLowerCase().includes(q) &&
        !r.comment.toLowerCase().includes(q)
      ) return false;
    }
    if (filters.ratingMin !== null && r.rating < filters.ratingMin) return false;
    if (filters.ratingMax !== null && r.rating > filters.ratingMax) return false;
    return true;
  });
}

export function getReviewStats(reviews: Review[]) {
  if (reviews.length === 0) return { avgRating: 0, totalReviews: 0, ratingDistribution: [0, 0, 0, 0, 0] };
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const dist = [0, 0, 0, 0, 0]; // index 0 = 1★, index 4 = 5★
  reviews.forEach(r => dist[r.rating - 1]++);
  return { avgRating: Math.round(avg * 10) / 10, totalReviews: reviews.length, ratingDistribution: dist };
}

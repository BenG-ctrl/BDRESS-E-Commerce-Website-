

export default function convertToSubcurrency(amount: number, factor = 100) {
  return Math.round(amount * factor)
}

export function formatCurrency(amount: number, currency = "EUR") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}
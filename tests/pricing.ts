export function price(qty: number, unit: number): number {
  return qty * unit;
}

export function tax(amount: number): number {
  return Math.round(amount * 1.2);
}

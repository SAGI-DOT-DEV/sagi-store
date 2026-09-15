const cad = new Intl.NumberFormat('en-CA', {
  style: 'currency', currency: 'CAD', currencyDisplay: 'code',
  minimumFractionDigits: 2, maximumFractionDigits: 2,
});

export function formatCAD(amount: number) {
  return cad.format(amount);
}

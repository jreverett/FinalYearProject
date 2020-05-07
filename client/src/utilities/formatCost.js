export function formatCost(cost) {
  // ensure cost has the correct pence formatting (i.e. shows trailing zero)
  let num = cost;
  if (cost % 1 !== 0) {
    num = Number.parseFloat(cost).toFixed(2);
  }

  return num;
}

export default function Counter({ totalItems, totalPackedItems }) {
  return (
    <p>
      <b>{totalPackedItems}</b> / {totalItems} items packed
    </p>
  );
}

import Counter from "./Counter";
import Logo from "./Logo";
import { useItemsStore } from "../stores/itemsStore";

export default function Header() {
  const items = useItemsStore((state) => state.items);
  return (
    <header>
      <Logo />
      <img
        src="/logo.svg"
        className="midLogo"
        alt="Logo"
      />
      <Counter
        totalItems={items.length}
        totalPackedItems={items.filter((item) => item.packed).length}
      />
    </header>
  );
}

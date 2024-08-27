import { useItemsStore } from "../stores/itemsStore";
import Button from "./Button";

export default function ButtonGroup() {
  const markAllAsCompleted = useItemsStore((state) => state.markAllAsCompleted);
  const markAllAsUnompleted = useItemsStore(
    (state) => state.markAllAsUnompleted
  );
  const resetToInitial = useItemsStore((state) => state.resetToInitial);
  const removeAllItems = useItemsStore((state) => state.removeAllItems);
  return (
    <section className="button-group">
      <Button onClick={markAllAsCompleted} buttonType={"secondary"}>
        Mark all as complete
      </Button>
      <Button onClick={markAllAsUnompleted} buttonType={"secondary"}>
        Mark all as incomplete
      </Button>
      <Button onClick={resetToInitial} buttonType={"secondary"}>
        Reset to initial
      </Button>
      <Button onClick={removeAllItems} buttonType={"secondary"}>
        Remove all items
      </Button>
    </section>
  );
}

import { ActionButtonsProps } from "@/types";

export default function ButtonsCards({ onEdit, onDelete }: ActionButtonsProps) {
  return (
    <div className="w-full flex gap-4 mt-4">
      <button
        className="w-full bg-blue-500 text-white px-4 py-2 rounded"
        onClick={onEdit}
      >
        Edit
      </button>

      <button
        className="w-full bg-red-500 text-white px-4 py-2 rounded"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
}

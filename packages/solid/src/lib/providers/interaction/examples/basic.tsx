import { useInteractionModality } from "@veehance/solid/interaction";

export default () => {
  const modality = useInteractionModality();

  return (
    <div class="flex flex-col gap-3 p-4">
      <span
        class="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-medium text-sm data-[modality=keyboard]:bg-blue-100 data-[modality=pointer]:bg-green-100 data-[modality=virtual]:bg-amber-100 data-[modality=keyboard]:text-blue-700 data-[modality=pointer]:text-green-700 data-[modality=virtual]:text-amber-700"
        data-modality={modality()}
      >
        {modality() ?? "none"}
      </span>
      <p class="text-neutral-500 text-sm">
        Try clicking, pressing a key, or using a screen reader.
      </p>
      <button
        class="w-fit cursor-pointer rounded-md border border-muted px-4 py-2 text-sm data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-500 data-[focus-visible]:outline-offset-2"
        data-focus-visible={modality() === "keyboard" ? "" : undefined}
        type="button"
      >
        Click or Tab to me
      </button>
    </div>
  );
};

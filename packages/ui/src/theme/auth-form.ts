import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "w-full space-y-6",
    header: "flex flex-col text-center",
    leading: "mb-2",
    leadingIcon: "inline-block size-8 shrink-0",
    title: "text-pretty font-semibold text-highlighted text-xl",
    description: "mt-1 text-pretty text-base text-muted",
    body: "flex flex-col gap-y-6",
    providers: "space-y-3",
    checkbox: "",
    select: "w-full",
    password: "w-full",
    otp: "w-full",
    input: "w-full",
    separator: "",
    form: "space-y-5",
    footer: "mt-2 text-center text-muted text-sm",
  },
});

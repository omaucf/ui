import { cn } from "@veehance/core/utils";

export interface MainProps extends React.ComponentProps<"main"> {}

function Main({ className, ...props }: MainProps) {
  return (
    <main
      className={cn("min-h-screen", className)}
      data-slot="main"
      {...props}
    />
  );
}

export default Main;

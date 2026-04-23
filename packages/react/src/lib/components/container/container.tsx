import { cn } from "@veehance/core/utils";

export interface ContainerProps extends React.ComponentProps<"div"> {}

function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      data-slot="container"
      {...props}
    />
  );
}

export default Container;

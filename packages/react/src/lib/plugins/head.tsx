"use client";

import { createHead, type Unhead, UnheadProvider } from "@unhead/react/client";

export interface HeadProps {
  children?: React.ReactNode;
  value?: Unhead<any, any>;
}

const default_head: ReturnType<typeof createHead> = createHead();

export function Head({ children, value = default_head }: HeadProps) {
  return <UnheadProvider head={value}>{children}</UnheadProvider>;
}

export default Head;

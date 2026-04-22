import { type InjectionKey, inject, provide } from "vue";

interface CreateContextOptions<T> {
  defaultValue?: T;
  errorMessage?: string;
  name: string;
  strict?: boolean;
}

type CreateContextReturn<T> = [(value: T) => void, () => T, InjectionKey<T>];

export function createContext<T>({
  defaultValue,
  errorMessage,
  name,
  strict = true,
}: CreateContextOptions<T>) {
  const key = Symbol(name) as InjectionKey<T>;

  function provider(value: T) {
    provide(key, value);
  }

  function consumer() {
    const value = inject(key, defaultValue) as T;
    if (value !== undefined) return value;
    if (strict) throw new Error(errorMessage ?? getErrorMessage(name));
    return undefined as T;
  }

  return [provider, consumer, key] as CreateContextReturn<T>;
}

function getErrorMessage(name: string) {
  return `${name} context was not found.`;
}

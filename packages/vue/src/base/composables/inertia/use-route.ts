import { usePage } from "@inertiajs/vue3";

export const useRoute = () => ({
  get fullPath() {
    return usePage().url;
  },
});

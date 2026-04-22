import { UContainer, ULink } from "#build/ui/components";

export default function Home() {
  return (
    <UContainer class="flex flex-col items-center justify-center gap-8 lg:grow">
      <div class="flex gap-2">
        <ULink to="/">Go Back</ULink>
      </div>
    </UContainer>
  );
}

<script lang="ts">
  import Factory from "../factory.svelte";

  interface Props {
    onClickChild?: () => void;
    onClickParent?: () => void;
  }

  const { onClickParent, onClickChild }: Props = $props();
</script>

<Factory
  as="div"
  class="parent"
  data-slot="parent"
  data-testid="parent"
  id="parent"
  onclick={onClickParent}
  style="background: red"
>
  {#snippet asChild(props)}
    <Factory
      as="span"
      {...props({ class: 'child', id: 'child', onclick: onClickChild, style: 'color: blue' })}
      data-slot="child"
      data-testid="child"
    >
      Child
    </Factory>
  {/snippet}
</Factory>

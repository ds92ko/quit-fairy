<script>
  import { Modal, Dialog, Button } from 'attractions';
  import { modal } from '@/stores/svelte/modal.js';

  const initialModal = {
    open: false,
    title: {
      icon: '',
      text: ''
    },
    contents: [],
    confirm: {
      label: '확인',
      callback: () => {}
    },
    cancel: {
      label: '취소',
      callback: () => {}
    },
  };

  const handleConfirm = () => {
    $modal.confirm?.callback();
    modal.set({ ...initialModal });
  }

  const handleCancel = () => {
    $modal.cancel?.callback();
    modal.set({ ...initialModal });
  }
</script>

<Modal bind:open={$modal.open} let:closeCallback>
  <Dialog title={$modal.title.text} danger {closeCallback}>
    <div slot="title-icon">{$modal.title.icon}</div>
    {#each $modal.contents as content}
      <p>{content}</p>
    {/each}
    <div class="button-group modal-button">
      <slot name="buttons">
        <Button outline on:click={handleCancel}>{$modal.cancel?.label || '취소'}</Button>
        <Button danger outline on:click={handleConfirm}>{$modal.confirm?.label || '획인'}</Button>
      </slot>
    </div>
  </Dialog>
</Modal>

<style>
  .modal-button {
    margin-top: 20px;
  }
</style>
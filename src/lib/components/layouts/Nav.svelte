<script>
  import { Tabs } from 'attractions';

  import { tab } from '@/stores/svelte/tab';
  import { workStatus } from '@/stores/svelte/workStatus';

  $: {
    tab.update(current => ({
      ...current,
      items: current.items.map((item, index) => {
        if (index === 0) return $workStatus.clockOutTime ? '근무 상태' : '근무 설정';
        return item;
      }),
    }));
  }
</script>

<div class="nav">
  <div class="menu">
    <Tabs name="menu" items={$tab.items} bind:value={$tab.current} />
  </div>
</div>

<style>
  .nav {
    position: relative;
    display: flex;
    background: #fff;
  }

  .nav::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgb(234, 234, 234);
    z-index: 100;
  }

  .menu {
    position: relative;
    z-index: 200;
  }
</style>
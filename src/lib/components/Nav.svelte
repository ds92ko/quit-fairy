<script>
  import { Tabs } from 'attractions';

  export let clockOutTime;
  export let selectedTab = '근무 설정';

  let items;
  
  $: items = [clockOutTime ? '근무 상태' : '근무 설정', '근무 기록'];
</script>

<div class="nav">
  <div class="menu">
    <Tabs name="menu" items={items} bind:value={selectedTab} />
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
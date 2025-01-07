<script>
  import { Button } from 'attractions';

  export let isHalfDay = false;
  export let hasLunch = false;
  export let clockInTime = new Date();
  export let clockOutTime;
  export let message;
  export let selectedTab;

  const handleClick = () => {
    if (clockOutTime) {
      isHalfDay = false;
      hasLunch = false;
      clockInTime = new Date();
      clockOutTime = null;
      selectedTab = '근무 설정';
      message = '퇴근했습니다. 오늘도 수고하셨습니다 😚';
      setTimeout(() => {
        message = '';
      }, 2000);
    } else {
      const workHours = isHalfDay ? (hasLunch ? 5 : 4) : 9;
      const outTime = new Date(clockInTime);

      outTime.setHours(outTime.getHours() + workHours);
      clockOutTime = outTime;
      selectedTab = '근무 확인';
      message = '출근했습니다. 오늘도 화이팅하세요 💪';
      setTimeout(() => {
        message = '';
      }, 2000);
    }
  }
</script>

<footer class="footer">
  <div class="container">
    <div class="content">
      <Button filled on:click={handleClick}>{clockOutTime ? '퇴근' : '출근'}하기</Button>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: rgba(67, 0, 176, 0.03);
    padding-block: 14px;
    border-top: 1px solid rgba(67, 0, 176, 0.25);
  }

  .content {
    display: flex;
    justify-content: flex-end;
  }
</style>
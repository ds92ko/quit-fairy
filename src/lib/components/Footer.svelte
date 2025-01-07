<script>
  import { Button } from 'attractions';

  export let isHalfDay = false;
  export let clockInTime = new Date();
  export let clockOutTime;
  export let message;

  const handleClick = () => {
    if (clockOutTime) {
      isHalfDay = false;
      clockInTime = new Date();
      clockOutTime = null;
      message = '퇴근했습니다. 오늘도 수고하셨습니다 😚';
      setTimeout(() => {
        message = '';
      }, 2000);
    } else {
      const workHours = isHalfDay ? 4 : 9;
      const outTime = new Date(clockInTime);

      outTime.setHours(outTime.getHours() + workHours);
      clockOutTime = outTime;
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
      <Button filled on:click={handleClick}>{clockOutTime ? '퇴근하기' : '출근하기'}</Button>
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
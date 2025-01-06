<script>
  import { Button } from 'attractions';
  let isHalfDay = false;
  let isWorking = false;
  let remainingTime = 0;
  let timer;
  let clockInTime;
  let clockOutTime;
  let currentTime = new Date();

  // 반차 여부에 따른 근무 시간 설정
  function setWorkTime() {
    if (!clockInTime) {
      // 출근 시간이 아직 설정되지 않았다면, 출근 시간을 설정
      clockInTime = new Date();
    }
    remainingTime = isHalfDay ? 4 * 60 * 60 : 9 * 60 * 60; // 4시간 or 9시간 (초 단위)
    // remainingTime = isHalfDay ? 4 : 9; // 4시간 or 9시간 (초 단위)
    clockOutTime = new Date(clockInTime.getTime() + remainingTime * 1000); // 퇴근 시간 계산
  }

  // 앱 실행 시 자동으로 출근 처리
  function autoClockIn() {
    setWorkTime();
    isWorking = true;
    timer = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
      } else {
        clearInterval(timer);
        isWorking = false;
      }
    }, 1000);
  }

  // HH:MM:ss 형식으로 시간 포맷하는 함수
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // 매초마다 현재 시간 갱신
  setInterval(() => {
    currentTime = new Date();
  }, 1000);

  // 앱이 처음 시작할 때 자동으로 출근
  autoClockIn();
</script>

<svelte:head>
  <title>칼퇴 요정🧚🏻‍♀️</title>
  <meta name="description" content="칼퇴요정은 근무 종료 시간을 추적하고 퇴근 시간이 되면 알림을 주는 데스크탑 앱입니다." />
</svelte:head>

<main>
  <h1>칼퇴 요정🧚🏻‍♀️</h1>
  <Button>click me</Button>

  <!-- 현재 시간 표시 -->
  <h3>현재 시간: {formatTime(currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds())}</h3>

  <!-- 반차 여부 체크 -->
  <label>
    <input type="checkbox" bind:checked={isHalfDay} on:change={setWorkTime} />
    반차지롱
  </label>

  <!-- 타이머 및 시간 정보 -->
  {#if isWorking}
    <h2>퇴근까지 남은시간: {formatTime(remainingTime)}</h2>
  {/if}

    <!-- 출근 시간 표시 -->
    <h3>출근 시간: {clockInTime ? formatTime(clockInTime.getHours() * 3600 + clockInTime.getMinutes() * 60 + clockInTime.getSeconds()) : ''}</h3>

    <!-- 퇴근 시간 표시 -->
    <h3>퇴근 시간: {clockOutTime ? formatTime((clockOutTime.getHours() * 3600) + (clockOutTime.getMinutes() * 60) + clockOutTime.getSeconds()) : ''}</h3>


  <!-- 야근중 문구 -->
  {#if !isWorking && currentTime.getTime() > clockOutTime?.getTime()}
    <h3>야근중...</h3>
  {/if}

</main>

<style>
  main {
    text-align: center;
    padding: 2em;
  }
  h1 {
    font-size: 2rem;
    margin-bottom: 1em;
  }
  label {
    font-size: 1rem;
    margin-top: 1em;
    display: block;
  }
  h2 {
    font-size: 1.5rem;
    margin-top: 1em;
  }
  h3 {
    font-size: 1.2rem;
    margin-top: 0.5em;
  }
</style>

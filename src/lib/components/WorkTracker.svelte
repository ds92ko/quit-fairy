<script>
  import { formatDate, formatTime, formatDuration } from '../utils/format.js';
  import { H2, H3, Divider, FormField } from 'attractions';
  import CircleProgressBar from './CircleProgressBar.svelte';

  export let isHalfDay = false;
  export let hasLunch = false;
  export let clockInTime = new Date();
  export let clockOutTime;
  export let notification = '';

  const workType = isHalfDay ? `식사 ${hasLunch ? '포함' : '제외'} 반차 사용` : '종일';
  const workHours = isHalfDay ? (hasLunch ? 5 : 4) : 9;

  let infoMessage = '';
  let progress = 0;
  let workingTime = 0;

  const setReminderNotification = () => {
    if (clockOutTime) {
      const timeDifference = clockOutTime - new Date();
      const reminderTime = timeDifference - 10 * 60 * 1000;

      if (reminderTime > 0) {
        setTimeout(() => {
          notification = '퇴근 10분 전입니다! 마무리 작업을 시작하세요 😊';
        }, reminderTime);
      }
    }
  };

  const updateRemainingTime = () => {
    if (clockOutTime) {
      const now = new Date();
      const timeDiff = clockOutTime - now;

      if (timeDiff > 0) {
        infoMessage = `${formatDuration(timeDiff)} 후 퇴근`;
        workingTime = (new Date() - clockInTime) / (clockOutTime - clockInTime);
        progress = Math.min(workingTime * 100, 100);
        progress = Math.floor(progress);
      } else {
        const overdueTime = Math.abs(timeDiff);

        infoMessage = `${formatDuration(overdueTime)} 초과 근무`;
        progress = 100;
      }
    }
  };

  // 상태가 변경될 때마다 퇴근 알림 설정
  $: clockOutTime, setReminderNotification();

  updateRemainingTime();
  setInterval(updateRemainingTime, 100);
</script>

<section>
  <H2>⏳ 근무 진행도</H2>
  <H3>{infoMessage}</H3>
  <CircleProgressBar {progress} />
</section>
<Divider />
<section>
  <H2>👀 출퇴근 체크</H2>
  <H3>{workType} {workHours}시간 근무</H3>
  <div class="card">
    <FormField name="🕘 IN">
      <p>{formatDate(clockInTime)}</p>
      <p>{formatTime(clockInTime)}</p>
    </FormField>
    <FormField name="🕕 OUT">
      <p>{formatDate(clockOutTime)}</p>
      <p>{formatTime(clockOutTime)}</p>
    </FormField>
  </div>
</section>
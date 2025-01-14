<script>
  import { H2, H3, Divider, FormField } from 'attractions';

  import { formatDate, formatTime, formatDuration } from '@/utils/format';
  
  import { workStatus } from '@/stores/svelte/workStatus'; 

  import CircleProgressBar from '@/components/routes/work-tracker/CircleProgressBar.svelte';

  const workType = $workStatus.isHalfDay ? `식사 ${$workStatus.hasLunch ? '포함' : '제외'} 반차 사용` : '종일';
  const workHours = $workStatus.isHalfDay ? ($workStatus.hasLunch ? 5 : 4) : 9;

  let infoMessage = '';
  let progress = 0;
  let workingTime = 0;

  const updateRemainingTime = () => {
    if ($workStatus.clockOutTime) {
      const timeDiff = $workStatus.clockOutTime - new Date();

      if (timeDiff > 0) {
        infoMessage = `${formatDuration(timeDiff)} 후 퇴근`;
        workingTime = (new Date() - $workStatus.clockInTime) / ($workStatus.clockOutTime - $workStatus.clockInTime);
        progress = Math.min(workingTime * 100, 100);
        progress = Math.floor(progress);
      } else {
        const overdueTime = Math.abs(timeDiff);

        infoMessage = `${formatDuration(overdueTime)} 초과 근무`;
        progress = 100;
      }
    }
  };

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
      <p>{formatDate($workStatus.clockInTime)}</p>
      <p>{formatTime($workStatus.clockInTime)}</p>
    </FormField>
    <FormField name="🕕 OUT">
      <p>{formatDate($workStatus.clockOutTime)}</p>
      <p>{formatTime($workStatus.clockOutTime)}</p>
    </FormField>
  </div>
</section>
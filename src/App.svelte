<script>
  import { onDestroy, onMount } from 'svelte';

  import { initialSetting, getSetting } from '@/stores/electron/setting';
  import { setWorkLog } from '@/stores/electron/workLog';
  
  import { notification } from '@/stores/svelte/notification';
  import { tab } from '@/stores/svelte/tab';
  import { workStatus } from '@/stores/svelte/workStatus'; 

  import Header from '@/components/layouts/Header.svelte';
  import Nav from '@/components/layouts/Nav.svelte';
  import WorkStatus from '@/components/layouts/WorkStatus.svelte';
  import Footer from '@/components/layouts/Footer.svelte';
  
  import WorkSetup from '@/routes/WorkSetup.svelte';
  import WorkTracker from '@/routes/WorkTracker.svelte';
  import WorkLogs from '@/routes/WorkLogs.svelte';
  import Settings from '@/routes/Settings.svelte';

  import Toast from '@/components/common/Toast.svelte';
  import Modal from '@/components/common/Modal.svelte';

  let logData = [];
  let settingData = { ...initialSetting };
  let reminderTimeout;
  let preReminderTimeout;

  const setAutoClockIn = async () => {
    settingData = await getSetting();
    
    if (settingData.autoClockIn) {
      const now = new Date();
      const workHours = $workStatus.isHalfDay ? ($workStatus.hasLunch ? 5 : 4) : 9;
      const outTime = new Date(now);

      outTime.setHours(outTime.getHours() + workHours);

      setWorkLog({
        clockInTime: now,
        scheduledOutTime: outTime,
        isHalfDay: $workStatus.isHalfDay,
        hasLunch: $workStatus.hasLunch,
      });

      workStatus.set({
        clockInTime: now,
        clockOutTime: outTime
      });
      tab.update(current => ({ ...current, current: '근무 상태' }));
      notification.set({ message: '출근했습니다! 오늘도 화이팅하세요 💪', enableSystemNotification: true });
    }
  };

  const scheduleNotifications = () => {
    if (!$workStatus.clockOutTime) return;

    const now = new Date();
    const timeToClockOut = $workStatus.clockOutTime - now;

    if (reminderTimeout) clearTimeout(reminderTimeout);
    if (preReminderTimeout) clearTimeout(preReminderTimeout);
    
    if (settingData.enableReminder && timeToClockOut > 0) {
      reminderTimeout = setTimeout(() => {
        notification.set({ message: '퇴근 시간이 되었어요! 😊', enableSystemNotification: true });
      }, timeToClockOut);
    }

    if (settingData.enablePreReminder) {
      const reminderTime = settingData.reminderTime * (settingData.reminderTimeUnit === 'minutes' ? 60000 : 3600000);
      const timeToReminder = timeToClockOut - reminderTime;

      if (timeToReminder > 0) {
        preReminderTimeout = setTimeout(() => {
          notification.set({ 
            message: `퇴근 ${settingData.reminderTime}${settingData.reminderTimeUnit === 'minutes' ? '분' : '시간'} 전입니다! 마무리 작업을 시작하세요 😊`, 
            enableSystemNotification: true 
          });
        }, timeToReminder);
      }
    }
  };

  $: $workStatus.clockOutTime, settingData, scheduleNotifications();

  onMount(() => {
    scheduleNotifications();
    setAutoClockIn();
  });

  onDestroy(() => {
    if (reminderTimeout) clearTimeout(reminderTimeout);
    if (preReminderTimeout) clearTimeout(preReminderTimeout);
  });
</script>

<Header />

<main>
  <div class="container">
    <WorkStatus />
    <Nav />
    {#if $tab.current === '근무 상태'}
      <WorkTracker />
    {:else if $tab.current === '근무 설정'}
      <WorkSetup />
    {:else if $tab.current === '근무 기록'}
      <WorkLogs bind:logData />
    {:else if $tab.current === '설정'}
      <Settings bind:settingData />
    {/if}
  </div>
</main>

<Toast />
<Footer bind:logData bind:settingData />
<Modal />

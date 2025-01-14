<script>
  import { onDestroy, onMount } from 'svelte';

  import { getSetting } from '@/stores/electron/setting';
  import { setWorkLog } from '@/stores/electron/workLog';

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

  let currentTime = new Date();
  let isHalfDay = false;
  let hasLunch = false;
  let clockInTime;
  let clockOutTime;
  let selectedTab = '근무 설정';
  let logData = [];
  let settingData = {
    autoClockIn: false,
    enableReminder: true,
    enablePreReminder: true,
    reminderTimeUnit: 'minutes',
    reminderTime: 10
  }
  let notification = {
    message: '',
    enableSystemNotification: true,
  };
  let notificationTimeout;
  let reminderTimeout;
  let preReminderTimeout;

  const requestNotificationPermission = async () => {
    if (Notification.permission !== 'granted') {
      await Notification.requestPermission();
    }
  }

  const setNotification = ({ message, enableSystemNotification }) => {
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }

    notification = { 
      message, 
      enableSystemNotification
    };

    if (enableSystemNotification) {
      requestNotificationPermission().then(() => {
        new Notification('칼퇴 요정', { body: message });
      });
    }

    notificationTimeout = setTimeout(() => {
      notification = { message: '', enableSystemNotification: true };
    }, 2000);
  }

  const setAutoClockIn = async () => {
    settingData = await getSetting();
    
    if (settingData.autoClockIn) {
      const now = new Date();
      const workHours = isHalfDay ? (hasLunch ? 5 : 4) : 9;
      const outTime = new Date(now);

      outTime.setHours(outTime.getHours() + workHours);

      setWorkLog({
        clockInTime: now,
        scheduledOutTime: outTime,
        isHalfDay,
        hasLunch,
      });

      clockInTime = now;
      clockOutTime = outTime;
      selectedTab = '근무 상태';
      setNotification({ message: '출근했습니다! 오늘도 화이팅하세요 💪', enableSystemNotification: true });
    }
  };

  const scheduleNotifications = () => {
    if (!clockOutTime) return;

    const now = new Date();
    const timeToClockOut = clockOutTime - now;

    if (reminderTimeout) clearTimeout(reminderTimeout);
    if (preReminderTimeout) clearTimeout(preReminderTimeout);
    
    if (settingData.enableReminder) {
      if (timeToClockOut > 0) {
        reminderTimeout = setTimeout(() => {
          setNotification({ message: '퇴근 시간이 되었어요! 😊', enableSystemNotification: true });
        }, timeToClockOut);
      }
    }

    if (settingData.enablePreReminder) {
      const reminderTime = settingData.reminderTime * (settingData.reminderTimeUnit === 'minutes' ? 60000 : 3600000);
      const timeToReminder = timeToClockOut - reminderTime;

      if (timeToReminder > 0) {
        preReminderTimeout = setTimeout(() => {
          setNotification({ 
            message: `퇴근 ${settingData.reminderTime}${settingData.reminderTimeUnit === 'minutes' ? '분' : '시간'} 전입니다! 마무리 작업을 시작하세요 😊`, 
            enableSystemNotification: true 
          });
        }, timeToReminder);
      }
    }
  };

  $: clockOutTime, settingData, scheduleNotifications();

  onMount(() => {
    scheduleNotifications();
    setAutoClockIn();
  });

  onDestroy(() => {
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }
  });
</script>

<Header bind:currentTime />

<main>
  <div class="container">
    <WorkStatus {clockOutTime} />
    <Nav {clockOutTime} bind:selectedTab />
    {#if selectedTab === '근무 상태'}
      <WorkTracker {isHalfDay} {hasLunch} {clockInTime} {clockOutTime} />
    {:else if selectedTab === '근무 설정'}
      <WorkSetup bind:isHalfDay bind:hasLunch bind:clockInTime />
    {:else if selectedTab === '근무 기록'}
      <WorkLogs bind:logData />
    {:else if selectedTab === '설정'}
      <Settings bind:settingData />
    {/if}
  </div>
</main>

{#if notification.message}
  <Toast message={notification.message} />
{/if}

<Footer bind:isHalfDay bind:hasLunch bind:clockInTime bind:clockOutTime bind:selectedTab bind:logData bind:settingData {setNotification} />
<Modal />

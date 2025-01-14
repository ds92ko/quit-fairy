<script>
  import { Button } from 'attractions';
  
  import { setSetting } from '@/stores/electron/setting';
  import { deleteWorkLog, setWorkLog, getWorkLog } from '@/stores/electron/workLog';
  
  import { modal } from '@/stores/svelte/modal';
  import { notification } from '@/stores/svelte/notification';
  import { tab } from '@/stores/svelte/tab';
  import { workStatus } from '@/stores/svelte/workStatus';

  export let logData = [];
  export let settingData = {
    autoClockIn: false,
    enableReminder: true,
    enablePreReminder: true,
    reminderTimeUnit: 'minutes',
    reminderTime: 10
  };

  let disabled = true;

  const handleSetWorkLog = () => {
    if ($workStatus.clockOutTime) {
      setWorkLog({
        clockInTime: $workStatus.clockInTime,
        scheduledOutTime: $workStatus.clockOutTime,
        actualOutTime: new Date(),
        isHalfDay: $workStatus.isHalfDay,
        hasLunch: $workStatus.hasLunch,
      });

      workStatus.reset();
      tab.update(current => ({ ...current, current: '근무 설정' }));
      notification.set({ message: '퇴근했습니다! 오늘도 수고하셨습니다 😚', enableSystemNotification: true });
    } else {
      const workHours = $workStatus.isHalfDay ? ($workStatus.hasLunch ? 5 : 4) : 9;
      const outTime = new Date($workStatus.clockInTime);

      outTime.setHours(outTime.getHours() + workHours);

      setWorkLog({
        clockInTime: $workStatus.clockInTime,
        scheduledOutTime: outTime,
        isHalfDay: $workStatus.isHalfDay,
        hasLunch: $workStatus.hasLunch,
      });

      workStatus.set({ clockOutTime: outTime });
      tab.update(current => ({ ...current, current: '근무 상태' }));
      notification.set({ message: '출근했습니다! 오늘도 화이팅하세요 💪', enableSystemNotification: true });
    }
  }

  const handleDeleteWorkLogs = () => {
    modal.open({
      title: {
        icon: '⚠️',
        text: '근무 기록 전체 삭제'
      },
      contents: [
        '현재 검색된 기록뿐만 아니라, 모든 근무 기록이 삭제됩니다',
        '삭제된 데이터는 다시 복구할 수 없습니다!',
        '근무 기록을 모두 삭제할까요?'
      ],
      confirm: {
        label: '삭제',
        callback: async () => {
          await deleteWorkLog();
          logData = [...await getWorkLog()];
          notification.set({ message: '근무 기록을 모두 삭제했습니다! 🗑️', enableSystemNotification: false });
        }
      },
    })
  }

  const handleSetSetting = () => {
    setSetting(settingData);
    notification.set({ message: '설정을 저장했습니다! 🎉', enableSystemNotification: false });
  }

  $: disabled = logData.length === 0;
</script>

<footer class="footer">
  <div class="container">
    <div class="content">
      {#if $tab.current === '근무 기록'}
        <Button filled on:click={handleDeleteWorkLogs} disabled={disabled}>전체삭제</Button>
      {:else if $tab.current === '설정'}
        <Button filled on:click={handleSetSetting}>저장하기</Button>
      {:else}
        <Button filled on:click={handleSetWorkLog}>{$workStatus.clockOutTime ? '퇴근' : '출근'}하기</Button>
      {/if}
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
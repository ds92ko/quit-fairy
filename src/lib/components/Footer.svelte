<script>
  import { Button, Modal, Dialog } from 'attractions';
  import { deleteWorkLog, setWorkLog, getWorkLog } from '../store/workLog.js';
  import { setSetting } from '../store/setting.js';

  export let isHalfDay = false;
  export let hasLunch = false;
  export let clockInTime = new Date();
  export let clockOutTime;
  export let selectedTab = '근무 설정';
  export let logData = [];
  export let settingData = {
    autoClockIn: false,
    enableReminder: true,
    enablePreReminder: true,
    reminderTimeUnit: 'minutes',
    reminderTime: 10
  };
  export let setNotification;

  let disabled = true;
  let modalOpen = false;

  const handleSetWorkLog = () => {
    if (clockOutTime) {
      setWorkLog({
        clockInTime,
        scheduledOutTime: clockOutTime,
        actualOutTime: new Date(),
        isHalfDay,
        hasLunch,
      });

      isHalfDay = false;
      hasLunch = false;
      clockInTime = new Date();
      clockOutTime = null;
      selectedTab = '근무 설정';
      setNotification({ message: '퇴근했습니다! 오늘도 수고하셨습니다 😚', enableSystemNotification: true });
    } else {
      const workHours = isHalfDay ? (hasLunch ? 5 : 4) : 9;
      const outTime = new Date(clockInTime);

      outTime.setHours(outTime.getHours() + workHours);

      setWorkLog({
        clockInTime,
        scheduledOutTime: outTime,
        isHalfDay,
        hasLunch,
      });

      clockOutTime = outTime;
      selectedTab = '근무 상태';
      setNotification({ message: '출근했습니다! 오늘도 화이팅하세요 💪', enableSystemNotification: true });
    }
  }

  const handleOpenModal = () => modalOpen = true;

  const handleCloseModal = () => modalOpen = false;

  const handleDeleteWorkLog = async () => {
    await deleteWorkLog();
    logData = [...await getWorkLog()];
    setNotification({ message: '근무 기록을 모두 삭제했습니다! 🗑️', enableSystemNotification: false});
    handleCloseModal();
  }

  const handleSetSetting = () => {
    setSetting(settingData);
    setNotification({ message: '설정을 저장했습니다! 🎉', enableSystemNotification: false });
  }
  
  $: disabled = logData.length === 0;
</script>

<footer class="footer">
  <div class="container">
    <div class="content">
      {#if selectedTab === '근무 기록'}
        <Button filled on:click={handleOpenModal} disabled={disabled}>전체삭제</Button>
      {:else if selectedTab === '설정'}
        <Button filled on:click={handleSetSetting}>저장하기</Button>
      {:else}
        <Button filled on:click={handleSetWorkLog}>{clockOutTime ? '퇴근' : '출근'}하기</Button>
      {/if}
    </div>
  </div>
</footer>

<Modal bind:open={modalOpen} let:closeCallback>
  <Dialog title="근무 기록 전체 삭제" danger {closeCallback}>
    <div slot="title-icon">⚠️</div>
    <p>근무 기록을 모두 삭제할까요?</p>
    <p>삭제된 데이터는 다시 복구할 수 없습니다!</p>
    <div class="button-group modal-button">
      <Button outline on:click={handleCloseModal}>취소</Button>
      <Button danger outline on:click={handleDeleteWorkLog}>삭제</Button>
    </div>
  </Dialog>
</Modal>

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

  .modal-button {
    margin-top: 20px;
  }
</style>
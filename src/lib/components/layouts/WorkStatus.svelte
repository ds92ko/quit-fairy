<script>
  import { workStatus } from '@/stores/svelte/workStatus'; 

  let status, src;
  const statusMessageMap = {
    BEFORE_WORK: '출근 전! 오늘도 힘차게 시작해볼까? 😎',
    WORKING: '열일 중! 집중 모드 ON! 🔥💪',
    OVERTIME: '야근 중! 퇴근은 조금만 더! 🦸‍♂️💼'
  }

  $: status = !$workStatus.clockOutTime ? 'BEFORE_WORK' : new Date() > $workStatus.clockOutTime ? 'OVERTIME' : 'WORKING';
  $: src = `/images/${status.toLowerCase()}.png`;
</script>

<section>
  <div class="content">
    <p class="message">{statusMessageMap[status]}</p>
    <img class="image" src={src} alt={statusMessageMap[status]} />
  </div>
</section>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 20px;
  }

  .message {
    position: relative;
    background: rgba(67, 0, 176, 0.25);
    border-radius: .4em;
    padding: 20px;
  }

  .message::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-top-color: rgba(67, 0, 176, 0.25);
    border-bottom: 0;
    border-right: 0;
    margin-left: -10px;
    margin-bottom: -20px;
  }

  .image {
    width: 100%;
    max-width: 200px;
  }
</style>


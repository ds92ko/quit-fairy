<script>
  import { formatDate, formatTime } from '@/utils/format';
  
  let currentTime = new Date();

  setInterval(() => currentTime = new Date(), 100);
</script>

<header class="header">
  <div class="container">
    <div class="content">
      <h1 class="logo">
        <img src="/images/logo.png" alt="칼퇴 요정" class="logo-image" />
        <span>칼퇴 요정</span>
      </h1>
      <div class="current-time">
        <p>{formatDate(currentTime)}</p>
        <p>{formatTime(currentTime)}</p>
      </div>
    </div>
  </div>
</header>

<style>
  .header {
    background: rgba(67, 0, 176, 0.03);
    padding-block: 14px;
    border-bottom: 1px solid rgba(67, 0, 176, 0.25);
  }

  .container {
    padding: 0 24px 0 16px;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  .logo {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 24px;
    color: #333;
  }

  .logo-image {
    width: 50px;
    aspect-ratio: 1 / 1;
  }

  .current-time {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: right;
  }
</style>
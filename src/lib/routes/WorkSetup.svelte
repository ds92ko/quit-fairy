<script>
  import { H2, FormField, TimePicker, Switch } from 'attractions';

  import { workStatus } from '@/stores/svelte/workStatus'; 

  const handleChange = () => {
    if (!$workStatus.isHalfDay) workStatus.set({ hasLunch: false });
  };
</script>

<section>
  <H2>⏱️ 출근 하기</H2>
  <div class="card">
    <FormField name="⏰ 출근 시간" help="기본 값은 앱을 실행한 시간입니다." required>
      <TimePicker format="%H:%M:%S %P" bind:value={$workStatus.clockInTime}/>
    </FormField>
    <FormField name="👋 반차 여부" help="반차를 사용할 경우만 선택하세요.">
      <Switch bind:value={$workStatus.isHalfDay} on:change={handleChange}>
        <span class="switch-label">반차 {$workStatus.isHalfDay ? '사용' : '미사용'}</span>
      </Switch>
    </FormField>
    {#if $workStatus.isHalfDay}
      <FormField name="🍽️ 식사 여부" help="반차 사용 시 점심 식사를 할 경우만 선택하세요.">
        <Switch bind:value={$workStatus.hasLunch} disabled={!$workStatus.isHalfDay}>
          <span class="switch-label">식사 {$workStatus.hasLunch ? '포함' : '제외'}</span>
        </Switch>
      </FormField>
    {/if}
    <FormField name="⏳ 총 근무 시간" help="설정에 따라 근무 시간이 계산됩니다.">
      <p>{$workStatus.isHalfDay ? ($workStatus.hasLunch ? 5 : 4) : 9}시간 근무</p>
    </FormField>
  </div>
</section>

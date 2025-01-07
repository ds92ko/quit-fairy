<script>
  import { H2 } from 'attractions';
  import { FormField, TimePicker, Switch } from 'attractions';

  export let isHalfDay = false;
  export let clockInTime = new Date();
</script>

<section>
  <H2>⏱️ 근무 설정</H2>
  <div class="card">
    <FormField name="출근 시간" required>
      <TimePicker name="clockInTime" format="%H:%M:%S %P" bind:value={clockInTime}/>
    </FormField>
    <FormField name="반차 여부">
      <Switch name="isHalfDay" bind:value={isHalfDay} />
    </FormField>
  </div>
</section>

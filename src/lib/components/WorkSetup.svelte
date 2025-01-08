<script>
  import { H2, FormField, TimePicker, Switch } from 'attractions';

  export let isHalfDay = false;
  export let hasLunch = false;
  export let clockInTime = new Date();

  const handleChange = () => {
    if (!isHalfDay) hasLunch = false;
  };
</script>

<section>
  <H2>⏱️ 출근 하기</H2>
  <div class="card">
    <FormField name="⏰ 출근 시간" required>
      <TimePicker format="%H:%M:%S %P" bind:value={clockInTime}/>
    </FormField>
    <FormField name="👋 반차 여부">
      <Switch bind:value={isHalfDay} on:change={handleChange} />
    </FormField>
    {#if isHalfDay}
      <FormField name="🍽️ 식사 여부">
        <Switch bind:value={hasLunch} disabled={!isHalfDay} />
      </FormField>
    {/if}
  </div>
</section>

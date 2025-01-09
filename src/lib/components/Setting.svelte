<script>
  import { Button, Dropdown, FormField, H2, Switch, TextField, DropdownShell } from "attractions";
  import { onMount } from "svelte";
  import { getSetting } from '../store/setting.js';
  import Loading from './Loading.svelte';

  export let settingData = {
    enableReminder: true,
    enablePreReminder: true,
    reminderTimeUnit: 'minutes',
    reminderTime: 10
  };
  
  let loading = true;
  const timeUnits = [
    { value: 'minutes', label: '분 전' },
    { value: 'hours', label: '시간 전'},
  ];

  onMount(async () => {
    settingData = await getSetting();
    loading = false;
  });
</script>
<section>
  <H2>🔔 알림 설정</H2>
  <div class="card">
    <FormField name="퇴근 알림 여부" help="퇴근 시간에 알림을 받습니다.">
      {#if loading}
        <Loading />
      {:else}
        <Switch bind:value={settingData.enableReminder}>
          <span class="switch-label">알림 {settingData.enableReminder ? '켜기' : '끄기'}</span>
        </Switch>
      {/if}
    </FormField>
    <FormField name="퇴근 전 알림 여부" help="퇴근 시간 전에 알림을 받습니다.">
      {#if loading}
        <Loading />
      {:else}
        <Switch bind:value={settingData.enablePreReminder}>
          <span class="switch-label">알림 {settingData.enablePreReminder ? '켜기' : '끄기'}</span>
        </Switch>
      {/if}
    </FormField>
    {#if settingData.enablePreReminder}
      <FormField name="퇴근 전 알림 시점" help={`퇴근 몇 ${loading ? '분' : settingData.reminderTimeUnit === 'minutes' ? '분' : '시간'} 전에 알림을 받을지 설정합니다.`}>
        {#if loading}
          <Loading />
        {:else}
          <div class="form-group">
            <TextField 
              bind:value={settingData.reminderTime}
              type="number"
              min="1"
              max={settingData.reminderTimeUnit === 'minutes' ? 59 : 23}
              noSpinner
              error={settingData.reminderTime < 1
                ? '1 이상의 값을 입력해주세요.'
                : settingData.reminderTime > (settingData.reminderTimeUnit === 'minutes' ? 59 : 23)
                ? `${settingData.reminderTimeUnit === 'minutes' ? 59 : 23} 이하의 값을 입력해주세요.`
                : ''
              }
            />
            <DropdownShell let:toggle>
              <Button on:click={toggle}>
                {settingData.reminderTimeUnit === 'minutes' ? '분' : '시간'} 전
              </Button>
              <Dropdown>
                <div class="dropdown-options">
                  {#each timeUnits as { value, label }}
                    <Button on:click={() => { settingData.reminderTimeUnit = value; toggle(); }}>{label}</Button>
                  {/each}
                </div>
              </Dropdown>
            </DropdownShell>
          </div>
        {/if}
      </FormField>
    {/if}
  </div>
</section>
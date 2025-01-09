export const getSetting = async () => {
  const setting = await electron.store.get('setting');
  return setting;
}

export const setSetting = async ({
  enableReminder,
  enablePreReminder,
  reminderTimeUnit,
  reminderTime,
}) => {
  const previousSetting = await electron.store.get('setting');
  const updatedSetting = {
    enableReminder: enableReminder ?? previousSetting.enableReminder,
    enablePreReminder: enablePreReminder ?? previousSetting.enablePreReminder,
    reminderTimeUnit : reminderTimeUnit ?? previousSetting.reminderTimeUnit,
    reminderTime: reminderTime ?? previousSetting.reminderTime,
  };

  await electron.store.set('setting', updatedSetting);
}
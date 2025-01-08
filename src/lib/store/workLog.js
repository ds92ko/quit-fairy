import { formatDate, formatTime, formatDuration } from '../utils/format.js';

export const getWorkLog = async () => {
  const workLog = await electron.store.get('workLog');
  return workLog || [];
}

export const deleteWorkLog = async () => {
  await electron.store.delete('workLog');
}

export const setWorkLog = async ({
  clockInTime,
  scheduledOutTime,
  actualOutTime,
  isHalfDay,
  hasLunch,
}) => {
  const currentLogs = await electron.store.get('workLog') || [];
  let newLogs = [...currentLogs];
  const newLog = {
    date: formatDate(clockInTime),
    clockInTime: formatTime(clockInTime),
    scheduledOutTime: formatTime(scheduledOutTime),
    actualOutTime: actualOutTime ? formatTime(actualOutTime) : `${formatTime(scheduledOutTime)} 예정`,
    workTime: actualOutTime ? formatDuration(actualOutTime - clockInTime) : '근무 중',
    workType: isHalfDay ? (hasLunch ? '반차 (식사 포함) 5시간' : '반차 (식사 제외) 4시간') : '종일 9시간',
  }

  const logIndex = currentLogs.findIndex(log => log.date === newLog.date);

  if (logIndex >= 0) {
    newLogs[logIndex] = newLog;
  } else {
    newLogs.unshift(newLog);
  }

  await electron.store.set('workLog', newLogs);
}
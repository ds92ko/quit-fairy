<script>
  import { H2, Table } from 'attractions';

  const headers = [
    { text: '날짜', value: 'date' },
    { text: '출근 시간', value: 'clockInTime' },
    { text: '퇴근 시간', value: 'clockOutTime' },
    { text: '근무 시간', value: 'workTime' },
    { text: '근무 유형', value: 'workType' },
  ];
  const items = [
    {
      date: '2025년 01월 07일 (화)',
      clockInTime: '오전 09:00:00',
      clockOutTime: '오후 06:00:00',
      workType: '종일',
      workTime: '9시간'
    },
    {
      date: '2025년 01월 07일 (화)',
      clockInTime: '오전 09:00:00',
      clockOutTime: '오후 01:00:00',
      workType: '반차 (식사 제외)',
      workTime: '4시간'
    },
    {
      date: '2025년 01월 07일 (화)',
      clockInTime: '오전 09:00:00',
      clockOutTime: '오후 02:00:00',
      workType: '반차 (식사 포함)',
      workTime: '5시간'
    },
  ];
</script>

<section>
  <H2>📝 근무 기록</H2>
  <Table {headers} {items} alternatingRows={false} />
</section>
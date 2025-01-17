/**
 * 주어진 Date 객체를 "YYYY년 MM월 DD일 (요일)" 형식의 문자열로 변환합니다.
 *
 * @param {Date} date - 변환할 Date 객체.
 * @returns {string} "YYYY년 MM월 DD일 (요일)" 형식으로 변환된 날짜 문자열.
 * @example
 * const date = new Date('2025-01-06');
 * formatDate(date); // "2025년 01월 06일 (월)"
 */
export function formatDate(date) {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const weekday = days[date.getDay()];

  return `${year}년 ${month}월 ${day}일 (${weekday})`;
}

/**
 * "YYYY년 MM월 DD일 (요일)" 형식의 문자열을 Date 객체로 변환합니다.
 *
 * @param {string} dateString - 변환할 날짜 문자열 ("YYYY년 MM월 DD일 (요일)" 형식).
 * @returns {Date} 변환된 Date 객체.
 * @example
 * const dateString = "2025년 01월 06일 (월)";
 * parseDate(dateString); // Date 객체
 */
export function parseDate(dateString) {
  const regex = /^(\d{4})년 (\d{2})월 (\d{2})일 \((일|월|화|수|목|금|토)\)$/;
  const match = dateString.match(regex);

  if (!match) {
    throw new Error('날짜 형식이 올바르지 않습니다.');
  }

  const [, year, month, day] = match;

  return new Date(`${year}-${month}-${day}T00:00:00Z`);
}

/**
 * 주어진 Date 객체를 12시간제 형식("오전"/"오후")의 문자열로 변환합니다.
 *
 * @param {Date} date - 변환할 Date 객체.
 * @returns {string} "오전 HH:MM:SS" 또는 "오후 HH:MM:SS" 형식의 시간 문자열.
 * @example
 * const date = new Date('2025-01-06T12:30:00');
 * formatTime(date); // "오후 12:30:00"
 */
export function formatTime(date) {
  const hours24 = date.getHours();
  const hours = hours24 % 12 || 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const period = hours24 >= 12 ? '오후' : '오전';

  return `${period} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * 주어진 날짜 문자열을 파싱하여 24시간제로 변환된 `Date` 객체를 반환합니다.
 * 
 * @param {string} dateString - '오전' 또는 '오후'와 시간이 포함된 문자열 (예: '오전 09:30:00', '오후 04:45:00')
 * @returns {Date} 24시간제로 변환된 `Date` 객체
 * 
 * @example
 * // '오전 09:30:00'을 입력하면, 09:30:00에 해당하는 Date 객체를 반환합니다.
 * const date = parseTime('오전 09:30:00');
 * console.log(date); // 결과: 2025-01-08T09:30:00.000Z
 */
export function parseTime(dateString) {
  const [period, time] = dateString.split(' ');
  const [hours, minutes, seconds] = time.split(':').map(Number);

  const now = new Date();
  let hours24 = hours;

  if (period === '오후' && hours !== 12) {
    hours24 += 12;
  } else if (period === '오전' && hours === 12) {
    hours24 = 0;
  }

  now.setHours(hours24, minutes, seconds, 0);
  return now;
}

/**
 * 주어진 밀리초(milliseconds)를 시간, 분, 초로 변환하여 포맷합니다.
 * 
 * @param {number} milliseconds - 변환할 밀리초 값
 * @returns {string} 변환된 시간 포맷 (예: "2시간 30분 45초")
 * 
 * @example
 * // 2시간 30분 45초
 * formatDuration(9045000);
 * 
 * @example
 * // 0시간 5분 30초
 * formatDuration(330000);
 */
export function formatDuration(milliseconds) {
  const hours = Math.floor(milliseconds / 1000 / 60 / 60);
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
  const seconds = Math.floor((milliseconds / 1000) % 60);

  return `${hours}시간 ${minutes}분 ${seconds}초`;
}
export const getISOstring = (
  year: number,
  month: number,
  day: number,
  hours: number = 0,
  minutes: number = 0,
  seconds: number = 0
): string => {
  // Date 객체는 기본적으로 로컬 시간대를 사용하므로 한국 시간대를 고려하여 생성
  const date = new Date(year, month - 1, day, hours, minutes, seconds);

  // 한국 시간대 오프셋 (UTC+9) 추가
  const koreaOffset = 9 * 60 * 60 * 1000;
  const koreaTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000 + koreaOffset);

  // ISO 문자열 생성 (UTC 표기 'Z'를 '+09:00'으로 변경)
  return koreaTime.toISOString().replace('Z', '+09:00');
}

export interface DateInfo {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  weekday: string;
}

export const getDateInfo = (isoString: string): DateInfo => {
  // ISO 문자열을 Date 객체로 변환
  const date = new Date(isoString);

  // 한국 시간대로 변환
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'long'
  };

  const formatter = new Intl.DateTimeFormat('ko-KR', options);
  const parts = formatter.formatToParts(date);

  // 결과를 저장할 객체 생성
  const result: Partial<DateInfo> = {};

  // 각 파트를 파싱하여 객체로 저장
  parts.forEach(({ type, value }) => {
    if (type === 'year') result.year = parseInt(value, 10);
    else if (type === 'month') result.month = parseInt(value, 10);
    else if (type === 'day') result.day = parseInt(value, 10);
    else if (type === 'hour') result.hours = parseInt(value, 10);
    else if (type === 'minute') result.minutes = parseInt(value, 10);
    else if (type === 'second') result.seconds = parseInt(value, 10);
    else if (type === 'weekday') result.weekday = value;
  });

  // Partial 타입의 result를 DateInfo로 변환하여 반환
  return result as DateInfo;
}
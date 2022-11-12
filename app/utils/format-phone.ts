export function formatPhone(phoneNum: string | number) {
  return String(phoneNum).replace(/(\d{3,})(\d{3,})(\d{4,})/g, '($1)-$2-$3');
}

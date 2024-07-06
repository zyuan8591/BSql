export default function num(value: string | number) {
  return String(value).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

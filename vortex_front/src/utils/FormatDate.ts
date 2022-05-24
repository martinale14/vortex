export default function formatDate(date?: Date) {
  return [date?.getDate(), date?.getMonth(), date?.getFullYear()].join('/');
}

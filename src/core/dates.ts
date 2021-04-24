export const getFormatDate = (date: string): string => {
    const months: string[] = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const newDate: Date = new Date(date);
    const year: number = newDate.getFullYear();
    const month: string = months[newDate.getMonth()];
    const day: number = newDate.getDate();
    const hour: number = newDate.getHours();
    let mins: string | number = newDate.getMinutes();
    mins = mins < 10 ? mins + '0' : mins;
  
    return `${day} - ${month} - ${year} / ${hour}:${mins}`;
  };
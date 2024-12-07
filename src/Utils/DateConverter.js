function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
  
    return `${day}/${month}/${year}`;
}

function getTimeFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
    return `${hours}:${minutes}`;
}

function getTimeFromTimestampStyled(timestamp) {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const amPm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  return `${String(hours).padStart(2, '0')}:${minutes} ${amPm}`;
}

function formatDateStyled(timestamp) {
    const date = new Date(parseInt(timestamp));
  
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} de ${month} ${year}`;
  }

export {formatDate, getTimeFromTimestamp, formatDateStyled, getTimeFromTimestampStyled}
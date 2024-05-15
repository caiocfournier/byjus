function setAlarm() {
    const alarmTime = document.getElementById('alarmTime').value;
    const [hours, minutes] = alarmTime.split(':');
    
     /*Em JavaScript, new Date() é uma função construtora que cria um
     objeto do tipo Date, representando uma data e hora específicas.
      O objeto Date representa um ponto no tempo, permitindo que você
      trabalhe com datas e horários em seus programas.*/

    const now = new Date();
    const alarm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

    const difference = alarm - now;
    if (difference < 0) {
        alert('por favor, selecione um horário futuro.');
       return; 
    }

    /* A função setTimeout() em JavaScript é usada para agendar a aexecução de uma função
    (ou a avaliação de uma expressão) após um determinado intervalo de tempo,
    medido em milissegundos.*/

    setTimeout(() => {
        document.getElementById('alarmSound').play();
        alert('Alarme! Hora de acordar!');
    }, difference);
}

function stopAlarm() {
    document.getElementById('alarmSound').pause();
    document.getElementById('alarmSound').currentTime = 0;
}

//função para o segundo alarme

function setAlarm2() {
    const alarmTime2 = document.getElementById('alarmTime2').value;
    const [hours, minutes] = alarmTime2.split(':');
    
     /*Em JavaScript, new Date() é uma função construtora que cria um
     objeto do tipo Date, representando uma data e hora específicas.
      O objeto Date representa um ponto no tempo, permitindo que você
      trabalhe com datas e horários em seus programas.*/

    const now2 = new Date();
    const alarm2 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

    const difference = alarm2 - now2;
    if (difference < 0) {
        alert('por favor, selecione um horário futuro.');
       return; 
    }

    /* A função setTimeout() em JavaScript é usada para agendar a aexecução de uma função
    (ou a avaliação de uma expressão) após um determinado intervalo de tempo,
    medido em milissegundos.*/

    setTimeout(() => {
        document.getElementById('alarmSound').play();
        alert('Alarme! Hora de acordar!');
    }, difference);
}
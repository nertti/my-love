// ДАТА НАЧАЛА ОТНОШЕНИЙ
const START_DATE = new Date('2022-01-31T00:00:00');

function updateTimers() {
    const now = new Date();

    // Вычисляем общую разницу в миллисекундах
    let diff = now - START_DATE;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // Рассчитываем точную календарную раскладку по годам, месяцам и дням
    let yearsCount = now.getFullYear() - START_DATE.getFullYear();
    let monthsCount = now.getMonth() - START_DATE.getMonth();
    let daysCount = now.getDate() - START_DATE.getDate();

    if (daysCount < 0) {
        monthsCount--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        daysCount += prevMonth;
    }
    if (monthsCount < 0) {
        yearsCount--;
        monthsCount += 12;
    }

    // Выводим данные в блок таймера
    document.getElementById('love-timer').innerHTML =
        `<span>${yearsCount}</span> г. <span>${monthsCount}</span> мес. <span>${daysCount}</span> дн. <span>${hours}</span> ч. <span>${minutes}</span> мин. <span>${seconds}</span> сек.<br><small>(Всего дней: ${days})</small>`;
}

// Открытие скрытой секции
function revealSecret() {
    document.getElementById('secret-block').style.display = 'block';
    document.getElementById('action-btn').style.display = 'none';

    // Эффект взрыва сердечек при открытии
    for(let i = 0; i < 20; i++) {
        setTimeout(createHeart, i * 80);
    }
}

// Клик по карточке купона
function activateCoupon(card, message) {
    if (!card.classList.contains('activated')) {
        card.classList.add('activated');
        card.style.borderStyle = 'solid';
        card.style.background = '#e2f0d9';
        card.style.borderColor = '#70ad47';

        const title = card.querySelector('h4');
        title.innerHTML = "✓ Активирован!";

        alert(message + " Выполняю прямо сейчас! ❤️");
    }
}

// Генератор падающих сердечек для фона
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.fontSize = Math.random() * 15 + 15 + 'px';
    document.body.appendChild(heart);

    setTimeout(() => { heart.remove(); }, 5000);
}

// Инициализация интервалов
setInterval(updateTimers, 1000);
setInterval(createHeart, 900);
updateTimers(); // Первичный вызов для мгновенного отображения данных

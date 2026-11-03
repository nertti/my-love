// ДАТА НАЧАЛА ОТНОШЕНИЙ
const START_DATE = new Date('2022-01-31T00:00:00');

function updateTimers() {
    const now = new Date();
    let diff = now - START_DATE;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

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

    document.getElementById('love-timer').innerHTML =
        `<span>${yearsCount}</span> г. <span>${monthsCount}</span> мес. <span>${daysCount}</span> дн. <span>${hours}</span> ч. <span>${minutes}</span> мин. <span>${seconds}</span> сек.<br><small>(Всего дней: ${days})</small>`;
}

// Открытие скрытой секции
function revealSecret() {
    document.getElementById('secret-block').style.display = 'block';
    document.getElementById('action-btn').style.display = 'none';

    // Проверяем сохраненный статус купонов при открытии шторки
    restoreCouponsState();

    for(let i = 0; i < 20; i++) {
        setTimeout(createHeart, i * 80);
    }
}

// Клик по карточке купона с сохранением состояния
function activateCoupon(card, message) {
    // Используем текст заголовка h4 как уникальный ID купона
    const couponId = card.querySelector('h4').innerText.trim();

    if (!card.classList.contains('activated') && couponId !== "✓ Активирован!") {
        // Записываем в LocalStorage дату и время активации
        const activationTime = new Date().toLocaleString('ru-RU');
        localStorage.setItem(`coupon_${couponId}`, activationTime);

        // Меняем визуальное состояние
        setCardAsActivated(card);

        alert(message + " Выполняю прямо сейчас! ❤️");
    }
}

// Вспомогательная функция для изменения стилей активированной карты
function setCardAsActivated(card) {
    card.classList.add('activated');
    card.style.borderStyle = 'solid';
    card.style.background = '#e2f0d9';
    card.style.borderColor = '#70ad47';
    card.style.cursor = 'default';

    const title = card.querySelector('h4');
    if (title && !title.innerText.includes('✓')) {
        title.innerHTML = "✓ Активирован!";
    }
}

// Восстановление состояния купонов из LocalStorage после перезагрузки страницы
function restoreCouponsState() {
    const cards = document.querySelectorAll('.coupon-card');
    cards.forEach(card => {
        const title = card.querySelector('h4').innerText.trim();
        // Если в базе браузера есть ключ для этого купона — активируем его визуально
        if (localStorage.getItem(`coupon_${title}`)) {
            setCardAsActivated(card);
        }
    });
}

// --- 🛠️ АДМИН-ПАНЕЛЬ ДЛЯ ВАС ---
// Введите в консоли разработчика на её телефоне: checkCoupons()
window.checkCoupons = function() {
    console.log("%c === СПИСОК АКТИВИРОВАННЫХ КУПОНОВ ===", "color: #ff4d6d; font-weight: bold; font-size: 14px;");
    let hasData = false;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('coupon_')) {
            const couponName = key.replace('coupon_', '');
            const time = localStorage.getItem(key);
            console.log(`%c🎁 Купон: "${couponName}" -> Активирован: ${time}`, "color: #2b2d42;");
            hasData = true;
        }
    }

    if (!hasData) {
        console.log("%cПока ни один купон не активирован 🥺", "color: #6c757d; font-style: italic;");
    }
};

// Сброс купонов (на случай тестирования). В консоли: resetCoupons()
window.resetCoupons = function() {
    Object.keys(localStorage)
        .filter(key => key.startsWith('coupon_'))
        .forEach(key => localStorage.removeItem(key));
    console.log("Все купоны успешно сброшены в исходное состояние.");
    location.reload();
};

// Генератор падающих сердечек
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

// Инициализация
setInterval(updateTimers, 1000);
setInterval(createHeart, 900);
updateTimers();

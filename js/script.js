document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    loadPage('home');
});

function loadHeader() {
    fetch('partials/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            document.querySelectorAll('#header nav a').forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    const page = event.target.getAttribute('data-page');
                    loadPage(page);
                });
            });
        })
        .catch(error => console.error('Error loading header:', error));
}

function loadFooter() {
    fetch('partials/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

function loadPage(page) {
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
            if (page === 'home') {
                updateTonPrices();
                updateUsdtPrices();
                updateCurrentDate();
            }
        })
        .catch(error => console.error('Error loading page:', error));
}

async function getTonPrice() {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/the-open-network');
    const data = await response.json();
    return data.market_data.current_price.rub;
}

async function getUsdtPrice() {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=rub');
    const data = await response.json();
    return data.tether.rub;
}

function updateTonPrices() {
    getTonPrice().then(tonPrice => {
        const tonPriceMinus3Percent = (tonPrice * 0.97).toFixed(2);
        const tonPricePlus3Percent = (tonPrice * 1.03).toFixed(2);

        document.getElementById('ton-price-minus-3').textContent = tonPriceMinus3Percent;
        document.getElementById('ton-price-plus-3').textContent = tonPricePlus3Percent;
    });
}

function updateUsdtPrices() {
    getUsdtPrice().then(usdtPrice => {
        const usdtPriceMinus3Percent = (usdtPrice * 0.97).toFixed(2);
        const usdtPricePlus3Percent = (usdtPrice * 1.03).toFixed(2);

        document.getElementById('usdt-price-minus-3').textContent = usdtPriceMinus3Percent;
        document.getElementById('usdt-price-plus-3').textContent = usdtPricePlus3Percent;
    });
}

function updateCurrentDate() {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    document.getElementById('current-date').textContent = currentDate.toLocaleDateString(undefined, options);
}

// Обновляем курсы каждые 5 минут (300000 миллисекунд)
setInterval(updateTonPrices, 300000);
setInterval(updateUsdtPrices, 300000);

// Обновляем дату каждый день
setInterval(updateCurrentDate, 86400000);

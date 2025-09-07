const cryptoList = document.getElementById('crypto-list');
const searchInput = document.getElementById('search');

let cryptocurrencies  = [];


async function fetchCryptos() {
    try{
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false')
        const data = await response.json();
        cryptocurrencies = data;
        displayCrypto(cryptocurrencies);
    } catch (error){
        cryptoList.innerHTML = `<p>Error fetching data</p>`;
        console.log("error =>" , error)
    }
}

function displayCrypto(crypto){
    cryptoList.innerHTML = '';
    crypto.forEach(cry =>{
        let priceClass = cry.price_change_percentage_24h >= 0 ? 'price-up' :'price-down';
        let cryptoItem = document.createElement('div');
        cryptoItem.classList.add('crypto-item');
        cryptoItem.innerHTML = `
        <img src="${cry.image}" alt="${cry.name}" class="image"/>
        <span class="crypto-name">${cry.name}</span>
        <span class="crypto-price ${priceClass}">$ ${cry.current_price}</span>
        `;
        cryptoList.appendChild(cryptoItem)
    })
  
}
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredCryptos = cryptocurrencies.filter(cry =>
        cry.name.toLowerCase().includes(searchTerm)
    );
    displayCrypto(filteredCryptos);
});

fetchCryptos();

setInterval(fetchCryptos , 30000);
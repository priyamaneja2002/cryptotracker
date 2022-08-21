const form = document.querySelector('#searchForm');
const tableResult = document.querySelector('#tableResult');
var update;

form.addEventListener('submit',(e) =>{
    e.preventDefault();
    if(update){
        clearTimeout(update);
    }

    const coinType = form.elements.coinType.value;
    fetchPrice(coinType);
})

const fetchPrice = async (coinType) => {
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${coinType}?currency=INR`);
    console.log(r.data.coin);
    const price = r.data.coin.price;
    const volume = r.data.coin.volume;
    const change = r.data.coin.priceChange1h;
    const base = r.data.coin.name;
    const mcap = r.data.coin.marketCap;
    const symbol = r.data.coin.symbol;

    update = setTimeout(() => fetchPrice(coinType), 10000);
    tableResult.innerHTML = `<tr>
<th>Property</th>
<th>Value</th>
</tr>
<tr>
<td id="coin-name">${base} (${symbol})</td>
<td id="coin-price">Rs. ${price}</td>
</tr>
<tr>
<td>Volume</td>
<td id="coin-volume">${volume}</td>
</tr>
<tr>
<td>Change</td>
<td id="coin-change">${change}</td>
</tr>
<tr>
<td>Market-Cap</td>
<td id="updated-before">${mcap}</td>
</tr>`;
}




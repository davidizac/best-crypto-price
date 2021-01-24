const ccxt = require ('ccxt')
const _ = require('lodash')
const moment = require('moment')
const supportedExchanges = [
'kraken',
'coinbase',
'coinspot',
'binance',
'poloniex',
'bitfinex',
'huobijp',
'yobit',
'liquid',
]
module.exports = async (symbol) => {
  console.log(new Date())
    const tickers = []
    const exchanges = ccxt.exchanges
        .filter (id => supportedExchanges.includes (id))
        .map (id => new ccxt[id] ())

    const worker = async function (exchange) {
      if(!exchange.has['fetchTickers']) return
      try {
        const a = moment()
        const ticker = await exchange.fetchTicker(symbol)
        const b = moment()
        var d = moment.duration(b.diff(a));
        var s = Math.floor(d.asHours()) + moment.utc(b.diff(a)).format(":mm:ss");
        console.log(`${exchange.id} took ${s} seconds`)
        ticker.exchange = exchange.id
        tickers.push(ticker)
      } catch (e) {
        console.log(e.constructor.name, e.message)
      }
    }
    await Promise.all (exchanges.map(worker))
    if(tickers.length === 0) return {}
    const bestExchanges = _.sortBy(tickers, 'ask')
    console.log(new Date())
    return {
      ticker:{
        ask: bestExchanges[0].ask,
        bid: bestExchanges[0].bid,
        exchange: bestExchanges[0].exchange,
      },
      bestExchanges: bestExchanges.map(e => e.exchange).slice(0,3)
    }

}
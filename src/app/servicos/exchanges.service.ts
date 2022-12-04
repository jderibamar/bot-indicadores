import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core' //para que o nosso serviço tenha acesso ao módulo HTTP
import { Funcoes } from './funcoes.service'
import { map } from 'rxjs/operators'
// const stocksExchange = require('stocks-exchange-client').client

const int = '1h' // interval
const s = 'BTCUSDT'

@Injectable()
export class ExchangesService
{
    constructor(private funcS: Funcoes){}

    intervarlo = '1h' // INTERVALOR DE TEMPO GRÁFICO

    async bbBinance() // BANDAS DE BOLLINGER
    {
        let bookTicker = await fetch('https://api.binance.com/api/v3/ticker/bookTicker'),
            tickers = await bookTicker.json(),
            t = tickers,    

            ma = 0, // MÉDIA ARITMÉTICA DO VALOR DE FECHAMENTO DOS CANDLES
            soma = 0,
            fechamento = 0,
            arrFechamentos = [],
            dp = 0, // DESVIO PADRÃO
            bs = 0, // BANDA SUPERIOR
            bi = 0, // BANDA INFERIOR
            k = [], // ARRAY DE CANDLES
            lf: any = [] // LISTA FINAL DE DADOS 
            
            for(let i = 0; i < t.length; i++)
            {
                arrFechamentos = []
                soma = 0

                let symbol = t[i].symbol,
                    kl_api = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${int}&limit=20`)
                    k = await kl_api.json()

                    for(let i = 0; i < k.length; i++)
                    {
                        fechamento = Number(k[i][4])
                        arrFechamentos.push(fechamento)
                        soma += fechamento
                    }

                ma = soma / k.length
                dp = this.calculoDP(arrFechamentos, ma)
                bs = ma + dp * 2
                bi = ma - dp * 2

                // if(t[i].bidPrice > bs)
                //     console.log(t[i].symbol + ' bb superior: ' + bs + ' preço: ' + t[i].bidPrice)
                
                // if(t[i].askPrice < bi)
                //     console.log(t[i].symbol + ' bb inferior: ' + bi + ' DP: ' + dp  + ' preço: ' + t[i].askPrice)

                if(t[i].askPrice > 0.00000000)
                {
                    // console.log(t[i].symbol + ' bb superior: ' + bs + ' preço: ' + t[i].bidPrice)

                    if(t[i].askPrice < bi)
                    {
                        lf.push({ symbol: t[i].symbol, pentrada:  t[i].askPrice }) // pentrada = PONTO DE ENTRADA 
                        // console.log(t[i].symbol + ' bb superior: ' + bs + ' ponto de entrada ')
                    }

                    if(t[i].bidPrice > bs)
                    {
                        lf.push({ symbol: t[i].symbol, psaida: t[i].bidPrice }) // psaida = PONTO DE SAÍDA
                        // console.log(t[i].symbol + ' ponto de saída: '  + bi)
                    }
                       
                }

                // console.log('i -> ' + i)

                // if(i == t.length -1)
                //    console.log('fim do laço dos tickers: ' + i)
                    
            }

            for(let i in lf)
               console.log(lf[i].symbol + ' ' + lf[i].pentrada + lf[i].psaida) 

            

            // ma = soma / k.length
            // dp = this.calculoDP(arrFechamentos, ma)
          
            // bs = ma + dp * 2
            // bi = ma - dp * 2

         return lf   
    }

    // FUNÇÃO PARA CALCULAR O DP (DESVIO PADRÃO) PARA 20 PERÍODOS
    calculoDP(arrFechamentos, ma)
    {
        let arrQuadrados = [],
        maSub = 0,
        somaQuad = 0,
        dp = 0

        // POPULAR ARRAY DOS QUADRADOS
        for(let i in arrFechamentos)
        {
            maSub = arrFechamentos[i] - ma
            arrQuadrados.push(Math.pow(maSub, 2) )

            // console.log(i + ' fechamento -> ' + arrFechamentos[i] + ' -> ' + Math.pow(maSub, 2))
        }

        for(let i = 0; i < arrQuadrados.length; i++)
        {
            if(i < arrQuadrados.length -1)
            {
                let vl1 = arrQuadrados[i],
                    vl2 = arrQuadrados[i + 1]

                somaQuad += vl1 + vl2    
            }
        }

        dp = Math.sqrt(somaQuad / arrQuadrados.length) // CÁLCULO DO DESVIDO PADRÃO
        // console.log('função do DP: ' + dp)

        return dp
    }

    async testeCandle()
    {
        let kl_api = await fetch(`https://api.binance.com/api/v3/klines?symbol=UNFIUSDT&interval=1d&limit=180`),
            k = await kl_api.json()

        for(let i in k)
        {
            let time = new Date(k[i][0]),
            o = k[i][1],
            h = k[i][2],
            l = k[i][3],
            c = k[i][4]

            if(o < c) // ABERTURA TEM QUE SER MENOR QUE O FECHAMENTO 
            {
                let perc = (h - l) / l * 100

                console.log('Percentual -> ' + perc + ' H -> ' + h + ' L -> ' + l + ' Data -> ' + time)
            }
        }
    }
}

// api_info = await fetch('https://api.binance.com/api/v3/exchangeInfo'),
//             s = await api_info.json(),
//             p = s.symbols, // PARES

// if(p[i].status == 'TRADING')
// {
    
// }
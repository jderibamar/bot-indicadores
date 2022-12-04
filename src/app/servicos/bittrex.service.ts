import { Injectable } from '@angular/core'
import { Funcoes } from './funcoes.service'

@Injectable()
export class BittrexService
{
    constructor(private funcS: Funcoes){}

    
    async dados_moedas()
    {
       let dados = await fetch('https://api.bittrex.com/v3/markets'),
           json = await dados.json() 

       return json 
    }
}
const axios = require('axios');

let endpoint    = 'https://etracker.pier8.com.br/pier8v3/rest/info/dashSaida';

export default () => ({

    dashSaida:(user, token) => {

        return new Promise((resolve, reject) => {

            let arrayResult = [];

            axios.get(`${endpoint}/${user}/${token}`)
            .then(function (response) {

                let result = response.data;

                let qtdRecebidosHoje = 0;
                if(result.recebidosHoje != null){
                    for(let a in result.recebidosHoje) {
                        qtdRecebidosHoje = qtdRecebidosHoje + parseInt(a);
                    }
                }

                let qtdAguardandoOd = 0;
                if(result.aguardandoOd != null){
                    for(let a in result.aguardandoOd) {
                        qtdAguardandoOd = qtdAguardandoOd + parseInt(a);
                    }
                }
                
                let qtdAguardandoXml = 0;
                if(result.aguardandoXml != null){
                    for(let a in result.aguardandoXml) {
                        qtdAguardandoXml = qtdAguardandoXml + parseInt(a);
                    }  
                }

                let qtdAguardandoCheckout = 0;
                if(result.aguardandoCheckout != null){
                    for(let a in result.aguardandoCheckout) {
                        qtdAguardandoCheckout = qtdAguardandoCheckout + parseInt(a);
                    }
                }

                let qtdDespachadosHoje = 0;
                if(result.despachadosHoje != null){
                    for(let a in result.despachadosHoje) {
                        qtdDespachadosHoje = qtdDespachadosHoje + parseInt(a);
                    }
                }

                let qtdProntoColeta = 0;
                if(result.prontoColeta != null){
                    for(let a in result.prontoColeta) {
                        qtdProntoColeta = qtdProntoColeta + parseInt(a);
                    }
                }

                let arrayTemp = {
                    qtdRecebidosHoje        :  qtdRecebidosHoje,
                    qtdAguardandoOd         :  qtdAguardandoOd,
                    qtdAguardandoXml        :  qtdAguardandoXml,
                    qtdAguardandoCheckout   :  qtdAguardandoCheckout,
                    qtdDespachadosHoje      :  qtdDespachadosHoje,
                    qtdProntoColeta         :  qtdProntoColeta,
                }
                
                arrayResult.push(arrayTemp);
                resolve(arrayResult);

            })
            .catch(function (error) {
                alert(error);
            })
        });

    },

});
const axios = require('axios');

let endpoint    = 'https://etracker.pier8.com.br/pier8v3/rest/info/login';

export default () => ({

    signin:(email, password) => {

        return new Promise((resolve, reject) => {

            axios.get(`${endpoint}/${email}/${password}`)
            .then(function (response) {

                let result = response.data;

                if(!result.token){
                    let json = {
                        error: 'E-mail ou senha incorretos. Tente novamente.'
                    };
                    resolve(json); 
                }else{

                    let json = {
                        error: '',
                        token: result.token,
                        email: email
                    };
                    resolve(json);   
                
                }

            })
            .catch(function (error) {
                alert(error);
            })
        })

    },

});
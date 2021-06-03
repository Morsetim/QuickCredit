// const getElemenByIdValue = (field) => document.getElementById(field).value;


const signUp = (e) => {
    document.getElementById('signup-loading').style.display = 'block';

    e.preventDefault();

    const userData = {
        firstName : document.getElementById('firstname').value,
        lastName : document.getElementById('lastname').value,
        homeAddress : document.getElementById('homeaddress').value,
        workAddress : document.getElementById('workaddress').value,
        email : document.getElementById('email').value,
        password : document.getElementById('password').value
    };
    const option = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(userData)
    };

   return fetch('http://localhost:4000/api/v1/auth/signup', option)
    .then(res => res.json())
    .then(data => {
        if(data.status == 201){
            localStorage.setItem('user token', data.token);
            localStorage.setItem('Verification', data.data.status);
            location.replace('./dashboard.html');
        console.log(data,'-----------------------------------data------------------------')
        }
    }).catch(e => console.log(e.response));
}



document.getElementById('signup-form').addEventListener('submit', signUp, false)
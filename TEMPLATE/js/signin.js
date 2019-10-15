const getElementByIdValue = (field) => document.getElementById(field).value;


const signin = (e) => {
    document.getElementById('signin-loading').style.display = 'block'

    e.preventDefault();

    const userData = {
        email : getElementByIdValue('email'),
        password : getElementByIdValue('password')
    };

    const option = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(userData)
    };

    return fetch('http://localhost:4000/api/v1/auth/signin', option)
        .then(res => res.json())
        .then(data => {
            if(data.status == 'Success'){
                localStorage.setItem('user_token', data.token);
                location.replace('./dashboard.html');
            }
        }).catch(e => console.log(e.response));
}

document.getElementById('signin-form').addEventListener('submit', signin, false);
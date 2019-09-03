const signUp = (e) =>{
    e.preventDefault();

    const obj = {
        firstname : document.getElementById('firstname').value,
        lastname : document.getElementById('lastname').value,
        homeaddress : document.getElementById('homeaddress').value,
        workaddress : document.getElementById('workaddress').value,
        email : document.getElementById('email').value,
        password : document.getElementById('password').value
    };
    const option = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(obj)
    };
    fetch('localhost:4000/api/v1/auth/signup', option)
    .then(res => res.json())
    .then(data)
}
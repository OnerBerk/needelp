const axios = require('axios');
// import axios from "axios";

const firstname = 'Automatic testing';
const lastname = 'Automatic testing';
const email = 'Automatic@testing.com';
const password = 'testing';
const address = '1 avenue Test';
const phone = '01 23 45 67 89';
const newfirstname = 'New Automatic testing';
const newlastname = 'New Automatic testing';
const newemail = 'New Automatic@testing.com';
const newpassword = 'New testing';
const newaddress = 'New 1 avenue Test';
const newphone = 'New 01 23 45 67 89';
let token = '';

// login admin to pass admin auth middleware
axios.post('http://localhost:8080/login', {
email: 'admin@admin.admin',
password: 'admin'
})
.then(function (response) {
    // keeping admin token to pass the admin auth middleware
    token = response.data['token']
    // Test of the register route
    axios.post('http://localhost:8080/register', {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
    address: address,
    phone: phone
})
.then(function (response) {
    console.log('user register tested')
    // Test of the login route
    axios.post('http://localhost:8080/login', {
    email: email,
    password: password
})
.then(function (response) {
    // Test of the admin route to get all users
    const headers = { 'authorization': token }
    axios.get("http://localhost:8080/admin/users", { headers: headers })
    .then((response) => {
        // Test of the route to get a specific user
        axios.post('http://localhost:8080/admin/users/settings/:userId', data, {headers: headers})
        .then(res => {
            // Updating user profile as admin
            axios.post('http://localhost:8080/admin/users/settings/:userId', data, {headers: headers})
            .then(res => {
                // Deleting user as admin
            })
        })
        .catch((err) => {
            console.log('admin update users '+err);
        })


        })
        .catch((err) => {
            console.log('admin get specific users '+err);
        })
        
        
    })
    .catch((err) => {
        console.log('admin get all users '+err);
    })
})
.catch(function (error) {
    console.log('user login failed '+error)
});
})
.catch(function (error) {
    console.log('user creation failed '+error)
});
})
.catch(function (error) {
    console.log('admin login failed '+error)
});





// login admin to pass admin auth middleware
axios.post('http://localhost:8080/login', {
email: email,
password: password
})
.then(function (response) {
    // keeping admin token to pass the admin auth middleware
    token = response.data['token']
    // Test of the register route
    axios.post('http://localhost:8080/register', {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
    address: address,
    phone: phone
})
.then(function (response) {
    console.log('user register tested')
    // Test of the login route
    axios.post('http://localhost:8080/login', {
    email: email,
    password: password
})
.then(function (response) {
    console.log('user login tested')
    // keeping token to test next routes
    token = response.data['token']
    //testing the get settings route
    const headers = {'authorization': token}
    axios.get('http://localhost:8080/settings', {headers: headers})
    .then(res => {
        console.log('settings get tested')
        // Testing the post settings route
        let data = {
            firstname: newfirstname,
            lastname: newlastname,
            email: newemail,
            address: newaddress,
            phone: newphone,
            password: newpassword
        }
        axios.post('http://localhost:8080/settings', data, {headers: headers})
        .then(res => {
            console.log('settings post tested')
            // Testing the delete settings route
            
            let user = {
                email: newemail,
                password: newpassword
            };
            
            axios.post('http://localhost:8080/login', {
            email: newemail,
            password: newpassword
        })
        .then( (res, err) =>{
            if(res.status===200){
                axios.delete('http://localhost:8080/settings', {headers: headers})
                .then(res => {
                    console.log('settings delete tested')
                })
            }
        })
    })
})
.catch(error => console.log(error));

})
.catch(function (error) {
    
});
})
.catch(function (error) {
    console.log('ça marche pas'+error);
});
})
.catch(function (error) {
    
});
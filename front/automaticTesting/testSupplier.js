const axios = require('axios');
// import axios from "axios";

const firstname = 'Automatic testing'
const lastname = 'Automatic testing'
const email = 'Automatic@testing.com'
const password = 'testing'
const address = '1 avenue Test'
const phone = '01 23 45 67 89'
const particulier = "Non"
const supplier = "Oui"
const siret = "12345678912345"
const zip = "75001"
const city = "Paris"
const expertise = "Peinture"
const service = "Peintre"
const newfirstname = 'New Automatic testing'
const newlastname = 'New Automatic testing'
const newemail = 'NewAutomatic@testing.com'
const newpassword = 'Newtesting'
const newaddress = 'New 1 avenue Test'
const newphone = 'New 01 23 45 67 89'
const newparticulier = "Oui"
const newsupplier = "Non"
const newsiret = "000000000000000"
const newzip = "93170"
const newcity = "Bagnolet"
const newexpertise = "Plomberie"
const newservice = "Plombier"

let token = '';

// Test of the register route
axios.post('http://localhost:8080/supplierRegister', {
firstname: firstname,
lastname: lastname,
email: email,
password: password,
address: address,
phone: phone,
particulier : particulier,
supplier : supplier,
siret : siret,
zip : zip,
city : city,
expertise : expertise,
service : service
})
.then(function (res, err) {
    console.log('Supplier created')
    // Test of the login route
    axios.post('http://localhost:8080/supplierLogin', { email: email, password: password })
    .then(function (res) {
        console.log('supplier logged in')
        // keeping token to test next routes
        token = res.data['token']
        //testing the get settings route
        const headers = {'authorization': token}
        axios.get('http://localhost:8080/settings/profile', { headers: headers })
        .then((res, err) => {
            console.log('Supplier info obtained')
            // Testing the post settings route
            let data = {
                firstname: newfirstname,
                lastname: newlastname,
                email: newemail,
                address: newaddress,
                phone: newphone,
                password: newpassword,
                address: newaddress,
                phone: newphone,
                particulier : newparticulier,
                supplier : newsupplier,
                siret : newsiret,
                zip : newzip,
                city : newcity,
                expertise : newexpertise,
                service : newservice
            }
            axios.post('http://localhost:8080/settings/suppliers', data, {headers: headers})
            .then((res, err) => {
                // Testing the delete settings route
                console.log('Supplier updated')
                axios.post('http://localhost:8080/supplierLogin', { email: newemail, password: newpassword })
                .then( (res, err) =>{
                    console.log('Supplier logged in')
                    axios.delete('http://localhost:8080/settings/suppliers', { headers: headers })
                    .then((res, err) => {
                        console.log('Supplier deleted')
                    })
                    .catch( function (err) {
                        console.log('Supplier profile deletion failed '+err);
                    })
                })
                .catch(function (err) {
                    console.log('Supplier updated profile login failed '+err);
                })
            })
            .catch(function (err) {
                console.log('Supplier profile update failed '+err);
            })
        })
        .catch(function (err) {
            console.log('Supplier profile get failed '+err);
        })
    })
    .catch(function (err) {
        console.log('Supplier login failed '+err);
    })
})
.catch(function (err) {
    console.log('Supplier register failed '+err);
})
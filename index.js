const { name } = require('ejs');
const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// middleware1
// app.use(function (req,res,next) {
//     console.log('middleware 1 is called');
//     next();
// });

// middleware2
// app.use(function (req,res,next) {
//     console.log('middleware 2 is called');
//     next();
// });


var contactList = [
    {
        name: 'rohan',
        phone: '4353534657'
    },
    {
        name: 'sikha',
        phone: '9839877653'
    },
    {
        name: 'sanak',
        phone: '2722409765'
    }
];

app.get('/', function (req,res) {
    // console.log(req);
    // console.log(__dirname);
    // res.end('<h1>Thank god its running</h1>');

    // return res.render('home',{
    //     title: "contact list",
    //     contact_list: contactList
    // });

    Contact.find({}, function(err,contacts) {
        
        if (err) {
            console.log('error in fetching contact!');
            return;
        }

        return res.render('home',{
            title: "contact list",
            contact_list: contacts
        });
    })

});


app.get('/practice', function (req,res) {
    return res.render('practice',{ 
        title: "practice hard"
    });
});


app.post('/create-contact', function(req,res) {
    // console.log(req);
    // return res.redirect('/practice');

    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);

    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // })
    // return res.redirect('/');

    // Or

    // contactList.push(req.body);
    // return res.redirect('back');

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact) {
        if(err){
            console.log('error in creating new contact!');
            return;
        }

        console.log('********', newContact);
        return res.redirect('back');
    })
});


app.get('/delete-contact/', function (req,res) {
    // console.log(req.query);
    // let phone = req.query.phone;

    // let contactIndex = contactList.findIndex(contact=>contact.phone==phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }

    // return res.redirect('back');

    // get the id from query in the url
    let id = req.query.id;

    // find the contact in the database and delete it 
    Contact.findByIdAndDelete(id,function(err){
        if (err) {
            console.log('error in deleting object from database');
            return;
        }
            
        return res.redirect('back');
    })
});


app.listen(port, function (err) {
    if (err) {
        console.log('error is running in the server',err);
    }

    console.log('my express server is running on port', port);
});
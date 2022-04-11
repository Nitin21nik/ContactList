const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose')
const Contact=require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());//middleware to parse the form data(string) into key-value pairs
app.use(express.static('assets'));

//middleware 1
/*app.use(function(req,res,next)
{
   req.myName="Arpan";
  console.log("middleware 1 called");
  next();
});

//middleware 2
app.use(function(req,res,next)
{
    console.log("My name from Mw2",req.myName);
  console.log("middleware 2 called");
  next();
});*/

var contactList=[
    {
        name:"Arpan",
        phone:"1111111111"
    },
    {
        name:"Tony Stark",
        phone:"1234567890"
    },
    {
        name:"Nitin",
        phone:"9910996751"
    }
]



app.get('/',function(req,res)
{
   // console.log(req);
  // console.log(__dirname);
    //res.send('<h1>Cool,It is running or is it?</h1>');
   // console.log(req.myName);


    Contact.find({},function(err,contacts)
    {
        if(err)
        {
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home',{
            title:"My Contact List",
            contact_list:contacts
        });
    });

   /* return res.render('home',{
      title:"My Contact List",
      contact_list:contactList
  });*/
});

app.post('/create-contact',function(req,res)
{
    //return res.redirect('/practice');
  /*  contactList.push({
        name:req.body.name,
        phone:req.body.phone
    });*/
  //  contactList.push(req.body);
  
      Contact.create({
         name:req.body.name,
         phone:req.body.phone
      },function(err,newContact)
      {
          if(err)
          {
              console.log('error in creating a contact!');
              return;
          }

           console.log('*******',newContact);
           return  res.redirect('back');
      });

    //return res.redirect('/');
   // return res.redirect('back');
});

//for deleting a contact
app.get('/delete-contact',function(req,res)
{
    //get the id from query in the url
    let id=req.query.id;

    //find the contact in the database using id and delete it
Contact.findByIdAndDelete(id,function(err)
{
    if(err)
    {
        console.log('error in deleting an object from database');
        return;
    }

    return res.redirect('back');
});
   // console.log(req.params);
  /* console.log(req.query);//get the query from requested url
    let phone=req.query.phone;
    let contactIndex=contactList.findIndex(contact=>contact.phone==phone);

    if(contactIndex!=-1)
    {
        contactList.splice(contactIndex,1);
    }

    return res.redirect('back');*/
});


app.get('/practice',function(req,res)
{
   return res.render('practice',{
       title:"let us play with Ejs"
   });
});


app.listen(port,function(err)
{
   if(err)
   {
       console.log('error',err);
   }
   console.log('express server is running on port:',port);
});
const express = require('express');
const request = express('request');
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
//this code is for using body-parser
app.use(bodyParser.urlencoded({ extended: true }));
//this is to use css and images files from the local 
app.use(express.static("public"))

app.get('/', function(req,res){
    res.sendFile(__dirname + "/signup.html");


})

app.post("/", function(req, res){
    const fname = req.body.firstName;
    const lname =  req.body.lastName;
    const email = req.body.emailid
    // console.log(fname, lname, email);
    // res.send(fname, lname, email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME : fname,
                    LNAME : lname
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us11.api.mailchimp.com/3.0/lists/62ac9c45c5"
    const options = {
        method: "POST",
        auth: "om1:9839cccf0e61e961a9698276100fe09f-us11"
    }
    const request= https.request(url, options, function(response){
        
        if(response.statusCode  === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData) //here we are passing the data to the 
    //mailchimp server about fname lname and email
    request.end();
})



app.post("/failure.html", function(req, res){
    res.redirect("/")
})





app.listen(process.env.PORT || 4000, function(){
    console.log("Server 4000 is running");
})


// 9839cccf0e61e961a9698276100fe09f-us11
//audience id : 62ac9c45c5
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";







const app = express();
const apiKey = "live_6E4QvkkZNGjZ3awaXUClXfPihs37pS1zsmFELkrf9Sb8IMCOPArGF6BcQjxc4Qn4"


app.use(bodyParser.urlencoded({extended: true}));



app.use("/dist",express.static("./node_modules/bootstrap/dist"));

app.get("/", async (req,res)=> {
try {
    
    const response =  await axios.get("https://api.thecatapi.com/v1/images/search?limit=9&breed_ids=beng&api_key="+apiKey);

    const result =  response.data;

    console.log(result[1].breeds[0].description);

    res.render("index.ejs", {

        results : result
    });



} catch (error) {
    res.status(500);
}





    
})



app.post("/submit", async (req,res)=> {
    
    const id = req.body.id;

    try {
    
        const response =  await axios.get("https://api.thecatapi.com/v1/images/"+id);
    
        const result =  response.data;

    
        console.log(result);
    
        res.render("cat.ejs", {
          results : result
           
        });
    
    
    
    } catch (error) {
        res.status(500);
    }


    
});




app.listen("3000", ()=> {

    console.log("Server is live on 3000 port");
})
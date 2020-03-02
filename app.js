const express = require('express')
const db = require ('./db')
const app = express()
const port = 3000
const cors = require('cors')

app.use(express.json())

app.get('/', (req, res) => res.send('Welcome to my database api'))

app.get('/api/:db', cors(), function(req,res){
	switch(req.params.db) {
	  case "furniture-list":
	    db.query('SELECT * FROM furniture_list', (error, results) => {
		    if (error) {
		      throw error
		    }
		    const query_array = results.rows;
		    const furniture_styles_array = [];
		    for(i=0; i < query_array.length; i++){
		    	var current_style = query_array[i].furniture_style;
		    	for(j=0; j < current_style.length; j++){	    		
		    		if(furniture_styles_array.indexOf(current_style[j]) < 0){
		    			furniture_styles_array.push(current_style[j]);
		    		}
		    	}
		    }
		    res.status(200).send({"furniture_styles": furniture_styles_array,
		    					  "products": results.rows});
		  })
	    break;
	  default:
	    res.status(404).send('The database ' + req.params.db + ' is not found!')
	}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const express = require('express');
const app = express();
const port = 8000;

// Use express router
app.use('/', require('./routes'));

// Set up view Engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running ${err}`);
    }

    console.log(`Server is up and running on port: ${port}`);
});

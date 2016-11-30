let express = require('express');
let app = express();

/*
app.get('/', (req, res) => {
    res.sendfile('index.html');
});
*/

app.use(express.static(__dirname + '/public'));
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));


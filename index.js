require('dotenv').config();
const server = require('./src/app');
const { conn } =require('./src/db');

// ###### FUNCTION TO TEST CONNECTION WITH DATABASE ###### 
// const testdb = async () => {try {
//     await conn.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }
// testdb()


const PORT = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
        console.log(`Server in port ${PORT}`);
    });
})
.catch((error) => console.log(error));
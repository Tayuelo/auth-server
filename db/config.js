const mongoose = require("mongoose");

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('Base de datos online');
    } catch (error) {
        console.error(error);
        throw new Error('Error en la conexión de la base de datos');
    }
}

module.exports = {
    dbConnection
}
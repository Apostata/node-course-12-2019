import Sequelize from 'sequelize';

const sequelize = new Sequelize('nodesql', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'   
}); //cria o pool de conexões do SQL

export default sequelize;
import Sequelize from 'sequelize';
import db from '../util/database';

const OrderItem = db.define('orderItem',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity:{
        type: Sequelize.INTEGER
    }
});

export default OrderItem;
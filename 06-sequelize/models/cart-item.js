import Sequelize from 'sequelize';
import db from '../util/database';

const CartItem = db.define('cartItem',{
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

export default CartItem;
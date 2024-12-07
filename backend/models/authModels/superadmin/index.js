const pool = require('@/config/dbConfig');

class SuperAdminAuthModel {
    constructor(name, contact, email, hashpassword) {
        this.name = name;
        this.contact = contact;
        this.email = email;
        this.hashpassword = hashpassword;
    }

    // Insert a new uer
    static async create(
        name,
        email,
        contact,
        hashpassword
    ) {
        try {
            const connPool = await pool.getConnection();
            const queryOne = `INSERT INTO super_admin (su_name, su_contact) VALUES(?, ?)`;
            await connPool.beginTransaction();
            const [dbresponseOne] = await connPool.query(queryOne, [name, contact]);

            if (dbresponseOne) {
                const queryTwo = `INSERT INTO super_admin_auth (su_r_id, su_email, su_password) VALUES(?, ?, ?)`;
                const [dbresponseTwo] = await connPool.query(queryTwo, [dbresponseOne.insertId, email, hashpassword]);

                if (dbresponseTwo?.affectedRows) {
                    await connPool.commit();
                    return { status: true, dbresponseTwo, msg: 'Successfully inserted!' };
                } else {
                    await connPool.rollback();
                    return { status: false, msg: 'Something went wrong!' };
                }

            }
        } catch (error) {
            await connPool.rollback();
            console.error('Transaction rolled back due to error:', error);
        } finally {
            connPool.release();
        }
    }

    // Retrieve all users
    static async findAll() {
        const selectUsersSQL = 'SELECT * FROM users';
        try {
            const [rows] = await promisePool.query(selectUsersSQL);
            return rows.map((row) => new User(row.id, row.first_name, row.last_name, row.email));
        } catch (error) {
            console.error('Error retrieving users:', error);
        }
    }

    // Retrieve a user by ID
    static async findOne(id) {
        const selectUserSQL = 'SELECT * FROM users WHERE id = ?';
        try {
            const [rows] = await promisePool.query(selectUserSQL, [id]);
            if (rows.length > 0) {
                const { firstName, lastName, email } = rows[0];
                return new User(id, firstName, lastName, email);
            }
            return null;
        } catch (error) {
            console.error(`Error retrieving user with ID ${id}:`, error);
        }
    }

    // Update a user's details
    async update() {
        const updateUserSQL = `
          UPDATE users 
          SET first_name = ?, last_name = ?, email = ?
          WHERE id = ?;
        `;
        try {
            await promisePool.query(updateUserSQL, [this.firstName, this.lastName, this.email, this.id]);
            console.log(`User with ID ${this.id} updated successfully.`);
        } catch (error) {
            console.error(`Error updating user with ID ${this.id}:`, error);
        }
    }

    // Delete a user by ID
    static async deleteOne(id) {
        const deleteUserSQL = 'DELETE FROM users WHERE id = ?';
        try {
            await promisePool.query(deleteUserSQL, [id]);
            console.log(`User with ID ${id} deleted successfully.`);
        } catch (error) {
            console.error(`Error deleting user with ID ${id}:`, error);
        }
    }
}


module.exports = SuperAdminAuthModel;
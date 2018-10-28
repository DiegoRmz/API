module.exports = class UserController{
    constructor(connectionPool){
        this.connectionPool = connectionPool;
    }

    getUser(request, response){
        const getUsrSQL = `SELECT email, userName FROM users WHERE email = ? AND pswd = ?`;
        const params    = [request.body.email,request.body.pswd];
        
        this.connectionPool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                conn.release();
                response.status(500).send(errn.message);
            }

            conn.query(getUsrSQL,params, (errn, rows)=>{
                if(errn){
                    console.log(errn);
                    conn.release();
                    response.status(500).send(errn.message);
                }

                else{
                    conn.release();
                    console.log(rows);
                    response.status(200).json(rows);
                }
            })
        })
    }
}
module.exports = class AircraftController{
    constructor(connectionPool){
        this.connectionPool = connectionPool;
    }

    createAircraft(request, response){
        const insertSQL = `INSERT INTO aircraft (id,model,
                            producer,currentStatus,pilot) 
                            VALUES(?,?,?,?,?)`;
        const data = [request.body];

        this.connectionPool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                conn.release();
                response.status(500).send(err.message);
            }

            conn.query(insertSQL,data, (errn,res)=>{
                if(errn){
                    console.log(errn);
                    conn.release();
                    response.status(500).send(errn.message);
                }
                else{
                    conn.release();
                    response.status(200).send(res);
                }
            });
        })
    }

    createAircrafts(request, response){
        const insertSQL = `INSERT INTO aircraft (id,model,
                            producer,currentStatus,pilot) 
                            VALUES ?`;
        const data = [request.body];
    
        console.log("______________________________________________");
        
        console.log(request);
        
        console.log(data);
        console.log("______________________________________________");
        

        this.connectionPool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                conn.release();
                response.status(500).send(err.message);
            }

            conn.query(insertSQL,data, (errn,res)=>{
                if(errn){
                    console.log(errn);
                    conn.release();
                    response.status(500).send(errn.message);
                }
                else{
                    conn.release();
                    response.status(200).send(res);
                }
            });
        })
    }

    updateAircraft(request, response){
        const updateSQL = `UPDATE aircraft SET 
                            model=?,producer=?,currentStatus=?,pilot=?
                            WHERE id=?`;
        const params = [request.body.model,request.body.producer,request.body.currentStatus,
                        request.body.pilot, request.body.id];

        
        this.connectionPool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                conn.release();
                response.status(500).send(err.message);
            }

            conn.query(updateSQL,params, (errn,res)=>{
                if(errn){
                    console.log(errn);
                    conn.release();
                    response.status(500).send(errn.message);
                }
                else{
                    conn.release();
                    response.status(200).send(res);
                }
            });
        })
    }

    deleteAircraft(request, response){
        const deleteSQL = `DELETE FROM AIRCRAFT WHERE id=?`;
        const params = [request.body.id];

        
        this.connectionPool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                conn.release();
                response.status(500).send(err.message);
            }

            conn.query(deleteSQL,params, (errn,res)=>{
                if(errn){
                    console.log(errn);
                    conn.release();
                    response.status(500).send(errn.message);
                }
                else{
                    conn.release();
                    response.status(200).send(res);
                }
            });
        })
    }

    getAircraft(request,response){
        const getAircraftSQL = "SELECT * FROM aircraft"
        
        this.connectionPool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                conn.release();
                response.status(500).send(errn.message);
            }

            conn.query(getAircraftSQL,(errn,rows)=>{
                if(errn){
                    console.log(errn);
                    conn.release();
                    response.status(500).send(errn.message);
                }
                else{
                    conn.release();
                    response.status(200).json(rows);
                }
            })
        })
    }
}
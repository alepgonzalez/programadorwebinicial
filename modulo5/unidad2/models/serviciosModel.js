var pool = require('./bd');

// obtener servicios
async function getServicios(){
    var query = 'select * from servicios';
    var rows = await pool.query(query);

    return rows;
}

// eliminar servicio por id
async function deleteServicioById(id){
    var query = 'delete from servicios where id = ?';
    var rows = await pool.query(query, [id]);

    return rows;
}

// insertar nuevo servicio
async function insertServicio(obj){
    try{
        var query = 'insert into servicios set ?';
        var rows = await pool.query(query, [obj]);

        return rows;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

// obtener servicio por id
async function getServicioById(id){
    var query = 'select * from servicios where id = ?';
    var rows = await pool.query(query, [id]);

    return rows[0];
}

//modificar un servicio por id
async function updateServicioById(obj, id){
    try{
        var query = 'update servicios set ? where id = ?';
        var rows = await pool.query(query, [obj, id]);

        return rows;
    }
    catch(error){
        throw error;
    }
}

module.exports = { getServicios, deleteServicioById, insertServicio, getServicioById, updateServicioById }
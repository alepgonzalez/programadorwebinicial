var pool = require('./bd');

// listar servicios
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

module.exports = { getServicios, deleteServicioById }
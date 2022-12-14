const modelsCliente = {
    queryGetCliente: "SELECT * FROM Cliente",
    queryGetClienteByID:`SELECT * FROM Cliente WHERE ID = ?`,
    queryDeleteClienteByID: `UPDATE Cliente SET Activo = 'N' WHERE ID = ?`,
    queryClienteExists: `SELECT Nombre_Cliente FROM Cliente WHERE Nombre_Cliente = ?`,
    queryAddClien:
    `INSERT INTO Cliente
        (Nombre_Cliente,
        Apellidos_Cliente,
        Edad, 
        Genero,  
        Ciudad_Cliente,
        Calle_Cliente,
        Num_Telefonico, 
        Activo )
        VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?)`,
    
    }
    
    
    module.exports = modelsCliente

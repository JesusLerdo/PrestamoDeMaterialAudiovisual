const modelsPrestamos = {
    queryGetPrestamos: "SELECT * FROM Prestamos",
    queryGetPrestamosByID:`SELECT * FROM Prestamos WHERE ID = ?`,
    queryDeletePrestamosByID: `UPDATE Prestamos SET Activo = 'N' WHERE ID = ?`,
    queryPrestamosExists: `SELECT Tipo_De_Material_Audiovisual FROM Prestamos WHERE Tipo_De_Material_Audiovisual = ?`,
    queryAddPrest:
    `INSERT INTO Prestamos
        (Tipo_De_Material_Audiovisual,
        MARCA,
        Numero_Prestamo, 
        F_Solicitud,  
        F_Entrega,
        Importe_Pagar, 
        Activo )
        VALUES (
        ?, ?, ?, ?, ?, ?, ?)`,
    
    }
    
    
    module.exports = modelsPrestamos

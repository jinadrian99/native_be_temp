const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into DONDATPHONG VALUES(?,?,?,?,?,?,?,?)`,
            [
                null,
                data.ngayDen,
                data.ngayDi,
                data.soDem,
                data.ngayDatPhong,
                data.tongThanhTien,
                data.trangThaiDat,
                data.idKHD
            ],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result.insertId);
            }
        )
    },
    getAll: (cb) => {
        pool.query(
            `select * from DONDATPHONG`,
            [],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    getDataByID: (id, cb) => {
        pool.query(
            `select * from DONDATPHONG where idDDP = ?`,
            [id],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    getTotalMoneyBookingByQuarterly: (quarter, year, cb) => {
        pool.query(
            ` SELECT SUM(tongThanhTien) AS tongThanhTien FROM DONDATPHONG WHERE QUARTER(ngayDatPhong) = ? and YEAR(ngayDatPhong) = ?`,
            [
                quarter,
                year
            ],
            (error, result)=>{
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    updateData: (id, data, cb) => {
        pool.query(
            `update DONDATPHONG set
                ngayDen = ?,
                ngayDi = ?,
                soDem = ?,
                ngayDatPhong = ?,
                tongThanhTien = ?,
                trangThaiDat = ?,
                idKHD = ?,
            where idDDP = ?`,
            [
                data.ngayDen,
                data.ngayDi,
                data.soDem,
                data.ngayDatPhong,
                data.tongThanhTien,
                data.trangThaiDat,
                data.idKHD,
                id
            ],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result.insertId);
            }
        )
    },
    deleteData: (id, callBack) => {
        pool.query(
            `delete from DONDATPHONG where idDDP = ?`,
            [id],
            (error, result) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, result); 
            }
        )
    }
};
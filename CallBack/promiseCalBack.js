const express = require('express');
const router = express.Router();
const sql = require('mssql');

const sqlConfiguration = require('../SQLServer/configuration');

router.get('/promiseCallBack', function (req, res) {

    console.log('promiseCallBack Started');

    sql.connect(sqlConfiguration.sqlConnectionString)
        .then(() => {

            return sql.query(`SELECT top 1 * FROM [KAS].[dbo].[PuTr_IN_Det] 
            Left outer join [dbo].[PuTr_IN_Hdr] on [PuTr_IN_Det].IN_Det_Ref=[PuTr_IN_Hdr].IN_Hdr_Ref
            where [IN_Det_Ref] in (SELECT distinct top 10000 [IN_Det_Ref] FROM [KAS].[dbo].[PuTr_IN_Det]
            Left outer join [dbo].[PuTr_IN_Hdr] on [PuTr_IN_Det].IN_Det_Ref=[PuTr_IN_Hdr].IN_Hdr_Ref) 
            --order by IN_Det_Itm_Desc desc`)

            // Parameterized sql query
            // return pool.request()
            // .input('input_parameter', sql.Int, value)
            // .query('select * from mytable where id = @input_parameter')


            // Stored procedure
            // return pool.request()
            // .input('input_parameter', sql.Int, value)
            // .output('output_parameter', sql.VarChar(50))
            // .execute('procedure_name')

            //ES6 Tagged template literals
            //return sql.query`select * from mytable where id = ${value}`
            
        }).then(result => {
            res.send(result);
        }).catch(err => {
            console.log('error :' + err);
        })

    console.log('promiseCallBack request completed');
});

module.exports = router;
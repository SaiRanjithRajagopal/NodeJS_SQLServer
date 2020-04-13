const express = require('express');
const router = express.Router();
const sql = require('mssql');

const sqlConfiguration = require('../SQLServer/configuration');


router.get('/slowRunningQuery', function (req, res) {

    console.log('slowRunningQuery Started');

    async function asyncCallback() {
        try {

            let pool = await sql.connect(sqlConfiguration.sqlConnectionString)

            let result = await pool.request()
                .query(`SELECT top 1 * FROM [KAS].[dbo].[PuTr_IN_Det] 
                Left outer join [dbo].[PuTr_IN_Hdr] on [PuTr_IN_Det].IN_Det_Ref=[PuTr_IN_Hdr].IN_Hdr_Ref
                where [IN_Det_Ref] in (SELECT distinct top 10000 [IN_Det_Ref] FROM [KAS].[dbo].[PuTr_IN_Det]
                Left outer join [dbo].[PuTr_IN_Hdr] on [PuTr_IN_Det].IN_Det_Ref=[PuTr_IN_Hdr].IN_Hdr_Ref) 
                order by IN_Det_Itm_Desc desc`)

            // // Parameterized sql query    
            // let result = await pool.request()
            //     .input('input_parameter', sql.Int, value)
            //     .query('select * from mytable where id = @input_parameter')

            // // Stored procedure
            // let result = await pool.request()
            //     .input('input_parameter', sql.Int, value)
            //     .output('output_parameter', sql.VarChar(50))
            //     .execute('procedure_name')

            

            res.send(result);
        }
        catch (err) {
            console.log('error :' + err);
        }
    }

    asyncCallback();

    console.log('awaitCallBack request completed');
});

router.get('/fastRunningQuery', function (req, res) {

    console.log('fastRunningQuery Started');

    async function asyncCallback() {
        try {

            let pool = await sql.connect(sqlConfiguration.sqlConnectionString)
            let result = await pool.request()
                .query(`SELECT top 1 * FROM [KAS].[dbo].[PuTr_IN_Det] 
                Left outer join [dbo].[PuTr_IN_Hdr] on [PuTr_IN_Det].IN_Det_Ref=[PuTr_IN_Hdr].IN_Hdr_Ref
                where [IN_Det_Ref] in (SELECT distinct top 10000 [IN_Det_Ref] FROM [KAS].[dbo].[PuTr_IN_Det]
                Left outer join [dbo].[PuTr_IN_Hdr] on [PuTr_IN_Det].IN_Det_Ref=[PuTr_IN_Hdr].IN_Hdr_Ref) 
                --order by IN_Det_Itm_Desc desc`)

            res.send(result);

        }
        catch (err) {
            console.log('error :' + err);
        }
    }

    asyncCallback();

    console.log('awaitCallBack request completed');
});

module.exports = router;
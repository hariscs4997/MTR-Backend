import { config } from "../../../config/dbconfig"
import sql from "mssql/msnodesqlv8";

const sqlService: any = sql

interface IAnalyticsService {
    getStatisticsOverallandValidationData(): any;
}

class AnalyticsService implements IAnalyticsService {
    public async getStatisticsOverallandValidationData() {
        try {
            const pool = await sqlService.connect(config);
            const dataTag = await pool.request().query(
                `SELECT count (*)
            FROM [dbo].[data_Tag]`
            );
            const dataAsset = await pool.request().query(
                `SELECT count (*)
            FROM [dbo].[data_Asset]`
            );
            const dataModel = await pool.request().query(
                `SELECT count (*)
            FROM [dbo].[data_Model]`
            );
            const dataTagValidationErrorValidStatus = await pool.request().query(
                `select  cast(round((100.0 / NULLIF(count (*),0)) * (select count(*) FROM dbo.data_tag  where [Validation Status] = 'VALID'),0,0) as numeric(36,0))
                FROM dbo.data_tag
                where [Validation Status] in ('VALIDATIONERROR', 'VALID')`
            );
            const dataTagValidationValidStatus = await pool.request().query(
                `SELECT  count([Validation Status])
                FROM dbo.data_tag
                where [Validation Status] = 'VALID'
                group by [Validation Status]`
            );
            const dataTagValidationErrorStatus = await pool.request().query(
                `SELECT  count([Validation Status])
                FROM dbo.data_tag
                where [Validation Status] = 'VALIDATIONERROR'
                group by [Validation Status]`
            );
            const dataTagValidationUnvalidStatus = await pool
                .request()
                .query(
                    `Select count(*) from dbo.data_Tag where [VALIDATION STATUS] is NULL`
                );
            const dataAssetValidationErrorValidStatus = await pool.request().query(
                `select  cast(round((100.0 / NULLIF(count (*),0)) * (select count(*) FROM dbo.data_asset where [Validation Status] = 'VALID'),0,0) as numeric(36,0))
                    FROM dbo.data_asset
                    where [Validation Status] in ('VALIDATIONERROR', 'VALID')`
            );
            const dataAssetValidationValidStatus = await pool.request().query(
                `SELECT  count([Validation Status])
                FROM dbo.data_asset
                where [Validation Status] = 'VALID'
                group by [Validation Status]`
            );
            const dataAssetValidationErrorStatus = await pool.request().query(
                `SELECT  count([Validation Status])
                FROM dbo.data_asset
                where [Validation Status] = 'VALIDATIONERROR'
                group by [Validation Status]`
            );
            const dataAssetValidationUnvalidStatus = await pool
                .request()
                .query(
                    `Select count(*) from dbo.data_asset where [VALIDATION STATUS] is NULL`
                );
            const dataModelValidationErrorValidStatus = await pool.request().query(
                `select  cast(round((100.0 / NULLIF(count (*),0)) * (select count(*) FROM dbo.data_asset where [Validation Status] = 'VALID'),0,0) as numeric(36,0))
                    FROM dbo.data_model
                    where [Validation Status] in ('VALIDATIONERROR', 'VALID')`
            );
            const dataModelValidationValidStatus = await pool.request().query(
                `SELECT  count([Validation Status])
                FROM dbo.data_model
                where [Validation Status] = 'VALID'
                group by [Validation Status]`
            );
            const dataModelValidationErrorStatus = await pool.request().query(
                `SELECT  count([Validation Status])
                FROM dbo.data_model
                where [Validation Status] = 'VALIDATIONERROR'
                group by [Validation Status]`
            );
            const dataModelValidationUnvalidStatus = await pool
                .request()
                .query(
                    `Select count(*) from dbo.data_model where [VALIDATION STATUS] is NULL`
            );
            const mainUnitData = await pool.request().query(
                `SELECT [Main Unit], [Tag Class], COUNT(*)
                FROM [dbo].[data_Tag]
                GROUP BY [Main Unit], [Tag Class]
                ORDER BY [Main Unit], [Tag Class]`
              );
            return {
                statisticsOverallData: {
                    dataTag: dataTag.recordset?.length ? dataTag.recordset[0][''] : 0,
                    dataAsset: dataAsset.recordset?.length ? dataAsset.recordset[0][''] : 0,
                    dataModel: dataModel.recordset?.length ? dataModel.recordset[0][''] : 0
                },
                statisticsValidationData: {
                    dataTagValidationErrorValidStatus: dataTagValidationErrorValidStatus.recordset?.length ? dataTagValidationErrorValidStatus.recordset[0][''] : 0,
                    dataTagValidationValidStatus: dataTagValidationValidStatus.recordset?.length ? dataTagValidationValidStatus.recordset[0][''] : 0,
                    dataTagValidationErrorStatus: dataTagValidationErrorStatus.recordset?.length ? dataTagValidationErrorStatus.recordset[0][''] : 0,
                    dataTagValidationUnvalidStatus: dataTagValidationUnvalidStatus.recordset?.length ? dataTagValidationUnvalidStatus.recordset[0][''] : 0,
                    dataAssetValidationErrorValidStatus: dataAssetValidationErrorValidStatus.recordset?.length ? dataAssetValidationErrorValidStatus.recordset[0][''] : 0,
                    dataAssetValidationValidStatus: dataAssetValidationValidStatus.recordset?.length ? dataAssetValidationValidStatus.recordset[0][''] : 0,
                    dataAssetValidationErrorStatus: dataAssetValidationErrorStatus.recordset?.length ? dataAssetValidationErrorStatus.recordset[0][''] : 0,
                    dataAssetValidationUnvalidStatus: dataAssetValidationUnvalidStatus.recordset?.length ? dataAssetValidationUnvalidStatus.recordset[0][''] : 0,
                    dataModelValidationErrorValidStatus: dataModelValidationErrorValidStatus.recordset?.length ? dataModelValidationErrorValidStatus.recordset[0][''] : 0,
                    dataModelValidationValidStatus: dataModelValidationValidStatus.recordset?.length ? dataAssetValidationValidStatus.recordset[0][''] : 0,
                    dataModelValidationErrorStatus: dataModelValidationErrorStatus.recordset?.length ? dataAssetValidationErrorStatus.recordset[0][''] : 0,
                    dataModelValidationUnvalidStatus: dataModelValidationUnvalidStatus.recordset?.length ? dataAssetValidationUnvalidStatus.recordset[0][''] : 0,
                },
                mainUnitData:{ 
                    data: mainUnitData.recordset?.length ? mainUnitData.recordset : []
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default new AnalyticsService();
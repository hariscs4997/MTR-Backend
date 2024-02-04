import { sequelize } from "../../../config/dbconfig";
import sql from "mssql/msnodesqlv8";

const sqlService: any = sql;

interface IAnalyticsService {
  getStatisticsOverallandValidationData(): any;
}

class AnalyticsService implements IAnalyticsService {
  public async getStatisticsOverallandValidationData() {
    try {
      const dataTag = await sequelize.query(
        `SELECT count (*)
                FROM [dbo].[data_Tag]`
      );
      const dataAsset = await sequelize.query(
        `SELECT count (*)
                    FROM [dbo].[data_Asset]`
      );
     
      const dataModel = await sequelize.query(
        `SELECT count (*)
            FROM [dbo].[data_Model]`
      );
      const dataTagValidationErrorValidStatus = await sequelize.query(
        `select  cast(round((100.0 / NULLIF(count (*),0)) * (select count(*) FROM dbo.data_tag  where [Validation Status] = 'VALID'),0,0) as numeric(36,0))
                FROM dbo.data_tag
                where [Validation Status] in ('VALIDATIONERROR', 'VALID')`
      );
      const dataTagValidationValidStatus = await sequelize.query(
        `SELECT  count([Validation Status])
                FROM dbo.data_tag
                where [Validation Status] = 'VALID'
                group by [Validation Status]`
      );
      const dataTagValidationErrorStatus = await sequelize.query(
        `SELECT  count([Validation Status])
                FROM dbo.data_tag
                where [Validation Status] = 'VALIDATIONERROR'
                group by [Validation Status]`
      );
      const dataTagValidationUnvalidStatus = await sequelize.query(
        `Select count(*) from dbo.data_Tag where [VALIDATION STATUS] is NULL`
      );
      const dataAssetValidationErrorValidStatus = await sequelize.query(
        `select  cast(round((100.0 / NULLIF(count (*),0)) * (select count(*) FROM dbo.data_asset where [Validation Status] = 'VALID'),0,0) as numeric(36,0))
                    FROM dbo.data_asset
                    where [Validation Status] in ('VALIDATIONERROR', 'VALID')`
      );
      const dataAssetValidationValidStatus = await sequelize.query(
        `SELECT  count([Validation Status])
                FROM dbo.data_asset
                where [Validation Status] = 'VALID'
                group by [Validation Status]`
      );
      const dataAssetValidationErrorStatus = await sequelize.query(
        `SELECT  count([Validation Status])
                FROM dbo.data_asset
                where [Validation Status] = 'VALIDATIONERROR'
                group by [Validation Status]`
      );
      const dataAssetValidationUnvalidStatus = await sequelize.query(
        `Select count(*) from dbo.data_asset where [VALIDATION STATUS] is NULL`
      );
      const dataModelValidationErrorValidStatus = await sequelize.query(
        `select  cast(round((100.0 / NULLIF(count (*),0)) * (select count(*) FROM dbo.data_asset where [Validation Status] = 'VALID'),0,0) as numeric(36,0))
                    FROM dbo.data_model
                    where [Validation Status] in ('VALIDATIONERROR', 'VALID')`
      );
      const dataModelValidationValidStatus = await sequelize.query(
        `SELECT  count([Validation Status])
                FROM dbo.data_model
                where [Validation Status] = 'VALID'
                group by [Validation Status]`
      );
      const dataModelValidationErrorStatus = await sequelize.query(
        `SELECT  count([Validation Status])
                FROM dbo.data_model
                where [Validation Status] = 'VALIDATIONERROR'
                group by [Validation Status]`
      );
      const dataModelValidationUnvalidStatus = await sequelize.query(
        `Select count(*) from dbo.data_model where [VALIDATION STATUS] is NULL`
      );
      const mainUnitData = await sequelize.query(
        `SELECT [Main Unit], [Tag Class], COUNT(*)
                FROM [dbo].[data_Tag]
                GROUP BY [Main Unit], [Tag Class]
                ORDER BY [Main Unit], [Tag Class]`
      );
      return {
        statisticsOverallData: {
          dataTag: dataTag?.length ? dataTag[0][""] : 0,
          dataAsset: dataAsset?.length ? dataAsset[0][""] : 0,
          dataModel: dataModel?.length ? dataModel[0][""] : 0,
        },
        statisticsValidationData: {
          dataTagValidationErrorValidStatus:
            dataTagValidationErrorValidStatus?.length
              ? dataTagValidationErrorValidStatus[0][""]
              : 0,
          dataTagValidationValidStatus: dataTagValidationValidStatus?.length
            ? dataTagValidationValidStatus[0][""]
            : 0,
          dataTagValidationErrorStatus: dataTagValidationErrorStatus?.length
            ? dataTagValidationErrorStatus[0][""]
            : 0,
          dataTagValidationUnvalidStatus: dataTagValidationUnvalidStatus?.length
            ? dataTagValidationUnvalidStatus[0][""]
            : 0,
          dataAssetValidationErrorValidStatus:
            dataAssetValidationErrorValidStatus?.length
              ? dataAssetValidationErrorValidStatus[0][""]
              : 0,
          dataAssetValidationValidStatus: dataAssetValidationValidStatus?.length
            ? dataAssetValidationValidStatus[0][""]
            : 0,
          dataAssetValidationErrorStatus: dataAssetValidationErrorStatus?.length
            ? dataAssetValidationErrorStatus[0][""]
            : 0,
          dataAssetValidationUnvalidStatus:
            dataAssetValidationUnvalidStatus?.length
              ? dataAssetValidationUnvalidStatus[0][""]
              : 0,
          dataModelValidationErrorValidStatus:
            dataModelValidationErrorValidStatus?.length
              ? dataModelValidationErrorValidStatus[0][""]
              : 0,
          dataModelValidationValidStatus: dataModelValidationValidStatus?.length
            ? dataAssetValidationValidStatus[0][""]
            : 0,
          dataModelValidationErrorStatus: dataModelValidationErrorStatus?.length
            ? dataAssetValidationErrorStatus[0][""]
            : 0,
          dataModelValidationUnvalidStatus:
            dataModelValidationUnvalidStatus?.length
              ? dataAssetValidationUnvalidStatus[0][""]
              : 0,
        },
        mainUnitData: {
          data: mainUnitData?.length ? mainUnitData : [],
        },
      };
    } catch (error) {
      return error;
      // console.log(error);
    }
  }
}

export default new AnalyticsService();

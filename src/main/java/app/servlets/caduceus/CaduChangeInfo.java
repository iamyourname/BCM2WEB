package app.servlets.caduceus;

import app.entities.ConnectionPool;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class CaduChangeInfo {

    public String getCaduInfoChange(String buf, String sap) throws SQLException {


        // Добавить код сап отправителя и получателя--------------

        Connection pullConn = ConnectionPool.getInstance().getConnectionMerc();
        Statement stmtPullM = pullConn.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        String findBaseInfo = "SELECT \n" +
                "        ci.CINC_TRANSACTIONID \"BUF\"\n" +
                "    ,   'Приемка' \"DOC_TYPE\"\n" +
                "    ,   sd.SDSS_NAME ||'('||sd.SDSS_ID ||')'\"ST\"\n" +
                "    ,   ci.CINC_WAYBILLNUMBER \n" +
                "    ,  ci.CINC_WAYBILLDATE \n" +
                "    ,   cod.CODV_NAME||' ('||cod.CODV_CODE||')' \"otpravitel\"\n" +
                "    ,   cod2.codv_name||' ('||cod2.CODV_CODE||')' \"poluchatel\""+
                //    "    --,   (SELECT CODV_NAME ||'('||CODV_CODE||')'  FROM C_ORG_DIVISIONS cod WHERE cod.CODV_ID=ci.CINC_FROMDIVISION_ID)\"Otpravitel\"\n" +
                "FROM C_INCOMING ci \n" +
                "LEFT JOIN C_ORG_DIVISIONS cod ON cod.codv_id = ci.CINC_FROMDIVISION_ID \n" +
                "LEFT JOIN C_ORG_DIVISIONS cod2 ON cod2.codv_id = ci.CINC_TODIVISION_ID \n" +
                "LEFT JOIN S_DOCSTATUSES sd ON sd.SDSS_ID = ci.DOC_STATUS \n" +
                "WHERE "+
                "                        ((ci.CINC_TRANSACTIONID = 'BF_'||cod2.CODV_CODEDEPNQ||'_'||'"+buf+"' OR ci.CINC_TRANSACTIONID = '"+buf+
                "' OR ci.CINC_WAYBILLNUMBER ='"+buf+"')\n" +
                "                    AND cod2.CODV_CODE = '"+sap+"' AND ci.DOC_ADDDATE > SYSDATE-15)  \n" +
                "                UNION ALL \n" +
                "SELECT \n" +
                "        co.COUT_TRANSACTIONID \"BUF\"\n" +
                "    ,  'Отгрузка' \"DOC_TYPE\"\n" +
                "    ,   sd.SDSS_NAME ||' ('||sd.SDSS_ID ||')'\"ST\"\n" +
                "    ,   co.COUT_WAYBILLNUMBER \n" +
                "    ,   co.COUT_WAYBILLDATE \n" +
                "    ,   cod.CODV_NAME||' ('||cod.CODV_CODE||')' \"otpravitel\"\n" +
                "    ,   cod2.codv_name||' ('||cod2.CODV_CODE||')' \"poluchatel\" "+
                // "    --,   (SELECT CODV_NAME ||'('||CODV_CODE||')'  FROM C_ORG_DIVISIONS cod WHERE cod.CODV_ID=ci.CINC_FROMDIVISION_ID)\"Otpravitel\"\n" +
                "FROM C_OUTGOING co \n" +
                "LEFT JOIN C_ORG_DIVISIONS cod ON cod.codv_id = co.COUT_FROMDIVISION_ID \n" +
                "LEFT JOIN C_ORG_DIVISIONS cod2 ON cod2.codv_id = co.COUT_TODIVISION_ID \n" +
                "LEFT JOIN S_DOCSTATUSES sd ON sd.SDSS_ID = co.DOC_STATUS "+
                "                WHERE \n" +
                "                        ((co.Cout_TRANSACTIONID = 'OUT_'||cod.CODV_CODEDEPNQ||'_'||'"+buf+"' OR co.COUT_TRANSACTIONID = '"+buf+
                "' OR co.COUT_WAYBILLNUMBER ='"+buf+"') \n" +
                "                    AND cod.CODV_CODE = '"+sap+"' AND  co.DOC_ADDDATE > SYSDATE-15)";

        // сократилось до 10 сек.


        ResultSet rs = stmtPullM.executeQuery(findBaseInfo);

        String response="";
        String bufNumber="";
        rs.first();
        //  while(rs.next()){
        bufNumber=rs.getString(1);
        response+=rs.getString(1)+"|";
        response+=rs.getString(2)+"|";
        response+=rs.getString(3)+"|";
        response+=rs.getString(4)+"|";
        response+=rs.getString(5)+"|";
        response+=rs.getString(6)+"|";
        response+=rs.getString(7)+"|";
        response+="&";
        // }
        pullConn.close();
        stmtPullM.close();
        //response+="@"+getCadu_RC_StateBufInfo(bufNumber,sap);
        //response+="@"+getCaduRcBaseInfo(bufNumber,sap);
        //response+="@"+getCaduTaskInfo(bufNumber,sap);

        return response;
    }



    public String updateIncBufHeader(String buf, String sap, String newStatus) throws SQLException {

        Connection pullConn = ConnectionPool.getInstance().getConnectionMerc();
        Statement stmtPullM = pullConn.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);

        String sqlUpdateState = "UPDATE \n" +
                " c_incoming \n" +
                " SET doc_status = '"+newStatus+"' \n" +
                " WHERE CINC_TRANSACTIONID = '"+buf+"' \n" +
                " AND DOC_ADDDATE > SYSDATE -15";

        if(stmtPullM.execute(sqlUpdateState)){
            stmtPullM.close();pullConn.close();
            return "ok";

        }else{
            stmtPullM.close();pullConn.close();
            return "not_ok";
        }

    }

}

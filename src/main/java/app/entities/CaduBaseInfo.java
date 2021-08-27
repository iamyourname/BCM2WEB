package app.entities;

import java.sql.*;

public class CaduBaseInfo {


    /*
    Перезапуск док-ов приемки
    http://msk-dpro-app324:8080/gui/supply/runfunction - end-point
    body

    {
   "body":[
      {
         "Id":478002541,  -- номер документа приемки
         "FunctionCode":"incPushToMercuryWithCheckVet" -- тип запускаемой функции
      }
   ],
   "head":{
      "sessionId":"HUY",
      "caduceusUser":"admin",
      "caduceusApiKey":"X5",
      "caduceusApiVersion":"20170901"
   }
}


     */


    public String getInventInfo(String buf, String sap) throws SQLException {

        Connection pullConn = ConnectionPool.getInstance().getConnectionMerc();
        Statement stmtPullM = pullConn.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);

        String sqlFindInvent = "select * from (\n" +
                "select row_number() over (partition by i.cinv_id order by a.C_CREATED desc) as rn,\n" +
                "c.cart_code \"PLU\",cod.COUD_PRODDATE_FROM \"ДВ\",cod.COUD_EXPIREDATE_FROM \"СГ\",i.cinv_id \"Инвентаризация\",i.DOC_STATUS,s.SDSS_NAME,cst.csen_entrynumber \"ЗСЖ\",\n" +
                "a.C_ERROR_DETAILS \"Ошибка\"\n" +
                "from C_INVENTORYING i\n" +
                "join C_INVENTORYING_DETAILS cid on i.cinv_id = cid.civd_inventoryingdoc_id\n" +
                "join c_articles c on cid.CIVD_ARTICLE_ID = c.cart_id\n" +
                "left join C_STOCKENTRIES cst on cid.CIVD_STOCKENTRY_ID = cst.csen_id\n" +
                "join c_Outgoing_Inventory_Dtls_Rel coidr ON coidr.CIVD_ID = cid.CIVD_ID\n" +
                "join c_outgoing_details cod ON coidr.COUD_ID = cod.COUD_ID\n" +
                "join S_DOCSTATUSES s on i.doc_status = s.sdss_id\n" +
                "join C_OUTGOING ou ON cod.COUD_OUTGOINGDOC_ID = ou.COUT_ID \n" +
                "join a_tasks a on i.cinv_id = a.c_doc_id \n" +
                "JOIN C_ORG_DIVISIONS cod2 ON cod2.CODV_ID = i.CINV_STORAGE \n" +
                "where ou.cout_transactionid  = 'OUT_'||cod2.CODV_CODEDEPNQ||'_'||'"+buf+"' AND cod2.CODV_CODE='"+sap+"') t\n" +
                "where rn = 1\n" +
                "order by DOC_STATUS";

        ResultSet rs = stmtPullM.executeQuery(sqlFindInvent);

        String response="";
        while(rs.next()){
            response+=rs.getString(2)+"|";
            response+=rs.getString(3)+"|";
            response+=rs.getString(4)+"|";
            response+=rs.getString(5)+"|";
            response+=rs.getString(6)+"("+rs.getString(7)+")"+"|";
            response+=rs.getString(8)+"|";
            response+=rs.getString(9)+"|";
            response+="&";
        }
        pullConn.close();
        stmtPullM.close();

        if(response.equals(""))
            return "&";
        else

        return "";
    }

    public String getCaduBaseInfo(String buf, String sap) throws SQLException {


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
                "                    AND cod2.CODV_CODE = '"+sap+"' AND ci.DOC_ADDDATE > SYSDATE-15)\n" +
                "                UNION ALL\n" +
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
                "                WHERE\n" +
                "                        ((co.Cout_TRANSACTIONID = 'OUT_'||cod.CODV_CODEDEPNQ||'_'||'"+buf+"' OR co.COUT_TRANSACTIONID = '"+buf+
                "' OR co.COUT_WAYBILLNUMBER ='"+buf+"')\n" +
                "                    AND cod.CODV_CODE = '"+sap+"' AND  co.DOC_ADDDATE > SYSDATE-15)";
                // сократилось до 10 сек.


        ResultSet rs = stmtPullM.executeQuery(findBaseInfo);

        String response="";
        String bufNumber="";
        while(rs.next()){
            bufNumber=rs.getString(1);
            response+=rs.getString(1)+"|";
            response+=rs.getString(2)+"|";
            response+=rs.getString(3)+"|";
            response+=rs.getString(4)+"|";
            response+=rs.getString(5)+"|";
            response+=rs.getString(6)+"|";
            response+=rs.getString(7)+"|";
            response+="&";
        }
        pullConn.close();
        stmtPullM.close();
        response+="@"+getCadu_RC_StateBufInfo(bufNumber,sap);
        //response+="@"+getCaduTaskInfo(bufNumber,sap);

        return response;
    }

    public String getCaduTaskInfo(String buf, String sap) throws SQLException {

        Connection pullConn = ConnectionPool.getInstance().getConnectionMerc();
        Statement stmtPullM = pullConn.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        String findBaseInfo = "SELECT \n" +
                "        at2.C_ID\n" +
                "    ,   at2.C_CREATED\n" +
                "    ,   at2.C_DATE_DONE\n" +
                "    ,   at2.C_PROCESSING\n" +
                "    ,   at2.C_TASK_STATUS\n" +
                "    ,   at2.C_APPLICATION_STATUS\n" +
                "    ,   at2.C_TASK_TYPE\n" +
                "    ,   at2.C_ERROR_DETAILS\n" +
                "    ,   at2.C_TRACE_ID\n" +
                "    ,   at2.C_HOSTNAME\n" +
                "    ,   at2.C_STATUS_MSG\n" +
                "    ,   at2.C_TASK_SDSS\n" +
                "    ,   at2.C_PRIORITY\n" +
                "    ,   at2.C_TASK_DATA"+
                " FROM C_INCOMING ci \n" +
                "LEFT JOIN A_TASKS at2 ON at2.C_DOC_ID  = ci.CINC_ID \n" +
                "LEFT JOIN C_ORG_DIVISIONS cod ON cod.codv_id = ci.CINC_FROMDIVISION_ID \n" +
                "LEFT JOIN C_ORG_DIVISIONS cod2 ON cod2.codv_id = ci.CINC_TODIVISION_ID \n" +
                "LEFT JOIN S_DOCSTATUSES sd ON sd.SDSS_ID = ci.DOC_STATUS \n" +
                "WHERE "+
                "                        ((ci.CINC_TRANSACTIONID = 'BF_'||cod2.CODV_CODEDEPNQ||'_'||'"+buf+"' OR ci.CINC_TRANSACTIONID = '"+buf+
                "'OR ci.CINC_WAYBILLNUMBER ='"+buf+"')\n" +
                "                    AND cod2.CODV_CODE = '"+sap+"' AND ci.CINC_WAYBILLDATE > SYSDATE-30)\n" +
                "UNION ALL\n" +
                "SELECT \n" +
                "        at2.C_ID\n" +
                "    ,   at2.C_CREATED\n" +
                "    ,   at2.C_DATE_DONE\n" +
                "    ,   at2.C_PROCESSING\n" +
                "    ,   at2.C_TASK_STATUS\n" +
                "    ,   at2.C_APPLICATION_STATUS\n" +
                "    ,   at2.C_TASK_TYPE\n" +
                "    ,   at2.C_ERROR_DETAILS\n" +
                "    ,   at2.C_TRACE_ID\n" +
                "    ,   at2.C_HOSTNAME\n" +
                "    ,   at2.C_STATUS_MSG\n" +
                "    ,   at2.C_TASK_SDSS\n" +
                "    ,   at2.C_PRIORITY\n" +
                "    ,   at2.C_TASK_DATA"+
                " FROM C_OUTGOING co \n" +
                "LEFT JOIN A_TASKS at2 ON at2.C_DOC_ID = co.COUT_ID \n" +
                "LEFT JOIN C_ORG_DIVISIONS cod ON cod.codv_id = co.COUT_FROMDIVISION_ID \n" +
                "LEFT JOIN C_ORG_DIVISIONS cod2 ON cod2.codv_id = co.COUT_TODIVISION_ID \n" +
                "LEFT JOIN S_DOCSTATUSES sd ON sd.SDSS_ID = co.DOC_STATUS \n" +
                "                WHERE\n" +
                "                        ((co.Cout_TRANSACTIONID = 'OUT_'||cod.CODV_CODEDEPNQ||'_'||'"+buf+"' OR co.COUT_TRANSACTIONID = '"+buf+
                "' OR co.COUT_WAYBILLNUMBER ='"+buf+"')\n" +
                "                    AND cod.CODV_CODE = '"+sap+"' AND co.COUT_WAYBILLDATE > SYSDATE-30)"+
                " order by 2";


        ResultSet rs = stmtPullM.executeQuery(findBaseInfo);

        String response="";
        while(rs.next()){
            response+=rs.getString(1)+"|";
            response+=rs.getString(2)+"|";
            response+=rs.getString(3)+"|";
            response+=rs.getString(4)+"|";
            response+=rs.getString(5)+"|";
            response+=rs.getString(6)+"|";
            response+=rs.getString(7)+"|";
            response+=rs.getString(8)+"|";
            response+=rs.getString(9)+"|";
            response+=rs.getString(10)+"|";
            response+=rs.getString(11)+"|";
            response+=rs.getString(12)+"|";
            response+=rs.getString(13)+"|";
            response+=rs.getString(14)+"|";
            response+="&";
        }
        pullConn.close();
        stmtPullM.close();

        //response+="@"+getCaduDetailsInfo(buf,sap);

        return response;
    }

    public String getCaduDetailsInfo(String buf, String sap) throws SQLException {

        Connection pullConn = ConnectionPool.getInstance().getConnectionMerc();
        Statement stmtPullM = pullConn.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        String findBaseInfo = "SELECT \n" +
                " sd.SDSS_NAME||'('||c.DOC_STATUS||')'\n" +
                ", ca.CART_CODE \n" +
                ", c.CIND_REFARTICLENAME \n" +
                ", c.CIND_VOLUMEINVETUNITS \n" +
                ", c.CIND_VOLUMEINBASEUNITS \n" +
                ", c.CIND_VETDOCUMENT_UUID \n" +
                ", s.MVDS_NAME \n" +
                ", cs.CSEN_ENTRYNUMBER \n" +
                " FROM c_incoming_details c \n" +
                "LEFT JOIN c_incoming ci ON ci.CINC_ID = c.CIND_INCOMINGDOC_ID \n" +
                "LEFT JOIN C_ORG_DIVISIONS cod ON cod.codv_id = ci.CINC_FROMDIVISION_ID \n" +
                "LEFT JOIN C_ORG_DIVISIONS cod2 ON cod2.codv_id = ci.CINC_TODIVISION_ID \n" +
                "LEFT JOIN C_ARTICLES ca on c.CIND_ARTICLE_ID = ca.cart_id\n" +
                "LEFT join s_docstatuses sd on c.doc_status = sd.sdss_id\n" +
                "LEFT join m_vetdocument m on c.CIND_VETDOCUMENT_UUID = m.MGEN_UUID\n" +
                "LEFT join m_vetdocumentstatus s on m.MVDC_VETDSTATUS = s.MVDS_ID\n" +
                "LEFT join C_STOCKENTRIES cs on c.CIND_STOCKENTRY_ID = cs.csen_id"+
                " WHERE\n" +
                "        ((ci.CINC_TRANSACTIONID = 'BF_'||cod2.CODV_CODEDEPNQ||'_'||'"+buf+"' OR ci.CINC_TRANSACTIONID = '"+buf+
                "' OR ci.CINC_WAYBILLNUMBER ='"+buf+"')\n" +
                "            AND \n" +
                "            cod2.CODV_CODE = '"+sap+"' AND ci.CINC_WAYBILLDATE > SYSDATE-30)" +
                "UNION ALL \n" +
                "SELECT \n" +
                "  sd.SDSS_NAME||'('||o.DOC_STATUS||')'\n" +
                " , ca.CART_CODE \n" +
                " , o.COUD_REFARTICLENAME\n" +
                " , o.COUD_VOLUMEINVETUNITS\n" +
                " , o.COUD_VOLUMEINBASEUNITS\n" +
                " , o.COUD_VETDOCUMENT_UUID\n" +
                " , s.MVDS_NAME\n" +
                " , cs.CSEN_ENTRYNUMBER\n" +
                " FROM C_OUTGOING_DETAILS o\n" +
                "LEFT JOIN C_OUTGOING co ON co.COUT_ID = o.COUD_OUTGOINGDOC_ID \n" +
                "LEFT JOIN C_ORG_DIVISIONS cod ON cod.codv_id = co.COUT_FROMDIVISION_ID \n" +
                "LEFT JOIN C_ORG_DIVISIONS cod2 ON cod2.codv_id = co.COUT_TODIVISION_ID \n" +
                "LEFT JOIN C_ARTICLES ca on o.COUD_ARTICLE_ID  = ca.cart_id\n" +
                "LEFT join s_docstatuses sd on o.doc_status = sd.sdss_id\n" +
                "LEFT join m_vetdocument m on o.COUD_VETDOCUMENT_UUID = m.MGEN_UUID\n" +
                "LEFT join m_vetdocumentstatus s on m.MVDC_VETDSTATUS = s.MVDS_ID\n" +
                "LEFT join C_STOCKENTRIES cs on o.COUD_STOCKENTRY_ID = cs.csen_id"+
                " WHERE\n" +
                "        ((co.Cout_TRANSACTIONID = 'OUT_'||cod.CODV_CODEDEPNQ||'_'||'"+buf+"' OR co.COUT_TRANSACTIONID = '"+buf+
                "' OR co.COUT_WAYBILLNUMBER ='"+buf+"')\n" +
                "    AND \n" +
                "   cod.CODV_CODE = '"+sap+"'  AND co.COUT_WAYBILLDATE > SYSDATE-30)" +
                "ORDER BY 1";


        ResultSet rs = stmtPullM.executeQuery(findBaseInfo);

        String response="";
        while(rs.next()){
            response+=rs.getString(1)+"|";
            response+=rs.getString(2)+"|";
            response+=rs.getString(3).replace("@","")+"|";
            response+=rs.getString(4)+"|";
            response+=rs.getString(5)+"|";
            response+=rs.getString(6)+"|";
            response+=rs.getString(7)+"|";
            response+=rs.getString(8)+"|";
            response+="&";
        }
        pullConn.close();
        stmtPullM.close();

        response+="@"+getCadu_RC_StateBufInfo(buf,sap);


        return response;
    }


    public String getCadu_RC_StateBufInfo(String buf, String sap) throws SQLException {
        String response="";

        Connection pullConnNq = ConnectionPool.getInstance().getConnectionNQ(sap);
        Statement stmtPullNq = pullConnNq.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        String[] rcBuf = buf.split("_");
        String findNqStateInfo = "select * from alc.buferstatushistory where BUF_ID_HEADER = '"+rcBuf[2]+"'  order by 1 desc ";

        ResultSet rs = stmtPullNq.executeQuery(findNqStateInfo);


      rs.first();
            response+=rs.getString(7)+"|";
            response+=rs.getString(9)+"|";
            response+="&";

        pullConnNq.close();
        stmtPullNq.close();

        response+="@"+getCadu_RC_ExcludeBufInfo(rcBuf[2],sap);

        return response;
    }

    public String getCadu_RC_ExcludeBufInfo(String buf, String sap) throws SQLException {
        String response="";

        Connection pullConnNq = ConnectionPool.getInstance().getConnectionNQ(sap);
        Statement stmtPullNq = pullConnNq.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);

        String findNqStateInfo = "select * from sdd.mercexcludebuff c where ID_HEADER = '"+buf+"'";

        ResultSet rs = stmtPullNq.executeQuery(findNqStateInfo);

        rs.last();int excl = rs.getRow();rs.beforeFirst();

        if(excl==0){
            response+="Нет"+"|";
        }else{
            response+="Да ";
            while(rs.next()){
                response+=rs.getString(3)+"|";

            }
        }
        response+="&";
        pullConnNq.close();
        stmtPullNq.close();

        response+="@"+getCadu_RC_CarNumber(buf,sap);

        return response;
    }


    /*
    * select  i.* from scm.vetcertificatedetail i where
WAYBILLNO =
(select WAYBILLNUMBER from scm.vetshipmentheader v WHERE v.TRANSACTIONID like 'OUT_%_1376567')
; -- по ТТН 1376352*/
    public String getCadu_RC_CarNumber(String buf, String sap) throws SQLException {
        String response="";

        Connection pullConnNq = ConnectionPool.getInstance().getConnectionNQ(sap);
        Statement stmtPullNq = pullConnNq.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);

        String findNqStateInfo = "select v.TRANSPORTNUMBER from scm.vetshipmentheader v where v.TRANSACTIONID like 'OUT_%_"+buf+"'";

        ResultSet rs = stmtPullNq.executeQuery(findNqStateInfo);

        rs.last();int excl = rs.getRow();rs.beforeFirst();

        if(excl==0){
            response+="Нет"+"|";
        }else{
           // response+="Да ";
            while(rs.next()){
                response+=rs.getString(1)+"|";

            }
        }

        response+="&";
        pullConnNq.close();
        stmtPullNq.close();

        //response+="@"+getCaduSert(buf,sap);

        return response;
    }

    public String getCaduSert(String buf, String sap) throws SQLException {
        String response="";

        Connection pullConnNq = ConnectionPool.getInstance().getConnectionNQ(sap);
        Statement stmtPullNq = pullConnNq.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);

        String findNqStateInfo = "select  i.* from scm.vetcertificatedetail i where \n" +
                " WAYBILLNO = " +
                "(select v.WAYBILLNUMBER from scm.vetshipmentheader v WHERE v.TRANSACTIONID like 'OUT_%_"+buf+"' OR v.TRANSACTIONID LIKE 'BF_%_"+buf+"')";

        ResultSet rs = stmtPullNq.executeQuery(findNqStateInfo);




            while(rs.next()){
                response+=rs.getString(5)+"|";
                response+=rs.getString(6)+"|";
                response+="!";
            }


        response+="&";
        pullConnNq.close();
        stmtPullNq.close();

        response+="@"+getCaduVFlow(buf,sap);

        return response;
    }
    //select i.CHNG_TYPE, i.FILE_NUMBER , i.DT_EXPORTED from sap.exportlist i where id = 1376567; -- поле file_number

    public String getCaduVFlow(String buf, String sap) throws SQLException {
        String response="";

        Connection pullConnNq = ConnectionPool.getInstance().getConnectionNQ(sap);
        Statement stmtPullNq = pullConnNq.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);

        String findNqStateInfo = "select i.CHNG_TYPE, i.FILE_NUMBER , i.DT_EXPORTED from sap.exportlist i where id = "+buf;

        ResultSet rs = stmtPullNq.executeQuery(findNqStateInfo);




        while(rs.next()){
            response+=rs.getString(1)+"|";
            response+=rs.getString(2)+"|";
            response+=rs.getString(3)+"|";
            response+="!";
        }


        response+="&";
        pullConnNq.close();
        stmtPullNq.close();

        return response;
    }

}

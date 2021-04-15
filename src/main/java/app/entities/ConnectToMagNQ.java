package app.entities;

import java.sql.*;


public class ConnectToMagNQ {

    // Класс для обработки действий с магазинами NQ
    //public static Connection connMagNQ;
    
    private  Connection findAndConnTo_NQ(String sap) throws SQLException, ClassNotFoundException {
        Connection connMagNQ = null;
        String startUrl="ORA-";
        String  urlNQ="";
        
        //------------------Ищем адрес магазина
        Connection pullConnNq = ConnectionPool.getInstance().getConnectionNQ("0186");
        Statement stmtPullNq = pullConnNq.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);

        String getSqlstringSap ="select nickname from sdd.department \n" +
                "where id_department in (\n" +
                "select id_department from sdd.department_ext \n" +
                "where ext_string = UPPER('"+sap+"'))";

        ResultSet rsFindUrl = stmtPullNq.executeQuery(getSqlstringSap);

        while(rsFindUrl.next()){
            startUrl+=rsFindUrl.getString(1);
        }

        pullConnNq.close();
        stmtPullNq.close();rsFindUrl.close();

        //Connection connMagNQ;
        if(startUrl.equals("ORA-")){
            //if empty
            System.out.println("bad "+startUrl);
           // return connMagNQ;

        }else{
            //else is not empty
            //connect to store NQ
            System.out.println("good "+startUrl);
           
                urlNQ = "jdbc:oracle:thin:@" + startUrl + ":1521/" + "orcl";
                //System.out.println(urlNQ);
            Class.forName("oracle.jdbc.driver.OracleDriver");
          connMagNQ =  DriverManager.getConnection(urlNQ, "sdd", "kjiflm");
        }

        //return connMagNQ;
        return connMagNQ;
    }


      public String getNQ_Info(String buf, String sap) throws SQLException, ClassNotFoundException {
          System.out.println("startNQ");
        String response="";
        String bacchusBuf="";
        String shortHistory="";
        String fullHistory="";

          //ConnectToMagNQ connectToMagNQ = new ConnectToMagNQ();
          String sqlQueryBaseInfo = "SELECT * FROM (\n" +
                  " SELECT \n" +
                  "\t\tb.ID_HEADER\n" +
                  "\t,\tb.STATUS\n" +
                  ",\tCASE \n" +
                  "\t\t\tWHEN b.STATUS = 'X' THEN 'согласование'\n" +
                  "\t\t\tWHEN b.STATUS = 'S' THEN 'сторнировано'\n" +
                  "\t\t\tWHEN b.STATUS = 'O' THEN 'черновик'\n" +
                  "\t\t\tWHEN b.STATUS = 'E' THEN 'приемка'\n" +
                  "\t\t\tWHEN b.STATUS = '_' THEN 'Закрыт'\n" +
                  "\t\tEND \"ruStat0\""+
                  "\t ,\td.NAME \n" +
                  "\t ,\tb.DT_CREATED \n" +
                  "\t ,\tb.ORD_ID_HEADER \n" +
                  "\t ,\tb.NOTE \n" +
                  "\t ,\tbe.EXT_NAME\n" +
                  "\t ,\tbe.EXT_TYPE \n" +
                  "\t ,\tbe.EXT_NUMBER \n" +
                  "\t ,\tbe.EXT_DATE \n" +
                  "\t ,\tbe.EXT_STRING \n" +
                  "\t FROM \n" +
                  "\t\t sdd.BUFHEADER b\n" +
                  "\t ,\tsdd.BUFHEADER_EXT be\n" +
                  "\t , \tsdd.DOCTYPE d \n" +
                  "\t WHERE 1=1\n" +
                  "\t AND (\tb.ID_HEADER = be.ID_HEADER)\n" +
                  "\t AND (\tb.ID_DOCTYPE = d.ID_DOCTYPE)\n" +
                  "\t UNION \n" +
                  " SELECT \n" +
                  "\t\td.ID_HEADER\n" +
                  "\t,\td.STATUS\n" +
                  ",\tCASE \n" +
                  "\t\t\tWHEN d.STATUS = 'X' THEN 'согласование'\n" +
                  "\t\t\tWHEN d.STATUS = 'S' THEN 'сторнировано'\n" +
                  "\t\t\tWHEN d.STATUS = 'O' THEN 'черновик'\n" +
                  "\t\t\tWHEN d.STATUS = 'E' THEN 'приемка'\n" +
                  "\t\t\tWHEN d.STATUS = '_' THEN 'Закрыт'\n" +
                  "\t\tEND \"ruStat\""+
                  "\t ,\tdd.NAME \n" +
                  "\t ,\td.DT_CREATED \n" +
                  "\t ,\td.ORD_ID_HEADER \n" +
                  "\t ,\td.NOTE \n" +
                  "\t ,\tde.EXT_NAME\n" +
                  "\t ,\tde.EXT_TYPE \n" +
                  "\t ,\tde.EXT_NUMBER \n" +
                  "\t ,\tde.EXT_DATE \n" +
                  "\t ,\tde.EXT_STRING \n" +
                  "\t FROM \n" +
                  "\t\t sdd.DOCHEADER d\n" +
                  "\t ,\tsdd.DOCHEADER_EXT de \n" +
                  "\t , \tsdd.DOCTYPE dd \n" +
                  "\t WHERE 1=1\n" +
                  "\t AND (\td.ID_HEADER = de.ID_HEADER)\n" +
                  "\t AND (\td.ID_DOCTYPE = dd.ID_DOCTYPE)\n" +
                  "\t\t  ) nc\n" +
                  "\t WHERE  1=1\n" +
                  "\t AND \tnc.ID_HEADER = '"+buf.replaceAll("[a-zA-Z]","") +"'"+
                  "\t OR\n" +
                  "\t ( nc.ID_HEADER = (SELECT ID_HEADER FROM sdd.BUFHEADER_EXT WHERE EXT_STRING='"+buf+"') \n" +
                  "\t OR nc.ID_HEADER = (SELECT ID_HEADER FROM sdd.DOCHEADER_EXT WHERE EXT_STRING='"+buf+"'))";


          Connection connMag = findAndConnTo_NQ(sap);
          Statement stmtMag = connMag.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
          ResultSet rsMag = stmtMag.executeQuery(sqlQueryBaseInfo);

          // заголовок буфера из nq
          while (rsMag.next()){
              //System.out.println(rsMag.getString(7));
              if(rsMag.getString(8).equals("BUF_IDENT_ALCO")){
                  response+=rsMag.getString(1)+"|"; // id_header
                  response+=rsMag.getString(2)+"|"; // status
                  response+=rsMag.getString(3)+"|"; //ru_status
                  response+=rsMag.getString(4)+"|"; //type
                  response+=rsMag.getString(12)+"|"; // bacchus_buf
                  bacchusBuf=rsMag.getString(12);
                  //response+="&";
                  System.out.println(rsMag.getString(12));
              }
          }
          stmtMag.close();rsMag.close();
          String sqlQueryGetFullHistory = "SELECT\n" +
                  "     DISTINCT ldc.TIME_STAMP \n" +
                  "    ,   ldc.FIELD_NAME\n" +
                  ",   CASE \n" +
                  "        when ldc.OLD_VALUE IS null THEN 'null'\n" +
                  "        ELSE ldc.OLD_VALUE END \"OLD_VALUE\""+
                  "    ,   ldc.NEW_VALUE\n" +
                  "    ,   ldc.TABLENAME\n" +
                  "    FROM LOG_DOC_CHANGES ldc\n" +
                  " WHERE 1=1\n" +
                  "    AND ldc.FIELD_NAME NOT IN ('M_K', 'EXT_DATE')\n" +
                  "\t AND \t ldc.ID_HEADER = '"+buf.replaceAll("[a-zA-Z]","") +"'"+
                  "    AND(\n" +
                  "            ldc.ID_HEADER = (SELECT ID_HEADER FROM sdd.BUFHEADER_EXT WHERE EXT_STRING='"+bacchusBuf+"') \n" +
                  "        OR " +
                  "            ldc.ID_HEADER =\n" +
                  "                (SELECT ID_HEADER FROM sdd.DOCHEADER_EXT WHERE EXT_STRING='"+bacchusBuf+"')) \n" +
                  "    AND (ldc.NEW_VALUE!='[NULL]') \n" +
                  "    ORDER BY 1";
          response+="&";
          System.out.println("NQ-----------------------");
          System.out.println(response);
          //  history of buf from nq

          Statement stmtMag2 = connMag.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);

          ResultSet rsMag2 = stmtMag2.executeQuery(sqlQueryGetFullHistory);
          System.out.println("start2");
          while (rsMag2.next()){

                  if(!rsMag2.getString(3).equals("null")){
                      //shortHistory
                      shortHistory+=rsMag2.getString(1)+"|"; // TIME_STAMP
                      shortHistory+=rsMag2.getString(2)+"|"; // FIELD_NAME
                      shortHistory+=rsMag2.getString(3)+"|"; //OLD_VALUE
                      shortHistory+=rsMag2.getString(4)+"|"; //NEW_VALUE
                      shortHistory+=rsMag2.getString(5)+"|"; // TABLENAME
                      shortHistory+="!";
                  }
                    fullHistory+=rsMag2.getString(1)+"|"; // TIME_STAMP
                    fullHistory+=rsMag2.getString(2)+"|"; // FIELD_NAME
                     fullHistory+=rsMag2.getString(3)+"|"; //OLD_VALUE
                     fullHistory+=rsMag2.getString(4)+"|"; //NEW_VALUE
                   fullHistory+=rsMag2.getString(5)+"|"; // TABLENAME
                  fullHistory+="!";
                  //bacchusBuf=rsMag.getString(12);
                  //response+="&";


          }


           stmtMag2.close();
           rsMag2.close();
           connMag.close();
          response+=shortHistory+"&"+fullHistory;
          System.out.println("HISTROY-----------------------");
          //System.out.println(response);

          //connMag.close();
         // stmtMag.close();
         // rsMag.close();

          response+="&"+getBacInfo(bacchusBuf,sap);
          System.out.println("BACCHUS-----------------------");
          //System.out.println(response);

          //System.out.println(sap);
        //response=findUrlNQ(sap); // нашли

        return response;
    }

    private String getBacInfo(String buf, String sap) throws SQLException {
        String response="";

        String sqlQueryBacchus="SELECT * FROM\n" +
                "    (\n" +
                "    SELECT\n" +
                "            bi.BINC_TRANSACTIONID AS \"BUF\" \n" +
                "        ,   sd.sdss_name || ' (' || bi.doc_status || ')' \n" +
                "        ,   bi.BINC_WAYBILLNUMBER AS \"TTN\" \n" +
                "        ,   bi.BINC_TRANSACTIONDATE AS \"DATA\" \n" +
                "        ,   bi.BINC_SAPORDERNUMBER AS \"ORDER\" \n" +
                "        ,   cod.CODV_CODE AS \"SAP\"\n" +
                "    FROM\n" +
                "        B_INCOMING bi\n" +
                "    LEFT JOIN s_docstatuses sd ON\n" +
                "        sd.sdss_id = bi.doc_status\n" +
                "    LEFT JOIN C_ORG_DIVISIONS cod ON\n" +
                "        cod.CODV_ID = bi.CODV_ID\n" +
                "UNION ALL\n" +
                "    SELECT\n" +
                "            bo.Bout_TRANSACTIONID AS \"BUF\" \n" +
                "        ,   sd.sdss_name || ' (' || bo.doc_status || ')' \n" +
                "        ,   bo.Bout_WAYBILLNUMBER AS \"TTN\" \n" +
                "        ,   bo.Bout_TRANSACTIONDATE AS \"DATA\" \n" +
                "        ,   bo.BOUT_SAP_DOC_ID AS \"ORDER\"\n" +
                "        ,   cod.CODV_CODE AS \"SAP\" \n" +
                "    FROM\n" +
                "        B_outgoing bo\n" +
                "    LEFT JOIN s_docstatuses sd ON\n" +
                "        sd.sdss_id = bo.doc_status \n" +
                "    LEFT JOIN C_ORG_DIVISIONS cod ON\n" +
                "        cod.CODV_ID = bo.CODV_ID\n" +
                "    ) ba\n" +
                "WHERE\n" +
                "    1 = 1\n" +
              //  "    AND ba.DATA > SYSDATE - 10\n" +
                "    AND (\n" +
                "                ( ba.BUF = '"+buf+"'    OR ba.BUF = '"+buf+"' )\n" +
                "            OR  ( ba.TTN = '"+buf+"'    OR ba.TTN = '"+buf+"' )\n" +
                "            OR  ( ba.SAP = '"+buf+"'    OR ba.SAP = '"+buf+"' ) \n" +
                "        )";
        //Буфер	Статус	ТТН	Дата	Заказ
        String agent = RcToAgent.SapAgent(sap);
        if(Integer.parseInt(agent)<10)agent="0"+agent;
        System.out.println(agent);
        Connection pullConn = ConnectionPool.getInstance().getConnection(agent);

        Statement stmtPullB = pullConn.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        ResultSet rsBacNQ = stmtPullB.executeQuery(sqlQueryBacchus);
        while(rsBacNQ.next()){
            response+=rsBacNQ.getString(1)+"|"; // bufer
            response+=rsBacNQ.getString(2)+"|"; // status
            response+=rsBacNQ.getString(3)+"|"; // TTN
            response+=rsBacNQ.getString(4)+"|"; //  data
            response+=rsBacNQ.getString(5)+"|"; //  order
           // response+=rsBacNQ.getString(6)+"|"; //  sap
        }
        pullConn.close();stmtPullB.close();rsBacNQ.close();
        return response;
    }

    public String getFlowFromNQ(String buf, String sap) throws SQLException, ClassNotFoundException {

        String response="";

        String sqlQueryFlowFromNQ="SELECT \n" +
                "      bhw.REQUEST_CODE\n" +
                "    , bhw.DESCRIPTION\n" +
                "    , bhwl.REQUEST_TEXT\n" +
                "    , RESPONSE_TEXT \n" +
                "FROM alco.BUF_HTTP_WEBSERVICE_LOG bhwl \n" +
                "    LEFT JOIN alco.BUF_HTTP_WEBSERVICE bhw ON BHWL.ID_WEBSERVICE = bhw.id\n" +
                "WHERE \n" +
                "        bhwl.TAG_VALUE ='"+buf+"'\n" +
                "    AND BHWL.DT_CREATED > SYSDATE -20";

        Connection connMag = findAndConnTo_NQ(sap);
        Statement stmtNQ = connMag.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        ResultSet rs = stmtNQ.executeQuery(sqlQueryFlowFromNQ);

        while (rs.next()){
            response+=rs.getString(1)+"|";
            response+=rs.getString(2)+"|";
            response+=rs.getString(3)+"|";
            response+=rs.getString(4)+"|";
            response+="@";
        }



        return response;
    }

}

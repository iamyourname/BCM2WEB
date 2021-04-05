package app.entities;

import java.sql.*;


public class ConnectToMagNQ {

    // Класс для обработки действий с магазинами NQ
    //public static Connection connMagNQ;
    
    public static Connection findAndConnTo_NQ(String sap) throws SQLException, ClassNotFoundException {
        Connection connMagNQ = null;
        String startUrl="ORA-";
        
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
           
              String  urlNQ = "jdbc:oracle:thin:@" + startUrl + ":1521/" + "orcl";
                //System.out.println(urlNQ);
                Class.forName("oracle.jdbc.driver.OracleDriver");
                connMagNQ = DriverManager.getConnection(urlNQ, "sdd", "kjiflm");
                //stmtNQ = connNQ.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
                //return connMagNQ;

            
            // end of connect
        }


        //return connMagNQ;
        return connMagNQ;
    }


      public static String getNQ_Info(String buf, String sap) throws SQLException, ClassNotFoundException {
        String response="";

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
                  "\t AND \tnc.ID_HEADER = '"+buf +"'"+
                  "\t OR\n" +
                  "\t ( nc.ID_HEADER = (SELECT ID_HEADER FROM sdd.BUFHEADER_EXT WHERE EXT_STRING='"+buf+"') \n" +
                  "\t OR nc.ID_HEADER = (SELECT ID_HEADER FROM sdd.DOCHEADER_EXT WHERE EXT_STRING='"+buf+"'))";

          Connection connMag = findAndConnTo_NQ(sap);
          Statement stmtMag = connMag.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
          ResultSet rsMag = stmtMag.executeQuery(sqlQueryBaseInfo);
          while (rsMag.next()){
              //System.out.println(rsMag.getString(7));
              if(rsMag.getString(8).equals("BUF_IDENT_ALCO")){
                  response+=rsMag.getString(1)+"|"; // id_header
                  response+=rsMag.getString(2)+"|"; // status
                  response+=rsMag.getString(3)+"|"; //ru_status
                  response+=rsMag.getString(4)+"|"; //type
                  response+=rsMag.getString(12)+"|"; // bacchus_buf
                  //response+="&";

              }
          }
        connMag.close();
          stmtMag.close();
          rsMag.close();
        //System.out.println(sap);
        //response=findUrlNQ(sap); // нашли

        return response;
    }



}

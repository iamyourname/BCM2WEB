package app.entities;

import java.sql.*;

import static app.entities.ConnectToBD.driverNamePostgres;

public class ConnectToMag {



    public static String goOrNq(String sap) throws SQLException, ClassNotFoundException {
        String response="";
        boolean gk=false;boolean nq=false;
        Connection connGK=null;

        try{
            String urlLog = "jdbc:postgresql://BO-"+sap+":5432/postgres";
            //System.out.println(urlLog);
            Class.forName(driverNamePostgres);
            connGK = DriverManager.getConnection(urlLog, "gkretail", "gkretail");
            Statement stmtGK= connGK.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
            //System.out.println("connecting: " + url);
                gk = true;
                connGK.close();stmtGK.close();
        }
        catch (Exception e){
                gk=false;
            connGK.close();
        }

        if(!gk){
            Connection pullConnNq = ConnectionPool.getInstance().getConnectionNQ("0154");
            Statement stmtPullNq = pullConnNq.createStatement(
                    ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);

            ResultSet rsnq = stmtPullNq.executeQuery("select nickname from sdd.department " +
                    "where id_department in (select id_department from sdd.department_ext where ext_string = '"+sap+"')");
            String resnq = "";
            while (rsnq.next())
                resnq=rsnq.getString(1);
            if(resnq.equals(""))
                resnq="no_NQ";
            pullConnNq.close();stmtPullNq.close();
            return resnq;
        }else{
            return "GK";
        }


    }


    public static Connection  connectionMagGK(String sap){
        Connection connGK = null;
        boolean isConnectedLog = false;
        try {
            String urlLog = "jdbc:postgresql://BO-"+sap+":5432/postgres";
            //System.out.println(urlLog);
            Class.forName(driverNamePostgres);
            connGK = DriverManager.getConnection(urlLog, "gkretail", "gkretail");
            Statement stmtLog = connGK.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
            //System.out.println("connecting: " + url);
            if (connGK.equals(null))
                isConnectedLog = false;
            else
                isConnectedLog = true;
            connGK.setAutoCommit(false);
        } catch (SQLException | ClassNotFoundException e) {
            isConnectedLog = false;
        }
        return connGK;
    }

    public static Connection connectBMagNQ(String nick) throws SQLException {
        //String hostname = "BACCHUS-AGENT";
        boolean isConnectedMagNQ;
        Connection connNQ = null;

        try {
            String urlB = "jdbc:oracle:thin:@ORA-" + nick + ":" + "1521" + "/" + "orcl";
            //System.out.println(urlB);
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection connMag = DriverManager.getConnection(urlB, "sdd", "kjiflm");
            Statement stmtMag = connMag.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
            isConnectedMagNQ = true;
        } catch (ClassNotFoundException | SQLException e) {
            isConnectedMagNQ = false;
            // System.out.println(e.toString());
        }
        return connNQ;
    }

    public static String Mag(String buf, String sap) throws SQLException, ClassNotFoundException {
        String response="";
        String gknq = goOrNq(sap);
        String findNQ = "select \n" +
                "\t\tH.local_id || '-' || to_char(H.creation_timestamp, 'yyyymmddhh24miss')\"bufer\"\n" +
                "\t,\th.status_code \"status\"\n" +
                "\t,\th.creation_timestamp \"Data\"\n" +
                "\t,\th.ttn \"ttn\"\n" +
                "\t,\th.order_number \"order\"\n" +
                "\t,\th.pa_document_state || ' ' ||\n" +
                "    \tCASE\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'NEW'              THEN '-'\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'UPLOAD'              THEN 'Приемка запрещена'\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'MATCHED' and h.typecode = 'DC'         THEN 'Отправьте на подтверждение в ЕГАИС'\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'HEADERMATCHED'  and h.typecode = 'DC'       THEN 'Отправьте на подтверждение в ЕГАИС'\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'MATCHED' and e.finished = 'N' and h.typecode = 'OR'   THEN 'Выполните приемку на ТСД'\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'HEADERMATCHED' and e.finished = 'N' and h.typecode = 'OR'  THEN 'Выполните приемку на ТСД'\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'MATCHED' and e.finished = 'J' and h.typecode = 'OR'   THEN 'Приемка на ТСД выполнена'\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'HEADERMATCHED' and e.finished = 'J' and h.typecode = 'OR'  THEN 'Приемка на ТСД выполнена'\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'BEFORE_BOOKING'            THEN 'Продажа запрещена'\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'BOOKING'              THEN 'Продажа запрещена'\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'BOOKED' and H.PA_EGAIS_STATE = 'CONFIRMED'      THEN 'Продажа разрешена'\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'BOOKED' and H.PA_EGAIS_STATE = 'REJECTED'      THEN 'Акт отказа подтвержден'\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'UPDATE_IDDOC'             THEN '-'\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'DISCREPANCY_TTN_REQUESTED'          THEN 'Отправлен запрос на ТТН ЕГАИС для формирования актов расхождений'\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'DISCREPANCY_TTN_RECEIVED'          THEN 'Получен ответ на запрос на ТТН ЕГАИС для формирования актов расхождений'\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'DISCREPANCY_ACT_REQUESTED'          THEN 'Отправлен акт расхождений в ПА'\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'DISCREPANCY_ACT_RECEIVED'          THEN 'Получен ответ на отправку акта расхождений в ПА'\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'NOT_APPLIED'             THEN 'Не применимо для помарочного учета'\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'SELECT_TTN'             THEN 'Укажите номер ТТН'\n" +
                "                    WHEN H.PA_DOCUMENT_STATE = 'CONNECTIONFAILURE'            THEN 'Нет связи, либо невалидный ответ'\n" +
                "                    ELSE NULL END PA_DOCUMENT_STATE_DESCR\n" +
                "     ,\th.pa_egais_state_timestamp \"LastQuery\"      \n" +
                "\tfrom xrg_gr_doc_header h \n" +
                "LEFT JOIN XRG_GR_DOC_POS p on h.local_id = p.local_id\n" +
                "LEFT JOIN xrg_egais_receipt_header e on h.local_id = e.local_id\n" +
                "where  (\n" +
                "\th.local_id = (split_part('"+buf+"','-',1))::int8\n" +
                "\tor h.ttn ='"+buf+"'\n" +
                " or h.order_number = '"+buf+"') limit 1";
        String fingBacc = "select binc_transactionid\n" +
                ", binc_waybillnumber\n" +
                ", binc_sapordernumber\n" +
                ", doc_status\n" +
                ", binc_transactiondate\n" +
                "from b_incoming where\n" +
                "binc_transactionid = '"+buf+"' or binc_waybillnumber = '"+buf+"' or binc_sapordernumber like ('"+buf+"')";
        if(gknq.equals("GK")){

            Connection cnn = connectionMagGK(sap);
            Statement stmtGK = cnn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet rsGK = stmtGK.executeQuery(findNQ);
            while (rsGK.next()){
                response+=rsGK.getString(1)+"|";
                response+=rsGK.getString(2)+"|";
                response+=rsGK.getString(3)+"|";
                response+=rsGK.getString(4)+"|";
                response+=rsGK.getString(5)+"|";
                response+=rsGK.getString(6)+"|";
                response+=rsGK.getString(7)+"|";
            }
            cnn.close();stmtGK.close();

            String agent = RcToAgent.SapAgent(sap);
            if(Integer.parseInt(agent)<9)agent="0"+agent;
            System.out.println(agent);
            Connection pullConn = ConnectionPool.getInstance().getConnection(agent);
            //String sAg = "";
            Statement stmtPullB = pullConn.createStatement(
                    ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet rsB = stmtPullB.executeQuery(fingBacc);
            response+="&";
            while (rsB.next()){
                response+=rsB.getString(1)+"|";
                response+=rsB.getString(2)+"|";
                response+=rsB.getString(3)+"|";
                response+=rsB.getString(4)+"|";
                response+=rsB.getString(5)+"|";
            }
            pullConn.close();stmtPullB.close();



            return response;
        }else{
            Connection cnnNQ = connectBMagNQ(gknq);
            Statement stmtNQ = cnnNQ.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet rsNQ = stmtNQ.executeQuery("ss");
        }

        System.out.println(goOrNq(sap));





        return response;
    }



}

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

    public static String MagIn(String buf, String sap) throws SQLException, ClassNotFoundException {
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
                "\t or h.ttn ='"+buf+"'\n" +
                " or h.identifier_1 ='"+buf+"'"+
                " or h.order_number = '"+buf+"') limit 1";

        String fingBacc = "select bi.binc_transactionid\n" +
                ", sd.sdss_name||' ('||bi.doc_status ||')'\n" +
                ", bi.binc_waybillnumber\n" +
                ", bi.binc_transactiondate\n" +
                ", bi.binc_sapordernumber\n" +
                "from b_incoming bi\n" +
                "left join s_docstatuses sd on sd.sdss_id = bi.doc_status where "+
                "bi.binc_transactionid = '"+buf+"' or bi.binc_waybillnumber = '"+buf+"' or bi.binc_sapordernumber like ('"+buf+"')";
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

    public static String magOut(String buf, String sap) throws SQLException, ClassNotFoundException {
        String response="";
        String gknq = goOrNq(sap);
        String findNQ = "select \n" +
                "\tH.local_id || '-' || to_char(H.creation_timestamp, 'yyyymmddhh24miss')\"bufer\"\n" +
                "\t,\th.status_code \"status\"\n" +
                "\t,\th.creation_timestamp \"Data\"\n" +
                "\t,\th.internal_document_number \"ttn\"\n" +
                "\t,\th.document_number \"order\"\n" +
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
                "     ,\th.pa_egais_state_timestamp \"LastQuery\"  \n" +
                "     from xrg_trf_dlv_doc_header h\n" +
                "LEFT JOIN XRG_GR_DOC_POS p on h.local_id = p.local_id\n" +
                "LEFT JOIN xrg_egais_receipt_header e on h.local_id = e.local_id\n" +
                "where  (\n" +
                "\th.local_id = (split_part('"+buf+"','-',1))::int8\n" +
                "\tor h.internal_document_number ='"+buf+"'\n" +
                "\tor h.document_number = '"+buf+"'\n" +
                ")";
        String fingBacc = "select bo.bout_transactionid\n" +
                ", bo.doc_status ||' ('||sd.sdss_name ||')'\n" +
                ", bo.bout_waybillnumber\n" +
                ", bo.bout_transactiondate\n" +
                ", bo.bout_ordernumber\n" +
                "from b_outgoing bo \n" +
                "left join s_docstatuses sd on sd.sdss_id = bo.doc_status where "+
                "bo.bout_transactionid = '"+buf+"' or bo.bout_waybillnumber = '"+buf+"' or bo.bout_ordernumber like ('"+buf+"')";
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

    public static String MagStateHistoryOut(String buf, String sap) throws SQLException {
        String response="";

        String findHistory = "select \n" +
                "\t xbi.creation_date\n" +
                "\t,\n" +
                "\tCASE\n" +
                "\t\t\tWHEN xbi.document_state = 'NEW' then 'Новый'\n" +
                "\t\t\tWHEN xbi.document_state = 'CREATED' then 'Создан'\n" +
                "\t\t\tWHEN xbi.document_state = 'READY' then 'Готов'\n" +
                "\t\t\tWHEN xbi.document_state = 'CONFIRMED' then 'Подтвержден'\n" +
                "\t\t\tWHEN xbi.document_state = 'MATCHED' then 'Сопоставлен'\n" +
                "\t\t\tWHEN xbi.document_state = 'NOT_APPLIED' then 'NOT_APPLIED'\n" +
                "\t\t\tWHEN xbi.document_state = 'UPLOAD' then 'Отправлен IN22'\t\n" +
                "\t\t\tELSE xbi.document_state END \"GK_state\"\n" +
                "\t,\n" +
                "\tCASE\n" +
                "\t\t\tWHEN xbi.egais_state = 'CONFIRMING' then 'Подтвержден КИС'\n" +
                "\t\t\tWHEN xbi.egais_state = 'CREATED' then 'Создан'\n" +
                "\t\t\tWHEN xbi.egais_state = 'READY' then 'Готов'\n" +
                "\t\t\tWHEN xbi.egais_state = 'CONFIRMED' then 'Подтвержден ЕГАИС'\n" +
                "\t\t\tWHEN xbi.egais_state = 'MATCHED' then 'Сопоставлен'\n" +
                "\t\t\tWHEN xbi.egais_state = 'NOT_APPLIED' then 'NOT_APPLIED'\n" +
                "\t\t\tWHEN xbi.egais_state = 'NOTMATCHED' then 'Не сопоставлен'\t\n" +
                "\t\t\tELSE xbi.egais_state END \"BC_state\"\n" +
                "from \n" +
                "xrg_bacchus_integration xbi  \n" +
                "where xbi.local_id = (select \n" +
                "\t\tH.local_id \n" +
                "\tfrom xrg_trf_dlv_doc_header h \n" +
                "where  (\n" +
                "\th.local_id = (split_part('"+buf+"','-',1))::int8\n" +
                "\tor h.internal_document_number ='"+buf+"'\n" +
                "\tor h.document_number = '"+buf+"'\n" +
                ") limit 1)\n" +
                "order by 1";

        /* "\tor h.internal_document_number ='"+buf+"'\n" +
                "\tor h.document_number = '"+buf+"'\n" +*/
        Connection cnn = connectionMagGK(sap);
        Statement stmtGK = cnn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        ResultSet rsGK = stmtGK.executeQuery(findHistory);
        while (rsGK.next()){
            response+=rsGK.getString(1)+"|";
            response+=rsGK.getString(2)+"|";
            response+=rsGK.getString(3)+"|";
            response+="&";
        }
        cnn.close();stmtGK.close();


        return response;
    }

    public static String MagStateHistory(String buf, String sap) throws SQLException {
        String response="";

        String findHistory = "select \n" +
                "\txbi.creation_date\n" +
                "\t,\n" +
                "\tCASE\n" +
                "\t\t\tWHEN xbi.document_state = 'NEW' then 'Новый'\n" +
                "\t\t\tWHEN xbi.document_state = 'CREATED' then 'Создан'\n" +
                "\t\t\tWHEN xbi.document_state = 'READY' then 'Готов'\n" +
                "\t\t\tWHEN xbi.document_state = 'CONFIRMED' then 'Подтвержден'\n" +
                "\t\t\tWHEN xbi.document_state = 'MATCHED' then 'Сопоставлен'\n" +
                "\t\t\tWHEN xbi.document_state = 'NOT_APPLIED' then 'NOT_APPLIED'\n" +
                "\t\t\tWHEN xbi.document_state = 'UPLOAD' then 'Отправлен IN22'\t\n" +
                "\t\t\tELSE xbi.document_state END \"GK_state\"\n" +
                "\t,\n" +
                "\tCASE\n" +
                "\t\t\tWHEN xbi.egais_state = 'CONFIRMING' then 'Подтвержден КИС'\n" +
                "\t\t\tWHEN xbi.egais_state = 'CREATED' then 'Создан'\n" +
                "\t\t\tWHEN xbi.egais_state = 'READY' then 'Готов'\n" +
                "\t\t\tWHEN xbi.egais_state = 'CONFIRMED' then 'Подтвержден ЕГАИС'\n" +
                "\t\t\tWHEN xbi.egais_state = 'MATCHED' then 'Сопоставлен'\n" +
                "\t\t\tWHEN xbi.egais_state = 'NOT_APPLIED' then 'NOT_APPLIED'\n" +
                "\t\t\tWHEN xbi.egais_state = 'NOTMATCHED' then 'Не сопоставлен'\t\n" +
                "\t\t\tELSE xbi.egais_state END \"BC_state\"\n" +
                "from \n" +
                "xrg_bacchus_integration xbi  \n" +
                "where xbi.local_id = (select \n" +
                "\t\tH.local_id \n" +
                "\tfrom xrg_gr_doc_header h \n" +
                "where  (\n" +
                "\th.local_id = (split_part('"+buf+"','-',1))::int8\n" +
                "\tor h.identifier_1 ='"+buf+"'\n" +
                "\tor h.order_number = '"+buf+"'\n" +
                ") limit 1)\n" +
                "order by 1";
        Connection cnn = connectionMagGK(sap);
        Statement stmtGK = cnn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        ResultSet rsGK = stmtGK.executeQuery(findHistory);
        while (rsGK.next()){
            response+=rsGK.getString(1)+"|";
            response+=rsGK.getString(2)+"|";
            response+=rsGK.getString(3)+"|";
            response+="&";
        }
        cnn.close();stmtGK.close();


        return response;
    }

    public static String MagBufHistory(String buf, String sap) throws SQLException {
        String response="";

        String flowFindBacc="select al_id, LEAST(al_status_code),\n" +
                "    case \n" +
                "        when al_status_code = 'RA0001' then 'request'\n" +
                "        when al_status_code = 'RA0002' then 'response'\n" +
                "        else al_status_code end \"reqResp\"\n" +
                "        , GREATEST(al_info3),\n" +
                "        case\n" +
                "            when al_info3 = '/supply/receipt/upload' then 'IN21'\n" +
                "            when al_info3 = '/discrepancyReport/TTNGet' then 'DR27'\n" +
                "            when al_info3 = '/ship/updateIdDoc' then 'OUT33' \n" +
                "             when al_info3 = '/ship/confirm' then 'OUT31'  \n" +
                "            when al_info3 = '/supply/receipt/updateIdDoc' then 'IN25'\n" +
                "            when al_info3 = '/supply/receipt/trustConfirm' then 'IN26'\n" +
                "            else al_info3 end \"flown\"\n" +
                "            ,al_maininfo from a_all_log " +
                "where al_codv_id ="+ sap.replaceAll("[a-zA-Z]","") +"\n" +
                "and al_created > sysdate -5\n" +
                " and al_info3 !='/supply/receipt/getStatus' "+
                " and al_info3 !='/ship/getStatusAndErrors' "+
                " and al_info2 !='SupplyReceiptXmlService.getWaybillList()'\n" +
                " and al_maininfo like('%<TransactionID>"+buf+"</TransactionID>%')\n" +
              //  " group by LEAST(al_status_code),GREATEST(al_info3),to_char(al_maininfo)" +
                " order by 1 desc";

        String agent = RcToAgent.SapAgent(sap);
        if(Integer.parseInt(agent)<9)agent="0"+agent;
        System.out.println(agent);
        Connection pullConn = ConnectionPool.getInstance().getConnection(agent);
        //String sAg = "";
        Statement stmtPullB = pullConn.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        ResultSet rsF = stmtPullB.executeQuery(flowFindBacc);
        //rsB.last();int cntFlow = rsB.getRow();rsB.first();
        //String[][] flows = new String[cntFlow][2];

        while (rsF.next()){

            /*if(rsF.getString(1).equals("RA0001"))
                response+="request|";
            else
                response+="response|";
            switch (rsF.getString(2)){
                case "/supply/receipt/upload":
                    response+="IN21|";
                    break;
                case "/supply/receipt/updateIdDoc":
                    response+="IN25|";
                    break;
                case "/supply/receipt/trustConfirm":
                    response+="IN26|";
                    break;
                case "/discrepancyReport/TTNGet":
                    response+="DR27|";
                    break;
            }
            */

            response+=rsF.getString(3)+"|";
            response+=rsF.getString(5)+"|";
            if(rsF.getString(3).equals("response"))
                response+="<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n"+rsF.getString(6).replaceAll("><",">\n<");

            else
                response+=rsF.getString(6);
            response+="~";

        }

        //response=response.replaceAll("<","&lt;");response=response.replaceAll(">","&gt;");


        pullConn.close();stmtPullB.close();rsF.close();




        return response;
    }


}

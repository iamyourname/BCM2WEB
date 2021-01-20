package app.entities;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.sql.*;

public class SendUTM {

    public static String findUtmAgent(String sap) throws SQLException {
        String response="";

        String sqlfindUtm="select co.codv_iputm\n" +
                "    , co.codv_iputm2\n" +
                "    , co.codv_iputmindex\n" +
                "    , aa.a_agent_id\n" +
                "    from c_org_divisions co\n" +
                "left join a_agents_org_divisions_rel aa on aa.codv_id = co.codv_id\n" +
                "where co.codv_code = '"+sap+"'";


        Connection pullConn = ConnectionPool.getInstance().getConnection("02");
        Statement stmtPullB = pullConn.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        ResultSet rsPullB = stmtPullB.executeQuery(sqlfindUtm);
        while(rsPullB.next()){
            String utm_1 = rsPullB.getString(1);
            String utm_2 = rsPullB.getString(2);
            String index_utm = rsPullB.getString(3);


            if(Integer.parseInt(index_utm)==1){
                response = utm_1;
            }else{
                response = utm_2;
            }
        }

        pullConn.close();
        stmtPullB.close();

        return response;
    }

    public static String sendFileToUtm(String pathToUtm) throws ParserConfigurationException, IOException, SAXException {
        String replyId = "";

        String docPath="";


        DocumentBuilder documentBuilder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
        Document document = documentBuilder.parse("E:\\Progs\\TomCat_9\\webapps\\test\\files_utm\\temp_xml.xml");
        NodeList docType = document.getElementsByTagName("ns:Document");
        NodeList docTypeL = docType.item(0).getChildNodes();
        String dType = docTypeL.item(1).getNodeName().substring(3);

        /*

         switch (docType.toLowerCase()) {
            case 'confirmticket':
                docType = 'WayBillTicket';
                console.log('change document type to: [' + docType + "]");
                break;
            case 'queryclients':
                docType = 'QueryPartner';
                console.log('change document type to: [' + docType + "]");
                break;
            case 'queryformbhistory':
                docType = 'QueryHistoryFormB';
                console.log('change document type to: [' + docType + "]");
                break;
            case 'ascpnav':
                docType = 'ASCPNavigation';
                console.log('change document type to: [' + docType + "]");
                break;
        }

         */

        if(dType.equalsIgnoreCase("confirmticket")){
             docPath = "WayBillTicket";
            System.out.println(docPath);
        }

        if(dType.equalsIgnoreCase("queryclients")){
            docPath = "QueryPartner";
            System.out.println(docPath);
        }

        if(dType.equalsIgnoreCase("queryformbhistory")){
            docPath = "QueryHistoryFormB";
            System.out.println(docPath);
        }

        if(dType.equalsIgnoreCase("ascpnav")){
            docPath = "ASCPNavigation";
            System.out.println(docPath);
        }

        if(dType.equalsIgnoreCase("waybillact_v3")){
            docPath = "WayBillAct_v3";
            System.out.println(docPath);
        }


        HttpRequest request = HttpRequest.post("http://"+pathToUtm+"/opt/in/"+docPath);

        File file = new File("E:\\Progs\\TomCat_9\\webapps\\test\\files_utm\\temp_xml.xml");



        request.part("xml_file", file);

        int status = request.code();

        if (status==200){
            replyId=request.body();

            File fileResp = new File("E:\\Progs\\TomCat_9\\webapps\\test\\files_utm\\temp_xml_resp.xml");

            if(file.exists()){
                fileResp.delete();
            }

            fileResp.createNewFile();
            FileWriter fileWriter = new FileWriter(fileResp);
            fileWriter.append(replyId);
            fileWriter.close();

            Document documentResp = documentBuilder.parse(fileResp);
            //NodeList replyResp = document.getElementsByTagName("url");
            NodeList replyResp = documentResp.getElementsByTagName("url");
            replyId=replyResp.item(0).getTextContent();

            request.closeOutput();

        }



        return replyId;
    }

    public static String checkUtmTicket(String sap, String reply) throws SQLException, IOException {
        String resp="";

        String agent = "";

        String checkTicketSql = "select * from b_utmdocs where bud_utm_reply_id = '" + reply + "'";


        String sqlfindUtm="select aa.a_agent_id\n" +
                "    from c_org_divisions co\n" +
                "left join a_agents_org_divisions_rel aa on aa.codv_id = co.codv_id\n" +
                "where co.codv_code = '"+sap+"'";


        Connection pullConn = ConnectionPool.getInstance().getConnection("02");
        Statement stmtPullB = pullConn.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        ResultSet rsPullB = stmtPullB.executeQuery(sqlfindUtm);
        while(rsPullB.next()){
            agent = rsPullB.getString(1);

            }

        pullConn.close();
        stmtPullB.close();
        if(Integer.parseInt(agent)<9)agent="0"+agent;

         pullConn = ConnectionPool.getInstance().getConnection(agent);
         stmtPullB = pullConn.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
         rsPullB = stmtPullB.executeQuery(checkTicketSql);
        //ConnectionPool.getInstance().getConnection(godagent).close();
        //System.out.println("Find");
        ResultSetMetaData rsdata = rsPullB.getMetaData();
        int siz = rsdata.getColumnCount();
        rsPullB.last();
        int countrows = rsPullB.getRow();

        if(countrows ==0){
            resp="Тикеты не найдены. Попробуйте через 30 сек.";
            //WaybillChange("2651227","0121");
            pullConn.close();
            stmtPullB.close();
            return resp;
        }else{

            Object[] colNames = new String[siz];
            Object[][] data = new Object[countrows][siz];

            rsPullB.beforeFirst();
            for (int i=0; i<siz; i++) {
                colNames[i] = rsdata.getColumnName(i+1);
            }
            int id=0;
            while (rsPullB.next()){

                for (int iii=0;iii<siz;iii++) {
                    if(rsPullB.getString((String) colNames[iii])==null){
                        data[id][iii]="null";
                    }else{
                        data[id][iii] = rsPullB.getString((String) colNames[iii]);
                    }
                }
                File replyF = new File("E:\\Progs\\TomCat_9\\webapps\\test\\files_utm\\"+data[id][2].toString().replace("/","_")+".xml");
                if(replyF.exists()){
                    replyF.delete();
                }
                replyF.createNewFile();

                Charset cs = StandardCharsets.UTF_8;

                OutputStreamWriter writerOldWay = new OutputStreamWriter(new FileOutputStream(replyF,false),cs);
                //FileWriter wOldWay = new FileWriter(oldWay,cs,false);
                writerOldWay.append(data[id][8].toString());
                writerOldWay.close();

                /*
                 FileWriter fileWriter = new FileWriter(replyF);
                    fileWriter.append(data[id][8].toString());
                    fileWriter.close();
                 */



                resp += data[id][2].toString() +"|"+data[id][8].toString() + "&";
                id++;

            }

            pullConn.close();
            stmtPullB.close();
        }
        pullConn.close();
        stmtPullB.close();


        return resp;
    }


}

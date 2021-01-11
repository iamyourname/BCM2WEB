package app.entities;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

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



        return response;
    }

    public static String sendFileToUtm(String pathToUtm) throws ParserConfigurationException, IOException, SAXException {
        String replyId = "";

        String docPath="";


        DocumentBuilder documentBuilder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
        Document document = documentBuilder.parse("E:\\Progs\\TomCat_9\\files_utm\\temp_xml.xml");
        NodeList docType = document.getElementsByTagName("ns:Document");
        NodeList docTypeL = docType.item(0).getChildNodes();
        String dType = docTypeL.item(1).getNodeName().substring(3);

        if(dType.equals("QueryFormBHistory")){
             docPath = "QueryHistoryFormB";
            System.out.println(docPath);
        }


        HttpRequest request = HttpRequest.post("http://"+pathToUtm+"/opt/in/"+docPath);

        File file = new File("E:\\Progs\\TomCat_9\\files_utm\\temp_xml.xml");



        request.part("xml_file", file);

        int status = request.code();

        if (status==200){
            replyId=request.body();
        }



        return replyId;
    }




}

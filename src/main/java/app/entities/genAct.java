package app.entities;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.Date;

public class genAct {

public static int actNumber = 1;

    public static String genXmlAct(String act, String sap) throws SQLException, IOException {
        actNumber++;
        int ident = (int) Math.round(1000+actNumber*Math.random());
        System.out.println("genXmlAct"+" "+act+" "+sap);
        Date dateNow = new Date();
        SimpleDateFormat formatForDateNow = new SimpleDateFormat("yyyy-MM-dd");
        String response="";
        String sqlAct="SELECT ad.EFB_F2REGID, ba.BAMC_AMC\n" +
                "FROM B_ACCEPTANCE a\n" +
                "join B_ACCEPTANCE_DETAILS ad ON A.BACC_ID = ad.BACC_ID and ad.EFB_F2REGID is not null\n" +
                "join B_ACCEPTANCE_DETAILS_BAMC_REL adbr ON ad.BACD_ID = adbr.BACD_ID\n" +
                "join B_AMC ba ON A.CODV_ID = ba.CODV_ID and adbr.BAMC_LID = ba.BAMC_LID\n" +
                "WHERE BACC_TRANSACTIONID = '"+act+"' ORDER BY 1";

        String actStr="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                "<ns:Documents Version=\"1.0\"\n" +
                "    xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n" +
                "    xmlns:ns= \"http://fsrar.ru/WEGAIS/WB_DOC_SINGLE_01\"\n" +
                "    xmlns:pref=\"http://fsrar.ru/WEGAIS/ProductRef_v2\"\n" +
                "    xmlns:awr=\"http://fsrar.ru/WEGAIS/ActFixBarCode\"\n" +
                "    xmlns:ce=\"http://fsrar.ru/WEGAIS/CommonV3\">\n" +
                "    <ns:Owner>\n" +
               // "        <ns:FSRAR_ID>"+"020000656851"+"</ns:FSRAR_ID>\n"+
                "        <ns:FSRAR_ID>"+getFSRAR(sap)+"</ns:FSRAR_ID>\n"+
                " </ns:Owner>\n" +              //добавить счетчик актов и identity
                "    <ns:Document>\n" +
                "        <ns:ActFixBarCode>\n" +
                "            <awr:Identity>"+ident+"</awr:Identity>\n" +
                "            <awr:Header>\n" +
                "                <awr:Number>"+actNumber+"</awr:Number>\n" +
                "                <awr:ActDate>"+formatForDateNow.format(dateNow)+"</awr:ActDate>\n" +
                "                <awr:Note>111</awr:Note>\n" +
                "            </awr:Header>\n" +
                "            <awr:Content>\n";

        String agent = RcToAgent.SapAgent(sap);
        if(Integer.parseInt(agent)<10)agent="0"+agent;

        Connection pullConn = ConnectionPool.getInstance().getConnection(agent);

        Statement stmtPullB = pullConn.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        ResultSet rs = stmtPullB.executeQuery(sqlAct);

        rs.last();int count = rs.getRow();rs.beforeFirst();
        String arrF[] = new String[count+1];int i =1;
        arrF[0]="null";
        String xmlS="";
        while (rs.next()){
            if(arrF[i - 1].equals(rs.getString(1))){
                xmlS+=rs.getString(2)+",";
            }else{
                arrF[i]=rs.getString(1);
                xmlS+="&"+arrF[i]+","+rs.getString(2)+",";
                //System.out.println(arrF[i]);
                i++;
            }

        }

        String cnt[] = xmlS.split("&");

        for(int ii=1; ii < cnt.length; ii++){
            String fAMC[] = cnt[ii].split(",");
                actStr+="<awr:Position>\n" +
                        "<awr:Identity>"+ii+"</awr:Identity>\n";
                actStr+="<awr:Inform2RegId>"+fAMC[0]+"</awr:Inform2RegId>\n" +
                        "<awr:MarkInfo>\n";
                    for(int iii=1;iii<fAMC.length;iii++){
                        actStr+="<ce:amc>"+fAMC[iii]+"</ce:amc>\n";
                    }
                    actStr+="</awr:MarkInfo>\n" +
                            "</awr:Position>\n";
        }

        actStr+="</awr:Content>\n" +
                "        </ns:ActFixBarCode>\n" +
                "   </ns:Document>\n" +
                "</ns:Documents>";




        File xmlActDir = new File("E:\\Progs\\TomCat_9\\webapps\\test\\xmlAct");
        if(!xmlActDir.exists())
            xmlActDir.mkdir();

        File xmlAct = new File("E:\\Progs\\TomCat_9\\webapps\\test\\xmlAct\\"+ act+"_"+sap+"_"+count+".xml");


        xmlAct.createNewFile();
        FileWriter xmlActIn = new FileWriter(xmlAct);
        xmlActIn.append(actStr);
        xmlActIn.close();



        String utmPath = SendUTM.findUtmAgent(sap);

        //HttpRequest request = HttpRequest.post("http://"+utmPath+"/opt/in/"+"ActFixBarCode");

        String urlToConnect = "http://"+utmPath+"/opt/in/"+"ActFixBarCode";
        String boundary = Long.toHexString(System.currentTimeMillis());
        URLConnection connection = new URL(urlToConnect).openConnection();
        connection.setDoOutput(true);
        connection.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
        PrintWriter writer = null;

        try{
            writer = new PrintWriter(new OutputStreamWriter(connection.getOutputStream(), StandardCharsets.UTF_8));
            // File file = new File("C:/Users/M.Moiseev-2/IdeaProjects/filepost/src/com/company/fld/ActFixBarCode.xml");
            File file =
                    new File("E:\\Progs\\TomCat_9\\webapps\\test\\xmlAct\\"+ act+"_"+sap+"_"+count+".xml");
            //  for (File file : Objects.requireNonNull(dir.listFiles())) {
            //    if (file.isDirectory()) {
            //      continue;
            //  }
            //System.out.println(file.getName());
            writer.println("------" + boundary);
            writer.println("Content-Disposition: form-data; name=\"xml_file\"; filename=\"" + file.getName() + "\"");
            writer.println("Content-Type: text/xml;charset=UTF-8"); // ?

            writer.println();
            BufferedReader reader = null;
            try {
                reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), StandardCharsets.UTF_8));
                for (String line; (line = reader.readLine()) != null; ) {
                    writer.println(line);
                    //System.out.println(line);

                }
            } finally {
                //System.out.println("51"+ee.toString());
                if (reader != null) {
                    reader.close();
                }
            }
            // }
            writer.println("--" + boundary + "--");
        }finally {
            //System.out.println("59"+e.toString());
            if (writer != null) writer.close();
        }


        BufferedReader in = new BufferedReader(
                new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8));
        String inputLine = "";
        StringBuffer responseList = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            responseList.append(inputLine + "\n");
        }

        in.close();
        inputLine = String.valueOf(responseList);
        //inputLine = inputLine.replace("><", ">\n<");

        int responseCode = ((HttpURLConnection) connection).getResponseCode();

        try{
            DocumentBuilder documentBuilder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
            File fileResp = new File("E:\\Progs\\TomCat_9\\webapps\\test\\xmlAct\\"+ act+"_"+sap+"_"+count+"_resp.xml");

            if(fileResp.exists()){
                fileResp.delete();
                FileWriter fileWriter = new FileWriter(fileResp);
                fileWriter.append(inputLine);
                fileWriter.close();
            }else{
                fileResp.createNewFile();
                FileWriter fileWriter = new FileWriter(fileResp);
                fileWriter.append(inputLine);
                fileWriter.close();
            }
            Document documentResp = documentBuilder.parse(fileResp);
            //NodeList replyResp = document.getElementsByTagName("url");
            NodeList replyResp = documentResp.getElementsByTagName("url");
           String replyId=replyResp.item(0).getTextContent();
            String respPath=act+"_"+sap+"_"+count+".xml";
            System.out.println(responseCode+"&"+respPath+"&"+replyId);


            return responseCode+"&"+respPath+"&"+replyId;

        }catch (ParserConfigurationException | SAXException e){
            System.out.println(e.toString());
        }






        return ""+responseCode;
    }

    public static String genXmlActEdit(String act, String sap, String fOut, String amcOut) throws SQLException, IOException {
        actNumber++;
        int ident = (int) Math.round(1000+actNumber*Math.random());
        System.out.println("genXmlAct"+" "+act+" "+sap);
        Date dateNow = new Date();
        SimpleDateFormat formatForDateNow = new SimpleDateFormat("yyyy-MM-dd");
        String response="";
        String sqlAct = "";
        String sqlActHead="SELECT ad.EFB_F2REGID, ba.BAMC_AMC\n" +
                "FROM B_ACCEPTANCE a\n" +
                "join B_ACCEPTANCE_DETAILS ad ON A.BACC_ID = ad.BACC_ID and ad.EFB_F2REGID is not null\n" +
                "join B_ACCEPTANCE_DETAILS_BAMC_REL adbr ON ad.BACD_ID = adbr.BACD_ID\n" +
                "join B_AMC ba ON A.CODV_ID = ba.CODV_ID and adbr.BAMC_LID = ba.BAMC_LID\n" +
                "WHERE BACC_TRANSACTIONID = '"+act+"'";
        String sqlActNotF = " AND ad.EFB_F2REGID NOT IN ";
        String sqlActNotA = " AND ba.BAMC_AMC NOT IN ";
        String sqlActOrder = " order by 1 ";

        if(fOut.equals("")){
            sqlAct+=sqlActHead + " ";
        }else{
            String[] arrFout = fOut.split("!");
            sqlActNotF+="(";

            for(int i =0;i<arrFout.length;i++){
                if(i==(arrFout.length-1)){
                    sqlActNotF+="'"+arrFout[i]+"'";
                }else{
                    sqlActNotF+="'"+arrFout[i]+"',";
                }
            }

            sqlAct+=sqlActHead + " " + sqlActNotF + ")";
        }

        if(amcOut.equals("")){
            sqlAct+=" "+sqlActOrder;
        }else{
            String[] arrAmc = amcOut.split("!");
            sqlActNotA+="(";

            for(int i =0;i<arrAmc.length;i++){
                if(i==(arrAmc.length-1)){
                    sqlActNotA+="'"+arrAmc[i]+"'";
                }else{
                    sqlActNotA+="'"+arrAmc[i]+"',";
                }
            }

            sqlAct+=" " + sqlActNotA + ")" + sqlActOrder;
        }

        System.out.println(sqlAct);

        String actStr="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                "<ns:Documents Version=\"1.0\"\n" +
                "    xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n" +
                "    xmlns:ns= \"http://fsrar.ru/WEGAIS/WB_DOC_SINGLE_01\"\n" +
                "    xmlns:pref=\"http://fsrar.ru/WEGAIS/ProductRef_v2\"\n" +
                "    xmlns:awr=\"http://fsrar.ru/WEGAIS/ActFixBarCode\"\n" +
                "    xmlns:ce=\"http://fsrar.ru/WEGAIS/CommonV3\">\n" +
                "    <ns:Owner>\n" +
                // "        <ns:FSRAR_ID>"+"020000656851"+"</ns:FSRAR_ID>\n"+
                "        <ns:FSRAR_ID>"+getFSRAR(sap)+"</ns:FSRAR_ID>\n"+
                " </ns:Owner>\n" +              //добавить счетчик актов и identity
                "    <ns:Document>\n" +
                "        <ns:ActFixBarCode>\n" +
                "            <awr:Identity>"+ident+"</awr:Identity>\n" +
                "            <awr:Header>\n" +
                "                <awr:Number>"+actNumber+"</awr:Number>\n" +
                "                <awr:ActDate>"+formatForDateNow.format(dateNow)+"</awr:ActDate>\n" +
                "                <awr:Note>111</awr:Note>\n" +
                "            </awr:Header>\n" +
                "            <awr:Content>\n";

        String agent = RcToAgent.SapAgent(sap);
        if(Integer.parseInt(agent)<10)agent="0"+agent;

        Connection pullConn = ConnectionPool.getInstance().getConnection(agent);

        Statement stmtPullB = pullConn.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        ResultSet rs = stmtPullB.executeQuery(sqlAct);

        rs.last();int count = rs.getRow();rs.beforeFirst();
        String arrF[] = new String[count+1];int i =1;
        arrF[0]="null";
        String xmlS="";
        while (rs.next()){
            if(arrF[i - 1].equals(rs.getString(1))){
                xmlS+=rs.getString(2)+",";
            }else{
                arrF[i]=rs.getString(1);
                xmlS+="&"+arrF[i]+","+rs.getString(2)+",";
                //System.out.println(arrF[i]);
                i++;
            }

        }

        String cnt[] = xmlS.split("&");

        for(int ii=1; ii < cnt.length; ii++){
            String fAMC[] = cnt[ii].split(",");
            actStr+="<awr:Position>\n" +
                    "<awr:Identity>"+ii+"</awr:Identity>\n";
            actStr+="<awr:Inform2RegId>"+fAMC[0]+"</awr:Inform2RegId>\n" +
                    "<awr:MarkInfo>\n";
            for(int iii=1;iii<fAMC.length;iii++){
                actStr+="<ce:amc>"+fAMC[iii]+"</ce:amc>\n";
            }
            actStr+="</awr:MarkInfo>\n" +
                    "</awr:Position>\n";
        }

        actStr+="</awr:Content>\n" +
                "        </ns:ActFixBarCode>\n" +
                "   </ns:Document>\n" +
                "</ns:Documents>";




        File xmlActDir = new File("E:\\Progs\\TomCat_9\\webapps\\test\\xmlAct");
        if(!xmlActDir.exists())
            xmlActDir.mkdir();

        File xmlAct = new File("E:\\Progs\\TomCat_9\\webapps\\test\\xmlAct\\"+ act+"_"+sap+"_"+count+"_edit.xml");


        xmlAct.createNewFile();
        FileWriter xmlActIn = new FileWriter(xmlAct);
        xmlActIn.append(actStr);
        xmlActIn.close();


        /*  Sending

            String utmPath = SendUTM.findUtmAgent(sap);

        //HttpRequest request = HttpRequest.post("http://"+utmPath+"/opt/in/"+"ActFixBarCode");

        String urlToConnect = "http://"+utmPath+"/opt/in/"+"ActFixBarCode";
        String boundary = Long.toHexString(System.currentTimeMillis());
        URLConnection connection = new URL(urlToConnect).openConnection();
        connection.setDoOutput(true);
        connection.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
        PrintWriter writer = null;

        try{
            writer = new PrintWriter(new OutputStreamWriter(connection.getOutputStream(), StandardCharsets.UTF_8));
            // File file = new File("C:/Users/M.Moiseev-2/IdeaProjects/filepost/src/com/company/fld/ActFixBarCode.xml");
            File file =
                    new File("E:\\Progs\\TomCat_9\\webapps\\test\\xmlAct\\"+ act+"_"+sap+"_"+count+".xml");
            //  for (File file : Objects.requireNonNull(dir.listFiles())) {
            //    if (file.isDirectory()) {
            //      continue;
            //  }
            //System.out.println(file.getName());
            writer.println("------" + boundary);
            writer.println("Content-Disposition: form-data; name=\"xml_file\"; filename=\"" + file.getName() + "\"");
            writer.println("Content-Type: text/xml;charset=UTF-8"); // ?

            writer.println();
            BufferedReader reader = null;
            try {
                reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), StandardCharsets.UTF_8));
                for (String line; (line = reader.readLine()) != null; ) {
                    writer.println(line);
                    //System.out.println(line);

                }
            } finally {
                //System.out.println("51"+ee.toString());
                if (reader != null) {
                    reader.close();
                }
            }
            // }
            writer.println("--" + boundary + "--");
        }finally {
            //System.out.println("59"+e.toString());
            if (writer != null) writer.close();
        }


        BufferedReader in = new BufferedReader(
                new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8));
        String inputLine = "";
        StringBuffer responseList = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            responseList.append(inputLine + "\n");
        }

        in.close();
        inputLine = String.valueOf(responseList);
        //inputLine = inputLine.replace("><", ">\n<");

        int responseCode = ((HttpURLConnection) connection).getResponseCode();

        try{
            DocumentBuilder documentBuilder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
            File fileResp = new File("E:\\Progs\\TomCat_9\\webapps\\test\\xmlAct\\"+ act+"_"+sap+"_"+count+"_resp.xml");

            if(fileResp.exists()){
                fileResp.delete();
            }else{
                fileResp.createNewFile();
                FileWriter fileWriter = new FileWriter(fileResp);
                fileWriter.append(inputLine);
                fileWriter.close();
            }
            Document documentResp = documentBuilder.parse(fileResp);
            //NodeList replyResp = document.getElementsByTagName("url");
            NodeList replyResp = documentResp.getElementsByTagName("url");
            String replyId=replyResp.item(0).getTextContent();
            String respPath=act+"_"+sap+"_"+count+".xml";
            System.out.println(responseCode+"&"+respPath+"&"+replyId);


            return responseCode+"&"+respPath+"&"+replyId;

        }catch (ParserConfigurationException | SAXException e){
            System.out.println(e.toString());
        }



         */








        return "200!"+actStr+"!"+xmlS;
    }


    public static String getFSRAR(String sap) throws SQLException {


        System.out.println("getFsrar"+sap);
        String findFS="SELECT FSRAR_ID \n" +
                "FROM C_ORG_DIVISIONS \n" +
                "WHERE CODV_CODE = '"+sap+"'";

        String agent = RcToAgent.SapAgent(sap);
        if(Integer.parseInt(agent)<10)agent="0"+agent;

        Connection pullConn = ConnectionPool.getInstance().getConnection(agent);

        Statement stmtPullB = pullConn.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        ResultSet rsF = stmtPullB.executeQuery(findFS);

        String fsrar="";
        while(rsF.next()){
            fsrar= rsF.getString(1);
        }

        pullConn.close();
        stmtPullB.close();
        return fsrar;
    }

    public static String checkReply(String reply, String sap) throws SQLException {
        String agent = "";

        String checkTicketSql = "select BUD_URL, DOC_ADDDATE, BUD_BODY , BUD_REG_ID from b_utmdocs where bud_utm_reply_id = '" + reply + "'";


        String sqlfindUtm="select aa.a_agent_id\n" +
                "    from c_org_divisions co\n" +
                "left join a_agents_org_divisions_rel aa on aa.codv_id = co.codv_id\n" +
                "where co.codv_code = '"+sap+"'";


        Connection pullConn = ConnectionPool.getInstance().getConnection("06");
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

        rsPullB.last();
        int countrows = rsPullB.getRow();
        rsPullB.beforeFirst();
        String resp="";
        if(countrows ==0){
            resp="Тикеты не найдены. Попробуйте через 30 сек.";
            //WaybillChange("2651227","0121");
            pullConn.close();
            stmtPullB.close();
            return resp;
        }else{
            resp="";
            while (rsPullB.next()){
                resp+=rsPullB.getString(1)+"|";
                resp+=rsPullB.getString(2)+"|";
                resp+=rsPullB.getString(3)+"|";
                resp+=rsPullB.getString(4)+"|";
                resp+="&";
            }
            return resp;
        }
    }

}

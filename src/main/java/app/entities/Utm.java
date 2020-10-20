package app.entities;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.sql.*;
import java.util.function.IntBinaryOperator;
//import HttpRequest.

public class Utm {

    public static String WaybillReject (String WRBuf, String WRSap) throws SQLException, IOException {


        String hat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                "<ns:Documents Version=\"1.0\"\n" +
                "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n" +
                "xmlns:ns=\"http://fsrar.ru/WEGAIS/WB_DOC_SINGLE_01\"\n" +
                "xmlns:qp=\"http://fsrar.ru/WEGAIS/QueryParameters\">\n" +
                "<ns:Owner>\n" +
                "<ns:FSRAR_ID>";
        String wbody = "</ns:FSRAR_ID>\n" +
                "</ns:Owner>\n" +
                "<ns:Document>\n" +
                "<ns:QueryFormBHistory>\n" +
                "<qp:Parameters>\n" +
                "<qp:Parameter>\n" +
                "<qp:Name>RFB</qp:Name>\n" +
                "<qp:Value>FB-000003180568943</qp:Value>\n" +
                "</qp:Parameter>\n" +
                "</qp:Parameters>\n" +
                "</ns:QueryFormBHistory>\n" +
                "</ns:Document>\n" +
                "</ns:Documents>";


        String reply_id = "";

        String findUtm = "select co.codv_iputm, co.codv_iputm2, co.codv_iputmindex, co.fsrar_id, ew.ewbh_wbregid from b_outgoing bo\n" +
                "left join c_org_divisions co on co.codv_id = bo.codv_id\n" +
                "left join e_waybill ew on ew.ewbh_id = bo.ewbh_id\n" +
                "where 1=1\n" +
                "and bo.doc_adddate > sysdate -3\n" +
                "and co.codv_code = '" + WRSap + "'\n" +
                "and bout_transactionid = '" + WRBuf + "'";

        Connection pullConn = ConnectionPool.getInstance().getConnection("02");
        Statement stmtPullB = pullConn.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        ResultSet rsPullB = stmtPullB.executeQuery(findUtm);
        //ConnectionPool.getInstance().getConnection(godagent).close();
        //System.out.println("Find");
        ResultSetMetaData rsdata = rsPullB.getMetaData();
        int siz = rsdata.getColumnCount();
        rsPullB.last();
        int countrows = rsPullB.getRow();
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
            id++;
        }
        //co.codv_iputm, co.codv_iputm2, co.codv_iputmindex, co.fsrar_id, ew.ewbh_wbregid

        String ipUtm = data[0][0].toString();
        if(data[0][2].toString().equals("2"))ipUtm = data[0][1].toString();


        URL obj = new URL("http://"+ipUtm+"/opt/in/QueryHistoryFormB");

        File waybillReject = new File("E:\\Progs\\TomCat_9\\waybills\\reject"+data[0][4].toString()+".xml");

        HttpURLConnection  con = (HttpURLConnection) obj.openConnection();

        //System.out.println(url);



        try
        {
            boolean created = waybillReject.createNewFile();
            if(created)
                System.out.println("File has been created");

            FileWriter waybillIn = new FileWriter(waybillReject, true);
            waybillIn.write(hat+data[0][3].toString()+wbody);
            waybillIn.flush();waybillIn.close();

            con.setDoOutput(true);

            OutputStream os = con.getOutputStream();
            String textWay = hat+data[0][3].toString()+wbody;
            byte[] waybillb = textWay.getBytes();
            os.write(waybillb);
            os.flush();os.close();

            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "text/xml");
            con.setRequestProperty("Accept", "text/xml");
            //con.setRequestProperty("xml_file", Bi File("E:\\Progs\\TomCat_9\\waybills\\reject\\"+data[0][4].toString()+".xml"));
            con.setRequestProperty("xml_file", String.valueOf(new File("E:\\Progs\\TomCat_9\\waybills\\reject\\"+data[0][4].toString()+".xml")));

            InputStream inputStream = con.getInputStream();
            byte[] res = new byte[2048];
            int i = 0;
            StringBuilder response = new StringBuilder();
            while ((i = inputStream.read(res)) != -1) {
                response.append(new String(res, 0, i));
            }
            inputStream.close();

            System.out.println("Response= " + response.toString());
            reply_id = response.toString();

        }
        catch(IOException ex){
            reply_id=ex.getMessage();
            System.out.println(ex.getMessage());
        }



        return reply_id;
    }






}

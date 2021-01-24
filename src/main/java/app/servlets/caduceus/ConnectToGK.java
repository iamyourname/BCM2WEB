package app.servlets.caduceus;

import app.entities.ConnectionPool;
import app.servlets.NTLMUserFilter;

import java.sql.*;

import static app.entities.ConnectToBD.driverNamePostgres;
import static app.entities.Logs.writeLogMain;
import static app.entities.Logs.writeLogParent;

public class ConnectToGK {

    public static Connection  connectionGK(String sap){
        Connection gk =null;

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
            //err = "SQLException\n" + e.getMessage();
            isConnectedLog = false;
        }



        return connGK;
    }

    public static String compare_cert(String sap, String cert) throws SQLException {

        String responseGK="";
        String responseK="";
        String certToCompare="";
        String userCerts="";

        String[] arrCerts= cert.split("\\|");


       // int countOfCerts = cert.length() / 32;

        //String[] arrCerts= new String[countOfCerts];

        for(int i=0;i<arrCerts.length;i++){
            StringBuffer sb = new StringBuffer(arrCerts[i]);
            sb.insert(8,"-");sb.insert(13,"-");sb.insert(18,"-");sb.insert(23,"-");
            certToCompare += "'"+sb+"',";
            userCerts += sb+"|";
        }

        certToCompare+="|";certToCompare=certToCompare.replace("',|","'");
        userCerts+="|";userCerts=userCerts.replace("',|","'");

       /* if(countOfCerts>=32){
            System.out.println("1");
            certToCompare = arrCerts[0];
        }else{
            System.out.println(countOfCerts);
            for (int i=0; i < arrCerts.length;i++){
                arrCerts[i] = cert.substring(i*32,(32*(i+1)));
                StringBuffer sb = new StringBuffer(arrCerts[i]);
                sb.insert(8,"-");sb.insert(13,"-");sb.insert(18,"-");sb.insert(23,"-");
                arrCerts[i] = cert.substring(i*32,(32*(i+1)));
                certToCompare += "'"+sb+"',";
                userCerts += sb+"|";

            }
            certToCompare+="|";certToCompare=certToCompare.replace("',|","'");
            userCerts+="|";userCerts=userCerts.replace("',|","'");
        }
        */

        System.out.println(certToCompare);

        String findCertGK = "select vet_doc_uuid from xrg_evsd where vet_doc_uuid in ("+certToCompare+") order by 1";




        String findCertK = "select mv.mgen_uuid, co.codv_code,mv.MVDC_PRODUCTCODE from M_VETDOCUMENT mv\n" +
                "left join c_org_divisions co on co.MENT_GUID = mv.MVDC_CONS_CONSIGNEE_ENTERPRISE\n" +
                "where\n" +
                " mv.mgen_uuid in ("+certToCompare+") order by 1";

        Connection pullConn = ConnectionPool.getInstance().getConnectionMerc();

        Connection conn = connectionGK(sap);

        StringBuffer sb = new StringBuffer(cert.replace("-",""));

        String jsonOptions =
                "{\"SAP\":\"" + sap + "\"," +
                        "\"FROM\":\"WEB\"}"; // multi

        writeLogMain(NTLMUserFilter.getUserName(),"CADUCEUS","ПОИСК",
                "СЕРТИФИКАТОВ",
                jsonOptions,"LOADING","");


        Statement stmtK = pullConn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        Statement stmtGK = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);

        // 033a7212-03d9-4743-818c-ece3ebad614d
        ResultSet rsGK = stmtGK.executeQuery(findCertGK);
        ResultSet rsK = stmtK.executeQuery(findCertK);

        while (rsGK.next()){
            responseGK+=rsGK.getString(1)+"|";
        }

        while (rsK.next()){
            responseK+=rsK.getString(1)+"#";
            responseK+=rsK.getString(2)+"#";
            responseK+=rsK.getString(3)+"#";
            responseK+="|";
        }



        /*String[] arrUserCerts = userCerts.split("\\|"); // то что ввели

        String[] arrResponseK = new String[arrUserCerts.length-2]; // финал К
        String[] arrResponseGK = new String[arrUserCerts.length-2]; // финал ГК

        String responseGK2="";
        String responseK2="";
        String certToCompare2="";
        String userCerts2="";

        String[] arrKCerts = userCerts.split("\\|");
        String[] arrGKCerts = userCerts.split("\\|");

        for(int i=0; i < arrUserCerts.length-2;i++){

            if(i<=arrKCerts.length-1){
                for(int k=0; k<arrKCerts.length-1;k++){
                    if(arrUserCerts[i].equals(arrKCerts[k])){
                        responseK2+=arrUserCerts[i]+"|";
                        break;
                    }else{
                        if(k>=arrKCerts.length-1){
                            responseK2+="empty";
                        }
                    }
                }

            }

            if(i<=arrGKCerts.length-1){
                for(int k=0; k<arrGKCerts.length-1;k++){
                    if(arrUserCerts[i].equals(arrGKCerts[k])){
                        responseGK2+=arrUserCerts[i]+"|";
                        break;
                    }else{
                        if(k>=arrGKCerts.length-1){
                            responseGK2+="empty";
                        }
                    }
                }

            }

        }
        System.out.println("K\n"+responseK2+" GK\n"+responseGK2);


        * */


/* for(var k=0; k < arrK.length;k++){
                    if(arrUsersCert[u]==arrK[k]){
                        //toPrintCert += "<td>"+arrK[k]+"</td>";
                        toPrintCert += "<td>Да</td>";
                        cadus=true;
                        break;
                    }else{
                        //toPrintCert += "<td>Не найден в кадуцей</td>";
                        //break;
                        if(k >= arrK.length-2){
                            toPrintCert += "<td>Нет</td>";
                            cadus=false;
                            break;
                        }else{
                           // console.log("K "+k+" arrK "+arrK.length);
                        }




                    }

                }*/



        pullConn.close();
        conn.close();

        //System.out.println("GK\n"+responseGK+"\nK\n"+responseK);
        //System.out.println("GK\n"+findCertGK+"\nK\n"+findCertK);
        writeLogParent(NTLMUserFilter.getUserName(),"CADUCEUS","ПОИСК",
                "СЕРТИФИКАТОВ",
                jsonOptions,"OK","");



        return responseK+"&"+responseGK+"&"+userCerts;
    }



}

package app.servlets.caduceus;

import app.entities.ConnectionPool;

import java.sql.*;

import static app.entities.ConnectToBD.driverNamePostgres;

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

        int countOfCerts = cert.length() / 32;

        String[] arrCerts= new String[countOfCerts];

        if(countOfCerts>=32){
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

        System.out.println(certToCompare);

        String findCertGK = "select vet_doc_uuid from xrg_evsd where vet_doc_uuid in ("+certToCompare+") order by 1";
        String findCertK = "select mgen_uuid from m_vetdocument where mgen_uuid in ("+certToCompare+") order by 1";

        Connection pullConn = ConnectionPool.getInstance().getConnectionMerc();

        Connection conn = connectionGK(sap);

        StringBuffer sb = new StringBuffer(cert.replace("-",""));




        Statement stmtK = pullConn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        Statement stmtGK = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);

        // 033a7212-03d9-4743-818c-ece3ebad614d
        ResultSet rsGK = stmtGK.executeQuery(findCertGK);
        ResultSet rsK = stmtK.executeQuery(findCertK);

        while (rsGK.next()){
            responseGK+=rsGK.getString(1)+"|";
        }

        while (rsK.next()){
            responseK+=rsK.getString(1)+"|";
        }

        pullConn.close();
        conn.close();

        //System.out.println("GK\n"+responseGK+"\nK\n"+responseK);
        //System.out.println("GK\n"+findCertGK+"\nK\n"+findCertK);




        return responseK+"&"+responseGK+"&"+userCerts;
    }



}

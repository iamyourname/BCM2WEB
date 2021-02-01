package app.entities;

import java.sql.*;

import static app.entities.ConnectToBD.driverNamePostgres;

public class Mags {

    public static Connection ConnToMagNQ(String sap) throws SQLException {
        Connection ConnNq=null;

        Connection pullConnNq = ConnectionPool.getInstance().getConnectionNQ(sap);
        Statement stmtPullNq = pullConnNq.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        ResultSet rs = stmtPullNq.executeQuery("select nickname from sdd.department where " +
                "id_department in (select id_department from sdd.department_ext where ext_string = '"+sap+"')");
        String nickname = rs.getString(1);
        pullConnNq.close();
        stmtPullNq.close();

        return ConnNq;
    }

    public static Connection  ConnToMagGK(String sap){

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

    public static void MagsOutInfo(String buff, String sap){




    }



}

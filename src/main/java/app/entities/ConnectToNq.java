package app.entities;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class ConnectToNq {

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


}

package app.entities;

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

        response = rsPullB.getString(1);

        return response;
    }

}

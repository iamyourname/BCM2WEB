package app.entities;

public class ConnectToMagNQ {
    // Класс для обработки действий с магазинами NQ

    public static String findUrlNQ(String sap){
        String response="";

        Connection pullConnNq = ConnectionPool.getInstance().getConnectionNQ(sap);
        Statement stmtPullNq = pullConnNq.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
        String getSqlstringSaps ="select nickname from sdd.department \n" +
                "where id_department in (\n" +
                "select id_department from sdd.department_ext \n" +
                "where ext_string = UPPER('"+sap+"'))";
        ResultSet rsFindUrl = stmtPullNq.executeQuery(getSqlstringSap);






        return response;
    }
}

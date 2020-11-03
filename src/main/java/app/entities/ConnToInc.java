package app.entities;

import java.sql.*;

import static app.servlets.Bcm2WebMain.infoLine;

public class ConnToInc {

    public static void ShowDayInc() throws ClassNotFoundException, SQLException {

        Class.forName("org.h2.Driver");
        // Connection conn = DriverManager.getConnection("jdbc:h2:./ok_usersinc;DATABASE_TO_UPPER=true;FILE_LOCK=NO",
        //        "ui", "123456");
        Connection conn = DriverManager.getConnection("jdbc:h2:tcp://localhost/~/IdeaProjects/rbd/ok_usersinc;DATABASE_TO_UPPER=true;FILE_LOCK=NO",
                "ui", "123456");
        Statement stmt = conn.createStatement();
        String sqlDayInfo = "SELECT * FROM RC_DAY_INFO";
        ResultSet rsDay = stmt.executeQuery(sqlDayInfo);
        for(int i=2;i<11;i++){
            infoLine[i]=rsDay.getString(i);
        }






    }

}

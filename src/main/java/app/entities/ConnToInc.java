package app.entities;

import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import static app.servlets.Bcm2WebMain.infoLine;

public class ConnToInc {

    public static String[][] tableTop;

    public static void TableOfTop() throws SQLException, ClassNotFoundException {


        Class.forName("org.h2.Driver");
        // Connection conn = DriverManager.getConnection("jdbc:h2:./ok_usersinc;DATABASE_TO_UPPER=true;FILE_LOCK=NO",
        //        "ui", "123456");
        Connection conn = DriverManager.getConnection("jdbc:h2:tcp://localhost/~/IdeaProjects/rbd/ok_usersinc;DATABASE_TO_UPPER=true;FILE_LOCK=NO",
                "ui", "123456");
        Statement stmt = conn.createStatement();
        String sqlTableOfTop = "SELECT " +
                "USER " +
                " , SUM(B_RC_INC + B_RC_TINC + B_RC_ZNO + B_RC_TZNO) \"INC\""+
                " FROM USERS_INC "+
                "group by USER "+
                " ORDER BY 2 desc";
        ResultSet rsTop = stmt.executeQuery(sqlTableOfTop);

        int t=0;
        while(rsTop.next()){
            tableTop[t][0]= rsTop.getString(1);
            tableTop[t][1]= rsTop.getString(2);
        }

        stmt.close();
        conn.close();

    }


    public static void ShowDayInc() throws ClassNotFoundException, SQLException {

        Class.forName("org.h2.Driver");
        // Connection conn = DriverManager.getConnection("jdbc:h2:./ok_usersinc;DATABASE_TO_UPPER=true;FILE_LOCK=NO",
        //        "ui", "123456");
        Connection conn = DriverManager.getConnection("jdbc:h2:tcp://localhost/~/IdeaProjects/rbd/ok_usersinc;DATABASE_TO_UPPER=true;FILE_LOCK=NO",
                "ui", "123456");
        Statement stmt = conn.createStatement();
        String sqlDayInfo = "SELECT * FROM RC_DAY_INFO";
        ResultSet rsDay = stmt.executeQuery(sqlDayInfo);
        rsDay.last();
        for(int i=2;i<11;i++){
            infoLine[i]=rsDay.getString(i);
        }
        stmt.close();
        conn.close();

    }

    public static String ShowUserInc(String user) throws ClassNotFoundException, SQLException {

        Class.forName("org.h2.Driver");
        // Connection conn = DriverManager.getConnection("jdbc:h2:./ok_usersinc;DATABASE_TO_UPPER=true;FILE_LOCK=NO",
        //        "ui", "123456");
        Connection conn = DriverManager.getConnection("jdbc:h2:tcp://localhost/~/IdeaProjects/rbd/ok_usersinc;DATABASE_TO_UPPER=true;FILE_LOCK=NO",
                "ui", "123456");
        Statement stmt = conn.createStatement();
        DateFormat dateFormat = new SimpleDateFormat("MM.yyyy");
        Date date = new Date();
        //SELECT
        //SUM(B_RC_INC + B_RC_TINC + B_RC_ZNO + B_RC_TZNO) "INC"
        //,
        //SUM(B_RC_INC_TIME + B_RC_TINC_TIME + B_RC_ZNO_TIME + B_RC_TZNO_TIME) "TIME"
        //  FROM USERS_INC where USER LIKE ('%Roma.Ivanov2%');

        String sqlAllInfo = "SELECT " +
                "SUM(B_RC_INC + B_RC_TINC + B_RC_ZNO + B_RC_TZNO) \"INC\"" +
                " FROM USERS_INC where MY='"+dateFormat.format(date)+"' and USER like ('%"+user+"%')";
        System.out.println(sqlAllInfo);
        ResultSet rsDay = stmt.executeQuery(sqlAllInfo);
        rsDay.last();
        String AllUserInc = rsDay.getString(1);
        stmt.close();
        conn.close();
        return AllUserInc;
    }

    public static String ShowUserTime(String user) throws ClassNotFoundException, SQLException {

        Class.forName("org.h2.Driver");
        // Connection conn = DriverManager.getConnection("jdbc:h2:./ok_usersinc;DATABASE_TO_UPPER=true;FILE_LOCK=NO",
        //        "ui", "123456");
        Connection conn = DriverManager.getConnection("jdbc:h2:tcp://localhost/~/IdeaProjects/rbd/ok_usersinc;DATABASE_TO_UPPER=true;FILE_LOCK=NO",
                "ui", "123456");
        Statement stmt = conn.createStatement();
        DateFormat dateFormat = new SimpleDateFormat("MM.yyyy");
        Date date = new Date();
        //SELECT
        //SUM(B_RC_INC + B_RC_TINC + B_RC_ZNO + B_RC_TZNO) "INC"
        //,
        //SUM(B_RC_INC_TIME + B_RC_TINC_TIME + B_RC_ZNO_TIME + B_RC_TZNO_TIME) "TIME"
        //  FROM USERS_INC where USER LIKE ('%Roma.Ivanov2%');

        String sqlAllInfo = "SELECT " +
                " SUM(B_RC_INC_TIME + B_RC_TINC_TIME + B_RC_ZNO_TIME + B_RC_TZNO_TIME) \"TIME\""+
                "FROM USERS_INC where MY='"+dateFormat.format(date)+"' and USER like ('%"+user+"%')";
        System.out.println(sqlAllInfo);
        ResultSet rsDayTime = stmt.executeQuery(sqlAllInfo);
        rsDayTime.last();
        String allUserTime = rsDayTime.getString(1);
        stmt.close();
        conn.close();
        return allUserTime;
    }

    public static void UpdateUserInc() throws InterruptedException {
        System.out.println("SLEEP");
        Thread.sleep(5000);
        System.out.println("AFTER_SLEEP");

    }

}

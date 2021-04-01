package app.servlets.bacchus;


import app.entities.Logs;
import app.servlets.NTLMUserFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import static app.entities.Logs.writeLogMain;
import static app.entities.Logs.writeLogParent;

public class MagNQ extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String sap = req.getParameter("magsap");
        String buff = req.getParameter("magbuf");
        String magio = req.getParameter("magio");
        String magstate = req.getParameter("magstate");
        String magflow = req.getParameter("magflow");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        String[] old_new = magstate.split(",");

        String jsonOptions =
                "{\"SAP\":\"" + sap + "\"," +
                        "\"Web\":\"true\","+
                        "\"options\":\"magstate "+magstate+" magflow "+magflow+" magio "+magio+"\","+
                        "\"BUF\":\""+ buff +"\"}"; // multi

        try {


            writeLogMain(NTLMUserFilter.getUserName(),"BACCHUS","МагазиныNQ",
                    "МагазиныNQ",
                    jsonOptions,"LOADING","");
            /*
            switch (magio){
                case "1":

                    if(magstate.equals("no"))
                        out.append(ConnectToMag.MagIn(buff,sap));
                    if(magstate.equals("yes"))
                        out.append(ConnectToMag.MagStateHistory(buff,sap));
                    if(magflow.equals("yes"))
                        out.append(ConnectToMag.MagBufHistory(buff,sap));
                    if(magflow.equals("cmp"))
                        out.append(ConnectToMag.EgaisTtnComp(buff,sap));
                    if(magflow.equals("cmp_buf"))
                        out.append(ConnectToMag.BacBufComp(buff,sap));
                    if(magflow.equals("rsd"))
                        out.append(ConnectToMag.MagBacFlowResend(buff,sap,magstate));
                    if(magstate.contains("ch"))
                        out.append(ConnectToMag.ChangeBufMagIn(buff,sap,old_new[2]));

                    break;

                case "2":

                    if(magstate.equals("no"))
                        out.append(ConnectToMag.magOut(buff,sap));
                    if(magstate.equals("yes"))
                        out.append(ConnectToMag.MagStateHistoryOut(buff,sap));
                    if(magflow.equals("yes"))
                        out.append(ConnectToMag.MagBufHistory(buff,sap));
                    if(magstate.contains("ch"))
                        out.append(ConnectToMag.ChangeBufMagOut(buff,sap,old_new[2]));
                    break;

            }
            */


            writeLogParent(NTLMUserFilter.getUserName(),"BACCHUS","Магазины",
                    "Магазины",
                    jsonOptions,"OK","");

        } catch (SQLException throwables) {
            throwables.printStackTrace();
            try {
                Logs.writeLogParent(NTLMUserFilter.getUserName(),"BACCHUS","Магазины",
                        "Магазины",
                        jsonOptions,"ERROR",""+throwables.toString());
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }


    }

}


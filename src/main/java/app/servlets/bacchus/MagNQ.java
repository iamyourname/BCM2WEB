package app.servlets.bacchus;


import app.entities.ConnectToMagNQ;
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
        String magParam = req.getParameter("magParam");
        //String magflow = req.getParameter("magflow");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        //String[] old_new = magstate.split(",");

        String jsonOptions =
                "{\"SAP\":\"" + sap + "\"," +
                        "\"Web\":\"true\","+
                        "\"options\":\"magParam "+magParam+" magio "+magio+"\","+
                        "\"BUF\":\""+ buff +"\"}"; // multi

        try {


            writeLogMain(NTLMUserFilter.getUserName(),"BACCHUS","МагазиныNQ",
                    "МагазиныNQ",
                    jsonOptions,"LOADING","");

            ConnectToMagNQ connectToMagNQ = new ConnectToMagNQ();
            switch (magParam){
                case "NQ_BASE_INFO":
                    out.append(connectToMagNQ.getNQ_base_info(buff,sap));
                    break;
                case "BAC_BASE_INFO":
                    out.append(connectToMagNQ.getBacInfo(buff,sap));
                    break;
                case "flow":
                    //---
                    //out.append(connectToMagNQ.getFlowFromNQ(buff,sap));
                    break;
            }


            System.out.println("end of");
            writeLogParent(NTLMUserFilter.getUserName(),"BACCHUS","Магазины",
                    "МагазиныNQ",
                    jsonOptions,"OK","");

        } catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
            try {
                Logs.writeLogParent(NTLMUserFilter.getUserName(),"BACCHUS","Магазины",
                        "МагазиныNQ",
                        jsonOptions,"ERROR",""+throwables.toString());
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }


    }

}


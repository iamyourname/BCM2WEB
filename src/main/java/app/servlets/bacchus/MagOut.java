package app.servlets.bacchus;

import app.entities.ConnectToMag;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

public class MagOut extends HttpServlet {

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




        try {

            switch (magio){
                case "1":

                    if(magstate.equals("no"))
                        out.append(ConnectToMag.MagIn(buff,sap));
                    if(magstate.equals("yes"))
                        out.append(ConnectToMag.MagStateHistory(buff,sap));
                    if(magflow.equals("yes"))
                        out.append(ConnectToMag.MagBufHistory(buff,sap));
                    break;

                case "2":

                    if(magstate.equals("no"))
                        out.append(ConnectToMag.magOut(buff,sap));
                    if(magstate.equals("yes"))
                        out.append(ConnectToMag.MagStateHistoryOut(buff,sap));
                    if(magflow.equals("yes"))
                        out.append(ConnectToMag.MagBufHistory(buff,sap));
                    break;

            }
            /*
            if(magio.equals("1") && magstate.equals("no")){
                out.append(ConnectToMag.MagIn(buff,sap));
                //return;
            }

            if(magio.equals("1") && magstate.equals("yes")){
                out.append(ConnectToMag.MagStateHistory(buff,sap));
                //return;
            }

            if(magio.equals("1") && magflow.equals("yes")){
                out.append(ConnectToMag.MagBufHistory(buff,sap));
               // return;
            }
            */


        } catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }


    }
}

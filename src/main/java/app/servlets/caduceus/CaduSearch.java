package app.servlets.caduceus;

import app.entities.CaduBaseInfo;
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

public class CaduSearch extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String cadbuf = req.getParameter("cadbuf");
        String cadsap = req.getParameter("cadsap");
        String cadparam = req.getParameter("cadparam");

        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();


        String jsonOptions =
                "{\"SAP\":\"" + cadsap + "\"," +
                        "\"Web\":\"true\","+
                        "\"options\":\"magParam "+cadparam+" magio "+"\","+
                        "\"BUF\":\""+ cadbuf +"\"}"; // multi

        try {


            writeLogMain(NTLMUserFilter.getUserName(),"CADUCEUS","Кадуцей",
                    "Поиск",
                    jsonOptions,"LOADING","");

            //ConnectToMagNQ connectToMagNQ = new ConnectToMagNQ();
            CaduBaseInfo caduBaseInfo = new CaduBaseInfo();
            switch (cadparam){
                case "base":
                        out.append(caduBaseInfo.getCaduBaseInfo(cadbuf,cadsap));
                    break;
                case "invent":
                    out.append(caduBaseInfo.getInventInfo(cadbuf,cadsap));
                    break;
            }


            System.out.println("end of");
            writeLogParent(NTLMUserFilter.getUserName(),"CADUCEUS","Кадуцей",
                    "Поиск",
                    jsonOptions,"OK","");

        } catch (SQLException throwables) {
            throwables.printStackTrace();
            try {
                Logs.writeLogParent(NTLMUserFilter.getUserName(),"CADUCEUS","Кадуцей",
                        "Поиск",
                        jsonOptions,"ERROR",""+throwables.toString());
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }



    }



}

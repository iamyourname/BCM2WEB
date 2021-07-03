package app.servlets.bacchus;

import app.entities.Logs;
import app.entities.genAct;
import app.servlets.NTLMUserFilter;
import org.xml.sax.SAXException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import static app.entities.Logs.writeLogMain;
import static app.entities.Logs.writeLogParent;

public class act extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {


        //отправка срабатывает не сразу
        // проверить!

        String buff = req.getParameter("actbuf");
        String sap = req.getParameter("actsap");
        String check = req.getParameter("check");

        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();

        String jsonOptions =
                "{\"SAP\":\"" + sap + "\"," +
                        "\"Web\":\"true\","+
                        "\"BUF\":\""+ buff +"\"}"; // multi

        try {
            writeLogMain(NTLMUserFilter.getUserName(),"BACCHUS","АктПНБ",
                    "АктПНБ_Отправка",
                    jsonOptions,"LOADING","");

            switch (check){
                case "no":
                    out.append(genAct.genXmlAct(buff,sap));
                    break;
                case "edit":
                    //edit
                    String fbs = req.getParameter("Fs");
                    String amcs = req.getParameter("As");
                    out.append(genAct.genXmlActEdit(buff,sap,fbs,amcs));
                    break;
                default:
                    out.append(genAct.checkReply(check,sap));
                    break;
            }
            /*if(check.equals("no")){
                out.append(genAct.genXmlAct(buff,sap));
            }else{
                out.append(genAct.checkReply(check,sap));
            }*/


            writeLogParent(NTLMUserFilter.getUserName(),"BACCHUS","АктПНБ",
                    "АктПНБ_Отправка",
                    jsonOptions,"OK","");

        } catch (SQLException throwables) {

            throwables.printStackTrace();
            try {

                writeLogParent(NTLMUserFilter.getUserName(),"BACCHUS","АктПНБ",
                        "АктПНБ_Отправка",
                        jsonOptions,"ERROR",""+throwables.toString());
            } catch (SQLException e) {
                e.printStackTrace();
            }
            System.out.println(throwables.toString());
        }





    }
}

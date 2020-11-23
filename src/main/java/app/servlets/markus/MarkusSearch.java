package app.servlets.markus;

import app.model.ViewMarkusInfo;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class MarkusSearch  extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setCharacterEncoding("UTF-8");
        //resp.setHeader();
        PrintWriter out = resp.getWriter();

        String param = req.getParameter("param");
        String value = req.getParameter("value");
        String sap = req.getParameter("SAP");
        out.append(ViewMarkusInfo.viewDataFromMongo(param,value,"0"));



    }


}

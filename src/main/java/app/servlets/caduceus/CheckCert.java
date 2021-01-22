package app.servlets.caduceus;

import app.entities.SendUTM;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

public class CheckCert extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();

        String sap = req.getParameter("SAP");

        String cert = req.getParameter("cert");



        try {

            out.append(ConnectToGK.compare_cert(sap,cert));
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

    }
}

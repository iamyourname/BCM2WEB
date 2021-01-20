package app.servlets.bacchus;

import app.entities.SendUTM;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

public class ReplyCheck extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();

        String reply_to_check = req.getParameter("reply");

        String sap_for_reply = req.getParameter("SAP");

        try {
            out.append(SendUTM.checkUtmTicket(sap_for_reply,reply_to_check));
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

    }

}

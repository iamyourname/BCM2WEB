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

        PrintWriter out = resp.getWriter();


        try {
            out.append(ConnectToMag.Mag(buff,sap));
        } catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }


    }
}

package app.servlets.bacchus;

import app.entities.SendUTM;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Paths;
import java.sql.SQLException;

public class UTM extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {





        resp.setCharacterEncoding("UTF-8");
        //resp.setHeader();
        PrintWriter out = resp.getWriter();

        String sapUTM = req.getParameter("SAP");

        //Part fileToUtm = req.getPart("fileToUtm");

        //String fileName = Paths.get(fileToUtm.getSubmittedFileName()).getFileName().toString(); // MSIE fix.
       // InputStream fileContent = fileToUtm.getInputStream();


        //String system = req.getParameter("system");

       // File files_utm  = new File()


        try {
            out.append(SendUTM.findUtmAgent(sapUTM));

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }


    }


    }

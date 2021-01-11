package app.servlets.bacchus;

import app.entities.SendUTM;
import org.xml.sax.SAXException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import javax.xml.parsers.ParserConfigurationException;
import java.io.*;
import java.sql.SQLException;

public class SendFile extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        PrintWriter out = resp.getWriter();

        String sapUTM = req.getParameter("SAP");

        InputStream isFoto = req.getPart("fileToUtm").getInputStream();
        //InputStream isResu = request.getPart("fResumen").getInputStream();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        byte buf[] = new byte[8192];
        int qt = 0;
        while ((qt = isFoto.read(buf)) != -1) {
            baos.write(buf, 0, qt);
        }
        String sResumen = baos.toString();

        File file = new File("E:\\Progs\\TomCat_9\\files_utm\\temp_xml.xml");
        if(file.exists()){
            file.delete();
        }

            file.createNewFile();
            FileWriter fileWriter = new FileWriter(file);
            fileWriter.append(sResumen);
            fileWriter.close();

            try {
                out.append(SendUTM.sendFileToUtm(SendUTM.findUtmAgent(sapUTM)));
            } catch (SQLException | ParserConfigurationException | SAXException throwables) {
                throwables.printStackTrace();
            }



        //out.append(sResumen);

    }



}

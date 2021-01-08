package app.servlets.bacchus;

import app.entities.SendUTM;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.*;
import java.sql.SQLException;

public class SendFile extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

       // resp.setCharacterEncoding("UTF-8");
        //resp.setHeader();
        PrintWriter out = resp.getWriter();

        InputStream isFoto = req.getPart("fileToUtm").getInputStream();
        //InputStream isResu = request.getPart("fResumen").getInputStream();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        byte buf[] = new byte[8192];
        int qt = 0;
        while ((qt = isFoto.read(buf)) != -1) {
            baos.write(buf, 0, qt);
        }
        String sResumen = baos.toString();

        File file = new File("E:\\Progs\\TomCat_9\\files_utm\\hailo.txt");
        if(file.exists()){
            file.delete();
        }else{
            file.createNewFile();
            FileWriter fileWriter = new FileWriter(file);
            fileWriter.append(sResumen);
            fileWriter.close();
        }

        out.append(sResumen);




        //String sapUTM = req.getParameter("SAP");

        //Part fileToUtm = req.getPart("fileToUtm");

        //String fileName = Paths.get(fileToUtm.getSubmittedFileName()).getFileName().toString(); // MSIE fix.
        //InputStream fileContent = fileToUtm.getInputStream();


        //String system = req.getParameter("system");




    }



}

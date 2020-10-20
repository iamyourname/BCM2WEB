package app.servlets.bacchus;

import app.entities.RcToAgent;
import app.model.ViewResult;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;

public class Transport extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {

    }


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws  IOException, ServletException {

        String tResponse="";

        resp.setCharacterEncoding("UTF-8");
        //resp.setHeader();
        PrintWriter out = resp.getWriter();

        String TBuf = req.getParameter("TBuf");
        String TSap = req.getParameter("TSap");

        ViewResult viewResult = ViewResult.getInstance();

        String agent = "";
        for(int i = 0; i < RcToAgent.rcAgent.length; i++){
            if (RcToAgent.rcAgent[i][0].equals(TSap)){
                agent = RcToAgent.rcAgent[i][2];
            }
        }

        try {
            System.out.println("Transport");

            Object[][] outT31 = viewResult.ViewBuffGodOutFromBD(TBuf,TSap, agent); // ошибка

            for (Object[] out31Datum : outT31) {
                tResponse += Arrays.toString(out31Datum);
                //out.append(Arrays.toString(out31Datum));
            }

            out.append(tResponse);
        }catch (Exception sq){
            System.out.println(""+sq.toString());
        }


    }



}

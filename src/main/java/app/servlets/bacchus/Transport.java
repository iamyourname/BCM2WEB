package app.servlets.bacchus;

import app.entities.RcToAgent;
import app.entities.Utm;
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
        String TW = req.getParameter("TW");
        String RPL = req.getParameter("RPL");
        String chpar = req.getParameter("chpar");

        ViewResult viewResult = ViewResult.getInstance();

        String agent = "";
        for(int i = 0; i < RcToAgent.rcAgent.length; i++){
            if (RcToAgent.rcAgent[i][0].equals(TSap)){
                agent = RcToAgent.rcAgent[i][2];
            }
        }

        if(Integer.parseInt(agent)<9)agent="0"+agent;

        try{
            if(!chpar.equals("0")){
                out.append(Utm.WaybillChange(TBuf,TSap));
                return;
            }
        }catch (Exception ee){
            out.append(""+ee.toString());
        }

        try {
           // System.out.println("Transport");

            if(TW.equals("1")){
                if(RPL.equals("0")){
                  //  System.out.println("Transport waybill");

                    tResponse = Utm.WaybillReject(TBuf,TSap);
                    out.append(tResponse);
                }else{
                    tResponse = Utm.CheckTicket(TBuf,TSap,RPL);
                    out.append(tResponse);
                }
            }else{
               // System.out.println("Transport buff");
                Object[][] outT31 = viewResult.ViewBuffGodOutFromBD(TBuf,TSap, agent); // ошибка
                for (Object[] out31Datum : outT31) {
                    tResponse += Arrays.toString(out31Datum);
                    //out.append(Arrays.toString(out31Datum));
                }
                out.append(tResponse);
            }




        }catch (Exception sq){
            out.append("Transport.java"+sq.toString());
           // System.out.println(""+sq.toString());
        }


    }



}

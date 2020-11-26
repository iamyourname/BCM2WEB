package app.model;

import app.entities.ConnectionPool;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


public class ViewMarkusInfo {

    public static String[][] mStatus = {
            {"SAP_WAITING_APPROVAL","Ожидает подтверждения от SAP"},
            {"SAP_APPROVED","Проверка в SAP пройдена"},
            {"SAP_REJECTED","Проверка в SAP не пройдена"},
            {"MOTP_REQ_APPROVAL","Запрос на проверку документа в ГИС"},
            {"MOTP_APPROVED","Проверка в ГИС по документу пройдена"},
            {"MOTP_REJECTED","Отклонено в ГИС"},
            {"MOTP_REQ_DETAIL","Запрос детализации в ГИС"},
            {"MOTP_DETAILED","Ожидание корректировок по УПД"},
            {"WAITING_ADJUSTMENT","Детализация от ГИС получена"},
            {"DC_DETAILED","Детализация отправлена"},
            {"WAITING_CHANGE_OWNER","Ожидает смены собственника"},
            {"OWNER_CHANGED","Собственник изменён"},
            {"INVALID","Ошибка"},
            {"DELETED","Удален"},
            {"X5_CREATED","Создан"},
            {"MARKUS_OK","Документ обработан с КИЗами"},
            {"MARKUS_FAIL","Документ обработан без КИЗов"},
            {"GIS_COMFIRMED","Документ обработан в ГИС"},
            {"WAITING_VENDOR_APPROVAL","Ожидает смены собственника"},
            {"VENDOR_APPROVED","Собственник изменён"},
            {"ACCEPTED","Принят"},
            {"RECLAMATION_CREATED","Принят с расхождениями"},
            {"NO_RECLAMATION","Принят без расхождений"}};


    public static String jsonReplace(String js) {
        js = js.replace("Document", "");
        js = js.replace(":", "-");
        js = js.replace("=", ":");
        js = js.replace("{{", "{");
        js = js.replace("}}", "}");
        js = js.replace("{", "{\n\"");
        js = js.replace(", ", "\",\n\"");
        js = js.replace(":", "\":\"");
        js = js.replace("\":\"{", "\":{");
        js = js.replace("}\",", "\"},");
        js = js.replace("\":\"[{", "\":[{");
        js = js.replace("}]\",", "\"}],");
        js = js.replace("}]\",", "\"}],");
        js = js.replace("Model}", "Model\"}");
        js = js.replace("\"},\n" +
                "\"{\n" +
                "\"", "\"},\n" +
                "{\n" +
                "\"");
        js = js.replace("}", "\"}");
        js = js.replace("\"\"}", "\"}");
        return js;
    }
    public static String viewDataFromMongo(String param,String value, String sap){
        String sReturn="";


        //connWithMongoDb
        try{
            MongoClientURI mongoClientURI = new MongoClientURI("mongodb://prod-markus-user:nqn9v75rubsa45g5cnzgz67@msk-dpro-mng045.x5.ru:27017");
            //?authMechanism=SCRAM-SHA-1
            MongoClient mongoClient = new MongoClient(mongoClientURI);
            MongoDatabase db = mongoClient.getDatabase("markus");
            MongoCollection coll = db.getCollection("document");


            switch (param){
                case "guid":

                    BasicDBObject query=new BasicDBObject("guidUpd",value);

                    for (Document document : (Iterable<Document>) coll.find(query)) {
                        //System.out.println(cursor.next().toJson());
                        Object obj = new JSONParser().parse(document.toJson());
                        JSONObject jo = (JSONObject) obj;

                        //id
                        JSONObject jid = (JSONObject) jo.get("_id");
                        sReturn += jid.get("$oid")+"!";

                        //all details
                        JSONArray jdetails = (JSONArray) jo.get("details");
                        JSONObject jdetails_val = (JSONObject)  jdetails.get(1);

                        //number of sap
                        JSONObject jsap = (JSONObject) jdetails_val.get("sapOrdIdHeader");
                        sReturn += jsap.get("$numberLong")+"!";

                        //guid
                        sReturn += jo.get("guidUpd")+"!";

                        //type
                        sReturn += jo.get("type")+"!";

                        //STATUS
                        JSONObject jstatus = (JSONObject) jo.get("status");
                        for (int m=0; m < mStatus.length; m++){
                            if(mStatus[m][0].equals(jstatus.get("stateMachine")))
                                sReturn += jstatus.get("stateMachine")+"( " + mStatus[m][1] + " )!";
                        }



                        for(int i=0; i < jdetails.size(); i++){
                            JSONObject jdetails_val_doc = (JSONObject)  jdetails.get(i);
                            sReturn += jdetails_val_doc.get("idItem")+":"+jdetails_val_doc.get("quantity")+"&";
                        }


                        //store
                        if(jo.get("storeIn")==null)
                            sReturn += "!emptyIn";
                        else {
                            sReturn += "!" + jo.get("storeIn");
                            sReturn += "!" + ViewMarkBufFromNQ(jo.get("guidUpd").toString(), jo.get("storeIn").toString());
                        }

                        if(jo.get("storeOut")==null)
                            sReturn += "!emptyOut";
                        else {
                            sReturn += "!" + jo.get("storeOut");
                            sReturn += "!" + ViewMarkBufFromNQ(jo.get("guidUpd").toString(), jo.get("storeIn").toString());
                        }



                        sReturn += "|";

                    }




                        break;
                case "order": //6321100654
                    query=new BasicDBObject("details.sapOrdIdHeader",Long.valueOf(value));

                    for (Document document : (Iterable<Document>) coll.find(query)) {
                        //System.out.println(cursor.next().toJson());
                        Object obj = new JSONParser().parse(document.toJson());
                        JSONObject jo = (JSONObject) obj;

                        //id
                        JSONObject jid = (JSONObject) jo.get("_id");
                        sReturn += jid.get("$oid")+"!";

                        //all details
                        JSONArray jdetails = (JSONArray) jo.get("details");
                        JSONObject jdetails_val = (JSONObject)  jdetails.get(1);

                        //number of sap
                        JSONObject jsap = (JSONObject) jdetails_val.get("sapOrdIdHeader");
                        sReturn += jsap.get("$numberLong")+"!";

                        //guid
                        sReturn += jo.get("guidUpd")+"!";

                        //type
                        sReturn += jo.get("type")+"!";

                        //STATUS
                        JSONObject jstatus = (JSONObject) jo.get("status");
                        for (int m=0; m < mStatus.length; m++){
                            if(mStatus[m][0].equals(jstatus.get("stateMachine")))
                                sReturn += jstatus.get("stateMachine")+"( " + mStatus[m][1] + " )!";
                        }

                        for(int i=0; i < jdetails.size(); i++){
                            JSONObject jdetails_val_doc = (JSONObject)  jdetails.get(i);
                            sReturn += jdetails_val_doc.get("idItem")+":"+jdetails_val_doc.get("quantity")+"&";
                        }


                        //store
                        if(jo.get("storeIn")==null)
                            sReturn += "!emptyIn";
                        else {
                            sReturn += "!" + jo.get("storeIn");
                            sReturn += "!" + ViewMarkBufFromNQ(jo.get("guidUpd").toString(), jo.get("storeIn").toString());
                        }

                        if(jo.get("storeOut")==null)
                            sReturn += "!emptyOut";
                        else {
                            sReturn += "!" + jo.get("storeOut");
                            sReturn += "!" + ViewMarkBufFromNQ(jo.get("guidUpd").toString(), jo.get("storeIn").toString());
                        }



                        sReturn += "|";

                    }

                    break;
                case "buf":
                    String gUpd = ViewMarkInfoFromNQ(value,sap);

                     query=new BasicDBObject("guidUpd",gUpd);

                    for (Document document : (Iterable<Document>) coll.find(query)) {
                        //System.out.println(cursor.next().toJson());
                        Object obj = new JSONParser().parse(document.toJson());
                        JSONObject jo = (JSONObject) obj;

                        //id
                        JSONObject jid = (JSONObject) jo.get("_id");
                        sReturn += jid.get("$oid")+"!";

                        //all details
                        JSONArray jdetails = (JSONArray) jo.get("details");
                        JSONObject jdetails_val = (JSONObject)  jdetails.get(1);

                        //number of sap
                        JSONObject jsap = (JSONObject) jdetails_val.get("sapOrdIdHeader");
                        sReturn += jsap.get("$numberLong")+"!";

                        //guid
                        sReturn += jo.get("guidUpd")+"!";

                        //type
                        sReturn += jo.get("type")+"!";

                        //STATUS
                        JSONObject jstatus = (JSONObject) jo.get("status");
                        for (int m=0; m < mStatus.length; m++){
                            if(mStatus[m][0].equals(jstatus.get("stateMachine")))
                                sReturn += jstatus.get("stateMachine")+"( " + mStatus[m][1] + " )!";
                        }


                        for(int i=0; i < jdetails.size(); i++){
                            JSONObject jdetails_val_doc = (JSONObject)  jdetails.get(i);
                            sReturn += jdetails_val_doc.get("idItem")+":"+jdetails_val_doc.get("quantity")+"&";
                        }


                        //store
                        if(jo.get("storeIn")==null)
                            sReturn += "!emptyIn";
                        else {
                            sReturn += "!" + jo.get("storeIn");
                            sReturn += "!" + ViewMarkBufFromNQ(jo.get("guidUpd").toString(), jo.get("storeIn").toString());
                        }

                        if(jo.get("storeOut")==null)
                            sReturn += "!emptyOut";
                        else {
                            sReturn += "!" + jo.get("storeOut");
                            sReturn += "!" + ViewMarkBufFromNQ(jo.get("guidUpd").toString(), jo.get("storeIn").toString());
                        }


                        sReturn += "|";

                    }

                    break;



            }



        }catch (ParseException | SQLException e){
            System.out.println("here"+e.toString());

        }



    return sReturn;





}


    public static String ViewMarkInfoFromNQ(String buff, String sap) throws SQLException {
        String result="";
        Connection pullConnNq = ConnectionPool.getInstance().getConnectionNQ(sap);
        Statement stmtPullNq = pullConnNq.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);

        //select ext_string from sdd.bufheader_ext where id_header = '6148661' and ext_name = 'GUIDUPD'
        String getSqlstringNQ ="select ext_string from sdd.bufheader_ext where id_header = '"+buff+"' and ext_name = 'GUIDUPD'";
        ResultSet rsNQ = stmtPullNq.executeQuery(getSqlstringNQ);
        while (rsNQ.next()) {
            for (int i = 0; i < 1; i++) {
                result = (rsNQ.getString("ext_string"));
            }
        }
        pullConnNq.close();
        return result;
    }

    public static String ViewMarkBufFromNQ(String guid, String sap) throws SQLException {
        String result="empty";
        Connection pullConnNq = ConnectionPool.getInstance().getConnectionNQ(sap);
        Statement stmtPullNq = pullConnNq.createStatement(
                ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);

        //select ext_string from sdd.bufheader_ext where id_header = '6148661' and ext_name = 'GUIDUPD'
        String getSqlstringNQ ="select id_header from sdd.bufheader_ext where ext_string = '"+guid+"' and ext_name = 'GUIDUPD'";
        ResultSet rsNQ = stmtPullNq.executeQuery(getSqlstringNQ);
        rsNQ.last();
        int countrows = rsNQ.getRow();
        rsNQ.beforeFirst();
        if(countrows==0)
            return result;
        while (rsNQ.next()) {
            for (int i = 0; i < 1; i++) {
                result = (rsNQ.getString("id_header"));
            }
        }
        pullConnNq.close();
        return result;
    }

        }
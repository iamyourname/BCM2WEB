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
                        sReturn += jstatus.get("stateMachine")+"!";


                        for(int i=0; i < jdetails.size(); i++){
                            JSONObject jdetails_val_doc = (JSONObject)  jdetails.get(i);
                            sReturn += jdetails_val_doc.get("idItem")+":"+jdetails_val_doc.get("quantity")+"&";
                        }


                        //store
                        sReturn += "!"+jo.get("storeIn");

                        sReturn += "|";

                    }




                        break;
                case "order": //6321100654
                    query=new BasicDBObject("details.sapOrdIdHeader",Long.valueOf(value));

                    for (Document document : (Iterable<Document>) coll.find(query)) {
                        //System.out.println(cursor.next().toJson());
                        Object obj = new JSONParser().parse(document.toJson());
                        JSONObject jo = (JSONObject) obj;

                        sReturn += jo.get("_id").toString() + "!";
                        sReturn += jo.get("details").toString() + "!";
                        sReturn += jo.get("guidUpd").toString() + "!";
                        sReturn += jo.get("type").toString() + "!";
                        sReturn += jo.get("status").toString() + "!";
                        sReturn += jo.get("details").toString() + "!";
                        sReturn += jo.get("storeIn").toString();
                        sReturn += "|";
                    }
                    break;


            }



        }catch (ParseException e){
            System.out.println("here"+e.toString());

        }



    return sReturn;





}

        }
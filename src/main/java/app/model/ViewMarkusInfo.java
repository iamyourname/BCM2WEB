package app.model;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;


public class ViewMarkusInfo {

    public static String jsonReplace(String js){
        js = js.replace("Document","");
        js = js.replace(":","-");
        js = js.replace("=",":");
        js = js.replace("{{","{");
        js = js.replace("}}","}");
        js = js.replace("{","{\n\"");
        js = js.replace(", ","\",\n\"");
        js = js.replace(":","\":\"");
        js = js.replace("\":\"{","\":{");
        js = js.replace("}\",","\"},");
        js = js.replace("\":\"[{","\":[{");
        js = js.replace("}]\",","\"}],");
        js = js.replace("}]\",","\"}],");
        js = js.replace("Model}","Model\"}");
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
              case "order":
              case "guid":
                  BasicDBObject query=new BasicDBObject("guidUpd",value);
                  Document myDoc = (Document) coll.find(query).first();
                  String js = jsonReplace(myDoc.toString());

                  Object obj = new JSONParser().parse(js);
                  JSONObject jo = (JSONObject) obj;


                  sReturn=jo.get("_id").toString()+jo.get("details.sapOrdIdHeader").toString()+jo.get("guidUpd").toString()+jo.get("type").toString();


                  /*


                  1. Из коллекции документ
    1. Id без обджекта
    2. OrderNumber
    3. Guid
    4. Type Тип из монго в скобках перевод
    5. Статус - из монго в скобках перевод
    6. Детали. Разворачиваются. PlU:quantity
    7. StoreIn/StoreOut

                   */


              case "pallet":
              case "buf":

          }




        }catch (ParseException e){
            System.out.println(e.toString());

        }



    return sReturn;
    }



}

//just a file
function onOff() {
    var massCheck = document.getElementById("check1");
    var areaBuf = document.getElementById("buff");
    var editCheck = document.getElementById("check2");
    if(massCheck.checked){
        areaBuf.disabled = true;
        editCheck.disabled = true;
    }else{
        areaBuf.disabled = false;
        editCheck.disabled = false;
    }


}

function showChnage() {
    var changeBuf = document.getElementById("Actioncheck2");
    var changeList = document.getElementById("changeList");

    if(changeBuf.checked){
        changeList.style.display = "block";

    }else{
        changeList.style.display = "none";

    }


}

function tranpGo(){

    var tranpbutton = document.getElementById('transBut');
    var tBuf = document.getElementById('transB').value.replace(/\s/g, '');
    var tSap = document.getElementById('transS').value.replace(/\s/g, '');
    var output = document.getElementById('outputTrans');
    var outputText = document.getElementById('textTrans');
    output.innerHTML =  "";outputText.innerHTML="";
    //var checkConfirm = document.getElementById("confirmCheck");

    var body="";


    let xhrB = new XMLHttpRequest();

    xhrB.onreadystatechange = function() {
        if (xhrB.readyState !== 4) return;
        if (xhrB.status == 200) {

            var respTransp = xhrB.responseText.split(",");

            var printTable = "<table class=\"w3-table-all w3-card-4 w3-border \">" +
                "                <tr class = 'w3-light-blue'>\n" +
                "                   <th>Номер Буфера</th>"+
                "                   <th>Статус Буфера</th>"+
                "                   <th>Дата ТТН</th>"+
                "                   <th>Номер АП</th>"+
                "                   <th>ТТН ЕГАИС</th>"+
                "                   <th>Статус ТТН ЕГАИС в БАХУС</th>"+
                "                </tr>";
        //    for(var l=0;l <respTransp.length;l++){
       //         if(respTransp[l] !=''){
                    //
                    printTable += "<tr><td>" + respTransp[0].replace("[","") + "</td>" +
                        "<td>" + respTransp[1] + "</td>" +
                        "<td>" + respTransp[2] + "</td>" +
                        "<td>" + respTransp[3] + "</td>" +
                        "<td>" + respTransp[4] + "</td>" +
                        "<td>" + respTransp[5] + "</td>" +
                        "</tr>";
                    //errorOfGod = TableBufParsed[6];

         //       }
       //     }


            printTable += "</table>";

            printTable += "<div class=\"w3-cell-row\">";
            printTable +="<div class=\"w3-container w3-cell\" style=\"width: 35%\"></div>";

            printTable +="<div class=\"w3-container w3-cell\" style=\"width: 20%\"><button id=\"transBut\" " +
                " class=\"w3-btn w3-green w3-round-large\" " +
                " onclick=\"WRGo('" + tBuf + "','"+ tSap + "')\">Распровести накладную</button></div>";

            printTable +="<div class=\"w3-container w3-cell\" style=\"width: 10%\"><h4> reply_id </h4></div>";

            printTable += "<div class=\"w3-container w3-cell\" style=\"width: 35%\"><input disabled id=\"replyWay\" type=\"text\"  class=\"w3-input w3-border w3-round-medium\"></div>";

            printTable += "</div>";

            output.innerHTML = printTable;


        }
    }

    var body = 'TBuf=' + tBuf+
        '&TW=0' +
        '&chpar=0'+
        '&TSap='+ tSap;

    xhrB.open('POST', '/test/transport', true);
    xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrB.send(body);

}

function buforno(){
    var mbuf = document.getElementById("mm_buf");
    var rbuf = document.getElementById("inpunt2");
    if(mbuf.checked){
        rbuf.disabled = false;
        //editCheck.disabled = true;
    }else{
        rbuf.disabled = true;
    }
}


function searchMarkus(){
    //main input
    var input_1 = document.getElementById('inpunt1').value;

    var input_2 = document.getElementById('inpunt2').value;
    var ifBuf="_"+input_2;

    //radio buttons
    var m_sap_ord = document.getElementById('mm_sap_ord');
    var m_guid = document.getElementById('mm_guid');
    var m_pallet = document.getElementById('mm_pallet');
    var m_buf = document.getElementById('mm_buf');

    var param = "";
    //check choise
    if(mm_sap_ord.checked)param="order";
    if(mm_guid.checked)param="guid";
    if(mm_pallet.checked)param="pallet";
    if(mm_buf.checked)param="buf";

    //area output info
    var outputMarkus = document.getElementById('outputmarkus');
    //variable to print
    var printToMarkus="";



    let xhrB = new XMLHttpRequest();

    xhrB.onreadystatechange = function() {
        if (xhrB.readyState !== 4) return;
        if (xhrB.status == 200) {
            printToMarkus="<table class=\"w3-table-all w3-small\">";

            var markus_response = xhrB.responseText.split("!");

            var details = markus_response[1].split(",");
            var sapOrder = details[2].split(":");

            var all_status = markus_response[4].split(",");
            var status = all_status[0].split(":");

            var pluQuan = markus_response[5].split("},{");
            //console.log("pluQuan "+pluQuan);
            //console.log("markus_response[5] "+markus_response[5]);

            //for(var i=0; i < markus_response.length; i++){

                printToMarkus+="<tr>";
                printToMarkus+="<td>id</td><td>"+markus_response[0]+"</td>";
                printToMarkus+="</tr>";

                printToMarkus+="<tr>";
                printToMarkus+="<td>sapOrdIdHeader</td><td>"+sapOrder[1].replace(/\"/g,"")+"</td>";
                printToMarkus+="</tr>";

                printToMarkus+="<tr>";
                printToMarkus+="<td>GUID</td><td>"+markus_response[2]+"</td>";
                printToMarkus+="</tr>";

                printToMarkus+="<tr>";
                printToMarkus+="<td>TYPE</td><td>"+markus_response[3]+"</td>";
                printToMarkus+="</tr>";

                printToMarkus+="<tr>";
                printToMarkus+="<td>STATUS</td><td>"+status[1].replace(/\"/g,"")+"</td>";
                printToMarkus+="</tr>";

                printToMarkus+="<tr >";//printToMarkus+="<td>DETAILS</td><td>"+markus_response[5]+"</td>";

                printToMarkus+="<td onclick=\"myFunctionT('Demo101')\">DETAILS</td><td onclick=\"myFunctionT('Demo101')\">Развернуть</td>"
                printToMarkus+="</tr>";

                var print2ToMarkus="";
            printToMarkus+="<tr id=\"Demo101\" class=\"w3-hide\" width=\"100%\" ><td width=\"80%\"></td><td width=\"20%\"><table class=\"w3-table-all w3-small\">";
            printToMarkus+="<thead><tr><th>PLU</th><th>QTY</th></tr></thead>";

                for(var i=0; i < pluQuan.length; i++){
                    var QuanPlu = pluQuan[i].split(",");
                    //console.log("PluQuan"+pluQuan[i]);
                    //console.log("QuanPlu"+QuanPlu);
                    var q = QuanPlu[0].split(":");var p = QuanPlu[4].split(":"); var pw=p[1].replace("}]","");
                    //console.log("q "+q[1]+"p "+p[1]);
                    printToMarkus+="<tr><td>"+ q[1].replace(/\"/g,"") + "</td><td>" + pw.replace(/\"/g,"") + "</td></tr>";
                }
                /*


                 */


         //   }
            printToMarkus+="</table></td></tr>"

            printToMarkus+="<tr>";
            printToMarkus+="<td>StoreIn</td><td>"+markus_response[6]+"</td>";
            printToMarkus+="</tr>";
            printToMarkus+="</table>";
            //printToMarkus+=print2ToMarkus;
            outputMarkus.innerHTML=printToMarkus;


        }
    }

    var body = 'paramSearch='+param+
        '&value='+input_1+
        '&SAP='+ifBuf;

    xhrB.open('POST', '/test/markus', true);
    xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrB.send(body);



}

function myFunctionT(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}


function WRGo(Buf,Sap){




    var reply_text = document.getElementById('respWR');

    var outputCheck = document.getElementById('outputTrans');

    var printTableCheck="";



    let xhrB = new XMLHttpRequest();

    xhrB.onreadystatechange = function() {
        if (xhrB.readyState !== 4) return;
        if (xhrB.status == 200) {

            printTableCheck += "<div class=\"w3-cell-row\">";

            printTableCheck +="<div class=\"w3-container w3-cell\" style=\"width: 35%\"></div>";

            printTableCheck +="<div class=\"w3-container w3-cell\" style=\"width: 20%\"><button id=\"checkTicket\" " +
                " class=\"w3-btn w3-green w3-round-large\" " +
                " onclick=\"checkGo('" + Buf + "','"+ Sap + "')\"> Проверить ответ от ЕГАИС </button></div>";

            printTableCheck +="<div class=\"w3-container w3-cell\" style=\"width: 10%\"><h4> Статус </h4></div>";

            printTableCheck += "<div class=\"w3-container w3-cell\" style=\"width: 35%\">" +
                "<span onclick=\"document.getElementById('ticketModal').style.display='block'\">" +
                "<input onclick=\"document.getElementById('ticketModal').style.display='block'\" " +
                "disabled id=\"respEg\" type=\"text\"  class=\"w3-input w3-border w3-round-medium\"></span></div>";

            printTableCheck += "</div>";

            outputCheck.innerHTML += printTableCheck;

            var reply_output = document.getElementById('replyWay');

            reply_output.value = xhrB.responseText;

        }
    }

    var body = 'TBuf=' + Buf+
        '&TW=1' +
        '&RPL=0' +
        '&chpar=0'+
        '&TSap='+ Sap;

    xhrB.open('POST', '/test/transport', true);
    xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrB.send(body);

}

function changeTrans(idd){

    var usInput = document.getElementById(idd).value;
    var toTrans = document.getElementById(idd.replace("tran_",""));
    //alert(usInput);
    var defValue = "<ns71:"+ idd.toUpperCase()+"/>";

    if(usInput ===''){
        toTrans.value = ""+defValue;
        //alert(toTrans)
    }else{
        //alert('else')
        toTrans.value ="<ns71:"+ idd.toUpperCase()+">"+usInput+"</ns71:"+ idd.toUpperCase()+">";
    }

}


function checkGo(Buf,Sap){

    var reply_text = document.getElementById('respWR');
    var outputCheck = document.getElementById('outputTrans');
    var replyTi = document.getElementById('replyWay').value;
    var btnCh = document.getElementById('checkTicket')

    btnCh.disabled = true;

        //btnCh.value = "Следующая проверка через 30 сек."
        //setTimeout(() => btnCh.disabled = false, 31000);

    var printTableCheck="";


    let xhrB = new XMLHttpRequest();

    xhrB.onreadystatechange = function() {
        if (xhrB.readyState !== 4) return;
        if (xhrB.status == 200) {

            tresp = xhrB.responseText;

            var replyCh = document.getElementById('respEg');
            if(tresp.includes("Тикеты не найдены")){

                btnCh.disabled = false;

                replyCh.value = tresp;

            }else{




                ticketView(xhrB.responseText);
                replyCh.value = "Тикет найден. Кликни чтобы посмотреть";
                btnCh.disabled = true;
                //var modalWr = document.getElementById("transModal").style.display="block";



            }
        }
    }

    var body = 'TBuf=' + Buf+
        '&TW=1' +
        '&RPL=' + replyTi +
        '&chpar=0'+
        '&TSap='+ Sap;

    xhrB.open('POST', '/test/transport', true);
    xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrB.send(body);

}


function ticketView(xmlTi){



    //ticketText.style.display = "block";
    var modaldiv = document.getElementById("textTrans");


    var printShowTicket = "<div id=\"ticketModal\" class=\"w3-modal\" style=\"z-index: 999\">\n" +
        "                <div class=\"w3-modal-content w3-card-4\">\n" +
        "                    <header class=\"w3-container w3-teal\">\n" +
        "                        <span onclick=\"document.getElementById('ticketModal').style.display='none'\" class=\"w3-button w3-display-topright\">&times;</span>\n" +
        "                        <h4>Ticket</h4>\n" +
        "                    </header>\n" +
        "\n" +
        "                    <div id=\"xmlContent\" class=\"w3-container\">\n" +
        "\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>"

    printShowTicket += "            <div id=\"transModal\" class=\"w3-modal\" style=\"z-index: 999\">\n" +
        "                <div class=\"w3-modal-content w3-card-4\">\n" +
        "                    <header class=\"w3-container w3-teal\">\n" +
        "                    <span onclick=\"document.getElementById('transModal').style.display='none'\" class=\"w3-button w3-display-topright\">&times;</span>\n" +
        "                        <h4>Траспортный раздел</h4>\n" +
        "                    </header>\n" +
        "\n" +
        "\n" +
        "\n" +
        "                    <div class=\"w3-cell-row\">\n" +
        "                    \t<div class=\"w3-cell\" style=\"width: 40%\">\n" +
        "                            <form class=\"w3-container\">\n" +
        "                              <label class=\"w3-text-blue\">TRAN_TYPE</label>\n" +
        "                            <input id = \"tran_type\" oninput=\"changeTrans(this.id)\" class=\"w3-input w3-border\" type=\"text\">\n" +
        "\n" +
        "                            <label class=\"w3-text-blue\">TRAN_COMPANY</label>\n" +
        "                            <input id = \"tran_company\" oninput=\"changeTrans(this.id)\" class=\"w3-input w3-border\" type=\"text\">\n" +
        "\n" +
        "                            <label class=\"w3-text-blue\">TRAN_CAR</label>\n" +
        "                            <input id = \"tran_car\" oninput=\"changeTrans(this.id)\" class=\"w3-input w3-border\" type=\"text\">\n" +
        "\n" +
        "                            <label class=\"w3-text-blue\">TRAN_TRAILER</label>\n" +
        "                            <input id = \"tran_trailer\" oninput=\"changeTrans(this.id)\" class=\"w3-input w3-border\" type=\"text\">\n" +
        "\n" +
        "                            <label class=\"w3-text-blue\">TRAN_CUSTOMER</label>\n" +
        "                            <input id = \"tran_customer\" oninput=\"changeTrans(this.id)\" class=\"w3-input w3-border\" type=\"text\">\n" +
        "\n" +
        "                            <label class=\"w3-text-blue\">TRAN_DRIVER</label>\n" +
        "                            <input id = \"tran_driver\" oninput=\"changeTrans(this.id)\" class=\"w3-input w3-border\" type=\"text\">\n" +
        "\n" +
        "                            <label class=\"w3-text-blue\">TRAN_LOADPOINT</label>\n" +
        "                            <input id = \"tran_loadpoint\" oninput=\"changeTrans(this.id)\" class=\"w3-input w3-border\" type=\"text\">\n" +
        "\n" +
        "                            <label class=\"w3-text-blue\">TRAN_UNLOADPOINT</label>\n" +
        "                            <input id = \"tran_unloadpoint\" oninput=\"changeTrans(this.id)\" class=\"w3-input w3-border\" type=\"text\">\n" +
        "\n" +
        "                            <label class=\"w3-text-blue\">TRAN_REDIRECT</label>\n" +
        "                            <input id = \"tran_redirect\" oninput=\"changeTrans(this.id)\" class=\"w3-input w3-border\" type=\"text\">\n" +
        "\n" +
        "                            <label class=\"w3-text-blue\">TRAN_FORWARDER</label>\n" +
        "                            <input id = \"tran_forwarder\" oninput=\"changeTrans(this.id)\" class=\"w3-input w3-border\" type=\"text\">\t\t\t\t\t\t\t<br>\n" +
        "                            <button onclick=\"confirmChangeWay()\" class=\"w3-btn w3-blue\">Сохранить</button>\n" +
        "\n" +
        "                        </form>\n" +
        "</div>\n" +
        "                    \t<div class=\"w3-cell\" style=\"width: 60%\">\n" +
        "                    \t <br>\n" +
        "                            <input value=\"<ns71:Transport>\" disabled class=\"w3-input \" type=\"text\" style=\"border: none;outline: none;\">\n" +
        "                            <input id=\"type\" value=\"<ns71:TRAN_TYPE/>\" disabled class=\"w3-input \" type=\"text\" style=\"border: none;outline: none;\">\n" +
        "                            <input id=\"company\" value=\"<ns71:TRAN_COMPANY/>\" disabled class=\"w3-input \" type=\"text\" style=\"border: none;outline: none;\">\n" +
        "                            <input id=\"car\" value=\"<ns71:TRAN_CAR/>\" disabled class=\"w3-input \" type=\"text\" style=\"border: none;outline: none;\">\n" +
        "                            <input id=\"trailer\" value=\"<ns71:TRAN_TRAILER/>\" disabled class=\"w3-input \" type=\"text\" style=\"border: none;outline: none;\">\n" +
        "                            <input id=\"customer\" value=\"<ns71:TRAN_CUSTOMER/>\" disabled class=\"w3-input \" type=\"text\" style=\"border: none;outline: none;\">\n" +
        "                            <input id=\"driver\" value=\"<ns71:TRAN_DRIVER/>\" disabled class=\"w3-input \" type=\"text\" style=\"border: none;outline: none;\">\n" +
        "                            <input id=\"loadpoint\" value=\"<ns71:TRAN_LOADPOINT/>\" disabled class=\"w3-input \" type=\"text\" style=\"border: none;outline: none;\">\n" +
        "                            <input id=\"unloadpoint\" value=\"<ns71:TRAN_UNLOADPOINT/>\" disabled class=\"w3-input \" type=\"text\" style=\"border: none;outline: none;\">\n" +
        "                            <input id=\"redirect\" value=\"<ns71:TRAN_REDIRECT/>\" disabled class=\"w3-input \" type=\"text\" style=\"border: none;outline: none;\">\n" +
        "                            <input id=\"forwarder\" value=\"<ns71:TRAN_FORWARDER/>\" disabled class=\"w3-input \" type=\"text\" style=\"border: none;outline: none;\">\n" +
        "                            <input value=\"</ns71:Transport>\" disabled class=\"w3-input \" type=\"text\" style=\"border: none;outline: none;\">\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>";

    modaldiv.innerHTML += printShowTicket;
    var showTicket = document.getElementById("ticketModal");
    var ticketText = document.getElementById("xmlContent");
    //modaldiv.style.display = "block";
    xmlTi=xmlTi.replace(/</g,"&lt;"); xmlTi= xmlTi.replace(/>/g,"&gt;"); xmlTi= xmlTi.replace(/&gt;&lt/g,"&gt\n&lt");
    ticketText.innerHTML = "<pre id=\"xmlstyle\" class=\"xml\">"+xmlTi+"</pre> ";
    var xmlText = document.getElementById("xmlstyle");
    //xmlstyle.innerText +=

    showTicket.style.display = "block";//--
    //добавить модальную форму для заполнения траспортного раздела!!!
    modaldiv.innerHTML +="<button id=\"checkTicket\" " +
        " class=\"w3-btn w3-green w3-round-large\" " +
        " onclick=\"document.getElementById('transModal').style.display='block'\"> Заполнить транспортный раздел </button>";

}


function confirmChangeWay(){



    var tran_type = document.getElementById("tran_type").value;
    var tran_company = document.getElementById("tran_company").value;
    var tran_trailer = document.getElementById("tran_trailer").value;
    var tran_customer = document.getElementById("tran_customer").value;
    var tran_driver = document.getElementById("tran_driver").value;
    var tran_loadpoint = document.getElementById("tran_loadpoint").value;
    var tran_unloadpoint = document.getElementById("tran_unloadpoint").value;
    var tran_redirect = document.getElementById("tran_redirect").value;
    var tran_forwarder = document.getElementById("tran_forwarder").value;

    var bbuf = document.getElementById("transB").value;
    var ssap = document.getElementById("transS").value;



    //btnCh.disabled = true;

    //btnCh.value = "Следующая проверка через 30 сек."
    //setTimeout(() => btnCh.disabled = false, 31000);

    var printTableCheck="";


    let xhrB = new XMLHttpRequest();

    xhrB.onreadystatechange = function() {
        if (xhrB.readyState !== 4) return;
        if (xhrB.status == 200) {

            tresp = xhrB.responseText;

        }
    }

    var body = 'TBuf=' + bbuf+
        '&TW=0' +
        '&RPL=' + replyTi +
        '&chpar={' + tran_type +','+tran_company +','+tran_trailer +','+tran_customer +','+tran_loadpoint +','+tran_unloadpoint +','+tran_redirect+','+tran_forwarder+'}'+
        '&TSap='+ ssap;

    xhrB.open('POST', '/test/transport', true);
    xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrB.send(body);

}


function godBacchus(){
    var Godbuff = document.getElementById('Godbuff').value.replace(/\s/g, '');
    var GodSAP = document.getElementById('GodSAP').value.replace(/\s/g, '');

    var GodOutput = document.getElementById('GodOutput');

    GodOutput.innerHTML = "";


    var GodTextArea = document.getElementById('GodTextArea');

    GodTextArea.innerHTML = "";

    var errorOfGod = "";


    let xhrB = new XMLHttpRequest();

    xhrB.onreadystatechange = function() {
        if (xhrB.readyState !== 4) return;
        if (xhrB.status == 200) {

            //----cp
            var respText = xhrB.responseText;
            var listBuff = respText.split("]&&[");
            var printTableInfo2 ="";
            var printTask = "<table class=\"w3-table-all w3-card-4 w3-border w3-hoverable w3-small\">" +
                "<tr class = \"w3-light-blue\">\n" +
                "<th>C_ID</th>"+
                "<th>C_CREATED</th>"+
                "<th>C_DATE_DONE</th>"+
                "<th>C_PROCESSING</th>"+
                "<th>C_TASK_STATUS</th>"+
                "<th>C_APPLICATION_STATUS</th>"+
                "<th>C_TASK_TYPE</th>"+
                "<th>C_ERROR_DETAILS</th>"+
                "<th>C_TRACE_ID</th>"+
                "<th>C_MERCURY_QUEUE</th>"+
                "<th>C_ATTEMPTS</th>"+
                "<th>C_VERSION</th>"+
                "<th>C_NUMBER_IN_SEQ</th>"+
                "<th>C_HOSTNAME</th>"+
                "<th>C_STARTED</th>"+
                "<th>C_STATUS_CODE</th>"+
                "<th>C_STATUS_MSG</th>"+
                "<th>C_REQ_USER_DATA</th>"+
                "<th>C_PARENT</th>"+
                "<th>C_TASK_SDSS</th>"+
                "<th>C_PRIORITY</th>"+
                "<th>C_DOC_SDTB_ID</th>"+
                "<th>C_ERROR_CODE</th>"+
                "<th>C_USER</th>"+
                "<th>C_TASK_DATA</th>"+
                "<th>CODV_ID</th>"+
                "<th>C_PLANNED</th>"+
                "<th>C_RESTARTED_FROM_ID</th>"+
                "<th>C_APPLICATION_ID</th>"+
                "<th>C_DOC_ID</th>"+
                "<th>ROW_CHG_NUM</th>"+
                "<th>C_GIT_HASH</th>"+
                "<th>C_GRADLE_BUILD_DATE</th>"+
                "<th>C_RESTART_ATTEMPTS</th>"+
                "<th>C_HOST_STARTDATE</th>"+
                "<th>C_ORPHANED</th>"+
                "<th>C_SOURCE</th>"+
                "<th>C_TASK_GROUP</th>"
            "</tr>";
            var printUtm = "<table class=\"w3-table-all w3-card-4 w3-border w3-hoverable w3-small\">" +
                "<tr class = \"w3-light-blue\">\n" +
                "<th>BUD_ID</th>"+
                "<th>CODV_ID</th>"+
                "<th>BUD_URL</th>"+
                "<th>DOC_ADDDATE</th>"+
                "<th>DOC_MODDATE</th>"+
                "<th>DOC_MODUSER</th>"+
                "<th>DOC_STATUS</th>"+
                "<th>ROW_CHG_NUM</th>"+
                "<th>BUD_BODY</th>"+
                "<th>BUD_REPLY_ID</th>"+
                "<th>BUD_DIRECTION</th>"+
                "<th>BUD_REG_ID</th>"+
                "<th>BUD_INNER_REPLY_ID</th>"+
                "<th>BUD_UTM_REPLY_ID</th>"+
                "<th>BUD_OUT_ID</th>"
            "</tr>";
            var printTable = "<table class=\"w3-table-all w3-card-4 w3-border \">" +
                "                <tr class = 'w3-light-blue'>\n" +
                "                   <th>Номер Буфера</th>"+
                "                   <th>Статус Буфера</th>"+
                "                   <th>Дата ТТН</th>"+
                "                   <th>Номер АП</th>"+
                "                   <th>ТТН ЕГАИС</th>"+
                "                   <th>Статус ТТН ЕГАИС в БАХУС</th>"+
                "                </tr>";
            for(var l=0;l <listBuff.length-2;l++){
                if(listBuff[l] !=''){
                    var tableBuf = listBuff[l].split(']');
                    var TableBufArr = tableBuf[0].replace('[','');
                    var TableBufParsed = TableBufArr.split(',');
                    printTable += "<tr><td>" + TableBufParsed[0] + "</td>" +
                        "<td>" + TableBufParsed[1] + "</td>" +
                        "<td>" + TableBufParsed[2] + "</td>" +
                        "<td>" + TableBufParsed[3] + "</td>" +
                        "<td>" + TableBufParsed[4] + "</td>" +
                        "<td>" + TableBufParsed[5] + "</td>" +
                        "</tr>";
                    errorOfGod = TableBufParsed[6];

                }
            }

            var Rowtasks = listBuff[1].split('][');
            for(var ii=0; ii < Rowtasks.length; ii++){
                //var bCdata = Rowtasks.split
                var tasks = Rowtasks[ii].split('$$,');
                printTask += "<tr>";
                for(var x=0; x < tasks.length; x++){
                    if(tasks[x].length > 80){
                        printTask += "<td onclick=\"document.getElementById('id"+ii+"').style.display='block'\">" + tasks[x].substr(0,80) +
                            //"<span style=\"display:none\" id=\"fullvalueTask"+x+"\">" + tasks[x] + "</span>"+
                            "...</td>";
                        printTask += "  <div id='id"+ii + "' class=\"w3-modal\" style = \"z-index: 999\">\n" +
                            "    <div class=\"w3-modal-content\">\n" +
                            "      <div class=\"w3-container\">\n" +
                            "        <span onclick=\"document.getElementById('id"+ii+"').style.display='none'\" class=\"w3-button w3-display-topright\">&times;</span>\n" +
                            "        <p>"+tasks[x]+"</p>\n" +
                            "      </div>\n" +
                            "    </div>\n" +
                            "  </div>";
                    }else{
                        printTask += "<td>" + tasks[x].replace('$$','') +"</td>";
                    }

                }
                printTask += "</tr>";
            }

            printTask += "</table>";

            var Rowutm = listBuff[2].split('][');
            for(var iii=0; iii < Rowutm.length; iii++){
                //var bCdata = Rowtasks.split
                var utms = Rowutm[iii].split('$$,');
                printUtm += "<tr>";
                for(var xx=0; xx < utms.length; xx++){
                    if(utms[xx].length > 80){
                        utms[xx] = utms[xx].replace(/</g,'&lt');
                        utms[xx] = utms[xx].replace(/</g,'&lt');
                        utms[xx] = utms[xx].replace(']','');
                        //utms[xx] = utms[xx].replace(/></g,'>\n<');
                        printUtm += "<td onclick=\"document.getElementById('idu"+iii+"').style.display='block'\">" + utms[xx].substr(0,80) +
                            //"<span style=\"display:none\" id=\"fullvalueTask"+x+"\">" + tasks[x] + "</span>"+
                            "...</td>";
                        printUtm += "  <div  id='idu"+iii + "' class=\"w3-modal\" style = \"z-index: 999\">\n" +
                            "    <div class=\"w3-modal-content\">\n" +
                            "      <div class=\"w3-container\">\n" +
                            "        <span onclick=\"document.getElementById('idu"+iii+"').style.display='none'\" class=\"w3-button w3-display-topright\">&times;</span>\n" +
                            "        <p>"+utms[xx]+"</p>\n" +
                            "      </div>\n" +
                            "    </div>\n" +
                            "  </div>";
                    }else{
                        printUtm += "<td>" + utms[xx].replace('$$','') +"</td>";
                    }

                }
                printUtm += "</tr>";
            }

            printUtm += "</table>";











            printTable +="</table><br>";

            if(TableBufParsed[1].includes("Ошибка")){

                printTable +=
                    "<button onclick=\"myFunction2('Demo3')\" class=\"w3-btn w3-block w3-red\">"+
                    "Ошибка в буфере</button>" +

                    "<div id=\"Demo3\" class=\"w3-hide w3-card w3-padding-16\">" +
                    "<p id=\"textOfError\">" + errorOfGod + "</p>" +
                    //style = "height: 200px"
                        "<button onclick=\"myFunction2('Demo1')\" class=\"w3-btn w3-block w3-light-blue w3-left-align\">"+
                        "Ответ для пользователя</button>" +
                        "<div id=\"Demo1\" class=\"w3-hide w3-card\">" +
                        "<p id=\"textToUserError\">" + TableBufParsed[7].replace(/\|/g,", ") + "</p>" +
                        "</div>" +

                    "</div>";

            }



            printTable +="<br><button onclick=\"myFunction2('Demo4')\" class=\"w3-btn w3-block w3-green\">"+
                "Таски</button>" +

                "<div id=\"Demo4\" class=\"w3-hide w3-card w3-padding-16\" style = \"overflow-x:scroll\">" +
                "<p id=\"tableOfTasks\">" + printTask + "</p>" +
                "</div>";

            printTable +="<br><button onclick=\"myFunction2('Demo2')\" class=\"w3-btn w3-block w3-green\">"+
                "Тикеты из УТМ</button>" +

                "<div id=\"Demo2\" class=\"w3-hide w3-card w3-padding-16\" style = \"overflow-x:scroll\">" +
                "<p id=\"tableOfTickets\">" + printUtm + "</p>" +
                "</div>";



            GodOutput.innerHTML = printTable;

            //printTaleInfo += "</tr></table>";

            //outputText.innerHTML = printTaleInfo;

            //outputText.innerHTML += printTableInfo2;
            //----endcp
        }
    }


    var body = 'GodBuf=' + Godbuff+
        '&GodSap='+ GodSAP;

    xhrB.open('POST', '/test/togod', true);
    xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrB.send(body);

}

function myFunction2(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}


function out31() {

    var button = document.getElementById('send31');
    var inBuf = document.getElementById('buff').value;
    var inSap = document.getElementById('SAP').value;
    var output = document.getElementById('output');
    var outputText = document.getElementById('textArea');
    output.innerHTML =  "";outputText.innerHTML="";
    //var checkConfirm = document.getElementById("confirmCheck");
    var bufOrBuffs="";
    var userChoice="";
    var body="";
    inBuf=inBuf.replace(/\s/g, '');
    document.getElementById('send31').disabled=true;
    for(var c=0;c < 3; c++){
        if(document.getElementById('check'+c).checked){userChoice=c;}
    }

    let xhrB = new XMLHttpRequest();

    xhrB.onreadystatechange = function() {
        if (xhrB.readyState !== 4) return;
        if (xhrB.status == 200) {

            document.getElementById('send31').disabled=false;
//------------------------AFTER
            switch (userChoice) {
                case 0:
                    // alert("Confirm");
                    var respText = xhrB.responseText;
                    var listBuff = respText.split("$$");
                    var printTableInfo2 ="";
                    var printTaleInfo = "<table class=\"w3-table-all w3-card-4 w3-border \" onClick='\"tableRefresh()\"'><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Буфер" + bufOrBuffs + " на РЦ  </button></td>";
                    var printTable = "<table class=\"w3-table-all w3-card-4 w3-border \">" +
                        "                <tr class = 'w3-light-blue'>\n" +
                        "                   <th>Буфер</th>"+
                        "                   <th>Дата</th>"+
                        "                   <th>Номер ТТН</th>"+
                        "                   <th>Статус</th>"+
                        "                </tr>";
                    for(var l=0;l <listBuff.length;l++){
                        if(listBuff[l] !=''){
                            var tableBuf = listBuff[l].split(']');
                            TableBufArr = tableBuf[0].replace('[','');
                            TableBufParsed = TableBufArr.split(',');
                            printTable += "<tr><td>" + TableBufParsed[0] + "</td>" +
                                "<td>" + TableBufParsed[1] + "</td>" +
                                "<td>" + TableBufParsed[2] + "</td>" +
                                "<td>" + TableBufParsed[3] + "</td>" +
                                "</tr>";
                            printTaleInfo += "<td>  <button onclick=\"document.getElementById('id"+l+"').style.display='block'\" " +
                                "class=\"w3-btn\">" + TableBufParsed[0] + "</button></td>";
                            printTableInfo2+= "<div id='id"+l + "' class=\"w3-modal\" style=\"z-index: 999\">\n" +
                                "                <div class=\"w3-modal-content\">\n" +
                                "\n" +
                                "                    <header class=\"w3-container w3-teal\">\n" +
                                "                         <span onclick=\"document.getElementById('id"+l+"').style.display='none'\"\n" +
                                "                             class=\"w3-button w3-display-topright\">&times;</span>" +
                                "<h2>Буфер " + bufOrBuffs  + TableBufParsed[0] + "</h2>" +
                                "</header>\n" +
                                "                    <div id='toFlow" + l + "'  class=\"w3-container\" style='text-align: left'>\n" +
                                "                    </div>\n" +
                                "                </div>\n" +
                                "            </div>";
                        }
                    }
                    printTable +="</table><br>";
                    output.innerHTML = printTable;

                    printTaleInfo += "</tr></table>";

                    outputText.innerHTML = printTaleInfo;

                    outputText.innerHTML += printTableInfo2;


                    var listBuff = respText.split("$$");
                    for(var l=0;l <listBuff.length;l++) {

                        if (listBuff[l] != '') {
                            var tableBuf = listBuff[l].split(']');

                            var flow31 = tableBuf[1].replace(/\>\</g,'>\n<');
                            //alert(flow31);
                            var printModal = document.getElementById('toFlow'+ l);
                            printModal.innerText = flow31;
                        }
                    }


                    outputText.innerHTML += "<table class=\"w3-table-all w3-card-4 w3-border \"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Отправить буфер(ы) ?</button></td>  " +
                        "<td><button id='yesConf' onclick='confimSendOut31()' class=\"w3-btn w3-green w3-large w3-round-large\">Да</button></td> " +
                        "<td><button class=\"w3-btn w3-red w3-large w3-round-large\">Нет</button></nobr></td></tr></table>";

                    break;
                case 1:
                    //alert("Errors");
                    var respText = xhrB.responseText;
                    var printToTable="";
                    var listErrorBufs="";
                    if(respText.includes("Ошибочные")){
                        //alert("Успех!");
                        printToTable +="<table class=\"w3-table-all w3-card-4 w3-border \"><tr class=\"w3-light-gray\"><td>Ошибочные буферы не найдены!</td></tr></table>";
                        output.innerHTML=printToTable;
                    }else{
                        listErrorBufs=respText.split(",");
                        printToTable +="<table class=\"w3-table-all w3-card-4 w3-border \"><tr class=\"w3-light-gray\"><td>Ошибочные буферы</td>";
                        for(var b=0;b < listErrorBufs.length;b++){
                            printToTable += "<td>"+listErrorBufs[b]+"</td>";
                        }
                        printToTable +="</tr></table>";
                        output.innerHTML=printToTable;
                        if(document.getElementById("check0").checked && !respText.includes("Ошибочные")){
                            outputText.innerHTML += "<table class=\"w3-table-all w3-card-4 w3-border \"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Отправить буфер ?</button></td>  " +
                                "<td><button id='yesMass' onclick=\"massConfirm()\"  class=\"w3-btn w3-green w3-large w3-round-large\">Да</button></td> " +
                                "<td><button class=\"w3-btn w3-red w3-large w3-round-large\">Нет</button></nobr></td></tr></table>";
                        }else{
                            massConfirm();

                        }


                    }




                    break;
                case 2:
                    //  alert("Edit");

                    var respText = xhrB.responseText;
                    var listBuff = respText.split("$$");
                    var printTableInfo2 ="";
                    var printTaleInfo = "<table class=\"w3-table-all w3-card-4 w3-border \" onClick='\"tableRefresh()\"'><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Буфер" + bufOrBuffs + " на РЦ  </button></td>";
                    var printTable = "<table class=\"w3-table-all w3-card-4 w3-border \">" +
                        "                <tr class = 'w3-light-blue'>\n" +
                        "                   <th>Буфер</th>"+
                        "                   <th>Дата</th>"+
                        "                   <th>Номер ТТН</th>"+
                        "                   <th>Статус</th>"+
                        "                </tr>";
                    for(var l=0;l <listBuff.length;l++){
                        if(listBuff[l] !=''){
                            var tableBuf = listBuff[l].split(']');
                            TableBufArr = tableBuf[0].replace('[','');
                            TableBufParsed = TableBufArr.split(',');
                            printTable += "<tr><td>" + TableBufParsed[0] + "</td>" +
                                "<td>" + TableBufParsed[1] + "</td>" +
                                "<td>" + TableBufParsed[2] + "</td>" +
                                "<td>" + TableBufParsed[3] + "</td>" +
                                "</tr>";
                            printTaleInfo += "<td>  <button onclick=\"document.getElementById('id"+l+"').style.display='block'\" " +
                                "class=\"w3-btn\">Редактировать буфер " + TableBufParsed[0] + "</button></td>";
                            printTableInfo2+= "<div id='id"+l + "' class=\"w3-modal\" style=\"padding-top: 50px\; z-index: 999\">\n" +
                                "                <div class=\"w3-modal-content\">\n" +
                                "                    <header class=\"w3-container w3-teal\">\n" +
                                "                         <span onclick=\"document.getElementById('id"+l+"').style.display='none'\"\n" +
                                "                             class=\"w3-button w3-display-topright\">&times;</span>" +
                                "<h2>Редактировать буфер " + bufOrBuffs  + TableBufParsed[0] + "</h2>" +
                                "</header>\n" +
                                "                    <div contenteditable=\"true\" id='toFlow" + l + "'  class=\"w3-container\" style=\"text-align: left\;overflow-y: scroll\;height: 475px\;\">\n" +
                                "                    " +
                                "</div>\n" +
                                "<table class=\"w3-table-all w3-card-4 w3-border \"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Отправить буфер ?</button></td>  " +
                                "<td><button id='yesAfter' onclick=\"confirmAfterEdit()\; document.getElementById('id"+l+"').style.display='none'\"  class=\"w3-btn w3-green w3-large w3-round-large\">Да</button></td> " +
                                "<td><button onclick=\"document.getElementById('id"+l+"').style.display='none'\" class=\"w3-btn w3-red w3-large w3-round-large\">Нет</button></nobr></td></tr></table>" +
                                "                </div>\n" +
                                "            </div>";
                        }
                    }
                    printTable +="</table><br>";
                    output.innerHTML = printTable;

                    printTaleInfo += "</tr></table>";

                    outputText.innerHTML = printTaleInfo;

                    outputText.innerHTML += printTableInfo2;


                    var listBuff = respText.split("$$");
                    for(var l=0;l <listBuff.length;l++) {

                        if (listBuff[l] != '') {
                            var tableBuf = listBuff[l].split(']');

                            var flow31 = tableBuf[1].replace(/\>\</g,'>\n<');
                            //alert(flow31);
                            var printModal = document.getElementById('toFlow'+ l);
                            printModal.innerText = flow31;
                        }
                    }
                    break;
                default:

                    var respText = xhrB.responseText;
                    var listBuff = respText.split("$$");
                    var printTableInfo2 ="";
                    var printTaleInfo = "<table class=\"w3-table-all w3-card-4 w3-border \" onClick='\"tableRefresh()\"'><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Буфер" + bufOrBuffs + " на РЦ  </button></td>";
                    var printTable = "<table class=\"w3-table-all w3-card-4 w3-border \">" +
                        "                <tr class = 'w3-light-blue'>\n" +
                        "                   <th>Буфер</th>"+
                        "                   <th>Дата</th>"+
                        "                   <th>Номер ТТН</th>"+
                        "                   <th>Статус</th>"+
                        "                </tr>";
                    for(var l=0;l <listBuff.length;l++){
                        if(listBuff[l] !=''){
                            var tableBuf = listBuff[l].split(']');
                            TableBufArr = tableBuf[0].replace('[','');
                            TableBufParsed = TableBufArr.split(',');
                            printTable += "<tr><td>" + TableBufParsed[0] + "</td>" +
                                "<td>" + TableBufParsed[1] + "</td>" +
                                "<td>" + TableBufParsed[2] + "</td>" +
                                "<td>" + TableBufParsed[3] + "</td>" +
                                "</tr>";
                            printTaleInfo += "<td>  <button onclick=\"document.getElementById('id"+l+"').style.display='block'\" " +
                                "class=\"w3-btn\">" + TableBufParsed[0] + "</button></td>";
                            printTableInfo2+= "<div id='id"+l + "' class=\"w3-modal\" style=\"z-index: 999\">\n" +
                                "                <div class=\"w3-modal-content\">\n" +
                                "\n" +
                                "                    <header class=\"w3-container w3-teal\">\n" +
                                "                         <span onclick=\"document.getElementById('id"+l+"').style.display='none'\"\n" +
                                "                             class=\"w3-button w3-display-topright\">&times;</span>" +
                                "<h2>Буфер " + bufOrBuffs  + TableBufParsed[0] + "</h2>" +
                                "</header>\n" +
                                "                    <div id='toFlow" + l + "'  class=\"w3-container\" style='text-align: left'>\n" +
                                "                    </div>\n" +
                                "                </div>\n" +
                                "            </div>";
                        }
                    }
                    printTable +="</table><br>";
                    output.innerHTML = printTable;

                    printTaleInfo += "</tr></table>";

                    outputText.innerHTML = printTaleInfo;

                    outputText.innerHTML += printTableInfo2;


                    var listBuff = respText.split("$$");
                    for(var l=0;l <listBuff.length;l++) {

                        if (listBuff[l] != '') {
                            var tableBuf = listBuff[l].split(']');

                            var flow31 = tableBuf[1].replace(/\>\</g,'>\n<');
                            //alert(flow31);
                            var printModal = document.getElementById('toFlow'+ l);
                            printModal.innerText = flow31;
                        }
                    }
                    confimSendOut31();

            }





        }
        else {
            alert('Ошибка! ' + xhrB.statusText);
        }
    }

//-------------------------------BEFORE
    switch (userChoice) {
        case 0:
            //alert("Confirm");
            //  outputText.innerHTML += "<table class=\"w3-table-all w3-card-4 w3-border \"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Отправить буфер(ы) ?</button></td>  " +
            //     "<td><button onclick='confimSendOut31()' class=\"w3-btn w3-green w3-large w3-round-large\">Да</button></td> " +
            //     "<td><button class=\"w3-btn w3-red w3-large w3-round-large\">Нет</button></nobr></td></tr></table>";
            body = 'system=bacchus' +
                '&type=out31'+
                '&buff=' + encodeURIComponent(inBuf)+
                '&SAP='+inSap+
                '&checked=true';
            break;
        case 1:
            //alert("Errors");
            body = 'system=bacchus' +
                '&type=out31'+
                '&buff=all'+
                '&SAP='+inSap+
                '&checked=true';
            break;
        case 2:
            // alert("Edit");
            body = 'system=bacchus' +
                '&type=out31'+
                '&buff=' + encodeURIComponent(inBuf)+
                '&SAP='+inSap+
                '&checked=true';
            break;
        default:
            body = 'system=bacchus' +
                '&type=out31'+
                '&buff=' + encodeURIComponent(inBuf)+
                '&SAP='+inSap+
                '&checked=true';

    }










    xhrB.open('POST', '/test/', true);
    xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrB.send(body);




}

function confimSendOut31() {
    let xhrConfirm = new XMLHttpRequest();
    var outputText = document.getElementById('textArea');
    var inBuf = document.getElementById('buff').value;
    if(document.getElementById('yesConf')!==null){document.getElementById('yesConf').disabled=true;}
    document.getElementById('send31').disabled=true;
    inBuf=inBuf.replace(/\s/g, '');
    xhrConfirm.onreadystatechange = function() {
        if (xhrConfirm.readyState !== 4) return;
        if (xhrConfirm.status == 200) {
            if(document.getElementById('yesConf')!==null){document.getElementById('yesConf').disabled=false;}
            var responseConfirm = xhrConfirm.responseText;
            var inBuf = document.getElementById('buff').value;
            var printTable = "<table class=\"w3-table-all w3-card-4 w3-border\"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Буфер успешно отправлен</button></td>";
            var printModal="";
            var bufList = inBuf.split(",");
            for(var ii=0; ii < bufList.length; ii++){
                printTable += "<td><button onclick=\"document.getElementById('id0"+ii+"').style.display='block'\" " +
                    "                    class=\"w3-btn\">" + bufList[ii] + " </button></td>";
                printModal += "<div id='id0" + ii + "' class=\"w3-modal\" style=\"z-index: 999\">" +
                    "                <div class=\"w3-modal-content\">\n" +
                    "\n" +
                    "                    <header class=\"w3-container w3-teal\">\n" +
                    "                         <span onclick=\"document.getElementById('id0"+ii+"').style.display='none'\"\n" +
                    "                             class=\"w3-button w3-display-topright\">&times;</span>" +
                    "<h2>Response " + bufList[ii] + "</h2>" +
                    "</header>\n" +
                    "                    <div id='toResponse" + ii + "' class=\"w3-container\" style='text-align: left'>\n" +
                    "                    </div>\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "                </div>\n" +
                    "            </div>";
            }
            outputText.innerHTML += printTable + "</tr></table>";
            outputText.innerHTML +=   printModal;
            var respBufs = responseConfirm.split("$$");
            for(var ll=0; ll <respBufs.length-1;ll++){
                var toResponseText = document.getElementById('toResponse'+ll);
                toResponseText.innerText = respBufs[ll];
            }
        }
    }
    var inBuf = document.getElementById('buff').value;
    var inSap = document.getElementById('SAP').value;
    inBuf=inBuf.replace(/\s/g, '');
    var body = 'confirmSend#yes'+
        '!type#out31'+
        '!buff#' + encodeURIComponent(inBuf)+
        '!selfBuf#nope'+
        '!SAP#'+inSap;
    // var body = 'confirmSend#yes'+
    //     '!type#out31'+
    //    '!buff#afterEdit'+
    //    '!selfBuf#'+outputText+
    //    '!SAP#'+inSap;
    xhrConfirm.open('POST', '/test/csend', true);
    xhrConfirm.setRequestHeader('Content-Type', 'application/raw')
    xhrConfirm.send(body);
}

function confirmAfterEdit() {

    let xhrConfirm = new XMLHttpRequest();
    var outputBuf = document.getElementById('toFlow0').innerText;
    var outputText = document.getElementById('textArea');

    if(document.getElementById('yesAfter')!==null){document.getElementById('yesAfter').disabled=true;}

    // alert(""+outputBuf.replace(/\n/g,''));
    xhrConfirm.onreadystatechange = function() {
        if (xhrConfirm.readyState !== 4) return;
        if (xhrConfirm.status == 200) {

            if(document.getElementById('yesAfter')!==null){document.getElementById('yesAfter').disabled=false;}
            var responseConfirm = xhrConfirm.responseText;
            var inBuf = document.getElementById('buff').value;
            var printTable = "<table class=\"w3-table-all w3-card-4 w3-border\"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Буфер успешно отправлен</button></td>";
            var printModal="";
            var bufList = inBuf.split(",");
            //  alert(""+bufList.length);
            for(var ii=0; ii < bufList.length; ii++){
                printTable += "<td><button onclick=\"document.getElementById('id0"+ii+"').style.display='block'\" " +
                    "                    class=\"w3-btn\">" + bufList[ii] + " </button></td>";
                printModal += "<div id='id0" + ii + "' class=\"w3-modal\" style=\"z-index: 999\">" +
                    "                <div class=\"w3-modal-content\">\n" +
                    "\n" +
                    "                    <header class=\"w3-container w3-teal\">\n" +
                    "                         <span onclick=\"document.getElementById('id0"+ii+"').style.display='none'\"\n" +
                    "                             class=\"w3-button w3-display-topright\">&times;</span>" +
                    "<h2>Response " + bufList[ii] + "</h2>" +
                    "</header>\n" +
                    "                    <div id='toResponse" + ii + "' class=\"w3-container\" style='text-align: left'>\n" +
                    "                    </div>\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "                </div>\n" +
                    "            </div>";
            }
            outputText.innerHTML += printTable + "</tr></table>";
            outputText.innerHTML +=   printModal;
            var respBufs = responseConfirm.split("$$");
            for(var ll=0; ll <respBufs.length;ll++){
                var toResponseText = document.getElementById('toResponse'+ll);
                toResponseText.innerText = respBufs[ll];
            }
        }
    }
    var inSap = document.getElementById('SAP').value;
    var body = 'confirmSend#yes'+
        '!type#out31'+
        '!buff#afterEdit'+
        '!selfBuf#'+outputBuf+
        '!SAP#'+inSap;
    xhrConfirm.open('POST', '/test/csend', true);
    xhrConfirm.setRequestHeader('Content-Type', 'application/raw')
    xhrConfirm.setRequestHeader('charset', 'UTF-8')
    xhrConfirm.send(body);

}

function massConfirm() {
    let xhrConfirm = new XMLHttpRequest();
    var outputText = document.getElementById('textArea');
    if(document.getElementById('yesMass')!==null){document.getElementById('yesMass').disabled=true;}

    xhrConfirm.onreadystatechange = function() {
        if (xhrConfirm.readyState !== 4) return;
        if (xhrConfirm.status == 200) {

            if(document.getElementById('yesMass')!==null){document.getElementById('yesMass').disabled=false;}
            var responseConfirm = xhrConfirm.responseText;
            var printTable = "<table class=\"w3-table-all w3-card-4 w3-border\"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">" + responseConfirm + "</button></td></tr></table>";
            outputText.innerHTML += printTable;
        }
    }
    var inSap = document.getElementById('SAP').value;
    var body = 'confirmSend=yes'+
        '&type=out31'+
        '&buff=all'+
        '&SAP='+inSap;
    xhrConfirm.open('POST', '/test/csend', true);
    xhrConfirm.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrConfirm.send(body);
}

function in24() {
    var button = document.getElementById('send24');
    var inBuf = document.getElementById('buff24').value;
    var inSap = document.getElementById('SAP24').value;
    var output = document.getElementById('output24');
    var outputText = document.getElementById('textArea24');
    output.innerHTML =  "";outputText.innerHTML="";
    //var checkConfirm = document.getElementById("confirmCheck");
    var bufOrBuffs="";
    var userChoice="";
    var body="";
    inBuf=inBuf.replace(/\s/g, '');

    for(var c=0;c < 2; c++){
        if(document.getElementById('24check'+c).checked){userChoice=c;}
    }

    let xhrB = new XMLHttpRequest();

    document.getElementById('send24').disabled=true;


    xhrB.onreadystatechange = function() {
        if (xhrB.readyState !== 4) return;
        if (xhrB.status == 200) {
            document.getElementById('send24').disabled=false;
//------------------------AFTER
            switch (userChoice) {
                case 0:
                    // alert("Confirm");
                    var respText = xhrB.responseText;
                    var listBuff = respText.split("$$");
                    var printTableInfo2 ="";
                    var printTaleInfo = "<table class=\"w3-table-all w3-card-4 w3-border \" onClick='\"tableRefresh()\"'><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Буфер" + bufOrBuffs + " на РЦ  </button></td>";
                    var printTable = "<table class=\"w3-table-all w3-card-4 w3-border \">" +
                        "                <tr class = 'w3-light-blue'>\n" +
                        "                   <th>Буфер</th>"+
                        "                   <th>Дата</th>"+
                        "                   <th>Номер ТТН</th>"+
                        "                   <th>Статус</th>"+
                        "                </tr>";
                    for(var l=0;l <listBuff.length;l++){
                        if(listBuff[l] !=''){
                            var tableBuf = listBuff[l].split(']');
                            TableBufArr = tableBuf[0].replace('[','');
                            TableBufParsed = TableBufArr.split(',');
                            printTable += "<tr><td>" + TableBufParsed[0] + "</td>" +
                                "<td>" + TableBufParsed[1] + "</td>" +
                                "<td>" + TableBufParsed[2] + "</td>" +
                                "<td>" + TableBufParsed[3] + "</td>" +
                                "</tr>";
                            printTaleInfo += "<td>  <button onclick=\"document.getElementById('24id"+l+"').style.display='block'\" " +
                                "class=\"w3-btn\">" + TableBufParsed[0] + "</button></td>";
                            printTableInfo2+= "<div id='24id"+l + "' class=\"w3-modal\" style=\"z-index: 999\">\n" +
                                "                <div class=\"w3-modal-content\">\n" +
                                "\n" +
                                "                    <header class=\"w3-container w3-teal\">\n" +
                                "                         <span onclick=\"document.getElementById('24id"+l+"').style.display='none'\"\n" +
                                "                             class=\"w3-button w3-display-topright\">&times;</span>" +
                                "<h2>Буфер " + bufOrBuffs  + TableBufParsed[0] + "</h2>" +
                                "</header>\n" +
                                "                    <div id='24toFlow" + l + "'  class=\"w3-container\" style='text-align: left'>\n" +
                                "                    </div>\n" +
                                "                </div>\n" +
                                "            </div>";
                        }
                    }
                    printTable +="</table><br>";
                    output.innerHTML = printTable;

                    printTaleInfo += "</tr></table>";

                    outputText.innerHTML = printTaleInfo;

                    outputText.innerHTML += printTableInfo2;


                    var listBuff = respText.split("$$");
                    for(var l=0;l <listBuff.length;l++) {

                        if (listBuff[l] != '') {
                            var tableBuf = listBuff[l].split(']');

                            var flow31 = tableBuf[1].replace(/\>\</g,'>\n<');
                            //alert(flow31);
                            var printModal = document.getElementById('24toFlow'+ l);
                            printModal.innerText = flow31;
                        }
                    }


                    outputText.innerHTML += "<table class=\"w3-table-all w3-card-4 w3-border \"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Отправить буфер(ы) ?</button></td>  " +
                        "<td><button id='yesConfirm24' onclick='confimSendIn24()' class=\"w3-btn w3-green w3-large w3-round-large\">Да</button></td> " +
                        "<td><button class=\"w3-btn w3-red w3-large w3-round-large\">Нет</button></nobr></td></tr></table>";

                    break;

                case 1:
                    //  alert("Edit");

                    var respText = xhrB.responseText;
                    var listBuff = respText.split("$$");
                    var printTableInfo2 ="";
                    var printTaleInfo = "<table class=\"w3-table-all w3-card-4 w3-border \" onClick='\"tableRefresh()\"'><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Буфер" + bufOrBuffs + " на РЦ  </button></td>";
                    var printTable = "<table class=\"w3-table-all w3-card-4 w3-border \">" +
                        "                <tr class = 'w3-light-blue'>\n" +
                        "                   <th>Буфер</th>"+
                        "                   <th>Дата</th>"+
                        "                   <th>Номер ТТН</th>"+
                        "                   <th>Статус</th>"+
                        "                </tr>";
                    for(var l=0;l <listBuff.length;l++){
                        if(listBuff[l] !=''){
                            var tableBuf = listBuff[l].split(']');
                            TableBufArr = tableBuf[0].replace('[','');
                            TableBufParsed = TableBufArr.split(',');
                            printTable += "<tr><td>" + TableBufParsed[0] + "</td>" +
                                "<td>" + TableBufParsed[1] + "</td>" +
                                "<td>" + TableBufParsed[2] + "</td>" +
                                "<td>" + TableBufParsed[3] + "</td>" +
                                "</tr>";
                            printTaleInfo += "<td>  <button onclick=\"document.getElementById('24id"+l+"').style.display='block'\" " +
                                "class=\"w3-btn\">Редактировать буфер " + TableBufParsed[0] + "</button></td>";
                            printTableInfo2+= "<div id='24id"+l + "' class=\"w3-modal\" style=\"padding-top: 50px\; z-index: 999\">\n" +
                                "                <div class=\"w3-modal-content\">\n" +
                                "                    <header class=\"w3-container w3-teal\">\n" +
                                "                         <span onclick=\"document.getElementById('24id"+l+"').style.display='none'\"\n" +
                                "                             class=\"w3-button w3-display-topright\">&times;</span>" +
                                "<h2>Редактировать буфер " + bufOrBuffs  + TableBufParsed[0] + "</h2>" +
                                "</header>\n" +
                                "                    <div contenteditable=\"true\" id='24toFlow" + l + "'  class=\"w3-container\" style=\"text-align: left\;overflow-y: scroll\;height: 475px\;\">\n" +
                                "                    " +
                                "</div>\n" +
                                "<table class=\"w3-table-all w3-card-4 w3-border \"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Отправить буфер ?</button></td>  " +
                                "<td><button onclick=\"confirm24AfterEdit()\; document.getElementById('24id"+l+"').style.display='none'\"  class=\"w3-btn w3-green w3-large w3-round-large\">Да</button></td> " +
                                "<td><button onclick=\"document.getElementById('24id"+l+"').style.display='none'\" class=\"w3-btn w3-red w3-large w3-round-large\">Нет</button></nobr></td></tr></table>" +
                                "                </div>\n" +
                                "            </div>";
                        }
                    }
                    printTable +="</table><br>";
                    output.innerHTML = printTable;

                    printTaleInfo += "</tr></table>";

                    outputText.innerHTML = printTaleInfo;

                    outputText.innerHTML += printTableInfo2;


                    var listBuff = respText.split("$$");
                    for(var l=0;l <listBuff.length;l++) {

                        if (listBuff[l] != '') {
                            var tableBuf = listBuff[l].split(']');

                            var flow31 = tableBuf[1].replace(/\>\</g,'>\n<');
                            //alert(flow31);
                            var printModal = document.getElementById('24toFlow'+ l);
                            printModal.innerText = flow31;
                        }
                    }
                    break;
                default:

                    var respText = xhrB.responseText;
                    var listBuff = respText.split("$$");
                    var printTableInfo2 ="";
                    var printTaleInfo = "<table class=\"w3-table-all w3-card-4 w3-border \" onClick='\"tableRefresh()\"'><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Буфер" + bufOrBuffs + " на РЦ  </button></td>";
                    var printTable = "<table class=\"w3-table-all w3-card-4 w3-border \">" +
                        "                <tr class = 'w3-light-blue'>\n" +
                        "                   <th>Буфер</th>"+
                        "                   <th>Дата</th>"+
                        "                   <th>Номер ТТН</th>"+
                        "                   <th>Статус</th>"+
                        "                </tr>";
                    for(var l=0;l <listBuff.length;l++){
                        if(listBuff[l] !=''){
                            var tableBuf = listBuff[l].split(']');
                            TableBufArr = tableBuf[0].replace('[','');
                            TableBufParsed = TableBufArr.split(',');
                            printTable += "<tr><td>" + TableBufParsed[0] + "</td>" +
                                "<td>" + TableBufParsed[1] + "</td>" +
                                "<td>" + TableBufParsed[2] + "</td>" +
                                "<td>" + TableBufParsed[3] + "</td>" +
                                "</tr>";
                            printTaleInfo += "<td>  <button onclick=\"document.getElementById('id"+l+"').style.display='block'\" " +
                                "class=\"w3-btn\">" + TableBufParsed[0] + "</button></td>";
                            printTableInfo2+= "<div id='id"+l + "' class=\"w3-modal\" style=\"z-index: 999\">\n" +
                                "                <div class=\"w3-modal-content\">\n" +
                                "\n" +
                                "                    <header class=\"w3-container w3-teal\">\n" +
                                "                         <span onclick=\"document.getElementById('id"+l+"').style.display='none'\"\n" +
                                "                             class=\"w3-button w3-display-topright\">&times;</span>" +
                                "<h2>Буфер " + bufOrBuffs  + TableBufParsed[0] + "</h2>" +
                                "</header>\n" +
                                "                    <div id='toFlow" + l + "'  class=\"w3-container\" style='text-align: left'>\n" +
                                "                    </div>\n" +
                                "                </div>\n" +
                                "            </div>";
                        }
                    }
                    printTable +="</table><br>";
                    output.innerHTML = printTable;

                    printTaleInfo += "</tr></table>";

                    outputText.innerHTML = printTaleInfo;

                    outputText.innerHTML += printTableInfo2;


                    var listBuff = respText.split("$$");
                    for(var l=0;l <listBuff.length;l++) {

                        if (listBuff[l] != '') {
                            var tableBuf = listBuff[l].split(']');

                            var flow31 = tableBuf[1].replace(/\>\</g,'>\n<');
                            //alert(flow31);
                            var printModal = document.getElementById('toFlow'+ l);
                            printModal.innerText = flow31;
                        }
                    }
                    confimSendIn24()

            }





        }
        else {
            alert('Ошибка! ' + xhrB.statusText);
        }
    }

//-------------------------------BEFORE
    switch (userChoice) {
        case 0:
            //alert("Confirm");
            //  outputText.innerHTML += "<table class=\"w3-table-all w3-card-4 w3-border \"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Отправить буфер(ы) ?</button></td>  " +
            //     "<td><button onclick='confimSendOut31()' class=\"w3-btn w3-green w3-large w3-round-large\">Да</button></td> " +
            //     "<td><button class=\"w3-btn w3-red w3-large w3-round-large\">Нет</button></nobr></td></tr></table>";
            body = 'system=bacchus' +
                '&type=in24'+
                '&buff=' + encodeURIComponent(inBuf)+
                '&SAP='+inSap+
                '&checked=true';
            break;
        case 1:
            // alert("Edit");
            body = 'system=bacchus' +
                '&type=in24'+
                '&buff=' + encodeURIComponent(inBuf)+
                '&SAP='+inSap+
                '&checked=true';
            break;
        default:
            body = 'system=bacchus' +
                '&type=in24'+
                '&buff=' + encodeURIComponent(inBuf)+
                '&SAP='+inSap+
                '&checked=true';

    }










    xhrB.open('POST', '/test/', true);
    xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrB.send(body);






}


function confimSendIn24() {
    let xhrConfirm = new XMLHttpRequest();
    var outputText = document.getElementById('textArea24');
    var inBuf = document.getElementById('buff24').value;
    if(document.getElementById('yesConfirm24')!==null){document.getElementById('yesConfirm24').disabled=true;}

    inBuf=inBuf.replace(/\s/g, '');
    xhrConfirm.onreadystatechange = function() {
        if (xhrConfirm.readyState !== 4) return;
        if (xhrConfirm.status == 200) {
            if(document.getElementById('yesConfirm24')!==null){document.getElementById('yesConfirm24').disabled=false;}
            var responseConfirm = xhrConfirm.responseText;
            var inBuf = document.getElementById('buff24').value;
            var printTable = "<table class=\"w3-table-all w3-card-4 w3-border\"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Буфер успешно отправлен</button></td>";
            var printModal="";
            var bufList = inBuf.split(",");
            for(var ii=0; ii < bufList.length; ii++){
                printTable += "<td><button onclick=\"document.getElementById('24id0"+ii+"').style.display='block'\" " +
                    "                    class=\"w3-btn\">" + bufList[ii] + " </button></td>";
                printModal += "<div id='24id0" + ii + "' class=\"w3-modal\" style=\"z-index: 999\">" +
                    "                <div class=\"w3-modal-content\">\n" +
                    "\n" +
                    "                    <header class=\"w3-container w3-teal\">\n" +
                    "                         <span onclick=\"document.getElementById('24id0"+ii+"').style.display='none'\"\n" +
                    "                             class=\"w3-button w3-display-topright\">&times;</span>" +
                    "<h2>Response " + bufList[ii] + "</h2>" +
                    "</header>\n" +
                    "                    <div id='24toResponse" + ii + "' class=\"w3-container\" style='text-align: left'>\n" +
                    "                    </div>\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "                </div>\n" +
                    "            </div>";
            }
            outputText.innerHTML += printTable + "</tr></table>";
            outputText.innerHTML +=   printModal;
            var respBufs = responseConfirm.split("$$");
            for(var ll=0; ll <respBufs.length-1;ll++){
                var toResponseText = document.getElementById('24toResponse'+ll);
                toResponseText.innerText = respBufs[ll];
            }
        }
    }
    var inBuf = document.getElementById('buff24').value;
    var inSap = document.getElementById('SAP24').value;
    inBuf=inBuf.replace(/\s/g, '');
    var body = 'confirmSend#yes'+
        '!type#in24'+
        '!buff#' + encodeURIComponent(inBuf)+
        '!selfBuf#nope'+
        '!SAP#'+inSap;
    // var body = 'confirmSend#yes'+
    //     '!type#out31'+
    //    '!buff#afterEdit'+
    //    '!selfBuf#'+outputText+
    //    '!SAP#'+inSap;
    xhrConfirm.open('POST', '/test/csend', true);
    xhrConfirm.setRequestHeader('Content-Type', 'application/raw')
    xhrConfirm.send(body);
}

function confirm24AfterEdit() {

    let xhrConfirm = new XMLHttpRequest();
    var outputBuf = document.getElementById('24toFlow0').innerText;
    var outputText = document.getElementById('textArea24');
    if(document.getElementById('yesAfter24')!==null){document.getElementById('yesAfter24').disabled=true;}

    // alert(""+outputBuf.replace(/\n/g,''));
    xhrConfirm.onreadystatechange = function() {
        if (xhrConfirm.readyState !== 4) return;
        if (xhrConfirm.status == 200) {

            if(document.getElementById('yesAfter24')!==null){document.getElementById('yesAfter24').disabled=false;}
            var responseConfirm = xhrConfirm.responseText;
            var inBuf = document.getElementById('buff24').value;
            var printTable = "<table class=\"w3-table-all w3-card-4 w3-border\"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Буфер успешно отправлен</button></td>";
            var printModal="";
            var bufList = inBuf.split(",");
            //  alert(""+bufList.length);
            for(var ii=0; ii < bufList.length; ii++){
                printTable += "<td><button onclick=\"document.getElementById('24id0"+ii+"').style.display='block'\" " +
                    "                    class=\"w3-btn\">" + bufList[ii] + " </button></td>";
                printModal += "<div id='24id0" + ii + "' class=\"w3-modal\" style=\"z-index: 999\">" +
                    "                <div class=\"w3-modal-content\">\n" +
                    "\n" +
                    "                    <header class=\"w3-container w3-teal\">\n" +
                    "                         <span onclick=\"document.getElementById('24id0"+ii+"').style.display='none'\"\n" +
                    "                             class=\"w3-button w3-display-topright\">&times;</span>" +
                    "<h2>Response " + bufList[ii] + "</h2>" +
                    "</header>\n" +
                    "                    <div id='24toResponse" + ii + "' class=\"w3-container\" style='text-align: left'>\n" +
                    "                    </div>\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "                </div>\n" +
                    "            </div>";
            }
            outputText.innerHTML += printTable + "</tr></table>";
            outputText.innerHTML +=   printModal;
            var respBufs = responseConfirm.split("$$");
            for(var ll=0; ll <respBufs.length;ll++){
                var toResponseText = document.getElementById('24toResponse'+ll);
                toResponseText.innerText = respBufs[ll];
            }
        }
    }
    var inSap = document.getElementById('SAP24').value;
    var body = 'confirmSend#yes'+
        '!type#in24'+
        '!buff#afterEdit'+
        '!selfBuf#'+outputBuf+
        '!SAP#'+inSap;
    xhrConfirm.open('POST', '/test/csend', true);
    xhrConfirm.setRequestHeader('Content-Type', 'application/raw')
    xhrConfirm.setRequestHeader('charset', 'UTF-8')
    xhrConfirm.send(body);

}


function loadUserParams() {

    let xhrConfirm = new XMLHttpRequest();
    var userInfo = document.getElementById('userInfo');
    userInfo.innerHTML="";
    xhrConfirm.onreadystatechange = function() {
        if (xhrConfirm.readyState !== 4) return;
        if (xhrConfirm.status == 200) {
            // var responseConfirm = xhrConfirm.responseText;
            var responseConfirm = JSON.parse(xhrConfirm.responseText);
            var keys = Object.keys(responseConfirm);
            //responseConfirm[keys[k]][kk]
            //var userParams = responseConfirm.split(",");
            var printUserInfo="";
            if(responseConfirm[keys[0]].includes("admin")){
                printUserInfo+="<div class=\"w3-container  w3-large\">\n" +
                    "  <div class=\"w3-left-center\"><p>Ваша роль в системе: Администратор</p>\n"
                printUserInfo +=  "</div></div>";
                printUserInfo+="<div class=\"w3-container  w3-small\">\n" +
                    "  <div class=\"w3-left\">Доступные действия: <button onclick=\"reqUsers()\" class=\"w3-btn\">Просмотр логов</button>\n"
                printUserInfo +=  "</div></div>";

            }else{
                if(responseConfirm[keys[0]].includes("superuser")){
                    printUserInfo+="<div class=\"w3-container  w3-large\">\n" +
                        "  <div class=\"w3-left-center\"><p>Ваша роль в системе: Суперпользователь</p></div>\n" +
                        "</div>";
                }else{
                    if(responseConfirm[keys[0]].includes("user")){
                        printUserInfo+="<div class=\"w3-container  w3-large\">\n" +
                            "  <div class=\"w3-left-center\"><p>Ваша роль в системе: Пользователь</p></div>\n" +
                            "</div>";
                    }
                }
            }
            userInfo.innerHTML+=printUserInfo;
            //alert(""+userParams[1]);
            if(keys.length > 1){
                //alert(keys.length)
                printUserInfo="<div class=\"w3-container  w3-small\">\n" +
                    "  <button onclick=\"showUserTable()\"  class=\"w3-btn\">Отобразить настройки профиля</button>\n"

                printUserInfo +=" <table id=\"tUserParams\" class=\"w3-table-all w3-small w3-card-4\" style = \"vertical-align: center;display: none; padding: 8px\">\n" +
                    "    <tr>\n" +
                    "      <th>Параметр</th>\n" +
                    "      <th>Значение</th>\n" +
                    "    </tr>"
                for(var i=1;i < keys.length;i++){
                    printUserInfo += "<tr><td>" + keys[i] + "</td>" +
                        "<td><button onclick=\"changeUserParam('" + keys[i] + "')\" class=\"w3-btn\">" + responseConfirm[keys[i]] + "</button></td>"+
                        "</tr>";
                }
                printUserInfo+="</table></div>";
                userInfo.innerHTML+=printUserInfo;
            }





        }
    }
    var body = 'confirmSend#yes!';


    xhrConfirm.open('POST', '/test/profile', true);
    xhrConfirm.setRequestHeader('Content-Type', 'application/raw')
    xhrConfirm.setRequestHeader('charset', 'UTF-8')
    xhrConfirm.send(body);


}

function changeUserParam(paramKey) {

    var winModalChangeParam = document.getElementById("modalChange");
    winModalChangeParam.innerHTML ="";
    var printTableInfo2 = "<div id=\"winChange\" class=\"w3-modal\" style=\"padding-top: 50px\; z-index: 999\">\n" +
        "                <div class=\"w3-modal-content\">\n" +
        "                    <header class=\"w3-container w3-teal\">\n" +
        "                         <span onclick=\"document.getElementById('winChange').style.display='none'\; loadUserParams()\;\"\n" +
        "                             class=\"w3-button w3-display-topright\">&times;</span>" +
        "<h2>Изменение параметра: " + paramKey   + "</h2>" +
        "</header>\n" +
        "                    <div id=\"valueOfParams\"  class=\"w3-container\" style=\"text-align: left\;height: 400px\; width: 100%\;\">\n" + //height: 400px; width: 200px;
        "                    " +
        "</div>\n" +
        "<div id=\"snackbar\">Параметры успешно изменены!</div>"+
        "<table class=\"w3-table-all w3-card-4 w3-border \"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Сохранить ?</button></td>  " +
        "<td><button id='yesConfirm' onclick=\"confirmChangeParam('tableAutoGas')\"  class=\"w3-btn w3-green w3-large w3-round-large\">Да</button></td> " +
        "<td><button onclick=\"document.getElementById('winChange').style.display='none'\; loadUserParams()\;\" class=\"w3-btn w3-red w3-large w3-round-large\">Нет</button></nobr></td></tr></table>" +
        "                </div>\n" +
        "            </div>";
    winModalChangeParam.innerHTML += printTableInfo2;
    switch (paramKey) {
        case "Таблица автогашения":
            var areaParams = document.getElementById("valueOfParams")
            var avaParams = "<h2>Выберите таблицу для автогашения</h2>\n" +
                "<p>" +
                "<input id=\"tmp_uuidR\"  class=\"w3-radio\" type=\"radio\" name=\"tableAuto\" value=\"tmp_uuid\">\n" +
                "<label id=\"tmp_uuid\">tmp_uuid</label>" +
                "<p>" +
                "<input id=\"tmp_uuid2R\" class=\"w3-radio\" type=\"radio\" name=\"tableAuto\" value=\"tmp_uuid2\">\n" +
                "<label id=\"tmp_uuid2\">tmp_uuid2</label>" +
                "<p>" +
                "<input id=\"tmp_uuid_mR\" class=\"w3-radio\" type=\"radio\" name=\"tableAuto\" value=\"tmp_uuid_m\">\n" +
                "<label id=\"tmp_uuid_m\">tmp_uuid_m</label>";
            areaParams.innerHTML += avaParams;
            let xhrConfirm = new XMLHttpRequest();
            xhrConfirm.onreadystatechange = function() {
                if (xhrConfirm.readyState !== 4) return;
                if (xhrConfirm.status == 200) {
                    var responseConfirm = xhrConfirm.responseText;
                    var listUserTables = responseConfirm.split("!");
                    var userName = listUserTables[0];
                    for(var i=1;i < listUserTables.length-1;i++){
                        var nameOfTableUser = listUserTables[i].split("&");
                        if(nameOfTableUser[1]=="tmp_uuid") {
                            if(nameOfTableUser[0]==userName){
                                document.getElementById("tmp_uuid").innerText += " - Выбрано Вами ";
                                document.getElementById("tmp_uuidR").checked = true;
                                //break;
                            }else{
                                document.getElementById("tmp_uuid").innerText += " Занято пользователем " + nameOfTableUser[0];
                                document.getElementById("tmp_uuid").style.color="RED";
                                document.getElementById("tmp_uuid").disabled = true;
                                document.getElementById("tmp_uuidR").disabled = true;
                                //break;
                            }
                        }

                        if(nameOfTableUser[1]=="tmp_uuid2") {
                            if(nameOfTableUser[0]==userName){
                                document.getElementById("tmp_uuid2").innerText += " - Выбрано Вами ";
                                document.getElementById("tmp_uuid2R").checked = true;
                                //   break;
                            }else{
                                document.getElementById("tmp_uuid2").innerText += " Занято пользователем " + nameOfTableUser[0];
                                document.getElementById("tmp_uuid2").style.color="RED";
                                document.getElementById("tmp_uuid2").disabled = true;
                                document.getElementById("tmp_uuid2R").disabled = true;
                                //   break;
                            }
                        }

                        if(nameOfTableUser[1]=="tmp_uuid_m") {
                            if(nameOfTableUser[0]==userName){
                                document.getElementById("tmp_uuid_m").innerText += " - Выбрано Вами ";
                                document.getElementById("tmp_uuid_mR").checked = true;
                                //   break;
                            }else{
                                document.getElementById("tmp_uuid_m").innerText += " Занято пользователем " + nameOfTableUser[0];
                                document.getElementById("tmp_uuid_m").style.color="RED";
                                document.getElementById("tmp_uuid_m").disabled = true;
                                document.getElementById("tmp_uuid_mR").disabled = true;
                                //   break;
                            }
                        }
                    }

                    //alert(<% out.println(NTLMUserFilter.getUserName()); %>)
                    //alert(""+userName);
                }
            }
            var body = 'queryTableAuto#yes!';
            xhrConfirm.open('POST', '/test/profile', true);
            xhrConfirm.setRequestHeader('Content-Type', 'application/raw')
            xhrConfirm.setRequestHeader('charset', 'UTF-8')
            xhrConfirm.send(body);
            break;
    }
    document.getElementById("winChange").style.display = "block";
}

function confirmChangeParam(nameParam) {

    var valueParam="";
    let xhrConfirm = new XMLHttpRequest();
    xhrConfirm.onreadystatechange = function() {
        if (xhrConfirm.readyState !== 4) return;
        if (xhrConfirm.status == 200) {
            var responseConfirm = xhrConfirm.responseText;
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

        }
    }
    if(nameParam.includes("tableAutoGas")){
        if(tmp_uuidR.checked==true){valueParam="tmp_uuid";
        }
        else{
            if(tmp_uuid2R.checked==true){valueParam="tmp_uuid2";
            }
            else{
                if(tmp_uuid_mR.checked==true){valueParam="tmp_uuid_m";}
            }
        }



    }
    var body = 'changeParam#yes!'+nameParam + "#" + valueParam;
    xhrConfirm.open('POST', '/test/profile', true);
    xhrConfirm.setRequestHeader('Content-Type', 'application/raw')
    xhrConfirm.setRequestHeader('charset', 'UTF-8')
    xhrConfirm.send(body);


}


function viewLogs() {
    let xhrConfirm = new XMLHttpRequest();
    var userInfo = document.getElementById('userInfo');
    var logsTable = document.getElementById('tablelogs');
    var printTableLog = "<table id=\"logTable\" class=\"w3-table-all w3-small w3-card-4\" style=\"width: 100%\">\n" +
        "                <tr>\n" +
        "                    <th>ID</th>" +
        "                    <th>Дата</th>\n" +
        "                    <th>Пользователь</th>\n" +
        "                    <th>Система</th>\n" +
        "                    <th>Процесс</th>\n" +
        "                    <th>Операция</th>\n" +
        "                    <th>Тип</th>\n" +
        "                    <th>Parent_ID</th>\n" +
        "                    <th>Параметры</th>\n" +
        "                    <th>Статус</th>\n" +
        "                    <th>Error_Log</th>\n" +
        "                </tr>";


    var inputUser =  userinput.value + "&" + systemOpt.value + "&" + statusOpt.value + "&"
    if(period.value.includes("period")){
        document.getElementById("calFrom").style.display="block"
        document.getElementById("calTo").style.display="block"
        var dateFrom = document.getElementById("dateFrom").value;
        var dateTo = document.getElementById("dateTo").value;
        inputUser +=  dateFrom.replace(/\./g,"\-") + "\^" + dateTo.replace(/\./g,"\-");
    }else{
        document.getElementById("calFrom").style.display="none"
        document.getElementById("calTo").style.display="none"
        inputUser += period.value;

    }
    xhrConfirm.onreadystatechange = function() {
        if (xhrConfirm.readyState !== 4) return;
        if (xhrConfirm.status == 200) {
            var responseConfirm = xhrConfirm.responseText;
            var respLines = responseConfirm.split("&");
            for (var r=0; r < respLines.length-1; r++){

                var respCol = respLines[r].split("!");
                printTableLog +="<tr>";
                printTableLog +="<td>" + respCol[0] + "</td>";
                printTableLog +="<td>" + respCol[1] + "</td>";
                printTableLog +="<td>" + respCol[2] + "</td>";
                printTableLog +="<td>" + respCol[3] + "</td>";
                printTableLog +="<td>" + respCol[4] + "</td>";
                printTableLog +="<td>" + respCol[5] + "</td>";
                printTableLog +="<td>" + respCol[6] + "</td>";
                printTableLog +="<td>" + respCol[7] + "</td>";
                printTableLog +="<td>" + respCol[8] + "</td>";
                printTableLog +="<td>" + respCol[9] + "</td>";
                printTableLog +="<td>" + respCol[10] + "</td>";
                printTableLog +="</tr>";
            }
            printTableLog +="</table>";
            logsTable.innerHTML = printTableLog;
            logsTable.style.display="block";

        }
    }



    var body = 'reqData#yes!'+inputUser;

    xhrConfirm.open('POST', '/test/profile', true);
    xhrConfirm.setRequestHeader('Content-Type', 'application/raw')
    xhrConfirm.setRequestHeader('charset', 'UTF-8')
    xhrConfirm.send(body);
}

function reqUsers() {


    let xhrConfirm = new XMLHttpRequest();
    var userInfo = document.getElementById('userInfo');
    var showOptions = document.getElementById('logs');
    xhrConfirm.onreadystatechange = function() {
        if (xhrConfirm.readyState !== 4) return;
        if (xhrConfirm.status == 200) {
            logs.style.display = "block";
            // var responseConfirm = xhrConfirm.responseText;
            var responseConfirm = xhrConfirm.responseText;
            var userList = responseConfirm.split("&");
            for (var u=0; u < userList.length-1;u++){
                let newOption = new Option(userList[u],userList[u]);
                userinput.append(newOption);
            }
        }
    }
    var body = 'reqUsers#yes!';


    xhrConfirm.open('POST', '/test/profile', true);
    xhrConfirm.setRequestHeader('Content-Type', 'application/raw')
    xhrConfirm.setRequestHeader('charset', 'UTF-8')
    xhrConfirm.send(body);




}

function showTempTable() {


    let xhr = new XMLHttpRequest();
    var userInfo = document.getElementById('outputAuto');
    outputAuto.innerHTML="";
    document.getElementById('ShowTableAuto').disabled=true;

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        if (xhr.status == 200) {
            document.getElementById('ShowTableAuto').disabled=false;
            var responseConfirm = xhr.responseText;
            var printTableLog = "<table id=\"logTable\" class=\"w3-table-all w3-small w3-card-4 demotable\" style=\"width: 100%\">\n" +
                "                <thead>\n" +
                "                    <tr>" +
                "<th>№</th>" +
                "<th>Сертификат</th>" +
                "                    <th onclick=\"sortTable(1)\">Статус</th>\n" +
                "                </tr></thead>";
            var respLines = responseConfirm.split("&");
            for (var r=0; r < respLines.length-1; r++){

                var respCol = respLines[r].split("!");
                printTableLog +="<tr>";
                printTableLog +="<td>" + respCol[0] + "</td>";
                printTableLog +="<td>" + respCol[1] + "</td>";
                printTableLog +="</tr>";
            }
            printTableLog +="</table>";
            userInfo.style.display = "block"
            userInfo.innerHTML = printTableLog;
        }

    }
    body = 'system=caduceus' +
        '&type=autoGas'+
        // '&buff=' + encodeURIComponent(inBuf)+
        // '&SAP='+inSap+
        '&checked=true';

    xhr.open('POST', '/test/', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.setRequestHeader('charset', 'UTF-8')
    xhr.send(body);





}

function trunAutoGas() {


    let xhr = new XMLHttpRequest();
    var userInfo = document.getElementById('outputAuto');
    //var areaToCerts = document.getElementById('textAreaAuto');
    userInfo.innerHTML="";
    document.getElementById('ClearTableAuto').disabled=true;

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        if (xhr.status == 200) {
            document.getElementById('ClearTableAuto').disabled=false;
            var responseConfirm = xhr.responseText;
            if(responseConfirm.includes("clear_done")){
                userInfo.innerHTML="Таблица успешно очищена";
            }
        }

    }
    body = 'system=caduceus' +
        '&type=trunAutoGas'+
        // '&buff=' + encodeURIComponent(inBuf)+
        // '&SAP='+inSap+
        '&checked=true';

    xhr.open('POST', '/test/', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.setRequestHeader('charset', 'UTF-8')
    xhr.send(body);





}

function insToAutoGas() {


    let xhr = new XMLHttpRequest();
    var userInfo = document.getElementById('outputAuto');
    var areaToCerts = document.getElementById('textAreaAuto');
    userInfo.innerHTML="";
    areaToCerts.innerHTML="";
    var printToModal = "";
    //document.getElementById('ShowTableAuto').disabled=true;
    printToModal = "<div id='areaToCer' class=\"w3-modal\" style=\"padding-top: 50px\; z-index: 999\">\n" +
        "                <div class=\"w3-modal-content\">\n" +
        "                    <header class=\"w3-container w3-teal\">\n" +
        "                         <span onclick=\"document.getElementById('areaToCer').style.display='none'\"\n" +
        "                             class=\"w3-button w3-display-topright\">&times;</span>" +
        "<h2>Добавить сертификаты</h2>" +
        "</header>\n" +
        "                    <div contenteditable=\"true\" id='usercerts'  class=\"w3-container\" style=\"text-align: left\;overflow-y: scroll\;height: 475px\;\">\n" +
        "                    " +
        "</div>\n" +
        "<table class=\"w3-table-all w3-card-4 w3-border \"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Добавить сертификаты ?</button></td>  " +
        "<td><button onclick=\"sendSerts()\; document.getElementById('areaToCer').style.display='none'\"  class=\"w3-btn w3-green w3-large w3-round-large\">Да</button></td> " +
        "<td><button onclick=\"document.getElementById('areaToCer').style.display='none'\" class=\"w3-btn w3-red w3-large w3-round-large\">Нет</button></nobr></td></tr></table>" +
        "                </div>\n" +
        "            </div>";
    areaToCerts.innerHTML += printToModal;
    document.getElementById("areaToCer").style.display = "block";
}

function insToAutoGas2() {


    let xhr = new XMLHttpRequest();
    var userInfo = document.getElementById('outputAuto');
    var areaToCerts = document.getElementById('textAreaAuto');
    userInfo.innerHTML="";
    areaToCerts.innerHTML="";
    var printToModal = "";
    //document.getElementById('ShowTableAuto').disabled=true;
    printToModal = "<div id='areaToCer' class=\"w3-modal\" style=\"padding-top: 50px\; z-index: 999\">\n" +
        "                <div class=\"w3-modal-content\">\n" +
        "                    <header class=\"w3-container w3-teal\">\n" +
        "                         <span onclick=\"document.getElementById('areaToCer').style.display='none'\"\n" +
        "                             class=\"w3-button w3-display-topright\">&times;</span>" +
        "<h2>Добавить сертификаты</h2>" +
        "</header>\n" +
        "                    <div contenteditable=\"true\" id='usercerts'  class=\"w3-container\" style=\"text-align: left\;overflow-y: scroll\;height: 475px\;\">\n" +
        "                    " +
        "</div>\n" +
        "<table class=\"w3-table-all w3-card-4 w3-border \">" +
        "<tr class=\"w3-light-gray\"><td><input id=\"lists\"  class=\"w3 - radio\" type=\"radio\" name=\"tableAuto\" value=\"lists\">" +
        "<label id=\"tmp_uuid\">Списком</label></td>" +
        "<td><input id=\"SapPer\"  class=\"w3 - radio\" type=\"radio\" name=\"tableAuto\" value=\"SapPer\">" +
        "<label id=\"tmp_uuid\">По SAP коду</label></td></tr>" +
        "<tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Добавить сертификаты ?</button></td>  " +
        "<td><button onclick=\"sendSerts2()\; document.getElementById('areaToCer').style.display='none'\"  class=\"w3-btn w3-green w3-large w3-round-large\">Да</button></td> " +
        "<td><button onclick=\"document.getElementById('areaToCer').style.display='none'\" class=\"w3-btn w3-red w3-large w3-round-large\">Нет</button></nobr></td></tr></table>" +
        "                </div>\n" +
        "            </div>";
    areaToCerts.innerHTML += printToModal;
    document.getElementById("areaToCer").style.display = "block";
}


function sendSerts() {

    let xhr = new XMLHttpRequest();
    var userInfo = document.getElementById('outputAuto');
    document.getElementById('InsCertTableAuto').disabled=true;
    var listOfCerts = document.getElementById("usercerts").innerText;
    //listOfCerts = listOfCerts.replace(/\s/g,"")
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        if (xhr.status == 200) {
            document.getElementById('InsCertTableAuto').disabled=false;
            var responseConfirm = xhr.responseText;
            if(responseConfirm.includes("empty")){

                userInfo.innerHTML="Operation failed";
            }else{
                userInfo.innerHTML="Успешно добавлено "+responseConfirm + " сертификатов";
            }
        }

    }
    var body = 'listOfCerts#'+ listOfCerts.replace(/\s/g,"!");
    xhr.open('POST', '/test/certs', true);
    xhr.setRequestHeader('Content-Type', 'application/raw')
    xhr.setRequestHeader('charset', 'UTF-8')
    xhr.send(body);


}
var certsToChgOrUpd=0;
function sendSerts2() {
    //sec
    var base = 60;
    var clocktimer, dateObj, dh, dm, ds, ms;
    var readout = '';
    var h = 1,
        m = 1,
        tm = 1,
        s = 0,
        ts = 0,
        ms = 0,
        init = 0;
    //функция для очистки поля
    function ClearСlock() {
        clearTimeout(clocktimer);
        h = 1;
        m = 1;
        tm = 1;
        s = 0;
        ts = 0;
        ms = 0;
        init = 0;
        readout = '00:00:00';
        document.getElementsByName("stopwatch").value = readout;
    }


//Функция запуска и остановки
    function StartStop() {
        if (init == 0) {
            ClearСlock();
            dateObj = new Date();
            StartTIME();
            init = 1;
        } else {
            clearTimeout(clocktimer);
            init = 0;
        }
    }

    //функция для старта секундомера
    function StartTIME() {
        var cdateObj = new Date();
        var t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000);
        if (t > 999) {
            s++;
        }
        if (s >= (m * base)) {
            ts = 0;
            m++;
        } else {
            ts = parseInt((ms / 100) + s);
            if (ts >= base) {
                ts = ts - ((m - 1) * base);
            }
        }
        if (m > (h * base)) {
            tm = 1;
            h++;
        } else {
            tm = parseInt((ms / 100) + m);
            if (tm >= base) {
                tm = tm - ((h - 1) * base);
            }
        }
        ms = Math.round(t / 10);
        if (ms > 99) {
            ms = 0;
        }
        if (ms == 0) {
            ms = '00';
        }
        if (ms > 0 && ms <= 9) {
            ms = '0' + ms;
        }
        if (ts > 0) {
            ds = ts;
            if (ts < 10) {
                ds = '0' + ts;
            }
        } else {
            ds = '00';
        }
        dm = tm - 1;
        if (dm > 0) {
            if (dm < 10) {
                dm = '0' + dm;
            }
        } else {
            dm = '00';
        }
        dh = h - 1;
        if (dh > 0) {
            if (dh < 10) {
                dh = '0' + dh;
            }
        } else {
            dh = '00';
        }
        readout = dh + ':' + dm + ':' + ds;
        document.getElementsByName("stopwatch").value  = readout;
        clocktimer = setTimeout(StartTIME, 1);
    }


    var certsToChgOrUpd=0;
    let xhr = new XMLHttpRequest();
    document.getElementById('InsCertTableAuto').disabled=true;
    var listOfCerts = document.getElementById("usercerts").innerText;
    //listOfCerts = listOfCerts.replace(/\s/g,"")
    //StartStop();
    xhr.onreadystatechange = function() {

        if (xhr.readyState !== 4) return;
        if (xhr.status == 200) {
            //document.getElementById('InsCertTableAuto').disabled=false;
            var responseConfirm = xhr.responseText;
            sendSerts3(responseConfirm);
            //StartStop();
            document.getElementById('InsCertTableAuto').disabled=false;
        }
        //alert("done");
        document.getElementById('InsCertTableAuto').disabled=false;

        return;

    }
    var body = 'listOfCerts#'+ listOfCerts.replace(/\s/g,"!");
    xhr.open('POST', '/test/certs', true);
    xhr.setRequestHeader('Content-Type', 'application/raw')
    xhr.setRequestHeader('charset', 'UTF-8')
    xhr.send(body);


}
var upResp="ok";
function sendSerts3(certsUp) {

    var responseConfirm = certsUp.split("!");

    var userInfo = document.getElementById('outputAuto');
    document.getElementById('InsCertTableAuto').disabled=true;

    userInfo.style.display = "block";
    userInfo.innerHTML="Всего сертификатов: " + responseConfirm[0] + " Найдено в кадуцей: "+responseConfirm[1] +
        " Погашенных: " + responseConfirm[2] + " В очереди на гашение: " + responseConfirm[3] + "" +
        "<div class=\"w3-container\">" +
        "<div class=\"w3-light-grey\"><div id=\"myBar\" class=\" w3-green w3-round-xlarge\" style=\"width:0%\">0%</div>"+
        "</div></div>";
    //alert("print");




    var certsToChgOrUpd=0;
    let xhr = new XMLHttpRequest();
    var userInfo = document.getElementById('outputAuto');
    //document.getElementById('InsCertTableAuto').disabled=true;
    var listOfCerts = responseConfirm[4].split("_");

    var countCerts = listOfCerts.length-1;

    var countsTens = Math.floor(countCerts / 10);
    var perCent = 100 / (countsTens+1);
    var countsOst = countCerts - (10 * countsTens);
    var certsToUp="";
    var width=0;
    var timeSend = 6000



    if(countCerts > 999){
        var countsTh = Math.floor(countCerts / 999);
        for(t=0; t < countsTh; t++ ){


        }

    }


    //отправка меньше тысячи
    if(countsTens > 0) {
        for (i=0; i < countsTens; i++){
            timeSend = timeSend+1000;
            //  var id22 =   setTimeout(sendinit, timeSend); //
            //   clearInterval(id22);
            // function sendinit() {
            for(ii=0; ii <  10;ii++){
                //alert ("i " + i + " ii "+ii);
                certsToUp += listOfCerts[(i+1)+ii] + "_";
            }
            if(window.upResp == "ok"){
                sendToUpdate(certsToUp, perCent);
                certsToUp="";
            }else{
                return;
            }
            //  }

        }

        if (i==countsTens){
            certsToUp="";
            if(countsOst >= 1){
                for (iii=countsTens*10; iii < (countsTens*10)+countsOst;iii++){
                    certsToUp += listOfCerts[iii] + "_";
                }
                sendToUpdate(certsToUp,100);
                certsToUp="";
            }

        }
        document.getElementById('InsCertTableAuto').disabled=false;
    }else{
        certsToUp="";
        for (l=0; l < listOfCerts.length-1 ;l++){
            certsToUp += listOfCerts[l] + "_";
        }
        sendToUpdate(certsToUp,100);

        document.getElementById('InsCertTableAuto').disabled=false;
    }

}

function sendToUpdate(upCerts,perc) {

    //listOfCerts = listOfCerts.replace(/\s/g,"")
    //var listOfCerts = upCerts.split("_");

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        if (xhr.status == 200) {

            var elem = document.getElementById("myBar");
            var wdth = elem.style.width;wdth =  wdth.replace("\%","");
            var width = Number(wdth) +  Number(perc);
            if(width>=100)width=100;
            var idddd = setInterval(framich, 1);
            //alert("w " + wdth + "p " + width)
            function framich() {

                //alert("wdth "+wdth+" width " + width);
                if (wdth >= width) {
                    clearInterval(idddd);
                    return;
                } else {
                    //alert("+");
                    wdth++;
                    elem.style.width = wdth + '%';
                    elem.innerHTML = wdth * 1  + '%';

                }
            }

            //alert(""+xhr.responseText);
            window.upResp = "ok";

        }else window.upResp="neok";
        return;
    }
    //userInfo.innerHTML+="<br>Сертификатов добавлено\\обновлено: "  + "из " + certsToChgOrUpd;

    //alert(listOfCerts);

    var body = 'listOfCertsToUpdate#'+ upCerts;
    xhr.open('POST', '/test/certs', true);
    xhr.setRequestHeader('Content-Type', 'application/raw')
    xhr.setRequestHeader('charset', 'UTF-8')
    xhr.send(body);



}

function myFunction() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function showTableAutoGas() {


    let xhr = new XMLHttpRequest();
    var userInfo = document.getElementById('outputAuto');
    //var areaToCerts = document.getElementById('textAreaAuto');
    userInfo.innerHTML="";
    document.getElementById('ShowMainTableAuto').disabled=true;

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        if (xhr.status == 200) {
            document.getElementById('ShowMainTableAuto').disabled=false;
            var responseConfirm = xhr.responseText;
            var respLines = responseConfirm.split("&");
            outputAuto.style.display = "block";
            var printTableLog = "<table id=\"logTable\" class=\"w3-table-all w3-small w3-card-4\" style=\"width: 100%\">\n" +
                "                <tr>\n" +
                "                    <th>CAQ_ID</th>" +
                "                    <th>CAQ_DATE_CREATED</th>" +
                "                    <th>CAQ_DATE_CONFIRM</th>" +
                "                    <th>CAQ_STATUS</th>" +
                "                    <th>CAQ_HOSTNAME</th>" +
                "                    <th>CAQ_TASK_ID</th>" +
                "                    <th>CAQ_VSD_UUID</th>" +
                "                    <th>CAQ_CODV_ID</th>" +
                "                    <th>CAQ_INCOMING_DOC</th>" +
                "                    <th>ROW_CHG_NUM</th>" +
                "                    <th>CAQ_DATE_UTILIZE</th>" +
                "                    <th>CAQ_SOURCE</th>" +
                "                </tr>";
            for (var r=0; r < respLines.length-1; r++){

                var respCol = respLines[r].split("!");
                printTableLog +="<tr>";
                printTableLog +="<td>" + respCol[0] + "</td>";
                printTableLog +="<td>" + respCol[1] + "</td>";
                printTableLog +="<td>" + respCol[2] + "</td>";
                printTableLog +="<td>" + respCol[3] + "</td>";
                printTableLog +="<td>" + respCol[4] + "</td>";
                printTableLog +="<td>" + respCol[5] + "</td>";
                printTableLog +="<td>" + respCol[6] + "</td>";
                printTableLog +="<td>" + respCol[7] + "</td>";
                printTableLog +="<td>" + respCol[8] + "</td>";
                printTableLog +="<td>" + respCol[9] + "</td>";
                printTableLog +="<td>" + respCol[10] + "</td>";
                printTableLog +="<td>" + respCol[11] + "</td>";
                printTableLog +="</tr>";
            }
            printTableLog +="</table>";
            userInfo.innerHTML = printTableLog;

        }

    }
    body = 'system=caduceus' +
        '&type=showAutoGas'+
        // '&buff=' + encodeURIComponent(inBuf)+
        // '&SAP='+inSap+
        '&checked=true';

    xhr.open('POST', '/test/', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.setRequestHeader('charset', 'UTF-8')
    xhr.send(body);






}

function insMainAutoGas() {



    let xhr = new XMLHttpRequest();
    var userInfo = document.getElementById('outputAuto');
    //var areaToCerts = document.getElementById('textAreaAuto');
    userInfo.innerHTML="";
    document.getElementById('InsToTableAuto').disabled=true;

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        if (xhr.status == 200) {
            document.getElementById('InsToTableAuto').disabled=false;
            var responseConfirm = xhr.responseText;
            if(responseConfirm.includes("insert_done")){
                userInfo.innerHTML="Сертификаты успешно добавлены";
            }
        }

    }
    body = 'system=caduceus' +
        '&type=insToMainAutoGas'+
        // '&buff=' + encodeURIComponent(inBuf)+
        // '&SAP='+inSap+
        '&checked=true';

    xhr.open('POST', '/test/', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.setRequestHeader('charset', 'UTF-8')
    xhr.send(body);





}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("logTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function settingUp() {
    var x = document.getElementById("Demo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

function actionBuf() {


    let xhrConfirm = new XMLHttpRequest();
    var bufAction = document.getElementById('Actionbuff').value;
    var sapAction = document.getElementById('ActionSAP').value;
    var outputAction = document.getElementById('Actionoutput');
    var listStatus = document.getElementById('changeList').value;
    outputAction.innerHTML="";
    var actionChoise="";
    for(var c=0;c < 3; c++){
        if(document.getElementById('Actioncheck'+c).checked){actionChoise=c;}
    }
    if(document.getElementById('Actionsend31')!==null){document.getElementById('Actionsend31').disabled=true;}




    switch (actionChoise) {
        case 0:
            var body = 'system=bacchus' +
                '&type=ActionRezerv'+
                '&buff=' + encodeURIComponent(bufAction)+
                '&SAP='+sapAction+
                '&checked=true';
            break;
        case 1:
            var body = 'system=bacchus' +
                '&type=ActionMark'+
                '&buff=' + encodeURIComponent(bufAction)+
                '&SAP='+sapAction+
                '&checked=true';
            break;
        case 2:
            var body = 'system=bacchus' +
                '&type=ActionChoise'+
                '&toStatus='+listStatus+
                '&buff=' + encodeURIComponent(bufAction)+
                '&SAP='+sapAction+
                '&checked=true';
            break;
        default:
            alert("Действие не выбрано!");
            break;
    }


    xhrConfirm.onreadystatechange = function() {
        if (xhrConfirm.readyState !== 4) return;
        if (xhrConfirm.status == 200) {
            var responseConfirm = xhrConfirm.responseText;
            if(document.getElementById('Actionsend31')!==null){document.getElementById('Actionsend31').disabled=false;}


            switch (actionChoise) {
                case 0:
                    if(responseConfirm.includes("good")){outputAction.innerHTML = "<table class=\"w3-table-all w3-card-4 w3-border \"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Запрос на снятие резервов успешно отправлен!</button></td></tr></table>";
                    }else{
                        outputAction.innerHTML = "<table class=\"w3-table-all w3-card-4 w3-border \"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Запрос не выполнен</button></td></tr></table>";
                    }
                    break;
                case 1:
                    if(responseConfirm.includes("good")){outputAction.innerHTML = "<table class=\"w3-table-all w3-card-4 w3-border \"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Статус марок изменен!</button></td></tr></table>";
                    }else{
                        outputAction.innerHTML = "<table class=\"w3-table-all w3-card-4 w3-border \"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Не выполнено</button></td></tr></table>";
                    }
                    break;
                case 2:
                    if(responseConfirm.includes("good")){outputAction.innerHTML = "<table class=\"w3-table-all w3-card-4 w3-border \"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Статус буфера изменен!</button></td></tr></table>";
                    }else{
                        outputAction.innerHTML = "<table class=\"w3-table-all w3-card-4 w3-border \"><tr class=\"w3-light-gray\"><td><button class = \"w3-btn\">Не выполнено</button></td></tr></table>";
                    }
                    break;
                default:


                    break;
            }



        }
    }




    xhrConfirm.open('POST', '/test/', true);
    xhrConfirm.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrConfirm.send(body);

}

function fLowSearch() {

    let xhrConfirm = new XMLHttpRequest();
    var bufAction = document.getElementById('buffSearch').value;
    var sapAction = document.getElementById('SAPSearch').value;
    var outputAction = document.getElementById('outputSearch');

    outputAction.innerHTML="";

    xhrConfirm.onreadystatechange = function() {
        if (xhrConfirm.readyState !== 4) return;
        if (xhrConfirm.status == 200) {

            var responseConfirm = xhrConfirm.responseText;
            var printTable = "<table class=\"w3-table-all w3-card-4 w3-border \">" +
                "                <tr class = 'w3-light-blue'>\n" +
                "                   <th>Поток</th>"+
                "                   <th>REQUEST</th>"+
                "                   <th>RESPONSE</th>"+
                "                </tr>";
            var listOfFlow = responseConfirm.split("#")
            var printTableInfo2="";
            for(var l=0; l < listOfFlow.length - 1; l++){
                var parsedList = listOfFlow[l].split("!");

                printTable += "<tr>"
                printTable += "<td><button  class=\"w3-btn\">" + parsedList[0] + "</button></td>";

                printTable += "<td><button id='req" + l + "' onclick=\"document.getElementById('flowReq"+l+"').style.display='block'\" " +
                    "                    class=\"w3-btn\"> </button></td>";
                printTable += "<td><button id='resp" + l + "' onclick=\"document.getElementById('flowResp"+l+"').style.display='block'\" " +
                    "                    class=\"w3-btn\"> </button></td></tr>";

                printTableInfo2+= "<div id='flowReq"+l + "' class=\"w3-modal\" style=\"padding-top: 50px\; z-index: 999\">\n" +
                    "                <div class=\"w3-modal-content\">\n" +
                    "                    <header class=\"w3-container w3-teal\">\n" +
                    "                         <span onclick=\"document.getElementById('flowReq"+l+"').style.display='none'\"\n" +
                    "                             class=\"w3-button w3-display-topright\">&times;</span>" +
                    "<h2>" + parsedList[0]  + "</h2>" +
                    "</header>\n" +
                    "                    <div contenteditable=\"true\" id='SearchFlowReq" + l + "'  class=\"w3-container\" style=\"text-align: left\;overflow-y: scroll\;height: 475px\;\">\n" +
                    "                    " +
                    "</div>\n" +
                    "                </div>\n" +
                    "            </div>";
                printTableInfo2+= "<div id='flowResp"+l + "' class=\"w3-modal\" style=\"padding-top: 50px\; z-index: 999\">\n" +
                    "                <div class=\"w3-modal-content\">\n" +
                    "                    <header class=\"w3-container w3-teal\">\n" +
                    "                         <span onclick=\"document.getElementById('flowResp"+l+"').style.display='none'\"\n" +
                    "                             class=\"w3-button w3-display-topright\">&times;</span>" +
                    "<h2>" + parsedList[0]  + "</h2>" +
                    "</header>\n" +
                    "                    <div contenteditable=\"true\" id='SearchFlowResp" + l + "'  class=\"w3-container\" style=\"text-align: left\;overflow-y: scroll\;height: 475px\;\">\n" +
                    "                    " +
                    "</div>\n" +
                    "                </div>\n" +
                    "            </div>";
            }
            outputAction.innerHTML  += printTable + "</table>";
            outputAction.innerHTML +=  printTableInfo2;
            for(var l=0; l < listOfFlow.length - 1; l++){
                var parsedList = listOfFlow[l].split("!");

                if(parsedList[0].includes("IN")){
                    document.getElementById('req'+l).innerText += parsedList[1].substr(0, 21);
                    document.getElementById('resp'+l).innerText += parsedList[2].substr(0, 22);
                }else{
                    document.getElementById('req'+l).innerText += parsedList[1].substr(0, 22);
                    document.getElementById('resp'+l).innerText += parsedList[2].substr(0, 23);
                }
                document.getElementById('SearchFlowReq'+l).innerText += parsedList[1].replace(/\>\</g,'>\n<');
                document.getElementById('SearchFlowResp'+l).innerText += parsedList[2].replace(/\>\</g,'>\n<');
            }
        }
    }

    var body = 'system=bacchus' +
        '&type=FlowSearch'+
        '&buff=' + encodeURIComponent(bufAction)+
        '&SAP='+sapAction+
        '&checked=true';


    xhrConfirm.open('POST', '/test/', true);
    xhrConfirm.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrConfirm.send(body);


}


function CheckCis() {
    let xhrConfirm = new XMLHttpRequest();
    var cis = document.getElementById('cis').value;
    var inn = document.getElementById('inn').value;
    var outputAction = document.getElementById('outputCheck');
    var jsonTable="<table class=\"w3-table-all w3-small w3-card-4\">";
    var lableAlert = document.getElementById('cisStatus');
    var alertMessage="";

    lableAlert.innerText = "Статус КИЗ:";
    lableAlert.className = "";
    outputAction.innerHTML="";
    xhrConfirm.onreadystatechange = function() {
        if (xhrConfirm.readyState !== 4) return;
        if (xhrConfirm.status == 200) {

            var responseConfirm = JSON.parse(xhrConfirm.responseText);
            var keys = Object.keys(responseConfirm);
            //alert(keys.length);
            for (var k=0; k < keys.length; k++){
                var redGreen=0;
                if(keys[k].includes("child")){
                    redGreen = 3;
                }
                if(keys[k].includes("ownerInn") && responseConfirm["ownerInn"].includes(inn)){
                    redGreen=1;
                    alertMessage = " КИЗ принадлежит " + inn + "!";
                    lableAlert.className = "w3-green";
                }
                if(keys[k].includes("ownerInn") && !responseConfirm["ownerInn"].includes(inn)){
                    redGreen=2;
                    alertMessage = " КИЗ не принадлежит " + inn + "!";
                    lableAlert.className = "w3-red";
                }

                switch (redGreen) {
                    case 1 :
                        //alert("sovpadenie");
                        jsonTable += "<tr class=\"w3-green\">"
                        jsonTable += "<td>" + keys[k] + "</td>"
                        //alert(responseConfirm[keys[k]]);
                        jsonTable += "<td>" + responseConfirm[keys[k]] + "</td>"
                        jsonTable += "</tr>"
                        break;
                    case 2 :
                        //alert("Nesovpadenie");
                        jsonTable += "<tr class=\"w3-red\">"
                        jsonTable += "<td>" + keys[k] + "</td>"
                        //alert(responseConfirm[keys[k]]);
                        jsonTable += "<td>" + responseConfirm[keys[k]] + "</td>"
                        jsonTable += "</tr>"
                        break;
                    case 0:
                        jsonTable += "<tr>"
                        jsonTable += "<td>" + keys[k] + "</td>"
                        //alert(responseConfirm[keys[k]]);
                        jsonTable += "<td>" + responseConfirm[keys[k]] + "</td>"
                        jsonTable += "</tr>"
                        break;
                    case 3:
                        if(responseConfirm[keys[k]] == null){
                            //alert(responseConfirm[keys[k]])
                            jsonTable += "<tr>"
                            jsonTable += "<td>" + keys[k] + "</td>"
                            //alert(responseConfirm[keys[k]]);
                            jsonTable += "<td>" + responseConfirm[keys[k]] + "</td>"
                            jsonTable += "</tr>"
                        }
                        else{
                            jsonTable += "<tr>"
                            jsonTable += "<td>" + keys[k] + "</td>"
                            jsonTable += "<td><p style=\"margin: 0px\" onclick=\"showChildTable()\">Показать\\Cкрыть</p>";
                            //alert(responseConfirm[keys[k]][0]);
                            jsonTable += "<table  id=\"toChild\" class=\"w3-table-all w3-small w3-card-4\" style = \"display: none; padding: 8px\">";
                            jsonTable += "</td></tr>"
                            for(kk=0; kk < responseConfirm[keys[k]].length; kk++){
                                jsonTable += "<tr><td>" + responseConfirm[keys[k]][kk] + "</td></tr>";
                            }
                            jsonTable += "</table>";
                        }

                        break;
                }
            }
            lableAlert.innerText += alertMessage;
            jsonTable +="</table>";
            outputAction.innerHTML += jsonTable;
        }

    }

    var body = 'system=markus' +
        '&type=queryGis'+
        '&cis=' + encodeURIComponent(cis)+
        '&inn='+inn+
        '&checked=true';


    xhrConfirm.open('POST', '/test/', true);
    xhrConfirm.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrConfirm.send(body);

}

var tableToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
    return function(table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
        window.location.href = uri + base64(format(template, ctx))
    }
})()

function inform() {

    var spravka = document.getElementById("spravka").value;
    var sap = document.getElementById("SAPINFO").value;
    var printTableMark = document.getElementById("textAreaInfo");
    var listOfPages="";
    var countOfPages=0;
    var numberOfPages=1;
    var toPrint="";
    let xhrB = new XMLHttpRequest();
    document.getElementById('showInfo').disabled=true;
    xhrB.onreadystatechange = function() {
        if (xhrB.readyState !== 4) return;
        if (xhrB.status == 200) {
            var respText = xhrB.responseText;
            var respLine = respText.split(";");
            document.getElementById('showInfo').disabled=false;
            toPrint +="<table id=\"outputMark\" class=\"w3-table-all w3-small w3-card-4 \">" +
                "                <tr class = 'w3-light-blue'>\n" +
                "                   <th>BAMC_LID</th>"+
                "                   <th>Марка</th>"+
                "                   <th>Статус</th>"+
                "                </tr>";
            //toPrint +="<table class=\"w3-table-all w3-small w3-card-4 \">";
            for(var l=0; l < respLine.length-1; l++){
                var respPar = respLine[l].split("&");
                if(l>15){
                    //countOfPages++
                    toPrint += "<tr>"
                    toPrint += "<td style=\"text-overflow:ellipsis; width: 33%\">"+respPar[0] + "</td>"
                    toPrint += "<td  style=\"text-overflow:ellipsis; width: 33%\">"+respPar[1] + "</td>"
                    toPrint += "<td style=\"text-overflow:ellipsis; width: 33%\">"+respPar[2] + "</td>"
                    toPrint += "</tr>"
                    //if(countOfPages==15){
                    //listOfPages += "<button onclick=\"document.getElementById('trl').style.display='block'\" class=\"w3-btn\">Показать все</button>";
                    //countOfPages=0;
                    //}

                }else{
                    toPrint += "<tr>"
                    toPrint += "<td style=\"text-overflow:ellipsis; width: 33%\">"+respPar[0] + "</td>"
                    toPrint += "<td style=\"text-overflow:ellipsis; width: 33%\">"+respPar[1] + "</td>"
                    toPrint += "<td style=\"text-overflow:ellipsis; width: 33%\">"+respPar[2] + "</td>"
                    toPrint += "</tr>"
                }
            }
            printTableMark.innerHTML += toPrint + "</table>" + listOfPages;

        }
    }


    body = 'system=bacchus' +
        '&type=markInfo'+
        '&buff=' + encodeURIComponent(spravka)+
        '&SAP='+sap+
        '&checked=true';

    xhrB.open('POST', '/test/', true);
    xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrB.send(body);


}

function openCity(cityName) {
    var i;
    var x = document.getElementsByClassName("city");
    var xx = document.getElementsByClassName("SystemAction");

    for (i = 0; i < x.length; i++) {
        xx[i].style.display = "none";
    }

    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(cityName).style.display = "block";
}

function cityOpen(evt, cityName) {
    var i, x, tablinks;
    var xxxx = document.getElementsByClassName("SystemAction");

    for (i = 0; i < x.length; i++) {
        xxxx[i].style.display = "none";
    }

    x = document.getElementsByClassName("cityM");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" w3-light-blue", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " w3-light-blue";
}

function showChildTable() {

    var tTable = document.getElementById("toChild")  //.style.display="block"
    if(tTable.style.display=="none"){
        tTable.style.display="block"

    }else {tTable.style.display="none"}

}

function showUserTable() {

    var tUsTable = document.getElementById("tUserParams")  //.style.display="block"
    if(tUsTable.style.display=="none"){
        tUsTable.style.display="block"

    }else {tUsTable.style.display="none"}

}



function openSystem(SysstemName) {
    var i;
    var i;

    var n = document.getElementsByName("mainIfo");
    var x = document.getElementsByClassName("SystemAction");
    //n.style.display = "none";

    for (ii = 0; ii < n.length; ii++) {
        n[ii].style.display = "none";
    }

    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }


    document.getElementById(SysstemName).style.display = "block";
}
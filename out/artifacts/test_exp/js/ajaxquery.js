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

function showChnagePnb() {
    var chk_edit = document.getElementById("pnb_edit");
    var btn_send = document.getElementById("Action_PNB");
    var btn_edit = document.getElementById("Action_PNB_edit");



    if(chk_edit.checked){

        //x.className += " w3-show";
        btn_edit.className = btn_edit.className.replace(" w3-hide", " ");
        //btn_edit.style.display = "block";
        btn_send.className += (" w3-hide");

    }else{

        btn_edit.className +=(" w3-hide");
        //btn_edit.style.display = "block";
        btn_send.className = btn_send.className.replace(" w3-hide", " ");

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
    var mm_pallet = document.getElementById("mm_pallet");
    var rbuf = document.getElementById("inpunt2");
    if(mbuf.checked||mm_pallet.checked){
        rbuf.disabled = false;
        //editCheck.disabled = true;
    }else{
        rbuf.disabled = true;
    }
}

function actionPNB(){
    var actBuf = document.getElementById('buffPNB').value.replace(/\s/g, '');
    var actSap = document.getElementById('sapPNB').value.replace(/\s/g, '');

    var output = document.getElementById('ActionPNB');
    var outputText = document.getElementById('ActiontextAreaPNB');

    output.innerHTML="";
    outputText.innerHTML="";
    var toPrintPNB="<table class=\"w3-table-all w3-card-4 w3-border \">";

    let xhrCadu = new XMLHttpRequest();
    xhrCadu.onreadystatechange = function() {
        if (xhrCadu.readyState !== 4) return;
        if (xhrCadu.status == 200) {
            var resp = xhrCadu.responseText;
            var parResp = resp.split("&");
            if(parResp[0]==200){
                toPrintPNB+="<tr>";
                toPrintPNB+="<td>Документ успешно отправлен</td>"+
                    "<td><a href=\"/test/xmlAct/"+parResp[1]+"\">Скачать</a></td>"+
                "<td><input type=\"hidden\" id=\"hidd_repl\" value=\""+parResp[2]+"\">"+parResp[2]+"</td></tr></table>";
                output.innerHTML+=toPrintPNB;
                output.innerHTML+="<br><button id=\"Resp_check\"  class=\"w3-btn w3-green w3-round-large w3-margin-bottom\" onclick=\"RespCheck()\">Проверить тикеты</button>";
            }


        }
    }

    var body = 'actbuf='+actBuf.replaceAll(/\s/g,"")+
        '&actsap='+actSap.replaceAll(/\s/g,"")+
        '&check=no';

    xhrCadu.open('POST', '/test/apnb', true);
    xhrCadu.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrCadu.send(body);


}

function actionPNBEdit(){
    var actBuf = document.getElementById('buffPNB').value.replace(/\s/g, '');
    var actSap = document.getElementById('sapPNB').value.replace(/\s/g, '');

    var output = document.getElementById('ActionPNB');
    var outputText = document.getElementById('ActiontextAreaPNB');

    var outputActBody = document.getElementById('actBody');var toBodyPrint="";outputActBody.innerHTML="";
    var outputActDetails = document.getElementById('actDetails'); var toDetailsPrint="";outputActDetails.innerHTML="";

    output.innerHTML="";
    outputText.innerHTML="";
    var toPrintPNB="<table class=\"w3-table-all w3-card-4 w3-border \">";

    let xhrCadu = new XMLHttpRequest();
    xhrCadu.onreadystatechange = function() {
        if (xhrCadu.readyState !== 4) return;
        if (xhrCadu.status == 200) {
            var resp = xhrCadu.responseText;

            var respParam=resp.split("!");

            //toBodyPrint+="<pre><code>"+respParam[1]+"</code></pre>";

            var respDet=respParam[2].split("&");

            toDetailsPrint+="<label>Выбрать справку/марку для исключения из акта</label>"
            toDetailsPrint+="<br><button id=\"refreshAct\"  " +
                "class=\"w3-btn w3-green w3-round-large w3-margin-bottom\" " +
                "onclick=\"actRefresh("+respDet.length+")\">Обновить</button>";

            for(var i=1;i<respDet.length;i++){
                var fAMC=respDet[i].split(",");

                toDetailsPrint+="<input value=\""+fAMC[0]+"\" id=\"F"+i+"\" type=\"checkbox\"   class=\"w3-check\">\n" +
                    "<label onclick=\"openAmc('F_a"+i+"')\">"+fAMC[0]+"</label><br>";
                toDetailsPrint+="<ul id=\"F_a"+i+"\" class=\"w3-ul w3-card-4 w3-hide w3-small\">\n";
                for(var ii=1;ii<fAMC.length-1;ii++){
                    toDetailsPrint+="<li><label><input id=\"F_a_a"+i+"\" value=\""+fAMC[ii]+"\" type=\"checkbox\"  class=\"w3-check\">"+fAMC[ii]+"</label></li>";
                }
                toDetailsPrint+="</ul>";

            }
            outputActBody.innerHTML+="<pre><code>";
            outputActBody.innerText+=respParam[1];
            outputActBody.innerHTML+="</pre></code>";

            outputActDetails.innerHTML+=toDetailsPrint;
            document.getElementById('modalAct').style.display='block';



            //var parResp = resp.split("&");
            /*
            * if(parResp[0]==200){
                toPrintPNB+="<tr>";
                toPrintPNB+="<td>Документ успешно отправлен</td>"+
                    "<td><a href=\"/test/xmlAct/"+parResp[1]+"\">Скачать</a></td>"+
                    "<td><input type=\"hidden\" id=\"hidd_repl\" value=\""+parResp[2]+"\">"+parResp[2]+"</td></tr></table>";
                output.innerHTML+=toPrintPNB;
                output.innerHTML+="<br><button id=\"Resp_check\"  class=\"w3-btn w3-green w3-round-large w3-margin-bottom\" onclick=\"RespCheck()\">Проверить тикеты</button>";
            }

            * */


        }
    }

    var body = 'actbuf='+actBuf.replaceAll(/\s/g,"")+
        '&actsap='+actSap.replaceAll(/\s/g,"")+
        '&check=edit'+
        '&Fs=empty'+
        '&As=empty';

    xhrCadu.open('POST', '/test/apnb', true);
    xhrCadu.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrCadu.send(body);


}

function actRefresh(cnt) {

    var actBuf = document.getElementById('buffPNB').value.replace(/\s/g, '');
    var actSap = document.getElementById('sapPNB').value.replace(/\s/g, '');
    var formB = "";
    var amc = "";
    for (var i = 1; i < cnt; i++) {

        var fbArr = document.getElementById('F' + i);
        var amcArr = document.getElementById('F_a_a' + i);

        if (fbArr.checked) {
            formB += fbArr.value + "!";
        }

        if (amcArr.checked) {
            amc += amcArr.value + "!";
        }

    }

    console.log("F" + formB);
    console.log("A" + amc);

    let xhrAct = new XMLHttpRequest();
    xhrAct.onreadystatechange = function() {
        if (xhrAct.readyState !== 4) return;
        if (xhrAct.status == 200) {
            var resp = xhrAct.responseText;
        }
    }

    var body = 'actbuf='+actBuf.replaceAll(/\s/g,"")+
        '&actsap='+actSap.replaceAll(/\s/g,"")+
        '&check=edit'+
        '&Fs='+formB+
        '&As='+amc;

    xhrAct.open('POST', '/test/apnb', true);
    xhrAct.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrAct.send(body);

}

function openAmc(id) {

    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

function RespCheck(){
    var replik = document.getElementById("hidd_repl").value;

    var sapUTM = document.getElementById("sapPNB").value;

    var output = document.getElementById('ActiontextAreaPNB');
    output.innerHTML="";

    document.getElementById("Resp_check").disabled = "true";


    let xhrB = new XMLHttpRequest();

    xhrB.onreadystatechange = function() {
        if (xhrB.readyState !== 4) return;
        if (xhrB.status == 200) {
            var respCh = xhrB.responseText;

            var print_resp="<table class=\"w3-table-all w3-card-4 w3-border\">";
            if(respCh.includes("Тикеты")){
                print_resp+="<tr><td>"+respCh+"</td></tr>"
            }else{
                var outResp=respCh.split("&");
                for(var i=0; i<outResp.length-1;i++){
                    var rowParam=outResp[i].split("|");
                    print_resp+="<tr>";
                    print_resp+="<td>"+rowParam[0]+"</td>";
                    print_resp+="<td>"+rowParam[1]+"</td>";
                    print_resp+="<td>"+rowParam[3]+"</td>";
                    var respXML=rowParam[2].replaceAll("<","&lt;");
                    print_resp += "<td onclick=\"document.getElementById('idC" + i + "').style.display='block'\">" + "Посмотреть" +
                        "</td>";

                    print_resp += "<div id='idC" + i + "' class=\"w3-modal\" style = \"z-index: 999\">\n" +
                        "    <div class=\"w3-modal-content\">\n" +
                        "      <div class=\"w3-container\" style=\"text-align: left\">\n" +
                        "        <span onclick=\"document.getElementById('idC" + i + "').style.display='none'\" class=\"w3-button w3-display-topright\">&times;</span>\n" +
                        "        <pre><code>" + respXML.replaceAll(">","&gt;") + "</code></pre>" +
                        "      </div>" +
                        "    </div>" +
                        "  </div>";

                    //print_resp+="<td>"+"ticket"+"</td>";
                    print_resp+="</tr>";

                }

            }
            output.innerHTML+=print_resp+"</table>";

            setTimeout(() => document.getElementById("Resp_check").disabled = false, 30000);
        }
    }
    var body = 'actbuf=1'+
        '&actsap='+sapUTM.replaceAll(/\s/g,"")+
        '&check='+replik;

    xhrB.open('POST', '/test/apnb', true);
    xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrB.send(body);
}

function searchUTM(){

    var sapUTM = document.getElementById("bUTM").value;
    var outputUTM = document.getElementById("GodOutputUTM");
    var outputUTM_2 = document.getElementById("GodOutputUTM").value;

    var to_printUTM="";
    outputUTM.innerHTML="";

    let xhrB = new XMLHttpRequest();

    xhrB.onreadystatechange = function() {
        if (xhrB.readyState !== 4) return;
        if (xhrB.status == 200) {

            var response_text = xhrB.responseText;

            to_printUTM += "<form  class = \"send-utm\" enctype=\"multipart/form-data\"><label>" +
                "<input disabled  id=\"tUTM\" type=\"text\"  class=\"w3-input  w3-border w3-round-medium\"></label>";

            to_printUTM += "<label><input class=\"w3-btn w3-green w3-round-large w3-margin-bottom\" " +
                "type=\"file\" id=\"myfile\" name=\"myfile\"></label></form>";
            //to_printUTM += "<button id=\"ssUTM\"   class=\"w3-btn w3-green w3-round-large w3-margin-bottom\">Отправить</button></form>";

            //to_printUTM += "<button id=\"ssUTM\" type=\"file\"   class=\"w3-btn w3-green w3-round-large w3-margin-bottom\">Выбрать файл</button></form>";

            outputUTM.innerHTML += to_printUTM;

            document.getElementById("tUTM").value=response_text;


            var input = document.getElementById("myfile");

            input.onchange = function ()
            {
                var sendForm = new FormData();
                sendForm.append('fileToUtm', input.files[0]);
                sendForm.append('SAP', sapUTM);

                var xhr = new XMLHttpRequest();
                xhr.open('POST','/test/sendutm', true);
                xhr.onreadystatechange = function ()
                {
                    if (xhr.readyState == 4)
                    {
                        var an = xhr.responseText;
                        if (an)
                            console.log(an);
                        //outputUTM block with information
                        var printCheckResponse ="";
                        printCheckResponse += "<label><input id=\"inpresp\" class=\"w3-input  w3-border w3-round-medium\"></label>";
                        printCheckResponse += "<button id=\"checkResp\"  class=\"w3-btn w3-green w3-round-large w3-margin-bottom\" onclick=\"checkResp()\">Check</button>";
                        var lastURl =  document.getElementById("tUTM").value;
                        outputUTM.innerHTML += printCheckResponse;
                        document.getElementById("inpresp").value = an;

                        document.getElementById("tUTM").value = lastURl;
                        input.value = "";

                    }
                }
                xhr.send(sendForm);
            };





        }
    }

    var body = 'SAP=' + sapUTM;

    xhrB.open('POST', '/test/UTM', true);
    xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrB.send(body);

}

function checkCert(){
    // функция отправки параметров для поиска сертификатов
    let xhrB = new XMLHttpRequest();




    var csap = document.getElementById("csap").value;
    var printCerts = document.getElementById("outputCert");

    var listius = document.getElementById("certsToCheck").innerText; //document.getElementById("certsToCheck").innerText;

    var listiusH = document.getElementById("certsToCheck").innerHTML+"</div>";

    var mainMesSert = "";

    var blistiusH = listiusH.replace(/<div>/g,"");
    var blistiusH = blistiusH.replace(/<br>/g,"");
    blistiusH+="</div>";
    var rowCounts = blistiusH.split("</div>");

    //console.log(rowCounts.length);
    //console.log(blistiusH);
    for(var i =0; i<rowCounts.length;i++){
        mainMesSert+=(rowCounts[i].replace(/-/g,"").toLowerCase())+"|";
    }


    xhrB.onreadystatechange = function() {
        if (xhrB.readyState !== 4) return;
        if (xhrB.status == 200) {
            //document.getElementById("certsToCheck").innerHTML="";
            var toPrintCert = "<table class=\"w3-table-all w3-small\">";
             toPrintCert += "<tr class = 'w3-light-blue'>" +
                 "<th style='width: 5%'>№</th>" +
                 "<th style='width: 10%'>Кадуцей</th>" +
                 "<th style='width: 10%'>GK</th>" +
                 "<th style='width: 10%'>SAP</th>" +
                 "<th style='width: 10%'>PLU</th>" +
                 "<th style='width: 55%'>UUID</th>" +
                 "</tr>";
            if(xhrB.responseText=="false"){
                printCerts.innerHTML = "Магазин не GK. Или не найден";
                printCerts.style.display="block";
            }
            var respText = xhrB.responseText.split("&");
            var arrK = respText[0].split("|");
            var arrGK = respText[1].split("|");
            var arrUsersCert = respText[2].split("|");
            var greenRow="";
            var yellowRow="";
            var redRow="";


            for(var u=0; u < arrUsersCert.length-2;u++){

                var cadus=false; var gkeus=false;
                var plu="";var code_code="";
                toPrintCert += "<tr id=\"uuu"+(u+1)+"\" class=\"w3-green\">";
                toPrintCert += "<td>"+(u+1)+"</td>";


                //ищем сертификат в каду из найденных среди введенных
                for(var k=0; k < arrK.length-1;k++){
                    var arrKK = arrK[k].split("#");
                    if(arrUsersCert[u]==arrKK[0]){
                        //toPrintCert += "<td>"+arrK[k]+"</td>";
                        //toPrintCert += "<td>Да</td>";
                        cadus=true;
                        plu = arrKK[2];
                        code_code=arrKK[1];
                        break;
                    }

                }

                if(cadus==false){
                    toPrintCert += "<td>Нет</td>";
                    //toPrintCert += "<td>empty</td>";
                    //toPrintCert += "<td>empty</td>";


                }else{
                    toPrintCert += "<td>Да</td>";
                    //toPrintCert += "<td>"+code_code+"</td>";
                    //toPrintCert += "<td>"+plu+"</td>";

                }

                //ищем сертификат в GK из найденных среди введенных
                for(var gk=0; gk < arrGK.length-1;gk++){
                    if(arrUsersCert[u]==arrGK[gk]){
                        //toPrintCert += "<td>"+arrGK[gk]+"</td>";
                        //toPrintCert += "<td>Да</td>";
                        gkeus=true;
                        break;
                    }
                }

                if(gkeus==false){toPrintCert += "<td>Нет</td>";}else{toPrintCert += "<td>Да</td>";}

                if(cadus==false){
                    //toPrintCert += "<td>Нет</td>";
                    toPrintCert += "<td>empty</td>";
                    toPrintCert += "<td>empty</td>";


                }else{
                    //toPrintCert += "<td>Да</td>";
                    toPrintCert += "<td>"+code_code+"</td>";
                    toPrintCert += "<td>"+plu+"</td>";

                }


                toPrintCert += "<td>"+arrUsersCert[u]+"</td>";

                toPrintCert += "</tr>";

                if(cadus==true && gkeus==true)
                    greenRow+=(u+1)+"|";
                //console.log("GREEN "+greenRow);

                if(cadus==true && gkeus==false)
                    yellowRow+=(u+1)+"|";
                //console.log("YELLOW "+yellowRow);

                if(cadus==false && gkeus==false)
                    redRow+=(u+1)+"|";
               // console.log("RED "+redRow);



            }

            toPrintCert += "</table>";
            printCerts.innerHTML = toPrintCert;
            printCerts.style.display="block";

                var greenC=greenRow.split("|");
                var yellowC=yellowRow.split("|");
                var redC=redRow.split("|");

                if(greenC.length>=2){
                    for(var gc=0; gc < greenC.length-1;gc++){
                        var dgebi="uuu"+(greenC[gc]);
                        //console.log(dgebi);
                        var rowG=document.getElementById(dgebi);

                       // console.log(rowG)
                     }
                }


            if(yellowC.length>=2){
                for(var yc=0; yc < yellowC.length-1;yc++){
                    var dgebi="uuu"+(yellowC[yc]);
                    //console.log(dgebi);
                    var rowY=document.getElementById(dgebi);
                    rowY.classList.remove("w3-green");
                    rowY.classList.add("w3-yellow");
                    //console.log(rowY)
                }
            }

            if(redC.length>=2){
                for(var rc=0; rc < redC.length-1;rc++){
                var dgebi="uuu"+(redC[rc]);
                //console.log(dgebi);
                var rowR=document.getElementById(dgebi);
                rowR.classList.remove("w3-green");
                rowR.classList.add("w3-red");
                //console.log(rowR)
                }
            }





            //console.log("GREEN "+greenRow+"YELLOW "+yellowRow+"RED "+redRow);

        }else{
            printCerts.innerHTML = "Ошибка. Опишите свои действия и укажите входные данные отправив письмо m.moiseev@x5.ru";
            printCerts.style.display="block";
            //document.getElementById("certsToCheck").innerHTML="";
        }
    }

    var body = 'SAP=' + csap +
        "&cert=" + mainMesSert;

    xhrB.open('POST', '/test/checkcerts', true);
    xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrB.send(body);


}

function clearCerts(){

    var clearSap1 = document.getElementById("csap");
    var clearSap2 = document.getElementById("certsToCheck"); //document.getElementById("certsToCheck").innerText;
    var clearSap3 = document.getElementById("Magbuff"); //document.getElementById("certsToCheck").innerText;
    var clearSap4 = document.getElementById("MagSAP"); //document.getElementById("certsToCheck").innerText;
    var clearSap5 = document.getElementById("MagNQbuff"); //document.getElementById("certsToCheck").innerText;
    var clearSap6 = document.getElementById("MagNQSAP"); //document.getElementById("certsToCheck").innerText;
    var clearBufCadu = document.getElementById("CadBuf"); // bufer in block cadu
    var clearSapCadu = document.getElementById("CadSap"); // sap in block cadu
    clearSap1.value="";    clearSap2.value="";
    clearSap3.value="";    clearSap4.value="";
    clearSap5.value="";    clearSap6.value="";

    clearBufCadu.value="";clearSapCadu.value="";

}

function clearCertsNQ(){

    var clearSap = document.getElementById("csap");
    var clearCert = document.getElementById("certsToCheck"); //document.getElementById("certsToCheck").innerText;
    var clearBuff = document.getElementById("Magbuff"); //document.getElementById("certsToCheck").innerText;
    var clearSap = document.getElementById("MagSAP"); //document.getElementById("certsToCheck").innerText;
    clearSap.value="";clearCert.innerText="";
    clearBuff.value="";clearSap.innerText="";
}

function checkResp() {
    var replik = document.getElementById("inpresp").value;

    var sapUTM = document.getElementById("bUTM").value;

    let xhrB = new XMLHttpRequest();

    document.getElementById("checkResp").disabled = "true";

    xhrB.onreadystatechange = function() {
        if (xhrB.readyState !== 4) return;
        if (xhrB.status == 200) {
            var respik = xhrB.responseText;

            var print_resp="<table class=\"w3-table-all w3-small\">";

            if(respik.includes("Тикеты")){
                document.getElementById("GodTextAreaUTM").innerHTML = respik;
            }else{

                document.getElementById("GodTextAreaUTM").innerHTML = "";
                var Aresp = respik.split("&");

                for(var i=0;i<Aresp.length-1; i++){
                    var head_body_resp = Aresp[i].split("|");

                    var withoutx = head_body_resp[1].replace(/</g,"&lt;");withoutx = withoutx.replace(/>/g,"&gt;");
                    //xmlTi=xmlTi.replace(/</g,"&lt;"); xmlTi= xmlTi.replace(/>/g,"&gt;");
                    print_resp += "<tr><td>"+head_body_resp[0]+"</td>"+
                        "<td><a href=\"/test/files_utm/"+head_body_resp[0].replace(/\//g,"_")+".xml\">Посмотреть</a></td>" +

                        "</tr>";

                }

                print_resp +="</table>";
                document.getElementById("GodTextAreaUTM").innerHTML = print_resp;

                print_resp="";

            }

            setTimeout(() => document.getElementById("checkResp").disabled = false, 30000);
        }
    }
    var body = 'SAP=' + sapUTM +
        "&reply=" + replik;

    xhrB.open('POST', '/test/replycheck', true);
    xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrB.send(body);

}

$('.download').on('click', function(){
    var link = document.createElement('a');
    link.setAttribute('href', 'E:/Progs/TomCat_9/files_utm/download.png');
    link.setAttribute('download', 'download.png');
    link.click();
    return false;
});

function MagOut(){
    var lio = document.getElementById("listInOut");
    var lioMes = lio.options[lio.selectedIndex].value;
    var btn_text = document.getElementById("MagOutSend");
    //alert(lioMes);
    var magbuf = document.getElementById("Magbuff").value;
    var magsap = document.getElementById("MagSAP").value;
    var toPrintag = document.getElementById("Magoutput");
    var intStatus="";
    toPrintag.innerHTML="";

    var bacPrint="<div id=\"magbac\" class=\"w3-bar\" style='width: 100%'><br><h4>БАХУС</h4><br><div id=\"bact\" class='w3-left w3-padding' style='width: 70%'><table class=\"w3-table-all w3-small\">" +
    "<tr class = \"w3-light-blue\">"+
    "<th>Буфер</th>"+
    "<th>Статус</th>"+
    "<th>ТТН</th>"+
    "<th>Дата</th>"+
    "<th>Заказ</th>"+
    "</tr>";

    var magPrint="<h4>МАГАЗИН</h4><br><table class=\"w3-table-all w3-small\">" +
    "<tr class = \"w3-light-blue\">"+
    "<th>Буфер</th>"+
    "<th>Статус</th>"+
    "<th>Дата</th>"+
    "<th>ТТН</th>"+
    "<th>Заказ</th>"+
    "<th>Статус Заказа</th>"+
    "<th>Последний запрос в БАХУС</th>"+
    "</tr>";

    let xhrB = new XMLHttpRequest();

    xhrB.onreadystatechange = function() {
        btn_text.className = btn_text.className.replace(" w3-red", "w3-green");
        btn_text.innerText="Загружаю..."
        if (xhrB.readyState !== 4) return;
        if (xhrB.status == 200) {
            btn_text.innerText="Отправить"
            var magresp = xhrB.responseText;
            if(magresp==""){
                toPrintag.innerHTML="Ничего не найдено!";
                return;
            }
            var magbac = magresp.split("&");

            var magInfo = magbac[0].split("|");
            var bacInfo = magbac[1].split("|");
            magPrint+="<tr>"
            bacPrint+="<tr>"

            for(var i=0; i <magInfo.length-1;i++){

                magPrint+="<td>"+magInfo[i]+"</td>";
            }

            for(var i=0; i <bacInfo.length-1;i++){
                if(lioMes==1){
                    if(i==1){
                         intStatus = bacInfo[i].split("(");
                        //intStatus=intStatus[1].replace(")");
                        //var oldSt = document.getElementById("listOfStatusesOut").value;
                        bacPrint+="<td id=\"rowStatus\">";
                        bacPrint+="<select onchange=\"changeStateBacchus("+intStatus[1].replace(")","")+",'"+magbuf+"','"+magsap.replaceAll(/\s/g,'')+"',"+lioMes+")\" id=\"listOfStatuses\" class=\"w3-select w3-border\" name=\"option\">\n" +
                            "\t\n" +
                            "<option value=\"265\">Создан (265)</option>\n" +
                            "<option value=\"266\">Сопоставлен Заголовок (266)</option>\n" +
                            "<option value=\"267\">Сопоставлен (267)</option>\n" +
                            "<option value=\"268\">Не сопоставлен (268)</option>\n" +
                            "<option value=\"269\">Ошибка (269)</option>\n" +
                            "<option value=\"270\">На разборе (270)</option>\n" +
                            "<option value=\"271\">Подтверждён КИС (271)</option>\n" +
                            "<option value=\"272\">Автообработка (272)</option>\n" +
                            "<option value=\"274\">Подтверждён ЕГАИС (274)</option>\n" +
                            "<option value=\"275\">Готов (275)</option>\n" +
                            "<option value=\"276\">Удалён (276)</option>\n" +
                            "<option value=\"309\">Отклонен КИС (309)</option>\n" +
                            "<option value=\"365\">На сопоставлении (365)</option>\n" +
                            "<option value=\"369\">Отклонен ЕГАИС (369)</option>\n" +
                            "<option value=\"372\">Распроведение подтверждено (372)</option>\n" +
                            "<option value=\"376\">Общий (376)</option>\n" +
                            "<option value=\"4062\">Отказан Акт Разногласий (4062)</option>\n" +
                            "<option value=\"501\">Распроводится в ЕГАИС (501)</option>\n" +
                            "<option value=\"5839\">Акт разногласий не подтвержден (5839)</option>\n" +
                            "<option value=\"712\">Распроведёние отклонено (712)</option>\n" +
                            "<option value=\"9714\">Отказ Приемки без ТТН (9714)</option>                \n" +
                            "                \n" +
                            "</select>";
                        bacPrint+="</td>";
                    }else{
                        bacPrint+="<td>"+bacInfo[i]+"</td>";
                    }
                }else{
                    if(i==1){
                        intStatus = bacInfo[i].split("(");
                        //intStatus=intStatus[1].replace(")");
                        console.log(""+bacInfo[i]);
                        bacPrint+="<td  id=\"rowStatusOut\">";

                        bacPrint+="<select onchange=\"changeStateBacchus("+intStatus[1].replace(")","")+",'"+magbuf+"','"+magsap.replaceAll(/\s/g,'')+"',"+lioMes+")\" id=\"listOfStatuses\" class=\"w3-select w3-border\" name=\"optionn\">\n" +
                            "\t\n" +
                            "<option value=\"294\">Создан (294)</option>\n" +
                            "<option value=\"295\">Ошибка (295)</option>\n" +
                            "<option value=\"296\">На разборе (296)</option>\n" +
                            "<option value=\"297\">В обработке (297)</option>\n" +
                            "<option value=\"298\">Подтверждена отгрузка (298)</option>\n" +
                            "<option value=\"299\">Подтверждён ЕГАИС (299)</option>\n" +
                            "<option value=\"300\">Частично Подтверждена Приемка (300)</option>\n" +
                            "<option value=\"301\">Отклонен ЕГАИС (301)</option>\n" +
                            "<option value=\"302\">Передан в SAP (302)</option>\n" +
                            "<option value=\"303\">Удалён (303)</option>\n" +
                            "<option value=\"527\">Отправлен в ЕГАИС (527)</option>\n" +
                            "<option value=\"528\">Успешно создан в ЕГАИС (528)</option>\n" +
                            "<option value=\"529\">Отзывается в ЕГАИС (529)</option>\n" +
                            "<option value=\"533\">Принято частично (в ожидании) (533)</option>\n" +
                            "<option value=\"534\">Принято частично (534)</option>\n" +
                            "<option value=\"535\">Распроводится в ЕГАИС (535)</option>\n" +
                            "<option value=\"536\">Распроведён (536)</option>\n" +
                            "<option value=\"538\">Общий (538)</option>\n" +
                            "<option value=\"744\">Отправка решения по частичной приёмке (744)</option>\n" +
                            "<option value=\"746\">Частичная приёмка отклонена (746)</option>\n" +
                            "<option value=\"747\">Ошибка при отправке решения по частичной приёмке (747)</option>\n" +
                            "<option value=\"748\">Запрошено распроведение (в ожидании) (748)</option>\n" +
                            "<option value=\"749\">Отправка решения о распроведении (749)</option>\n" +
                            "<option value=\"750\">Распроведение отклонено (750)</option>\n" +
                            "<option value=\"751\">Распроведено (751)</option>\n" +
                            "<option value=\"752\">Ошибка при отправке решения о распроведении (752)</option>\n" +
                            "<option value=\"9716\">Некорректные количества (9716)</option>\n" +
                            "\n" +
                            "</select>\n";
                        bacPrint+="</td>";
                    }else{
                        bacPrint+="<td>"+bacInfo[i]+"</td>";
                    }
                }



            }

            magPrint+="</tr></table>";
            bacPrint+="</tr></table></div><div id='bacS' class='w3-right w3-padding' style='width: 30%;'>";
            bacPrint +="<div class=\"w3-light-blue\" style='margin-top: 0px;margin-bottom: 0px;'>\n" +
                "  <button id=\"btn_hist\" onclick=\"myFunctionBM('DemoBM')\" class=\"w3-button w3-block\">История статусов</button>\n" +
                "  <div id=\"DemoBM\" class=\"w3-hide w3-container w3-light-gray\">\n" +
                //"    <p>Lorem ipsum 25% width</p>\n" +
                "  </div>\n" +
                "</div></div></div>";

            bacPrint +="<div class=\"w3-light-blue\" style='margin-top: 0px;margin-bottom: 0px;'>\n" +
                "  <button id=\"btn_hist_flow\" onclick=\"myFunctionFL('DemoFL')\" class=\"w3-button w3-block\">Потоки из Бахус</button>\n" +
                  "  <div id=\"DemoFL\" class=\"w3-hide w3-container w3-light-gray\">\n" +
                //"    <p>Lorem ipsum 25% width</p>\n" +
                "  </div>\n" +
                "</div>";

            bacPrint +="<div class=\"w3-light-blue\" style='margin-top: 10px;margin-bottom: 0px;'>\n" +
                "  <button id=\"btn_cmp\" onclick=\"myFunctionComp('DemoCmp')\" class=\"w3-button w3-block\">Состав ТТН ЕГАИС</button>\n" +
                "  <div id=\"DemoCmp\" class=\"w3-hide w3-container w3-light-gray\">\n" +
                //"    <p>Lorem ipsum 25% width</p>\n" +
                "  </div>\n" +
                "</div>";
            bacPrint +="<div class=\"w3-light-blue\" style='margin-top: 10px;margin-bottom: 0px;'>\n" +
                "  <button id=\"btn_buf_cmp\" onclick=\"myFunctionBufComp('DemoBufCmp')\" class=\"w3-button w3-block\">Состав Буфера</button>\n" +
                "  <div id=\"DemoBufCmp\" class=\"w3-hide w3-container w3-light-gray\">\n" +
                //"    <p>Lorem ipsum 25% width</p>\n" +
                "  </div>\n" +
                "</div>";

            toPrintag.innerHTML+=magPrint;
            toPrintag.innerHTML+=bacPrint;
            document.getElementById("listOfStatuses").value=intStatus[1].replace(")","");
            //document.getElementById("listOfStatusesOut").value=intStatus[1].replace(")","");
            console.log("EOF "+intStatus[1].replace(")",""));

        }
        else{
            btn_text.className = btn_text.className.replace(" w3-green", "w3-red");
            btn_text.innerText="Какая-то ошибка!"
        }
    }

    var body = 'magbuf='+magbuf.replaceAll(/\s/g,"")+
        '&magsap='+magsap.replaceAll(/\s/g,"")+
        '&magio='+lioMes+
        '&magflow=no'+
        '&magstate=no';

    xhrB.open('POST', '/test/magout', true);
    xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrB.send(body);

}

function changeStateBacchus(oldS,buf,sap,inout){
    var newSt = document.getElementById("listOfStatusesIn").value;
    var row_status = document.getElementById("rowStatus");
    //вывести кнопки подтвеждения или отмены смены статуса буфера, разобраться с повторением, повторный вызов функции.
    if(inout==1){
        //alert('change status of incoming buffer from'+oldS+'to - '+newSt+' buf - '+ buf.replaceAll(/\s/g,'') + ' sap - '+sap);
        let xhrCh = new XMLHttpRequest();
        xhrCh.onreadystatechange = function() {
            //btn_text.innerText="Загружаю..."
            if (xhrCh.readyState !== 4) return;
            if (xhrCh.status == 200) {
                var ok_or_no = xhrCh.responseText;
                if(ok_or_no=="ok")
                    alert("buf changed!");
                MagOut();
            }
        }
        var body = 'magbuf='+buf.replaceAll(/\s/g,"")+
            '&magsap='+sap.replaceAll(/\s/g,"")+
            '&magio='+inout+
            '&magflow=nope'+
            '&magstate=ch,'+oldS+','+newSt;
        xhrCh.open('POST', '/test/magout', true);
        xhrCh.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhrCh.send(body);


    }
    else{
        alert('change status of outgoing buffer from'+oldS+'to - '+newSt+' buf - '+ buf.replaceAll(/\s/g,'') + ' sap - '+sap);
        let xhrOut = new XMLHttpRequest();
        xhrOut.onreadystatechange = function() {
            //btn_text.innerText="Загружаю..."
            if (xhrOut.readyState !== 4) return;
            if (xhrOut.status == 200) {
                var ok_or_no = xhrOut.responseText;
                if(ok_or_no=="ok")
                    alert("buf changed!");
                MagOut();
            }
        }
        var body = 'magbuf='+buf.replaceAll(/\s/g,"")+
            '&magsap='+sap.replaceAll(/\s/g,"")+
            '&magio='+inout+
            '&magflow=nope'+
            '&magstate=ch,'+oldS+','+newSt;
        xhrOut.open('POST', '/test/magout', true);
        xhrOut.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhrOut.send(body);
    }


}

function  NQ_BASE_INFO(){
    var lio = document.getElementById("listNQInOut");
    var lioMes = 0;//lio.options[lio.selectedIndex].value;
    var btn_text = document.getElementById("MagNQOutSend");


    //alert(lioMes);
    var magbuf = document.getElementById("MagNQbuff").value;
    var magsap = document.getElementById("MagNQSAP").value;
    var toPrintag = document.getElementById("threeq");
    var toPrintFlow = document.getElementById("quart");
    toPrintag.innerHTML="";toPrintFlow.innerHTML="";
    var flagf=false;



    var printTableNQ="<h4>NQ</h4><br><table class=\"w3-table-all w3-small\">" +
    "<tr class = \"w3-light-blue\">"+
    "<th>Буфер</th>"+
    "<th>Статус</th>"+
    "<th>Описание</th>"+
    "<th>Тип докуента</th>"+
    "<th>Буфер в бахус</th>"+
    "</tr>";



    var intStatus="";
    //toPrintag.innerHTML="";


    // request base info from nq---------------------------------------

    var showNQInfo = ''+magbuf.replaceAll(/\s/g,"")+ //bufer
        ','+magsap.replaceAll(/\s/g,"")+  //sap
        ','+lioMes+  // in out poka ne ispolzuetsya
        ',NQ_BASE_INFO'; // param to show

    var paramsToShow = showNQInfo.split(",");

    var respInfo="";

    var body = 'magbuf='+paramsToShow[0].replaceAll(/\s/g,"")+
        '&magsap='+paramsToShow[1].replaceAll(/\s/g,"")+
        '&magio='+paramsToShow[2]+
        '&magParam='+paramsToShow[3];

    let xhrNQ_BASE = new XMLHttpRequest();
    xhrNQ_BASE.onreadystatechange = function() {
        if (xhrNQ_BASE.readyState !== 4) return;
        if (xhrNQ_BASE.status == 200) {


            var respInfo =  xhrNQ_BASE.responseText;

            console.log("main_f"+xhrNQ_BASE.responseText);
            var respNQ = respInfo.split("|");
            printTableNQ+="<tr>";
            printTableNQ+="<td>"+respNQ[0]+"</td>";
            printTableNQ+="<td>"+respNQ[1]+"</td>";
            printTableNQ+="<td>"+respNQ[2]+"</td>";
            printTableNQ+="<td>"+respNQ[3]+"</td>";
            printTableNQ+="<td>"+respNQ[4]+"</td>";
            printTableNQ+="</tr>" +
                "<tr>" +
                "<td colspan=\"2\">Последняя выгрузка в КЭШ</td>"+
                "<td colspan=\"3\">"+respNQ[5]+"</td>"+
                "</tr>" +
                "</table>";

            var flowPrint ="<br><div class=\"w3-light-blue\" style='margin-top: 0px;margin-bottom: 0px;'>\n" +
                "  <button id=\"btn_hist_flow\" onclick=\"flowFromNQ('"+respNQ[4]+"')\" class=\"w3-button w3-block\">Потоки из NQ</button>\n" +
                "  <div id=\"nqFL\" class=\"w3-hide w3-container w3-light-gray\">\n" +
                //"    <p>Lorem ipsum 25% width</p>\n" +
                "  </div>\n" +
                "</div>";

            printTableNQ+="<br>проверка марки<textarea id=\"markCheck\" class=\"w3-input w3-border\"  style=\"resize:none\"></textarea>";
            printTableNQ+="<button id=\"btn_mark_check\" onclick=\"checkMark()\" class=\"w3-btn w3-green w3-round-large w3-margin-bottom\">Проверить</button>";


            toPrintag.innerHTML+=printTableNQ;

            toPrintFlow.innerHTML+=flowPrint;
            BAC_BASE_INFO(respNQ[4]);
            flagf=true;
            return flagf;

        }
        flagf=true;
        return flagf;
    }

    xhrNQ_BASE.open('POST', '/test/magnq', true);
    xhrNQ_BASE.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhrNQ_BASE.send(body);
    flagf=true;
    return flagf;
}

function  BAC_BASE_INFO(bac_buf){
    var lio = document.getElementById("listNQInOut");
    var lioMes = 0;//lio.options[lio.selectedIndex].value;
    var btn_text = document.getElementById("MagNQOutSend");
    btn_text.innerText="Отправить"

//alert(lioMes);
    var magbuf = document.getElementById("MagNQbuff").value;
    var magsap = document.getElementById("MagNQSAP").value;
    var toPrintag = document.getElementById("MagNQoutput");
    toPrintag.innerHTML="";


    var printTableNQ="<h4>BACCHUS</h4><br><table class=\"w3-table-all w3-small\">" +
        "<tr class = \"w3-light-blue\">"+
        "<th>Буфер</th>"+
        "<th>Статус</th>"+
        "<th>ТТН</th>"+
        "<th>Дата</th>"+
        "<th>Заказ</th>"+
        "</tr>";
    var intStatus="";
    //toPrintag.innerHTML="";


// request base info from nq---------------------------------------

    var showNQInfo = ''+bac_buf.replaceAll(/\s/g,"")+ //bufer
        ','+magsap.replaceAll(/\s/g,"")+  //sap
        ','+lioMes+  // in out poka ne ispolzuetsya
        ',BAC_BASE_INFO'; // param to show

    var paramsToShow = showNQInfo.split(",");

    var respInfo="";

    var body = 'magbuf='+paramsToShow[0].replaceAll(/\s/g,"")+
        '&magsap='+paramsToShow[1].replaceAll(/\s/g,"")+
        '&magio='+paramsToShow[2]+
        '&magParam='+paramsToShow[3];

    let xhrBAC_BASE = new XMLHttpRequest();
    xhrBAC_BASE.onreadystatechange = function() {
        if (xhrBAC_BASE.readyState !== 4) return;
        if (xhrBAC_BASE.status == 200) {
            btn_text.innerText="Отправить"
            var respInfo =  xhrBAC_BASE.responseText;
            console.log("main_f"+xhrBAC_BASE.responseText);
            var respNQ = respInfo.split("|");
            printTableNQ+="<tr>";
            printTableNQ+="<td>"+respNQ[0]+"</td>";
            printTableNQ+="<td>"+respNQ[1]+"</td>";
            printTableNQ+="<td>"+respNQ[2]+"</td>";
            printTableNQ+="<td>"+respNQ[3]+"</td>";
            printTableNQ+="<td>"+respNQ[4]+"</td>";
            printTableNQ+="</tr></table>";

            toPrintag.innerHTML+=printTableNQ;

        }
        //return xhrB.responseText;
    }

    xhrBAC_BASE.open('POST', '/test/magnq', true);
    xhrBAC_BASE.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhrBAC_BASE.send(body);
}

function  NQ_FLOW(){
    var lio = document.getElementById("listNQInOut");
    var lioMes = 0;//lio.options[lio.selectedIndex].value;
    var btn_text = document.getElementById("MagNQOutSend");
    //btn_text.innerText="Отправить"

    //alert(lioMes);
    var magbuf = document.getElementById("MagNQbuff").value;
    var magsap = document.getElementById("MagNQSAP").value;
    var toPrintag = document.getElementById("threequarter");



    var flowPrint ="<br><div class=\"w3-light-blue\" style='margin-top: 0px;margin-bottom: 0px;'>\n" +
        "  <button id=\"btn_hist_flow\" onclick=\"flowFromNQ('"+respNQ[4]+"')\" class=\"w3-button w3-block\">Потоки из NQ</button>\n" +
        "  <div id=\"nqFL\" class=\"w3-hide w3-container w3-light-gray\">\n" +
        //"    <p>Lorem ipsum 25% width</p>\n" +
        "  </div>\n" +
        "</div>";

    var intStatus="";
    //toPrintag.innerHTML="";


    // request base info from nq---------------------------------------

    var showNQInfo = ''+magbuf.replaceAll(/\s/g,"")+ //bufer
        ','+magsap.replaceAll(/\s/g,"")+  //sap
        ','+lioMes+  // in out poka ne ispolzuetsya
        ',NQ_BASE_INFO'; // param to show

    var paramsToShow = showNQInfo.split(",");

    var respInfo="";

    var body = 'magbuf='+paramsToShow[0].replaceAll(/\s/g,"")+
        '&magsap='+paramsToShow[1].replaceAll(/\s/g,"")+
        '&magio='+paramsToShow[2]+
        '&magParam='+paramsToShow[3];

    let xhrNQ_FLOW = new XMLHttpRequest();
    xhrNQ_FLOW.onreadystatechange = function() {
        if (xhrNQ_FLOW.readyState !== 4) return;
        if (xhrNQ_FLOW.status == 200) {
            var respInfo =  xhrNQ_FLOW.responseText;
            console.log("main_f"+xhrNQ_FLOW.responseText);
            var respNQ = respInfo.split("|");
            printTableNQ+="<tr>";
            printTableNQ+="<td>"+respNQ[0]+"</td>";
            printTableNQ+="<td>"+respNQ[1]+"</td>";
            printTableNQ+="<td>"+respNQ[2]+"</td>";
            printTableNQ+="<td>"+respNQ[3]+"</td>";
            printTableNQ+="<td>"+respNQ[4]+"</td>";
            printTableNQ+="</tr></table>";

            toPrintag.innerHTML+=printTableNQ;

        }
        //return xhrB.responseText;
    }

    xhrNQ_FLOW.open('POST', '/test/magnq', true);
    xhrNQ_FLOW.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhrNQ_FLOW.send(body);
}

function  checkMark(){
    var lio = document.getElementById("listNQInOut");
    var lioMes = 0;//lio.options[lio.selectedIndex].value;
    var btn_text = document.getElementById("MagNQOutSend");
    var btn_mark = document.getElementById("btn_mark_check");
    //btn_mark.disabled = "true";

//alert(lioMes);
    var magbuf = document.getElementById("MagNQbuff").value;
    var magsap = document.getElementById("MagNQSAP").value;
    var magMarkL = document.getElementById("markCheck").value;
    var toPrintag = document.getElementById("markNQ_Check");
    toPrintag.innerHTML="";

    var printTableMark="<h5>MarkInfo</h5><table class=\"w3-table-all w3-small\">" +
        "<tr class = \"w3-light-blue\">"+
        "<th>Статус</th>"+
        "<th>Дата</th>"+
        "<th>Документ в NQ</th>"+
        "<th>Статус_ENG</th>"+
        "<th>Буфер в бахус</th>"+
        "</tr>";

    let xhrNQ_MARK = new XMLHttpRequest();

/*

    if(magMarkL.length!=68 || magMarkL.length!=150) {
        //btn_mark.disabled = "false";
        alert("Длинна марки должна быть 68 или 150 символов!!!");
        return;
    }
*/






    xhrNQ_MARK.onreadystatechange = function() {
        if (xhrNQ_MARK.readyState !== 4) return;
        if (xhrNQ_MARK.status == 200) {

            var respInfo =  xhrNQ_MARK.responseText;
            var markInfo = respInfo.split("|");

            printTableMark+="<tr>";
            printTableMark+="<td>"+markInfo[0]+"</td>";
            printTableMark+="<td>"+markInfo[1]+"</td>";
            printTableMark+="<td>"+markInfo[2]+"</td>";
            printTableMark+="<td>"+markInfo[3]+"</td>";
            printTableMark+="<td>"+markInfo[4]+"</td>";
            printTableMark+="</tr>";
            printTableMark+="</table>";

            toPrintag.innerHTML+=printTableMark;



        }
        //return xhrB.responseText;
    }
    var showNQInfo = ''+magMarkL.replaceAll(/\s/g,"")+ //bufer
        ','+magsap.replaceAll(/\s/g,"")+  //sap
        ','+lioMes+  // in out poka ne ispolzuetsya
        ',markCheck'; // param to show
    var paramsToShow = showNQInfo.split(",");

    var respInfo="";

    var body = 'magbuf='+paramsToShow[0].replaceAll(/\s/g,"")+
        '&magsap='+paramsToShow[1].replaceAll(/\s/g,"")+
        '&magio='+paramsToShow[2]+
        '&magParam='+paramsToShow[3];

    xhrNQ_MARK.open('POST', '/test/magnq', true);
    xhrNQ_MARK.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhrNQ_MARK.send(body);

}


function MagNQ(){
    var lio = document.getElementById("listNQInOut");
    var lioMes = 0;//lio.options[lio.selectedIndex].value;
    var btn_text = document.getElementById("MagNQOutSend");
    btn_text.innerText="Загружаю..";

    //alert(lioMes);
    var magbuf = document.getElementById("MagNQbuff").value;
    var magsap = document.getElementById("MagNQSAP").value;
    var toPrintag = document.getElementById("threeq");
    var toPrintag_2 = document.getElementById("MagNQoutput");
    toPrintag.innerHTML="";
    toPrintag_2.innerHTML="";

    if(magbuf==""){
        // показываем только последний кэш и проверку марок
        markAndCash();
    }else{
        NQ_BASE_INFO();
    }



       // setTimeout(BAC_BASE_INFO, 5000);




// request base info from nq---------------------------------------


    //

    /*
    let xhrB = new XMLHttpRequest();
    xhrB.onreadystatechange = function() {
        btn_text.className = btn_text.className.replace(" w3-red", "w3-green");
        btn_text.innerText="Загружаю..."

        if (xhrB.readyState !== 4) return;
        if (xhrB.status == 200) {
            btn_text.innerText="Отправить"
            var respText = xhrB.responseText.split("&"); // main mes
            console.log(respText);
            var respNQ = respText[0].split("|"); // mes from nq
            //for(var i=0; i<respText.length;i++){
            printTableNQ+="<tr>";
            printTableNQ+="<td>"+respNQ[0]+"</td>";
            printTableNQ+="<td>"+respNQ[1]+"</td>";
            printTableNQ+="<td>"+respNQ[2]+"</td>";
            printTableNQ+="<td>"+respNQ[3]+"</td>";
            printTableNQ+="<td>"+respNQ[4]+"</td>";
            printTableNQ+="</tr>";

            var flowPrint ="<br><div class=\"w3-light-blue\" style='margin-top: 0px;margin-bottom: 0px;'>\n" +
                "  <button id=\"btn_hist_flow\" onclick=\"flowFromNQ('"+respNQ[4]+"')\" class=\"w3-button w3-block\">Потоки из NQ</button>\n" +
                "  <div id=\"nqFL\" class=\"w3-hide w3-container w3-light-gray\">\n" +
                //"    <p>Lorem ipsum 25% width</p>\n" +
                "  </div>\n" +
                "</div>";

           // }
            printTableNQ+="</table>";
            // nq buf history
            var shortHistNQ=respText[1].split("!"); // short hist from NQ

            var printTableNQH="<h4>NQ history</h4><br><table class=\"w3-table-all w3-small\">" +
                "<tr class = \"w3-light-blue\">"+
                "<th>Дата</th>"+
                "<th>Поле</th>"+
                "<th>Старое значение</th>"+
                "<th>Новое значение</th>"+
                "<th>Таблица</th>"+
                "</tr>";

            for(var i=0; i < shortHistNQ.length-1; i ++){
                var params = shortHistNQ[i].split("|");
                printTableNQH+="<tr>";
                printTableNQH+="<td>"+params[0]+"</td>";
                printTableNQH+="<td>"+params[1]+"</td>";
                printTableNQH+="<td>"+params[2]+"</td>";
                printTableNQH+="<td>"+params[3]+"</td>";
                printTableNQH+="<td>"+params[4]+"</td>";
                printTableNQH+="</tr>";
            }

            printTableNQH+="</table>";

            //bacchus
            var respBac=respText[3].split("|"); // mes from bacchus
            var printTableBac="<h4>BACCHUS</h4><br><table class=\"w3-table-all w3-small\">" +
                "<tr class = \"w3-light-blue\">"+
                "<th>Буфер</th>"+
                "<th>Статус</th>"+
                "<th>ТТН</th>"+
                "<th>Дата</th>"+
                "<th>Заказ</th>"+
                "</tr>";

            printTableBac+="<tr>";
            printTableBac+="<td>"+respBac[0]+"</td>";
            printTableBac+="<td>"+respBac[1]+"</td>";
            printTableBac+="<td>"+respBac[2]+"</td>";
            printTableBac+="<td>"+respBac[3]+"</td>";
            printTableBac+="<td>"+respBac[4]+"</td>";
            printTableBac+="</tr>" + "</table>";

            toPrintag.innerHTML+=printTableNQ;
            toPrintag.innerHTML+=flowPrint;
            toPrintag.innerHTML+=printTableNQH;
            toPrintag.innerHTML+=printTableBac;



        }
    }
    var body = 'magbuf='+magbuf.replaceAll(/\s/g,"")+
        '&magsap='+magsap.replaceAll(/\s/g,"")+
        '&magio='+lioMes+
        '&magParam=empty';
    xhrB.open('POST', '/test/magnq', true);
    xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrB.send(body); */



    /*
     xhrB.onreadystatechange = function() {
        if (xhrB.readyState !== 4) return;
            if (xhrB.status == 200) {
            }
    }
    var body = 'magbuf='+buf.replaceAll(/\s/g,"")+
            '&magsap='+sap.replaceAll(/\s/g,"")+
            '&magio='+inout+
            '&magflow=nope'+
            '&magstate=ch,'+oldS+','+newSt;
        xhrOut.open('POST', '/test/magnq', true);
        xhrOut.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhrOut.send(body);

     */

}

function markAndCash(){

    var lio = document.getElementById("listNQInOut");
    var lioMes = 0;//lio.options[lio.selectedIndex].value;
    var btn_text = document.getElementById("MagNQOutSend");
    //btn_text.innerText="Отправить"

    //alert(lioMes);
    var magbuf = "000";
    var magsap = document.getElementById("MagNQSAP").value;
    var toPrintag = document.getElementById("threeq");
    var toPrintag_2 = document.getElementById("MagNQoutput");
    var printTableNQ="";
    toPrintag.innerHTML="";
    toPrintag_2.innerHTML="";


    var showNQInfo = ''+magbuf.replaceAll(/\s/g,"")+ //bufer
        ','+magsap.replaceAll(/\s/g,"")+  //sap
        ','+lioMes+  // in out poka ne ispolzuetsya
        ',onlyMarkCash'; // param to show

    var paramsToShow = showNQInfo.split(",");

    var respInfo="";

    var body = 'magbuf='+paramsToShow[0].replaceAll(/\s/g,"")+
        '&magsap='+paramsToShow[1].replaceAll(/\s/g,"")+
        '&magio='+paramsToShow[2]+
        '&magParam='+paramsToShow[3];

    let xhrNQ_FLOW = new XMLHttpRequest();
    xhrNQ_FLOW.onreadystatechange = function() {
        if (xhrNQ_FLOW.readyState !== 4) return;
        if (xhrNQ_FLOW.status == 200) {
            var respInfo =  xhrNQ_FLOW.responseText;
            btn_text.innerText="Отправить";
            printTableNQ+="<br><h4>Последняя выгрузка в КЭШ: "+respInfo+"</h4>";

            printTableNQ+="<br>проверка марки<textarea id=\"markCheck\" class=\"w3-input w3-border\"  style=\"resize:none\"></textarea>";
            printTableNQ+="<button id=\"btn_mark_check\" onclick=\"checkMark()\" class=\"w3-btn w3-green w3-round-large w3-margin-bottom\">Проверить</button>";


            toPrintag.innerHTML+=printTableNQ;

        }
        //return xhrB.responseText;
    }

    xhrNQ_FLOW.open('POST', '/test/magnq', true);
    xhrNQ_FLOW.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhrNQ_FLOW.send(body);

}

function CaduCh(){

    var btn_text = document.getElementById("CadSendCh");
    //btn_text.innerText="Загружаю..";
    btn_text.disabled = true;
    //alert(lioMes);
    var cadbuf = document.getElementById("CadBufCh").value;
    var cadsap = document.getElementById("CadSapCh").value;

    var toPrintag = document.getElementById("CadThreeqCh"); // 3/4
    //var toPrintag_2 = document.getElementById("CadQuart"); // 1/4
    var toPrintag_main = document.getElementById("CadTextAreaCh"); // main div to print

    var printBaseInfo="<table class=\"w3-table-all w3-small\">" +
        "<tr class = \"w3-light-blue\">"+
        "<th>Буфер</th>"+
        "<th>Тип буфера</th>"+
        "<th>Статус</th>"+
        "<th>ТТН</th>"+
        "<th>Дата</th>"+
        "<th>Отправитель</th>"+
        "<th>Получатель</th>"+
        "</tr>";


    toPrintag_main.innerHTML="";

    let xhrCadu = new XMLHttpRequest();
    xhrCadu.onreadystatechange = function() {
        if (xhrCadu.readyState !== 4) return;
        if (xhrCadu.status == 200) {
            btn_text.disabled = false;

            var respInfo =  xhrCadu.responseText;

            var arrInfoMain=respInfo.split("&");
            //printBaseInfo+="<tr>";
            for(var i=0;i<arrInfoMain.length-1;i++){



                var rowInfo = arrInfoMain[i].split("|");
                var intStatus = ""+parseInt(rowInfo[2].replace(/\D+/g,""));

                printBaseInfo+="<tr>";
                printBaseInfo+="<td>"+rowInfo[0]+"</td>";
                printBaseInfo+="<td>"+rowInfo[1]+"</td>";
                printBaseInfo+="<td id=\"rowStatusCh\">"+
                    "<select  id=\"listOfStatusesCadu\" class=\"w3-select w3-border\" name=\"option\">" +
                    "<option value=\"125\">Приход аннулирован (125)</option>"+
                    "<option value=\"126\">На сопоставлении (126)</option>"+
                    "<option value=\"128\">В КИС (128)</option>"+
                    "<option value=\"130\">Ждёт вет.контроля (только ветврач) (130)</option>"+
                    "<option value=\"131\">На вет.контроле (только ветврач) (131)</option>"+
                    "<option value=\"169\">Общий (169)</option>"+
                    "<option value=\"185\">Ждёт сопоставления (185)</option>"+
                    "<option value=\"186\">Отклонён (186)</option>"+
                    "<option value=\"187\">На разборе (187)</option>"+
                    "<option value=\"188\">Удалён (188)</option>"+
                    "<option value=\"361\">Ждёт вет.контроля (361)</option>"+
                    "<option value=\"362\">На вет.контроле (362)</option>"+
                    "<option value=\"40\">Создан (40)</option>"+
                    "<option value=\"41\">Автообработка (41)</option>"+
                    "<option value=\"42\">Готов (42)</option>"+
                    "<option value=\"43\">Ошибка (43)</option>"+
                    "<option value=\"661\">Ждёт сопоставления ЭВСД (661)</option>"+
                    "<option value=\"662\">На сопоставлении ЭВСД (662)</option>"+
                    "<option value=\"663\">Ждёт автосопоставления ЭВСД (663)</option>"+
                    "<option value=\"664\">Ждёт корректировки ЭВСД (664)</option>"+
                    "<option value=\"665\">На корректировке ЭВСД (665)</option>"+
                     "</select>";

                printBaseInfo+="</td>";
                printBaseInfo+="<td>"+rowInfo[3]+"</td>";
                printBaseInfo+="<td>"+rowInfo[4]+"</td>";
                printBaseInfo+="<td>"+rowInfo[5]+"</td>";
                printBaseInfo+="<td>"+rowInfo[6]+"</td>";

            }

            printBaseInfo+="</tr>";
            printBaseInfo+="</table>";

            toPrintag_main.innerHTML+=printBaseInfo;

            document.getElementById("listOfStatusesCadu").value=intStatus;

        }
    }

    var body = 'cadbuf='+cadbuf.replaceAll(/\s/g,"")+
        '&cadsap='+cadsap.replaceAll(/\s/g,"")+
        '&cadparam=baseChange';

    xhrCadu.open('POST', '/test/cadusearch', true);
    xhrCadu.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrCadu.send(body);


}

function CaduS() {

    var btn_text = document.getElementById("CadSend");
    //btn_text.innerText="Загружаю..";
    btn_text.disabled = true;
    //alert(lioMes);
    var cadbuf = document.getElementById("CadBuf").value;
    var cadsap = document.getElementById("CadSap").value;

    var toPrintag = document.getElementById("CadThreeq"); // 3/4
    //var toPrintag_2 = document.getElementById("CadQuart"); // 1/4
    var toPrintag_main = document.getElementById("CadTextArea"); // main div to print

    var alertMes = document.getElementById("alertMes");

    var printBaseInfo="<table class=\"w3-table-all w3-small\">" +
        "<tr class = \"w3-light-blue\">"+
        "<th>Буфер</th>"+
        "<th>Тип буфера</th>"+
        "<th>Статус</th>"+
        "<th>ТТН</th>"+
        "<th>Дата</th>"+
        "<th>Отправитель</th>"+
        "<th>Получатель</th>"+
        "<th>Статус NQ</th>"+
        "<th>Дата изменения в NQ</th>"+
        "<th>Исключен?</th>"+
        "<th>Номер машины</th>"+
        "</tr>";
    /*
    bacPrint +="<div class=\"w3-light-blue\" style='margin-top: 10px;margin-bottom: 0px;'>\n" +
        "  <button id=\"btn_cmp\" onclick=\"myFunctionComp('DemoCmp')\" class=\"w3-button w3-block\">Состав ТТН ЕГАИС</button>\n" +
        "  <div id=\"DemoCmp\" class=\"w3-hide w3-container w3-light-gray\">\n" +
        //"    <p>Lorem ipsum 25% width</p>\n" +
        "  </div>\n" +
        "</div>";
    */

    // Перенести вывод тасков в отдельную функцию
    // Разобраться с буфером (айди или правильный номер)
    var printTaskInfo=
        "<div class=\"w3-light-blue\" style='overflow-x: scroll; overflow-y: scroll;  margin-top: 10px;margin-bottom: 0px;'>\n" +
        "  <button id=\"btn_c_tasks\" onclick=\"caduTaskInfoShow('C_Tasks')\" class=\"w3-button w3-block\">Таски</button>\n" +
        "  <div id=\"C_Tasks\" style=\"overflow-y: scroll; overflow-x: scroll; height: 600px;\" class=\"w3-hide w3-container w3-light-gray\">\n" +
        "<br>";



    var printBufDetails=
        "<br><div class=\"w3-light-blue\" style='margin-top: 10px;margin-bottom: 0px;'>\n" +
        "  <button id=\"btn_c_tasks\" onclick=\"caduDetInfoShow('C_Details')\" class=\"w3-button w3-block\">Детали буфера</button>\n" +
        "  <div id=\"C_Details\" class=\"w3-hide w3-container w3-light-gray\">\n" +
        "<br>";

        // function is deprecated---!
    var printCertInfo=
        "<div class=\"w3-light-blue\" style='margin-top: 10px;margin-bottom: 0px;'>\n" +
        "  <button id=\"btn_c_tasks\" onclick=\"myFunctionCadu('C_Certs')\" class=\"w3-button w3-block\">Сертификаты</button>\n" +
        "  <div id=\"C_Certs\" class=\"w3-hide w3-container w3-light-gray\">\n" +
        "<br><table class=\"w3-table-all w3-small\">" +
        "<tr class = \"w3-light-blue\">"+
        "<th>UUID</th>"+
        "<th>STATUS</th>"+
         "</tr>";

    var printVFlowInfo=
        "<div class=\"w3-light-blue\" style='margin-top: 10px;margin-bottom: 0px;'>\n" +
        "  <button id=\"btn_c_tasks\" onclick=\"caduFlowInfoShow('C_Flows')\" class=\"w3-button w3-block\">Потоки V10 и V13</button>\n" +
        "  <div id=\"C_Flows\" class=\"w3-hide w3-container w3-light-gray\">\n" +
        "<br>";

    //PLU, ДВ, СГ, номер инв., статус инв., ЗСЖ. Ошибка.

    var printInventInfo=
        "<div class=\"w3-light-blue\" style='margin-top: 10px;margin-bottom: 0px;'>\n" +
        "  <button id=\"btn_c_tasks\" onclick=\"myFunctionCaduInvent('C_Invent')\" class=\"w3-button w3-block\">Инвентаризация</button>\n" +
        "  <div id=\"C_Invent\" class=\"w3-hide w3-container w3-light-gray\">\n" +
        "<br>";


    toPrintag.innerHTML="";
    //toPrintag_2.innerHTML="";
    toPrintag_main.innerHTML="";

    let xhrCadu = new XMLHttpRequest();
    xhrCadu.onreadystatechange = function() {
        if (xhrCadu.readyState !== 4) return;
        if (xhrCadu.status == 200) {
            btn_text.disabled = false;

            var respInfo =  xhrCadu.responseText;

            var arrInfoMain=respInfo.split("@");


            var arrInfo=arrInfoMain[0].split("&"); // base info

            //var arrInfoTask=arrInfoMain[1].split("&"); // таски
            //var arrInfoDetails=arrInfoMain[2].split("&"); // детали
            var arrRCState=arrInfoMain[1].split("&"); // статус РЦ
            var arrExclState=arrInfoMain[2].split("&");
            var arrBufCarNumber=arrInfoMain[3].split("&");
            //var arrBufCertInfo=arrInfoMain[6].split("&");
           // var arrBufFlowInfo=arrInfoMain[7].split("&");
          // var arrBufFlowInfo=arrInfoMain[7].split("&");


            //yyyy.mm.ddd
            for(var i=0;i<arrInfo.length-1;i++){
                var rowInfo = arrInfo[i].split("|");
                    if(rowInfo[0].includes("not_found"))
                        alertMes.innerText="Буфер не найден в БД Кадуцей. Поиск возможен только по номеру буфера!!!"

                    printBaseInfo+="<tr>";
                    printBaseInfo+="<td>"+rowInfo[0]+"</td>";
                    printBaseInfo+="<td>"+rowInfo[1]+"</td>";
                    printBaseInfo+="<td>"+rowInfo[2]+"</td>";
                    printBaseInfo+="<td>"+rowInfo[3]+"</td>";
                    printBaseInfo+="<td>"+rowInfo[4].substr(0,10)+"</td>";   // cut time date_time row ?
                    printBaseInfo+="<td>"+rowInfo[5]+"</td>";
                    printBaseInfo+="<td>"+rowInfo[6]+"</td>";
                   // printBaseInfo+="</tr>";
            }

            /*
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
            * */


            /* детали буфера
             for(var i=0;i<arrInfoDetails.length-1;i++){
                var rowInfo = arrInfoDetails[i].split("|");
                printBufDetails+="<tr>";
                printBufDetails+="<td>"+rowInfo[0]+"</td>";
                printBufDetails+="<td>"+rowInfo[1]+"</td>";
                printBufDetails+="<td>"+rowInfo[2]+"</td>";
                printBufDetails+="<td>"+rowInfo[3]+"</td>";
                printBufDetails+="<td>"+rowInfo[4]+"</td>";
                printBufDetails+="<td><a href=\"https://mercury.vetrf.ru/pub/operatorui?_action=findVetDocumentFormByUuid&uuid="+rowInfo[5]+"\">"+rowInfo[5]+"</a></td>";
                printBufDetails+="<td>"+rowInfo[6]+"</td>";
                printBufDetails+="<td>"+rowInfo[7]+"</td>";
                printBufDetails+="</tr>";
            }
             */

            /* сертификаты старый блок
              for(var i=0;i<arrBufCertInfo.length-1;i++){
                var rowC= arrBufCertInfo[i].split("!");
                for(var l=0;l<rowC.length-1;l++){
                    var rowInfo = rowC[l].split("|");
                    printCertInfo+="<tr>";
                    printCertInfo+="<td>"+rowInfo[0]+"</td>";
                    printCertInfo+="<td>"+rowInfo[1]+"</td>";
                    printCertInfo+="</tr>";
                }

            }
             */

            /*  блок потоков V10 и V13
             for(var i=0;i<arrBufFlowInfo.length-1;i++){
                var rowC= arrBufFlowInfo[i].split("!");
                for(var l=0;l<rowC.length-1;l++){
                    var rowInfo = rowC[l].split("|");
                    printVFlowInfo+="<tr>";
                    printVFlowInfo+="<td>"+rowInfo[0]+"</td>";
                    printVFlowInfo+="<td>"+rowInfo[1]+"</td>";
                    printVFlowInfo+="<td>"+rowInfo[2]+"</td>";
                    printVFlowInfo+="</tr>";
                }

            }

             */


            // need add block with inventarisation to UI



            //printVFlowInfo  arrBufFlowInfo

            var rowInfo = arrRCState[0].split("|");
            printBaseInfo+="<td>"+rowInfo[1]+"</td>";
            printBaseInfo+="<td>"+rowInfo[0]+"</td>";

            var rowInfo = arrExclState[0].split("|");
            printBaseInfo+="<td>"+rowInfo[0]+"</td>";

            var rowInfo = arrBufCarNumber[0].split("|");
            printBaseInfo+="<td>"+rowInfo[0]+"</td>";



            printBaseInfo+="</tr>";
            printBaseInfo+="</table>";

            printTaskInfo+="</div>" +
                "</div>";

            /*

             */

            printBufDetails+=""+
                "  </div>" +
                "</div>";


            printCertInfo+="</table>"+
                "  </div>" +
                "</div>";

            printVFlowInfo+=""+
                "  </div>" +
                "</div>";

            printInventInfo+=""+
                "  </div>" +
                "</div>";

            toPrintag.innerHTML+=printBaseInfo;
            toPrintag_main.innerHTML+=printTaskInfo; //печать тасков
            toPrintag_main.innerHTML+=printBufDetails; //печать деталей
            //toPrintag_main.innerHTML+=printCertInfo; печать сертификатов ? старое ?
            toPrintag_main.innerHTML+=printVFlowInfo; //печать потоков 10 и 13
            toPrintag_main.innerHTML+=printInventInfo; //печать инвентаризации
        }
        //return xhrB.responseText;
    }



    var body = 'cadbuf='+cadbuf.replaceAll(/\s/g,"")+
        '&cadsap='+cadsap.replaceAll(/\s/g,"")+
        '&cadparam=base';

    xhrCadu.open('POST', '/test/cadusearch', true);
    xhrCadu.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrCadu.send(body);

}


function flowFromNQ(buf){


    var magbuf = document.getElementById("MagNQbuff").value;
    var magsap = document.getElementById("MagNQSAP").value;
    var btn_histF = document.getElementById("btn_hist_flow");
    var printHidden="";
    var x = document.getElementById("nqFL");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
    btn_histF.innerTEXT="Загружаю";
    var printTableNQFlow="<br><table class=\"w3-table-all w3-small\">" +
        "<tr class = \"w3-light-blue\">"+
        "<th>Req/Resp</th>"+
        "<th>Тип</th>"+
        "<th>Содержание</th>"+
        "</tr>";

    let xhrB = new XMLHttpRequest();
    xhrB.onreadystatechange = function() {
        if (xhrB.readyState !== 4) return;
        if (xhrB.status == 200) {
            btn_histF.innerTEXT="Загружаю";

            var respText=xhrB.responseText.split("@");

            for(var i=0; i<respText.length-1;i++){
                var paramsFlow=respText[i].split("|");

                var reqFlow=paramsFlow[2].replaceAll(">","&gt;");reqFlow=reqFlow.replaceAll("<","&lt;");
                reqFlow=reqFlow.replaceAll("&gt;&lt;","&gt;\n&lt;");

                var respFlow=paramsFlow[3].replaceAll(">","&gt;");respFlow=respFlow.replaceAll("<","&lt;");
                respFlow=respFlow.replaceAll("&gt;&lt;","&gt;\n&lt;");

                printTableNQFlow+="<tr>";
                printTableNQFlow+="<td>"+"REQUEST"+"</td>";
                printTableNQFlow+="<td>"+paramsFlow[0]+"</td>";
                printTableNQFlow+="<td>"+"<button onclick=\"showFlowNQ('"+paramsFlow[0]+"_REQUEST')\" class=\"w3-button w3-block\">Посмотреть</button>"+"</td>";
                printTableNQFlow+="</tr>";
                printHidden+="<input type=\"hidden\" id=\""+paramsFlow[0]+"_REQUEST\" value=\""+reqFlow.replaceAll("\"","&#34;")+"\">";

                printTableNQFlow+="<tr>";
                printTableNQFlow+="<td>"+"RESPONSE"+"</td>";
                printTableNQFlow+="<td>"+paramsFlow[0]+"</td>";
                printTableNQFlow+="<td>"+"<button onclick=\"showFlowNQ('"+paramsFlow[0]+"_RESPONSE')\" class=\"w3-button w3-block\">Посмотреть</button>"+"</td>";
                printTableNQFlow+="</tr>";
                printHidden+="<input type=\"hidden\" id=\""+paramsFlow[0]+"_RESPONSE\" value=\""+respFlow.replaceAll("\"","&#34;")+"\">";



            }
            printTableNQFlow+="</table>";
            x.innerHTML+=printTableNQFlow;
            x.innerHTML+=printHidden;
    //https://5ka.webhook.office.com/webhookb2/30a9316e-5386-4735-b7ec-a543c6a4c58d@ae314115-5799-469f-8027-921d964c12a1/IncomingWebhook/ccff35f0b6af403992a072a98eb35e0c/a029d58c-b923-4a92-9cea-a5c064d583bd

        }
    }


    var body = 'magbuf='+buf.replaceAll(/\s/g,"")+
        '&magsap='+magsap.replaceAll(/\s/g,"")+
        '&magio=0'+
        '&magParam=flowNQ';
    xhrB.open('POST', '/test/magnq', true);
    xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrB.send(body);

}
//  printTableNQFlow+="<td>"+"<button onclick=\"showFlowNQ('"+paramsFlow[2]+"')\" class=\"w3-button w3-block\">Посмотреть</button>"+"</td>";
//

function showFlowNQ(mesHI){
    var modalWinNQ = document.getElementById("respModalNQ");
    var text_to_modal = document.getElementById(mesHI).value;
        modalWinNQ.innerText=text_to_modal;

    document.getElementById("001idNQ").style.display="block";
}


function searchMarkus(){
    //button
    var mbtn = document.getElementById("SearchButton");
    mbtn.disabled = true;

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
    if(mm_pallet.checked){param="pallet";inBuf=input_2;}
    if(mm_buf.checked){param="buf";ifBuf=input_2;}

    //area output info
    var outputMarkus = document.getElementById('outputmarkus');
    //variable to print
    var printToMarkus="";



    let xhrB = new XMLHttpRequest();

    xhrB.onreadystatechange = function() {
        if (xhrB.readyState !== 4) return;
        if (xhrB.status == 200) {

            outputMarkus.innerHTML="";
            mbtn.disabled = false;
            /*
            switch (param){
                case "order":
                    var mainJson = xhrB.responseText.split("|");
                    for(var ii=0;ii < mainJson.length-1;ii++){
                        var markus_response = mainJson[ii].split("!");
                        printToMarkus="<table class=\"w3-table-all w3-small\">";
                        printToMarkus+="<tr>";
                        printToMarkus+="<td>id</td><td>"+markus_response[0]+"</td>";
                        printToMarkus+="</tr>";

                        printToMarkus+="<tr>";
                        printToMarkus+="<td>sapOrdIdHeader</td><td>"+markus_response[1]+"</td>";
                        printToMarkus+="</tr>";

                        printToMarkus+="<tr>";
                        printToMarkus+="<td>GUID</td><td>"+markus_response[2]+"</td>";
                        printToMarkus+="</tr>";

                        printToMarkus+="<tr>";
                        printToMarkus+="<td>TYPE</td><td>"+markus_response[3]+"</td>";
                        printToMarkus+="</tr>";

                        printToMarkus+="<tr>";
                        printToMarkus+="<td>STATUS</td><td>"+markus_response[4]+"</td>";
                        printToMarkus+="</tr>";

                        printToMarkus+="<tr >";//printToMarkus+="<td>DETAILS</td><td>"+markus_response[5]+"</td>";

                        printToMarkus+="<td onclick=\"myFunctionT('Demo10" +ii + "')\">DETAILS</td><td onclick=\"myFunctionT('Demo10" +ii + "')\">Развернуть</td>"
                        printToMarkus+="</tr>";

                        var print2ToMarkus="";
                        printToMarkus+="<tr id=\"Demo10"+ii+"\" class=\"w3-hide\" width=\"100%\" ><td width=\"80%\"></td><td width=\"20%\"><table class=\"w3-table-all w3-small\">";
                        printToMarkus+="<thead><tr><th>PLU</th><th>QTY</th></tr></thead>";
                        var jdetails = markus_response[5].split("&");
                        for(var i=0; i < jdetails.length-1; i++){
                            var QuanPlu = jdetails[i].split(":");

                            printToMarkus+="<tr><td>"+ QuanPlu[0] + "</td><td>" + QuanPlu[1] + "</td></tr>";
                        }

                        printToMarkus+="</table></td></tr>"


                        if(!markus_response[6].includes("empty")){
                            printToMarkus+="<tr>";
                            printToMarkus+="<td>StoreIn</td><td>"+markus_response[6]+"</td>";
                            printToMarkus+="</tr>";
                        }

                        if(!markus_response[7].includes("empty")){
                            printToMarkus+="<tr>";
                            printToMarkus+="<td>StoreOut</td><td>"+markus_response[7]+"</td>";
                            printToMarkus+="</tr>";
                        }


                        printToMarkus+="</table>";
                        printToMarkus+="<br>";
                        outputMarkus.innerHTML+=printToMarkus;
                    }
                    break;
                case "guid":
                    var mainJson = xhrB.responseText.split("|");
                    for(var ii=0;ii < mainJson.length-1;ii++){
                        var markus_response = mainJson[ii].split("!");
                        printToMarkus="<table class=\"w3-table-all w3-small\">";
                        printToMarkus+="<tr>";
                        printToMarkus+="<td>id</td><td>"+markus_response[0]+"</td>";
                        printToMarkus+="</tr>";

                        printToMarkus+="<tr>";
                        printToMarkus+="<td>sapOrdIdHeader</td><td>"+markus_response[1]+"</td>";
                        printToMarkus+="</tr>";

                        printToMarkus+="<tr>";
                        printToMarkus+="<td>GUID</td><td>"+markus_response[2]+"</td>";
                        printToMarkus+="</tr>";

                        printToMarkus+="<tr>";
                        printToMarkus+="<td>TYPE</td><td>"+markus_response[3]+"</td>";
                        printToMarkus+="</tr>";

                        printToMarkus+="<tr>";
                        printToMarkus+="<td>STATUS</td><td>"+markus_response[4]+"</td>";
                        printToMarkus+="</tr>";

                        printToMarkus+="<tr >";//printToMarkus+="<td>DETAILS</td><td>"+markus_response[5]+"</td>";

                        printToMarkus+="<td onclick=\"myFunctionT('Demo10" +ii + "')\">DETAILS</td><td onclick=\"myFunctionT('Demo10" +ii + "')\">Развернуть</td>"
                        printToMarkus+="</tr>";

                        var print2ToMarkus="";
                        printToMarkus+="<tr id=\"Demo10"+ii+"\" class=\"w3-hide\" width=\"100%\" ><td width=\"80%\"></td><td width=\"20%\"><table class=\"w3-table-all w3-small\">";
                        printToMarkus+="<thead><tr><th>PLU</th><th>QTY</th></tr></thead>";
                        var jdetails = markus_response[5].split("&");
                        for(var i=0; i < jdetails.length-1; i++){
                            var QuanPlu = jdetails[i].split(":");

                            printToMarkus+="<tr><td>"+ QuanPlu[0] + "</td><td>" + QuanPlu[1] + "</td></tr>";
                        }

                        printToMarkus+="</table></td></tr>"


                        if(!markus_response[6].includes("empty")){
                            printToMarkus+="<tr>";
                            printToMarkus+="<td>StoreIn</td><td>"+markus_response[6]+"</td>";
                            printToMarkus+="</tr>";
                        }

                        if(!markus_response[7].includes("empty")){
                            printToMarkus+="<tr>";
                            printToMarkus+="<td>StoreOut</td><td>"+markus_response[7]+"</td>";
                            printToMarkus+="</tr>";
                        }


                        printToMarkus+="</table>";
                        printToMarkus+="<br>";
                        outputMarkus.innerHTML+=printToMarkus;
                    }
                    break;
                case "buf":
                    //code here
                    break;
            }

            */

            var mainJson = xhrB.responseText.split("|");

            for(var ii=0;ii < mainJson.length-1;ii++){
                var markus_response = mainJson[ii].split("!");
                printToMarkus="<table class=\"w3-table-all w3-small\">";
                printToMarkus+="<tr>";
                printToMarkus+="<td>id</td><td>"+markus_response[0]+"</td>";
                printToMarkus+="</tr>";

                printToMarkus+="<tr>";
                printToMarkus+="<td>sapOrdIdHeader</td><td>"+markus_response[1]+"</td>";
                printToMarkus+="</tr>";

                printToMarkus+="<tr>";
                printToMarkus+="<td>GUID</td><td>"+markus_response[2]+"</td>";
                printToMarkus+="</tr>";

                printToMarkus+="<tr>";
                printToMarkus+="<td>TYPE</td><td>"+markus_response[3]+"</td>";
                printToMarkus+="</tr>";

                printToMarkus+="<tr>";
                printToMarkus+="<td>STATUS</td><td>"+markus_response[4]+"</td>";
                printToMarkus+="</tr>";

                printToMarkus+="<tr >";//printToMarkus+="<td>DETAILS</td><td>"+markus_response[5]+"</td>";

                printToMarkus+="<td onclick=\"myFunctionT('Demo10" +ii + "')\">DETAILS</td><td onclick=\"myFunctionT('Demo10" +ii + "')\">Развернуть</td>"
                printToMarkus+="</tr>";

                var print2ToMarkus="";
                printToMarkus+="<tr id=\"Demo10"+ii+"\" class=\"w3-hide\" width=\"100%\" ><td width=\"80%\"></td><td width=\"20%\"><table class=\"w3-table-all w3-small\">";
                printToMarkus+="<thead><tr><th>PLU</th><th>QTY</th></tr></thead>";
                var jdetails = markus_response[5].split("&");
                for(var i=0; i < jdetails.length-1; i++){
                    var QuanPlu = jdetails[i].split(":");

                    printToMarkus+="<tr><td>"+ QuanPlu[0] + "</td><td>" + QuanPlu[1] + "</td></tr>";
                }

                printToMarkus+="</table></td></tr>"


                if(!markus_response[6].includes("empty")){
                    printToMarkus+="<tr>";
                    printToMarkus+="<td>StoreIn</td><td>"+markus_response[6]+"</td>";
                    printToMarkus+="</tr>";
                }

                if(!markus_response[8].includes("empty")){
                    printToMarkus+="<tr>";
                    printToMarkus+="<td>StoreOut</td><td>"+markus_response[8]+"</td>";
                    printToMarkus+="</tr>";
                }

                if(!markus_response[7].includes("empty")){
                    printToMarkus+="<tr>";
                    printToMarkus+="<td>Буфер</td><td>"+markus_response[7]+"</td>";
                    printToMarkus+="</tr>";
                }



                printToMarkus+="</table>";
                printToMarkus+="<br>";
                outputMarkus.innerHTML+=printToMarkus;
            }






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

function myFunctionBM(id) {
    var x = document.getElementById(id);
    var bt_name = document.getElementById("btn_hist");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        var lio = document.getElementById("listInOut");
        var lioMes = lio.options[lio.selectedIndex].value;
        var magbuf = document.getElementById("Magbuff").value;
        var magsap = document.getElementById("MagSAP").value;
        var printHistory="";
        x.innerHTML="";
        printHistory += "<table class='w3-table-all w3-small' style='margin-top: 5px'>";
        printHistory +=  "<tr class = \"w3-light-blue\">"+
            "<th>Дата</th>"+
            "<th>Статус GK</th>"+
            "<th>Статус Бахус</th>"+
            "</tr>";
        let xhrB = new XMLHttpRequest();

        xhrB.onreadystatechange = function() {
            bt_name.innerText="Загружаю...";
            if (xhrB.readyState !== 4) return;
            if (xhrB.status == 200) {
                bt_name.innerText="История статусов";
                var state_hist = xhrB.responseText;
                var arr_state_hist = state_hist.split("&");
                for(var i=0;i<arr_state_hist.length-1;i++){
                    var row_state_hist = arr_state_hist[i].split("|");

                    printHistory+="<tr>"
                    printHistory+="<td>"+row_state_hist[0]+"</td>";
                    printHistory+="<td>"+row_state_hist[1]+"</td>";
                    printHistory+="<td>"+row_state_hist[2]+"</td>";
                    printHistory+="</tr>"
                }

                printHistory+="</table>";
                x.innerHTML+=printHistory;
            }
        }
        var body = 'magbuf='+magbuf.replaceAll(/\s/g,"")+
            '&magsap='+magsap.replaceAll(/\s/g,"")+
            '&magio='+lioMes+
            '&magflow=no'+
            '&magstate=yes';

        xhrB.open('POST', '/test/magout', true);
        xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhrB.send(body);

    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

function myFunctionFL(id) {
    var x = document.getElementById(id);
    var btn_hist_flow_var = document.getElementById("btn_hist_flow");
    x.innerHTML="";
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        var lio = document.getElementById("listInOut");
        var lioMes = lio.options[lio.selectedIndex].value;
        var magbuf = document.getElementById("Magbuff").value;
        var magsap = document.getElementById("MagSAP").value;
        var printHistory="";
        var printModal="";
        var divModal_ID=210;

        x.innerHTML="";
        printHistory += "<table class='w3-table-all w3-small' style='margin-top: 5px'>";
        printHistory +=  "<tr class = \"w3-light-blue\">"+
            "<th>Req/Resp</th>"+
            "<th>Тип</th>"+
            "<th>Содержание</th>"+
            "<th>Переотправка</th>"+
            "</tr>";
        let xhrB = new XMLHttpRequest();

        xhrB.onreadystatechange = function() {
            btn_hist_flow_var.innerText="Загружаю..."
            if (xhrB.readyState !== 4) return;
            if (xhrB.status == 200) {
                btn_hist_flow_var.innerText="Потоки из Бахус";
                var state_hist = xhrB.responseText;
                var arr_state_hist = state_hist.split("~");
                for(var i=0;i<arr_state_hist.length-1;i++){
                    divModal_ID++;

                    //console.log(arr_state_hist[i]);

                    var row_state_hist = arr_state_hist[i].split("|");

                    var printModalDiv_TOP = "<div id=\"idh"+divModal_ID+"\" class=\"w3-modal\" style=\"z-index: 999\">\n" +
                        "                <div class=\"w3-modal-content w3-card-4\">\n" +
                        "                    <header class=\"w3-container w3-teal\">\n" +
                        "        <span onclick=\"document.getElementById('idh"+divModal_ID+"').style.display='none'\"\n" +
                        "              class=\"w3-button w3-display-topright\">&times;</span>\n" +
                        "                        <h2>"+row_state_hist[1]+" "+row_state_hist[0]+"</h2>\n" +
                        "                    </header>\n" +
                        "                    <div class=\"w3-container\" contenteditable=\"true\" id=\""+divModal_ID+"\" style=\"text-align: left;overflow-y: scroll;height: 600px;\"><pre><code>";
                    var printModalDiv_Foot = "</code></pre></div>\n" +
                        "                    <footer class=\"w3-container w3-teal\">\n" +
                        "                    </footer>\n" +
                        "                </div>\n" +
                        "            </div>";

                    var flowWithOutTegs = row_state_hist[2].replace(/\</g,"&lt;");
                    flowWithOutTegs = flowWithOutTegs.replace(/\>/g,"&gt;");
                    printHistory+="<tr>"
                    printHistory+="<td>"+row_state_hist[0]+"</td>";
                    printHistory+="<td>"+row_state_hist[1]+"</td>";
                    //printHistory+="<td>"+flowWithOutTegs+"</td>";
                    printHistory+="<td>"+"<button onclick=\"document.getElementById('idh"+divModal_ID+"').style.display='block'\" class=\"w3-button w3-block\">Посмотреть</button>"+"</td>";
                    printHistory+="<td>"+"<button onclick=\"flowResend('"+row_state_hist[0]+"_"+row_state_hist[1]+"')\" class=\"w3-button w3-block\">Переотправить</button>"+"</td>";
                    printHistory+="</tr>"
                    printModal+=printModalDiv_TOP+flowWithOutTegs+printModalDiv_Foot;

                }

                printHistory+="</table>";
                x.innerHTML+=printHistory;
                x.innerHTML+=printModal;

            }
        }
        var body = 'magbuf='+magbuf.replaceAll(/\s/g,"")+
            '&magsap='+magsap.replaceAll(/\s/g,"")+
            '&magio='+lioMes+
            '&magflow=yes'+
            '&magstate=nope';

        xhrB.open('POST', '/test/magout', true);
        xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhrB.send(body);

    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

var modalResp = document.getElementById('001idM');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalResp) {
        modalResp.style.display = "none";
    }
}
function flowResend(nFlow){


    var flowConf = confirm("Переотправить?");
    if(flowConf){

        var magbuf = document.getElementById("Magbuff").value;
        var magsap = document.getElementById("MagSAP").value;
        var mdMagModal = document.getElementById("respModal");
        mdMagModal.innerHTML="";
        var openModalWithResponse="";
        var lio = document.getElementById("listInOut");
        var lioMes = lio.options[lio.selectedIndex].value;

        var flowType = nFlow.split("_");
        //alert(nFlow);

        let xhrB = new XMLHttpRequest();

        xhrB.onreadystatechange = function() {
            //btn_cmp.innerText = "Отправляю..."
            if (xhrB.readyState !== 4) return;
            if (xhrB.status == 200) {
                //btn_cmp.innerText = "Отправляю..."
                mdMagModal.innerHTML+="<pre><code>";
                mdMagModal.innerText+=xhrB.responseText;
                mdMagModal.innerHTML+="</code></pre>";
                document.getElementById('001idM').style.display="block";
            }
        }


        var body = 'magbuf='+magbuf.replaceAll(/\s/g,"")+
            '&magsap='+magsap.replaceAll(/\s/g,"")+
            '&magio='+lioMes+
            '&magflow=rsd'+
            '&magstate='+nFlow;

        xhrB.open('POST', '/test/magout', true);
        xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhrB.send(body);

    }

}

function myFunctionCadu(id){
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

function myFunctionCaduInvent(id){

    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }

    var cadbuf = document.getElementById("CadBuf").value;
    var cadsap = document.getElementById("CadSap").value;
    var blockPrint = document.getElementById("C_Invent");
    var toBlockPrint = "<br><table class=\"w3-table-all w3-small\">" +
    "<tr class = \"w3-light-blue\">"+
    "<th>PLU</th>"+
    "<th>ДВ</th>"+
    "<th>СГ</th>"+
    "<th>Номер инв.</th>"+
    "<th>Статус инв.</th>"+
    "<th>ЗСЖ</th>"+
    "<th>Ошибка</th>"+
    "</tr>";

    var rowsPrint="";


    blockPrint.innerHTML=toBlockPrint;

    let xhrCadu = new XMLHttpRequest();
    xhrCadu.onreadystatechange = function() {
        if (xhrCadu.readyState !== 4) return;
        if (xhrCadu.status == 200) {
            var respInfo = xhrCadu.responseText;

            var inventRows = respInfo.split("&");

            if(respInfo!="&"){
                for(var i=0;i<inventRows.length-1;i++){
                    var rowInfo = arrInfo[i].split("|");
                    rowsPrint+="<tr>";
                    rowsPrint+="<td>"+rowInfo[0]+"</td>";
                    rowsPrint+="<td>"+rowInfo[1]+"</td>";
                    rowsPrint+="<td>"+rowInfo[2]+"</td>";
                    rowsPrint+="<td>"+rowInfo[3]+"</td>";
                    rowsPrint+="<td>"+rowInfo[4]+"</td>";
                    rowsPrint+="<td>"+rowInfo[5]+"</td>";
                    rowsPrint+="<td>"+rowInfo[6]+"</td>";

                }
            }


            blockPrint.innerHTML+=rowsPrint+"</table>";

        }
    }


    var body = 'cadbuf='+cadbuf.replaceAll(/\s/g,"")+
        '&cadsap='+cadsap.replaceAll(/\s/g,"")+
        '&cadparam=invent';

    xhrCadu.open('POST', '/test/cadusearch', true);
    xhrCadu.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhrCadu.send(body);



}
// функция для отображения тасков из каду
function caduTaskInfoShow(id){

    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        // отображение тасков только при открытии
        var cadbuf = document.getElementById("CadBuf").value;
        var cadsap = document.getElementById("CadSap").value;
        var blockPrint = document.getElementById("C_Tasks");

        var printTaskInfo = "<br><table class=\"w3-table-all w3-small\">" +
            "<tr class = \"w3-light-blue\">"+
            "<th>C_ID</th>"+
            "<th>C_CREATED</th>"+
            "<th>C_DATE_DONE</th>"+
            "<th>C_PROCESSING</th>"+
            "<th>C_TASK_STATUS</th>"+
            "<th>C_APPLICATION_STATUS</th>"+
            "<th>C_TASK_TYPE</th>"+
            "<th>C_ERROR_DETAILS</th>"+
            "<th>C_TRACE_ID</th>"+
            "<th>C_HOSTNAME</th>"+
            "<th>C_STATUS_MSG</th>"+
            "<th>C_TASK_SDSS</th>"+
            "<th>C_PRIORITY</th>"+
            "<th>C_TASK_DATA</th>"
        "</tr>";

        var rowsPrint="";

       // blockPrint.innerHTML=printTaskInfo;

        //printTaskInfo="";

        let xhrCadu = new XMLHttpRequest();
        xhrCadu.onreadystatechange = function() {
            if (xhrCadu.readyState !== 4) return;
            if (xhrCadu.status == 200) {
                var respInfo = xhrCadu.responseText;

                var tasksRows = respInfo.split("&");

                if(respInfo!="&"){
                    for(var i=0;i<tasksRows.length-1;i++) {
                        var rowInfo = tasksRows[i].split("|");
                        printTaskInfo += "<tr>";
                        for (var l = 0; l < rowInfo.length - 1; l++) {
                            if (rowInfo[l].length > 80) {
                                printTaskInfo += "<td onclick=\"document.getElementById('idT" + l + "').style.display='block'\">" + rowInfo[l].substr(0, 80) +
                                    //"<span style=\"display:none\" id=\"fullvalueTask"+x+"\">" + tasks[x] + "</span>"+
                                    "...</td>";
                                printTaskInfo += "  <div id='idT" + l + "' class=\"w3-modal\" style = \"z-index: 999\">\n" +
                                    "    <div class=\"w3-modal-content\">\n" +
                                    "      <div class=\"w3-container\" style=\"text-align: left\">\n" +
                                    "        <span onclick=\"document.getElementById('idT" + l + "').style.display='none'\" class=\"w3-button w3-display-topright\">&times;</span>\n" +
                                    "        <pre><code>" + rowInfo[l].replaceAll(/,/g,"\n") + "</pre></code>" +
                                    "      </div>\n" +
                                    "    </div>\n" +
                                    "  </div>";
                            } else {
                                printTaskInfo += "<td>" + rowInfo[l].replace('$$', '') + "</td>";
                            }

                        }
                        printTaskInfo += "</tr>";
                    }
                }


                blockPrint.innerHTML=printTaskInfo+"</table>";
                printTaskInfo="";
            }
        }

        var body = 'cadbuf='+cadbuf.replaceAll(/\s/g,"")+
            '&cadsap='+cadsap.replaceAll(/\s/g,"")+
            '&cadparam=tasks';

        xhrCadu.open('POST', '/test/cadusearch', true);
        xhrCadu.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhrCadu.send(body);

    } else {
        x.className = x.className.replace(" w3-show", "");
    }






}

function caduDetInfoShow(id){

    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        // отображение тасков только при открытии
        var cadbuf = document.getElementById("CadBuf").value;
        var cadsap = document.getElementById("CadSap").value;
        var blockPrint = document.getElementById("C_Details");

        var printBufDetails = "<br><table class=\"w3-table-all w3-small\">" +
        "<tr class = \"w3-light-blue\">"+
        "<th>Статус</th>"+
        "<th>PLU</th>"+
        "<th>NAME</th>"+
        "<th>Вет. ед.</th>"+
        "<th>Баз. ед.</th>"+
        "<th>Сертификат</th>"+
        "<th>Статус серт.</th>"+
        "<th>ЗСЖ</th>"+
        "</tr>";

        var rowsPrint="";

        //blockPrint.innerHTML=printBufDetails;

        let xhrCadu = new XMLHttpRequest();
        xhrCadu.onreadystatechange = function() {
            if (xhrCadu.readyState !== 4) return;
            if (xhrCadu.status == 200) {
                var respInfo = xhrCadu.responseText;

                var detRows = respInfo.split("&");

                if(respInfo!="&"){
                    for(var i=0;i<detRows.length-1;i++) {
                        var rowInfo = detRows[i].split("|");
                        //printBufDetails += "<tr>";
                       // for (var l = 0; l < rowInfo.length - 1; l++) {
                           // for(var i=0;i<arrInfoDetails.length-1;i++){
                                //var rowInfo = arrInfoDetails[i].split("|");
                                printBufDetails+="<tr>";
                                printBufDetails+="<td>"+rowInfo[0]+"</td>";
                                printBufDetails+="<td>"+rowInfo[1]+"</td>";
                                printBufDetails+="<td>"+rowInfo[2]+"</td>";
                                printBufDetails+="<td>"+rowInfo[3]+"</td>";
                                printBufDetails+="<td>"+rowInfo[4]+"</td>";
                                printBufDetails+="<td><a href=\"https://mercury.vetrf.ru/pub/operatorui?_action=findVetDocumentFormByUuid&uuid="+rowInfo[5]+"\">"+rowInfo[5]+"</a></td>";
                                printBufDetails+="<td>"+rowInfo[6]+"</td>";
                                printBufDetails+="<td>"+rowInfo[7]+"</td>";
                                printBufDetails+="</tr>";
                           // }

                       // }
                        //printBufDetails += "</tr>";
                    }
                }


                blockPrint.innerHTML=printBufDetails+"</table>";  // исправление для корректного отображения блока детали
                printBufDetails="";

            }
        }

        var body = 'cadbuf='+cadbuf.replaceAll(/\s/g,"")+
            '&cadsap='+cadsap.replaceAll(/\s/g,"")+
            '&cadparam=details';

        xhrCadu.open('POST', '/test/cadusearch', true);
        xhrCadu.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhrCadu.send(body);

    } else {
        x.className = x.className.replace(" w3-show", "");
    }






}

function caduFlowInfoShow(id){

    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        // отображение тасков только при открытии
        var cadbuf = document.getElementById("CadBuf").value;
        var cadsap = document.getElementById("CadSap").value;
        var blockPrint = document.getElementById("C_Flows");

        var printVFlowInfo = "<table class=\"w3-table-all w3-small\">" +
        "<tr class = \"w3-light-blue\">"+
        "<th>Поток</th>"+
        "<th>File Number</th>"+
        "<th>Дата</th>"+
        "</tr>";

        var rowsPrint="";

        //blockPrint.innerHTML=printBufDetails;

        let xhrCadu = new XMLHttpRequest();
        xhrCadu.onreadystatechange = function() {
            if (xhrCadu.readyState !== 4) return;
            if (xhrCadu.status == 200) {
                var respInfo = xhrCadu.responseText;

                var flowRows = respInfo.split("&");

                if(respInfo!="&"){
                    for(var i=0;i<flowRows.length-1;i++) {
                        var rowInfo = flowRows[i].split("|");
                        //printBufDetails += "<tr>";
                        // for (var l = 0; l < rowInfo.length - 1; l++) {
                        // for(var i=0;i<arrInfoDetails.length-1;i++){
                        //var rowInfo = arrInfoDetails[i].split("|");
                        printVFlowInfo+="<tr>";
                        printVFlowInfo+="<td>"+rowInfo[0]+"</td>";
                        printVFlowInfo+="<td>"+rowInfo[1]+"</td>";
                        printVFlowInfo+="<td>"+rowInfo[2]+"</td>";
                        printVFlowInfo+="</tr>";
                        // }

                        // }
                        //printBufDetails += "</tr>";
                    }
                }


                blockPrint.innerHTML=printVFlowInfo+"</table>";
                printVFlowInfo="";

            }
        }

        var body = 'cadbuf='+cadbuf.replaceAll(/\s/g,"")+
            '&cadsap='+cadsap.replaceAll(/\s/g,"")+
            '&cadparam=flows';

        xhrCadu.open('POST', '/test/cadusearch', true);
        xhrCadu.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhrCadu.send(body);

    } else {
        x.className = x.className.replace(" w3-show", "");
    }

}



function myFunctionComp(id) {
    var x = document.getElementById(id);
    var btn_cmp = document.getElementById("btn_cmp");
    x.innerHTML="";
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        var lio = document.getElementById("listInOut");
        var lioMes = lio.options[lio.selectedIndex].value;
        var magbuf = document.getElementById("Magbuff").value;
        var magsap = document.getElementById("MagSAP").value;
        var printHistory="";
        var printModal="";
        var divModal_ID=210;

        x.innerHTML="";
        printHistory += "<table class='w3-table w3-bordered w3-card-4 w3-small' style='margin-top: 5px'>";
        printHistory +=  "<tr class = \"w3-light-blue\">"+
            "<th>Наименование</th>"+
            "<th>PLU</th>"+
            "<th>Алкокод</th>"+
            "<th>Справка Б</th>"+
            "<th>Кол-во</th>"+
            //"<th>Дата розлива</th>"+
            "</tr>";
        let xhrB = new XMLHttpRequest();

        xhrB.onreadystatechange = function() {
            btn_cmp.innerText="Загружаю..."
            if (xhrB.readyState !== 4) return;
            if (xhrB.status == 200) {
                btn_cmp.innerText="Состав ТТН ЕГАИС";
                var egais_cmp = xhrB.responseText;

                var egais_position = egais_cmp.split("&"); // строки целиком
                //var green_no = true;
                for(var i=0;i< egais_position.length-1;i++){

                    var egais_lines = egais_position[i].split("|"); // коробки в позиции

                    //выводим наименования из ттн егаис. Дальше коробки по наименованию и коробки
                    //for(var l=0;l<egais_lines.length;l++){

                        printHistory+= "<tr class=\"w3-hover-green\" onclick=\"BoxAmcTree('rowBox"+i+"')\">";




                        printHistory+="<td>"+egais_lines[0]+"</td>";
                        printHistory+="<td>"+egais_lines[1]+"</td>";
                        printHistory+="<td>"+egais_lines[2]+"</td>";
                        printHistory+="<td>"+egais_lines[3]+"</td>";
                        printHistory+="<td>"+egais_lines[4]+"</td>";
                        printHistory+="</tr>";
                    //}
                    var box_in_pos = egais_lines[5].split("!"); // отделяем коробки от даты разлива
                    var box_amc_in_pos = box_in_pos[1].split("?") // отделяем отдельно коробки:марки

                    for(var b=0;b<box_amc_in_pos.length-1;b++){
                        var amc_in_boxes = box_amc_in_pos[b].split(":"); // отделяем короба от марок.
                        // 0 - короб, 1 марки через запятую
                        //for(var ba=0; ba<amc_in_boxes.length)
                        printHistory+= "<tr id=\"rowBox"+i+"\" class=\"w3-hide\">";
                        printHistory+="<td>";
                        printHistory+="<ul class=\"w3-ul\">";
                        printHistory+="<li>";
                        printHistory+="<button onclick=\"BoxAmcTree('Box"+i+b+"')\" class=\"w3-button w3-light-blue w3-block  w3-left-align\">"+amc_in_boxes[0]+" </button>";
                        printHistory+="<div id=\"Box"+i+b+"\" class=\"w3-hide\">";
                        printHistory+="<ul class=\"w3-ul\">";

                        var amcs_in_box = amc_in_boxes[1].split(","); // печатаем марки

                        for(var aib=0;aib<amcs_in_box.length-1;aib++){
                            printHistory+="<li>"+amcs_in_box[aib]+"</li>";

                        }

                        printHistory+="</ul>"; // список марок
                        printHistory+=" </div>"; // блок коробок
                        printHistory+="</li>"; // коробка из списка коробок
                        printHistory+="</ul>"; // конец списка коробок по позиции
                        printHistory+="</td>"; // ячейка содержимого
                        printHistory+="</tr>"; // строка содержимого


                    }


                }

                //Переименование кнопки, отправка данных на сервер.
                // Далее получаем данные и отображем их для пользователя

                printHistory+="</table>";
                console.log(printHistory);
                x.innerHTML+=printHistory;
                //x.innerHTML+=printModal;

            }
        }
        var body = 'magbuf='+magbuf.replaceAll(/\s/g,"")+
            '&magsap='+magsap.replaceAll(/\s/g,"")+
            '&magio='+lioMes+
            '&magflow=cmp'+
            '&magstate=nope';

        xhrB.open('POST', '/test/magout', true);
        xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhrB.send(body);

    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

function myFunctionBufComp(id) {
    var x = document.getElementById(id);
    var btn_cmp = document.getElementById("btn_buf_cmp");
    x.innerHTML="";
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        var lio = document.getElementById("listInOut");
        var lioMes = lio.options[lio.selectedIndex].value;
        var magbuf = document.getElementById("Magbuff").value;
        var magsap = document.getElementById("MagSAP").value;
        var printHistory="";
        var printModal="";
        var divModal_ID=210;

        x.innerHTML="";
        printHistory += "<table class='w3-table w3-bordered w3-card-4 w3-small' style='margin-top: 5px'>";
        printHistory +=  "<tr class = \"w3-light-blue\">"+
            "<th>Наименование</th>"+
            "<th>PLU</th>"+
            "<th>Кол-во</th>"+
            //"<th>Дата розлива</th>"+
            "</tr>";
        let xhrB = new XMLHttpRequest();

        xhrB.onreadystatechange = function() {
            btn_cmp.innerText="Загружаю..."
            if (xhrB.readyState !== 4) return;
            if (xhrB.status == 200) {
                btn_cmp.innerText="Состав Буфера";
                var egais_cmp = xhrB.responseText;

                var egais_position = egais_cmp.split("&"); // строки целиком
                //var green_no = true;
                for(var i=0; i < egais_position.length-1; i++){
                    var buf_pos = egais_position[i].split("|");
                    printHistory+="<tr>";
                    printHistory+="<td>"+buf_pos[0]+"</td>";
                    printHistory+="<td>"+buf_pos[1]+"</td>";
                    printHistory+="<td>"+buf_pos[2]+"</td>";
                    printHistory+="</tr>";

                }
                //Переименование кнопки, отправка данных на сервер.
                // Далее получаем данные и отображем их для пользователя

                printHistory+="</table>";
                //console.log(printHistory);
                x.innerHTML+=printHistory;
                //x.innerHTML+=printModal;

            }
        }
        var body = 'magbuf='+magbuf.replaceAll(/\s/g,"")+
            '&magsap='+magsap.replaceAll(/\s/g,"")+
            '&magio='+lioMes+
            '&magflow=cmp_buf'+
            '&magstate=nope';

        xhrB.open('POST', '/test/magout', true);
        xhrB.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhrB.send(body);

    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}



function BoxAmcTree(id) {
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
            document.getElementById('send31').disabled=false;
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
            document.getElementById('send31').disabled=false;
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

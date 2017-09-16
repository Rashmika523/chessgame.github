
//=============Function for Draggable========
var my;
// $( function() {
//     my=$( ".newSize" ).draggable({containment:"#bID"});
//
//
// } );

//===============Function For Taggle class=========================================

$(".imgSize").mouseover(function () {
    $(this).parent().addClass("selected-div");
}).mouseout(function () {
    $(this).parent().removeClass("selected-div");
});

// $( "p" ).click(function() {
//     $( this ).toggleClass( "highlight" );
// });

//===============Rotate a Chess Board================================================

function bordRotate() {

    $(".myBoard").toggleClass("rotated");
    $(".newSize").toggleClass("rotated");
    //$("img.b").toggleClass("rotated");

}


///////////////////////Drogbble and Draggable///////

// function dragg() {
//     $( function() {
//         $( ".col-xs-1" ).sortable({
//             revert: true
//         });
//         $( ".newSize" ).draggable({
//             connectToSortable: ".imgSize",
//             revert: "invalid"
//         });
//         $( ".col-xs-1" ).disableSelection();
//     } );
// }

//========Load Colum ID ,row ID and Chess ID to Array==============================

var col = ["a", "b", "c", "d", "e", "f", "g", "h"];
var row = ["1", "2", "3", "4", "5", "6", "7", "8"];
var turn="w";

//==================Load Div tog Id to Array in For Loop============================

var DIVIDS = [];
$(document).ready(function () {
    var count = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j <8; j++) {
            var iD = col[i] + row[j];
            DIVIDS[count] = iD;
            count++;
            //console.log(count);
        }
    }
});

//========================Create New Chess Object====================================

var chessObject={
    team :"",
    chessID : "",
    divID :"",
    chessPices:"",
};

chessObject.getTeam=function () {
    return chessObject.team;
}
chessObject.getChessID=function () {
    return chessObject.chessID;
}
chessObject.getDivID=function () {
    return chessObject.divID;
}
chessObject.getChessMan=function () {
    return chessObject.chessPices;
}
chessObject.setTeam=function (team) {
    chessObject.team=team;
}
chessObject.setPicess=function (pices) {
    chessObject.chessPices=pices;
}
chessObject.setDiv=function (div) {
    chessObject.divID=div;
}


//========================pass values for ChessObject==================================

$("div > div >div >div >div> div").click(function () {
    var chessMan=$(this).attr("Id");
    var chessDiv=$(this).parent().attr("id");
    var team=findTeam(chessMan);
    var chessPice=findChessMan(chessMan);

    // console.log(chessMan);
    // console.log(chessDiv);
    // console.log(team);

    // chessObject.setTeam(team);
    // chessObject.setPicess(chessPice);
    // chessObject.setDiv(chessDiv);

    if((checForCrossing().length>0)){

        var clickDivParent=$(this).parent().attr("Id");
        var clickDiv=$(this).attr("Id");

        if ($("#" + clickDivParent).hasClass("cross")) {
            $("#" + clickDivParent).empty();
            var name=$("#" + chessObject.chessID).appendTo("#" + clickDivParent);
            console.log(name);
            removeCross();
            removePath();
            bordRotate();
        }

    }else{
        chessObject.chessID=chessMan;
        chessObject.divID=chessDiv;
        chessObject.team=findTeam(chessMan);
        //console.log("New Click Team :"+team);
        findTurn();
        findName(chessObject.chessID);
    }

});

//========================Function For Dragg to Select position============================

$("div>div>div>div>div").click(function () {

    var selectDiv=$(this).attr("Id");
    //console.log("Select Div :"+selectDiv);
    if($("#"+selectDiv).hasClass("path")){
        $("#" + chessObject.chessID).appendTo("#" + selectDiv);
        removePath();
        removeCross();
        findTurn();
        bordRotate();
    }
});

//========================Function For Find The Chess Team============================

function findTeam(id) {
    var teamDetails=id.split("-");
   // console.log(teamDetails);
    switch (teamDetails[0]){
        case "b":
            return "b";
        case "w":
            return"w";
    }
}

//=========================Function for find Turn=====================================

function findTurn(){
    if(turn==="w"){
        turn= "b";
    }else{
        turn= "w";
    }
}

//================Function For Find chess Man===========================================

function findChessMan(id) {
    var teamDetails=id.split("-");
    switch (teamDetails[2]){
        case "r":
            return "r";
        case "n":
            return "n";
        case "b":
            return "b";
        case "king":
            return "king";
        case "q":
            return "q";
        case "p":
            return "p";
    }
}

//=========================Find who on click===============================================
function who_on_click() {

    var team=chessObject.getTeam();
    var pices=chessObject.getChessMan();


    if((team==="w") && (pices==="p")){
        return "wite-pone";
    }else if((team==="w") && (pices==="r")){
        return "wite-rok";
    }else if((team==="w") && (pices==="n")){
        return "wite-night";
    }else if((team==="w") && (pices==="b")){
        return "wite-bishop";
    }else if((team==="w") && (pices==="q")){
        return "wite-queen";
    }else if((team==="w") && (pices==="king")){
        return "wite-king";
    }else if((team==="b") && (pices==="p")){
        return "black-pone";
    }else if((team==="b") && (pices==="r")){
        return "black-rok";
    }else if((team==="b") && (pices==="n")){
        return "black-night";
    }else if((team==="b") && (pices==="b")){
        return "black-bishop";
    }else if((team==="b") && (pices==="q")){
        return "black-queen";
    }else if ((team==="b") && (pices==="king")){
        return "black-king";

    }
}

//==========================Function For find Chess Man=================================

function findName(id) {
    var deils=id.split("-");
    if(turn===chessObject.team){
        //console.log("Turn Team :"+chessObject.team);
        switch (deils[2]){
            case "p":
                findPonePath(chessObject.divID,chessObject.team);
                break;
            case "n":
                findNightPaath(chessObject.divID,chessObject.team);
                break;
            case "r":
                findRukPath(chessObject.divID,chessObject.team);
                break;
            case "king":
                findKingPath(chessObject.divID,chessObject.team);
                break;
            case "b" :
                findBishopPath(chessObject.divID,chessObject.team);
                break;
            case "q" :
                findQueenPath(chessObject.divID,chessObject.team);
                break;

        }
    }
}

//==============================Function for Find To pone Path========================================

function findPonePath(newPoss,team) {

    removeCross();
    removePath();

    //console.log("Current possition :"+currentPos);

        var x = newPoss.substr(0, 1);
        var y = newPoss.substr(1, 1);
        // console.log("X :"+x);
        //console.log("Y :"+y);


        var xIndex = getXIndex(x);
        var yIndex = getYIndex(y);
        // console.log(yIndex);

        var arra;
        var divID = x + y;
        var potion = ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"];

        var two = x + (yIndex - 1);
        //console.log("two :"+two);
        var count = 0;

        if (team === "w") {

                if (y === "7") {
                    // $("#" + x + "5").addClass("path");
                    // $("#" + x + "6").addClass("path");
                    if ($("#" + x + "6").children().length === 0) {
                        $("#" + x + "6").addClass("path");
                        if ($("#" + x + "5").children().length === 0) {
                            $("#" + x + "5").addClass("path");

                        }
                    }

                } else {
                        if ((count < 1) && ($("#" + x + (row[yIndex - 1])).children().length === 0)) {
                            $("#" + x + (row[yIndex - 1])).addClass("path");
                            count++;
                        }
                }
            if ($("#" + col[xIndex + 1] + row[yIndex - 1]).children().length > 0) {
                var id2 = $("#" + col[xIndex + 1] + row[yIndex - 1]).children().attr("Id");
                var cheTeam = findTeam(id2);
                if (cheTeam === "b") {
                    $("#" + col[xIndex + 1] + row[yIndex - 1]).addClass("cross");
                }
            }
            if ($("#" + col[xIndex - 1] + row[yIndex - 1]).children().length > 0) {
                var id2 = $("#" + col[xIndex - 1] + row[yIndex - 1]).children().attr("Id");
                var cheTeam = findTeam(id2);
                if (cheTeam === "b") {
                    $("#" + col[xIndex - 1] + row[yIndex - 1]).addClass("cross");
                }
            }

        }
            //=======================Function For Black Pone===================================
            else {
            //console.log("Elase....!"+y);
            if (y==="2"){
                // console.log("Y....!"+y);
                if ($("#" + x + "3").children().length === 0) {
                    // console.log("x....!"+x);
                    $("#" + x + "3").addClass("path");
                    if ($("#" + x + "4").children().length === 0) {
                        $("#" + x + "4").addClass("path");

                }
            }
        }else{

                    if($("#" + x + (row[yIndex + 1])).children().length === 0){
                        // console.log("Yes it's Ok...!");
                        $("#" + x + (row[yIndex + 1])).addClass("path");
                    }
            }
            if($("#" + col[xIndex + 1] + row[yIndex + 1]).children().length > 0){
                var id=$("#" + col[xIndex + 1] + row[yIndex + 1]).children().attr("Id");
                var temaID=findTeam(id);
                if(temaID === "w"){
                    // console.log("Team ID :"+temaID);
                    $("#" + col[xIndex + 1] + row[yIndex + 1]).addClass("cross");
                }
            }
            if($("#" + col[xIndex - 1] + row[yIndex + 1]).children().length > 0){
                var id=$("#" + col[xIndex - 1] + row[yIndex + 1]).children().attr("Id");
                var tm=findTeam(id);
                if(tm==="w"){
                    $("#" + col[xIndex - 1] + row[yIndex + 1]).addClass("cross");
                }
            }
        }


}

//========================Function For Find to Night Path=====================================

function findNightPaath(newPoss,team) {
    removePath();
    removeCross();


    var x=newPoss.substr(0,1);
    var y=newPoss.substr(1,1);

    var xIndex=getXIndex(x);
    var yIndex=getYIndex(y);

    if(team==="w"){
       if($("#" + col[xIndex + 1] + row[yIndex - 2]).children().length===0){
           $("#" + col[xIndex + 1] + row[yIndex - 2]).addClass("path");
       }
       if($("#" + col[xIndex + 1] + row[yIndex - 2]).children().length>0){
           var id=$("#" + col[xIndex + 1] + row[yIndex - 2]).children().attr("Id");
           var tm=findTeam(id);
           if(tm==="b"){
               $("#" + col[xIndex + 1] + row[yIndex - 2]).addClass("cross");
           }
       }
       if($("#" + col[xIndex - 1] + row[yIndex - 2]).children().length===0){
           $("#" + col[xIndex - 1] + row[yIndex - 2]).addClass("path");
       }
       if($("#" + col[xIndex - 1] + row[yIndex - 2]).children().length>0){
           var id=$("#" + col[xIndex - 1] + row[yIndex - 2]).children().attr("Id");
           var tm=findTeam(id);
           if(tm==="b"){
               $("#" + col[xIndex - 1] + row[yIndex - 2]).addClass("cross");
           }
       }
       if($("#" + col[xIndex + 2] + row[yIndex - 1]).children().length===0){
           $("#" + col[xIndex + 2] + row[yIndex - 1]).addClass("path");
       }
       if($("#" + col[xIndex - 2] + row[yIndex - 1]).children().length===0){
           $("#" + col[xIndex - 2] + row[yIndex - 1]).addClass("path");
       }
       if($("#" + col[xIndex + 2] + row[yIndex - 1]).children().length>0){
           var id=$("#" + col[xIndex + 2] + row[yIndex - 1]).children().attr("Id");
           var tm=findTeam(id);
           if(tm==="b"){
               $("#" + col[xIndex + 2] + row[yIndex - 1]).addClass("cross");
           }
       }
       if($("#" + col[xIndex + 2] + row[yIndex + 1]).children().length===0){
           $("#" + col[xIndex + 2] + row[yIndex + 1]).addClass("path");
       }
       if($("#" + col[xIndex + 2] + row[yIndex + 2]).children().length>0){
           var id=$("#" + col[xIndex + 2] + row[yIndex + 2]).children().attr("Id");
           var tm=findTeam(id);
           if(tm==="b"){
               $("#" + col[xIndex + 2] + row[yIndex + 2]).addClass("cross");
           }
       }
       if($("#" + col[xIndex -1] + row[yIndex + 2]).children().length===0){
           $("#" + col[xIndex -1] + row[yIndex + 2]).addClass("path");
       }
       if($("#" + col[xIndex -1] + row[yIndex + 2]).children().length>0){
           var id=$("#" + col[xIndex -1] + row[yIndex + 2]).children().attr("id");
           var tm=findTeam(id);
           if(tm==="b"){
               $("#" + col[xIndex -1] + row[yIndex + 2]).addClass("cross");
           }
       }
       if($("#" + col[xIndex +1] + row[yIndex + 2]).children().length===0){
           $("#" + col[xIndex +1] + row[yIndex + 2]).addClass("path");
       }
       if($("#" + col[xIndex +1] + row[yIndex + 2]).children().length>0){
           var id=$("#" + col[xIndex +1] + row[yIndex + 2]).children().attr("Id");
           var tm=findTeam(id);
           if(tm==="b"){
               $("#" + col[xIndex +1] + row[yIndex + 2]).addClass("cross");
           }
       }
       if($("#" + col[xIndex -2] + row[yIndex +1]).children().length===0){
           $("#" + col[xIndex -2] + row[yIndex + 1]).addClass("path");
       }
       if($("#" + col[xIndex -2] + row[yIndex +1]).children().length>0){
           var id=$("#" + col[xIndex -2] + row[yIndex +1]).children().attr("id");
           var tm=findTeam(id);
           if(tm==="b"){
               $("#" + col[xIndex -2] + row[yIndex +1]).addClass("cross");
           }
       }
       if($("#" + col[xIndex -2] + row[yIndex -1]).children().length===0){
           $("#" + col[xIndex -2] + row[yIndex -1]).addClass("path");
       }
       if($("#" + col[xIndex -2] + row[yIndex -1]).children().length>0){
           var id=$("#" + col[xIndex -2] + row[yIndex -1]).children().attr("Id");
           var tm=findTeam(id);
           if(tm==="b"){
               $("#" + col[xIndex -2] + row[yIndex -1]).addClass("cross");
           }
       }

    }
    //====================Path For Black Nigth============================================
    else{
        if($("#" + col[xIndex + 1] + row[yIndex - 2]).children().length===0){
            $("#" + col[xIndex + 1] + row[yIndex - 2]).addClass("path");
        }
        if($("#" + col[xIndex + 1] + row[yIndex - 2]).children().length>0){
            var id=$("#" + col[xIndex + 1] + row[yIndex - 2]).children().attr("Id");
            var tm=findTeam(id);
            if(tm==="w"){
                $("#" + col[xIndex + 1] + row[yIndex - 2]).addClass("cross");
            }
        }
        if($("#" + col[xIndex - 1] + row[yIndex - 2]).children().length===0){
            $("#" + col[xIndex - 1] + row[yIndex - 2]).addClass("path");
        }
        if($("#" + col[xIndex - 1] + row[yIndex - 2]).children().length>0){
            var id=$("#" + col[xIndex - 1] + row[yIndex - 2]).children().attr("Id");
            var tm=findTeam(id);
            if(tm==="w"){
                $("#" + col[xIndex - 1] + row[yIndex - 2]).addClass("cross");
            }
        }
        if($("#" + col[xIndex + 2] + row[yIndex - 1]).children().length===0){
            $("#" + col[xIndex + 2] + row[yIndex - 1]).addClass("path");
        }
        if($("#" + col[xIndex - 2] + row[yIndex - 1]).children().length===0){
            $("#" + col[xIndex - 2] + row[yIndex - 1]).addClass("path");
        }
        if($("#" + col[xIndex + 2] + row[yIndex - 1]).children().length>0){
            var id=$("#" + col[xIndex + 2] + row[yIndex - 1]).children().attr("Id");
            var tm=findTeam(id);
            if(tm==="w"){
                $("#" + col[xIndex + 2] + row[yIndex - 1]).addClass("cross");
            }
        }
        if($("#" + col[xIndex + 2] + row[yIndex + 1]).children().length===0){
            $("#" + col[xIndex + 2] + row[yIndex + 1]).addClass("path");
        }
        if($("#" + col[xIndex + 2] + row[yIndex + 1]).children().length>0){
            var id=$("#" + col[xIndex + 2] + row[yIndex +1]).children().attr("Id");
            var tm=findTeam(id);
            if(tm==="w"){
                $("#" + col[xIndex + 2] + row[yIndex + 1]).addClass("cross");
            }
        }
        if($("#" + col[xIndex -1] + row[yIndex + 2]).children().length===0){
            $("#" + col[xIndex -1] + row[yIndex + 2]).addClass("path");
        }
        if($("#" + col[xIndex -1] + row[yIndex + 2]).children().length>0){
            var id=$("#" + col[xIndex -1] + row[yIndex + 2]).children().attr("id");
            var tm=findTeam(id);
            if(tm==="w"){
                $("#" + col[xIndex -1] + row[yIndex + 2]).addClass("cross");
            }
        }
        if($("#" + col[xIndex +1] + row[yIndex + 2]).children().length===0){
            $("#" + col[xIndex +1] + row[yIndex + 2]).addClass("path");
        }
        if($("#" + col[xIndex +1] + row[yIndex + 2]).children().length>0){
            var id=$("#" + col[xIndex +1] + row[yIndex + 2]).children().attr("Id");
            var tm=findTeam(id);
            if(tm==="w"){
                $("#" + col[xIndex +1] + row[yIndex + 2]).addClass("cross");
            }
        }
        if($("#" + col[xIndex -2] + row[yIndex +1]).children().length===0){
            $("#" + col[xIndex -2] + row[yIndex + 1]).addClass("path");
        }
        if($("#" + col[xIndex -2] + row[yIndex +1]).children().length>0){
            var id=$("#" + col[xIndex -2] + row[yIndex +1]).children().attr("id");
            var tm=findTeam(id);
            if(tm==="w"){
                $("#" + col[xIndex -2] + row[yIndex +1]).addClass("cross");
            }
        }
        if($("#" + col[xIndex -2] + row[yIndex -1]).children().length===0){
            $("#" + col[xIndex -2] + row[yIndex -1]).addClass("path");
        }
        if($("#" + col[xIndex -2] + row[yIndex -1]).children().length>0){
            var id=$("#" + col[xIndex -2] + row[yIndex -1]).children().attr("Id");
            var tm=findTeam(id);
            if(tm==="w"){
                $("#" + col[xIndex -2] + row[yIndex -1]).addClass("cross");
            }
        }
    }
}

//========================Function For Find Ruk Path==========================================

function findRukPath(newPoss,team) {

    // removeCross();
    // removePath();

    var x=newPoss.substr(0,1);
    var y=newPoss.substr(1,1);

    var xIndex=getXIndex(x);
    var yIndex=getYIndex(y);


        if(team==="w"){
    //========================For Loop For check Left side===================================
            for(var i=(xIndex+1);i<row.length;i++){
                // console.log(col[i]+row[yIndex]);
                if($("#"+col[i]+row[yIndex]).children().length===0){
                    $("#"+col[i]+row[yIndex]).addClass("path");
                }else{
                    var id=$("#"+col[i]+row[yIndex]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="b"){
                        $("#"+col[i]+row[yIndex]).addClass("cross");
                        break;
                    }else{
                         break;
                    }
                }
            }
    //=========================For Loop For chek Right Side===================================
            for(var i = xIndex - 1; i > -1; i--){
                if($("#"+col[i]+row[yIndex]).children().length===0){
                    $("#"+col[i]+row[yIndex]).addClass("path");
                }else{
                    var id=$("#"+col[i]+row[yIndex]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="b"){
                        $("#"+col[i]+row[yIndex]).addClass("cross");
                        break;
                    }else{
                         break;
                    }
                }
            }
    //=========================For Loop for check Up side======================================
            for (var i = yIndex - 1; i > -1; i--){
                if($("#"+col[xIndex]+row[i]).children().length===0){
                    $("#"+col[xIndex]+row[i]).addClass("path");
                }else{
                    var id=$("#"+col[xIndex]+row[i]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="b"){
                        $("#"+col[xIndex]+row[i]).addClass("cross");
                        break;
                    }else{
                        break;
                    }
                }
            }
    //============================For Loop for Down Side=======================================
            for(var i=yIndex+1;i<col.length;i++){
                if($("#"+col[xIndex]+row[i]).children().length===0){
                    $("#"+col[xIndex]+row[i]).addClass("path");
                }else{
                    var id=$("#"+col[xIndex]+row[i]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="b"){
                        $("#"+col[xIndex]+row[i]).addClass("cross");
                        break;
                    }else {
                        break;
                    }
                }
            }
        }
    //=========================Function For Black Ruk=========================================================
        else{

            //========================For Loop For check Right side===================================
            for(var i=(xIndex+1);i<row.length;i++){
                // console.log(col[i]+row[yIndex]);
                if($("#"+col[i]+row[yIndex]).children().length===0){
                    $("#"+col[i]+row[yIndex]).addClass("path");
                }else{
                    var id=$("#"+col[i]+row[yIndex]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="w"){
                        $("#"+col[i]+row[yIndex]).addClass("cross");
                        break;
                    }else{
                        break;
                    }
                }
            }
            //=========================For Loop For chek Left Side===================================
            for(var i = xIndex - 1; i > -1; i--){
                if($("#"+col[i]+row[yIndex]).children().length===0){
                    $("#"+col[i]+row[yIndex]).addClass("path");
                }else{
                    var id=$("#"+col[i]+row[yIndex]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="w"){
                        $("#"+col[i]+row[yIndex]).addClass("cross");
                        break;
                    }else{
                        break;
                    }
                }
            }
            //=========================For Loop for check Down side======================================
            for (var i = yIndex - 1; i > -1; i--){
                if($("#"+col[xIndex]+row[i]).children().length===0){
                    $("#"+col[xIndex]+row[i]).addClass("path");
                }else{
                    var id=$("#"+col[xIndex]+row[i]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="w"){
                        $("#"+col[xIndex]+row[i]).addClass("cross");
                        break;
                    }else{
                        break;
                    }
                }
            }
            //============================For Loop for up Side=======================================
            for(var i=yIndex+1;i<col.length;i++){
                if($("#"+col[xIndex]+row[i]).children().length===0){
                    $("#"+col[xIndex]+row[i]).addClass("path");
                }else{
                    var id=$("#"+col[xIndex]+row[i]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="w"){
                        $("#"+col[xIndex]+row[i]).addClass("cross");
                        break;
                    }else {
                        break;
                    }
                }
            }
        }

}

//=======================Function For Find King Path==========================================

function findKingPath(newPoss,team) {

    removeCross();
    removePath();

    var x=newPoss.substr(0,1);
    var y=newPoss.substr(1,1);

    var xIndex=getXIndex(x);
    var yIndex=getYIndex(y);


        if(team==="w"){
            //========================For Loop For check Left side===================================
            for(var i=(xIndex+1);i<row.length;i++){
                // console.log(col[i]+row[yIndex]);
                if($("#"+col[i]+row[yIndex]).children().length===0){
                    $("#"+col[i]+row[yIndex]).addClass("path");
                    break;
                }
                if($("#"+col[i]+row[yIndex]).children().length>0){
                    var id=$("#"+col[i]+row[yIndex]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="b"){
                        $("#"+col[i]+row[yIndex]).addClass("cross");
                        break;
                    }else{
                        break;
                    }
                }
            }
            //=========================For Loop For chek Right Side===================================
            for(var i = xIndex - 1; i > -1; i--){
                if($("#"+col[i]+row[yIndex]).children().length===0){
                    $("#"+col[i]+row[yIndex]).addClass("path");
                    break;
                }
                if($("#"+col[i]+row[yIndex]).children().length>0){
                    var id=$("#"+col[i]+row[yIndex]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="b"){
                        $("#"+col[i]+row[yIndex]).addClass("cross");
                        break;
                    }else{
                        break;
                    }
                }
            }
            //=========================For Loop for check Up side======================================
            for (var i = yIndex - 1; i > -1; i--){
                if($("#"+col[xIndex]+row[i]).children().length===0){
                    $("#"+col[xIndex]+row[i]).addClass("path");
                    break;
                }
                if($("#"+col[xIndex]+row[i]).children().length>0){
                    var id=$("#"+col[xIndex]+row[i]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="b"){
                        $("#"+col[xIndex]+row[i]).addClass("cross");
                        break;
                    }else{
                        break;
                    }
                }
            }
            //============================For Loop for Down Side=======================================
            for(var i=yIndex+1;i<col.length;i++){
                if($("#"+col[xIndex]+row[i]).children().length===0){
                    $("#"+col[xIndex]+row[i]).addClass("path");
                    break;
                }
                if($("#"+col[xIndex]+row[i]).children().length>0){
                    var id=$("#"+col[xIndex]+row[i]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="b"){
                        $("#"+col[xIndex]+row[i]).addClass("cross");
                        break;
                    }else {
                        break;
                    }
                }
            }
          //=========================For Loop For Down Right side cross===============================
            for(var i = xIndex - 1; i > -1; i--){
                if($("#"+col[i]+row[yIndex+1]).children().length===0){
                    $("#"+col[i]+row[yIndex+1]).addClass("path");
                    break;
                }
                else{
                    var id=$("#"+col[i]+row[yIndex+1]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="b"){
                        $("#"+col[i]+row[yIndex+1]).addClass("cross");
                        break;
                    }else{
                        break;
                    }
                }
            }
         //======================For Loop For Up Right Side cross==================================
            for(var i = xIndex - 1; i > -1; i--){
                if($("#"+col[i]+row[yIndex-1]).children().length===0){
                    $("#"+col[i]+row[yIndex-1]).addClass("path");
                    break;
                }
                else{
                    var id=$("#"+col[i]+row[yIndex-1]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="b"){
                        $("#"+col[i]+row[yIndex-1]).addClass("cross");
                        break;
                    }else{
                        break;
                    }
                }
            }
        //=====================For Loop for Down Left side cross=================================
            for(var i = xIndex + 1; i < row.length; i++){
                if($("#"+col[i]+row[yIndex+1]).children().length===0){
                    $("#"+col[i]+row[yIndex+1]).addClass("path");
                    break;
                }
                else{
                    var id=$("#"+col[i]+row[yIndex+1]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="b"){
                        $("#"+col[i]+row[yIndex+1]).addClass("cross");
                        break;
                    }else {
                        break;
                    }
                }
            }
        //===================For Loop For Up Rigth side========================================
            for(var i = xIndex + 1; i < row.length; i++){
                if($("#"+col[i]+row[yIndex-1]).children().length===0){
                    $("#"+col[i]+row[yIndex-1]).addClass("path");
                    break;
                }
                else{
                    var id=$("#"+col[i]+row[yIndex-1]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="b"){
                        $("#"+col[i]+row[yIndex-1]).addClass("cross");
                        break;
                    }else {
                        break;
                    }
                }
            }
        }
    //================function For Black King===============================================
        else {
            //========================For Loop For check Left side===================================
            for(var i=(xIndex+1);i<row.length;i++){
                // console.log(col[i]+row[yIndex]);
                if($("#"+col[i]+row[yIndex]).children().length===0){
                    $("#"+col[i]+row[yIndex]).addClass("path");
                    break;
                }
                if($("#"+col[i]+row[yIndex]).children().length>0){
                    var id=$("#"+col[i]+row[yIndex]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="w"){
                        $("#"+col[i]+row[yIndex]).addClass("cross");
                        break;
                    }else{
                        break;
                    }
                }
            }
            //=========================For Loop For chek Right Side===================================
            for(var i = xIndex - 1; i > -1; i--){
                if($("#"+col[i]+row[yIndex]).children().length===0){
                    $("#"+col[i]+row[yIndex]).addClass("path");
                    break;
                }
                if($("#"+col[i]+row[yIndex]).children().length>0){
                    var id=$("#"+col[i]+row[yIndex]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="w"){
                        $("#"+col[i]+row[yIndex]).addClass("cross");
                        break;
                    }else{
                        break;
                    }
                }
            }
            //=========================For Loop for check Up side======================================
            for (var i = yIndex - 1; i > -1; i--){
                if($("#"+col[xIndex]+row[i]).children().length===0){
                    $("#"+col[xIndex]+row[i]).addClass("path");
                    break;
                }
                if($("#"+col[xIndex]+row[i]).children().length>0){
                    var id=$("#"+col[xIndex]+row[i]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="w"){
                        $("#"+col[xIndex]+row[i]).addClass("cross");
                        break;
                    }else{
                        break;
                    }
                }
            }
            //============================For Loop for Down Side=======================================
            for(var i=yIndex+1;i<col.length;i++){
                if($("#"+col[xIndex]+row[i]).children().length===0){
                    $("#"+col[xIndex]+row[i]).addClass("path");
                    break;
                }
                if($("#"+col[xIndex]+row[i]).children().length>0){
                    var id=$("#"+col[xIndex]+row[i]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="w"){
                        $("#"+col[xIndex]+row[i]).addClass("cross");
                        break;
                    }else {
                        break;
                    }
                }
            }
            //=========================For Loop For Down Right side cross===============================
            for(var i = xIndex - 1; i > -1; i--){
                if($("#"+col[i]+row[yIndex+1]).children().length===0){
                    $("#"+col[i]+row[yIndex+1]).addClass("path");
                    break;
                }
                else{
                    var id=$("#"+col[i]+row[yIndex+1]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="w"){
                        $("#"+col[i]+row[yIndex+1]).addClass("cross");
                        break;
                    }else{
                        break;
                    }
                }
            }
            //======================For Loop For Up Right Side cross==================================
            for(var i = xIndex - 1; i > -1; i--){
                if($("#"+col[i]+row[yIndex-1]).children().length===0){
                    $("#"+col[i]+row[yIndex-1]).addClass("path");
                    break;
                }
                else{
                    var id=$("#"+col[i]+row[yIndex-1]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="w"){
                        $("#"+col[i]+row[yIndex-1]).addClass("cross");
                        break;
                    }else{
                        break;
                    }
                }
            }
            //=====================For Loop for Down Left side cross=================================
            for(var i = xIndex + 1; i < row.length; i++){
                if($("#"+col[i]+row[yIndex+1]).children().length===0){
                    $("#"+col[i]+row[yIndex+1]).addClass("path");
                    break;
                }
                else{
                    var id=$("#"+col[i]+row[yIndex+1]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="w"){
                        $("#"+col[i]+row[yIndex+1]).addClass("cross");
                        break;
                    }else {
                        break;
                    }
                }
            }
            //===================For Loop For Up Rigth side========================================
            for(var i = xIndex + 1; i < row.length; i++){
                if($("#"+col[i]+row[yIndex-1]).children().length===0){
                    $("#"+col[i]+row[yIndex-1]).addClass("path");
                    break;
                }
                else{
                    var id=$("#"+col[i]+row[yIndex-1]).children().attr("Id");
                    var tm=findTeam(id);
                    if(tm==="w"){
                        $("#"+col[i]+row[yIndex-1]).addClass("cross");
                        break;
                    }else {
                        break;
                    }
                }
            }
        }
}

//=======================Function for Find Bishop Path========================================

function findBishopPath(newPoss,team) {

    // removePath();
    // removeCross();

    var x=newPoss.substr(0,1);
    var y=newPoss.substr(1,1);

    var xIndex=getXIndex(x);
    var yIndex=getYIndex(y);

        if(team==="w"){
            var count=1;
        //===========================For Loop For left upper side cross==================================
                for(var i = xIndex + 1; i < row.length; i++){

                        if($("#"+col[i]+row[yIndex-count]).children().length===0){
                            $("#"+col[i]+row[yIndex-count]).addClass("path");
                        }else{
                            if($("#"+col[i]+row[yIndex-count]).children().length>0){
                                var id=$("#"+col[i]+row[yIndex-count]).children().attr("Id");
                                var tm=findTeam(id);
                                if(tm==="b"){
                                    $("#"+col[i]+row[yIndex-count]).addClass("cross");
                                    break;
                                }else{
                                    break;
                                }
                            }
                        }
                        count++;
                }
        //=======================ForLoop for left Down side cross========================================
            var count=1;
            for(var i = xIndex + 1; i < row.length; i++){
                if($("#"+col[i]+row[yIndex+count]).children().length===0){
                    $("#"+col[i]+row[yIndex+count]).addClass("path");
                }else{
                    if($("#"+col[i+1]+row[yIndex+count]).children().length>0){
                        var id=$("#"+col[i+1]+row[yIndex+count]).children().attr("Id");
                        var tm=findTeam(id);
                        if(tm==="b"){
                            $("#"+col[i+1]+row[yIndex+count]).addClass("cross");
                            break;
                        }else{
                            break;
                        }
                    }
                }
                count++;
            }
        // =====================For Loop for Right Downside cross=========================================
            var count=1;
            for(var i = xIndex - 1; i > -1; i--){
                if($("#"+col[i]+row[yIndex+count]).children().length===0){
                    $("#"+col[i]+row[yIndex+count]).addClass("path");
                }else{
                    if($("#"+col[i]+row[yIndex+count]).children().length>0){
                        var id=$("#"+col[i]+row[yIndex+count]).children().attr("Id");
                        var tm=findTeam(id);
                        if(tm==="b"){
                            $("#"+col[i]+row[yIndex+count]).addClass("cross");
                            break;
                        }else{
                            break;
                        }
                    }
                }
                count++;
            }
         //===================ForLoop For Right upper side Cross===========================================
            var count=1;
            for(var i = xIndex - 1; i > -1; i--){
                if($("#"+col[i]+row[yIndex-count]).children().length===0){
                    $("#"+col[i]+row[yIndex-count]).addClass("path");
                }else{
                    if($("#"+col[i]+row[yIndex-count]).children().length>0){
                        var id=$("#"+col[i]+row[yIndex-count]).children().attr("Id");
                        var tm=findTeam(id);
                        if(tm==="b"){
                            $("#"+col[i]+row[yIndex-count]).addClass("cross");
                            break;
                        }else{
                            break;
                        }
                    }
                }
                count++;
            }
         //=======================function for Balck Bishop=================================================
        }else{

            var count=1;
            //===========================For Loop For left upper side cross==================================
            for(var i = xIndex + 1; i < row.length; i++){

                if($("#"+col[i]+row[yIndex-count]).children().length===0){
                    $("#"+col[i]+row[yIndex-count]).addClass("path");
                }else{
                    if($("#"+col[i]+row[yIndex-count]).children().length>0){
                        var id=$("#"+col[i]+row[yIndex-count]).children().attr("Id");
                        var tm=findTeam(id);
                        if(tm==="w"){
                            $("#"+col[i]+row[yIndex-count]).addClass("cross");
                            break;
                        }else{
                            break;
                        }
                    }
                }
                count++;
            }
            //=======================ForLoop for left Down side cross========================================
            var count=1;
            for(var i = xIndex + 1; i < row.length; i++){
                if($("#"+col[i]+row[yIndex+count]).children().length===0){
                    $("#"+col[i]+row[yIndex+count]).addClass("path");
                }else{
                    if($("#"+col[i+1]+row[yIndex+count]).children().length>0){
                        var id=$("#"+col[i+1]+row[yIndex+count]).children().attr("Id");
                        var tm=findTeam(id);
                        if(tm==="w"){
                            $("#"+col[i+1]+row[yIndex+count]).addClass("cross");
                            break;
                        }else{
                            break;
                        }
                    }
                }
                count++;
            }
            // =====================For Loop for Right Downside cross=========================================
            var count=1;
            for(var i = xIndex - 1; i > -1; i--){
                if($("#"+col[i]+row[yIndex+count]).children().length===0){
                    $("#"+col[i]+row[yIndex+count]).addClass("path");
                }else{
                    if($("#"+col[i]+row[yIndex+count]).children().length>0){
                        var id=$("#"+col[i]+row[yIndex+count]).children().attr("Id");
                        var tm=findTeam(id);
                        if(tm==="w"){
                            $("#"+col[i]+row[yIndex+count]).addClass("cross");
                            break;
                        }else{
                            break;
                        }
                    }
                }
                count++;
            }
            //===================ForLoop For Right upper side Cross===========================================
            var count=1;
            for(var i = xIndex - 1; i > -1; i--){
                if($("#"+col[i]+row[yIndex-count]).children().length===0){
                    $("#"+col[i]+row[yIndex-count]).addClass("path");
                }else{
                    if($("#"+col[i]+row[yIndex-count]).children().length>0){
                        var id=$("#"+col[i]+row[yIndex-count]).children().attr("Id");
                        var tm=findTeam(id);
                        if(tm==="w"){
                            $("#"+col[i]+row[yIndex-count]).addClass("cross");
                            break;
                        }else{
                            break;
                        }
                    }
                }
                count++;
            }

        }
}


//=======================Function For Find Queen Path=========================================

function findQueenPath(newPoss,team) {

    findBishopPath(newPoss,team);
    findRukPath(newPoss,team);

}

//=======================function for getXIndex================================================

function getXIndex(x) {
        for(var i=0;i<8;i++){
            if(x===col[i]){
                return i;
            }
        }
}

//=======================Function for getYIndex===============================================

function getYIndex(y) {
    for(var i=0;i<8;i++){
        if(y===row[i]){
            return i;
        }
    }
}

///////////////////////////////////////////////////////////

// $ (init);
// function init() {
//     $(".p").draggable({
//         start: handleDragStart,
//         cursor: 'move',
//         revert: "invalid",
//     });
//     $(".col-xs-1").droppable({
//         drop: handleDropEvent,
//         tolerance: "touch",
//     });
// }
//
// function handleDragStart (event, ui) {}
// function handleDropEvent (event, ui) {
//     //$(this).droppable('disable');
//     //ui.draggable.position({of: $(this), my: 'left top', at: 'left top'});
//     // ui.draggable.position({of: $(this), my: 'left center', at: 'left center'});
//     // ui.draggable.draggable('option', 'revert', "invalid");
// }

//======================Function For check Crossing=================================================

function checForCrossing() {
    var any=new Array();
    for(var i=0;i<64;i++){
        if($("#"+DIVIDS[i]).hasClass("cross")){
            any.push(DIVIDS[i]);
        }
    }
    return any;
}

//===========================Function For Remove Path=============================================

function removePath() {
    for(var i=0;i<64;i++){
        $("#"+DIVIDS[i]).removeClass("path");
    }
}

//==========================Function For Remove Cross================================================

function removeCross() {
    for(var i=0;i<64;i++){
        $("#"+DIVIDS[i]).removeClass("cross");
    }
}


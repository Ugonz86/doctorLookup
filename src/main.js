import $ from 'jquery';
import {practiceLookup} from './doctorLookup.js';
import {illnessLookup} from './doctorLookup.js';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';


$(document).ready(function() {
  $("#practice").hide();
  $("#results").hide();
  $("#results2").hide();
  $("#searchBy").hide();
  $("#medIssue").hide();
  });

$("#start").click(function() {
  $("#findDoctor").hide();
  $("#searchBy").show();
});

$("#searchByPrac").click(function() {
  $("#searchBy").hide();
  $("#practice").show();
});

$("#searchByIssue").click(function() {
  $("#searchBy").hide();
  $("#medIssue").show();
});

$("#familyPhysician").click(function() {
  $("#practice").hide("ease");
  search("family physician");
});

$("#ophthalmologist").click(function() {
  $("#practice").hide("ease");
  $("#results").show("ease");
  search("ophthalmology");
});

$("#dermatologist").click(function(){
  $("#practice").hide("ease");
  $("#results").show("ease");
  search("dermatologist");
});

$("#internist").click(function(){
  $("#practice").hide("ease");
  $("#results").show("ease");
  search("internal medicine");
});

$("#pediatric").click(function(){
  $("#practice").hide("ease");
  $("#results").show("ease");
  search("pediatric");
});

$("#gynecologist").click(function(){
  $("#practice").hide("ease");
  $("#results").show("ease");
  search("gynecologist");
});

$("#surgeon").click(function(){
  $("#practice").hide("ease");
  $("#results").show("ease");
  search("surgeon");
});

$("#neurologist").click(function(){
  $("#practice").hide("ease");
  $("#results").show("ease");
  search("neurology");
});

$("#searchMedIssue").click(function() {
  $("#medIssue").hide("ease");
  $("#results2").show("ease");
  var input = $("#query").val();
  medSearch(input);
});

$("#backToOptions1").click(function() {
$("#medIssue").hide("ease");
$("#searchBy").show("ease");
});

$("#backToOptions2").click(function() {
$("#practice").hide("ease");
$("#searchBy").show("ease");
});

$("#backToOptions3").click(function() {
$("#results").hide("ease");
$("#searchBy").show("ease");
});
$("#backToOptions4").click(function() {
$("#results2").hide("ease");
$("#searchBy").show("ease");
});

$("#goBack").click(function() {
$("#results").hide("ease");
$("#practice").show("ease");
});

$("#goBack2").click(function() {
$("#results2").hide("ease");
$("#medIssue").show("ease");
});

function search(selectedPractice) {
  let practiceName = selectedPractice;
  $("#pResults").empty();
  practiceLookup(practiceName)
    .then(function(response){
      const practiceInfo = JSON.parse(response);
      if (practiceInfo.data.length === 0){
        $("#pResults").append("<p>No results</p>");
      }
      else{
        for (let i = 0; i < practiceInfo.data.length; i++){
          console.log(practiceInfo.data[i].name);
          var firstName = practiceInfo.data[i].doctors[0].profile.first_name;
          var lastName = practiceInfo.data[i].doctors[0].profile.last_name;
          var clinicName = practiceInfo.data[i].name;
          var address = practiceInfo.data[i].visit_address.street + practiceInfo.data[i].visit_address.street2 + " " + practiceInfo.data[i].visit_address.zip;
          var website = practiceInfo.data[i].doctors[0].website;
          if (website === undefined){
            website = "No Website";
          }
          $("#pResults").append('<p class="item"><b>'+firstName+ ' ' +lastName+'</b></p><p class="item">'+clinicName+'</p><p class="item">'+address+'</p><p class="item">'+website+'</p><br>');
          $(".item").show("slide");
        }
      }
    })

  $("#results").show("slide");
}

function medSearch(searchInput){
let queryName = searchInput;
$("#iResults").empty();
illnessLookup(queryName)
    .then(function(response){
      const medIssueResults = JSON.parse(response);
      if (medIssueResults.data.length === 0){
        $("#iResults").append("<p>No results. Please try again.</p>");
      }
      else{
        for (let i = 0; i < medIssueResults.data.length; i++){
          console.log(medIssueResults.data[i].name);
          var firstName2 = medIssueResults.data[i].profile.first_name;
          var lastName2 = medIssueResults.data[i].profile.last_name;
          var clinicName2 = medIssueResults.data[i].practices[0].name;
          var address2 = medIssueResults.data[i].practices[0].visit_address.street + medIssueResults.data[i].practices[0].visit_address.street2 + " " + medIssueResults.data[i].practices[0].visit_address.zip;
          var website2 = medIssueResults.data[i].practices[0].website;
          if (website2 === undefined){
            website2 = "No Website";
          }
          $("#iResults").append('<p class="item"><b>'+firstName2+ ' ' +lastName2+'</b></p><p class="item">'+clinicName2+'</p><p class="item">'+address2+'</p><p class="item">'+website2+'</p><br>');
          $(".item").show("slide");
        }
      }
    },
    // eslint-disable-next-line
    function(error){
          $('#iResults').append("<p>An error has occurred.</p>");
        });
    $("#results2").show("slide");
}

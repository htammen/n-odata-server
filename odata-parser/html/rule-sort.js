
"use strict;"

$(document).ready(function() {
	sort({data: "index"});
});

function sortByNameDown(lhs, rhs){
	if(lhs.name < rhs.name){
		return -1;
	}
	if(lhs.name > rhs.name){
		return 1;
	}
	return 0;
}
function sortByNameUp(lhs, rhs){
	if(lhs.name < rhs.name){
		return 1;
	}
	if(lhs.name > rhs.name){
		return -1;
	}
	return 0;
}
function sortByIndexDown(lhs, rhs){
	if(lhs.index < rhs.index){
		return -1;
	}
	if(lhs.index > rhs.index){
		return 1;
	}
	return 0;
}
function sortByIndexUp(lhs, rhs){
	if(lhs.index < rhs.index){
		return 1;
	}
	if(lhs.index > rhs.index){
		return -1;
	}
	return 0;
}
function sort(e) {
	if(e.data === "index"){
		if(tableData.indexSort === "down"){
			tableData.rows.sort(sortByIndexUp);
			tableData.indexSort = "up"
		}else{
			tableData.rows.sort(sortByIndexDown);
			tableData.indexSort = "down"
		}
	}else{
		if(tableData.nameSort === "down"){
			tableData.rows.sort(sortByNameUp);
			tableData.nameSort = "up"
		}else{
			tableData.rows.sort(sortByNameDown);
			tableData.nameSort = "down"
		}
	}
	$("div#sort-links").html(tableGen());
	$("#sort-links a.sortIndex").click("index", sort);
	$("#sort-links a.sortName").click("name", sort);
	$("#sort-links a.sortExpand").click("show", showAll);
	$("#sort-links a.sortCollapse").click("hide", showAll);
	tableData.rows.forEach(function(row) {
		var text = $("#sort-links a.show-" + row.name);
		text.click(row, show);
		if(row.visible === true){
			text.html("show");
			$("#sort-links tr.tr-" + row.name).show();
		}else{
			text.html("hide");
			$("#sort-links tr.tr-" + row.name).hide();
		}
	});
}
function showAll(e){
	tableData.rows.forEach(function(row){
		var text = $("#sort-links a.show-" + row.name);
		var line = $("#sort-links tr.tr-" + row.name);
		if(e.data === "show"){
			text.html("hide");
			$("#sort-links tr.tr-" + row.name).show();
			row.visible = true;
		}else{
			text.html("show");
			$("#sort-links tr.tr-" + row.name).hide();
			row.visible = false;
		}
	});
}
function show(e) {
	var row = e.data;
	var text = $(e.target);
	if(row.visible === true){
		text.html("show");
		$("#sort-links tr.tr-" + row.name).hide();
		row.visible = false;
	}else{
		text.html("hide");
		$("#sort-links tr.tr-" + row.name).show();
		row.visible = true;
	}
}
function tableGen(e) {
	var title = "Rules with Dependencies"
	var html = "";
	html += '<table class="apg-table">';
	html += '<caption>' + title;
	html += '<br><a class=sortExpand href="#">show all</a><br><a class=sortCollapse href="#">hide all</a>';
	html += '</caption>';
	html += '<tr><th><a class="sortIndex" href="#">index</a></th><th><a class="sortName" href="#">rule</a></th><th>refers to</th></tr>';
	tableData.rows.forEach(function(rule) {
		if (rule.dependents.length > 0) {
			html += '<tr><td>' + rule.index + '</td><td>' + rule.name
					+ '</td><td><a class="show-' + rule.name
					+ '" href="#">show</a></td></tr>';
			html += '<div class="div-' + rule.name + '">';
			for (var i = 0; i < rule.dependents.length; i += 1) {
				var obj = rule.dependents[i];
				html += '<tr class="tr-' + rule.name + '"><td></td><td>'
						+ obj.index + '</td><td>' + obj.name
						+ '</td></tr>';
			}
		} else {
			html += '<tr><td>' + rule.index + '</td><td>' + rule.name
					+ '</td><td></td></tr>';
		}
	});
	html += "</table>";
	return html;
}

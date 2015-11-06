"use strict;"

$(document).ready(function() {
	sort({
		data : null
	});
});

function sortCols(lhs, rhs) {
	var lval, rval;
	switch (attrSortCol) {
	case "rule":
		// alphabetical
		lval = lhs.lower;
		rval = rhs.lower;
		break;
	case "type":
		// numerical on type
		lval = lhs.type;
		rval = rhs.type;
		break;
	case "left":
		// descending: false (no) preceeds true (yes)
		lval = (lhs.left === false) ? 0 : 1;
		rval = (rhs.left === false) ? 0 : 1;
		break;
	case "nested":
		lval = (lhs.nested === false) ? 0 : 1;
		rval = (rhs.nested === false) ? 0 : 1;
		break;
	case "right":
		lval = (lhs.right === false) ? 0 : 1;
		rval = (rhs.right === false) ? 0 : 1;
		break;
	case "cyclic":
		lval = (lhs.cyclic === false) ? 0 : 1;
		rval = (rhs.cyclic === false) ? 0 : 1;
		break;
	case "finite":
		lval = (lhs.finite === false) ? 0 : 1;
		rval = (rhs.finite === false) ? 0 : 1;
		break;
	case "empty":
		lval = (lhs.empty === false) ? 0 : 1;
		rval = (rhs.empty === false) ? 0 : 1;
		break;
	case "notempty":
		lval = (lhs.notempty === false) ? 0 : 1;
		rval = (rhs.notempty === false) ? 0 : 1;
		break;
	case "index":
	default:
		// numerical
		lval = lhs.index;
		rval = rhs.index;
		break;
	}
	if (lval < rval) {
		if (attrSortDir === 0) {
			return -1;
		}
		return 1;
	}
	if (lval > rval) {
		if (attrSortDir === 0) {
			return 1;
		}
		return -1;
	}
	return 0;
}
function sortErrors(lhs, rhs) {
	var rerror = (rhs.left === true || rhs.cyclic === true || rhs.finite === false) ? true : false;
	var lerror = (lhs.left === true || lhs.cyclic === true || lhs.finite === false) ? true : false;
	
	if (rerror === false && lerror === true ) {
		return -1;
	}
	if (rerror === true && lerror === false) {
		return 1;
	}
	return 0;
}
function sort(e) {
	if (e.data !== null) {
		// sort direction: 0 = descending, 1 = ascending
		switch (e.data) {
		case "rule":
			attrSortCol = "rule"
			attrDirs.rule = (attrDirs.rule === 0) ? 1 : 0;
			attrSortDir = attrDirs.rule;
			break;
		case "type":
			attrSortCol = "type"
			attrDirs.type = (attrDirs.type === 0) ? 1 : 0;
			attrSortDir = attrDirs.type;
			break;
		case "left":
			attrSortCol = "left"
			attrDirs.left = (attrDirs.left === 0) ? 1 : 0;
			attrSortDir = attrDirs.left;
			break;
		case "nested":
			attrSortCol = "nested"
			attrDirs.nested = (attrDirs.nested === 0) ? 1 : 0;
			attrSortDir = attrDirs.nested;
			break;
		case "right":
			attrSortCol = "right"
			attrDirs.right = (attrDirs.right === 0) ? 1 : 0;
			attrSortDir = attrDirs.right;
			break;
		case "cyclic":
			attrSortCol = "cyclic"
			attrDirs.cyclic = (attrDirs.cyclic === 0) ? 1 : 0;
			attrSortDir = attrDirs.cyclic;
			break;
		case "finite":
			attrSortCol = "finite"
			attrDirs.finite = (attrDirs.finite === 0) ? 1 : 0;
			attrSortDir = attrDirs.finite;
			break;
		case "empty":
			attrSortCol = "empty"
			attrDirs.empty = (attrDirs.empty === 0) ? 1 : 0;
			attrSortDir = attrDirs.empty;
			break;
		case "notempty":
			attrSortCol = "notempty"
			attrDirs.notempty = (attrDirs.notempty === 0) ? 1 : 0;
			attrSortDir = attrDirs.notempty;
			break;
		case "index":
		default:
			attrSortCol = "index"
			attrDirs.index = (attrDirs.index === 0) ? 1 : 0;
			attrSortDir = attrDirs.index;
			break;
		}
		attrRows.sort(sortCols);
		if (attrHasErrors && attrSortErrors) {
			attrRows.sort(sortErrors);
		}
	}
	function check(){
		var errors = $("#sort-links input#errors");
		if(errors.is(":checked")){
			attrSortErrors = true;
		}else{
			attrSortErrors = false;
		}
	}

	$("div#sort-links").html(tableGen());
	$("#sort-links a.index").click("index", sort);
	$("#sort-links a.rule").click("rule", sort);
	$("#sort-links a.type").click("type", sort);
	$("#sort-links a.left").click("left", sort);
	$("#sort-links a.nested").click("nested", sort);
	$("#sort-links a.right").click("right", sort);
	$("#sort-links a.cyclic").click("cyclic", sort);
	$("#sort-links a.finite").click("finite", sort);
	$("#sort-links a.empty").click("empty", sort);
	$("#sort-links a.notempty").click("notempty", sort);
	$("#sort-links input#errors").click(check);
}
function yesno(val) {
	return (val === true) ? "yes" : "no"
}
function tableGen(e) {
	var title = "Grammar Attributes"
	var checked = attrSortErrors ? "checked" : ""
	var html = ""
	html += '<table class="apg-table">';
	html += '<caption>' + title;
	if(attrHasErrors){
		html += '<br><input id="errors" type="checkbox" '+checked+'>keep errors at top</input></caption>';
	}
	html += '</caption>';
	html += '<tr>';
	html += '<th><a class="index" href="#">index</a></th>';
	html += '<th><a class="rule" href="#">rule</a></th>';
	html += '<th><a class="type" href="#">type</a></th>';
	html += '<th><a class="left" href="#">left</a></th>';
	html += '<th><a class="nested" href="#">nested</a></th>';
	html += '<th><a class="right" href="#">right</a></th>';
	html += '<th><a class="cyclic" href="#">cyclic</a></th>';
	html += '<th><a class="finite" href="#">finite</a></th>';
	html += '<th><a class="empty" href="#">empty</a></th>';
	html += '<th><a class="notempty" href="#">not empty</a></th>';
	html += '</tr>';
	attrRows.forEach(function(row) {
		var left = yesno(row.left);
		if (row.left === true) {
			left = '<kbd>' + left + '</kbd>';
		}
		var cyclic = yesno(row.cyclic);
		if (row.cyclic === true) {
			cyclic = '<kbd>' + cyclic + '</kbd>';
		}
		var finite = yesno(row.finite);
		if (row.finite === false) {
			finite = '<kbd>' + finite + '</kbd>';
		}
		html += '<tr>';
		html += '<td>' + row.index + '</td>';
		html += '<td>' + row.rule + '</td>';
		html += '<td>' + row.typename + '</td>';
		html += '<td>' + left + '</td>';
		html += '<td>' + yesno(row.nested) + '</td>';
		html += '<td>' + yesno(row.right) + '</td>';
		html += '<td>' + cyclic + '</td>';
		html += '<td>' + finite + '</td>';
		html += '<td>' + yesno(row.empty) + '</td>';
		html += '<td>' + yesno(row.notempty) + '</td>';
		html += '</tr>';
	});
	html += "</table>"
	return html;
}

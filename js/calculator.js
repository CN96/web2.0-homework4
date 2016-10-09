// JavaScript Document

window.onload = function() {
	var obutton = document.getElementById("container").getElementsByTagName("button");
	for (var i = obutton.length-1; i >= 0; i--) {//用数组和循环给多个按钮绑定事件
		obutton[i].onclick = function(event) {
			var str = event.target.innerHTML;//得到点击按钮对应的字符串
			if (str == "CE") {
				clearAll();
			}
			if (str == "=") {
				calculate();
			}
			if (str != "CE" && str != "=") {
				changeExpression(str);
			}
		}
	}
}

function clearAll() {
	document.getElementById("result").value = null;
}

function changeExpression(str) {
	var expression = document.getElementById("result").value;
	if (expression == "Infinity" || expression == "-Infinity") {
		expression = null;
	}
	if (str == '←') {
		if (expression) {
			expression = expression.substring(0, expression.length-1);
		}
	} else {
		if (expression == null) {
			expression = str;
		} else {
			expression += str;
		}
	}
	document.getElementById("result").value = expression;
}

function calculate() {
	if (!checkExpression()) {
		return false;
	}
	try	{
		var x = eval(document.getElementById("result").value);
		document.getElementById("result").value = x;
	}
	catch(exception) {
		alert("算术表达式非法！");
		return false;
	}
}

function checkExpression() {
	var expression = document.getElementById("result").value;
	if (!expression) {
		return false;
	}
	
	var point = 0;//检查小数点
	for (var i = 0; i < expression.length; i++) {
		if (expression[i] == '.') {
			point++;
			if (point > 1) {
				alert("算术表达式非法！可能因为多余的小数点");
				return false;
			}
		}
		if (expression[i] == '+' || expression[i] == '-' || expression[i] == '*' || expression[i] == '/') {
			point = 0;
		}
	}
	
	var left = 0;//检查括号是否错误
	var right = 0;
	for (var i = 0; i < expression.length; i++) {
		if (expression[i] == '(') {
			left++;
		}
		if (expression[i] == ')') {
			right++;
			if (right > left) {
				alert("算术表达式非法！可能因为括号的错误添加");
				return false;
			}
		}
	}
	if (left != right) {
		alert("算术表达式非法！可能因为括号的错误添加");
		return false;
	}
	
	return true;
}
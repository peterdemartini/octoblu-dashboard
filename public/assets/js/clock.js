'use strict';

$(document).ready(function(){

	function pad(n){
		return n < 10 ? '0' + n : n;
	}

	function getCurrentTime(){
		var now = new Date();
		var hours = now.getHours();
		var minutes = now.getMinutes();
		var seconds = now.getSeconds();
		return [pad(hours), pad(minutes), pad(seconds)].join(':');
	}

	function getCurrentDate(){
		var now = new Date();
		var month = now.getMonth();
		var year = now.getFullYear();
		return month + ' / ' + year;
	}

	var time = $('.current-time');

	time.text(getCurrentTime());

	setInterval(function(){
		time.text(getCurrentTime());
	}, 1000);

	var date = $('.current-date');

	date.text(getCurrentDate());

	setInterval(function(){
		date.text(getCurrentDate());
	}, 60 * 60 * 1000);

});
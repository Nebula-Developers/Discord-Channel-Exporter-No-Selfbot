// SET THIS TO THE CORRECT CHANNEL ID
const channelID = "";

/*
	***** INSTRUCTIONS *****
	1.  Put the channel ID of the channel you want to log in between the quotes in the variable channelID above.
	    It is important that you obtain the channel ID prior to refreshing Discord.
	2.  Go to a channel on the server that is NOT the channel you are logging.
	3.  Refresh Discord with Ctrl + R.
	4.  Open the developer tools in Discord with Ctrl + Shift + I. Go to the Console tab at the top.
	5.  Copy and paste this script, including the channel ID you added in step 1, into the console, and press enter.
	6.  Go to the channel you are logging.
	7.  Type "logStart()" (without the quotes) into the console and press enter.
	8.  The channel should start scrolling up automatically and log messages.
	9.  When the channel is scrolled all the way to the first message in the channel, type "logEnd()"
	    (without the quotes) into the console and press enter.
	10. The log file should be in your Desktop folder.
*/

const path = require("path");
const fs = require("fs");
const outDir = path.join(require("os").homedir(), "Desktop");
const outStream = fs.createWriteStream(path.join(outDir, `${channelID}_${Date.now()}.json`));

let firstMessage = true;
let scrollUpInterval;
let messagesScroller;

function outputMessages(str) {
	str = str.substr(1, str.length - 2);
	if (firstMessage === true) {
		outStream.write(str + "\n");
		firstMessage = false;
		return;
	}
	outStream.write("," + str + "\n");
}

function logStart() {messagesScroller = document.getElementsByClassName("messages scroller")[0];
	scrollUpInterval = setInterval(() => {
		messagesScroller.scrollTop = 0;
	}, 2000);
}

function logEnd() {
	XMLHttpRequest.prototype.open = oldOpen;
	clearInterval(scrollUpInterval);
	outStream.end("]");
}

outStream.write("[\n");

const oldOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function () {
	const splitUrl = arguments[1].split("/");
	if (arguments[0] === "GET" && splitUrl[7].startsWith("messages") && splitUrl[6] === channelID) {
		this.addEventListener("load", () => {
			outputMessages(this.responseText);
		});
	}
	return oldOpen.apply(this, arguments);;
};

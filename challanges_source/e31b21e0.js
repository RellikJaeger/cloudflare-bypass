var var1 = (0, document.createElement("div"));
var1.innerHTML = "<a href=\"/\">+((!+[]+(!![])+(!![])+!![]+!![]+!![]+!![]+!![]+[])+(!+[]+(!![])+(!![]))+(!+[]+(!![])+(!![])+!![]+!![]+!![]+!![]+!![])+(!+-[]+(+-!![])+-[])+(!+[]+(!![])+(!![])+!![])+(-~~~[])+(!+[]+(!![])+(!![])+!![]+!![]+!![])+(!+[]+(!![])+(!![])+!![])+(-~~~[]))/+((!+[]+(!![])+(!![])+!![]+[])+(!+[]+(!![])-[])+(!+[]+(!![])+(!![]))+(!+[]+(!![])+(!![])+!![]+!![]+!![]+!![])+(!+-[]+(+-!![])+-[])+(-~~~[])+(!+[]+(!![])-[])+(!+[]+(!![])+(!![])+!![]+!![])+(!+[]+(!![])+(!![])+!![]+!![]+!![]))</a>";
var var2 = var1.firstChild.href;
var var3 = var2.match(/https?:\/\/((.*))\//)[1].split(":")[0];
var var4 = function (s) {
	var a = +((+((!+[] + (!![]) + (!![]) + !![] + !![] + !![] + !![] + !![] + !![] + []) + (!+[] + (!![]) + (!![]) + !![]) + (-~~~[]) + (!+-[] + (+-!![]) + -[]) + (!+[] + (!![]) + (!![]) + !![] + !![] + !![] + !![] + !![]) + (!+[] + (!![]) + (!![])) + (!+[] + (!![]) + (!![]) + !![] + !![] + !![] + !![] + !![] + !![]) + (!+[] + (!![]) + (!![]) + !![] + !![] + !![] + !![] + !![]) + (-~~~[])) / +((!+[] + (!![]) + (!![]) + !![] + !![] + []) + (!+-[] + (+-!![]) + -[]) + (!+[] + (!![]) - []) + (!+[] + (!![]) + (!![]) + !![] + !![] + !![] + !![]) + (-~~~[]) + (!+[] + (!![]) + (!![]) + !![] + !![] + !![] + !![] + !![] + !![]) + (!+[] + (!![]) + (!![]) + !![] + !![] + !![] + !![]) + (!+[] + (!![]) + (!![]) + !![]) + (!+[] + (!![]) + (!![]) + !![]))).toFixed(10));
	for (var j = 0; j < s.length; j++) {
		a += s.charCodeAt(j);
	}
	return a;
};

window._cf_chl_ctx[window._cf_chl_ctx.chC].a = (var4("" + ((eval(var1.firstChild.innerHTML)).toFixed(10))) + var4(var3)).toFixed(10);
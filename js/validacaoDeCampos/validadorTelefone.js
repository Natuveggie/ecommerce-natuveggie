function inputHandler(masks, max, event) {
    var c = event.target;
    var v = c.value.replace(/\D/g, '');
    var m = c.value.length > max ? 1 : 0;
    VMasker(c).unMask();
    VMasker(c).maskPattern(masks[m]);
    c.value = VMasker.toPattern(v, masks[m]);
}

var telMask = ['(99) 9999-99999', '(99) 99999-9999'];
var tel1 = document.querySelector('input[attrname=telephone1]');
var tel2 = document.querySelector('input[attrname=telephone2]');
VMasker(tel1).maskPattern(telMask[0]);
VMasker(tel2).maskPattern(telMask[0]);
tel1.addEventListener('input', inputHandler.bind(undefined, telMask, 14), false);
tel2.addEventListener('input', inputHandler.bind(undefined, telMask, 14), false);
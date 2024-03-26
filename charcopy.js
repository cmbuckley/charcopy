function output(val) {
    document.getElementById('charcopy-character').innerHTML = (val ? '&#x' + val + ';' : '');
}

function codePoint(val) {
    document.getElementById('charcopy-code').innerHTML = [...val].map(function (char) {
        var codePoint = char.codePointAt(0);

        if (codePoint >= 126980 || (codePoint >= 9728 && codePoint < 9983)) {
            if (codePoint == 9792 || codePoint == 9794) {
                return '<a href="https://emojipedia.org/' + char + '/">' + char + '</a>';
            }

            return '<a href="https://emojipedia.org/' + char + '/"><img class="charcopy-emoji" alt="' + char + '" src="https://raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-160/' + codePoint.toString(16) + '.png" /></a>';
        }

        if (codePoint == 8205) {
          return '<a href="https://emojipedia.org/zero-width-joiner/"><span class="charcopy-zwj">ZWJ</span></a>';
        }

        return '<a href="https://www.fileformat.info/info/unicode/char/' + codePoint.toString(16) + '/index.htm">' + char + '</a>';
    }).join('\u2009');
}

document.getElementById('charcopy-codepoint').addEventListener('keyup', function (e) {
    output(e.target.value);
});

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('charcopy-input').blur();
});

document.getElementById('charcopy-char').addEventListener('input', function (e) {
    codePoint(e.target.value);
});

document.querySelector('.charcopy-quick').addEventListener('click', function (e) {
    if (e.target && e.target.closest('li')) {
        output(e.target.closest('li').dataset.val);
        document.querySelector('.charcopy-clipboard').click();
    }
});

(new ClipboardJS('.charcopy-clipboard')).on('success', function(e) {
    e.clearSelection();
});

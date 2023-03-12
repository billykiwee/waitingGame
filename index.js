var emojis = ["😂", "🚀", "🔥", "🤔", "👍", "🎉", "😍", "🙌"];
var getRandomID = function () {
    return 'azertyuiopqsdfghjklmwxcvbn1234567890'.split('').sort(function () { return Math.random() - 0.5; }).splice(0, 4).join('').toString();
};
var blocks = document.querySelectorAll('.block');
var emojiInGame = emojis.sort(function () { return Math.random() - 0.5; });
var emojisObject = emojis.concat(emojis).map(function (emoji, i) {
    return {
        id: 'id-' + getRandomID(),
        emoji: emoji
    };
});
function fillAllBlock() {
    for (var i = 0; i < emojisObject.length; i++) {
        blocks[i].innerHTML = emojisObject[i].emoji;
        blocks[i].classList.add(emojisObject[i].id);
        blocks[i].id = emojisObject[i].id;
    }
}
fillAllBlock();
var emojiPickedByUser = [];
var PairsFound = [];
var clics = 0;
function playTheGame() {
    blocks.forEach(function (block) {
        block.addEventListener('click', function () { clickBlock(block); });
    });
    function clickBlock(block) {
        emojiPickedByUser.push(block.id);
        block.classList.add('clicked');
        clics += 1;
        var clicsIsOdd = clics % 2 == 0;
        if (clicsIsOdd) {
            blocks.forEach(function (e) { return e.classList.add('compare'); });
            var isPairsMatches = function () {
                var getEmojiMap = emojisObject
                    .filter(function (emoji) {
                    return emoji.id == emojiPickedByUser[0] || emoji.id == emojiPickedByUser[1];
                })
                    .map(function (emoji) { return emoji.emoji; });
                return {
                    match: getEmojiMap[0] == getEmojiMap[1],
                    pairs: [emojiPickedByUser[0], emojiPickedByUser[1]]
                };
            };
            var pairsEmojiMatch = isPairsMatches().match;
            var pairsEmoji_1 = isPairsMatches().pairs;
            if (pairsEmojiMatch) {
                PairsFound.push(block.innerHTML);
            }
            setTimeout(function () {
                var _a;
                for (var i = 0; i < pairsEmoji_1.length; i++) {
                    (_a = document.querySelector('#' + pairsEmoji_1[i])) === null || _a === void 0 ? void 0 : _a.classList.remove('clicked');
                }
                emojiPickedByUser.splice(0, emojiPickedByUser.length);
                blocks.forEach(function (e) { return e.classList.remove('compare'); });
            }, 800);
        }
        var _loop_1 = function (i) {
            emojisObject
                .filter(function (emoji) {
                return emoji.emoji == PairsFound[i];
            })
                .map(function (emoji) {
                var el = document.querySelectorAll('#' + emoji.id);
                if (el) {
                    el.forEach(function (e) {
                        e.classList.add('found');
                        e.style.color = 'red';
                    });
                }
            });
        };
        for (var i = 0; i < PairsFound.length; i++) {
            _loop_1(i);
        }
        var percentageDiv = document.querySelector('#percentage');
        if (percentageDiv) {
            percentageDiv.style.width = (PairsFound.length / emojis.length) * 100 + '%';
        }
        var parisFoundTxt = document.querySelector('#pairsFoundTxt');
        if (parisFoundTxt) {
            parisFoundTxt.innerHTML = PairsFound.length + "/ ".concat(emojis.length);
        }
        var clickCount = document.querySelector('#total-clics');
        if (clickCount) {
            clickCount.innerHTML = clics + '';
        }
    }
}
playTheGame();
function Replay() {
    var replay = document.querySelector('.replay');
    if (replay) {
        replay.onclick = function () { return window.location.href = ''; };
    }
}
Replay();

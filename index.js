var emojis = ["😀", "🐶", "🍔", "⚽️", "🚗", "🏠", "👩‍🎓", "💼", "🎂", "🎉", "💡", "💊", "🌺", "🌍", "🌈", "🎨", "🎵", "📖", "📷", "💻", "📱", "💰", "🔑", "🔨", "👍", "👎", "👊", "✌️", "🤞", "🙏", "👏", "💋", "👩‍❤️‍💋‍👨", "💔", "🤕", "👻", "👽", "🎃", "🛀", "🍏", "🍺", "🍩", "🎁", "🎬", "🎮", "🚀", "🚲", "🛒", "📮", "🛍️", "🚑", "🚒"];
var getRandomID = function () {
    return 'azertyuiopqsdfghjklmwxcvbn1234567890AZERTYUIOPQSDFGHJKLMWXCVBN'
        .split('')
        .sort(function () { return Math.random() - 0.5; })
        .splice(0, 4)
        .join('')
        .toString();
};
if (typeof document !== 'undefined') {
    var blocks_1 = document.querySelectorAll('.block');
    function shuffleArray(array) {
        var _a;
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
        }
        return array;
    }
    var getRandomEmoji_1 = shuffleArray(emojis).splice(0, 8);
    var emojiInGame = shuffleArray(getRandomEmoji_1.concat(getRandomEmoji_1.reverse()));
    var emojisObject_1 = emojiInGame.map(function (emoji, i) {
        return {
            id: 'id-' + getRandomID(),
            emoji: emoji
        };
    });
    var emojiPickedByUser_1 = [];
    var PairsFound_1 = [];
    var clics_1 = 0;
    function playTheGame() {
        blocks_1.forEach(function (block) {
            for (var i = 0; i < emojisObject_1.length; i++) {
                blocks_1[i].innerHTML = emojisObject_1[i].emoji;
                blocks_1[i].id = emojisObject_1[i].id;
            }
            block.addEventListener('click', function () { clickBlock(block); });
        });
        function clickBlock(block) {
            function blockUserClick2TimesOnABlock(block) {
                block.classList.add('compare');
            }
            blockUserClick2TimesOnABlock(block);
            emojiPickedByUser_1.push(block.id);
            block.classList.add('clicked');
            clics_1 += 1;
            var clicsIsOdd = clics_1 % 2 == 0;
            if (clicsIsOdd) {
                blocks_1.forEach(function (e) { return e.classList.add('compare'); });
                var isPairsMatches = function () {
                    var getEmojiMap = emojisObject_1
                        .filter(function (emoji) {
                        return emoji.id == emojiPickedByUser_1[0] || emoji.id == emojiPickedByUser_1[1];
                    })
                        .map(function (emoji) { return emoji.emoji; });
                    return {
                        match: getEmojiMap[0] == getEmojiMap[1],
                        pairs: [emojiPickedByUser_1[0], emojiPickedByUser_1[1]]
                    };
                };
                var pairsEmojiMatch = isPairsMatches().match;
                var pairsEmoji_1 = isPairsMatches().pairs;
                if (pairsEmojiMatch) {
                    PairsFound_1.push(block.innerHTML);
                }
                var getBlocksFound = function () {
                    var blocksFound = [];
                    for (var i = 0; i < pairsEmoji_1.length; i++) {
                        var elements = document.querySelector('#' + pairsEmoji_1[i]);
                        if (elements) {
                            blocksFound.push(elements);
                            elements.classList.add('compare');
                        }
                    }
                    return blocksFound;
                };
                var blocksFound_1 = getBlocksFound();
                setTimeout(function () {
                    blocksFound_1.forEach(function (blockFound) {
                        blockFound.classList.remove('clicked');
                        blockFound.classList.add('compare');
                    });
                    emojiPickedByUser_1.splice(0, emojiPickedByUser_1.length);
                    blocks_1.forEach(function (e) { return e.classList.remove('compare'); });
                }, 800);
            }
            var _loop_1 = function (i) {
                emojisObject_1
                    .filter(function (emoji) {
                    return emoji.emoji == PairsFound_1[i];
                })
                    .map(function (emoji) {
                    var el = document.querySelectorAll('#' + emoji.id);
                    if (el) {
                        el.forEach(function (e) {
                            e.classList.add('found');
                            e.style.color = 'initial';
                            e.classList.add('compare');
                        });
                    }
                });
            };
            for (var i = 0; i < PairsFound_1.length; i++) {
                _loop_1(i);
            }
            var percentageDiv = document.querySelector('#percentage');
            if (percentageDiv) {
                percentageDiv.style.width = (PairsFound_1.length / getRandomEmoji_1.length) * 100 + '%';
            }
            var parisFoundTxt = document.querySelector('#pairsFoundTxt');
            if (parisFoundTxt) {
                parisFoundTxt.innerHTML = PairsFound_1.length + '';
            }
            var clickCount = document.querySelector('#total-clics');
            if (clickCount) {
                clickCount.innerHTML = clics_1 + '';
            }
        }
    }
    playTheGame();
    function Replay() {
        var replay = document.querySelector('.replay');
        if (replay) {
            replay.onclick = function () {
                window.location.href = '';
            };
        }
    }
    Replay();
    /* type stateWidthType = 'right'|'left'
    
    type stateHeightType = 'top'|'bottom'
    
    const container = document.querySelector('.container') as HTMLDivElement
    
    if (container) {
        container.innerHTML = `
            <div class = "O"></div>
            <div class = "O"></div>
            <div class = "O"></div>
            <div class = "O"></div>
        `
    
        container.style.width  = '400px'
        container.style.height = '400px'
        container.style.border = '1px solid black'
    
    }
    
    const bubble = document.querySelectorAll('.O') as NodeListOf<HTMLDivElement>;
    
    class Bubble {
        constructor(container: HTMLDivElement, bubble: NodeListOf<HTMLDivElement>) {
            this.container = container
            this.bubble    = bubble
        }
    
        public speed = 1000
    
        public x = 0
    
        public y = 0
    
        public stateWidth: stateWidthType = 'right'
    
        public stateHeight: stateHeightType = 'bottom'
    
        public speedControl = this.speed/1000
    
        public counterBounding = 0
    
        public direction = {
            getRigth  : () => {
                this.x += this.speedControl
            },
            getLeft   : () => {
                this.x -= this.speedControl
            },
            getTop    : () => {
                this.y += this.speedControl
            },
            getBottom : () => {
                this.y -= this.speedControl
            }
        }
    
        render() {
    
            bubble.forEach(e=> {
                this.x = Math.floor(Math.random() * 400)
                this.y = Math.floor(Math.random() * 400)
            })
    
            
            setInterval(e=> {
    
                if (this.x == 0) {
                    this.stateWidth = 'right'
                }
            
                if (this.x == 370) {
                    this.stateWidth = 'left'
                }
            
                if (this.stateWidth == 'left') {
                    this.direction.getLeft()
                }
                else {
                    this.direction.getRigth()
                }
            
                if (this.y == 0) {
                    this.stateHeight = 'bottom'
                }
            
                if (this.y == 370) {
                    this.stateHeight = 'top'
                }
            
                if (this.stateHeight == 'bottom') {
                    this.direction.getTop()
                }
                else {
                    this.direction.getBottom()
                }
            
                if (this.bubble) {
    
                    this.bubble.forEach(e => {
    
                        e.style.margin = `${this.x}px ${this.y}px`
                    });
                }
            }, 0)
        }
    }
    
    new Bubble(container,bubble).render();
     */
}

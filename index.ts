const emojis = [
    "😀", "😂", "😍", "🤔", "🤯", "👍", "👎", "🎉", "🎂", "🎁", "🐶", "🐱", "🐭", "🦊", "🐻", "🐼", "🐨", "🐯", "🐰", "🦁","🌞","🌈","🎓","🎸","🎭","🍔","🍟","🍩","🍭","🍹","🚀","🛸","🚲","🚕","🚑","🚒","🚔","🚗","🛵"
]
  
const getRandomID = (): string => {
    return 'azertyuiopqsdfghjklmwxcvbn1234567890AZERTYUIOPQSDFGHJKLMWXCVBN'
    .split('')
    .sort(()=> Math.random() -0.5)
    .splice(0,4)
    .join('')
    .toString()
}

const blocks = document.querySelectorAll<HTMLDivElement>('.block')

interface Pairs {
    id   : string
    emoji: string
}

function shuffleArray(array: string[]): string[] {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const getRandomEmoji = shuffleArray(emojis).splice(0,8)
  
const emojiInGame: string[] = shuffleArray(getRandomEmoji.concat(getRandomEmoji.reverse()))

const emojisObject : Pairs[] = emojiInGame.map((emoji, i) => {
    return {
        id: 'id-' + getRandomID(),
        emoji: emoji
    }
})

const emojiPickedByUser: string[] = []

const PairsFound: string[] = []

let clics: number = 0

function playTheGame() {
    
    blocks.forEach(block=> {

        for (let i = 0; i < emojisObject.length; i++) {

            blocks[i].innerHTML = emojisObject[i].emoji
    
            blocks[i].id = emojisObject[i].id
        }

        block.addEventListener('click', () => { clickBlock(block) })
    })

    

    function clickBlock(block: HTMLDivElement) {

        function blockUserClick2TimesOnABlock(block: HTMLDivElement) {
            block.classList.add('compare')
        }

        blockUserClick2TimesOnABlock(block)

        emojiPickedByUser.push(block.id)

        block.classList.add('clicked')

        clics += 1

        const clicsIsOdd = clics % 2 == 0


        if (clicsIsOdd) {

            blocks.forEach(e=> e.classList.add('compare'))

            const isPairsMatches = () => {
                const getEmojiMap = emojisObject
                .filter(emoji=> {
                    return emoji.id == emojiPickedByUser[0] || emoji.id == emojiPickedByUser[1]
                })
                .map(emoji=> emoji.emoji)

                return {
                    match : getEmojiMap[0] == getEmojiMap[1],
                    pairs : [emojiPickedByUser[0], emojiPickedByUser[1]]
                }
            }

            const pairsEmojiMatch = isPairsMatches().match

            const pairsEmoji = isPairsMatches().pairs
            
            if (pairsEmojiMatch) {

                PairsFound.push(block.innerHTML)
            }  

            const getBlocksFound = (): HTMLDivElement[] => {

                const blocksFound: HTMLDivElement[] = []
              
                for (let i = 0; i < pairsEmoji.length; i++) {

                    const elements = document.querySelector<HTMLDivElement>('#' + pairsEmoji[i])

                    if (elements) {

                        blocksFound.push(elements)

                        elements.classList.add('compare')
                    }
                }
              
                return blocksFound
            }
            
            const blocksFound = getBlocksFound()
            
            setTimeout(()=> {

                blocksFound.forEach(blockFound=> {

                    blockFound.classList.remove('clicked')

                    blockFound.classList.add('compare')
                })

                emojiPickedByUser.splice(0, emojiPickedByUser.length)
                
                blocks.forEach(e=> e.classList.remove('compare'))

            }, 800)
        }

        for (let i = 0; i < PairsFound.length; i++) {
            
            emojisObject
            .filter(emoji=> {

                return emoji.emoji == PairsFound[i]
            })
            .map(emoji=> {

                const el = document.querySelectorAll<HTMLDivElement>('#' + emoji.id)
                if (el) {

                    el.forEach(e=> {
                        e.classList.add('found')

                        e.style.color = 'initial'

                        e.classList.add('compare')
                    })
                }
            })
        }

        const percentageDiv = document.querySelector<HTMLDivElement>('#percentage')
        
        if (percentageDiv) {

            percentageDiv.style.width = (PairsFound.length / getRandomEmoji.length) * 100 + '%'
        }

        const parisFoundTxt = document.querySelector<HTMLDivElement>('#pairsFoundTxt')

        if (parisFoundTxt) {

            parisFoundTxt.innerHTML = PairsFound.length + ''

        }

        const clickCount = document.querySelector<HTMLDivElement>('#total-clics')

        if (clickCount) {

            clickCount.innerHTML = clics + ''
        }
    
    }
}

playTheGame()


function Replay() {
    
    const replay = document.querySelector<HTMLButtonElement>('.replay')
            
    if (replay) {
        
        replay.onclick = () => window.location.href = ''
    }    
}

Replay()




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
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
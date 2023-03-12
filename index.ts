const emojis : string[] = ["😂", "🚀", "🔥", "🤔", "👍", "🎉", "😍", "🙌"];

const getRandomID = (): string => {
    return 'azertyuiopqsdfghjklmwxcvbn1234567890AZERTYUIOPQSDFGHJKLMWXCVBN'.split('').sort(()=> Math.random() -0.5).splice(0,4).join('').toString()
}

const blocks = document.querySelectorAll<HTMLDivElement>('.block')

interface Pairs {
    id   : string
    emoji: string
}

const lol = [1,1,2,3,4,5,6,7,8]

function shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  
const emojiInGame: string[] = shuffleArray(emojis.concat(emojis.reverse()))

const emojisObject : Pairs[] = emojiInGame.map((emoji, i) => {
    return {
        id: 'id-' + getRandomID(),
        emoji: emoji
    }
})

function fillAllBlock() {

    for (let i = 0; i < emojisObject.length; i++) {

        blocks[i].innerHTML = emojisObject[i].emoji

        blocks[i].id = emojisObject[i].id
    }
}

fillAllBlock() 

const emojiPickedByUser: string[] = []

const PairsFound: string[] = []

let clics: number = 0

function playTheGame() {
    
    blocks.forEach(block=> {

        block.addEventListener('click', () => { clickBlock(block) })
    })

    function clickBlock(block: HTMLDivElement) {

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
            

            setTimeout(()=> {

                for (let i = 0; i < pairsEmoji.length; i++) {
                    document.querySelector('#'+ pairsEmoji[i])?.classList.remove('clicked')
                }

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

                        e.style.color = 'red'
                    })
                }
            })
        }

        const percentageDiv = document.querySelector<HTMLDivElement>('#percentage')
        
        if (percentageDiv) {

            percentageDiv.style.width = (PairsFound.length / emojis.length) * 100 + '%'
        }

        const parisFoundTxt = document.querySelector<HTMLDivElement>('#pairsFoundTxt')

        if (parisFoundTxt) {

            parisFoundTxt.innerHTML = PairsFound.length + `/ ${emojis.length}`              
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
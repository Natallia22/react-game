import React, { useEffect, useState } from "react";
import useSound from 'use-sound';
import Menu from "./Menu"
import "./index.css";

const cards = [
  { name: 'belka', id: '1' },
  { name: 'ezhik', id: '2' },
  { name: 'golub', id: '3' },
  { name: 'krolik', id: '4' },
  {name: 'lev', id: '5'},
  {name: 'lvica', id: '6'},
  {name: 'pesec', id: '7'},
  {name: 'popugay', id: '8'},
  {name: 'sova', id: '9'},
  {name: 'verbljud', id: '10'}
];
const cardCars = [
  { name: 'zhuk', id: '1' },
  { name: 'taxi', id: '2' },
  { name: 'skor', id: '3' },
  { name: 'pojar', id: '4' },
  {name: 'kabriolet', id: '5'},
  {name: 'gruzovik', id: '6'},
  {name: 'fura', id: '7'},
  {name: 'evakuator', id: '8'},
  {name: 'cuper', id: '9'},
  {name: 'avtomob', id: '10'}
];
const cardFruits = [
  { name: 'abrikos', id: '1' },
  { name: 'apelsin', id: '2' },
  { name: 'apple', id: '3' },
  { name: 'banan', id: '4' },
  {name: 'dynja', id: '5'},
  {name: 'granate', id: '6'},
  {name: 'grusha', id: '7'},
  {name: 'klubnika', id: '8'},
  {name: 'vinograd', id: '9'},
  {name: 'vishnja', id: '10'}
];

function App() {
  
  const items = [{ value: 'Продолжить', href: '#', stylenone: { display: 'none' }, styleblock: { display: 'flex' }}, { value: 'Новая игра', href: '#'}, { value: 'Настройки', href: '#'}, { value: 'Автоигра', href: '#'}, { value: 'Статистика', href: '#'}, { value: 'Во весь экран', href: '#'}]
  const [menuActive, setMenuActive] = useState(true);
  const [pairOfCards, SetPairOfCards] = useState(JSON.parse(localStorage.getItem('myPairOfCards')) || [...cards, ...cards])
  const [upBound, setUpBound] = useState(JSON.parse(localStorage.getItem('myUpBound')) || 5);
  const [downBound, setDownBound] = useState(JSON.parse(localStorage.getItem('myDownBound')) || 14);

  const [sizeCards, setSizeCards] = useState(JSON.parse(localStorage.getItem('mySizeCards')) || '');
  const [styleCards, setStyleCards] = useState(JSON.parse(localStorage.getItem('myStyleCards')) || '');
  const [correctCount, SetCorrectCount] = useState(JSON.parse(localStorage.getItem('myCorrectCount')) || 0);
  const [wrongCount, SetWrongCount] = useState(JSON.parse(localStorage.getItem('myWrongCount')) || 0);

  const [openCard, setopenCard] = useState([]);
  const [matched, setMatched] = useState(JSON.parse(localStorage.getItem('myMatched')) || []);
  const [gameWin, setGameWin] = useState(false);
  const [resumeGame, setResumeGame] = useState(JSON.parse(localStorage.getItem('myResumeGame')) || false);

  useEffect(() => {
    if ((pairOfCards.length)/2 === matched.length){
      setGameWin(true);
      playSoundGameWin();
      resetGameSittings();
    }
    if (openCard < 2) return;
    
    const firstmatch = pairOfCards[openCard[0]];
    const secondmatch = pairOfCards[openCard[1]];
    if(secondmatch && firstmatch.id === secondmatch.id){
      setMatched([...matched, firstmatch.id])
      SetCorrectCount(correctCount + 1)
      setTimeout(() => {
        playSoundCorrect();
      },200)
    } else if (secondmatch && firstmatch.id !== secondmatch.id) {
      SetWrongCount(wrongCount + 1)
      setTimeout(() => {
        playSoundError();
      },200)
    }
    if(openCard.length === 2) setTimeout(() => {
      setopenCard([])
    }, 400);
    
  }, [openCard])

    
  const handleFlip = (index) => {
    setopenCard((opened) => [...opened, index])
    handleClickSoundCard() 
  }


  const soundUrlCard = './image/card.mp3';
  const [playGameCard, setplayGameCard] = useState(true);
  const [volumeCard, setVolumeCard] = useState(0.1);
  const [play, {stop}]  = useSound(soundUrlCard, {
    playGameCard,
    volumeCard
  });
  const handleClickSoundCard = () => {
    playGameCard? play():stop() 
  };

  const soundGameWin = './image/gamewin.mp3';
  const [playGameWin, setplayGameWin] = useState(true);
  const [volumeGameWin, setVolumeGameWin] = useState(0.5);
  const [playwin, {stopwin}]  = useSound(soundGameWin, {
    playGameWin,
    volumeGameWin
  });
  const playSoundGameWin = () => {
    playGameWin? playwin():stopwin() 
  };

  const soundCorrect = './image/correct.mp3';
  const [playCorrect, setplayCorrect] = useState(true);
  const [volumeCorrect, setVolumeCorrect] = useState(0.2);
  const [playcor, {stopcor}]  = useSound(soundCorrect, {
    playCorrect,
    volumeCorrect
  });
  const playSoundCorrect = () => {
    playCorrect ? playcor():stopcor() 
  };

  const soundError = './image/error.mp3';
  const [playError, setplayError] = useState(true);
  const [volumeError, setVolumeError] = useState(0.2);
  const [playerr, {stoperr}]  = useSound(soundError, {
    playError,
    volumeError
  });
  const playSoundError = () => {
    playError ? playerr():stoperr() 
  };


  const [min, setMin] = useState(
    JSON.parse(localStorage.getItem('myMinInLocalStorage')) || 0);
  const [sec, setSec] = useState(
    JSON.parse(localStorage.getItem('mySecInLocalStorage')) || 0);
  const [startTimer, setStartTimer] = useState(false);
  let zeroMin = 0;
  let zeroSec = 0;
  if(sec > 9) zeroSec = '';
  if(min > 9) zeroMin = '';
  
  useEffect(() => {
    let timer;
    if (startTimer) {
      timer = setTimeout(() => {
        if (sec === 59) { 
          setSec(0);
          setMin(min + 1);
        } else {
          setSec(sec + 1);
        }
      }, 1000);
    }
    if(menuActive) clearInterval(timer);
    if(gameWin) clearInterval(timer);
  }, [min, sec, startTimer, menuActive]);

  useEffect(() => {
    localStorage.setItem('mySecInLocalStorage', JSON.stringify(sec));
    localStorage.setItem('myMinInLocalStorage',  JSON.stringify(min));
    localStorage.setItem('myCorrectCount', JSON.stringify(correctCount));
    localStorage.setItem('myWrongCount',  JSON.stringify(wrongCount));
    localStorage.setItem('myMatched',  JSON.stringify(matched));
    localStorage.setItem('myPairOfCards',  JSON.stringify(pairOfCards));
    localStorage.setItem('mySizeCards',  JSON.stringify(sizeCards));
    localStorage.setItem('myStyleCards',  JSON.stringify(styleCards));
    localStorage.setItem('myUpBound',  JSON.stringify(upBound));
    localStorage.setItem('myDownBound',  JSON.stringify(downBound));
    localStorage.setItem('myResumeGame', JSON.stringify(resumeGame));
    
  }, [sec, min, correctCount, wrongCount, matched, pairOfCards, styleCards, upBound, downBound, resumeGame]);
  

  
  const [selectCard, setSelectCard] = useState(-1);

    const upHandler = ({ key }) => {
      if (key === 'ArrowRight') {
        setSelectCard(selectCard + 1)
        console.log(selectCard)
        if (selectCard === (pairOfCards.length - 1)) setSelectCard(0);
      }
      if (key === 'ArrowLeft') {
        setSelectCard(selectCard - 1)
        if (selectCard === 0) setSelectCard((pairOfCards.length - 1));
      }
      if (key === 'ArrowUp') {
        if (selectCard < upBound) return;
        setSelectCard(selectCard - upBound)
      }
      if (key === 'ArrowDown') {
        if (selectCard > downBound) return;
        setSelectCard(selectCard + upBound)
      }
      if (key === 'Escape') {
        setMenuActive(!menuActive)
      }
      if (key === 'Control') {
        handleFlip(selectCard)
      }
      
    };

    useEffect(() => {
      if (startTimer) {
        window.addEventListener('keyup', upHandler);
        return () => {
          window.removeEventListener('keyup', upHandler);
        };
      }
    }, [selectCard, menuActive]); 


    function resetGameSittings() {
      setTimeout(() => {
      setResumeGame(false)
      setMatched([]);
      setopenCard([]);
      setSec(0); setMin(0);
      SetCorrectCount(0);
      SetWrongCount(0);
      setSelectCard(-1);
      window.location.reload();
      }, 2000)
    }
    const [anime, setAnime] = useState(false);
    
  return  (
    <div>
  <div className='app'>
    <nav>
      <div className={menuActive ? 'burger-btn active' : 'burger-btn'} onClick={() => setMenuActive(!menuActive)}></div>
      <span className='timer'>{`${zeroMin}${min}:${zeroSec}${sec}`}</span>
      <div>Ходы <span className = "wrong-count" >{wrongCount}</span>/<span className = "correct-count">{correctCount}</span></div>
    </nav>
    <Menu active={menuActive} setActive={setMenuActive} header={'Memory Game'} items={items} cards={cards} cardCars={cardCars} cardFruits={cardFruits} setSizeCards={setSizeCards} pairOfCards = {pairOfCards}  SetPairOfCards = {SetPairOfCards} setStyleCards = {setStyleCards} setplayGameCard={setplayGameCard} setVolumeCard = {setVolumeCard} volumeCard = {volumeCard} setStartTimer = {setStartTimer} setMatched = {setMatched} setopenCard = {setopenCard} setSec= {setSec} setMin = {setMin} SetCorrectCount = {SetCorrectCount} SetWrongCount = {SetWrongCount} setUpBound = {setUpBound} setDownBound = {setDownBound} setSelectCard = {setSelectCard} selectCard = {selectCard} handleFlip = {handleFlip} setGameWin = {setGameWin} setResumeGame = {setResumeGame} resumeGame = {resumeGame} setAnime = {setAnime} sec={sec} min={min} correctCount={correctCount} wrongCount={wrongCount}/>
    <div className={`cards ${sizeCards}`}>
        {pairOfCards.map((card, index) => {
          let flipCard ;
          flipCard = false;
          
          if (openCard.includes(index)) flipCard = true;
          if (matched.includes(card.id)) flipCard = true;
        
          return <div className={`card ${flipCard || anime ? 'flipped' : ''}`} key={index} onClick={() => handleFlip(index)}>
            <div className='inner'>
              <div className={`front ${selectCard === index ? 'select' : ''}`}>
                <img className='imgcard' src={`./image/${card.name}.png`} alt={`${card.name}`} width='100' onClick={e => e.stopPropagation()}/>
              </div>
              <div className={`back ${selectCard === index ? 'select' : ''}`} style={{backgroundImage: 'url(' + styleCards +'.jpg)'}}></div>
            </div>
          </div>
        })}
    </div>
  </div>
  <div className = 'footer'>
  <a href="https://github.com/Natallia22">
  <img className = 'img-git' src='./image/git.png' alt='git'></img> </a>
  <p className ='text-footer'>2021</p>
  <a href='https://rs.school/js/'> <img className = 'img-logo' src='https://rs.school/images/rs_school_js.svg' alt='rfh'></img> </a>
  </div>
  </div>
  
  )

}

export default App;

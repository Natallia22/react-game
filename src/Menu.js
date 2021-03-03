import React, { useEffect, useState } from "react";
import useSound from 'use-sound';
import "./menu.css";
import Statistics from "./Statistics"

function Menu({ header, items, active, setActive, cards, cardFruits, cardCars, pairOfCards, SetPairOfCards, setSizeCards, setStyleCards, setplayGameCard, setVolumeCard, volumeCard, setStartTimer, setMatched, setopenCard, setSec, setMin, SetCorrectCount, SetWrongCount, setUpBound, setDownBound, setSelectCard, handleFlip, setGameWin, setResumeGame, resumeGame, setAnime, sec, min, correctCount, wrongCount }) {

    const arrayCategory = ['животные', 'фрукты', 'машины'];
    const arraySizeField = [10, 8, 6, 3];
    const arrayStyle = ['нету', 'пики', 'черви', 'крести', 'бубы'];

    const [categoryCard, setcategoryCard] = useState(JSON.parse(localStorage.getItem('myCategoryCard')) || arrayCategory[0]);
    const [categoryCardMain, setCategoryCardMain] = useState(JSON.parse(localStorage.getItem('myCategoryMain')) || cards)

    const [sizeField, setsizeField] = useState(JSON.parse(localStorage.getItem('mySizeField')) || arraySizeField[0]);
    const [sizeFieldMain, setSizeFieldMain] = useState(10);

    const [styleCard, setStyleCard] = useState(JSON.parse(localStorage.getItem('myStyleCard')) || arrayStyle[0]);
    
    const [statisticsActive, setStatisticsActive] = useState(false);

    const [liActive, setLiActive] = useState(false);

    const [position, setPosition] = useState (JSON.parse(localStorage.getItem('myPosition')) || [...Array(20).keys()])


    function handleLiActive(index) {
        if (index === 0) {setActive(false); setStartTimer(true)}
        if (index === 1) {newGame()};
        if (index === 2) setLiActive(true);
        if (index === 3) {newGame(); arrStart(); setStartAuto(true)};
        if (index === 4) setStatisticsActive(true)
        if (index === 5) {requestFullScreen(document.body)}
    }

    function requestFullScreen(element) {
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        if (requestMethod) {
            requestMethod.call(element);
        } 
    }

    function resetSittings () {
        setResumeGame(false)
        setMatched([]);
        setopenCard([]);
        setSec(0); setMin(0);
        SetCorrectCount(0);
        SetWrongCount(0);
        setSelectCard(-1);
    }

    function handleCategory() {
        let arrayCategoryIndex = arrayCategory.indexOf(categoryCard) + 1
        if (arrayCategoryIndex === 3) {
            arrayCategoryIndex = 0
        }
        setcategoryCard(arrayCategory[arrayCategoryIndex])
        structureCategories(arrayCategory[arrayCategoryIndex])
        if(sizeField === sizeFieldMain) {
            if ((arrayCategoryIndex) === 0) {
                resetSittings();
                const newarr = cards.slice(0, sizeFieldMain)
                return SetPairOfCards([...newarr, ...newarr])
            }
            if ((arrayCategoryIndex) === 1) {
                resetSittings();
                const newarr = cardFruits.slice(0, sizeFieldMain)
                return SetPairOfCards([...newarr, ...newarr])
            }
            if ((arrayCategoryIndex) === 2) {
                resetSittings();
                const newarr = cardCars.slice(0, sizeFieldMain)
                return SetPairOfCards([...newarr, ...newarr])
            }
        }
        
    }

    function structureCategories(category) {
        if (category === 'животные') setCategoryCardMain(cards)
        if (category === 'фрукты') setCategoryCardMain(cardFruits)
        if (category === 'машины') setCategoryCardMain(cardCars)
    }

    function setField() {
        let arraySizeFieldIndex = arraySizeField.indexOf(sizeField) + 1
        if (arraySizeFieldIndex === 4) {
            arraySizeFieldIndex = 0
        }
        setsizeField(arraySizeField[arraySizeFieldIndex])
        setSizeFieldMain(arraySizeField[arraySizeFieldIndex])
            if ((arraySizeFieldIndex) === 1) {
                const newarr = categoryCardMain.slice(0, 8)
                setSizeCards('eight');
                resetSittings();
                setDownBound(11);
                setUpBound(4);
                setPosition([...Array(16).keys()])
                return SetPairOfCards([...newarr, ...newarr])
            }
            if ((arraySizeFieldIndex) === 2) {
                const newarr = categoryCardMain.slice(0, 6)
                setSizeCards('six');
                resetSittings();
                setDownBound(8);
                setUpBound(3);
                setPosition([...Array(12).keys()])
                return SetPairOfCards([...newarr, ...newarr])
            }
            if ((arraySizeFieldIndex) === 0) {
                const newarr = categoryCardMain.slice(0, 10)
                setSizeCards('');
                resetSittings();
                setDownBound(14);
                setUpBound(5);
                setPosition([...Array(20).keys()])
                return SetPairOfCards([...newarr, ...newarr])
            }
            if ((arraySizeFieldIndex) === 3) {
                const newarr = categoryCardMain.slice(0, 3)
                setSizeCards('three');
                resetSittings();
                setDownBound(2);
                setUpBound(3);
                setPosition([...Array(6).keys()])
                return SetPairOfCards([...newarr, ...newarr])
            }
    }

    function setStyle() {
        let arrayStyleIndex = arrayStyle.indexOf(styleCard) + 1
        if (arrayStyleIndex === 5) {
            arrayStyleIndex = 0
        }
        setStyleCard(arrayStyle[arrayStyleIndex])
        switch (arrayStyleIndex) {
            case 0:
                setStyleCards('')
                break;
            
            case 1:
                setStyleCards('piki')
                break;

            case 2:
                setStyleCards('chervi')
                break;

            case 3:
                setStyleCards('kresti') 
                break;

            case 4:
                setStyleCards('bybi')
                break;
            
            default:
                break;
        }
    }

    const soundUrl = './image/level.mp3';
    const toggleSound = ['Выкл', 'Вкл']
    const [playGame, setplayGame] = React.useState(toggleSound[0]);
    const [volume, setVolume] = useState(0.1);
    const arrVolumeSound = ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%']
    const [volumeSound, setVolumeSound] = useState(JSON.parse(localStorage.getItem('myVolumeSound')) || arrVolumeSound[0])
    const [play, { stop }] = useSound(soundUrl, {
        playGame,
        volume,
    });
    const handleClickSound = () => {
        let toggleSoundIndex = toggleSound.indexOf(playGame) + 1
        if (toggleSoundIndex === 2) toggleSoundIndex = 0;
        setplayGame(toggleSound[toggleSoundIndex])
        toggleSoundIndex === 0 ? stop() : play()
    };
    const regulateSound = () => {
        let toggleVolumeIndex = arrVolumeSound.indexOf(volumeSound) + 1
        if (toggleVolumeIndex === 10) toggleVolumeIndex = 0;
        volume > 0.9? setVolume(0.1) : setVolume(volume => volume + 0.1)
        setVolumeSound(arrVolumeSound[toggleVolumeIndex])   
    };
    const toggleSoundCard = ['Выкл', 'Вкл']
    const [playGameCards, setplayGameCards] = React.useState(toggleSound[1]);
    const [volumeSoundCard, setVolumeSoundCard] = useState(JSON.parse(localStorage.getItem('myVolumeSoundCard')) || arrVolumeSound[0])
    const handleClickSwitch = () => {
        let toggleSoundIndexCard = toggleSoundCard.indexOf(playGameCards) + 1
        if (toggleSoundIndexCard === 2) toggleSoundIndexCard = 0;
        toggleSoundIndexCard ? setplayGameCard(true) : setplayGameCard(false)
        setplayGameCards(toggleSoundCard[toggleSoundIndexCard])
    };
    const regulateSoundCard = () => {
        let toggleVolumeIndex = arrVolumeSound.indexOf(volumeSoundCard) + 1
        if (toggleVolumeIndex === 10) toggleVolumeIndex = 0;
        volumeCard > 0.9? setVolumeCard(0.1) : setVolumeCard( volumeCard =>  volumeCard + 0.1)
        setVolumeSoundCard(arrVolumeSound[toggleVolumeIndex])   
    };
    const [startAuto, setStartAuto] = useState(false)

    function newGame() {
        setAnime(true)
        setTimeout(() => {
            setAnime(false)
        },500)
            setActive(false)
            setStartTimer(true)
            setResumeGame(true)
            setMatched([]);
            setopenCard([]);
            setSec(0); setMin(0);
            SetCorrectCount(0);
            SetWrongCount(0);
            setGameWin(false);
            SetPairOfCards(pairOfCards.sort(() => Math.random() - 0.5))
    }
    

    
    const [twoCards, setTwoCards] = useState([]);
    const [arrNew, setArrNew] = useState([])
    

    function arrStart () {
            const arr = [];
            pairOfCards.map((card) => {
                arr.push(card.name)
            })
            setArrNew(arr)
    }

    useEffect(() => {
        let firstCardTimer;
        let secondCardTimer;
        if (startAuto) {
            firstCardTimer = setTimeout(() => {
                let secondCardIndex = arrNew.lastIndexOf(arrNew[position[0]])
                setSelectCard(position[0]);
                handleFlip(position[0]);
                let secondCard = position.lastIndexOf(secondCardIndex)
                let removedsecond = position.splice(secondCard, 1)
                let removedfirst = position.splice(0, 1, removedsecond[0])
            }, 2000)
            secondCardTimer = setTimeout (() => {
                setSelectCard(position[0]);
                handleFlip(position[0]);
                position.splice(0, 1)
                setTwoCards([]);
            }, 2500)
        }
        if (position.length === 0){
            clearInterval(firstCardTimer);
            clearInterval(secondCardTimer);
        }
      }, [startAuto, twoCards]);

    useEffect(() => {
        
        localStorage.setItem('myCategoryCard', JSON.stringify(categoryCard));
        localStorage.setItem('myCategoryMain', JSON.stringify(categoryCardMain));
        localStorage.setItem('mySizeField', JSON.stringify(sizeField));
        localStorage.setItem('myStyleCard', JSON.stringify(styleCard));
        localStorage.setItem('myPosition', JSON.stringify(position));
        localStorage.setItem('myVolumeSound', JSON.stringify(volumeSound));
        localStorage.setItem('myVolumeSoundCard', JSON.stringify(volumeSoundCard));

        
        }, [categoryCardMain, sizeField, categoryCard, styleCard, position, volumeSound, volumeSoundCard ]);


    return (
        <div className={active ? 'menu active' : 'menu'} onClick={() => setActive(true)}>
            <div className='blur'></div>
            <div className='menu__content' onClick={e => e.stopPropagation()}>
                <div className='menu__header'>{header}</div>
                <ul style={statisticsActive || liActive ? { display: 'none' } : { display: 'flex' }}>
                    {items.map((item, index) =>
                        <li key={item.value} style={resumeGame ? item.styleblock : item.stylenone} onClick={() => handleLiActive(index)}>
                            <a key={item.value} href={item.href}> {item.value}  </a>
                        </li>
                    )}
                </ul>
                <Statistics statisticsActive={statisticsActive} setStatisticsActive={setStatisticsActive} sec={sec} min={min} correctCount={correctCount} wrongCount={wrongCount} sizeField={sizeField} />
                <ul className={liActive ? 'settings active' : 'settings'}>
                    <li>Глобальные настройки</li>
                    <ul>
                        <li>Категория <span className="settings__value" onClick={handleCategory}>{categoryCard}</span></li>
                        <li>Размер поля <span className="settings__value" onClick={setField}>{sizeField}</span></li>
                        <li>Рубашка карточек <span className="settings__value"onClick={setStyle}>{styleCard}</span></li>
                    </ul>

                    <li> Настройки звука</li>
                    <ul>
                        <li onClick={handleClickSound}>Звук игры <span className="settings__value">{playGame}</span></li>
                        <li onClick={handleClickSwitch}>Звук карточек <span className="settings__value">{playGameCards}</span></li>
                        <li onClick={regulateSound}>Громкость игры   <span className="settings__value" >{volumeSound}</span></li>
                        <li onClick={regulateSoundCard}>Громкость карточек <span className="settings__value">{volumeSoundCard}</span></li>
                    </ul>
                    <li className="btn-back" onClick={() => setLiActive(false)}>назад</li>
                </ul>
            </div>
        </div>
    )
}

export default Menu;

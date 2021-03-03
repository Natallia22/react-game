import "./statistics.css";

function Statistics({ statisticsActive, setStatisticsActive, sec, min, correctCount, wrongCount, sizeField }) {
    const tableStatistics = ['Номер игрока', 'Размер поля', 'Время', 'Верные шаги', 'Неверные шаги', 'Набранные баллы']
    const trStatistics = [...Array(8).keys()]

    return (
        <div className={statisticsActive ? 'statistics_active' : 'statistics'}>
            <table >
                <thead>
                    <tr>
                        {tableStatistics.map((column, index) => {
                            return <th key={index}>{column}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {trStatistics.map((row, index) => {
                        if (index === 0)
                            return <tr key={index}>
                                <td>1</td>
                                <td>{sizeField}</td>
                                <td>{`${min}:${sec}`}</td>
                                <td>{correctCount}</td>
                                <td>{wrongCount}</td>
                                <td>{100 - (sec/2 + wrongCount)}</td>
                            </tr>
                        else return <tr key={index}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    })}
                </tbody>
            </table>
            <button className="btn-back__stat" onClick={() => setStatisticsActive(false)}>назад</button>
        </div>
    )
}

export default Statistics;
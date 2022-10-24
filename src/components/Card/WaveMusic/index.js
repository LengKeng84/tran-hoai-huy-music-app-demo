function WaveMusic({ primary1, primary2 }) {
    return (
        <div>
            {primary1 && (
                <div className="flex justify-center items-center opacity-80">
                    <div className="waveMusic1 w-[6px] h-[10px] rounded-[10px] mx-[2px] bg-[pink] "></div>
                    <div className="waveMusic2 w-[6px] h-[10px] rounded-[10px] mx-[2px] bg-[yellow] "></div>
                    <div className="waveMusic3 w-[6px] h-[10px] rounded-[10px] mx-[2px] bg-[green] "></div>
                    <div className="waveMusic4 w-[6px] h-[10px] rounded-[10px] mx-[2px] bg-[blue] "></div>
                    <div className="waveMusic5 w-[6px] h-[10px] rounded-[10px] mx-[2px] bg-[red] "></div>
                    <div className="waveMusic6 w-[6px] h-[10px] rounded-[10px] mx-[2px] bg-[pink] "></div>
                    <div className="waveMusic7 w-[6px] h-[10px] rounded-[10px] mx-[2px] bg-[orange] "></div>
                    <div className="waveMusic8 w-[6px] h-[10px] rounded-[10px] mx-[2px] bg-[black] "></div>
                    <div className="waveMusic9 w-[6px] h-[10px] rounded-[10px] mx-[2px] bg-[purple] "></div>
                </div>
            )}
            {primary2 && (
                <div className="h-[10px] flex justify-center items-end">
                    <div className="waveMusic1_2 w-[3px] h-[2px] mx-[1px] bg-[red]"></div>
                    <div className="waveMusic2_2 w-[3px] h-[2px] mx-[1px] bg-[yellow]"></div>
                    <div className="waveMusic3_2 w-[3px] h-[2px] mx-[1px] bg-[blue]"></div>
                    <div className="waveMusic4_2 w-[3px] h-[2px] mx-[1px] bg-[green]"></div>
                    <div className="waveMusic5_2 w-[3px] h-[2px] mx-[1px] bg-[purple]"></div>
                </div>
            )}
        </div>
    );
}

export default WaveMusic;

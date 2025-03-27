"use client"
import { useState, useEffect } from "react";

export default function Scoreboard() {
    const [scoreRed, setScoreRed] = useState(0);
    const [scoreBlue, setScoreBlue] = useState(0);
    const [faultsRedCat1, setFaultsRedCat1] = useState(0);
    const [faultsRedCat2, setFaultsRedCat2] = useState(0);
    const [faultsBlueCat1, setFaultsBlueCat1] = useState(0);
    const [faultsBlueCat2, setFaultsBlueCat2] = useState(0);
    const [time, setTime] = useState(180);
    const [running, setRunning] = useState(false);
    const [senchu] = useState("");

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (running && time > 0) {
            timer = setInterval(() => setTime((prev) => prev - 1), 1000);
            if (time === 16) {
                new Audio("/15sec-warning.mp3").play();
            }
        } else if (time === 0) {
            setRunning(false);
        }
        return () => clearInterval(timer);
    }, [running, time]);

    useEffect(() => {
        if (scoreRed >= scoreBlue + 8 || scoreBlue >= scoreRed + 8) {
            setRunning(false);
        }
        if (faultsRedCat1 + faultsRedCat2 >= 5 || faultsBlueCat1 + faultsBlueCat2 >= 5) {
            setRunning(false);
        }
    }, [scoreRed, scoreBlue, faultsRedCat1, faultsRedCat2, faultsBlueCat1, faultsBlueCat2]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <h1 className="text-4xl font-bold mb-6">Tableau de Pointage - Karaté Shotokan</h1>
            <div className="flex gap-10 text-center text-5xl font-bold relative">
                <div className="relative bg-red-700 p-8 rounded-lg shadow-xl w-1/3">
                    {senchu === "red" && <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-green-500"></div>}
                    <h2>Rouge</h2>
                    <p className="text-7xl">{scoreRed}</p>
                    <div className="flex justify-center gap-2 mt-4">
                        <button onClick={() => setScoreRed(scoreRed + 3)} className="bg-white text-black px-4 py-2 rounded">Ippon</button>
                        <button onClick={() => setScoreRed(scoreRed + 2)} className="bg-white text-black px-4 py-2 rounded">Wazaari</button>
                        <button onClick={() => setScoreRed(scoreRed + 1)} className="bg-white text-black px-4 py-2 rounded">Yuko</button>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-xl">Fautes</h3>
                        <p>Cat. 1: {faultsRedCat1}</p>
                        <p>Cat. 2: {faultsRedCat2}</p>
                        <div className="flex justify-center gap-2 mt-2">
                            <button onClick={() => setFaultsRedCat1(faultsRedCat1 + 1)} className="bg-gray-500 px-4 py-2 rounded">+ Cat.1</button>
                            <button onClick={() => setFaultsRedCat2(faultsRedCat2 + 1)} className="bg-gray-500 px-4 py-2 rounded">+ Cat.2</button>
                        </div>
                    </div>
                </div>
                <div className="relative bg-blue-700 p-8 rounded-lg shadow-xl w-1/3">
                    {senchu === "blue" && <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-green-500"></div>}
                    <h2>Bleu</h2>
                    <p className="text-7xl">{scoreBlue}</p>
                    <div className="flex justify-center gap-2 mt-4">
                        <button onClick={() => setScoreBlue(scoreBlue + 3)} className="bg-white text-black px-4 py-2 rounded">Ippon</button>
                        <button onClick={() => setScoreBlue(scoreBlue + 2)} className="bg-white text-black px-4 py-2 rounded">Wazaari</button>
                        <button onClick={() => setScoreBlue(scoreBlue + 1)} className="bg-white text-black px-4 py-2 rounded">Yuko</button>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-xl">Fautes</h3>
                        <p>Cat. 1: {faultsBlueCat1}</p>
                        <p>Cat. 2: {faultsBlueCat2}</p>
                        <div className="flex justify-center gap-2 mt-2">
                            <button onClick={() => setFaultsBlueCat1(faultsBlueCat1 + 1)} className="bg-gray-500 px-4 py-2 rounded">+ Cat.1</button>
                            <button onClick={() => setFaultsBlueCat2(faultsBlueCat2 + 1)} className="bg-gray-500 px-4 py-2 rounded">+ Cat.2</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center w-1/3 mb-4 mt-6">
                <h2 className="text-6xl">⏱️ {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}</h2>
                <div className="flex justify-center gap-4 mt-4">
                    <button onClick={() => setTime(180)} className="bg-gray-500 px-6 py-3 rounded">Seniors (3 min)</button>
                    <button onClick={() => setTime(120)} className="bg-gray-500 px-6 py-3 rounded">Cadets (2 min)</button>
                    <button onClick={() => setTime(90)} className="bg-gray-500 px-6 py-3 rounded">Pupilles (1m30s)</button>
                </div>
                <button onClick={() => setRunning(!running)} className="bg-green-500 px-6 py-3 rounded mt-2 w-full">{running ? "Pause" : "Démarrer"}</button>
                <button onClick={() => { setTime(180); setRunning(false); setScoreRed(0); setScoreBlue(0); setFaultsRedCat1(0); setFaultsRedCat2(0); setFaultsBlueCat1(0); setFaultsBlueCat2(0); }} className="bg-red-500 px-6 py-3 rounded mt-2 w-full">Reset</button>
            </div>
        </div>
    );
}//

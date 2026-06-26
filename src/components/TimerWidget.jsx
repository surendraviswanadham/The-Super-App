import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, AlertOctagon, ChevronUp, ChevronDown } from "lucide-react";

const TimerWidget = () => {
  // Timer settings (Hours, Minutes, Seconds)
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Countdown state
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const timerRef = useRef(null);

  // SVG Progress Ring calculations
  const radius = 64;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  
  const progress = totalSeconds > 0 ? timeLeft / totalSeconds : 0;
  const strokeDashoffset = circumference * (1 - progress);

  // Handle countdown loop
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsExpired(true);
            triggerAlarm();
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  // Clean, self-contained Web Audio synthesizer alarm
  const triggerAlarm = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const audioCtx = new AudioContext();
      
      const playChime = (time, frequency, duration) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(frequency, time);
        
        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration - 0.05);
        
        osc.start(time);
        osc.stop(time + duration);
      };

      const now = audioCtx.currentTime;
      // Beautiful major triad arpeggio chime
      playChime(now, 523.25, 0.35); // C5
      playChime(now + 0.3, 659.25, 0.35); // E5
      playChime(now + 0.6, 783.99, 0.5); // G5
    } catch (e) {
      console.warn("Autoplay block: user must interact with DOM first.", e);
    }
  };

  // Timer controls
  const handleStart = () => {
    if (isRunning) return;

    // If starting fresh or resuming
    if (timeLeft === 0) {
      const calculatedTotal = hours * 3600 + minutes * 60 + seconds;
      if (calculatedTotal === 0) return; // Ignore blank entries
      setTotalSeconds(calculatedTotal);
      setTimeLeft(calculatedTotal);
    }
    
    setIsRunning(true);
    setIsExpired(false);
  };

  const handlePause = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTotalSeconds(0);
    setTimeLeft(0);
    setIsExpired(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  // Adjust selectors (up/down clicks)
  const adjustValue = (type, action) => {
    if (isRunning) return; // Lock inputs during run
    
    if (type === "hours") {
      setHours((prev) => {
        if (action === "inc") return prev < 99 ? prev + 1 : 0;
        return prev > 0 ? prev - 1 : 99;
      });
    } else if (type === "minutes") {
      setMinutes((prev) => {
        if (action === "inc") return prev < 59 ? prev + 1 : 0;
        return prev > 0 ? prev - 1 : 59;
      });
    } else if (type === "seconds") {
      setSeconds((prev) => {
        if (action === "inc") return prev < 59 ? prev + 1 : 0;
        return prev > 0 ? prev - 1 : 59;
      });
    }
  };

  // Format display helper
  const formatTime = (totalSecs) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const hasValueToStart = hours > 0 || minutes > 0 || seconds > 0 || timeLeft > 0;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between h-full bg-super-card border border-super-border rounded-2xl p-6 md:p-8 gap-8 shadow-xl relative overflow-hidden">
      {/* Circle Animation Panel */}
      <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="rgba(255,255,255,0.03)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active progress track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={isExpired ? "#ef4444" : "#72db85"}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
            style={{
              filter: isExpired ? "drop-shadow(0 0 8px rgba(239, 68, 68, 0.4))" : "drop-shadow(0 0 6px rgba(114, 219, 133, 0.2))",
            }}
          />
        </svg>

        {/* Center Text displaying status */}
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
          {isExpired ? (
            <div className="flex flex-col items-center text-red-500 animate-pulse">
              <AlertOctagon className="w-6 h-6" />
              <span className="text-[10px] font-bold tracking-wider mt-1 uppercase">Expired</span>
            </div>
          ) : (
            <>
              <span className="font-outfit font-extrabold text-2xl tracking-wide text-white">
                {timeLeft > 0 ? formatTime(timeLeft) : formatTime(hours * 3600 + minutes * 60 + seconds)}
              </span>
              <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-widest">
                {isRunning ? "Running" : "Paused"}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Controls & Inputs Panel */}
      <div className="flex-1 w-full flex flex-col justify-center space-y-6">
        {/* Selector columns (Only show when not active) */}
        {!isRunning && timeLeft === 0 ? (
          <div className="flex items-center justify-center gap-6">
            {/* Hours Selector */}
            <div className="flex flex-col items-center space-y-1">
              <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-widest">Hours</span>
              <button onClick={() => adjustValue("hours", "inc")} className="p-1 hover:text-super-neon cursor-pointer transition-colors">
                <ChevronUp className="w-5 h-5" />
              </button>
              <span className="font-outfit font-bold text-3xl text-white w-10 text-center">
                {hours.toString().padStart(2, "0")}
              </span>
              <button onClick={() => adjustValue("hours", "dec")} className="p-1 hover:text-super-neon cursor-pointer transition-colors">
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
            
            <span className="font-outfit font-extrabold text-2xl text-zinc-700 select-none pb-2">:</span>

            {/* Minutes Selector */}
            <div className="flex flex-col items-center space-y-1">
              <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-widest">Minutes</span>
              <button onClick={() => adjustValue("minutes", "inc")} className="p-1 hover:text-super-neon cursor-pointer transition-colors">
                <ChevronUp className="w-5 h-5" />
              </button>
              <span className="font-outfit font-bold text-3xl text-white w-10 text-center">
                {minutes.toString().padStart(2, "0")}
              </span>
              <button onClick={() => adjustValue("minutes", "dec")} className="p-1 hover:text-super-neon cursor-pointer transition-colors">
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            <span className="font-outfit font-extrabold text-2xl text-zinc-700 select-none pb-2">:</span>

            {/* Seconds Selector */}
            <div className="flex flex-col items-center space-y-1">
              <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-widest">Seconds</span>
              <button onClick={() => adjustValue("seconds", "inc")} className="p-1 hover:text-super-neon cursor-pointer transition-colors">
                <ChevronUp className="w-5 h-5" />
              </button>
              <span className="font-outfit font-bold text-3xl text-white w-10 text-center">
                {seconds.toString().padStart(2, "0")}
              </span>
              <button onClick={() => adjustValue("seconds", "dec")} className="p-1 hover:text-super-neon cursor-pointer transition-colors">
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 select-none">
            <p className="text-zinc-400 text-sm font-medium tracking-wide">
              {isRunning 
                ? "Countdown in progress..." 
                : isExpired 
                  ? "Timer elapsed! Click reset to configure a new limit." 
                  : "Timer paused."
              }
            </p>
          </div>
        )}

        {/* Buttons Control Row */}
        <div className="flex justify-center items-center gap-4">
          {isRunning ? (
            <button
              onClick={handlePause}
              className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-md hover:shadow-lg"
            >
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={handleStart}
              disabled={!hasValueToStart}
              className={`px-6 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all ${
                hasValueToStart
                  ? "bg-super-green hover:bg-super-neon text-white hover:text-black cursor-pointer shadow-md hover:shadow-lg"
                  : "bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700/50"
              }`}
            >
              <Play className="w-4 h-4" />
              <span>{timeLeft > 0 ? "Resume" : "Start"}</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerWidget;

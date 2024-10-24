"use client";

import React, { useState, useEffect } from 'react';

export default function TimerButton() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/submitTime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ time })
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
      } else {
        console.error('サーバーエラーが発生しました');
      }
    } catch (error) {
      console.error('エラーが発生しました:', error);
    }
  };

  return (
    <>
      <h1>タイマー: {time} 秒</h1>
      <button type='button' onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? '停止' : '開始'}
      </button>
      <button type='button' onClick={() => setTime(0)}>リセット</button>
      <button type='button' onClick={handleSubmit}>結果を送信</button>
    </>
  );
}

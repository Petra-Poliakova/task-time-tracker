let timerValue: number = 0;
let timerInterval: ReturnType<typeof setTimeout> | undefined;

// // Load timerValue from chrome.storage.local when the extension is loaded
// chrome.storage.local.get("timerValue", (result) => {
//   if (result.timerValue !== undefined) {
//     timerValue = result.timerValue;
//   }
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.startTimer) {
    if (!timerInterval) {
      timerInterval = setInterval(() => {
        timerValue += 1;
        chrome.storage.local.set({ timerValue });
      }, 1000);
    }
  } else if (message.stopTimer) {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = undefined;
    }
    chrome.storage.local.set({ timerValue });
  }
});

chrome.storage.local.get(["timerValue"], (res) => {
    chrome.storage.local.set({
      timerValue: "timerValue" in res ? res.timerValue : 0,
      // isTimerRunning: "isTimerRunning" in res ? res.isTimerRunning : false,
      // timerData: "timerData" in res ? res.timerData : {}
    });
  }
);


//https://www.youtube.com/watch?v=qwEFy4FTbNY&list=PLxOYpovHh6ISG4dqNfckBiuoT2eXMC5iU
//https://www.youtube.com/watch?v=tOHpufRbsJc
//https://www.youtube.com/watch?v=y3FF1QxKu5E

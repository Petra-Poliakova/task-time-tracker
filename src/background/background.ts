let timerValue: number = 0;
let timerInterval: ReturnType<typeof setTimeout> | undefined;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.startTimer) {
    if (!timerInterval) {
      timerInterval = setInterval(() => {
        timerValue += 1;
        // Uložte timerValue do chrome.storage.local, ak je to potrebné
        chrome.storage.local.set({ timerValue });
      }, 1000);
    }
  } else if (message.stopTimer) {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = undefined;
    }
    // Uložte timerValue do chrome.storage.local, ak je to potrebné
    chrome.storage.local.set({ timerValue });
  }
});

chrome.storage.local.get(
  ["timerValue", "isTimerRunning", "timerData"],
  (res) => {
    chrome.storage.local.set({
      timerValue: "timerValue" in res ? res.timerValue : 0,
      imerData: "timerData" in res ? res.timerData : {},
      isTimerRunning: "isTimerRunning" in res ? res.isTimerRunning : false,
    });
  }
);

// try{
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if(changeInfo.status === 'complete' && tab.id !== undefined) {
//         chrome.scripting.executeScript({
//             files: ['injectContent.js'],
//             target: {tabId: tab.id as number},
//         })
//     }
// });
// }catch(e){
//     console.log(e);
//   }
// chrome.storage.local.get(['activeTask'], (res) => {
//     chrome.storage.local.set({
//         activeTask: "activeTask" in res ? res.activeTask : []
//     })

// })

//https://www.youtube.com/watch?v=qwEFy4FTbNY&list=PLxOYpovHh6ISG4dqNfckBiuoT2eXMC5iU
//https://www.youtube.com/watch?v=tOHpufRbsJc
//https://www.youtube.com/watch?v=y3FF1QxKu5E

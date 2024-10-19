import type { Action } from "wxt/browser";

export default defineBackground(() => {
  browser.storage.sync.get('color').then(res => res.color && (color = res.color ));
  const size = 128
  let color = '#d84942'
  let oldTime = ''

  function createIcon() {
    const now = new Date();
    const minutes = (now.getMinutes() + '').padStart(2, '0')
    if (oldTime === minutes) return
    
    const hours = (now.getHours() + '').padStart(2, '0')
    oldTime = minutes

    const canvas = new OffscreenCanvas(size, size);
    const ctx = canvas.getContext("2d")!;

    ctx.font = "bold 8em monospace";
    ctx.fillStyle = color;
    ctx.fillText(hours, size / 2 * 0.5, 60);
    ctx.fillText(minutes, size / 2 * 0.5, size);
  
    return ctx.getImageData(0, 0, size, size) as Action.ImageDataType
  }

  function updateIcon() {
    try {
      const svgIcon = createIcon();
      if (!svgIcon) return

      browser.action.setIcon({ imageData: svgIcon }).catch(error => {
        console.error('设置图标时出错:', error);
      });
    } catch (error) {
      console.error('生成图标 URL 时出错:', error);
    }
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message === 'updateIcon') {
      browser.storage.sync.get('color').then(res => {
        color = res.color;
        updateIcon()
      });
    }
  })

  browser.runtime.onInstalled.addListener(() => {
    updateIcon()
    setInterval(updateIcon, 3e3)
  })

  browser.alarms.create("updateIcon", { periodInMinutes: 0.5 }); 
  browser.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "updateIcon") {
      updateIcon()
    }
  });
})

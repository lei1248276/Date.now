import type { Action } from "wxt/browser";

export default defineBackground(() => {
  const size = 128
  const canvas = new OffscreenCanvas(size, size);
  const ctx = canvas.getContext("2d")!;
  let color = '#d84942'
  let oldTime = ''

  function createIcon(force?: boolean) {
    const now = new Date();
    const minutes = (now.getMinutes() + '').padStart(2, '0')
    if (!force && oldTime === minutes) return
    
    const hours = (now.getHours() + '').padStart(2, '0')
    oldTime = minutes

    ctx.clearRect(0, 0, size, size);
    ctx.font = "bold 8em monospace";
    ctx.fillStyle = color;
    ctx.fillText(hours, size / 2 * 0.5, 60);
    ctx.fillText(minutes, size / 2 * 0.5, size);
  
    return ctx.getImageData(0, 0, size, size) as Action.ImageDataType
  }

  function updateIcon(svgIcon = createIcon()) {
    if (!svgIcon) return

    browser.action.setIcon({ imageData: svgIcon }).catch(error => {
      console.error('设置图标时出错:', error);
    });
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message === 'updateIcon') {
      browser.storage.sync.get('color').then(res => {
        color = res.color;
        updateIcon(createIcon(true))
      });
    }
  })

  browser.management.getSelf((extensionInfo) => {
    if (extensionInfo.enabled) {
      browser.storage.sync.get('color').then(res => {
        res.color && (color = res.color )
        updateIcon(createIcon(true))
        setInterval(updateIcon, 3e3)
      })
    }
  });

  browser.alarms.create("updateIcon", { periodInMinutes: 0.5 }); 
  browser.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "updateIcon") {
      updateIcon()
    }
  });
})

// 애플리케이션 생명 주기 및 기본 브라우저 창을 제어하는 모듈들
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import serve from 'electron-serve';
import Store from 'electron-store';

const loadURL = serve({ directory: 'public' });

// Store 초기화
const store = new Store();

// 창 객체의 전역 참조를 유지하세요. 그렇지 않으면 자바스크립트 객체가 가비지 컬렉션될 때 창이 자동으로 닫힙니다.
let mainWindow;

function isDev() {
  return !app.isPackaged; // 개발 모드인지 확인하는 함수
}

function createWindow() {
  // 브라우저 창을 생성합니다.
  mainWindow = new BrowserWindow({
    width: 500,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.resolve(path.dirname(''), 'preload.js'), // ESM에서는 __dirname 대체
      // enableRemoteModule: true,
      // contextIsolation: false
    },
    icon: path.resolve(path.dirname(''), 'public/favicon.png'),
    show: false // 창을 먼저 숨겨두고, 준비되면 보이도록 설정
  });

  // 이 코드는 개발 목적으로만 사용됩니다.
  // 애플리케이션을 패키징할 준비가 되면 이 코드를 삭제하세요.
  if (isDev()) {
    mainWindow.loadURL('http://localhost:8080/'); // 개발 서버 URL 로드
  } else {
    loadURL(mainWindow); // 패키징된 애플리케이션에서 URL 로드
  }

  // 앱이 패키징될 준비가 되면 아래 주석을 해제하고 사용하세요.
  // loadURL(mainWindow);

  // 개발자 도구를 열고, Electron 보안 경고를 비활성화합니다.
  // process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
  // mainWindow.webContents.openDevTools();

  // 창이 닫힐 때 발생하는 이벤트
  mainWindow.on('closed', () => {
    // 창 객체를 해제합니다. 일반적으로 여러 창을 지원하는 애플리케이션이라면 창 객체를 배열에 저장하고 이 시점에 해당 요소를 삭제합니다.
    mainWindow = null;
  });

  // 창이 준비되었을 때 발생하는 이벤트
  // 창을 부드럽게 표시하는 데 도움이 됩니다.
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
}

// 데이터 저장/읽기 기능을 위한 IPC 핸들러
ipcMain.handle('store-get', (event, key) => {
  return store.get(key); // 특정 key에 대한 값을 반환합니다.
});

ipcMain.handle('store-set', (event, key, value) => {
  store.set(key, value); // 특정 key에 값을 저장합니다.
});

// 이 메소드는 Electron이 초기화되고 브라우저 창을 생성할 준비가 되었을 때 호출됩니다.
// 일부 API는 이 이벤트가 발생한 후에만 사용할 수 있습니다.
app.on('ready', createWindow);

// 모든 창이 닫힐 때 앱을 종료합니다.
app.on('window-all-closed', () => {
  // macOS에서는 애플리케이션과 메뉴 바가 사용자가 명시적으로 Cmd + Q로 종료할 때까지 활성 상태로 유지되는 것이 일반적입니다.
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  // macOS에서는 Dock 아이콘을 클릭하여 창을 재생성하는 것이 일반적입니다.
  // 다른 창이 열려 있지 않으면 새 창을 생성합니다.
  if (mainWindow === null) createWindow();
});

// 이 파일에는 애플리케이션의 나머지 주요 프로세스 코드를 포함할 수 있습니다.
// 다른 파일로 분리하여 여기에 가져올 수도 있습니다.

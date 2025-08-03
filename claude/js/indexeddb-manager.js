/**
 * IndexedDB 매니저 클래스
 * 사용자별 게임 데이터 저장 및 관리
 */
class IndexedDBManager {
    constructor() {
        this.dbName = 'DungeonMasterDB';
        this.version = 1;
        this.db = null;
    }

    /**
     * 데이터베이스 초기화
     */
    async initialize() {
        return new Promise((resolve, reject) => {
            if (!window.indexedDB) {
                reject(new Error('IndexedDB를 지원하지 않는 브라우저입니다.'));
                return;
            }

            const request = indexedDB.open(this.dbName, this.version);
            
            request.onerror = () => {
                console.error('IndexedDB 오픈 실패:', request.error);
                reject(request.error);
            };
            
            request.onsuccess = () => {
                this.db = request.result;
                console.log('IndexedDB 초기화 완료');
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                console.log('IndexedDB 업그레이드 시작');
                const db = event.target.result;
                this.createStores(db);
            };
        });
    }

    /**
     * 오브젝트 스토어 생성
     */
    createStores(db) {
        try {
            // users 스토어 - 사용자 정보 저장
            if (!db.objectStoreNames.contains('users')) {
                const userStore = db.createObjectStore('users', { keyPath: 'userId' });
                userStore.createIndex('lastLogin', 'lastLogin', { unique: false });
                userStore.createIndex('displayName', 'displayName', { unique: false });
                console.log('users 스토어 생성 완료');
            }
            
            // gameData 스토어 - 게임 세이브 데이터
            if (!db.objectStoreNames.contains('gameData')) {
                const gameStore = db.createObjectStore('gameData', { keyPath: ['userId', 'saveSlot'] });
                gameStore.createIndex('userId', 'userId', { unique: false });
                gameStore.createIndex('lastSaved', 'metadata.lastSaved', { unique: false });
                gameStore.createIndex('gameVersion', 'metadata.gameVersion', { unique: false });
                console.log('gameData 스토어 생성 완료');
            }

            // gameSettings 스토어 - 사용자별 설정
            if (!db.objectStoreNames.contains('gameSettings')) {
                const settingsStore = db.createObjectStore('gameSettings', { keyPath: 'userId' });
                console.log('gameSettings 스토어 생성 완료');
            }

            console.log('모든 스토어 생성 완료');
        } catch (error) {
            console.error('스토어 생성 실패:', error);
            throw error;
        }
    }

    /**
     * 트랜잭션 헬퍼 메서드
     */
    getTransaction(storeNames, mode = 'readonly') {
        if (!this.db) {
            throw new Error('데이터베이스가 초기화되지 않았습니다.');
        }
        return this.db.transaction(storeNames, mode);
    }

    /**
     * 사용자 로그인 기록 업데이트
     */
    async updateUserLogin(userId) {
        return new Promise((resolve, reject) => {
            try {
                const transaction = this.getTransaction(['users'], 'readwrite');
                const store = transaction.objectStore('users');
                
                const userData = {
                    userId: userId,
                    lastLogin: new Date(),
                    loginCount: 1
                };

                // 기존 사용자 데이터 확인
                const getRequest = store.get(userId);
                
                getRequest.onsuccess = () => {
                    if (getRequest.result) {
                        // 기존 사용자 업데이트
                        userData.loginCount = (getRequest.result.loginCount || 0) + 1;
                        userData.firstLogin = getRequest.result.firstLogin;
                    } else {
                        // 새 사용자
                        userData.firstLogin = new Date();
                    }

                    const putRequest = store.put(userData);
                    putRequest.onsuccess = () => resolve(userData);
                    putRequest.onerror = () => reject(putRequest.error);
                };

                getRequest.onerror = () => reject(getRequest.error);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * 게임 데이터 저장
     */
    async saveGameData(saveData) {
        return new Promise((resolve, reject) => {
            try {
                const transaction = this.getTransaction(['gameData'], 'readwrite');
                const store = transaction.objectStore('gameData');
                
                // 메타데이터 업데이트
                saveData.metadata.lastSaved = new Date();
                
                const request = store.put(saveData);
                
                request.onsuccess = () => {
                    console.log(`게임 데이터 저장 완료: ${saveData.userId} - 슬롯 ${saveData.saveSlot}`);
                    resolve(saveData);
                };
                
                request.onerror = () => {
                    console.error('게임 데이터 저장 실패:', request.error);
                    reject(request.error);
                };
            } catch (error) {
                console.error('saveGameData 오류:', error);
                reject(error);
            }
        });
    }

    /**
     * 게임 데이터 로드
     */
    async loadGameData(userId, saveSlot) {
        return new Promise((resolve, reject) => {
            try {
                const transaction = this.getTransaction(['gameData'], 'readonly');
                const store = transaction.objectStore('gameData');
                
                const request = store.get([userId, saveSlot]);
                
                request.onsuccess = () => {
                    const result = request.result;
                    if (result) {
                        console.log(`게임 데이터 로드 완료: ${userId} - 슬롯 ${saveSlot}`);
                        resolve(result);
                    } else {
                        console.log(`게임 데이터 없음: ${userId} - 슬롯 ${saveSlot}`);
                        resolve(null);
                    }
                };
                
                request.onerror = () => {
                    console.error('게임 데이터 로드 실패:', request.error);
                    reject(request.error);
                };
            } catch (error) {
                console.error('loadGameData 오류:', error);
                reject(error);
            }
        });
    }

    /**
     * 사용자의 모든 세이브 슬롯 가져오기
     */
    async getUserSaves(userId) {
        return new Promise((resolve, reject) => {
            try {
                const transaction = this.getTransaction(['gameData'], 'readonly');
                const store = transaction.objectStore('gameData');
                const index = store.index('userId');
                
                const request = index.getAll(userId);
                
                request.onsuccess = () => {
                    const saves = request.result || [];
                    console.log(`사용자 세이브 로드 완료: ${userId}, ${saves.length}개 세이브`);
                    resolve(saves);
                };
                
                request.onerror = () => {
                    console.error('사용자 세이브 로드 실패:', request.error);
                    reject(request.error);
                };
            } catch (error) {
                console.error('getUserSaves 오류:', error);
                reject(error);
            }
        });
    }

    /**
     * 세이브 슬롯 삭제
     */
    async deleteSaveSlot(userId, saveSlot) {
        return new Promise((resolve, reject) => {
            try {
                const transaction = this.getTransaction(['gameData'], 'readwrite');
                const store = transaction.objectStore('gameData');
                
                const request = store.delete([userId, saveSlot]);
                
                request.onsuccess = () => {
                    console.log(`세이브 슬롯 삭제 완료: ${userId} - 슬롯 ${saveSlot}`);
                    resolve(true);
                };
                
                request.onerror = () => {
                    console.error('세이브 슬롯 삭제 실패:', request.error);
                    reject(request.error);
                };
            } catch (error) {
                console.error('deleteSaveSlot 오류:', error);
                reject(error);
            }
        });
    }

    /**
     * 사용자 설정 저장
     */
    async saveUserSettings(userId, settings) {
        return new Promise((resolve, reject) => {
            try {
                const transaction = this.getTransaction(['gameSettings'], 'readwrite');
                const store = transaction.objectStore('gameSettings');
                
                const settingsData = {
                    userId: userId,
                    settings: settings,
                    lastUpdated: new Date()
                };
                
                const request = store.put(settingsData);
                
                request.onsuccess = () => {
                    console.log(`사용자 설정 저장 완료: ${userId}`);
                    resolve(settingsData);
                };
                
                request.onerror = () => {
                    console.error('사용자 설정 저장 실패:', request.error);
                    reject(request.error);
                };
            } catch (error) {
                console.error('saveUserSettings 오류:', error);
                reject(error);
            }
        });
    }

    /**
     * 사용자 설정 로드
     */
    async loadUserSettings(userId) {
        return new Promise((resolve, reject) => {
            try {
                const transaction = this.getTransaction(['gameSettings'], 'readonly');
                const store = transaction.objectStore('gameSettings');
                
                const request = store.get(userId);
                
                request.onsuccess = () => {
                    const result = request.result;
                    if (result) {
                        console.log(`사용자 설정 로드 완료: ${userId}`);
                        resolve(result.settings);
                    } else {
                        console.log(`사용자 설정 없음: ${userId}`);
                        resolve(null);
                    }
                };
                
                request.onerror = () => {
                    console.error('사용자 설정 로드 실패:', request.error);
                    reject(request.error);
                };
            } catch (error) {
                console.error('loadUserSettings 오류:', error);
                reject(error);
            }
        });
    }

    /**
     * 데이터베이스 통계 정보
     */
    async getStatistics() {
        return new Promise((resolve, reject) => {
            try {
                const stats = {
                    totalUsers: 0,
                    totalSaves: 0,
                    lastActivity: null
                };

                const transaction = this.getTransaction(['users', 'gameData'], 'readonly');
                let completed = 0;

                // 사용자 수 카운트
                const userStore = transaction.objectStore('users');
                const userCountRequest = userStore.count();
                
                userCountRequest.onsuccess = () => {
                    stats.totalUsers = userCountRequest.result;
                    completed++;
                    if (completed === 2) resolve(stats);
                };

                // 세이브 수 카운트
                const gameStore = transaction.objectStore('gameData');
                const saveCountRequest = gameStore.count();
                
                saveCountRequest.onsuccess = () => {
                    stats.totalSaves = saveCountRequest.result;
                    completed++;
                    if (completed === 2) resolve(stats);
                };

                transaction.onerror = () => reject(transaction.error);
            } catch (error) {
                console.error('getStatistics 오류:', error);
                reject(error);
            }
        });
    }

    /**
     * 데이터베이스 닫기
     */
    close() {
        if (this.db) {
            this.db.close();
            this.db = null;
            console.log('IndexedDB 연결 종료');
        }
    }

    /**
     * 데이터베이스 완전 삭제 (개발/테스트용)
     */
    static async deleteDatabase(dbName = 'DungeonMasterDB') {
        return new Promise((resolve, reject) => {
            const deleteRequest = indexedDB.deleteDatabase(dbName);
            
            deleteRequest.onsuccess = () => {
                console.log('데이터베이스 삭제 완료');
                resolve(true);
            };
            
            deleteRequest.onerror = () => {
                console.error('데이터베이스 삭제 실패:', deleteRequest.error);
                reject(deleteRequest.error);
            };
            
            deleteRequest.onblocked = () => {
                console.warn('데이터베이스 삭제가 차단됨 (다른 탭에서 사용 중)');
                reject(new Error('데이터베이스가 다른 곳에서 사용 중입니다.'));
            };
        });
    }

    /**
     * 백업 데이터 생성
     */
    async createBackup() {
        try {
            const backup = {
                version: this.version,
                timestamp: new Date(),
                data: {
                    users: [],
                    gameData: [],
                    gameSettings: []
                }
            };

            const transaction = this.getTransaction(['users', 'gameData', 'gameSettings'], 'readonly');
            
            // 모든 데이터 수집
            const promises = [
                this.getAllFromStore(transaction.objectStore('users')),
                this.getAllFromStore(transaction.objectStore('gameData')),
                this.getAllFromStore(transaction.objectStore('gameSettings'))
            ];

            const [users, gameData, gameSettings] = await Promise.all(promises);
            
            backup.data.users = users;
            backup.data.gameData = gameData;
            backup.data.gameSettings = gameSettings;

            console.log('백업 생성 완료:', backup);
            return backup;
        } catch (error) {
            console.error('백업 생성 실패:', error);
            throw error;
        }
    }

    /**
     * 스토어에서 모든 데이터 가져오기 (헬퍼 메서드)
     */
    getAllFromStore(store) {
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}
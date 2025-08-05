/**
 * 게임 코어 시스템
 * 게임 로직, 전투, 아이템, 스토리 관리
 */

// 게임 데이터 정의
const GAME_DATA = {
    // 몬스터 정보
    monsters: {
        // 1-10층
        goblin: { name: '고블린', hp: 30, attack: 8, defense: 2, exp: 15, gold: 10, description: '작고 못생긴 초록색 괴물입니다.' },
        bat: { name: '박쥐', hp: 20, attack: 6, defense: 1, exp: 10, gold: 5, description: '동굴에 서식하는 흡혈 박쥐입니다.' },
        slime: { name: '슬라임', hp: 40, attack: 5, defense: 5, exp: 12, gold: 8, description: '끈적끈적한 젤리 형태의 몬스터입니다.' },
        
        // 11-20층
        orc: { name: '오크', hp: 60, attack: 12, defense: 4, exp: 25, gold: 20, description: '강력한 근육을 가진 거대한 괴물입니다.' },
        skeleton: { name: '스켈레톤', hp: 45, attack: 10, defense: 3, exp: 20, gold: 15, description: '뼈만 남은 언데드 전사입니다.' },
        zombie: { name: '좀비', hp: 70, attack: 9, defense: 2, exp: 22, gold: 18, description: '썩어가는 시체가 되살아난 언데드입니다.' },

        // 21-30층
        golem: { name: '골렘', hp: 100, attack: 15, defense: 10, exp: 50, gold: 40, description: '마법으로 움직이는 돌 거인입니다.' },
        harpy: { name: '하피', hp: 80, attack: 18, defense: 6, exp: 45, gold: 35, description: '여성의 얼굴을 한 날개 달린 괴물입니다.' },
        troll: { name: '트롤', hp: 120, attack: 20, defense: 8, exp: 60, gold: 50, description: '재생력이 뛰어난 거대한 괴물입니다.' },

        // 31-40층
        ogre: { name: '오우거', hp: 150, attack: 25, defense: 12, exp: 80, gold: 70, description: '두꺼운 가죽과 거대한 몽둥이를 가진 괴물입니다.' },
        mummy: { name: '미라', hp: 130, attack: 22, defense: 15, exp: 75, gold: 65, description: '고대 저주에 걸린 언데드입니다.' },
        wyvern: { name: '와이번', hp: 180, attack: 30, defense: 18, exp: 100, gold: 90, description: '날개 달린 강력한 용족입니다.' },

        // 41-50층
        lich: { name: '리치', hp: 200, attack: 35, defense: 20, exp: 150, gold: 120, description: '강력한 마법을 사용하는 언데드 마법사입니다.' },
        chimera: { name: '키메라', hp: 250, attack: 40, defense: 22, exp: 180, gold: 150, description: '사자, 염소, 뱀의 머리를 가진 괴물입니다.' },
        minotaur: { name: '미노타우로스', hp: 300, attack: 45, defense: 25, exp: 200, gold: 180, description: '소 머리를 가진 강력한 전사입니다.' },

        // 51-60층
        demon: { name: '데몬', hp: 350, attack: 50, defense: 30, exp: 250, gold: 220, description: '지옥에서 온 악마입니다.' },
        succubus: { name: '서큐버스', hp: 300, attack: 45, defense: 28, exp: 230, gold: 200, description: '상대를 유혹하여 생명력을 빼앗는 악마입니다.' },
        shadow_beast: { name: '그림자 야수', hp: 400, attack: 55, defense: 35, exp: 280, gold: 250, description: '어둠으로 이루어진 실체 없는 야수입니다.' },

        // 61-70층
        hydra: { name: '히드라', hp: 500, attack: 60, defense: 40, exp: 350, gold: 300, description: '머리가 여러 개 달린 끔찍한 뱀입니다.' },
        beholder: { name: '비홀더', hp: 450, attack: 65, defense: 45, exp: 400, gold: 350, description: '여러 개의 눈으로 마법을 쏘는 괴물입니다.' },
        ancient_dragon: { name: '고대 드래곤', hp: 600, attack: 70, defense: 50, exp: 500, gold: 450, description: '수천 년을 산 전설의 용입니다.' },

        // 71-80층
        titan: { name: '타이탄', hp: 800, attack: 80, defense: 60, exp: 700, gold: 600, description: '신과 맞먹는 힘을 가진 거인족입니다.' },
        archdemon: { name: '아크데몬', hp: 750, attack: 85, defense: 55, exp: 650, gold: 550, description: '상급 악마 군주입니다.' },
        void_spawn: { name: '공허의 피조물', hp: 900, attack: 90, defense: 65, exp: 800, gold: 700, description: '공허에서 태어난 혼돈의 존재입니다.' },

        // 81-90층
        shadow_lord: { name: '그림자 군주', hp: 1200, attack: 100, defense: 70, exp: 1000, gold: 800, description: '어둠을 다스리는 강력한 존재입니다.' },
        chaos_beast: { name: '카오스 비스트', hp: 1500, attack: 120, defense: 80, exp: 1200, gold: 1000, description: '혼돈의 화신인 끔찍한 괴물입니다.' },
        celestial_guardian: { name: '천상의 수호자', hp: 1300, attack: 110, defense: 90, exp: 1100, gold: 900, description: '신성한 영역을 지키는 수호자입니다.' },

        // 91-100층
        void_emperor: { name: '공허의 황제', hp: 2500, attack: 150, defense: 100, exp: 2000, gold: 1500, description: '모든 것을 삼키는 공허의 지배자입니다.' },
        omega_sentinel: { name: '오메가 센티넬', hp: 3000, attack: 180, defense: 120, exp: 2500, gold: 2000, description: '세상의 종말을 감시하는 고대 병기입니다.' },
        god_of_dungeon: { name: '던전의 신', hp: 5000, attack: 250, defense: 150, exp: 5000, gold: 5000, description: '이 던전 그 자체이자, 최종 지배자입니다.' }
    },

    // 보스 정보
    bosses: {
        10: { name: '우두머리 고블린', hp: 150, attack: 20, defense: 8, exp: 100, gold: 100, description: '고블린들을 이끄는 거대한 우두머리입니다.' },
        20: { name: '오크 족장', hp: 300, attack: 35, defense: 15, exp: 250, gold: 200, description: '강력한 힘과 카리스마를 가진 오크들의 족장입니다.' },
        30: { name: '거대 골렘', hp: 500, attack: 40, defense: 30, exp: 500, gold: 400, description: '고대 유적의 심장부에서 깨어난 거대한 골렘입니다.' },
        40: { name: '고대 미라 왕', hp: 800, attack: 55, defense: 40, exp: 800, gold: 700, description: '저주받은 왕가의 무덤을 지키는 강력한 미라입니다.' },
        50: { name: '키메라 군주', hp: 1200, attack: 70, defense: 50, exp: 1200, gold: 1000, description: '모든 키메라를 지배하는 끔찍한 혼종입니다.' },
        60: { name: '밤의 여왕 서큐버스', hp: 1800, attack: 85, defense: 60, exp: 1800, gold: 1500, description: '악몽과 유혹의 힘을 사용하는 강력한 악마입니다.' },
        70: { name: '심연의 히드라', hp: 2500, attack: 100, defense: 70, exp: 2500, gold: 2200, description: '머리를 베어도 계속 재생하는 불멸의 괴수입니다.' },
        80: { name: '타이탄 파괴자', hp: 4000, attack: 120, defense: 85, exp: 4000, gold: 3500, description: '세상을 파괴하기 위해 태어난 거대한 타이탄입니다.' },
        90: { name: '그림자 대군주', hp: 6000, attack: 150, defense: 100, exp: 6000, gold: 5000, description: '모든 그림자를 다스리는 어둠의 절대자입니다.' },
        100: { name: '공허의 최종 지배자', hp: 9999, attack: 200, defense: 120, exp: 10000, gold: 9999, description: '던전의 가장 깊은 곳에서 모든 것을 끝내기 위해 기다리는 존재입니다.' }
    },

    // 아이템 정보
    items: {
        // 소모품
        health_potion: { name: '체력 포션', type: 'consumable', effect: 'heal', value: 50, price: 25, description: 'HP를 50 회복합니다.' },
        mana_potion: { name: '마나 포션', type: 'consumable', effect: 'mana', value: 30, price: 20, description: 'MP를 30 회복합니다.' },
        greater_health_potion: { name: '상급 체력 포션', type: 'consumable', effect: 'heal', value: 150, price: 80, description: 'HP를 150 회복합니다.' },
        greater_mana_potion: { name: '상급 마나 포션', type: 'consumable', effect: 'mana', value: 100, price: 70, description: 'MP를 100 회복합니다.' },
        elixir: { name: '엘릭서', type: 'consumable', effect: 'full_heal', value: 9999, price: 500, description: 'HP와 MP를 모두 완전히 회복합니다.' },
        antidote: { name: '해독제', type: 'consumable', effect: 'cure_poison', value: 1, price: 40, description: '독 상태 이상을 회복합니다.' },
        smoke_bomb: { name: '연막탄', type: 'consumable', effect: 'escape', value: 1, price: 100, description: '전투에서 반드시 도망칠 수 있게 해줍니다.' },

        // 무기
        iron_sword: { name: '철 검', type: 'weapon', attack: 10, price: 50, description: '든든한 철로 만든 검입니다.' },
        steel_sword: { name: '강철 검', type: 'weapon', attack: 18, price: 120, description: '예리한 강철 검입니다.' },
        mithril_sword: { name: '미스릴 검', type: 'weapon', attack: 30, price: 300, description: '가볍고 강력한 미스릴로 만든 검입니다.' },
        rune_bow: { name: '룬 활', type: 'weapon', attack: 25, price: 250, description: '마법의 룬이 새겨진 활입니다.' },
        staff_of_mana: { name: '마나의 지팡이', type: 'weapon', attack: 15, magic: 20, price: 400, description: '마나 회복력을 높여주는 지팡이입니다.' },
        legendary_sword: { name: '전설의 검', type: 'weapon', attack: 50, price: 1000, description: '용사의 혼이 깃든 전설적인 검입니다.' },

        // 방어구
        leather_armor: { name: '가죽 갑옷', type: 'armor', defense: 5, price: 40, description: '기본적인 가죽 갑옷입니다.' },
        chain_armor: { name: '체인 갑옷', type: 'armor', defense: 12, price: 100, description: '견고한 사슬 갑옷입니다.' },
        plate_armor: { name: '판금 갑옷', type: 'armor', defense: 25, price: 280, description: '전신을 보호하는 무거운 판금 갑옷입니다.' },
        mithril_armor: { name: '미스릴 갑옷', type: 'armor', defense: 40, price: 500, description: '가볍고 튼튼한 미스릴 갑옷입니다.' },
        robe_of_magi: { name: '현자의 로브', type: 'armor', defense: 15, magic: 15, price: 450, description: '마법 저항력과 마력을 높여주는 로브입니다.' },
        dragon_shield: { name: '용의 방패', type: 'armor', defense: 50, price: 1200, description: '드래곤의 비늘로 만들어진 전설적인 방패입니다.' }
    },

    // 스킬 정보
    skills: {
        // 공격 스킬
        fireball: { name: '파이어볼', type: 'attack', mpCost: 10, damage: 20, description: '화염구를 발사하여 적에게 데미지를 입힙니다.' },
        ice_lance: { name: '아이스 랜스', type: 'attack', mpCost: 15, damage: 30, description: '얼음 창을 날려 적을 꿰뚫습니다.' },
        thunder_storm: { name: '썬더 스톰', type: 'attack', mpCost: 25, damage: 50, description: '적 전체에게 번개 폭풍을 일으켜 공격합니다.' },
        holy_light: { name: '성스러운 빛', type: 'attack', mpCost: 30, damage: 60, description: '언데드에게 특히 강력한 신성한 빛으로 공격합니다.' },
        meteor: { name: '메테오', type: 'attack', mpCost: 50, damage: 120, description: '거대한 운석을 떨어뜨려 모든 적을 불태웁니다.' },

        // 회복 스킬
        heal: { name: '힐', type: 'heal', mpCost: 8, value: 40, description: '자신의 HP를 회복합니다.' },
        greater_heal: { name: '그레이터 힐', type: 'heal', mpCost: 20, value: 150, description: '자신의 HP를 대량으로 회복합니다.' },
        regeneration: { name: '리제너레이션', type: 'buff', mpCost: 18, duration: 3, description: '3턴 동안 매 턴 HP를 조금씩 회복합니다.' },

        // 버프/디버프 스킬
        shield: { name: '보호막', type: 'buff', mpCost: 5, value: 10, duration: 3, description: '3턴 동안 방어력을 증가시킵니다.' },
        fortify: { name: '견고화', type: 'buff', mpCost: 15, value: 25, duration: 5, description: '5턴 동안 방어력을 크게 증가시킵니다.' },
        berserk: { name: '광폭화', type: 'buff', mpCost: 12, description: '공격력을 크게 높이는 대신 방어력이 감소합니다.' },
        poison_cloud: { name: '독구름', type: 'debuff', mpCost: 10, damage: 10, duration: 3, description: '적을 중독시켜 3턴 동안 지속적인 데미지를 줍니다.' }
    },

    // 상점 정보
    shops: {
        town_shop: {
            name: '마을 상점',
            items: ['health_potion', 'mana_potion', 'antidote', 'smoke_bomb', 'iron_sword', 'leather_armor']
        },
        dungeon_shop: {
            name: '던전 상인',
            items: ['greater_health_potion', 'greater_mana_potion', 'steel_sword', 'chain_armor', 'rune_bow']
        },
        advanced_shop: {
            name: '고급 상점 (50층 이상)',
            items: ['elixir', 'mithril_sword', 'plate_armor', 'staff_of_mana', 'robe_of_magi']
        },
        legendary_shop: {
            name: '전설의 대장간 (90층 이상)',
            items: ['legendary_sword', 'dragon_shield', 'mithril_armor']
        }
    }
};

// 씬 데이터
const SCENES = {
    town_start: {
        name: '마을 입구',
        text: `
            <h3>🏘️ 평화로운 마을</h3>
            <p>당신은 작은 마을의 입구에 서 있습니다. 멀리 어둠에 싸인 던전이 보입니다.</p>
            <p>마을 사람들이 당신을 바라보며 걱정스러운 표정을 짓고 있습니다.</p>
            <p><em>"던전에서 나오는 몬스터들 때문에 마을이 위험해지고 있어요. 용감한 모험가여, 도와주세요!"</em></p>
        `,
        actions: [
            { text: '🏰 던전으로 향한다', type: 'move', target: 'dungeon_entrance' },
            { text: '🏪 상점에 들른다', type: 'move', target: 'town_shop' },
            { text: '💬 마을 사람들과 대화한다', type: 'move', target: 'town_talk' },
            { text: '💤 여관에서 휴식한다', type: 'rest' }
        ]
    },

    town_talk: {
        name: '마을 광장',
        text: `
            <h3>💬 마을 사람들과의 대화</h3>
            <p><strong>촌장:</strong> "던전에는 3층까지 있다고 들었습니다. 각 층마다 강력한 보스가 있어요."</p>
            <p><strong>상인:</strong> "던전에서 나오는 보물들을 가져오시면 좋은 가격에 사드리겠습니다."</p>
            <p><strong>전사:</strong> "조심하세요. 저도 던전에 도전했다가 1층에서 도망쳐 나왔습니다."</p>
        `,
        actions: [
            { text: '🔙 마을 입구로 돌아간다', type: 'move', target: 'town_start' }
        ]
    },

    town_shop: {
        name: '마을 상점',
        text: `
            <h3>🏪 잡화상점</h3>
            <p>친절한 상인이 반갑게 맞이합니다.</p>
            <p><em>"어서오세요! 던전 탐험에 필요한 것들을 판매하고 있어요."</em></p>
        `,
        actions: [
            { text: '🛒 아이템 구매', type: 'shop', shopId: 'town_shop' },
            { text: '💰 아이템 판매', type: 'sell' },
            { text: '🔙 밖으로 나간다', type: 'move', target: 'town_start' }
        ]
    },

    dungeon_entrance: {
        name: '던전 입구',
        text: `
            <h3>🏰 어둠의 던전 입구</h3>
            <p>차가운 기운이 흘러나오는 던전 입구입니다. 안에서 이상한 소리가 들려옵니다.</p>
            <p>입구에 낡은 표지판이 있습니다: <em>"마법사 길드의 시험장 - 입문자는 1층부터 도전하라"</em></p>
            <p>던전에 들어가기 전에 충분히 준비하세요.</p>
        `,
        actions: [
            { text: '⚔️ 던전 1층으로 들어간다', type: 'move', target: 'dungeon_1_entrance' },
            { text: '🔙 마을로 돌아간다', type: 'move', target: 'town_start' }
        ]
    },

    dungeon_1_entrance: {
        name: '던전 1층 입구',
        text: `
            <h3>🕳️ 던전 1층</h3>
            <p>어둡고 축축한 던전 내부입니다. 멀리서 으르렁거리는 소리가 들립니다.</p>
            <p>갈래길이 나타났습니다. 각 길마다 다른 위험이 도사리고 있을 것 같습니다.</p>
        `,
        actions: [
            { text: '➡️ 동쪽 통로 (전투)', type: 'combat', enemy: 'goblin', onWin: 'dungeon_1_treasure' },
            { text: '⬅️ 서쪽 통로 (탐색)', type: 'move', target: 'dungeon_1_secret' },
            { text: '⬆️ 북쪽 통로 (보스)', type: 'combat', enemy: 'orc', onWin: 'dungeon_1_boss_defeated' },
            { text: '🔙 던전 입구로 돌아간다', type: 'move', target: 'dungeon_entrance' }
        ]
    },

    dungeon_1_secret: {
        name: '비밀 방',
        text: `
            <h3>💎 숨겨진 보물방</h3>
            <p>조심스럽게 탐색한 결과, 숨겨진 보물방을 발견했습니다!</p>
            <p>상자 안에서 금화와 유용한 아이템을 발견했습니다.</p>
        `,
        actions: [
            { text: '📦 보물 상자 열기', type: 'treasure', rewards: { gold: 50, items: ['health_potion'] } },
            { text: '🔙 돌아가기', type: 'move', target: 'dungeon_1_entrance' }
        ]
    },

    dungeon_1_treasure: {
        name: '전리품 획득',
        text: `
            <h3>🏆 승리!</h3>
            <p>고블린을 물리쳤습니다! 경험치와 금화를 획득했습니다.</p>
            <p>앞으로 더 깊은 던전이 기다리고 있습니다.</p>
        `,
        actions: [
            { text: '🔙 던전 1층 입구로', type: 'move', target: 'dungeon_1_entrance' },
            { text: '⬆️ 던전 2층으로', type: 'move', target: 'dungeon_2_entrance' }
        ]
    },

    dungeon_1_boss_defeated: {
        name: '1층 보스 클리어',
        text: `
            <h3>🎉 1층 정복!</h3>
            <p>오크 전사를 물리치고 던전 1층을 정복했습니다!</p>
            <p>많은 경험치와 보상을 획득했습니다. 이제 2층으로 진행할 수 있습니다.</p>
        `,
        actions: [
            { text: '⬆️ 던전 2층으로 진행', type: 'move', target: 'dungeon_2_entrance' },
            { text: '🔙 마을로 돌아가서 휴식', type: 'move', target: 'town_start' }
        ]
    },

    dungeon_2_entrance: {
        name: '던전 2층',
        text: `
            <h3>💀 던전 2층</h3>
            <p>더욱 어둡고 위험한 2층에 도착했습니다. 언데드의 기운이 느껴집니다.</p>
            <p>해골과 좀비들이 배회하고 있는 것 같습니다.</p>
        `,
        actions: [
            { text: '⚔️ 스켈레톤과 전투', type: 'combat', enemy: 'skeleton', onWin: 'dungeon_2_progress' },
            { text: '🔍 조심스럽게 탐색', type: 'move', target: 'dungeon_2_secret' },
            { text: '🔙 1층으로 내려가기', type: 'move', target: 'dungeon_1_entrance' }
        ]
    },

    dungeon_2_progress: {
        name: '던전 2층 - 스켈레톤 격파',
        text: `
            <h3>💀 언데드 정리 완료</h3>
            <p>스켈레톤을 물리치고 2층의 한 구역을 정리했습니다.</p>
            <p>더 깊은 곳으로 진행하거나 다른 지역을 탐색할 수 있습니다.</p>
            <p><strong>이제 3층으로 진행할 수 있습니다!</strong></p>
        `,
        actions: [
            { text: '⬆️ 3층으로 진행', type: 'move', target: 'dungeon_3_entrance' },
            { text: '🔍 더 탐색하기', type: 'move', target: 'dungeon_2_secret' },
            { text: '🔙 2층 입구로 돌아가기', type: 'move', target: 'dungeon_2_entrance' },
            { text: '🔙 1층으로 내려가기', type: 'move', target: 'dungeon_1_entrance' }
        ]
    },

    dungeon_2_secret: {
        name: '던전 2층 - 숨겨진 방',
        text: `
            <h3>🔮 신비로운 방</h3>
            <p>조심스럽게 탐색한 결과, 숨겨진 방을 발견했습니다!</p>
            <p>방 안에는 마법의 오라가 감돌고 있으며, 고대의 보물이 있을 것 같습니다.</p>
            <p>하지만 더 강력한 적이 지키고 있을 수도 있습니다.</p>
        `,
        actions: [
            { text: '💎 보물상자 열기', type: 'treasure', rewards: { gold: 100, items: ['mana_potion', 'mana_potion'] } },
            { text: '👻 좀비와 전투', type: 'combat', enemy: 'skeleton', onWin: 'dungeon_2_entrance' },
            { text: '🔙 안전하게 돌아가기', type: 'move', target: 'dungeon_2_entrance' }
        ]
    }
};

/**
 * 동적 던전 생성 시스템
 * 100층까지 자동 생성
 */
class DungeonGenerator {
    constructor() {
        this.floorThemes = {
            1: { name: '지하 동굴', monsters: ['goblin', 'bat', 'slime'], color: '🏴', treasureRate: 0.3 },
            11: { name: '언데드 무덤', monsters: ['skeleton', 'zombie'], color: '💀', treasureRate: 0.4 },
            21: { name: '마법 유적', monsters: ['golem', 'harpy'], color: '🔮', treasureRate: 0.5 },
            31: { name: '야수 소굴', monsters: ['troll', 'ogre'], color: '🐾', treasureRate: 0.6 },
            41: { name: '저주받은 사원', monsters: ['mummy', 'wyvern'], color: '🏛️', treasureRate: 0.7 },
            51: { name: '악마의 영역', monsters: ['lich', 'chimera', 'minotaur'], color: '🔥', treasureRate: 0.8 },
            61: { name: '그림자 차원', monsters: ['demon', 'succubus', 'shadow_beast'], color: '🌚', treasureRate: 0.9 },
            71: { name: '심연의 둥지', monsters: ['hydra', 'beholder'], color: '🐍', treasureRate: 1.0 },
            81: { name: '천상의 감옥', monsters: ['titan', 'archdemon', 'void_spawn'], color: '🌌', treasureRate: 1.2 },
            91: { name: '종말의 전장', monsters: ['shadow_lord', 'chaos_beast', 'celestial_guardian'], color: '💥', treasureRate: 1.5 },
            100: { name: '절대자의 방', monsters: ['void_emperor', 'omega_sentinel', 'god_of_dungeon'], color: '👑', treasureRate: 2.0 }
        };
    }

    // 층에 맞는 테마 가져오기
    getFloorTheme(floor) {
        // 가장 가까운 테마 찾기
        let theme = this.floorThemes[1]; // 기본값
        for (const themeFloor of Object.keys(this.floorThemes).sort((a, b) => b - a)) {
            if (floor >= parseInt(themeFloor)) {
                theme = this.floorThemes[themeFloor];
                break;
            }
        }
        return theme;
    }

    // 몬스터 스탯 스케일링
    scaleMonster(monsterData, floor) {
        const scaleFactor = 1 + (floor - 1) * 0.15; // 층당 15% 증가
        return {
            ...monsterData,
            hp: Math.floor(monsterData.hp * scaleFactor),
            attack: Math.floor(monsterData.attack * scaleFactor),
            defense: Math.floor(monsterData.defense * scaleFactor),
            exp: Math.floor(monsterData.exp * scaleFactor),
            gold: Math.floor(monsterData.gold * scaleFactor)
        };
    }

    // 보물 보상 스케일링
    scaleTreasure(floor) {
        const theme = this.getFloorTheme(floor);
        const baseGold = 50;
        const goldAmount = Math.floor(baseGold * (1 + floor * 0.2) * theme.treasureRate);
        
        const items = ['health_potion'];
        if (floor >= 5) items.push('mana_potion');
        if (floor >= 10) items.push('iron_sword');
        if (floor >= 20) items.push('steel_sword');
        if (floor >= 30) items.push('chain_armor');
        
        return {
            gold: goldAmount,
            items: items.slice(0, Math.min(3, Math.floor(floor / 10) + 1))
        };
    }

    // 동적 씬 생성
    generateFloorScene(floor) {
        const theme = this.getFloorTheme(floor);
        const isBossFloor = floor % 10 === 0 && floor > 0;
        let monsterId;

        if (isBossFloor) {
            // 보스 층일 경우, 보스 몬스터 ID를 가져옴 (GAME_DATA.bosses에 정의된 키 사용)
            monsterId = floor; // 예: 10, 20, 30...
        } else {
            // 일반 층일 경우, 테마에 맞는 몬스터 중 랜덤 선택
            const monsters = theme.monsters;
            monsterId = monsters[Math.floor(Math.random() * monsters.length)];
        }
        
        const sceneId = `dungeon_${floor}_entrance`;
        const progressId = `dungeon_${floor}_progress`;
        const secretId = `dungeon_${floor}_secret`;
        const nextFloorId = floor < 100 ? `dungeon_${floor + 1}_entrance` : 'dungeon_victory';
        const prevFloorId = floor > 1 ? `dungeon_${floor - 1}_entrance` : 'dungeon_entrance';

        return {
            name: `던전 ${floor}층 - ${theme.name}`,
            text: `
                <h3>${theme.color} 던전 ${floor}층 - ${theme.name}</h3>
                <p>${this.getFloorDescription(floor, theme, isBossFloor)}</p>
                ${isBossFloor ? '<p><strong>🔥 보스층입니다! 강력한 적이 기다리고 있습니다.</strong></p>' : ''}
            `,
            actions: this.generateFloorActions(floor, monsterId, isBossFloor, progressId, secretId, prevFloorId)
        };
    }

    // 층 설명 생성
    getFloorDescription(floor, theme, isBossFloor) {
        const descriptions = {
            '지하 동굴': '축축하고 어두운 동굴이 이어집니다. 고블린들의 울음소리가 들려옵니다.',
            '언데드 무덤': '차가운 기운이 흐르는 고대 무덤입니다. 언데드들이 배회하고 있습니다.',
            '어둠의 통로': '빛이 닿지 않는 깊은 통로입니다. 무언가 위험한 기운이 느껴집니다.',
            '트롤 거주지': '거대한 트롤들이 살고 있는 동굴입니다. 뼈가 곳곳에 널려있습니다.',
            '마법사의 탑': '고대 마법사들의 흔적이 남은 신비로운 탑입니다.',
            '미궁': '복잡하게 얽힌 미로 같은 통로입니다. 미노타우로스의 발소리가 들립니다.',
            '용의 둥지': '용들이 서식하는 뜨거운 동굴입니다. 보물이 쌓여있지만 위험합니다.',
            '고대 유적': '잃어버린 문명의 유적입니다. 강력한 마법이 깃들어 있습니다.',
            '그림자 영역': '현실과 환상의 경계가 모호한 곳입니다.',
            '혼돈의 차원': '모든 질서가 무너진 혼돈의 공간입니다.',
            '공허의 경계': '존재와 무의 경계선입니다. 현실감이 희미해집니다.',
            '종말의 문턱': '모든 것의 끝이 가까운 곳입니다.',
            '절대자의 방': '이 던전의 주인이 기다리는 최종 방입니다.'
        };
        
        return descriptions[theme.name] || `${floor}층의 위험한 지역입니다.`;
    }

    // 층별 액션 생성
    generateFloorActions(floor, monsterId, isBossFloor, progressId, secretId, prevFloorId) {
        const actions = [];
        
        if (isBossFloor) {
            const bossData = GAME_DATA.bosses[monsterId];
            actions.push({ 
                text: `⚔️ ${bossData.name}와(과)의 결전`, 
                type: 'combat', 
                enemy: monsterId, // 보스 ID (숫자) 전달
                onWin: progressId,
                floor: floor
            });
        } else {
            const monsterData = GAME_DATA.monsters[monsterId];
            actions.push({ 
                text: `⚔️ ${monsterData?.name || '몬스터'}와(과) 전투`, 
                type: 'combat', 
                enemy: monsterId, // 몬스터 ID (문자열) 전달
                onWin: progressId,
                floor: floor
            });
        }
        
        actions.push({ 
            text: '🔍 조심스럽게 탐색', 
            type: 'move', 
            target: secretId 
        });
        
        if (floor > 1) {
            actions.push({ 
                text: `🔙 ${floor-1}층으로 내려가기`, 
                type: 'move', 
                target: prevFloorId 
            });
        } else {
            actions.push({ 
                text: '🔙 던전 입구로', 
                type: 'move', 
                target: 'dungeon_entrance' 
            });
        }
        
        return actions;
    }

    // 진행 씬 생성
    generateProgressScene(floor) {
        const nextFloorId = floor < 100 ? `dungeon_${floor + 1}_entrance` : 'dungeon_victory';
        const currentFloorId = `dungeon_${floor}_entrance`;
        const secretId = `dungeon_${floor}_secret`;
        
        return {
            name: `던전 ${floor}층 정복`,
            text: `
                <h3>🎉 ${floor}층 정복!</h3>
                <p>${floor}층의 몬스터를 물리치고 지역을 정복했습니다!</p>
                <p>경험치와 보상을 획득했습니다.</p>
                ${floor < 100 ? `<p>이제 ${floor + 1}층으로 진행할 수 있습니다.</p>` : '<p><strong>축하합니다! 모든 층을 정복했습니다!</strong></p>'}
            `,
            actions: floor < 100 ? [
                { text: `⬆️ ${floor + 1}층으로 진행`, type: 'move', target: nextFloorId },
                { text: '🔍 더 탐색하기', type: 'move', target: secretId },
                { text: `🔙 ${floor}층으로 돌아가기`, type: 'move', target: currentFloorId }
            ] : [
                { text: '🏆 승리를 만끽하기', type: 'move', target: 'dungeon_victory' },
                { text: '🔙 마을로 돌아가기', type: 'move', target: 'town_start' }
            ]
        };
    }

    // 비밀 방 씬 생성
    generateSecretScene(floor) {
        const treasure = this.scaleTreasure(floor);
        const currentFloorId = `dungeon_${floor}_entrance`;
        
        return {
            name: `던전 ${floor}층 - 숨겨진 방`,
            text: `
                <h3>🔮 신비로운 보물방</h3>
                <p>조심스럽게 탐색한 결과, ${floor}층의 숨겨진 방을 발견했습니다!</p>
                <p>방 안에는 마법의 오라가 감돌고 있으며, 소중한 보물이 있는 것 같습니다.</p>
                ${floor >= 50 ? '<p><strong>⚡ 강력한 마법 에너지가 느껴집니다!</strong></p>' : ''}
            `,
            actions: [
                { text: '💎 보물상자 열기', type: 'treasure', rewards: treasure },
                { text: '🔙 안전하게 돌아가기', type: 'move', target: currentFloorId }
            ]
        };
    }
}

// 던전 생성기 인스턴스
const dungeonGenerator = new DungeonGenerator();

/**
 * 게임 상태 관리 클래스
 */
class GameManager {
    constructor() {
        this.currentBattle = null;
        this.currentShop = null;
    }

    /**
     * 씬 가져오기 (동적 던전 지원)
     */
    getScene(sceneId) {
        // 기존 고정 씬 확인
        if (SCENES[sceneId]) {
            return SCENES[sceneId];
        }
        
        // 동적 던전 씬 확인
        const dungeonPattern = /^dungeon_(\d+)_(entrance|progress|secret)$/;
        const match = sceneId.match(dungeonPattern);
        
        if (match) {
            const floor = parseInt(match[1]);
            const type = match[2];
            
            // 유효한 층 범위 확인 (3-100층)
            if (floor >= 3 && floor <= 100) {
                switch (type) {
                    case 'entrance':
                        return dungeonGenerator.generateFloorScene(floor);
                    case 'progress':
                        return dungeonGenerator.generateProgressScene(floor);
                    case 'secret':
                        return dungeonGenerator.generateSecretScene(floor);
                }
            }
        }
        
        // 최종 승리 씬
        if (sceneId === 'dungeon_victory') {
            return {
                name: '던전 정복 완료',
                text: `
                    <h3>🏆 전설의 용사</h3>
                    <p><strong>축하합니다! 100층 던전을 모두 정복했습니다!</strong></p>
                    <p>당신은 이제 전설의 용사가 되었습니다. 모든 몬스터를 물리치고 던전의 주인이 된 것입니다.</p>
                    <p>마을 사람들이 당신의 위업을 영원히 기억할 것입니다.</p>
                `,
                actions: [
                    { text: '🏘️ 마을로 돌아가기', type: 'move', target: 'town_start' },
                    { text: '🔄 새로운 모험 시작', type: 'move', target: 'dungeon_entrance' }
                ]
            };
        }
        
        return null;
    }

    /**
     * 몬스터 정보 가져오기 (층별 스케일링 및 보스 지원)
     */
    getMonster(monsterId, floor = 1) {
        let baseMonster;

        // monsterId가 숫자면 보스로 간주 (e.g., 10, 20, ...)
        if (typeof monsterId === 'number' && GAME_DATA.bosses[monsterId]) {
            baseMonster = GAME_DATA.bosses[monsterId];
        } else if (GAME_DATA.monsters[monsterId]) {
            baseMonster = GAME_DATA.monsters[monsterId];
        } else {
            console.error('몬스터 또는 보스를 찾을 수 없음:', monsterId);
            return null;
        }
        
        // 몬스터 데이터 복사 (원본 데이터 보호)
        const monsterData = JSON.parse(JSON.stringify(baseMonster));
        
        // 3층 이상에서는 스케일링 적용 (보스는 스케일링 제외)
        if (floor >= 3 && !GAME_DATA.bosses[monsterId]) {
            return dungeonGenerator.scaleMonster(monsterData, floor);
        }
        
        return monsterData;
    }

    /**
     * 아이템 정보 가져오기
     */
    getItem(itemId) {
        return GAME_DATA.items[itemId] || null;
    }

    /**
     * 플레이어 레벨업 처리
     */
    checkLevelUp(player) {
        if (player.exp >= player.expToNext) {
            player.level++;
            player.exp -= player.expToNext;
            player.expToNext = Math.floor(player.expToNext * 1.5);
            
            // 스탯 증가
            const statIncrease = {
                strength: Math.floor(Math.random() * 3) + 2,
                defense: Math.floor(Math.random() * 2) + 1,
                agility: Math.floor(Math.random() * 2) + 1,
                magic: Math.floor(Math.random() * 2) + 1
            };

            player.stats.strength += statIncrease.strength;
            player.stats.defense += statIncrease.defense;
            player.stats.agility += statIncrease.agility;
            player.stats.magic += statIncrease.magic;

            // HP, MP 증가
            const hpIncrease = Math.floor(Math.random() * 15) + 10;
            const mpIncrease = Math.floor(Math.random() * 8) + 5;
            
            player.maxHp += hpIncrease;
            player.maxMp += mpIncrease;
            player.hp = player.maxHp; // 레벨업 시 완전 회복
            player.mp = player.maxMp;

            this.showMessage(`🎉 레벨업! 레벨 ${player.level}이 되었습니다!`, 'success');
            this.showMessage(`스탯 증가: 힘+${statIncrease.strength}, 방어+${statIncrease.defense}, 민첩+${statIncrease.agility}, 마법+${statIncrease.magic}`, 'info');
            
            return true;
        }
        return false;
    }

    /**
     * 아이템 사용
     */
    useItem(itemId, player) {
        // 인벤토리 초기화 (구 세이브 데이터 호환성)
        if (!player.inventory) {
            player.inventory = [];
        }
        
        const itemIndex = player.inventory.findIndex(item => item.id === itemId);
        if (itemIndex === -1) {
            this.showMessage('아이템을 찾을 수 없습니다.', 'error');
            return false;
        }

        const item = player.inventory[itemIndex];
        const itemData = this.getItem(itemId);
        
        if (!itemData || itemData.type !== 'consumable') {
            this.showMessage('사용할 수 없는 아이템입니다.', 'error');
            return false;
        }

        // 아이템 효과 적용
        switch (itemData.effect) {
            case 'heal':
                const healAmount = Math.min(itemData.value, player.maxHp - player.hp);
                if (healAmount <= 0) {
                    this.showMessage(`${itemData.name}을(를) 사용할 필요가 없습니다. HP가 이미 가득 차있습니다.`, 'warning');
                    return false;
                }
                player.hp += healAmount;
                this.showMessage(`${itemData.name}을(를) 사용하여 HP를 ${healAmount} 회복했습니다.`, 'success');
                break;
                
            case 'mana':
                const manaAmount = Math.min(itemData.value, player.maxMp - player.mp);
                if (manaAmount <= 0) {
                    this.showMessage(`${itemData.name}을(를) 사용할 필요가 없습니다. MP가 이미 가득 차있습니다.`, 'warning');
                    return false;
                }
                player.mp += manaAmount;
                this.showMessage(`${itemData.name}을(를) 사용하여 MP를 ${manaAmount} 회복했습니다.`, 'success');
                break;
                
            default:
                this.showMessage('알 수 없는 아이템 효과입니다.', 'error');
                return false;
        }

        // 아이템 개수 감소 또는 제거
        if (item.count && item.count > 1) {
            item.count--;
        } else {
            player.inventory.splice(itemIndex, 1);
        }

        updateUI();
        return true;
    }

    /**
     * 휴식 (HP, MP 완전 회복)
     */
    rest(player) {
        player.hp = player.maxHp;
        player.mp = player.maxMp;
        this.showMessage('충분한 휴식을 취해 HP와 MP가 완전히 회복되었습니다.', 'success');
        updateUI();
    }

    /**
     * 보물 획득
     */
    gainTreasure(rewards, player) {
        if (rewards.gold) {
            player.gold += rewards.gold;
            this.showMessage(`💰 ${rewards.gold} 골드를 획득했습니다!`, 'success');
        }

        if (rewards.items) {
            // 인벤토리 초기화 확인
            if (!player.inventory) {
                player.inventory = [];
            }
            
            rewards.items.forEach(itemId => {
                const itemData = this.getItem(itemId);
                if (itemData) {
                    // 기존 아이템이 있는지 확인
                    const existingItem = player.inventory.find(item => item.id === itemId);
                    if (existingItem && itemData.type === 'consumable') {
                        existingItem.count = (existingItem.count || 1) + 1;
                    } else {
                        player.inventory.push({
                            id: itemId,
                            name: itemData.name,
                            type: itemData.type,
                            count: itemData.type === 'consumable' ? 1 : undefined,
                            ...itemData
                        });
                    }
                    this.showMessage(`📦 ${itemData.name}을(를) 획득했습니다!`, 'success');
                }
            });
        }

        updateUI();
    }

    /**
     * 메시지 표시
     */
    showMessage(message, type = 'info') {
        const storyText = document.getElementById('storyText');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.style.cssText = `
            margin: 10px 0;
            padding: 10px;
            border-radius: 5px;
            font-weight: bold;
            background: ${type === 'success' ? 'rgba(39, 174, 96, 0.2)' : 
                        type === 'error' ? 'rgba(231, 76, 60, 0.2)' : 
                        'rgba(74, 144, 226, 0.2)'};
            color: ${type === 'success' ? '#27ae60' : 
                    type === 'error' ? '#e74c3c' : 
                    '#4a90e2'};
        `;
        messageDiv.textContent = message;
        
        // 기존 스토리 텍스트 뒤에 추가
        storyText.appendChild(messageDiv);
        
        // 5초 후 메시지 제거
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 5000);
    }
}

// 전역 게임 매니저 인스턴스
const gameManager = new GameManager();

/**
 * 전투 시스템
 */
class CombatSystem {
    constructor() {
        this.isInCombat = false;
        this.currentEnemy = null;
        this.onWinTarget = null;
    }

    /**
     * 전투 시작 (층별 스케일링 지원)
     */
    startCombat(enemyId, onWin = null, floor = 1) {
        const enemy = gameManager.getMonster(enemyId, floor);
        if (!enemy) {
            gameManager.showMessage('몬스터 데이터를 찾을 수 없습니다.', 'error');
            return;
        }

        this.isInCombat = true;
        this.currentEnemy = enemy;
        this.onWinTarget = onWin;

        this.updateCombatUI();
        gameManager.showMessage(`⚔️ ${enemy.name}이(가) 나타났습니다!`, 'info');
    }

    /**
     * 전투 UI 업데이트
     */
    updateCombatUI() {
        const storyText = document.getElementById('storyText');
        const actionsContainer = document.getElementById('gameActions');

        // 전투 상황 표시
        storyText.innerHTML = `
            <h3>⚔️ 전투 중</h3>
            <div class="combat-status">
                <div class="enemy-info" style="background: rgba(231, 76, 60, 0.1); padding: 15px; border-radius: 5px; margin: 10px 0;">
                    <h4>👹 ${this.currentEnemy.name}</h4>
                    <p>${this.currentEnemy.description}</p>
                    <div>❤️ HP: ${this.currentEnemy.hp} | ⚔️ 공격력: ${this.currentEnemy.attack} | 🛡️ 방어력: ${this.currentEnemy.defense}</div>
                </div>
            </div>
        `;

        // 전투 액션 버튼
        actionsContainer.innerHTML = '';
        
        const actions = [
            { text: '⚔️ 공격', action: () => this.playerAttack() },
            { text: '🛡️ 방어', action: () => this.playerDefend() },
            { text: '🔮 스킬', action: () => this.showSkillMenu() },
            { text: '🎒 아이템', action: () => this.showItemMenu() },
            { text: '🏃 도망', action: () => this.playerRun() }
        ];

        actions.forEach(actionData => {
            const button = document.createElement('button');
            button.className = 'action-btn';
            button.textContent = actionData.text;
            button.addEventListener('click', actionData.action);
            actionsContainer.appendChild(button);
        });
    }

    /**
     * 플레이어 공격
     */
    playerAttack() {
        const player = gameState.player;
        const damage = Math.max(1, player.stats.strength + Math.floor(Math.random() * 5) - this.currentEnemy.defense);
        
        this.currentEnemy.hp -= damage;
        gameManager.showMessage(`⚔️ ${this.currentEnemy.name}에게 ${damage}의 데미지를 입혔습니다!`, 'success');

        if (this.currentEnemy.hp <= 0) {
            this.playerWin();
            return;
        }

        this.enemyTurn();
    }

    /**
     * 플레이어 방어
     */
    playerDefend() {
        gameManager.showMessage('🛡️ 방어 자세를 취했습니다. 받는 데미지가 감소합니다.', 'info');
        this.enemyTurn(0.5); // 데미지 50% 감소
    }

    /**
     * 플레이어 스킬 메뉴
     */
    showSkillMenu() {
        const player = gameState.player;
        
        // 레벨에 따라 사용 가능한 스킬 목록 정의
        const skillAvailability = {
            1: ['fireball', 'heal'],
            5: ['ice_lance'],
            8: ['shield'],
            12: ['greater_heal', 'poison_cloud'],
            18: ['thunder_storm', 'fortify'],
            25: ['berserk'],
            35: ['meteor', 'regeneration'],
            50: ['holy_light']
        };

        const availableSkills = [];
        for (const level in skillAvailability) {
            if (player.level >= level) {
                availableSkills.push(...skillAvailability[level]);
            }
        }

        if (availableSkills.length === 0) {
            gameManager.showMessage('사용할 수 있는 스킬이 없습니다.', 'error');
            return;
        }

        const actionsContainer = document.getElementById('gameActions');
        actionsContainer.innerHTML = '';

        availableSkills.forEach(skillId => {
            const skill = GAME_DATA.skills[skillId];
            const button = document.createElement('button');
            button.className = 'action-btn';
            button.textContent = `${skill.name} (MP ${skill.mpCost})`;
            button.disabled = player.mp < skill.mpCost;
            button.addEventListener('click', () => this.useSkill(skillId));
            actionsContainer.appendChild(button);
        });

        // 뒤로가기 버튼
        const backButton = document.createElement('button');
        backButton.className = 'action-btn';
        backButton.textContent = '🔙 뒤로가기';
        backButton.addEventListener('click', () => this.updateCombatUI());
        actionsContainer.appendChild(backButton);
    }

    /**
     * 스킬 사용
     */
    useSkill(skillId) {
        const player = gameState.player;
        const skill = GAME_DATA.skills[skillId];

        if (player.mp < skill.mpCost) {
            gameManager.showMessage('MP가 부족합니다.', 'error');
            return;
        }

        player.mp -= skill.mpCost;

        let damage = 0;

        switch (skill.type) {
            case 'attack':
                damage = skill.damage + Math.floor(player.stats.magic * 1.5);
                this.currentEnemy.hp -= damage;
                gameManager.showMessage(`🔥 ${skill.name}(으)로 ${this.currentEnemy.name}에게 ${damage}의 데미지를 입혔습니다!`, 'success');
                break;
                
            case 'heal':
                const healAmount = Math.min(skill.value, player.maxHp - player.hp);
                player.hp += healAmount;
                gameManager.showMessage(`💚 ${skill.name}(으)로 HP를 ${healAmount} 회복했습니다!`, 'success');
                break;

            case 'buff':
                // TODO: 버프 시스템 구현
                gameManager.showMessage(`✨ ${skill.name} 효과를 받았습니다!`, 'info');
                break;

            case 'debuff':
                // TODO: 디버프 시스템 구현
                gameManager.showMessage(`☠️ ${this.currentEnemy.name}에게 ${skill.name} 효과를 걸었습니다!`, 'warning');
                break;
        }

        updateUI();

        if (this.currentEnemy.hp <= 0) {
            this.playerWin();
            return;
        }

        this.enemyTurn();
    }

    /**
     * 아이템 메뉴 표시
     */
    showItemMenu() {
        const player = gameState.player;
        const consumableItems = player.inventory.filter(item => item.type === 'consumable');

        if (consumableItems.length === 0) {
            gameManager.showMessage('사용할 수 있는 아이템이 없습니다.', 'error');
            return;
        }

        const actionsContainer = document.getElementById('gameActions');
        actionsContainer.innerHTML = '';

        consumableItems.forEach(item => {
            const button = document.createElement('button');
            button.className = 'action-btn';
            const countText = item.count ? ` (${item.count})` : '';
            button.textContent = `${item.name}${countText}`;
            button.addEventListener('click', () => {
                if (gameManager.useItem(item.id, player)) {
                    this.enemyTurn();
                } else {
                    this.updateCombatUI();
                }
            });
            actionsContainer.appendChild(button);
        });

        // 뒤로가기 버튼
        const backButton = document.createElement('button');
        backButton.className = 'action-btn';
        backButton.textContent = '🔙 뒤로가기';
        backButton.addEventListener('click', () => this.updateCombatUI());
        actionsContainer.appendChild(backButton);
    }

    /**
     * 도망치기
     */
    playerRun() {
        const runChance = Math.random();
        if (runChance > 0.3) { // 70% 확률로 성공
            gameManager.showMessage('🏃 성공적으로 도망쳤습니다!', 'success');
            this.endCombat();
            gameState.currentScene = 'dungeon_entrance'; // 던전 입구로
            loadCurrentScene();
        } else {
            gameManager.showMessage('🏃 도망치지 못했습니다!', 'error');
            this.enemyTurn();
        }
    }

    /**
     * 적 턴 처리 (지연 및 메시지 추가)
     */
    enemyTurn(damageMultiplier = 1.0) {
        const actionsContainer = document.getElementById('gameActions');
        // 플레이어의 행동이 끝났음을 알리고, 적의 턴임을 명시적으로 표시
        actionsContainer.innerHTML = '<p style="color: #aaa; text-align: center; padding: 20px;">적의 턴...</p>';

        setTimeout(() => {
            if (this.isInCombat) {
                this.performEnemyAttack(damageMultiplier);
            }
        }, 1200); // 1.2초 지연 후 몬스터 공격
    }

    /**
     * 실제 적 공격 실행
     */
    performEnemyAttack(damageMultiplier = 1.0) {
        const player = gameState.player;
        const damage = Math.max(1, Math.floor((this.currentEnemy.attack + Math.floor(Math.random() * 3) - player.stats.defense) * damageMultiplier));
        
        player.hp -= damage;
        gameManager.showMessage(`👹 ${this.currentEnemy.name}의 반격! 당신은 ${damage}의 데미지를 입었습니다!`, 'error');

        if (player.hp <= 0) {
            this.playerLose();
            return;
        }

        updateUI();
        this.updateCombatUI(); // UI를 다시 그려 플레이어 행동 버튼 활성화
    }

    /**
     * 플레이어 승리
     */
    playerWin() {
        const player = gameState.player;
        
        // 보상 지급
        player.exp += this.currentEnemy.exp;
        player.gold += this.currentEnemy.gold;
        
        gameManager.showMessage(`🎉 ${this.currentEnemy.name}을(를) 물리쳤습니다!`, 'success');
        gameManager.showMessage(`💰 ${this.currentEnemy.gold} 골드, ✨ ${this.currentEnemy.exp} 경험치를 획득했습니다!`, 'success');

        // 레벨업 체크
        gameManager.checkLevelUp(player);

        // 승리 후 이동 대상을 저장 (endCombat 호출 전에)
        const winTarget = this.onWinTarget;
        
        this.endCombat();

        // 승리 후 이동
        if (winTarget) {
            gameState.currentScene = winTarget;
            setTimeout(() => {
                loadCurrentScene();
            }, 2000);
        } else {
            setTimeout(() => {
                loadCurrentScene();
            }, 2000);
        }
    }

    /**
     * 플레이어 패배
     */
    playerLose() {
        gameManager.showMessage('💀 패배했습니다... 마을로 돌아갑니다.', 'error');
        
        // 패널티 적용
        gameState.player.hp = Math.floor(gameState.player.maxHp * 0.5);
        gameState.player.gold = Math.floor(gameState.player.gold * 0.8);
        
        this.endCombat();
        gameState.currentScene = 'town_start';
        
        setTimeout(() => {
            loadCurrentScene();
        }, 2000);
    }

    /**
     * 전투 종료
     */
    endCombat() {
        this.isInCombat = false;
        this.currentEnemy = null;
        this.onWinTarget = null;
        updateUI();
        autoSave();
    }
}

// 전역 전투 시스템 인스턴스
const combatSystem = new CombatSystem();

/**
 * 상점 시스템
 */
class ShopSystem {
    constructor() {
        this.currentShop = null;
    }

    /**
     * 상점 열기
     */
    openShop(shopId) {
        const shop = GAME_DATA.shops[shopId];
        if (!shop) {
            gameManager.showMessage('상점 정보를 찾을 수 없습니다.', 'error');
            return;
        }

        this.currentShop = shopId;
        this.updateShopUI(shop);
    }

    /**
     * 상점 UI 업데이트
     */
    updateShopUI(shop) {
        const storyText = document.getElementById('storyText');
        const actionsContainer = document.getElementById('gameActions');

        storyText.innerHTML = `
            <h3>🏪 ${shop.name}</h3>
            <p>상인: "어서오세요! 필요한 것이 있으시면 말씀해주세요."</p>
            <p>💰 보유 골드: ${gameState.player.gold}</p>
        `;

        actionsContainer.innerHTML = '';

        // 아이템 목록
        shop.items.forEach(itemId => {
            const item = gameManager.getItem(itemId);
            if (item) {
                const button = document.createElement('button');
                button.className = 'action-btn';
                button.textContent = `${item.name} - ${item.price}G`;
                button.disabled = gameState.player.gold < item.price;
                button.addEventListener('click', () => this.buyItem(itemId));
                actionsContainer.appendChild(button);
            }
        });

        // 나가기 버튼
        const exitButton = document.createElement('button');
        exitButton.className = 'action-btn';
        exitButton.textContent = '🔙 나가기';
        exitButton.addEventListener('click', () => {
            this.currentShop = null;
            loadCurrentScene();
        });
        actionsContainer.appendChild(exitButton);
    }

    /**
     * 아이템 구매
     */
    buyItem(itemId) {
        const player = gameState.player;
        const item = gameManager.getItem(itemId);

        if (!item) {
            gameManager.showMessage('아이템 정보를 찾을 수 없습니다.', 'error');
            return;
        }

        console.log('구매 시도:', {
            itemId,
            itemName: item.name,
            itemPrice: item.price,
            itemPriceType: typeof item.price,
            playerGold: player.gold,
            playerGoldType: typeof player.gold,
            hasEnoughGold: player.gold >= item.price
        });

        if (player.gold < item.price) {
            gameManager.showMessage(`골드가 부족합니다. (보유: ${player.gold}G, 필요: ${item.price}G)`, 'error');
            return;
        }

        // 인벤토리 초기화 (구 세이브 데이터 호환성)
        if (!player.inventory) {
            player.inventory = [];
        }

        // 골드 차감
        player.gold -= item.price;

        // 인벤토리에 추가
        const existingItem = player.inventory.find(invItem => invItem.id === itemId);
        if (existingItem && item.type === 'consumable') {
            existingItem.count = (existingItem.count || 1) + 1;
        } else {
            player.inventory.push({
                id: itemId,
                name: item.name,
                type: item.type,
                count: item.type === 'consumable' ? 1 : undefined,
                ...item
            });
        }

        gameManager.showMessage(`${item.name}을(를) 구매했습니다!`, 'success');
        updateUI();
        
        // 상점 UI 새로고침
        const shop = GAME_DATA.shops[this.currentShop];
        this.updateShopUI(shop);
    }
}

// 전역 상점 시스템 인스턴스
const shopSystem = new ShopSystem();

// 기존 함수들 업데이트
function startCombat(enemyId, onWin = null, floor = 1) {
    combatSystem.startCombat(enemyId, onWin, floor);
}

function openShop(shopId) {
    shopSystem.openShop(shopId);
}

function getScene(sceneId) {
    return gameManager.getScene(sceneId);
}
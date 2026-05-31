// ============================================
// THE JINX EXCHANGE - Main Application
// Game-Driven Jinx Matching
// ============================================

// ESPN API Endpoints for each sport
// popularity = US popularity ranking (lower = more popular, used for sorting)
const ESPN_APIS = {
    // American Sports (highest US popularity)
    nfl: {
        name: 'NFL',
        icon: '🏈',
        url: 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard',
        popularity: 1
    },
    ncaaf: {
        name: 'College Football',
        icon: '🏈',
        url: 'https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard',
        popularity: 2
    },
    nba: {
        name: 'NBA',
        icon: '🏀',
        url: 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard',
        popularity: 3
    },
    mlb: {
        name: 'MLB',
        icon: '⚾',
        url: 'https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard',
        popularity: 4
    },
    ncaab: {
        name: 'College Basketball',
        icon: '🏀',
        url: 'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard',
        popularity: 5
    },
    nhl: {
        name: 'NHL',
        icon: '🏒',
        url: 'https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard',
        popularity: 6
    },
    // Major Soccer Competitions (high US interest)
    ucl: {
        name: 'Champions League',
        icon: '🏆',
        url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard',
        popularity: 7
    },
    world_cup_qual: {
        name: 'World Cup Qual.',
        icon: '🏆',
        url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.worldq/scoreboard',
        popularity: 8
    },
    // Top European Leagues
    epl: {
        name: 'Premier League',
        icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard',
        popularity: 9
    },
    ligamx: {
        name: 'Liga MX',
        icon: '🇲🇽',
        url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/mex.1/scoreboard',
        popularity: 10
    },
    mls: {
        name: 'MLS',
        icon: '⚽',
        url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/usa.1/scoreboard',
        popularity: 11
    },
    laliga: {
        name: 'La Liga',
        icon: '🇪🇸',
        url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard',
        popularity: 12
    },
    bundesliga: {
        name: 'Bundesliga',
        icon: '🇩🇪',
        url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/ger.1/scoreboard',
        popularity: 13
    },
    seriea: {
        name: 'Serie A',
        icon: '🇮🇹',
        url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/ita.1/scoreboard',
        popularity: 14
    },
    // Other European Competitions
    uel: {
        name: 'Europa League',
        icon: '🥈',
        url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.europa/scoreboard',
        popularity: 15
    },
    concacaf_nations: {
        name: 'CONCACAF Nations',
        icon: '🌎',
        url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/concacaf.nations.league/scoreboard',
        popularity: 16
    },
    ligue1: {
        name: 'Ligue 1',
        icon: '🇫🇷',
        url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/fra.1/scoreboard',
        popularity: 17
    },
    uecl: {
        name: 'Conference League',
        icon: '🥉',
        url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.europa.conf/scoreboard',
        popularity: 18
    },
    uefa_nations: {
        name: 'UEFA Nations',
        icon: '🇪🇺',
        url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.nations/scoreboard',
        popularity: 19
    },
    fifa_friendly: {
        name: 'Int\'l Friendly',
        icon: '🌍',
        url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.friendly/scoreboard',
        popularity: 20
    }
};

// Simulated other users for matching
const SIMULATED_USERS = [
    { id: 1, name: 'JinxedJoe', jinxLevel: 3 },
    { id: 2, name: 'CursedCarla', jinxLevel: 4 },
    { id: 3, name: 'UnluckySam', jinxLevel: 2 },
    { id: 4, name: 'HexedHenry', jinxLevel: 3 },
    { id: 5, name: 'DooomedDana', jinxLevel: 4 },
    { id: 6, name: 'MisfireMike', jinxLevel: 2 },
    { id: 7, name: 'BadLuckBeth', jinxLevel: 3 },
    { id: 8, name: 'JinxMaster99', jinxLevel: 4 },
    { id: 9, name: 'CurseBreaker', jinxLevel: 1 },
    { id: 10, name: 'SuperstitiousSue', jinxLevel: 3 },
    { id: 11, name: 'LucklessLarry', jinxLevel: 4 },
    { id: 12, name: 'HoodooHank', jinxLevel: 2 },
    { id: 13, name: 'VoodooVicky', jinxLevel: 3 },
    { id: 14, name: 'WhamMyWanda', jinxLevel: 4 },
    { id: 15, name: 'CharmlessChris', jinxLevel: 1 }
];

// Achievements definitions
const ACHIEVEMENTS = [
    { id: 'first_pact', name: 'First Pact', icon: '🤝', description: 'Make your first jinx exchange', requirement: (stats) => stats.totalPacts >= 1 },
    { id: 'five_pacts', name: 'Serial Exchanger', icon: '🔄', description: 'Complete 5 pacts', requirement: (stats) => stats.completedPacts >= 5 },
    { id: 'ten_pacts', name: 'Jinx Veteran', icon: '🎖️', description: 'Complete 10 pacts', requirement: (stats) => stats.completedPacts >= 10 },
    { id: 'first_win', name: 'It Worked!', icon: '🎉', description: 'Your team wins with an active pact', requirement: (stats) => stats.wins >= 1 },
    { id: 'three_streak', name: 'Hot Streak', icon: '🔥', description: 'Win 3 games in a row with pacts', requirement: (stats) => stats.winStreak >= 3 },
    { id: 'honorable', name: 'Honorable', icon: '✨', description: 'Honor 5 pacts without peeking', requirement: (stats) => stats.pactsHonored >= 5 },
    { id: 'confessor', name: 'Honest Confessor', icon: '😬', description: 'Admit to peeking at least once', requirement: (stats) => stats.timesPeeked >= 1 },
    { id: 'perfect_ten', name: 'Perfect 10', icon: '💯', description: 'Achieve 100% success rate with 10+ pacts', requirement: (stats) => stats.completedPacts >= 10 && stats.successRate === 100 },
    { id: 'multi_sport', name: 'Sports Junkie', icon: '🏆', description: 'Make pacts in 3 different sports', requirement: (stats) => stats.sportsCount >= 3 }
];

// Jinx titles based on score
const JINX_TITLES = [
    { min: 0, title: 'Rookie Jinxer', color: '#94a3b8' },
    { min: 50, title: 'Apprentice Curse-Breaker', color: '#60a5fa' },
    { min: 150, title: 'Jinx Journeyman', color: '#34d399' },
    { min: 300, title: 'Master of Anti-Jinx', color: '#a78bfa' },
    { min: 500, title: 'Legendary Curse Destroyer', color: '#fbbf24' },
    { min: 1000, title: 'The Unjinxable', color: '#f472b6' }
];

// ============================================
// STATE MANAGEMENT
// ============================================

class AppState {
    constructor() {
        this.user = null;
        this.pacts = [];
        this.stats = {
            totalPacts: 0,
            completedPacts: 0,
            wins: 0,
            losses: 0,
            ties: 0,
            pactsHonored: 0,
            timesPeeked: 0,
            jinxScore: 0,
            winStreak: 0,
            currentStreak: 0,
            successRate: 0,
            sportsCount: 0
        };
        this.achievements = [];
        this.load();
    }

    load() {
        const saved = localStorage.getItem('jinxExchange');
        if (saved) {
            const data = JSON.parse(saved);
            this.user = data.user || null;
            this.pacts = data.pacts || [];
            this.stats = { ...this.stats, ...data.stats };
            this.achievements = data.achievements || [];
        }
    }

    save() {
        localStorage.setItem('jinxExchange', JSON.stringify({
            user: this.user,
            pacts: this.pacts,
            stats: this.stats,
            achievements: this.achievements
        }));
    }

    reset() {
        localStorage.removeItem('jinxExchange');
        this.user = null;
        this.pacts = [];
        this.stats = {
            totalPacts: 0,
            completedPacts: 0,
            wins: 0,
            losses: 0,
            ties: 0,
            pactsHonored: 0,
            timesPeeked: 0,
            jinxScore: 0,
            winStreak: 0,
            currentStreak: 0,
            successRate: 0,
            sportsCount: 0
        };
        this.achievements = [];
    }

    updateStats() {
        const completed = this.pacts.filter(p => p.status === 'completed');
        this.stats.totalPacts = this.pacts.length;
        this.stats.completedPacts = completed.length;
        this.stats.wins = completed.filter(p => p.result === 'win').length;
        this.stats.losses = completed.filter(p => p.result === 'loss').length;
        this.stats.ties = completed.filter(p => p.result === 'tie').length;
        this.stats.pactsHonored = completed.filter(p => p.honored).length;
        this.stats.timesPeeked = completed.filter(p => p.honored === false).length;

        // Count unique sports
        const sports = new Set(this.pacts.map(p => p.sport));
        this.stats.sportsCount = sports.size;

        if (this.stats.completedPacts > 0) {
            this.stats.successRate = Math.round((this.stats.wins / this.stats.completedPacts) * 100);
        }

        // Calculate jinx score
        this.stats.jinxScore = (this.stats.wins * 20) +
                              (this.stats.pactsHonored * 10) -
                              (this.stats.timesPeeked * 5) +
                              (this.stats.winStreak * 15);

        this.save();
    }

    checkAchievements() {
        const newAchievements = [];
        ACHIEVEMENTS.forEach(ach => {
            if (!this.achievements.includes(ach.id) && ach.requirement(this.stats)) {
                this.achievements.push(ach.id);
                newAchievements.push(ach);
            }
        });
        this.save();
        return newAchievements;
    }
}

// ============================================
// GAMES SERVICE - Fetch from ESPN API
// ============================================

class GamesService {
    constructor() {
        this.cache = new Map();
        this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
    }

    async fetchAllGames() {
        const allGames = [];
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const todayStr = this.formatDateForAPI(today);
        const tomorrowStr = this.formatDateForAPI(tomorrow);

        // Fetch from all sports in parallel
        const promises = Object.entries(ESPN_APIS).map(async ([sportKey, sport]) => {
            try {
                // Fetch today's games
                const todayGames = await this.fetchGamesForDate(sportKey, sport, todayStr, 'Today');
                // Fetch tomorrow's games
                const tomorrowGames = await this.fetchGamesForDate(sportKey, sport, tomorrowStr, 'Tomorrow');
                return [...todayGames, ...tomorrowGames];
            } catch (error) {
                console.warn(`Failed to fetch ${sport.name} games:`, error);
                return [];
            }
        });

        const results = await Promise.all(promises);
        results.forEach(games => allGames.push(...games));

        // Sort by US popularity first, then by time
        allGames.sort((a, b) => {
            // First sort by popularity (lower = more popular)
            const popA = ESPN_APIS[a.sport]?.popularity || 99;
            const popB = ESPN_APIS[b.sport]?.popularity || 99;
            if (popA !== popB) return popA - popB;
            // Then by game time
            return new Date(a.dateTime) - new Date(b.dateTime);
        });

        return allGames;
    }

    async fetchGamesForDate(sportKey, sport, dateStr, dayLabel) {
        const cacheKey = `${sportKey}-${dateStr}`;

        // Check cache
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheExpiry) {
                return cached.data;
            }
        }

        try {
            const url = `${sport.url}?dates=${dateStr}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            const games = this.parseGames(data, sportKey, sport, dayLabel);

            // Cache the results
            this.cache.set(cacheKey, {
                data: games,
                timestamp: Date.now()
            });

            return games;
        } catch (error) {
            console.warn(`Error fetching ${sport.name} for ${dateStr}:`, error);
            return [];
        }
    }

    parseGames(data, sportKey, sport, dayLabel) {
        if (!data.events || !Array.isArray(data.events)) {
            return [];
        }

        return data.events.map(event => {
            const competition = event.competitions?.[0];
            if (!competition) return null;

            const homeTeam = competition.competitors?.find(c => c.homeAway === 'home');
            const awayTeam = competition.competitors?.find(c => c.homeAway === 'away');

            if (!homeTeam || !awayTeam) return null;

            const status = competition.status?.type?.name || 'scheduled';
            const statusDetail = competition.status?.type?.shortDetail || '';

            return {
                id: event.id,
                sport: sportKey,
                sportName: sport.name,
                sportIcon: sport.icon,
                homeTeam: {
                    name: homeTeam.team?.displayName || homeTeam.team?.name || 'TBD',
                    abbreviation: homeTeam.team?.abbreviation || '',
                    logo: homeTeam.team?.logo || null,
                    score: homeTeam.score || '0'
                },
                awayTeam: {
                    name: awayTeam.team?.displayName || awayTeam.team?.name || 'TBD',
                    abbreviation: awayTeam.team?.abbreviation || '',
                    logo: awayTeam.team?.logo || null,
                    score: awayTeam.score || '0'
                },
                dateTime: event.date,
                dayLabel: dayLabel,
                venue: competition.venue?.fullName || '',
                status: status,
                statusDetail: statusDetail,
                isLive: status === 'in' || statusDetail.includes('Half') || statusDetail.includes('Quarter') || statusDetail.includes('Period'),
                isComplete: status === 'post'
            };
        }).filter(g => g !== null);
    }

    formatDateForAPI(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    }

    formatGameTime(dateTimeStr) {
        const date = new Date(dateTimeStr);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    formatGameDate(dateTimeStr) {
        const date = new Date(dateTimeStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }
}

// ============================================
// APP CONTROLLER
// ============================================

class JinxExchangeApp {
    constructor() {
        this.state = new AppState();
        this.gamesService = new GamesService();
        this.games = [];
        this.filteredGames = [];
        this.currentFilter = 'all';
        this.currentPactId = null;
        this.selectedResult = null;
        this.selectedHonored = null;
        this.selectedGame = null;
        this.selectedTeam = null;
        this.init();
    }

    async init() {
        this.bindEvents();
        this.updateUI();

        // Load games on startup if user exists
        if (this.state.user) {
            this.loadGames();
        }
    }

    // ========== EVENT BINDING ==========

    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.navigateToTab(e.target.dataset.tab));
        });

        // Navigate buttons
        document.querySelectorAll('[data-navigate]').forEach(btn => {
            btn.addEventListener('click', (e) => this.navigateToTab(e.target.dataset.navigate));
        });

        // Jinx level selection
        document.querySelectorAll('.jinx-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.jinx-btn').forEach(b => b.classList.remove('selected'));
                e.target.closest('.jinx-btn').classList.add('selected');
            });
        });

        // Save profile
        document.getElementById('save-profile').addEventListener('click', () => this.saveProfile());

        // Refresh games
        document.getElementById('refresh-games')?.addEventListener('click', () => this.loadGames());

        // Pact modal
        document.getElementById('confirm-pact').addEventListener('click', () => this.confirmPact());
        document.getElementById('cancel-pact').addEventListener('click', () => this.closePactModal());

        // Team selection modal
        document.getElementById('cancel-team-select')?.addEventListener('click', () => this.closeTeamSelectModal());

        // Pact filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.renderPacts(e.target.dataset.filter);
            });
        });

        // Result modal
        document.querySelectorAll('.result-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.result-btn').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                this.selectedResult = e.target.dataset.result;
                this.checkResultSubmitEnabled();
            });
        });

        document.querySelectorAll('.honor-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.honor-btn').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                this.selectedHonored = e.target.dataset.honored === 'true';
                this.checkResultSubmitEnabled();
            });
        });

        document.getElementById('submit-result').addEventListener('click', () => this.submitResult());
        document.getElementById('cancel-result').addEventListener('click', () => this.closeResultModal());

        // Reset data
        document.getElementById('reset-data').addEventListener('click', () => {
            if (confirm('Are you sure? This will delete all your data permanently.')) {
                this.state.reset();
                this.updateUI();
                this.showToast('All data has been reset', 'success');
            }
        });
    }

    // ========== NAVIGATION ==========

    navigateToTab(tabId) {
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`[data-tab="${tabId}"]`)?.classList.add('active');

        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById(tabId)?.classList.add('active');

        // Refresh content when navigating
        if (tabId === 'find-match') this.loadGames();
        if (tabId === 'my-pacts') this.renderPacts('active');
        if (tabId === 'stats') this.renderStats();
    }

    // ========== PROFILE SETUP ==========

    saveProfile() {
        const name = document.getElementById('username').value.trim();
        const jinxLevel = document.querySelector('.jinx-btn.selected')?.dataset.level || 3;

        if (!name) {
            this.showToast('Please enter your name', 'error');
            return;
        }

        this.state.user = {
            name,
            jinxLevel: parseInt(jinxLevel),
            createdAt: new Date().toISOString()
        };
        this.state.save();
        this.updateUI();
        this.loadGames();
        this.showToast('Welcome to The Jinx Exchange! Browse today\'s games to find a partner.', 'success');
    }

    // ========== GAMES LOADING ==========

    async loadGames() {
        const container = document.getElementById('games-container');
        const loadingEl = document.getElementById('games-loading');

        if (loadingEl) loadingEl.classList.remove('hidden');
        if (container) container.innerHTML = '';

        try {
            this.games = await this.gamesService.fetchAllGames();
            this.currentDay = 'today'; // Default to today
            this.currentFilter = 'all';
            this.renderDayToggle();
            this.renderSportFilters();
            this.filterGames();
        } catch (error) {
            console.error('Failed to load games:', error);
            if (container) {
                container.innerHTML = '<p class="empty-state">Failed to load games. Please try again.</p>';
            }
        } finally {
            if (loadingEl) loadingEl.classList.add('hidden');
        }
    }

    renderDayToggle() {
        const container = document.getElementById('day-toggle');
        if (!container) return;

        // Count games for each day (excluding completed games)
        const todayCount = this.games.filter(g => g.dayLabel === 'Today' && !g.isComplete).length;
        const tomorrowCount = this.games.filter(g => g.dayLabel === 'Tomorrow' && !g.isComplete).length;

        container.innerHTML = `
            <button class="day-toggle-btn ${this.currentDay === 'today' ? 'active' : ''}" data-day="today">
                Today <span class="game-count">${todayCount}</span>
            </button>
            <button class="day-toggle-btn ${this.currentDay === 'tomorrow' ? 'active' : ''}" data-day="tomorrow">
                Tomorrow <span class="game-count">${tomorrowCount}</span>
            </button>
        `;

        // Bind day toggle events
        container.querySelectorAll('.day-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                container.querySelectorAll('.day-toggle-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.currentDay = e.currentTarget.dataset.day;
                this.filterGames();
            });
        });
    }

    renderSportFilters() {
        const container = document.getElementById('sport-filters');
        if (!container) return;

        // Get games for current day (excluding completed), to show accurate counts
        const dayLabel = this.currentDay === 'today' ? 'Today' : 'Tomorrow';
        const dayGames = this.games.filter(g => g.dayLabel === dayLabel && !g.isComplete);
        const sportsInGames = new Set(dayGames.map(g => g.sport));

        let html = `<button class="sport-filter-btn ${this.currentFilter === 'all' ? 'active' : ''}" data-sport="all">All (${dayGames.length})</button>`;

        // Sort sports by US popularity before rendering filters
        const sortedSports = Object.entries(ESPN_APIS)
            .filter(([key]) => sportsInGames.has(key))
            .sort((a, b) => (a[1].popularity || 99) - (b[1].popularity || 99));

        sortedSports.forEach(([key, sport]) => {
            const count = dayGames.filter(g => g.sport === key).length;
            html += `<button class="sport-filter-btn ${this.currentFilter === key ? 'active' : ''}" data-sport="${key}">${sport.icon} ${sport.name} (${count})</button>`;
        });

        container.innerHTML = html;

        // Bind filter events
        container.querySelectorAll('.sport-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                container.querySelectorAll('.sport-filter-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.currentFilter = e.currentTarget.dataset.sport;
                this.filterGames();
            });
        });
    }

    filterGames() {
        // Filter by day first
        const dayLabel = this.currentDay === 'today' ? 'Today' : 'Tomorrow';
        let filtered = this.games.filter(g => g.dayLabel === dayLabel);

        // Exclude completed games
        filtered = filtered.filter(g => !g.isComplete);

        // Then filter by sport
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(g => g.sport === this.currentFilter);
        }

        // Sort by popularity then by time
        filtered.sort((a, b) => {
            const popA = ESPN_APIS[a.sport]?.popularity || 99;
            const popB = ESPN_APIS[b.sport]?.popularity || 99;
            if (popA !== popB) return popA - popB;
            return new Date(a.dateTime) - new Date(b.dateTime);
        });

        this.filteredGames = filtered;
        this.renderSportFilters(); // Update counts when day changes
        this.renderGames();
    }

    renderGames() {
        const container = document.getElementById('games-container');
        if (!container) return;

        const dayLabel = this.currentDay === 'today' ? 'Today' : 'Tomorrow';

        if (this.filteredGames.length === 0) {
            const sportText = this.currentFilter === 'all' ? '' : ` for ${ESPN_APIS[this.currentFilter]?.name || this.currentFilter}`;
            container.innerHTML = `<p class="empty-state">No upcoming games${sportText} ${dayLabel.toLowerCase()}.</p>`;
            return;
        }

        let html = '<div class="games-grid">';
        html += this.filteredGames.map(game => this.renderGameCard(game)).join('');
        html += '</div>';

        container.innerHTML = html;

        // Bind game card events
        container.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const gameId = card.dataset.gameId;
                const game = this.games.find(g => g.id === gameId);
                if (game && !game.isComplete) {
                    this.openTeamSelectModal(game);
                }
            });
        });
    }

    renderGameCard(game) {
        const time = this.gamesService.formatGameTime(game.dateTime);
        const isDisabled = game.isComplete;

        let statusBadge = '';
        if (game.isLive) {
            statusBadge = '<span class="game-status live">LIVE</span>';
        } else if (game.isComplete) {
            statusBadge = '<span class="game-status final">FINAL</span>';
        }

        // Build class list with live status
        const cardClasses = ['game-card'];
        if (isDisabled) cardClasses.push('disabled');
        if (game.isLive) cardClasses.push('live');

        return `
            <div class="${cardClasses.join(' ')}" data-game-id="${game.id}" data-sport="${game.sport}">
                <div class="game-header">
                    <span class="sport-badge">${game.sportIcon} ${game.sportName}</span>
                    ${statusBadge}
                </div>
                <div class="game-teams">
                    <div class="team away">
                        ${game.awayTeam.logo ? `<img src="${game.awayTeam.logo}" alt="${game.awayTeam.abbreviation}" class="team-logo">` : ''}
                        <span class="team-name">${game.awayTeam.name}</span>
                        ${game.isLive || game.isComplete ? `<span class="team-score">${game.awayTeam.score}</span>` : ''}
                    </div>
                    <div class="vs">@</div>
                    <div class="team home">
                        ${game.homeTeam.logo ? `<img src="${game.homeTeam.logo}" alt="${game.homeTeam.abbreviation}" class="team-logo">` : ''}
                        <span class="team-name">${game.homeTeam.name}</span>
                        ${game.isLive || game.isComplete ? `<span class="team-score">${game.homeTeam.score}</span>` : ''}
                    </div>
                </div>
                <div class="game-info">
                    <span class="game-time">🕐 ${time}</span>
                    ${game.venue ? `<span class="game-venue">📍 ${game.venue}</span>` : ''}
                </div>
                ${!isDisabled ? '<div class="game-cta">Tap to find a jinx partner</div>' : ''}
            </div>
        `;
    }

    // ========== TEAM SELECTION ==========

    openTeamSelectModal(game) {
        this.selectedGame = game;
        const modal = document.getElementById('team-select-modal');
        const content = document.getElementById('team-select-content');

        content.innerHTML = `
            <p>Which team do you want to NOT jinx?</p>
            <div class="team-select-options">
                <button class="team-option" data-team="away">
                    ${game.awayTeam.logo ? `<img src="${game.awayTeam.logo}" alt="" class="team-option-logo">` : ''}
                    <span>${game.awayTeam.name}</span>
                </button>
                <button class="team-option" data-team="home">
                    ${game.homeTeam.logo ? `<img src="${game.homeTeam.logo}" alt="" class="team-option-logo">` : ''}
                    <span>${game.homeTeam.name}</span>
                </button>
            </div>
        `;

        // Bind team selection
        content.querySelectorAll('.team-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const teamSide = e.currentTarget.dataset.team;
                this.selectedTeam = teamSide === 'home' ? game.homeTeam : game.awayTeam;
                const opponentTeam = teamSide === 'home' ? game.awayTeam : game.homeTeam;
                this.closeTeamSelectModal();
                this.showPartnerMatches(game, this.selectedTeam, opponentTeam);
            });
        });

        modal.classList.remove('hidden');
    }

    closeTeamSelectModal() {
        document.getElementById('team-select-modal').classList.add('hidden');
        this.selectedGame = null;
    }

    showPartnerMatches(game, myTeam, opponentTeam) {
        // Simulate finding partners who root for the opponent
        const matches = SIMULATED_USERS
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map(user => ({
                ...user,
                team: opponentTeam.name
            }));

        this.renderPartnerMatches(game, myTeam, opponentTeam, matches);
    }

    renderPartnerMatches(game, myTeam, opponentTeam, matches) {
        const container = document.getElementById('games-container');

        let html = `
            <div class="partner-search-header">
                <button class="btn btn-secondary back-to-games">← Back to Games</button>
                <h3>Find a Jinx Partner</h3>
                <p class="selected-game-info">
                    ${game.sportIcon} <strong>${myTeam.name}</strong> vs ${opponentTeam.name}
                    <br><small>${game.dayLabel} at ${this.gamesService.formatGameTime(game.dateTime)}</small>
                </p>
            </div>
            <div class="partner-explanation">
                <p>These ${opponentTeam.name} fans also believe they jinx their team.
                Make a pact: you won't watch ${myTeam.name}, they won't watch ${opponentTeam.name}.
                The jinxes cancel out!</p>
            </div>
            <div class="partners-list">
                ${matches.map(match => `
                    <div class="match-card">
                        <div class="match-info">
                            <div class="match-name">${match.name}</div>
                            <div class="match-team">${match.team} fan</div>
                            <div class="match-jinx">${'😱'.repeat(match.jinxLevel)} Jinx Level ${match.jinxLevel}</div>
                        </div>
                        <button class="propose-btn" data-match='${JSON.stringify({
                            ...match,
                            game: {
                                id: game.id,
                                sport: game.sport,
                                sportName: game.sportName,
                                sportIcon: game.sportIcon,
                                dateTime: game.dateTime,
                                dayLabel: game.dayLabel
                            },
                            myTeam: myTeam,
                            opponentTeam: opponentTeam
                        })}'>
                            Propose Pact
                        </button>
                    </div>
                `).join('')}
            </div>
        `;

        container.innerHTML = html;

        // Bind back button
        container.querySelector('.back-to-games').addEventListener('click', () => {
            this.renderGames();
            this.renderSportFilters();
        });

        // Bind propose buttons
        container.querySelectorAll('.propose-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const matchData = JSON.parse(e.target.dataset.match);
                this.openPactModal(matchData);
            });
        });
    }

    // ========== PACT MANAGEMENT ==========

    openPactModal(matchData) {
        const modal = document.getElementById('pact-modal');
        const details = document.getElementById('pact-details');

        details.innerHTML = `
            <div class="pact-preview">
                <p><strong>Game:</strong> ${matchData.game.sportIcon} ${matchData.myTeam.name} vs ${matchData.opponentTeam.name}</p>
                <p><strong>When:</strong> ${matchData.game.dayLabel} at ${this.gamesService.formatGameTime(matchData.game.dateTime)}</p>
                <p><strong>Your Team:</strong> ${matchData.myTeam.name}</p>
                <p><strong>Partner:</strong> ${matchData.name} (${matchData.opponentTeam.name} fan)</p>
                <p><strong>Their Jinx Level:</strong> ${'😱'.repeat(matchData.jinxLevel)}</p>
            </div>
            <p>By sealing this pact, you agree to watch your team play.
            Your partner does the same. Both jinxes activate and cancel each other out!</p>
        `;

        this.pendingPactData = matchData;
        modal.classList.remove('hidden');
    }

    closePactModal() {
        document.getElementById('pact-modal').classList.add('hidden');
        this.pendingPactData = null;
    }

    confirmPact() {
        if (!this.pendingPactData) return;

        const pact = {
            id: Date.now(),
            gameId: this.pendingPactData.game.id,
            sport: this.pendingPactData.game.sport,
            sportName: this.pendingPactData.game.sportName,
            sportIcon: this.pendingPactData.game.sportIcon,
            myTeam: this.pendingPactData.myTeam.name,
            opponentTeam: this.pendingPactData.opponentTeam.name,
            partner: this.pendingPactData.name,
            partnerJinxLevel: this.pendingPactData.jinxLevel,
            gameDate: this.pendingPactData.game.dateTime,
            dayLabel: this.pendingPactData.game.dayLabel,
            createdAt: new Date().toISOString(),
            status: 'active',
            result: null,
            honored: null
        };

        this.state.pacts.push(pact);
        this.state.updateStats();

        const newAchievements = this.state.checkAchievements();

        this.closePactModal();
        this.showToast('🤝 Pact sealed! May the jinx be broken!', 'success');

        newAchievements.forEach(ach => {
            setTimeout(() => {
                this.showToast(`🏅 Achievement unlocked: ${ach.name}!`, 'success');
            }, 1500);
        });

        this.renderGames();
        this.updateUI();
    }

    renderPacts(filter = 'active') {
        const container = document.getElementById('pacts-list');

        let filteredPacts = this.state.pacts;

        if (filter === 'active') {
            filteredPacts = this.state.pacts.filter(p => p.status === 'active');
        } else if (filter === 'pending') {
            filteredPacts = this.state.pacts.filter(p => p.status === 'pending-result');
        } else if (filter === 'completed') {
            filteredPacts = this.state.pacts.filter(p => p.status === 'completed');
        }

        if (filteredPacts.length === 0) {
            container.innerHTML = '<p class="empty-state">No pacts in this category.</p>';
            return;
        }

        container.innerHTML = filteredPacts.map(pact => `
            <div class="pact-item ${pact.status === 'completed' ? 'completed' : ''} ${pact.status === 'pending-result' ? 'pending-result' : ''}">
                <div class="pact-header">
                    <div class="pact-game">${pact.sportIcon} ${pact.myTeam} vs ${pact.opponentTeam}</div>
                    <span class="pact-status ${pact.status === 'active' ? 'active' : ''} ${pact.status === 'pending-result' ? 'pending' : ''} ${pact.status === 'completed' ? 'completed' : ''}">
                        ${pact.status === 'active' ? 'Active' : pact.status === 'pending-result' ? 'Log Result' : 'Completed'}
                    </span>
                </div>
                <div class="pact-partner">Partner: ${pact.partner} ${'😱'.repeat(pact.partnerJinxLevel)}</div>
                <div class="pact-date">📅 ${pact.dayLabel} - ${this.gamesService.formatGameTime(pact.gameDate)}</div>
                ${pact.status === 'completed' ? `
                    <div class="pact-result">
                        Result: ${pact.result === 'win' ? '🎉 Win!' : pact.result === 'loss' ? '😢 Loss' : '🤷 Tie'}
                        ${pact.honored ? '✅ Honored' : '👀 Peeked'}
                    </div>
                ` : ''}
                ${pact.status === 'active' ? `
                    <div class="pact-actions">
                        <button class="btn btn-secondary mark-played" data-pact-id="${pact.id}">Game Finished</button>
                    </div>
                ` : ''}
                ${pact.status === 'pending-result' ? `
                    <div class="pact-actions">
                        <button class="btn btn-primary log-result" data-pact-id="${pact.id}">Log Result</button>
                    </div>
                ` : ''}
            </div>
        `).join('');

        // Bind action buttons
        container.querySelectorAll('.mark-played').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const pactId = parseInt(e.target.dataset.pactId);
                this.markGamePlayed(pactId);
            });
        });

        container.querySelectorAll('.log-result').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const pactId = parseInt(e.target.dataset.pactId);
                this.openResultModal(pactId);
            });
        });
    }

    markGamePlayed(pactId) {
        const pact = this.state.pacts.find(p => p.id === pactId);
        if (pact) {
            pact.status = 'pending-result';
            this.state.save();
            this.renderPacts('active');
            this.showToast('Game marked as finished. Don\'t forget to log the result!', 'success');
        }
    }

    openResultModal(pactId) {
        const pact = this.state.pacts.find(p => p.id === pactId);
        if (!pact) return;

        this.currentPactId = pactId;
        this.selectedResult = null;
        this.selectedHonored = null;

        // Reset button states
        document.querySelectorAll('.result-btn, .honor-btn').forEach(b => b.classList.remove('selected'));
        document.getElementById('submit-result').disabled = true;

        const details = document.getElementById('result-details');
        details.innerHTML = `
            <div class="pact-preview">
                <p><strong>Game:</strong> ${pact.sportIcon} ${pact.myTeam} vs ${pact.opponentTeam}</p>
                <p><strong>Your Team:</strong> ${pact.myTeam}</p>
                <p><strong>Partner:</strong> ${pact.partner}</p>
            </div>
        `;

        document.getElementById('result-modal').classList.remove('hidden');
    }

    closeResultModal() {
        document.getElementById('result-modal').classList.add('hidden');
        this.currentPactId = null;
        this.selectedResult = null;
        this.selectedHonored = null;
    }

    checkResultSubmitEnabled() {
        const btn = document.getElementById('submit-result');
        btn.disabled = !(this.selectedResult && this.selectedHonored !== null);
    }

    submitResult() {
        if (!this.currentPactId || !this.selectedResult || this.selectedHonored === null) return;

        const pact = this.state.pacts.find(p => p.id === this.currentPactId);
        if (pact) {
            pact.status = 'completed';
            pact.result = this.selectedResult;
            pact.honored = this.selectedHonored;
            pact.completedAt = new Date().toISOString();

            // Update streak
            if (this.selectedResult === 'win') {
                this.state.stats.currentStreak++;
                if (this.state.stats.currentStreak > this.state.stats.winStreak) {
                    this.state.stats.winStreak = this.state.stats.currentStreak;
                }
            } else {
                this.state.stats.currentStreak = 0;
            }

            this.state.updateStats();
            const newAchievements = this.state.checkAchievements();

            this.closeResultModal();
            this.renderPacts('pending');
            this.updateUI();

            if (this.selectedResult === 'win' && this.selectedHonored) {
                this.showToast('🎉 The jinx exchange worked! Victory!', 'success');
            } else if (this.selectedResult === 'win' && !this.selectedHonored) {
                this.showToast('You won... but you peeked! 👀', 'success');
            } else if (!this.selectedHonored) {
                this.showToast('Maybe peeking caused the loss? 🤔', 'error');
            } else {
                this.showToast('Result logged. The jinx remains mysterious...', 'success');
            }

            newAchievements.forEach(ach => {
                setTimeout(() => {
                    this.showToast(`🏅 Achievement unlocked: ${ach.name}!`, 'success');
                }, 1500);
            });
        }
    }

    // ========== STATS ==========

    renderStats() {
        document.getElementById('stat-wins').textContent = this.state.stats.wins;
        document.getElementById('stat-losses').textContent = this.state.stats.losses;
        document.getElementById('stat-honored').textContent = this.state.stats.pactsHonored;
        document.getElementById('stat-peeked').textContent = this.state.stats.timesPeeked;

        // Jinx meter
        const maxScore = 500;
        const percentage = Math.min((this.state.stats.jinxScore / maxScore) * 100, 100);
        document.getElementById('jinx-meter-fill').style.width = `${percentage}%`;

        // Jinx title
        const title = JINX_TITLES.slice().reverse().find(t => this.state.stats.jinxScore >= t.min);
        document.getElementById('jinx-level-label').textContent = title ? title.title : 'Build your record!';
        document.getElementById('jinx-level-label').style.color = title?.color || 'inherit';

        // Achievements
        const achievementsContainer = document.getElementById('achievements-list');
        achievementsContainer.innerHTML = ACHIEVEMENTS.map(ach => `
            <div class="achievement ${this.state.achievements.includes(ach.id) ? 'unlocked' : ''}">
                <div class="achievement-icon">${ach.icon}</div>
                <div class="achievement-name">${ach.name}</div>
            </div>
        `).join('');
    }

    // ========== UI UPDATES ==========

    updateUI() {
        if (this.state.user) {
            // Show dashboard, hide onboarding
            document.getElementById('onboarding').classList.add('hidden');
            document.getElementById('dashboard').classList.remove('hidden');

            // Update user status
            const userStatus = document.getElementById('user-status');
            userStatus.textContent = `${this.state.user.name} | ${'😱'.repeat(this.state.user.jinxLevel)} Jinx Level`;
            userStatus.classList.remove('hidden');

            // Update dashboard stats
            document.getElementById('total-pacts').textContent = this.state.stats.totalPacts;
            document.getElementById('success-rate').textContent =
                this.state.stats.completedPacts > 0 ? `${this.state.stats.successRate}%` : '--%';
            document.getElementById('jinx-score').textContent = this.state.stats.jinxScore;

            // Active pacts preview
            const activePacts = this.state.pacts.filter(p => p.status === 'active' || p.status === 'pending-result');
            const preview = document.getElementById('active-pacts-preview');
            if (activePacts.length > 0) {
                preview.innerHTML = activePacts.slice(0, 2).map(p => `
                    <div class="pact-item" style="margin-bottom: 0.5rem;">
                        <strong>${p.sportIcon} ${p.myTeam} vs ${p.opponentTeam}</strong>
                        <span class="pact-status ${p.status === 'pending-result' ? 'pending' : 'active'}">
                            ${p.status === 'pending-result' ? 'Log Result' : 'Active'}
                        </span>
                    </div>
                `).join('');
            } else {
                preview.innerHTML = '<p class="empty-state">No active pacts</p>';
            }

            this.renderStats();
        } else {
            // Show onboarding
            document.getElementById('onboarding').classList.remove('hidden');
            document.getElementById('dashboard').classList.add('hidden');
            document.getElementById('user-status').classList.add('hidden');
        }
    }

    // ========== UTILITIES ==========

    showToast(message, type = 'success') {
        // Remove existing toast
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.remove(), 3000);
    }
}

// ============================================
// INITIALIZE APP
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    window.app = new JinxExchangeApp();
});

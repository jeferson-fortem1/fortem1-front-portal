const hostUrl = window.location.hostname === 'homolog.fortem1.com.br' ? 'http://homolog.fortem1.com.br' : window.location.origin;
const protocolSSL = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
// const rangerHostUrl =  window.location.hostname === 'www.fortem1.com.br' ? 'ws://www.fortem1.com.br' : `${protocolSSL}${window.location.hostname}`;

export const defaultConfig: Config = {
    api: {
        authUrl: `http://homolog.fortem1.com.br/api/v2/authz`,
        tradeUrl: `http://homolog.fortem1.com.br/api/v2/trade`,
        applogicUrl: `http://homolog.fortem1.com.br/api/v2/applogic`,
        rangerUrl: `ws://homolog.fortem1.com.br/api/v2/stream`,
        finexUrl: `http://homolog.fortem1.com.br/api/v2/trade`,
        p2pUrl: `${hostUrl}/api/v2/p2p`,
    },
    finex: false,
    withCredentials: true,
    incrementalOrderBook: true,
    isResizable: true,
    isDraggable: true,
    showLanding: true,
    sentryEnabled: false,
    captchaLogin: false,
    usernameEnabled: true,
    gaTrackerKey: '',
    minutesUntilAutoLogout: '5',
    msAlertDisplayTime: '5000',
    msPricesUpdates: '3000',
    sessionCheckInterval: '500000',
    balancesFetchInterval: '3000',
    passwordEntropyStep: '14',
    storage: {
        defaultStorageLimit: '100',
        orderBookSideLimit: '50'
    },
    
    languages: ['pt', 'en'],
    kycSteps: [
        'email',
        'profile',
        'document'
    ],
    captcha_type: 'none',
    password_min_entropy: 8,
    wizard_step: 'false',
    barong_upload_size_min_range: '0.01',
    barong_upload_size_max_range: '20',
    themeSwitcher: 'visible',
    peatio_platform_currency: 'brl',
    useSharedLayout: 'false',
    tvDefaultCandles: 30,
};

export const Cryptobase = {
    config: defaultConfig,
};

Cryptobase.config = { ...defaultConfig, ...window.env };
Cryptobase.config.storage = { ...defaultConfig.storage, ...Cryptobase.config.storage };

const convertToBoolean = (value: any): boolean => {
    return String(value) === 'true';
}

export const tradeUrl = () => Cryptobase.config.api.tradeUrl;
export const authUrl = () => Cryptobase.config.api.authUrl;
export const applogicUrl = () => Cryptobase.config.api.applogicUrl;
export const rangerUrl = () => Cryptobase.config.api.rangerUrl;
export const finexUrl = () => Cryptobase.config.api.finexUrl || tradeUrl();
export const p2pUrl = () => Cryptobase.config.api.p2pUrl;
export const withCredentials = () => convertToBoolean(Cryptobase.config.withCredentials);
export const incrementalOrderBook = () => convertToBoolean(Cryptobase.config.incrementalOrderBook);
export const isResizableGrid = () => convertToBoolean(Cryptobase.config.isResizable);
export const isDraggableGrid = () => convertToBoolean(Cryptobase.config.isDraggable);
export const isFinexEnabled = () => convertToBoolean(Cryptobase.config.finex);
export const showLanding = () => convertToBoolean(Cryptobase.config.showLanding);
export const sentryEnabled = () => convertToBoolean(Cryptobase.config.sentryEnabled);
export const captchaLogin = () => convertToBoolean(Cryptobase.config.captchaLogin);
export const minutesUntilAutoLogout = () => Cryptobase.config.minutesUntilAutoLogout;
export const sessionCheckInterval = () => Cryptobase.config.sessionCheckInterval;
export const balancesFetchInterval = () => Cryptobase.config.balancesFetchInterval;
export const gaTrackerKey = () => Cryptobase.config.gaTrackerKey;
export const msAlertDisplayTime = () => Cryptobase.config.msAlertDisplayTime;
export const msPricesUpdates = () => Cryptobase.config.msPricesUpdates;
export const defaultStorageLimit = () => Number(Cryptobase.config.storage.defaultStorageLimit);
export const orderBookSideLimit = () => Number(Cryptobase.config.storage.orderBookSideLimit);
export const passwordEntropyStep = () => Number(Cryptobase.config.passwordEntropyStep);
export const languages = (Cryptobase.config.languages && Cryptobase.config.languages.length > 0) ? Cryptobase.config.languages : ['pt'];
export const kycSteps = () => Cryptobase.config.kycSteps;
export const isUsernameEnabled = () => convertToBoolean(Cryptobase.config.usernameEnabled);
export const captchaType = () => Cryptobase.config.captcha_type;
export const captchaId = () => Cryptobase.config.captcha_id;
export const passwordMinEntropy = () => Number(Cryptobase.config.password_min_entropy);
export const wizardStep = () => String(Cryptobase.config.wizard_step || '1');
export const barongUploadSizeMinRange = Number(Cryptobase.config.barong_upload_size_min_range || '1');
export const barongUploadSizeMaxRange = Number(Cryptobase.config.barong_upload_size_max_range || '20');
export const themeSwitcher = () => Cryptobase.config.themeSwitcher;
export const platformCurrency = () => Cryptobase.config.peatio_platform_currency.toUpperCase();
export const useSharedLayout = () => convertToBoolean(Cryptobase.config.useSharedLayout);
export const tvDefaultCandles = () => Number(Cryptobase.config.tvDefaultCandles || 20);

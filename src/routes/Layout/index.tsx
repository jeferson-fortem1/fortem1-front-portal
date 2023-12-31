import classnames from 'classnames';
import * as React from 'react';
import { Spinner } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Route, RouterProps, Switch } from 'react-router';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../../';
import {
    minutesUntilAutoLogout,
    sessionCheckInterval,
    showLanding,
    wizardStep,
    useSharedLayout,
} from '../../api';
import { ExpiredSessionModal } from '../../components';
import { WalletsFetch } from '../../containers';
import { P2PTradesHistory } from '../../containers/P2P/TradesHistory';
import { applyCustomizationSettings, toggleColorTheme } from '../../helpers';
import {
    ChangeForgottenPasswordMobileScreen,
    ConfirmMobileScreen,
    EmailVerificationMobileScreen,
    ForgotPasswordMobileScreen,
    
    OrdersMobileScreen,
    ProfileAccountActivityMobileScreen,
    ProfileApiKeysMobileScreen,
    ProfileAuthMobileScreen,
    ProfileChangePasswordMobileScreen,
    ProfileLanguageMobileScreen,
    ProfileMobileScreen,
    ProfileThemeMobileScreen,
    ProfileVerificationMobileScreen,
    SelectedWalletMobileScreen,
    SignInMobileScreen,
    SignUpMobileScreen,
    TradingScreenMobile,
    WalletDeposit,
    WalletsMobileScreen,
    WalletWithdraw,
} from '../../mobile/screens';
import {
    logoutFetch,
    Market,
    RootState,
    selectCurrentColorTheme,
    selectCurrentMarket,
    selectMobileDeviceState,
    selectPlatformAccessStatus,
    selectUserFetching,
    selectUserInfo,
    selectUserLoggedIn,
    toggleChartRebuild,
    User,
    userFetch,
    walletsReset,
    AbilitiesInterface,
    selectAbilities,
    selectSidebarState,
} from '../../modules';
import {
    ChangeForgottenPasswordScreen,
    ConfirmScreen,
    DocumentationScreen,
    EmailVerificationScreen,
    ForgotPasswordScreen,
    
    InternalTransfer,
    LandingScreen,
    MagicLink,
    MaintenanceScreen,
    OrdersTabScreen,
    ProfileScreen,
    ProfileTwoFactorAuthScreen,
    RestrictedScreen,
    SignInScreen,
    SignUpScreen,
    TradingScreen,
    VerificationScreen,
    WalletsScreen,
    SetupScreen,
    QuickExchange,
    P2POffersScreen,
    P2PUserOffersScreen,
    CreateP2POfferScreen,
    P2POrderScreen,
    LandingScreenMobile,
    
} from '../../screens';

import { HistoryScreen } from 'src/v2/src/screens';

import Blog from '../../components/blog/BlogDetailsContent'

import { MarketsList } from '../../containers/MarketsList';
import ScaleLoader from 'react-spinners/ScaleLoader';

import { Dashboard } from '../../screens/Dashboard/index';

import { TokenScreen } from '../../screens/TokenScreen';




import { Wallet } from '../../screens/MainWalletsScreen/index';
import { Profile } from '../../screens/Profile/index';

import { ReactDimmer } from 'react-dimmer';

import { SaleListScreen, SaleDetailScreen } from 'src/plugins/Sale';


import { LegalDocuments } from '../../containers';

import { HomePageScreenMobile } from '../../mobile/screens';

// import { IEODetailScreen } from '../../plugins/IEO/screen/IEODetailScreen';
// import { IEOListingScreen } from '../../plugins/IEO/screen/IEOListingScreen';

import { ProfileScreen2 } from '../../screens/ProfileScreen2';

import { HomeScreen } from 'src/v2/src/screens';



interface ReduxProps {
    colorTheme: string;
    currentMarket?: Market;
    user: User;
    isLoggedIn: boolean;
    isMobileDevice: boolean;
    userLoading?: boolean;
    platformAccessStatus: string;
    abilities: AbilitiesInterface;
    isActive: boolean;
}

interface DispatchProps {
    logout: typeof logoutFetch;
    userFetch: typeof userFetch;
    walletsReset: typeof walletsReset;
}

interface LocationProps extends RouterProps {
    location: {
        pathname: string;
    };
}

interface LayoutState {
    isShownExpSessionModal: boolean;
}

interface OwnProps {
    toggleChartRebuild: typeof toggleChartRebuild;
}

export type LayoutProps = ReduxProps & DispatchProps & LocationProps & IntlProps & OwnProps;

const renderLoader = () => (
	<div className="pg-loader-container">
		{/* <Spinner animation="border" variant="primary" /> */}
		{/*<img src={spinerLoading} style={{width: '38px', margin: '0 auto'}}></img>*/}
		<ScaleLoader color="#009991" />
	</div>
);
const STORE_KEY = 'lastAction';

//tslint:disable-next-line no-any
const PrivateRoute: React.FunctionComponent<any> = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
    if (loading) {
        return renderLoader();
    }
    const renderCustomerComponent = props => <CustomComponent {...props} />;

    if (isLogged) {
        return <Route {...rest} render={renderCustomerComponent} />;
    }

    return (
        <Route {...rest}>
            <Redirect to={'/signin'} />
        </Route>
    );
};

//tslint:disable-next-line no-any
const PublicRoute: React.FunctionComponent<any> = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
    if (loading) {
        return renderLoader();
    }

    if (isLogged && rest['path'] !== '/setup') {
        return <Route {...rest}><Redirect to={'/dashboard'} /></Route>;
    }

    const renderCustomerComponent = props => <CustomComponent {...props} />;

    return <Route {...rest} render={renderCustomerComponent} />;
};

class LayoutComponent extends React.Component<LayoutProps, LayoutState> {
    public static eventsListen = [
        'click',
        'keydown',
        'scroll',
        'resize',
        'mousemove',
        'TabSelect',
        'TabHide',
    ];

    public timer;
    public walletsFetchInterval;

    constructor(props: LayoutProps) {
        super(props);
        this.initListener();

        this.state = {
            isShownExpSessionModal: false,
        };
    }

    public componentDidMount() {
        if (
            !(this.props.location.pathname.includes('/magic-link')
            || this.props.location.pathname.includes('/maintenance')
            || this.props.location.pathname.includes('/restriction'))
        ) {
            switch (this.props.platformAccessStatus) {
                case 'restricted':
                    this.props.history.replace('/restriction');
                    break;
                case 'maintenance':
                    this.props.history.replace('/maintenance');
                    break;
                default:
                    const token = localStorage.getItem('csrfToken');

                    if (token) {
                        this.props.userFetch();
                        this.initInterval();
                        this.check();
                    }
            }
        }

        applyCustomizationSettings(null, this.props.toggleChartRebuild);
    }

    public componentWillReceiveProps(nextProps: LayoutProps) {
        if (
            !(nextProps.location.pathname.includes('/magic-link')
            || nextProps.location.pathname.includes('/restriction')
            || nextProps.location.pathname.includes('/maintenance'))
            || this.props.platformAccessStatus !== nextProps.platformAccessStatus
        ) {
            switch (nextProps.platformAccessStatus) {
                case 'restricted':
                    this.props.history.replace('/restriction');
                    break;
                case 'maintenance':
                    this.props.history.replace('/maintenance');
                    break;
                default:
                    break;
            }
        }

        if (!this.props.user.email && nextProps.user.email && !this.props.location.pathname.includes('/setup')) {
            this.props.userFetch();
        }

        if (!this.props.isLoggedIn && nextProps.isLoggedIn && !this.props.user.email) {
            this.initInterval();
            this.check();
        }
    }

    public componentDidUpdate(prevProps: LayoutProps) {
        const { isLoggedIn, userLoading } = this.props;

        if (!isLoggedIn && prevProps.isLoggedIn && !userLoading) {
            this.props.walletsReset();
            // redirect to website
            if (!this.props.location.pathname.includes('/trading')) {
                this.props.history.push('/');
            }
        }
    }

    public componentWillUnmount() {
        for (const type of LayoutComponent.eventsListen) {
            document.body.removeEventListener(type, this.reset);
        }
        clearInterval(this.timer);
        clearInterval(this.walletsFetchInterval);
    }

    public translate = (key: string) => this.props.intl.formatMessage({id: key});

    public render() {
        const {
            colorTheme,
            isLoggedIn,
            isMobileDevice,
            userLoading,
            location,
            platformAccessStatus,
            isActive, 
        } = this.props;
        const { isShownExpSessionModal } = this.state;
        const desktopCls = classnames('container-fluid pg-layout', {
            'trading-layout': location.pathname.includes('/trading'),
            'pg-layout--sidebar-lg' : isActive,
            'pg-layout--sidebar-sm' : !isActive,
            'pg-layout--sidebar-disabled' : !isLoggedIn,

            
        });
        const mobileCls = classnames('pg-layout--mobile', {
            'pg-layout--mobile-setup': location.pathname.includes('/setup'),
        });
        toggleColorTheme(colorTheme);

        if (!platformAccessStatus.length) {
            return renderLoader();
        }

        if ((wizardStep() !== 'false') && this.props.location.pathname !== '/setup') {
            return (
                <div className={isMobileDevice ? mobileCls : desktopCls}>
                    <Route loading={userLoading} isLogged={isLoggedIn}><Redirect to={'/setup'} /></Route>
                </div>
            );
        }

        if (isMobileDevice) {
            return (
                <div className={mobileCls}>
                    <Switch>
                        <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/setup" component={SetupScreen} />
                        <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/signin" component={SignInMobileScreen} />
                        <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/signup" component={SignUpMobileScreen} />
                        <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/forgot_password" component={ForgotPasswordMobileScreen} />
                        <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/accounts/password_reset" component={ChangeForgottenPasswordMobileScreen} />
                        <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/accounts/confirmation" component={VerificationScreen} />
                        <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/email-verification" component={EmailVerificationMobileScreen} />
                        <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/api" component={DocumentationScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/wallets/:currency/history" component={SelectedWalletMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/wallets/:currency/deposit" component={WalletDeposit} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/wallets/:currency/withdraw" component={WalletWithdraw} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/confirm" component={ConfirmMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/wallets" component={WalletsMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/orders" component={OrdersMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile/account-activity" component={ProfileAccountActivityMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile/api-keys" component={ProfileApiKeysMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile/language" component={ProfileLanguageMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile/2fa" component={ProfileAuthMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile/change-password" component={ProfileChangePasswordMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile/verification" component={ProfileVerificationMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile/theme" component={ProfileThemeMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile" component={ProfileMobileScreen} />
                        <Route exact={true} path="/market/:market?" component={TradingScreenMobile} />
                        {showLanding() && <Route exact={true} path="/" component={HomePageScreenMobile} />}
                        <Route path="**"><Redirect to="/" /></Route>
                        {/* <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/dashboard" component={Dashboard} /> */}
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/dashboard" component={WalletsMobileScreen} />
                        <PublicRoute path="/tokens" exact component={SaleListScreen} />
                    </Switch>
                    {isLoggedIn && <WalletsFetch />}
                    {isShownExpSessionModal && this.handleRenderExpiredSessionModal()}
                </div>
            );
        }

        return (
            <div className={desktopCls}>
                <Switch>
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/setup" component={SetupScreen} />
                    <Route exact={true} path="/magic-link" component={MagicLink} />
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/signin" component={SignInScreen} />
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/accounts/confirmation" component={VerificationScreen} />
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/signup" component={SignUpScreen} />
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/forgot_password" component={ForgotPasswordScreen} />
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/accounts/password_reset" component={ChangeForgottenPasswordScreen} />
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/email-verification" component={EmailVerificationScreen} />
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/api" component={DocumentationScreen} />
                    <Route path="/restriction" component={RestrictedScreen} />
                    <Route path="/maintenance" component={MaintenanceScreen} />
                    <Route exact={true} path="/trading/:market?" component={TradingScreen} />
                    
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} exact={true} path="/" component={LandingScreen} />
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/blog-details/:id" component={Blog} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/orders" component={OrdersTabScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/history" component={HistoryScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/confirm" component={ConfirmScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile/:routeTab" component={ProfileScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile-old" component={ProfileScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile" component={Profile} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/tokenizantion:ieoID" component={TokenScreen} />
                    
                    {/* <PublicRoute path="/ieo/detail/:ieoID" exact component={SaleDetailScreen} /> */}

                    
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/cadastro" component={ProfileScreen2} />
                    
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/wallets/:routeTab/:currency/:action" component={WalletsScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/wallets/:routeTab/:currency" component={WalletsScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/wallets/:routeTab" component={WalletsScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/wallets" component={WalletsScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/security/2fa" component={ProfileTwoFactorAuthScreen} />
                    <PrivateRoute exact={true} loading={userLoading} isLogged={isLoggedIn} path="/docs" component={DocumentationScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/internal-transfer" component={InternalTransfer} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/quick-exchange" component={QuickExchange} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/create-offer" component={CreateP2POfferScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/p2p/offers" component={P2PUserOffersScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/p2p/offer/:id" component={P2PUserOffersScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/p2p/history" component={P2PTradesHistory} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/p2p/order/:id" component={P2POrderScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/p2p/:currency" component={P2POffersScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/p2p" component={P2POffersScreen} />

                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/dashboard" component={Dashboard} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/wallet" component={Wallet} />

                    <PublicRoute path="/markets" component={MarketsList} />

                    <PublicRoute path="/tokens" exact component={SaleListScreen} />

                    <PublicRoute path="/new_home" exact component={HomeScreen} />
                    
					{/* <PublicRoute path="/ieo/detail/:ieoID" exact component={TokenScreen} /> */}

                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/ieo/detail/:ieoID" exact component={TokenScreen} />

                    {/* <PublicRoute path="/ieo" exact component={IEOListingScreen} />
					<PublicRoute path="/ieo/detail/:ieoID" exact component={IEODetailScreen} /> */}

                    <PublicRoute exact={true} path="/api-docs" component={DocumentationScreen} />

                    <PublicRoute exact={true} path="/legal" component={LegalDocuments} />

                    <Route path="**"><Redirect to="/" /></Route>
                    

                    
                    {/* <Route path="/ui" component={App} /> */}

                </Switch>
                {isLoggedIn && <WalletsFetch/>}
                {isShownExpSessionModal && this.handleRenderExpiredSessionModal()}
            </div>
        );
    }

    private getLastAction = () => {
        if (localStorage.getItem(STORE_KEY) !== null) {
            return parseInt(localStorage.getItem(STORE_KEY) || '0', 10);
        }

        return 0;
    };

    private setLastAction = (lastAction: number) => {
        localStorage.setItem(STORE_KEY, lastAction.toString());
    };

    private initListener = () => {
        this.reset();
        for (const type of LayoutComponent.eventsListen) {
            document.body.addEventListener(type, this.reset);
        }
    };

    private reset = () => {
        this.setLastAction(Date.now());
    };

    private initInterval = () => {
        this.timer = setInterval(() => {
            this.check();
        }, parseFloat(sessionCheckInterval()));
    };

    private check = () => {
        const { user } = this.props;
        const now = Date.now();
        const timeleft = this.getLastAction() + parseFloat(minutesUntilAutoLogout()) * 60 * 1000;
        const diff = timeleft - now;
        const isTimeout = diff < 0;

        if (isTimeout && user.email) {
            if (user.state === 'active') {
                this.handleChangeExpSessionModalState();
            }

            this.props.logout();
            clearInterval(this.timer);
        }
    };

    private handleSubmitExpSessionModal = () => {
        const { history } = this.props;
        this.handleChangeExpSessionModalState();
        history.push('/signin');
    };

    private handleRenderExpiredSessionModal = () => (
        <>
        <ExpiredSessionModal
            title={this.translate('page.modal.expired.title')}
            buttonLabel={this.translate('page.modal.expired.submit')}
            handleChangeExpSessionModalState={this.handleChangeExpSessionModalState}
            handleSubmitExpSessionModal={this.handleSubmitExpSessionModal}
        />

        <ReactDimmer
        isOpen={true}
        exitDimmer={this.handleSubmitExpSessionModal}
        zIndex={100}
        blur={1}
        opacity={0.2}
        transition={0.25}
      />

      </>
    );

    private handleChangeExpSessionModalState = () => {
        this.setState({
            isShownExpSessionModal: !this.state.isShownExpSessionModal,
        });
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    colorTheme: selectCurrentColorTheme(state),
    currentMarket: selectCurrentMarket(state),
    user: selectUserInfo(state),
    isLoggedIn: selectUserLoggedIn(state),
    isMobileDevice: selectMobileDeviceState(state),
    userLoading: selectUserFetching(state),
    platformAccessStatus: selectPlatformAccessStatus(state),
    abilities: selectAbilities(state),
    isActive: selectSidebarState(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    logout: () => dispatch(logoutFetch()),
    toggleChartRebuild: () => dispatch(toggleChartRebuild()),
    userFetch: () => dispatch(userFetch()),
    walletsReset: () => dispatch(walletsReset()),
});

export const Layout = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(LayoutComponent) as any;

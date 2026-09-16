import { useEffect, useRef, useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import Welcome from './components/Welcome';
import Header from './components/Header';
import Footer from './components/Footer';
import NumberEntry from './components/NumberEntry';
import ActivationEnterNumber from './components/ActivationEnterNumber';
import ActivationCreateLoginPin from './components/ActivationCreateLoginPin';
import ActivationAccountDetails, {
  type AccountDetailsValues,
} from './components/ActivationAccountDetails';
import ActivationAccountAddress, {
  type AccountAddressValues,
} from './components/ActivationAccountAddress';
import ActivationIdUpload, { type IdUploadValue } from './components/ActivationIdUpload';
import ActivationTakeSelfie from './components/ActivationTakeSelfie';
import ActivationRegistrationReview from './components/ActivationRegistrationReview';
import ActivationSuccess from './components/ActivationSuccess';
import OtpVerification from './components/OtpVerification';
import BasicPageTemplate from './components/BasicPageTemplate';
import Login from './components/Login';
import DashboardHome from './components/DashboardHome';
import LineManagement from './components/LineManagement';
import AddANewLine from './components/AddANewLine';
import LineDetails from './components/LineDetails';
import BalanceTransfer from './components/BalanceTransfer';
import TransferResult, { type TransferResultDetails } from './components/TransferResult';
import OfferList from './components/OfferList';
import OfferSearch from './components/OfferSearch';
import OfferDetail from './components/OfferDetail';
import ShoppingCart from './components/ShoppingCart';
import ShopLanding from './components/ShopLanding';
import EsimPurchaseFillInfo, {
  EMPTY_ESIM_FILL,
  type EsimFillInfoValues,
} from './components/EsimPurchaseFillInfo';
import EsimCapabilityCheck from './components/EsimCapabilityCheck';
import PaymentMethod, {
  SAMPLE_SAVED_CARDS,
  type SavedCard,
} from './components/PaymentMethod';
import PaymentResult from './components/PaymentResult';
import Wallet from './components/Wallet';
import Recharge from './components/Recharge';
import RechargeStatus from './components/RechargeStatus';
import Checkout, {
  EMPTY_CHECKOUT_FORM,
  prefillCheckoutForm,
  type CheckoutFormValues,
} from './components/Checkout';
import {
  ROOT_CATEGORY_TITLES,
  offersForRootCategory,
  type CatalogOffer,
  type RootOfferCategory,
} from './data/offerList';
import { addOfferToCart, type CartItem } from './data/cart';
import {
  createInitialLines,
  createMemberLines,
  newPendingLine,
  type ManagedLine,
} from './data/lines';
import {
  activeTransferPeriod,
  createTransferPeriod,
  DEFAULT_OWN_BALANCES,
  isServiceUnit,
  type CurrencyCode,
  type OwnBalances,
  type TransferUnit,
} from './data/transfer';
import './App.css';

type DemoChannel = 'app' | 'web';

const EMPTY_ACCOUNT_DETAILS: AccountDetailsValues = {
  firstName: '',
  lastName: '',
  gender: '',
  birthday: '',
  email: '',
};

const EMPTY_ADDRESS: AccountAddressValues = {
  addressLine1: '',
  addressLine2: '',
  city: '',
  stateProvince: '',
  postalCode: '',
  country: '',
};

type Page =
  | 'welcome'
  | 'login'
  | 'number-entry'
  | 'otp'
  | 'activate-sim'
  | 'create-pin'
  | 'account-details'
  | 'account-address'
  | 'id-upload'
  | 'take-selfie'
  | 'registration-review'
  | 'activation-success'
  | 'email-verification'
  | 'shop-sim'
  | 'shop-sim-empty'
  | 'shop'
  | 'search'
  | 'cart'
  | 'offer-detail'
  | 'home'
  | 'privacy'
  | 'terms'
  | 'next-step'
  | 'template-with-back'
  | 'template-no-back'
  | 'forgot-pin'
  | 'dashboard'
  | 'line-management'
  | 'add-a-new-line'
  | 'line-details'
  | 'balance-transfer'
  | 'transfer-result'
  | 'checkout'
  | 'esim-fill'
  | 'esim-email-otp'
  | 'esim-check'
  | 'payment-method'
  | 'payment-result'
  | 'wallet'
  | 'recharge'
  | 'recharge-status'
  | 'prd-tbd';

type PaymentJourney = 'shop' | 'wallet-recharge';
type LineListPurpose = 'balance' | 'wallet';

const GUEST_PAGES: Page[] = [
  'welcome',
  'login',
  'number-entry',
  'otp',
  'activate-sim',
  'create-pin',
  'account-details',
  'account-address',
  'id-upload',
  'take-selfie',
  'registration-review',
  'activation-success',
  'email-verification',
  'shop-sim',
  'shop-sim-empty',
  'search',
  'cart',
  'offer-detail',
  'privacy',
  'terms',
  'next-step',
  'template-with-back',
  'template-no-back',
  'forgot-pin',
  'checkout',
  'esim-fill',
  'esim-email-otp',
  'esim-check',
  'payment-method',
  'payment-result',
];

function Stub({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <BasicPageTemplate title={title} showBack onBack={onBack}>
      <p className="page-body-text">This page is a stub — the flow after hand-off is out of scope for this PRD.</p>
    </BasicPageTemplate>
  );
}

function AppInner() {
  const { isLoggedIn, login, logout } = useAuth();
  const [page, setPage] = useState<Page>('welcome');
  const [phoneNumber, setPhoneNumber] = useState('0912 123 4567');
  const [accountDetails, setAccountDetails] = useState<AccountDetailsValues>(EMPTY_ACCOUNT_DETAILS);
  const [address, setAddress] = useState<AccountAddressValues>(EMPTY_ADDRESS);
  const [idUpload, setIdUpload] = useState<IdUploadValue>(null);
  const [selfieDataUrl, setSelfieDataUrl] = useState<string | null>(null);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [offerListRoot, setOfferListRoot] = useState<RootOfferCategory>('sim');
  const [offerListBackPage, setOfferListBackPage] = useState<Page>('welcome');
  const [cartBackPage, setCartBackPage] = useState<Page>('shop-sim');
  const [searchBackPage, setSearchBackPage] = useState<Page>('shop-sim');
  const [offerDetailBackPage, setOfferDetailBackPage] = useState<Page>('shop-sim');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutLines, setCheckoutLines] = useState<{ offer: CatalogOffer; quantity: number }[]>(
    [],
  );
  const [checkoutBackPage, setCheckoutBackPage] = useState<Page>('cart');
  const [checkoutForm, setCheckoutForm] = useState<CheckoutFormValues>(EMPTY_CHECKOUT_FORM);
  const [loginBackPage, setLoginBackPage] = useState<Page>('welcome');
  const [loginSuccessPage, setLoginSuccessPage] = useState<Page>('dashboard');
  const [paymentTotal, setPaymentTotal] = useState(0);
  const [paymentMethodUsed, setPaymentMethodUsed] = useState('Credit / Debit Card');
  const [walletRemaining, setWalletRemaining] = useState(50);
  const [walletCurrency, setWalletCurrency] = useState<CurrencyCode>('USD');
  const [walletBalanceFailed, setWalletBalanceFailed] = useState(false);
  const [paymentJourney, setPaymentJourney] = useState<PaymentJourney>('shop');
  const [rechargeSucceeded, setRechargeSucceeded] = useState(true);
  const [savedCards, setSavedCards] = useState<SavedCard[]>(SAMPLE_SAVED_CARDS);
  const [lineListPurpose, setLineListPurpose] = useState<LineListPurpose>('balance');
  const [lineManagementBack, setLineManagementBack] = useState<Page>('dashboard');
  const [demoChannel, setDemoChannel] = useState<DemoChannel>('web');
  const [esimFillValues, setEsimFillValues] = useState<EsimFillInfoValues>(EMPTY_ESIM_FILL);
  const [esimDetailsVerified, setEsimDetailsVerified] = useState(false);
  const [dashboardBalanceFailed, setDashboardBalanceFailed] = useState(false);
  const [dashboardFamilyPlan, setDashboardFamilyPlan] = useState(true);
  const [prdTbdTitle, setPrdTbdTitle] = useState('');
  const [prdTbdBack, setPrdTbdBack] = useState<Page>('dashboard');
  const [lines, setLines] = useState<ManagedLine[]>(() => createInitialLines());
  const [isGroupAdmin, setIsGroupAdmin] = useState(true);
  const [lineListOnly, setLineListOnly] = useState(false);
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);
  const [inviteMessage, setInviteMessage] = useState<string | null>(null);
  const [lineDetailsBalanceFailed, setLineDetailsBalanceFailed] = useState(false);
  const [ownBalances, setOwnBalances] = useState<OwnBalances>(DEFAULT_OWN_BALANCES);
  const [transferPeriod, setTransferPeriod] = useState(() => createTransferPeriod());
  const [transferResult, setTransferResult] = useState<TransferResultDetails | null>(null);
  const logoutInitiated = useRef(false);

  useEffect(() => {
    if (isLoggedIn && page === 'welcome') setPage('dashboard');
    if (isLoggedIn && page === 'home') setPage('dashboard');
    if (!isLoggedIn && !GUEST_PAGES.includes(page)) setPage('welcome');
  }, [isLoggedIn, page]);

  const go = (p: Page) => setPage(p);

  const openPrdTbd = (title: string, back: Page = 'dashboard') => {
    setPrdTbdTitle(title);
    setPrdTbdBack(back);
    go('prd-tbd');
  };

  const openLineManagement = (opts?: {
    admin?: boolean;
    empty?: boolean;
    member?: boolean;
    listOnly?: boolean;
  }) => {
    login();
    setInviteMessage(null);
    setLineDetailsBalanceFailed(false);
    setOwnBalances(DEFAULT_OWN_BALANCES);
    setTransferPeriod(createTransferPeriod());
    setTransferResult(null);
    setLineListOnly(opts?.listOnly ?? false);
    setLineListPurpose('balance');
    setLineManagementBack('dashboard');
    if (opts?.empty) {
      setIsGroupAdmin(true);
      setLines([]);
    } else if (opts?.member) {
      setIsGroupAdmin(false);
      setLines(createMemberLines());
    } else {
      setIsGroupAdmin(opts?.admin ?? true);
      setLines(createInitialLines());
    }
    go('line-management');
  };

  const openDashboard = (balanceFailed = false, hasFamilyPlan = true) => {
    setDashboardBalanceFailed(balanceFailed);
    setDashboardFamilyPlan(hasFamilyPlan);
    setLineListOnly(false);
    login();
    go('dashboard');
  };

  const openTransferLineList = () => {
    login();
    setInviteMessage(null);
    setLineListOnly(true);
    setLineListPurpose('balance');
    setLineManagementBack('dashboard');
    setLines((prev) => (prev.length === 0 ? createInitialLines() : prev));
    go('line-management');
  };

  const openWallet = (balanceFailed = false) => {
    login();
    setWalletBalanceFailed(balanceFailed);
    go('wallet');
  };

  const openWalletTransferList = (currency: CurrencyCode = walletCurrency) => {
    login();
    setInviteMessage(null);
    setWalletCurrency(currency);
    setLineListOnly(true);
    setLineListPurpose('wallet');
    setLineManagementBack('wallet');
    setLines((prev) => (prev.length === 0 ? createInitialLines() : prev));
    go('line-management');
  };

  const openRecharge = () => {
    login();
    setPaymentJourney('wallet-recharge');
    go('recharge');
  };

  const openRechargeStatus = (succeeded: boolean) => {
    login();
    setRechargeSucceeded(succeeded);
    go('recharge-status');
  };

  const openPaymentMethod = (withSavedCards = true) => {
    login();
    setPaymentJourney('shop');
    setPaymentTotal(12.5);
    setSavedCards(withSavedCards ? SAMPLE_SAVED_CARDS : []);
    go('payment-method');
  };

  const addToCart = (offer: CatalogOffer, quantity: number) => {
    if (!offer.allowAddToCart) return;
    setCartItems((prev) => addOfferToCart(prev, offer.id, quantity));
  };

  const openCart = (from: Page) => {
    if (from !== 'cart') setCartBackPage(from);
    go('cart');
  };

  const openLogin = (back: Page, success: Page) => {
    setLoginBackPage(back);
    setLoginSuccessPage(success);
    go('login');
  };

  const openCheckout = (
    lines: { offer: CatalogOffer; quantity: number }[],
    back: Page,
  ) => {
    setCheckoutLines(lines);
    setCheckoutBackPage(back);
    setCheckoutForm((prev) =>
      prefillCheckoutForm(prev, accountDetails, address, phoneNumber, isLoggedIn),
    );
    const isEsimPurchase =
      lines.length === 1 && lines[0].offer.kind === 'esim' && lines[0].quantity === 1;
    if (!isLoggedIn && isEsimPurchase) {
      setEsimDetailsVerified(false);
    } else if (isLoggedIn && isEsimPurchase) {
      setEsimDetailsVerified(true);
    }
    go('checkout');
  };

  const startCheckoutFlow = (
    lines: { offer: CatalogOffer; quantity: number }[],
    back: Page,
  ) => {
    const isEsimPurchase =
      lines.length === 1 && lines[0].offer.kind === 'esim' && lines[0].quantity === 1;
    if (demoChannel === 'app' && isLoggedIn && isEsimPurchase) {
      setCheckoutLines(lines);
      setCheckoutBackPage(back);
      setCheckoutForm((prev) =>
        prefillCheckoutForm(prev, accountDetails, address, phoneNumber, isLoggedIn),
      );
      go('esim-check');
      return;
    }
    openCheckout(lines, back);
  };

  const goToShop = () => {
    if (isLoggedIn) {
      go('shop');
      return;
    }
    setOfferListRoot('sim');
    setOfferListBackPage('welcome');
    go('shop-sim');
  };

  const openOfferList = (root: RootOfferCategory, back: Page) => {
    setOfferListRoot(root);
    setOfferListBackPage(back);
    go('shop-sim');
  };

  const handleLogoutConfirm = () => {
    logoutInitiated.current = true;
    logout();
  };

  const clearSelfie = () => setSelfieDataUrl(null);

  const offerListOffers = offersForRootCategory(offerListRoot);
  const offerListTitle = ROOT_CATEGORY_TITLES[offerListRoot];
  const selectedLine = lines.find((line) => line.id === selectedLineId) ?? null;
  const checkoutTotal = checkoutLines.reduce(
    (sum, { offer, quantity }) => sum + (offer.price ?? 0) * quantity,
    0,
  );

  return (
    <div className="app">
      <nav className="demo-nav" aria-label="Demo navigation">
        <span className="demo-nav-label">Demo</span>
        <button
          type="button"
          className={demoChannel === 'web' ? 'active' : ''}
          onClick={() => setDemoChannel('web')}
        >
          Web
        </button>
        <button
          type="button"
          className={demoChannel === 'app' ? 'active' : ''}
          onClick={() => setDemoChannel('app')}
        >
          App
        </button>
        <button
          type="button"
          className={page === 'welcome' ? 'active' : ''}
          onClick={() => {
            logout();
            go('welcome');
          }}
        >
          Welcome
        </button>
        <button
          type="button"
          className={page === 'activate-sim' ? 'active' : ''}
          onClick={() => {
            logout();
            go('activate-sim');
          }}
        >
          Activate number
        </button>
        <button type="button" className={page === 'number-entry' ? 'active' : ''} onClick={() => go('number-entry')}>
          Number (OTP stub)
        </button>
        <button
          type="button"
          className={page === 'otp' ? 'active' : ''}
          onClick={() => {
            logout();
            go('otp');
          }}
        >
          OTP Verification
        </button>
        <button
          type="button"
          className={page === 'login' ? 'active' : ''}
          onClick={() => {
            logout();
            setLoginBackPage('welcome');
            setLoginSuccessPage('dashboard');
            go('login');
          }}
        >
          Login
        </button>
        <button
          type="button"
          className={page === 'shop' ? 'active' : ''}
          onClick={() => {
            login();
            go('shop');
          }}
        >
          Shop landing
        </button>
        <button
          type="button"
          className={page === 'shop-sim' ? 'active' : ''}
          onClick={() => {
            setOfferListRoot('sim');
            setOfferListBackPage(isLoggedIn ? 'shop' : 'welcome');
            go('shop-sim');
          }}
        >
          SIM Offer list
        </button>
        <button
          type="button"
          className={page === 'shop-sim-empty' ? 'active' : ''}
          onClick={() => {
            setOfferListRoot('sim');
            setOfferListBackPage(isLoggedIn ? 'shop' : 'welcome');
            go('shop-sim-empty');
          }}
        >
          Offer list (empty)
        </button>
        <button
          type="button"
          className={page === 'search' ? 'active' : ''}
          onClick={() => {
            setSearchBackPage('shop-sim');
            go('search');
          }}
        >
          Offer search
        </button>
        <button
          type="button"
          className={
            page === 'dashboard' && !dashboardBalanceFailed && dashboardFamilyPlan ? 'active' : ''
          }
          onClick={() => openDashboard(false, true)}
        >
          Dashboard
        </button>
        <button
          type="button"
          className={
            page === 'dashboard' && !dashboardBalanceFailed && !dashboardFamilyPlan ? 'active' : ''
          }
          onClick={() => openDashboard(false, false)}
        >
          Dashboard (no family)
        </button>
        <button
          type="button"
          className={page === 'dashboard' && dashboardBalanceFailed ? 'active' : ''}
          onClick={() => openDashboard(true, true)}
        >
          Dashboard (balance fail)
        </button>
        <button
          type="button"
          className={page === 'wallet' && !walletBalanceFailed ? 'active' : ''}
          onClick={() => openWallet(false)}
        >
          Wallet
        </button>
        <button
          type="button"
          className={page === 'wallet' && walletBalanceFailed ? 'active' : ''}
          onClick={() => openWallet(true)}
        >
          Wallet (balance fail)
        </button>
        <button
          type="button"
          className={page === 'recharge' ? 'active' : ''}
          onClick={() => openRecharge()}
        >
          Recharge
        </button>
        <button
          type="button"
          className={page === 'recharge-status' && !rechargeSucceeded ? 'active' : ''}
          onClick={() => openRechargeStatus(false)}
        >
          Recharge status (fail)
        </button>
        <button
          type="button"
          className={page === 'payment-method' && savedCards.length > 0 ? 'active' : ''}
          onClick={() => openPaymentMethod(true)}
        >
          Payment method
        </button>
        <button
          type="button"
          className={page === 'payment-method' && savedCards.length === 0 ? 'active' : ''}
          onClick={() => openPaymentMethod(false)}
        >
          Payment method (no saved cards)
        </button>
        <button
          type="button"
          className={
            page === 'line-management' && lineListPurpose === 'wallet' && walletCurrency === 'CAD'
              ? 'active'
              : ''
          }
          onClick={() => openWalletTransferList('CAD')}
        >
          Transfer wallet (CAD)
        </button>
        <button
          type="button"
          className={page === 'line-management' && isGroupAdmin && lines.length > 0 ? 'active' : ''}
          onClick={() => openLineManagement()}
        >
          Line Management
        </button>
        <button
          type="button"
          className={page === 'line-management' && !isGroupAdmin ? 'active' : ''}
          onClick={() => openLineManagement({ member: true })}
        >
          Line Management (member)
        </button>
        <button
          type="button"
          className={page === 'line-management' && isGroupAdmin && lines.length === 0 ? 'active' : ''}
          onClick={() => openLineManagement({ empty: true })}
        >
          Line Management (empty)
        </button>
        <button
          type="button"
          className={page === 'template-with-back' ? 'active' : ''}
          onClick={() => {
            logout();
            go('template-with-back');
          }}
        >
          Template + back
        </button>
        <button
          type="button"
          className={page === 'template-no-back' ? 'active' : ''}
          onClick={() => {
            logout();
            go('template-no-back');
          }}
        >
          Template (no back)
        </button>
        {isLoggedIn && (
          <button
            type="button"
            onClick={() => {
              logout();
              go('welcome');
            }}
          >
            Log out
          </button>
        )}
      </nav>

      <Header
        isLoggedIn={isLoggedIn}
        onLogout={handleLogoutConfirm}
        onNavigate={go}
        onCart={() => openCart(page)}
        onShopPlans={() => go('shop')}
        onLineManagement={() => openLineManagement()}
      />

      <main className="main">
        {page === 'welcome' && (
          <Welcome
            onLogin={() => go('login')}
            onActivateSim={() => go('activate-sim')}
            onShopNow={() => {
              openOfferList('sim', 'welcome');
            }}
          />
        )}
        {page === 'activate-sim' && (
          <ActivationEnterNumber
            onNext={(n) => {
              setPhoneNumber(n);
              go('create-pin');
            }}
            onBack={() => go('welcome')}
            onGetSim={() => {
              openOfferList('sim', 'activate-sim');
            }}
            onLogIn={() => openLogin('activate-sim', 'dashboard')}
          />
        )}
        {page === 'create-pin' && (
          <ActivationCreateLoginPin
            phoneNumber={phoneNumber}
            onNext={() => go('account-details')}
            onBack={() => go('activate-sim')}
          />
        )}
        {page === 'account-details' && (
          <ActivationAccountDetails
            values={accountDetails}
            onChange={setAccountDetails}
            onNext={() => go('account-address')}
          />
        )}
        {page === 'account-address' && (
          <ActivationAccountAddress
            values={address}
            onChange={setAddress}
            onNext={() => go('id-upload')}
            onBack={() => go('account-details')}
          />
        )}
        {page === 'id-upload' && (
          <ActivationIdUpload
            value={idUpload}
            onChange={setIdUpload}
            onNext={() => go('take-selfie')}
            onBack={() => go('account-address')}
          />
        )}
        {page === 'take-selfie' && (
          <ActivationTakeSelfie
            selfieDataUrl={selfieDataUrl}
            onCapture={setSelfieDataUrl}
            onClear={clearSelfie}
            onNext={() => go('registration-review')}
            onBack={() => go('id-upload')}
          />
        )}
        {page === 'registration-review' && (
          <ActivationRegistrationReview
            phoneNumber={phoneNumber}
            accountDetails={accountDetails}
            address={address}
            idUpload={idUpload}
            selfieDataUrl={selfieDataUrl}
            onEditPersonal={() => go('account-details')}
            onEditAddress={() => go('account-address')}
            onEditId={() => go('id-upload')}
            onEditSelfie={() => {
              clearSelfie();
              go('take-selfie');
            }}
            onSubmit={() => go('activation-success')}
          />
        )}
        {page === 'activation-success' && (
          <ActivationSuccess onNext={() => go('email-verification')} />
        )}
        {page === 'email-verification' && (
          <Stub title="Email verification (PRD TBD)" onBack={() => go('activation-success')} />
        )}
        {page === 'number-entry' && (
          <NumberEntry
            initialNumber={phoneNumber}
            onContinue={(n) => {
              setPhoneNumber(n);
              go('otp');
            }}
            onBack={() => go('welcome')}
          />
        )}
        {page === 'otp' && (
          <OtpVerification
            phoneNumber={phoneNumber}
            onVerified={() => {
              login();
              go('next-step');
            }}
            onNotYourNumber={() => go('activate-sim')}
          />
        )}
        {page === 'esim-fill' && (
          <EsimPurchaseFillInfo
            values={esimFillValues}
            onChange={setEsimFillValues}
            onBack={() => go('checkout')}
            onNext={(filled) => {
              setEsimFillValues(filled);
              setEsimDetailsVerified(false);
              go('esim-email-otp');
            }}
          />
        )}
        {page === 'esim-email-otp' && (
          <OtpVerification
            phoneNumber={esimFillValues.email}
            destinationType="email"
            onVerified={() => {
              setEsimDetailsVerified(true);
              setCheckoutForm((prev) => ({
                ...prev,
                firstName: esimFillValues.firstName,
                lastName: esimFillValues.lastName,
                email: esimFillValues.email,
                phone: esimFillValues.phone,
              }));
              go('checkout');
            }}
            onNotYourNumber={() => go('esim-fill')}
          />
        )}
        {page === 'next-step' && (
          <Stub title="Next step" onBack={() => go(isLoggedIn ? 'dashboard' : 'welcome')} />
        )}
        {page === 'login' && (
          <Login
            onBack={() => go(loginBackPage)}
            onSuccess={() => {
              login();
              go(loginSuccessPage);
            }}
            onForgotPin={() => go('forgot-pin')}
            onCreateAccount={() => go('activate-sim')}
            onVerifyEmail={() => go('email-verification')}
          />
        )}
        {page === 'forgot-pin' && (
          <Stub title="Forgot PIN (PRD TBD)" onBack={() => go('login')} />
        )}
        {(page === 'dashboard' || page === 'home') && isLoggedIn && (
          <DashboardHome
            firstName={accountDetails.firstName.trim() || 'Alex'}
            mobileNumber={phoneNumber}
            hasFamilyPlan={dashboardFamilyPlan}
            balanceLoadFailed={dashboardBalanceFailed}
            onBuyAddOn={() => openOfferList('data', 'dashboard')}
            onTransferBalance={() => openTransferLineList()}
            onReferral={() => openPrdTbd('Referral')}
            onUsageHistory={() => openPrdTbd('Usage history')}
            onMyVouchers={() => openPrdTbd('My Vouchers')}
            onLineManagement={() => openLineManagement()}
            onInbox={() => openPrdTbd('Inbox')}
            onWallet={() => openWallet()}
          />
        )}
        {page === 'prd-tbd' && (
          <Stub title={`${prdTbdTitle || 'Next page'} (PRD TBD)`} onBack={() => go(prdTbdBack)} />
        )}
        {page === 'line-management' && isLoggedIn && (
          <LineManagement
            lines={lines}
            isGroupAdmin={isGroupAdmin}
            channel={demoChannel}
            listOnly={lineListOnly}
            inviteMessage={inviteMessage}
            onBack={() => go(lineManagementBack)}
            onAddLine={() => {
              setInviteMessage(null);
              go('add-a-new-line');
            }}
            onOpenDetails={(id) => {
              setSelectedLineId(id);
              setInviteMessage(null);
              go('line-details');
            }}
            onRemoveLine={(id) => setLines((prev) => prev.filter((line) => line.id !== id))}
            onTransferBalance={(id) => {
              setSelectedLineId(id);
              setInviteMessage(null);
              go('balance-transfer');
            }}
            onSetAdmin={(id) => {
              setIsGroupAdmin(false);
              setLines((prev) =>
                prev.map((line) => ({ ...line, isGroupAdmin: line.id === id })),
              );
            }}
          />
        )}
        {page === 'add-a-new-line' && isLoggedIn && (
          <AddANewLine
            lines={lines}
            ownMobileDigits={phoneNumber.replace(/\D/g, '').slice(-10) || '9121234567'}
            onBack={() => go('line-management')}
            onAdded={(mobileDigits) => {
              setLines((prev) => [
                ...prev.filter((line) => line.mobileDigits !== mobileDigits),
                newPendingLine(mobileDigits),
              ]);
              setInviteMessage('Invitation sent.');
              go('line-management');
            }}
            onResent={(mobileDigits) => {
              setLines((prev) =>
                prev.map((line) =>
                  line.mobileDigits === mobileDigits
                    ? { ...line, invitedAt: Date.now(), invitationAccepted: false }
                    : line,
                ),
              );
              setInviteMessage('Invitation sent.');
              go('line-management');
            }}
          />
        )}
        {page === 'balance-transfer' && isLoggedIn && selectedLine && (
          <BalanceTransfer
            key={`${lineListPurpose}-${walletCurrency}-${selectedLine.id}`}
            line={selectedLine}
            kind={lineListPurpose === 'wallet' ? 'wallet' : 'service'}
            currency={walletCurrency}
            ownBalances={ownBalances}
            walletRemaining={walletRemaining}
            period={transferPeriod}
            onBack={() => go('line-management')}
            onTransferred={(amount: number, unit: TransferUnit) => {
              if (!isServiceUnit(unit)) {
                const remainingAfter = walletRemaining - amount;
                setWalletRemaining(remainingAfter);
                setTransferPeriod((prev) => {
                  const active = activeTransferPeriod(prev);
                  return { ...active, walletUsed: active.walletUsed + amount };
                });
                setTransferResult({
                  line: selectedLine,
                  amount,
                  unit,
                  remainingAfter,
                  transactionNumber: String(Date.now()),
                  completedAt: new Date(),
                });
                go('transfer-result');
                return;
              }
              const remainingAfter = ownBalances[unit] - amount;
              setOwnBalances((prev) => ({ ...prev, [unit]: remainingAfter }));
              setTransferPeriod((prev) => {
                const active = activeTransferPeriod(prev);
                return {
                  ...active,
                  used: { ...active.used, [unit]: active.used[unit] + amount },
                };
              });
              setTransferResult({
                line: selectedLine,
                amount,
                unit,
                remainingAfter,
                transactionNumber: String(Date.now()),
                completedAt: new Date(),
              });
              go('transfer-result');
            }}
          />
        )}
        {page === 'transfer-result' && isLoggedIn && transferResult && (
          <TransferResult details={transferResult} onBackToHome={() => go('dashboard')} />
        )}
        {page === 'line-details' && isLoggedIn && selectedLine && (
          <LineDetails
            line={selectedLine}
            balanceLoadFailed={lineDetailsBalanceFailed}
            onBack={() => go('line-management')}
            onPurchaseAddOn={() => openOfferList('data', 'line-details')}
            onChangeBasePlan={() => openPrdTbd('Select base plan', 'line-details')}
          />
        )}
        {page === 'shop' && isLoggedIn && (
          <ShopLanding
            onSelectCategory={(root) => openOfferList(root, 'shop')}
            onSelectOffer={(id) => {
              setSelectedOfferId(id);
              setOfferDetailBackPage('shop');
              go('offer-detail');
            }}
          />
        )}
        {page === 'shop-sim' && (
          <OfferList
            offerCategoryName={offerListTitle}
            offers={offerListOffers}
            onBack={() => go(offerListBackPage)}
            onSearch={() => {
              setSearchBackPage('shop-sim');
              go('search');
            }}
            onOfferDetail={(id) => {
              setSelectedOfferId(id);
              setOfferDetailBackPage('shop-sim');
              go('offer-detail');
            }}
            onAddToCart={(offer) => addToCart(offer, 1)}
          />
        )}
        {page === 'shop-sim-empty' && (
          <OfferList
            forceEmpty
            offerCategoryName={offerListTitle}
            onBack={() => go(offerListBackPage)}
            onSearch={() => {
              setSearchBackPage('shop-sim-empty');
              go('search');
            }}
            onOfferDetail={(id) => {
              setSelectedOfferId(id);
              setOfferDetailBackPage('shop-sim-empty');
              go('offer-detail');
            }}
            onAddToCart={(offer) => addToCart(offer, 1)}
          />
        )}
        {page === 'search' && (
          <OfferSearch
            onBack={() => go(searchBackPage)}
            onOfferDetail={(id) => {
              setSelectedOfferId(id);
              setOfferDetailBackPage('search');
              go('offer-detail');
            }}
            onAddToCart={(offer) => addToCart(offer, 1)}
          />
        )}
        {page === 'cart' && (
          <ShoppingCart
            items={cartItems}
            onItemsChange={setCartItems}
            onBack={() => go(cartBackPage)}
            onGoToShop={goToShop}
            isLoggedIn={isLoggedIn}
            onLogin={() => openLogin('cart', 'cart')}
            onCheckout={(lines) => startCheckoutFlow(lines, 'cart')}
          />
        )}
        {page === 'offer-detail' && (
          <OfferDetail
            offerId={selectedOfferId}
            isLoggedIn={isLoggedIn}
            onBack={() => go(offerDetailBackPage)}
            onLogin={() => openLogin('offer-detail', 'offer-detail')}
            onAddToCart={addToCart}
            onCheckout={(offer, quantity) =>
              startCheckoutFlow([{ offer, quantity }], 'offer-detail')
            }
          />
        )}
        {page === 'esim-check' && (
          <EsimCapabilityCheck
            onBack={() => go(checkoutBackPage)}
            onNext={() => openCheckout(checkoutLines, checkoutBackPage)}
          />
        )}
        {page === 'checkout' && (
          <Checkout
            lines={checkoutLines}
            values={checkoutForm}
            onChange={setCheckoutForm}
            isLoggedIn={isLoggedIn}
            esimDetailsVerified={esimDetailsVerified}
            onFillEsimDetails={() => {
              setEsimFillValues(EMPTY_ESIM_FILL);
              go('esim-fill');
            }}
            onEditEsimDetails={() => go('esim-fill')}
            onBack={() => go(checkoutBackPage)}
            onProceedToPayment={() => {
              setPaymentJourney('shop');
              setPaymentTotal(checkoutTotal);
              go('payment-method');
            }}
          />
        )}
        {page === 'wallet' && (
          <Wallet
            balance={walletRemaining}
            balanceFailed={walletBalanceFailed}
            onBack={() => go('dashboard')}
            onRecharge={() => {
              setPaymentJourney('wallet-recharge');
              go('recharge');
            }}
            onTransfer={() => openWalletTransferList()}
          />
        )}
        {page === 'recharge' && isLoggedIn && (
          <Recharge
            onBack={() => go('wallet')}
            onRecharge={(amount) => {
              setPaymentJourney('wallet-recharge');
              setPaymentTotal(amount);
              go('payment-method');
            }}
          />
        )}
        {page === 'recharge-status' && isLoggedIn && (
          <RechargeStatus
            succeeded={rechargeSucceeded}
            onBackToHome={() => openDashboard()}
            onTryAgain={() => go('recharge')}
          />
        )}
        {page === 'payment-method' && (
          <PaymentMethod
            totalAmount={paymentTotal || checkoutTotal}
            isLoggedIn={isLoggedIn}
            walletRemaining={walletRemaining}
            savedCards={savedCards}
            onSaveCard={(card) =>
              setSavedCards((prev) =>
                prev.some((saved) => saved.last4 === card.last4) ? prev : [...prev, card],
              )
            }
            onBack={() => go(paymentJourney === 'wallet-recharge' ? 'recharge' : 'checkout')}
            onPaid={(method) => {
              const total = paymentTotal || checkoutTotal;
              setPaymentTotal(total);
              setPaymentMethodUsed(method);
              if (paymentJourney === 'wallet-recharge') {
                if (method !== 'Wallet') {
                  setWalletRemaining((prev) => prev + total);
                }
                setRechargeSucceeded(true);
                go('recharge-status');
                return;
              }
              if (method === 'Wallet') {
                setWalletRemaining((prev) => prev - total);
              }
              setCartItems([]);
              go('payment-result');
            }}
          />
        )}
        {page === 'payment-result' && (
          <PaymentResult
            lines={checkoutLines}
            totalAmount={paymentTotal || checkoutTotal}
            paymentMethod={paymentMethodUsed}
            onBackToShop={goToShop}
          />
        )}
        {page === 'privacy' && (
          <Stub title="Privacy Policy" onBack={() => go(isLoggedIn ? 'dashboard' : 'welcome')} />
        )}
        {page === 'terms' && (
          <Stub title="Terms & Conditions" onBack={() => go(isLoggedIn ? 'dashboard' : 'welcome')} />
        )}
        {page === 'template-with-back' && (
          <BasicPageTemplate title="Page Title" showBack onBack={() => go('welcome')}>
            <p className="page-body-text">
              LF-P-001 — Basic page template: header, title, back control, content, and footer.
            </p>
          </BasicPageTemplate>
        )}
        {page === 'template-no-back' && (
          <BasicPageTemplate title="Page Title" showBack={false}>
            <p className="page-body-text">
              LF-P-002 — Basic page template (no back): header, title, content, and footer. No back
              control.
            </p>
          </BasicPageTemplate>
        )}
      </main>

      <Footer onNavigate={go} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

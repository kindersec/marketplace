import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import { useConfiguration } from '../../context/configurationContext';
import { useRouteConfiguration } from '../../context/routeConfigurationContext';
import { camelize } from '../../util/string';
import { pathByRouteName } from '../../util/routes';
import { apiBaseUrl } from '../../util/api';
import { FormattedMessage, useIntl } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { bool, object, string, func } from 'prop-types';
import { ensureCurrentUser } from '../../util/data';
import {
  isSignupEmailTakenError,
  isTooManyEmailVerificationRequestsError,
} from '../../util/errors';
import { pickUserFieldsData, addScopePrefix } from '../../util/userHelpers';

import { login, authenticationInProgress, signup, signupWithIdp } from '../../ducks/auth.duck';
import { isScrollingDisabled as selectIsScrollingDisabled, manageDisableScrolling } from '../../ducks/ui.duck';
import { sendVerificationEmail } from '../../ducks/user.duck';

import {
  Page,
  Heading,
  IconSpinner,
  NamedRedirect,
  LinkTabNavHorizontal,
  SocialLoginButton,
  ResponsiveBackgroundImageContainer,
  Modal,
  LayoutSingleColumn,
} from '../../components';

import TopbarContainer from '../../containers/TopbarContainer/TopbarContainer';
import FooterContainer from '../../containers/FooterContainer/FooterContainer';

import TermsAndConditions from './TermsAndConditions/TermsAndConditions';
import ConfirmSignupForm from './ConfirmSignupForm/ConfirmSignupForm';
import LoginForm from './LoginForm/LoginForm';
import SignupFormProvider from './SignupForm/SignupFormProvider';
import EmailVerificationInfo from './EmailVerificationInfo';

// We need to get ToS asset and get it rendered for the modal on this page.
import { TermsOfServiceContent } from '../../containers/TermsOfServicePage/TermsOfServicePage';

// We need to get PrivacyPolicy asset and get it rendered for the modal on this page.
import { PrivacyPolicyContent } from '../../containers/PrivacyPolicyPage/PrivacyPolicyPage';

import NotFoundPage from '../NotFoundPage/NotFoundPage';

import { TOS_ASSET_NAME, PRIVACY_POLICY_ASSET_NAME } from './AuthenticationPage.duck';

import css from './AuthenticationPage.module.css';
import { FacebookLogo, GoogleLogo } from './socialLoginLogos';

// Social login buttons are needed by AuthenticationForms
export const SocialLoginButtonsMaybe = props => {
  const routeConfiguration = useRouteConfiguration();
  const intl = useIntl();
  const { isLogin, showFacebookLogin, showGoogleLogin, from, userType } = props;
  const showSocialLogins = showFacebookLogin || showGoogleLogin;

  const getDataForSSORoutes = () => {
    const baseUrl = apiBaseUrl();

    // Default route where user is returned after successfull authentication
    const defaultReturn = pathByRouteName('LandingPage', routeConfiguration);

    // Route for confirming user data before creating a new user
    const defaultConfirm = pathByRouteName('ConfirmPage', routeConfiguration);

    const queryParams = new URLSearchParams({
      ...(defaultReturn ? { defaultReturn } : {}),
      ...(defaultConfirm ? { defaultConfirm } : {}),
      // Route where the user should be returned after authentication
      // This is used e.g. with EditListingPage and ListingPage
      ...(from ? { from } : {}),
      // The preselected userType needs to be saved over the visit to identity provider's service
      ...(userType ? { userType } : {}),
    });

    return { baseUrl, queryParams: queryParams.toString() };
  };

  const authWithFacebook = () => {
    const { baseUrl, queryParams } = getDataForSSORoutes();
    window.location.href = `${baseUrl}/api/auth/facebook?${queryParams}`;
  };

  const authWithGoogle = () => {
    const { baseUrl, queryParams } = getDataForSSORoutes();
    window.location.href = `${baseUrl}/api/auth/google?${queryParams}`;
  };

  const facebookAuthenticationMessage = isLogin
    ? intl.formatMessage({ id: 'AuthenticationPage.loginWithFacebook' })
    : intl.formatMessage({ id: 'AuthenticationPage.signupWithFacebook' });

  const googleAuthenticationMessage = isLogin
    ? intl.formatMessage({ id: 'AuthenticationPage.loginWithGoogle' })
    : intl.formatMessage({ id: 'AuthenticationPage.signupWithGoogle' });

  return showSocialLogins ? (
    <div className={css.idpButtons}>
      <div className={css.socialButtonsOr}>
        <span className={css.socialButtonsOrText}>
          <FormattedMessage id="AuthenticationPage.or" />
        </span>
      </div>

      {showFacebookLogin ? (
        <div className={css.socialButtonWrapper}>
          <SocialLoginButton onClick={() => authWithFacebook()}>
            <span className={css.buttonIcon}>
              <FacebookLogo ariaLabelledBy="facebook-authentication-msg" />
            </span>
            <span id="facebook-authentication-msg">{facebookAuthenticationMessage}</span>
          </SocialLoginButton>
        </div>
      ) : null}

      {showGoogleLogin ? (
        <div className={css.socialButtonWrapper}>
          <SocialLoginButton onClick={() => authWithGoogle()}>
            <span className={css.buttonIcon}>
              <GoogleLogo ariaLabelledBy="google-authentication-msg" />
            </span>
            <span id="google-authentication-msg">{googleAuthenticationMessage}</span>
          </SocialLoginButton>
        </div>
      ) : null}
    </div>
  ) : null;
};

// Tabs for SignupForm and LoginForm
export const AuthenticationForms = props => {
  const {
    isLogin,
    showFacebookLogin,
    showGoogleLogin,
    userType,
    from,
    submitLogin,
    loginError,
    idpAuthError,
    signupError,
    authInProgress,
    submitSignup,
    termsAndConditions,
    onOpenTermsOfService,
    onOpenPrivacyPolicy,
  } = props;
  const config = useConfiguration();
  const intl = useIntl();
  const { userFields, userTypes = [] } = config.user;
  const preselectedUserType = 'provider'; // Always provider for this page

  const fromMaybe = from ? { from } : null;
  const userTypeMaybe = { userType: preselectedUserType };
  const fromState = { state: { ...fromMaybe, ...userTypeMaybe } };
  const tabs = [
    {
      text: (
        <Heading as={!isLogin ? 'h1' : 'h2'} rootClassName={css.tab}>
          <FormattedMessage id="AuthenticationPage.signupLinkText" />
        </Heading>
      ),
      selected: !isLogin,
      linkProps: {
        name: 'SignupProviderPage',
        params: userTypeMaybe,
        to: fromState,
      },
    },
    {
      text: (
        <Heading as={isLogin ? 'h1' : 'h2'} rootClassName={css.tab}>
          <FormattedMessage id="AuthenticationPage.loginLinkText" />
        </Heading>
      ),
      selected: isLogin,
      linkProps: {
        name: 'LoginPage',
        to: fromState,
      },
    },
  ];

  const handleSubmitSignup = values => {
    const { email, password, fname, lname, displayName, phoneNumber, ...rest } = values;
    const userData = {
      email,
      password,
      firstName: fname,
      lastName: lname,
      displayName,
      phoneNumber,
      publicData: {
        userType: 'provider',
        ...rest,
      },
    };
    submitSignup(userData);
  };

  const ariaLabel = `${intl.formatMessage({ id: 'AuthenticationPage.signupLinkText' })} & ${intl.formatMessage({ id: 'AuthenticationPage.loginLinkText' })}`;

  const loginErrorMessage = (
    <div className={css.error}>
      <FormattedMessage id="AuthenticationPage.loginFailed" />
    </div>
  );

  const signupErrorMessage = (
    <div className={css.error}>
      {isSignupEmailTakenError(signupError) ? (
        <FormattedMessage id="AuthenticationPage.signupFailedEmailAlreadyTaken" />
      ) : (
        <FormattedMessage id="AuthenticationPage.signupFailed" />
      )}
    </div>
  );

  const loginOrSignupError = loginError ? loginErrorMessage : signupError ? signupErrorMessage : null;

  return (
    <div className={css.content}>
      <LinkTabNavHorizontal className={css.tabs} tabs={tabs} ariaLabel={ariaLabel} />
      {loginOrSignupError}

      {isLogin ? (
        <LoginForm className={css.loginForm} onSubmit={submitLogin} inProgress={authInProgress} />
      ) : (
        <SignupFormProvider
          className={css.signupForm}
          onSubmit={handleSubmitSignup}
          inProgress={authInProgress}
          onOpenTermsOfService={onOpenTermsOfService}
          onOpenPrivacyPolicy={onOpenPrivacyPolicy}
          preselectedUserType={preselectedUserType}
          userTypes={userTypes}
          userFields={userFields}
        />
      )}

      <SocialLoginButtonsMaybe
        isLogin={isLogin}
        showFacebookLogin={showFacebookLogin}
        showGoogleLogin={showGoogleLogin}
        {...fromMaybe}
        {...userTypeMaybe}
      />
    </div>
  );
};

// Main component
export const AuthenticationPageProviderComponent = props => {
  const {
    history,
    location,
    currentUser,
    scrollingDisabled,
    manageDisableScrolling,
    loginError,
    signupError,
    authInProgress,
    login,
    signup,
    sendVerificationEmail,
    termsAndConditions,
    privacyPolicy,
    hostedAssets,
  } = props;

  const [isLogin, setIsLogin] = useState(false);
  const [showTosModal, setShowTosModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showEmailVerificationModal, setShowEmailVerificationModal] = useState(false);
  const [emailVerificationEmail, setEmailVerificationEmail] = useState('');

  const config = useConfiguration();
  const intl = useIntl();
  const { userFields, userTypes = [] } = config.user;

  // Check if user is already logged in
  const ensuredCurrentUser = ensureCurrentUser(currentUser);
  const currentUserLoaded = !!ensuredCurrentUser?.id;
  if (currentUserLoaded) {
    const from = location?.state?.from;
    if (from) {
      return <Redirect to={from} />;
    }
    return <NamedRedirect name="LandingPage" />;
  }

  // Handle login
  const handleLogin = values => {
    const { email, password } = values;
    login({ email, password });
  };

  // Handle signup
  const handleSignup = values => {
    const { email, password, fname, lname, displayName, phoneNumber, ...rest } = values;
    const userData = {
      email,
      password,
      firstName: fname,
      lastName: lname,
      displayName,
      phoneNumber,
      publicData: {
        userType: 'provider',
        ...rest,
      },
    };
    signup(userData);
  };

  // Handle email verification
  const handleEmailVerification = email => {
    setEmailVerificationEmail(email);
    setShowEmailVerificationModal(true);
  };

  // Handle resend verification email
  const handleResendVerificationEmail = () => {
    sendVerificationEmail(emailVerificationEmail);
  };

  // Handle terms and conditions
  const handleTosClick = () => {
    setShowTosModal(true);
  };

  // Handle privacy policy
  const handlePrivacyClick = () => {
    setShowPrivacyModal(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setShowTosModal(false);
    setShowPrivacyModal(false);
    setShowEmailVerificationModal(false);
  };

  // Page schema and basic design setup like /signup
  const marketplaceName = config.marketplaceName;
  const schemaTitle = isLogin
    ? intl.formatMessage({ id: 'AuthenticationPage.schemaTitleLogin' }, { marketplaceName })
    : intl.formatMessage({ id: 'AuthenticationPage.schemaTitleSignup' }, { marketplaceName });
  const schemaDescription = isLogin
    ? intl.formatMessage({ id: 'AuthenticationPage.schemaDescriptionLogin' }, { marketplaceName })
    : intl.formatMessage({ id: 'AuthenticationPage.schemaDescriptionSignup' }, { marketplaceName });



  // Check if social login is enabled
  const showFacebookLogin = config.socialLogin?.facebook?.enabled;
  const showGoogleLogin = config.socialLogin?.google?.enabled;

  return (
    <Page
      title={schemaTitle}
      scrollingDisabled={scrollingDisabled}
      schema={{
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        name: schemaTitle,
        description: schemaDescription,
      }}
    >
      <LayoutSingleColumn
        mainColumnClassName={css.layoutWrapperMain}
        topbar={<TopbarContainer />}
        footer={<FooterContainer />}
      >
        <ResponsiveBackgroundImageContainer
          className={css.root}
          childrenWrapperClassName={css.contentContainer}
          as="section"
          image={config.branding.brandImage}
          sizes="100%"
          useOverlay
        >
          <div className={css.content}>
            <AuthenticationForms
              isLogin={isLogin}
              showFacebookLogin={showFacebookLogin}
              showGoogleLogin={showGoogleLogin}
              userType="provider"
              from={location?.state?.from}
              submitLogin={handleLogin}
              loginError={loginError}
              idpAuthError={null}
              signupError={signupError}
              authInProgress={authInProgress}
              submitSignup={handleSignup}
              termsAndConditions={termsAndConditions}
              onOpenTermsOfService={handleTosClick}
              onOpenPrivacyPolicy={handlePrivacyClick}
            />
          </div>
        </ResponsiveBackgroundImageContainer>
      </LayoutSingleColumn>

      {/* Modals */}
      {showTosModal && (
        <Modal
          id="AuthenticationPage.tosModal"
          isOpen={showTosModal}
          onClose={handleModalClose}
          closeOnMouseLeave={false}
          onManageDisableScrolling={manageDisableScrolling}
        >
          <TermsOfServiceContent />
        </Modal>
      )}

      {showPrivacyModal && (
        <Modal
          id="AuthenticationPage.privacyModal"
          isOpen={showPrivacyModal}
          onClose={handleModalClose}
          closeOnMouseLeave={false}
          onManageDisableScrolling={manageDisableScrolling}
        >
          <PrivacyPolicyContent />
        </Modal>
      )}

      {showEmailVerificationModal && (
        <Modal
          id="AuthenticationPage.emailVerificationModal"
          isOpen={showEmailVerificationModal}
          onClose={handleModalClose}
          closeOnMouseLeave={false}
          onManageDisableScrolling={manageDisableScrolling}
        >
          <EmailVerificationInfo
            email={emailVerificationEmail}
            onResendVerificationEmail={handleResendVerificationEmail}
            onClose={handleModalClose}
          />
        </Modal>
      )}
    </Page>
  );
};

AuthenticationPageProviderComponent.defaultProps = {
  currentUser: null,
  scrollingDisabled: false,
  manageDisableScrolling: () => null,
  loginError: null,
  signupError: null,
  authInProgress: false,
  login: () => null,
  signup: () => null,
  sendVerificationEmail: () => null,
  termsAndConditions: null,
  privacyPolicy: null,
  hostedAssets: null,
};

AuthenticationPageProviderComponent.propTypes = {
  history: object.isRequired,
  location: object.isRequired,
  currentUser: propTypes.currentUser,
  scrollingDisabled: bool.isRequired,
  manageDisableScrolling: func.isRequired,
  loginError: object,
  signupError: object,
  authInProgress: bool.isRequired,
  login: func.isRequired,
  signup: func.isRequired,
  sendVerificationEmail: func.isRequired,
  termsAndConditions: object,
  privacyPolicy: object,
  hostedAssets: object,
};

const mapStateToProps = state => {
  const { currentUser } = state.user || {};
  const scrollingDisabled = selectIsScrollingDisabled(state);
  const { loginError, signupError } = state.auth || {};
  const authInProgress = authenticationInProgress(state);
  const { termsOfService: termsAndConditions, privacyPolicy } = state.hostedAssets || {};

  return {
    currentUser,
    scrollingDisabled,
    loginError,
    signupError,
    authInProgress,
    termsAndConditions,
    privacyPolicy,
  };
};

const mapDispatchToProps = dispatch => ({
  manageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  login: values => dispatch(login(values)),
  signup: values => dispatch(signup(values)),
  sendVerificationEmail: email => dispatch(sendVerificationEmail(email)),
});

const AuthenticationPageProvider = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(AuthenticationPageProviderComponent);

export default AuthenticationPageProvider;

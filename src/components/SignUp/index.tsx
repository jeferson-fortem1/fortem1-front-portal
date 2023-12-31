import cr from 'classnames';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { CustomInput, PasswordStrengthMeter } from '../';
import { isUsernameEnabled } from '../../api';
import { captchaType, passwordMinEntropy } from '../../api/config';
import {
    EMAIL_REGEX,
    ERROR_LONG_USERNAME,
    ERROR_SHORT_USERNAME,
    ERROR_LONG_FULLNAME,
    ERROR_SHORT_FULLNAME,
    ERROR_EMAIL,
    PASSWORD_REGEX,
    USERNAME_REGEX,
    FULLNAME_REGEX,
} from '../../helpers';
import { GeetestCaptchaResponse } from '../../modules';
import { selectMobileDeviceState } from '../../modules/public/globalSettings';

import { LegalDocuments } from '../../containers';

import logo from '../../assets/images/logo-icon-dark.svg';

import { MdOutlinePersonOutline, MdLockOutline, MdMailOutline } from "react-icons/md";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export interface SignUpFormProps {
    isLoading?: boolean;
    title?: string;
    onSignUp: () => void;
    onSignIn?: () => void;
    className?: string;
    image?: string;
    labelSignIn?: string;
    labelSignUp?: string;
    fullnameLabel?: string;
    usernameLabel?: string;
    emailLabel?: string;
    passwordLabel?: string;
    confirmPasswordLabel?: string;
    referalCodeLabel?: string;
    termsMessage?: string;
    refId: string;
    password: string;
    username: string;
    fullname: string;
    email: string;
    confirmPassword: string;
    handleChangeUsername: (value: string) => void;
    handleChangeFullname: (value: string) => void;
    handleChangeEmail: (value: string) => void;
    handleChangePassword: (value: string) => void;
    handleChangeConfirmPassword: (value: string) => void;
    handleChangeRefId: (value: string) => void;
    hasConfirmed: boolean;
    clickCheckBox: (e: any) => void;
    validateForm: () => void;
    validatePass: () => void;
    emailError: string;
    passwordError: string;
    confirmationError: string;
    handleFocusUsername: () => void;
    handleFocusFullname: () => void;
    handleFocusEmail: () => void;
    handleFocusPassword: () => void;
    handleFocusConfirmPassword: () => void;
    handleFocusRefId: () => void;
    confirmPasswordFocused: boolean;
    refIdFocused: boolean;
    usernameFocused: boolean;
    fullnameFocused: boolean;
    emailFocused: boolean;
    passwordFocused: boolean;
    renderCaptcha: JSX.Element | null;
    reCaptchaSuccess: boolean;
    geetestCaptchaSuccess: boolean;
    captcha_response?: string | GeetestCaptchaResponse;
    currentPasswordEntropy: number;
    passwordErrorFirstSolved: boolean;
    passwordErrorSecondSolved: boolean;
    passwordErrorThirdSolved: boolean;
    passwordPopUp: boolean;
    myRef: any;
    passwordWrapper: any;
    translate: (id: string) => string;
}

const SignUpFormComponent: React.FC<SignUpFormProps> = ({
    username,
    fullname,
    email,
    confirmPassword,
    refId,
    onSignIn,
    image,
    isLoading,
    labelSignIn,
    labelSignUp,
    fullnameLabel,
    usernameLabel,
    emailLabel,
    confirmPasswordLabel,
    passwordFocused,
    referalCodeLabel,
    termsMessage,
    geetestCaptchaSuccess,
    hasConfirmed,
    reCaptchaSuccess,
    currentPasswordEntropy,
    passwordPopUp,
    password,
    passwordLabel,
    emailError,
    translate,
    confirmationError,
    usernameFocused,
    fullnameFocused,
    emailFocused,
    passwordErrorFirstSolved,
    passwordErrorSecondSolved,
    confirmPasswordFocused,
    handleChangePassword,
    passwordErrorThirdSolved,
    handleFocusPassword,
    refIdFocused,
    validateForm,
    validatePass,
    onSignUp,
    handleChangeFullname,
    handleFocusFullname,
    handleChangeUsername,
    handleFocusUsername,
    handleChangeEmail,
    handleFocusEmail,
    handleChangeConfirmPassword,
    handleFocusConfirmPassword,
    handleChangeRefId,
    handleFocusRefId,
    clickCheckBox,
    renderCaptcha,
}) => {
    const isMobileDevice = useSelector(selectMobileDeviceState);
    const history = useHistory();
    const { formatMessage } = useIntl();

    const disableButton = React.useMemo((): boolean => {
        const captchaTypeValue = captchaType();

        if (!hasConfirmed || isLoading || !email.match(EMAIL_REGEX) || !password || !confirmPassword || confirmationError ||
            (isUsernameEnabled() && !username.match(USERNAME_REGEX))) {

            return true;
        }

        if (captchaTypeValue === 'recaptcha' && !reCaptchaSuccess) {
            return true;
        }

        if (captchaTypeValue === 'geetest' && !geetestCaptchaSuccess) {
            return true;
        }

        return false;
    }, [
        captchaType,
        confirmPassword,
        username,
        fullname,
        email,
        geetestCaptchaSuccess,
        hasConfirmed,
        isLoading,
        password,
        reCaptchaSuccess,
    ]);

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    function click() {
        setShowPassword(!showPassword);
        // renderPasswordInput();
        handleFocusPassword();
        // passwordPopUp = !passwordPopUp;
        
        
        
       
    }

    function click2() {
        setShowPassword2(!showPassword2);
        // renderPasswordInput;
        handleFocusConfirmPassword();
        
        
    }

    const renderPasswordInput = React.useCallback(() => {
        const passwordGroupClass = cr('cr-sign-up-form__group', {
            'cr-sign-up-form__group--focused': passwordFocused,
            'cr-sign-up-form__group--focused-password': passwordFocused,
            

        });

        return (
            <div className={passwordGroupClass}>
                
                <CustomInput
                    type={showPassword ? "text" : "password"}
                    label={passwordLabel || 'Password'}
                    placeholder={passwordLabel || 'Password'}
                    defaultLabel="Password"
                    handleChangeInput={handleChangePassword}
                    inputValue={password}
                    handleFocusInput={handleFocusPassword}
                    classNameLabel="cr-sign-up-form__label"
                    classNameInput="cr-sign-up-form__input"
                    autoFocus={false}
                    pre={<MdLockOutline />}
                    id='inputPass'
                    
                    
                />
                <Button 
                    onClick={click} 
                    style={{position: 'relative', top: '-36px', left: '90%', zIndex: 10, opacity: 0.71, background: 'transparent'}}
                    tabIndex={-1}
                    >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
                {!showPassword ? (
                password ? (
                    <PasswordStrengthMeter
                        minPasswordEntropy={passwordMinEntropy()}
                        currentPasswordEntropy={currentPasswordEntropy}
                        passwordExist={password !== ''}
                        passwordErrorFirstSolved={passwordErrorFirstSolved}
                        passwordErrorSecondSolved={passwordErrorSecondSolved}
                        passwordErrorThirdSolved={passwordErrorThirdSolved}
                        passwordPopUp={passwordPopUp}
                        translate={translate}
                    />
                ) : null
                ) : null}
            </div>
        );
    }, [
        currentPasswordEntropy,
        password,
        passwordFocused,
        passwordLabel,
        passwordPopUp,
        handleChangePassword,
        handleFocusPassword,
        passwordErrorFirstSolved,
        passwordErrorSecondSolved,
        passwordErrorThirdSolved,
        translate,
    ]);

    const handleSubmitForm = React.useCallback(() => {
        onSignUp();
    }, [onSignUp]);

    

    const renderLegal = React.useMemo(() => {
        return (

                
                {LegalDocuments}

        );
    }, []);

    const isValidForm = React.useCallback(() => {
        const isEmailValid = email.match(EMAIL_REGEX);
        const isPasswordValid = password.match(PASSWORD_REGEX);
        const isConfirmPasswordValid = password === confirmPassword;

        return email && isEmailValid && password && isPasswordValid && confirmPassword && isConfirmPasswordValid;
    }, [confirmPassword, email, password]);

    const isValidPass = React.useCallback(() => {
        const isPasswordValid = password.match(PASSWORD_REGEX);
        const isConfirmPasswordValid = password === confirmPassword;

        return password && isPasswordValid && confirmPassword && isConfirmPasswordValid;
    }, [confirmPassword, password]);

    const handleClick = React.useCallback(
        (e?: React.FormEvent<HTMLInputElement>) => {
            if (e) {
                e.preventDefault();
            }

            if (!isValidForm()) {
                validateForm();
            } else {
                handleSubmitForm();
            }
        },
        [handleSubmitForm, isValidForm, validateForm]
    );

    const handleEnterPress = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'Enter') {
                event.preventDefault();

                handleClick();
            }
        },
        [handleClick]
    );

    const renderUsernameError = (nick: string) => {
        return nick.length < 2 ? translate(ERROR_SHORT_USERNAME) : translate(ERROR_LONG_USERNAME);
    };

    const renderFullnameError = (name: string) => {
        return name.length < 2 ? translate(ERROR_SHORT_FULLNAME) : translate(ERROR_LONG_FULLNAME);
    };

    const renderEmailError = (mail: string) => {
        return translate(ERROR_EMAIL);
    };

    const renderLogIn = React.useCallback(() => {
        return (
            <div className="pg-sign-up-screen__login">
                <span>
                    {formatMessage({ id: 'page.header.signUp.alreadyRegistered' })}
                    <span onClick={() => history.push('/signin')} className="pg-sign-up-screen__login-button">
                        {formatMessage({ id: 'page.mobile.header.signIn' })}
                    </span>
                </span>
            </div>
        );
    }, [history, formatMessage]);

    return (
        <form>
            <div className="cr-sign-up-form" onKeyPress={handleEnterPress}>
                {/* {isMobileDevice && (
                    <div className="cr-sign-up-form__options-group">
                        <div className="cr-sign-up-form__option">
                            <div
                                className="cr-sign-up-form__option-inner cr-sign-in-form__tab-signin"
                                onClick={onSignIn}>
                                {labelSignIn || 'Sign In'}
                            </div>
                        </div>
                        <div className="cr-sign-up-form__option">
                            <div className="cr-sign-up-form__option-inner __selected">{labelSignUp || 'Sign Up'}</div>
                        </div>
                    </div>
                )} */}
                <div className="cr-sign-up-form__form-content">
                {logo ? (
                        <div className="cr-sign-up-form__title">
                        
                            <img className="cr-sign-up-form__image" src={logo} alt="logo" />
                            <p> {formatMessage({ id: 'page.header.signUp.title' })} </p>
                        </div>
                    ) : null}
                    {/* {isUsernameEnabled() ? ( */}
                        <div
                            className={cr('cr-sign-up-form__group', {
                                'cr-sign-up-form__group--focused': usernameFocused,
                                'cr-sign-up-form__group--errored': username.length &&
                                !usernameFocused && !username.match(USERNAME_REGEX),
                            })}>
                            <CustomInput
                                type="text"
                                label={usernameLabel || 'Username'}
                                placeholder={usernameLabel || 'Username'}
                                defaultLabel="Username"
                                handleChangeInput={handleChangeUsername}
                                inputValue={username}
                                handleFocusInput={handleFocusUsername}
                                classNameLabel="cr-sign-up-form__label"
                                classNameInput="cr-sign-up-form__input"
                                autoFocus={true}
                                pre={<MdOutlinePersonOutline />}
                            />
                            {!username.match(USERNAME_REGEX) && !usernameFocused && username.length ? (
                                <div className="cr-sign-up-form__error2">
                                    {renderUsernameError(username)}
                                </div>
                            ) : null}
                        </div>
                    {/* ) : null} */}

<div
                            className={cr('cr-sign-up-form__group', {
                                'cr-sign-up-form__group--focused': fullnameFocused,
                                'cr-sign-up-form__group--errored': fullname.length &&
                                !fullnameFocused && !fullname.match(FULLNAME_REGEX),
                            })}>
                            <CustomInput
                                type="text"
                                label={fullnameLabel || 'Fullname'}
                                placeholder={fullnameLabel || 'Fullname'}
                                defaultLabel="Fullname"
                                handleChangeInput={handleChangeFullname}
                                inputValue={fullname}
                                handleFocusInput={handleFocusFullname}
                                classNameLabel="cr-sign-up-form__label"
                                classNameInput="cr-sign-up-form__input"
                                autoFocus={false}
                                pre={<MdOutlinePersonOutline />}
                            />
                            {!fullname.match(FULLNAME_REGEX) && !fullnameFocused && fullname.length ? (
                                <div className="cr-sign-up-form__error2">
                                    {renderFullnameError(fullname)}
                                </div>
                            ) : null}
                        </div>



                    <div
                        className={cr('cr-sign-up-form__group', {
                            'cr-sign-up-form__group--focused': emailFocused,
                        })}>
                        <CustomInput
                            type="email"
                            label={emailLabel || 'Email'}
                            placeholder={emailLabel || 'Email'}
                            defaultLabel="Email"
                            handleChangeInput={handleChangeEmail}
                            inputValue={email}
                            handleFocusInput={handleFocusEmail}
                            classNameLabel="cr-sign-up-form__label"
                            classNameInput="cr-sign-up-form__input"
                            autoFocus={false}
                            pre={<MdMailOutline />}
                        />
                        {/* {emailError && <div className="cr-sign-up-form__error">{emailError}</div>} */}
                        {!email.match(EMAIL_REGEX) && !emailFocused && email.length ? (
                                <div className="cr-sign-up-form__error2">
                                    {renderEmailError(email)}
                                </div>
                            ) : null}
                    </div>
                    {renderPasswordInput()}
                    <div
                        className={cr('cr-sign-up-form__group', {
                            'cr-sign-up-form__group--focused': confirmPasswordFocused,
                            'cr-sign-up-form__group--errored':  confirmPassword != password
                        })}>
                        <CustomInput
                            type={showPassword2 ? "text" : "password"}
                            label={confirmPasswordLabel || 'Confirm Password'}
                            placeholder={confirmPasswordLabel || 'Confirm Password'}
                            defaultLabel="Confirm Password"
                            handleChangeInput={handleChangeConfirmPassword}
                            inputValue={confirmPassword}
                            handleFocusInput={handleFocusConfirmPassword}
                            classNameLabel="cr-sign-up-form__label"
                            classNameInput="cr-sign-up-form__input"
                            autoFocus={false}
                            pre={<MdLockOutline />}
                            
                        />
                             <Button 
                    onClick={click2} 
                    style={{position: 'relative', top: '-36px', left: '90%', zIndex: 10, opacity: 0.71, background: 'transparent'}}
                    tabIndex={-1}
                    >
                    {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                    
                </Button>
                        
                        {confirmationError && <div className={'cr-sign-up-form__error'}>{confirmationError}</div>}
                        {(!confirmPasswordFocused && confirmPassword.length && confirmPassword != password && !confirmationError) ? (
                                <div className="cr-sign-up-form__error">
                                    {formatMessage({ id: 'page.header.signUp.confirmPassword.message.error'})}
                                </div>
                            ) : null}
                        {/* {(confirmPassword != password) && <div className={'cr-sign-up-form__error'}>"Senhas diferentes"</div>} */}
                        
                    </div>
                    
                    {/* <details>
                        <summary>{formatMessage({ id: 'page.header.signUp.referalCode' })}</summary>
                      <div
                        className={cr('cr-sign-up-form__group', {
                            'cr-sign-up-form__group--focused': refIdFocused,
                        })}>
                        <CustomInput
                            type="text"
                            label={''}
                            placeholder={referalCodeLabel || 'Referral code'}
                            defaultLabel=""
                            handleChangeInput={handleChangeRefId}
                            inputValue={refId}
                            handleFocusInput={handleFocusRefId}
                            // classNameLabel="cr-sign-up-form__label"
                            classNameInput="cr-sign-up-form__input"
                            autoFocus={false}
                        />
                    </div>

            </details> */}
                    <Form className="cr-sign-up-form__group" onClick={clickCheckBox}>
                        <Form.Check
                            type="checkbox"
                            custom
                            id="agreeWithTerms"
                            checked={hasConfirmed}
                            label={termsMessage ? termsMessage : 'I  agree all statements in terms of service'}
                            
                        />
                    </Form>
                    {/* {renderLegal} */}
                    {renderCaptcha}
                    <div className="cr-sign-up-form__button-wrapper">
                        <Button
                            block={true}
                            type="button"
                            disabled={disableButton}
                            onClick={(e) => handleClick(e as any)}
                            size="lg"
                            variant="primary">
                            {isLoading ? 'Loading...' : labelSignUp ? labelSignUp : 'Sign up'}
                        </Button>
                    </div>
                    {/* {isMobileDevice && renderLogIn()} */}
                    {renderLogIn()}
                </div>
            </div>
        </form>
    );
};

export const SignUpForm = React.memo(SignUpFormComponent);

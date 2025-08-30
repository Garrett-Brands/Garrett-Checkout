import {
    type Address,
    type Cart,
    type CheckoutParams,
    type CheckoutSelectors,
    type Consignment,
    type CustomerRequestOptions,
    type FormField,
    type RequestOptions,
    type ShippingInitializeOptions,
    type ShippingRequestOptions,
} from '@bigcommerce/checkout-sdk';
import React, { useEffect } from 'react';

import { withLanguage, type WithLanguageProps } from '@bigcommerce/checkout/locale';
import { useCheckout } from '@bigcommerce/checkout/payment-integration-api';

import isUsingMultiShipping from './isUsingMultiShipping';
import MultiShippingForm, { type MultiShippingFormValues } from './MultiShippingForm';
import SingleShippingForm, { type SingleShippingFormValues } from './SingleShippingForm';

export interface ShippingFormProps {
    cart: Cart;
    cartHasChanged: boolean;
    consignments: Consignment[];
    countriesWithAutocomplete: string[];
    customerMessage: string;
    googleMapsApiKey?: string;
    isBillingSameAsShipping: boolean;
    isGuest: boolean;
    isLoading: boolean;
    isShippingStepPending: boolean;
    isMultiShippingMode: boolean;
    methodId?: string;
    shippingAddress?: Address;
    shouldShowOrderComments: boolean;
    isFloatingLabelEnabled?: boolean;
    isInitialValueLoaded: boolean;
    deinitialize(options: ShippingRequestOptions): Promise<CheckoutSelectors>;
    deleteConsignments(): Promise<Address | undefined>;
    getFields(countryCode?: string): FormField[];
    initialize(options: ShippingInitializeOptions): Promise<CheckoutSelectors>;
    onCreateAccount(): void;
    onMultiShippingSubmit(values: MultiShippingFormValues): void;
    onSignIn(): void;
    onSingleShippingSubmit(values: SingleShippingFormValues): void;
    onUnhandledError(error: Error): void;
    signOut(options?: CustomerRequestOptions): void;
    updateAddress(
        address: Partial<Address>,
        options: RequestOptions<CheckoutParams>,
    ): Promise<CheckoutSelectors>;
<<<<<<< HEAD
    shipDate: Date;
    setShipDate: Function;
    arrivalDate: Date;
    setArrivalDate: Function;
    giftMessage: String;
    setGiftMessage: Function;
    giftMessages: Array<any>;
    setGiftMessages: Function;
    loadGiftMessages: Function;
    isGiftOrder: boolean;
    setIsGiftOrder: Function;
}

class ShippingForm extends Component<ShippingFormProps & WithLanguageProps> {
    render(): ReactNode {
        const {
            addresses,
            assignItem,
            cart,
            cartHasChanged,
            createCustomerAddress,
            consignments,
            countries,
            countriesWithAutocomplete,
            onCreateAccount,
            customerMessage,
            deinitialize,
            deleteConsignments,
            getFields,
            googleMapsApiKey,
            initialize,
            isBillingSameAsShipping,
            isGuest,
            isLoading,
            isMultiShippingMode,
            methodId,
            onMultiShippingSubmit,
            onSignIn,
            onSingleShippingSubmit,
            onUnhandledError,
            onUseNewAddress,
            shippingAddress,
            shouldShowOrderComments,
            shouldShowSaveAddress,
            shouldShowAddAddressInCheckout,
            signOut,
            updateAddress,
            isShippingStepPending,
            shipDate,
            setShipDate,
            arrivalDate,
            setArrivalDate,
            giftMessage,
            setGiftMessage,
            giftMessages,
            setGiftMessages,
            loadGiftMessages,
            isGiftOrder,
            setIsGiftOrder,
            isFloatingLabelEnabled,
        } = this.props;

        return isMultiShippingMode ? (
            <MultiShippingForm
                addresses={ addresses }
                assignItem={ assignItem }
                cart={ cart }
                cartHasChanged={ cartHasChanged }
                consignments={ consignments }
                countries={ countries }
                countriesWithAutocomplete={ countriesWithAutocomplete }
                createCustomerAddress={ createCustomerAddress }
                customerMessage={ customerMessage }
                defaultCountryCode={ shippingAddress?.countryCode }
                getFields={ getFields }
                googleMapsApiKey={ googleMapsApiKey }
                isGuest={ isGuest }
                isLoading={ isLoading }
                onCreateAccount={ onCreateAccount }
                onSignIn={ onSignIn }
                onSubmit={ onMultiShippingSubmit }
                onUnhandledError={ onUnhandledError }
                onUseNewAddress={ onUseNewAddress }
                shouldShowAddAddressInCheckout={ shouldShowAddAddressInCheckout }
                shouldShowOrderComments={ shouldShowOrderComments }
                shipDate={ shipDate }
                setShipDate={ setShipDate }
                arrivalDate={ arrivalDate }
                setArrivalDate={ setArrivalDate }
                giftMessages={ giftMessages }
                setGiftMessages={ setGiftMessages }
                loadGiftMessages={ loadGiftMessages }
            />
        ) : (
            <SingleShippingForm
                addresses={ addresses }
                cart={ cart }
                cartHasChanged={ cartHasChanged }
                consignments={ consignments }
                countries={ countries }
                countriesWithAutocomplete={ countriesWithAutocomplete }
                customerMessage={ customerMessage }
                deinitialize={ deinitialize }
                deleteConsignments={ deleteConsignments }
                getFields={ getFields }
                googleMapsApiKey={ googleMapsApiKey }
                initialize={ initialize }
                isBillingSameAsShipping={ isBillingSameAsShipping }
                isLoading={ isLoading }
                isMultiShippingMode={ isMultiShippingMode }
                isShippingStepPending={ isShippingStepPending }
                methodId={ methodId }
                onSubmit={ onSingleShippingSubmit }
                onUnhandledError={ onUnhandledError }
                shippingAddress={ shippingAddress }
                shouldShowOrderComments={ shouldShowOrderComments }
                shouldShowSaveAddress={ shouldShowSaveAddress }
                signOut={ signOut }
                updateAddress={ updateAddress }
                isFloatingLabelEnabled={isFloatingLabelEnabled}
                shipDate={ shipDate }
                setShipDate={ setShipDate }
                arrivalDate={ arrivalDate }
                setArrivalDate={ setArrivalDate }
                giftMessage={ giftMessage }
                setGiftMessage={ setGiftMessage }
                isGiftOrder={ isGiftOrder }
                setIsGiftOrder={ setIsGiftOrder }
                giftMessages={ giftMessages }
                setGiftMessages={ setGiftMessages }
            />
        );
    }
}
=======
    shippingFormRenderTimestamp?: number;
    setIsMultishippingMode(isMultiShippingMode: boolean): void;
}

const ShippingForm = ({
    cart,
    cartHasChanged,
      consignments,
      countriesWithAutocomplete,
      customerMessage,
      deinitialize,
      deleteConsignments,
      getFields,
      googleMapsApiKey,
      initialize,
      isBillingSameAsShipping,
      isLoading,
      isMultiShippingMode,
      methodId,
      onMultiShippingSubmit,
      onSingleShippingSubmit,
    onUnhandledError,
      shippingAddress,
      shouldShowOrderComments,
      signOut,
      updateAddress,
      isShippingStepPending,
      isFloatingLabelEnabled,
    isInitialValueLoaded,
    shippingFormRenderTimestamp,
    setIsMultishippingMode,
}: ShippingFormProps & WithLanguageProps) => {
    const {
        checkoutState: {
            data: { getConfig },
        },
    } = useCheckout();
    const config = getConfig();

    useEffect(() => {
        if (shippingFormRenderTimestamp) {
            const hasMultiShippingEnabled = config?.checkoutSettings?.hasMultiShippingEnabled ?? false;
            const isMultiShippingMode =
                !!cart &&
                !!consignments &&
                hasMultiShippingEnabled &&
                isUsingMultiShipping(consignments, cart.lineItems);

            setIsMultishippingMode(isMultiShippingMode);
        }
    }, [shippingFormRenderTimestamp]);

    const getMultiShippingForm = () => {
        return <MultiShippingForm
            cartHasChanged={cartHasChanged}
            countriesWithAutocomplete={countriesWithAutocomplete}
            customerMessage={customerMessage}
            defaultCountryCode={shippingAddress?.countryCode}
            isLoading={isLoading}
            onSubmit={onMultiShippingSubmit}
            onUnhandledError={onUnhandledError}
        />;
    };

    return isMultiShippingMode ? (
        getMultiShippingForm()
    ) : (
        <SingleShippingForm
            cartHasChanged={cartHasChanged}
            consignments={consignments}
            countriesWithAutocomplete={countriesWithAutocomplete}
            customerMessage={customerMessage}
            deinitialize={deinitialize}
            deleteConsignments={deleteConsignments}
            getFields={getFields}
            googleMapsApiKey={googleMapsApiKey}
            initialize={initialize}
            isBillingSameAsShipping={isBillingSameAsShipping}
            isFloatingLabelEnabled={isFloatingLabelEnabled}
            isInitialValueLoaded={isInitialValueLoaded}
            isLoading={isLoading}
            isMultiShippingMode={isMultiShippingMode}
            isShippingStepPending={isShippingStepPending}
            methodId={methodId}
            onSubmit={onSingleShippingSubmit}
            onUnhandledError={onUnhandledError}
            shippingAddress={shippingAddress}
            shippingFormRenderTimestamp={shippingFormRenderTimestamp}
            shouldShowOrderComments={shouldShowOrderComments}
            signOut={signOut}
            updateAddress={updateAddress}
        />
    );
};
>>>>>>> staging

export default withLanguage(ShippingForm);

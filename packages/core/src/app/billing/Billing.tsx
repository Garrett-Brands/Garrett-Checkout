import {
    type Address,
    type CheckoutRequestBody,
    type CheckoutSelectors,
    type Country,
    type Customer,
    type FormField,
} from '@bigcommerce/checkout-sdk';
import { noop } from 'lodash';
import React, { Component, type ReactNode } from 'react';

import { TranslatedString } from '@bigcommerce/checkout/locale';
import { type CheckoutContextProps } from '@bigcommerce/checkout/payment-integration-api';
import { AddressFormSkeleton } from '@bigcommerce/checkout/ui';

import { isEqualAddress, mapAddressFromFormValues } from '../address';
import { withCheckout } from '../checkout';
import { EMPTY_ARRAY, isExperimentEnabled, isFloatingLabelEnabled } from '../common/utility';
import { getShippableItemsCount } from '../shipping';
import { Legend } from '../ui/form';

import BillingForm, { type BillingFormValues } from './BillingForm';
import getBillingMethodId from './getBillingMethodId';

export interface BillingProps {
    navigateNextStep(): void;
    onReady?(): void;
    onUnhandledError(error: Error): void;
    shipDate: Date;
    arrivalDate: Date;
    giftMessage: String;
}

export interface WithCheckoutBillingProps {
    countries: Country[];
    countriesWithAutocomplete: string[];
    customer: Customer;
    customerMessage: string;
    googleMapsApiKey: string;
    isInitializing: boolean;
    isUpdating: boolean;
    shouldShowOrderComments: boolean;
    billingAddress?: Address;
    methodId?: string;
    isFloatingLabelEnabled?: boolean;
    themeV2?: boolean;
    getFields(countryCode?: string): FormField[];
    initialize(): Promise<CheckoutSelectors>;
    updateAddress(address: Partial<Address>): Promise<CheckoutSelectors>;
    updateCheckout(payload: CheckoutRequestBody): Promise<CheckoutSelectors>;
}

class Billing extends Component<BillingProps & WithCheckoutBillingProps> {
    async componentDidMount(): Promise<void> {
        const { initialize, onReady = noop, onUnhandledError } = this.props;

        try {
            await initialize();
            onReady();
        } catch (error) {
            if (error instanceof Error) {
                onUnhandledError(error);
            }
        }
    }

    render(): ReactNode {
<<<<<<< HEAD
        const {
            updateAddress,
            isInitializing,
            shipDate,
            arrivalDate,
            giftMessage,
            ...props
        } = this.props;
=======
        const { updateAddress, isInitializing, themeV2, ...props } = this.props;
>>>>>>> staging

        return (
            <AddressFormSkeleton isLoading={isInitializing}>
                <div className="checkout-form">
                    <div className="form-legend-container">
                        <Legend testId="billing-address-heading" themeV2={themeV2}>
                            <TranslatedString id="billing.billing_address_heading" />
                        </Legend>
                    </div>
                    <BillingForm
                        {...props}
                        onSubmit={this.handleSubmit}
                        updateAddress={updateAddress}
                    />
                </div>
            </AddressFormSkeleton>
        );
    }

    private handleSubmit: (values: BillingFormValues) => void = async ({
        orderComment,
        ...addressValues
    }) => {
        const {
            updateAddress,
            updateCheckout,
            customerMessage,
            billingAddress,
            navigateNextStep,
            onUnhandledError,
            shipDate,
            arrivalDate,
            giftMessage
        } = this.props;

        // CHECKOUT CUSTOM FIELDS
        // Update Ship Date, Arrival Date, Gift Message, Gift Order custom fields when billing step is completed.

        if (addressValues) {
            const shipDateValue = shipDate.toLocaleDateString('en-US')
            const arrivalDateValue = arrivalDate.toLocaleDateString('en-US')
            const giftMessageValue = giftMessage.toString()
            addressValues.customFields.field_30 = shipDateValue
            addressValues.customFields.field_38 = arrivalDateValue
            addressValues.customFields.field_32 = giftMessageValue
        }

        const promises: Array<Promise<CheckoutSelectors>> = [];
        const address = mapAddressFromFormValues(addressValues);

        if (address && !isEqualAddress(address, billingAddress)) {
            promises.push(updateAddress(address));
        }

        if (customerMessage !== orderComment) {
            promises.push(updateCheckout({ customerMessage: orderComment }));
        }

        try {
            await Promise.all(promises);

            navigateNextStep();
        } catch (error) {
            if (error instanceof Error) {
                onUnhandledError(error);
            }
        }
    };
}

function mapToBillingProps({
    checkoutService,
    checkoutState,
}: CheckoutContextProps): WithCheckoutBillingProps | null {
    const {
        data: {
            getCheckout,
            getConfig,
            getCart,
            getCustomer,
            getBillingAddress,
            getBillingAddressFields,
            getBillingCountries,
        },
        statuses: { isLoadingBillingCountries, isUpdatingBillingAddress, isUpdatingCheckout },
    } = checkoutState;

    const config = getConfig();
    const customer = getCustomer();
    const checkout = getCheckout();
    const cart = getCart();

    if (!config || !customer || !checkout || !cart) {
        return null;
    }

    const { enableOrderComments, googleMapsApiKey } = config.checkoutSettings;

    const countriesWithAutocomplete = ['US', 'CA', 'AU', 'NZ', 'GB'];

    return {
        billingAddress: getBillingAddress(),
        countries: getBillingCountries() || EMPTY_ARRAY,
        countriesWithAutocomplete,
        customer,
        customerMessage: checkout.customerMessage,
        getFields: getBillingAddressFields,
        googleMapsApiKey,
        initialize: checkoutService.loadBillingAddressFields,
        isInitializing: isLoadingBillingCountries(),
        isUpdating: isUpdatingBillingAddress() || isUpdatingCheckout(),
        methodId: getBillingMethodId(checkout),
        shouldShowOrderComments: enableOrderComments && getShippableItemsCount(cart) < 1,
        updateAddress: checkoutService.updateBillingAddress,
        updateCheckout: checkoutService.updateCheckout,
        isFloatingLabelEnabled: isFloatingLabelEnabled(config.checkoutSettings),
        themeV2: isExperimentEnabled(config.checkoutSettings, 'CHECKOUT-7962.update_font_style_on_checkout_page')
    };
}

export default withCheckout(mapToBillingProps)(Billing);

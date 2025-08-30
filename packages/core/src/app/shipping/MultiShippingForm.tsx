import classNames from 'classnames';
import React, {type FunctionComponent, type ReactNode, useMemo, useState} from 'react';

import { TranslatedString, withLanguage, type WithLanguageProps } from '@bigcommerce/checkout/locale';
import { useCheckout } from '@bigcommerce/checkout/payment-integration-api';
import { Alert, AlertType, useThemeContext } from '@bigcommerce/checkout/ui';

import { withFormikExtended } from '../common/form';
import { EMPTY_ARRAY } from '../common/utility';
import { Button, ButtonVariant } from '../ui/button';

import ConsignmentListItem from './ConsignmentListItem';
import hasSelectedShippingOptions from './hasSelectedShippingOptions';
<<<<<<< HEAD
import hasUnassignedLineItems from './hasUnassignedLineItems';
import ItemAddressSelect from './ItemAddressSelect';
import ShippableItem from './ShippableItem';
import ShippingFormFooter from './ShippingFormFooter';
import updateShippableItems from './updateShippableItems';

export interface MultiShippingFormProps {
    addresses: CustomerAddress[];
    cart: Cart;
    cartHasChanged: boolean;
    consignments: Consignment[];
    customerMessage: string;
    isGuest: boolean;
    isLoading: boolean;
    shouldShowOrderComments: boolean;
    defaultCountryCode?: string;
    countries?: Country[];
    countriesWithAutocomplete: string[];
    googleMapsApiKey?: string;
    shouldShowAddAddressInCheckout: boolean;
    isFloatingLabelEnabled?: boolean;
    assignItem(consignment: ConsignmentAssignmentRequestBody): Promise<CheckoutSelectors>;
    onCreateAccount(): void;
    createCustomerAddress(address: AddressRequestBody): void;
    onSignIn(): void;
    getFields(countryCode?: string): FormField[];
    onSubmit(values: MultiShippingFormValues): void;
    onUnhandledError(error: Error): void;
    onUseNewAddress(address: Address, itemId: string): void;
    shipDate: Date;
    setShipDate: Function;
    arrivalDate: Date;
    setArrivalDate: Function;
    giftMessages: Array<any>;
    setGiftMessages: Function;
    loadGiftMessages: Function;
}

interface ShippableItemId {
    key: string;
    itemId: string;
}

export interface MultiShippingFormState {
    items: ShippableItem[];
    itemAddingAddress?: ShippableItemId;
    createCustomerAddressError?: Error;
}

class MultiShippingForm extends PureComponent<
    MultiShippingFormProps & WithLanguageProps & FormikProps<MultiShippingFormValues>,
    MultiShippingFormState
> {
    static getDerivedStateFromProps(
        { cart, consignments }: MultiShippingFormProps,
        state: MultiShippingFormState,
    ) {
        if (!state || !state.items || getShippableItemsCount(cart) !== state.items.length) {
            return { items: getShippableLineItems(cart, consignments) };
        }

        return null;
    }

    state: MultiShippingFormState = { items: [] };

    render(): ReactNode {
        const {
            addresses,
            consignments,
            cart,
            isGuest,
            onSignIn,
            onCreateAccount,
            cartHasChanged,
            shouldShowOrderComments,
            isLoading,
            getFields,
            defaultCountryCode,
            countries,
            countriesWithAutocomplete,
            googleMapsApiKey,
            shipDate,
            setShipDate,
            arrivalDate,
            setArrivalDate,
            giftMessages,
            setGiftMessages,
            isFloatingLabelEnabled,
        } = this.props;

        const { items, itemAddingAddress, createCustomerAddressError } = this.state;

        const giftMessage = ''

        const setGiftMessage = (giftMessage: String) => {
            console.log('Multiship - Gift Message Set =>', giftMessage)
        }

        if (isGuest) {
            return (
                <div className="checkout-step-info">
                    <TranslatedString id="shipping.multishipping_guest_intro" />{' '}
                    <a
                        data-test="shipping-sign-in-link"
                        href="#"
                        onClick={preventDefault(onSignIn)}
                    >
                        <TranslatedString id="shipping.multishipping_guest_sign_in" />
                    </a>{' '}
                    <TranslatedLink
                        id="shipping.multishipping_guest_create"
                        onClick={onCreateAccount}
                    />
                </div>
            );
        }

        return (
            <>
                <ErrorModal
                    error={createCustomerAddressError}
                    message={
                        <>
                            <TranslatedString id="address.consignment_address_updated_text" />{' '}
                            <TranslatedString id="customer.create_address_error" />
                        </>
                    }
                    onClose={this.handleCloseErrorModal}
                    shouldShowErrorCode={false}
                />
                <AddressFormModal
                    countries={countries}
                    countriesWithAutocomplete={countriesWithAutocomplete}
                    defaultCountryCode={defaultCountryCode}
                    getFields={getFields}
                    googleMapsApiKey={googleMapsApiKey}
                    isLoading={isLoading}
                    isOpen={!!itemAddingAddress}
                    onRequestClose={this.handleCloseAddAddressForm}
                    onSaveAddress={this.handleSaveAddress}
                    isFloatingLabelEnabled={isFloatingLabelEnabled}
                />

                <Form>
                    <ul className="consignmentList">
                        {items.map((item) => (
                            <li key={item.key}>
                                <ItemAddressSelect
                                    addresses={addresses}
                                    item={item}
                                    onSelectAddress={this.handleSelectAddress}
                                    onUseNewAddress={this.handleUseNewAddress}
                                />
                            </li>
                        ))}
                    </ul>

                    <ShippingFormFooter
                        cart={ cart }
                        cartHasChanged={cartHasChanged}
                        isLoading={isLoading}
                        isMultiShippingMode={true}
                        shouldDisableSubmit={this.shouldDisableSubmit()}
                        shouldShowOrderComments={shouldShowOrderComments}
                        shouldShowShippingOptions={
                            !hasUnassignedLineItems(consignments, cart.lineItems)
                        }
                        consignments={ consignments }
                        shipDate={ shipDate }
                        setShipDate={ setShipDate }
                        arrivalDate={ arrivalDate }
                        setArrivalDate={ setArrivalDate }
                        giftMessage={ giftMessage }
                        setGiftMessage={ setGiftMessage }
                        giftMessages={ giftMessages }
                        setGiftMessages={ setGiftMessages }
                    />
                </Form>
            </>
        );
    }

    private handleCloseErrorModal: () => void = () => {
        this.setState({ createCustomerAddressError: undefined });
    };

    private handleSaveAddress: (address: AddressFormValues) => void = async (address) => {
        const { createCustomerAddress } = this.props;
        const { itemAddingAddress } = this.state;

        if (!itemAddingAddress) {
            return;
        }

        const shippingAddress = mapAddressFromFormValues(address);

        await this.handleSelectAddress(
            shippingAddress,
            itemAddingAddress.itemId,
            itemAddingAddress.key,
        );

        try {
            await createCustomerAddress(shippingAddress);
        } catch (error) {
            if (error instanceof Error) {
                this.setState({ createCustomerAddressError: error });
            }
        }

        this.setState({
            itemAddingAddress: undefined,
        });
    };

    private handleUseNewAddress: (address: Address, itemId: string, itemKey: string) => void = (
        address,
        itemId,
        itemKey,
    ) => {
        const { onUseNewAddress, shouldShowAddAddressInCheckout, loadGiftMessages } = this.props;

        if (!shouldShowAddAddressInCheckout) {
            onUseNewAddress(address, itemId);
            loadGiftMessages()
            return;
        }

        this.setState({
            itemAddingAddress: {
                key: itemKey,
                itemId,
            },
        });
    };

    private handleCloseAddAddressForm: () => void = () => {
        this.setState({
            itemAddingAddress: undefined,
        });
    };

    private handleSelectAddress: (
        address: Address,
        itemId: string,
        itemKey: string,
    ) => Promise<void> = async (address, itemId, itemKey) => {
        const { assignItem, onUnhandledError, getFields, loadGiftMessages } = this.props;

        if (!isValidAddress(address, getFields(address.countryCode))) {
            return onUnhandledError(new AssignItemInvalidAddressError());
        }

        try {
            const { data } = await assignItem({
                address,
                lineItems: [
                    {
                        itemId,
                        quantity: 1,
                    },
                ],
            });

            this.syncItems(itemKey, address, data);
            loadGiftMessages()
        } catch (error) {
            if (error instanceof Error) {
                onUnhandledError(new AssignItemFailedError(error));
            }
        }
    };

    private shouldDisableSubmit: () => boolean = () => {
        const { isLoading, consignments } = this.props;

        return isLoading || !hasSelectedShippingOptions(consignments);
    };

    private syncItems: (key: string, address: Address, data: CheckoutStoreSelector) => void = (
        key,
        address,
        data,
    ) => {
        const { items: currentItems } = this.state;
        const items = updateShippableItems(
            currentItems,
            {
                updatedItemIndex: currentItems.findIndex((item) => item.key === key),
                address,
            },
            {
                cart: data.getCart(),
                consignments: data.getConsignments(),
            },
        );

        if (items) {
            this.setState({ items });
        }
    };
}
=======
import { useMultiShippingConsignmentItems } from './hooks/useMultishippingConsignmentItems';
import isSelectedShippingOptionValid from './isSelectedShippingOptionValid';
import MultiShippingFormFooter from './MultiShippingFormFooter';
import { type MultiShippingConsignmentData } from './MultishippingType';
import './MultiShippingForm.scss';
import NewConsignment from './NewConsignment';
>>>>>>> staging

export interface MultiShippingFormValues {
    orderComment: string;
}

export interface MultiShippingFormProps {
    cartHasChanged: boolean;
    customerMessage: string;
    defaultCountryCode?: string;
    countriesWithAutocomplete: string[];
    isLoading: boolean;
    onUnhandledError(error: Error): void;
    onSubmit(values: MultiShippingFormValues): void;
}

const MultiShippingForm: FunctionComponent<MultiShippingFormProps> = ({
    countriesWithAutocomplete,
    defaultCountryCode,
    isLoading,
    onUnhandledError,
    cartHasChanged,
}: MultiShippingFormProps) => {
    const [errorConsignmentNumber, setErrorConsignmentNumber] = useState<number | undefined>();

    const { themeV2 } = useThemeContext();
    const {
        checkoutState: {
            data: { getConsignments, getConfig },
        },
    } = useCheckout();
    const { unassignedItems: { lineItems: unassignedLineItems, shippableItemsCount }, consignmentList } = useMultiShippingConsignmentItems();

    const consignments = getConsignments() || EMPTY_ARRAY;
    const config = getConfig();

    const [isAddShippingDestination, setIsAddShippingDestination] = useState(
        consignments.length === 0,
    );

    const isEveryConsignmentHasShippingOption = hasSelectedShippingOptions(consignments);
    const shouldDisableSubmit = useMemo(() => {
        return isLoading || !!unassignedLineItems.length || !isEveryConsignmentHasShippingOption || !isSelectedShippingOptionValid(consignments);
    }, [isLoading, consignments]);

    if (!config) {
        return null;
    }

    const {
        checkoutSettings: {
            enableOrderComments: shouldShowOrderComments,
            shippingQuoteFailedMessage,
        },
    } = config;

    const handleAddShippingDestination = () => {
        if (!isAddShippingDestination && !isEveryConsignmentHasShippingOption) {
            const errorConsignmentIndex = consignments.findIndex(
                (consignment) => !consignment.selectedShippingOption,
            );

            if (errorConsignmentIndex === -1) {
                setIsAddShippingDestination(true);

                return;
            }

            setErrorConsignmentNumber(errorConsignmentIndex + 1);
        } else if (isAddShippingDestination) {
            setErrorConsignmentNumber(consignments.length + 1);
        } else {
            setErrorConsignmentNumber(undefined);
            setIsAddShippingDestination(true);
        }
    };

    const hasUnassignedItems = shippableItemsCount > 0;

    const renderAllocatedBanner = (shippableItemsCount: number): ReactNode => {
        if (shippableItemsCount > 0) {
            return <Alert additionalClassName={themeV2 ? 'body-regular' : ''} type={AlertType.Info}>
                <TranslatedString data={{ count: shippableItemsCount }} id="shipping.multishipping_item_to_allocate_message" />
            </Alert>;
        }

        return <Alert additionalClassName={themeV2 ? 'body-regular' : ''} type={AlertType.Success}>
            <TranslatedString id="shipping.multishipping_all_items_allocated_message" />
        </Alert>;
    }
    const resetErrorConsignmentNumber = () => {
        setErrorConsignmentNumber(undefined);
    };

    return (
        <>
            {renderAllocatedBanner(shippableItemsCount)}
            {consignmentList.map((consignment: MultiShippingConsignmentData) => (
                <ConsignmentListItem
                    consignment={consignment}
                    consignmentNumber={consignment.consignmentNumber}
                    countriesWithAutocomplete={countriesWithAutocomplete}
                    defaultCountryCode={defaultCountryCode}
                    isLoading={isLoading}
                    key={consignment.id}
                    onUnhandledError={onUnhandledError}
                    resetErrorConsignmentNumber={resetErrorConsignmentNumber}
                    shippingQuoteFailedMessage={shippingQuoteFailedMessage}
                />
            ))}
            {isAddShippingDestination && (
                <NewConsignment
                    consignmentNumber={consignments.length === 0 ? 1 : (consignments.length + 1)}
                    countriesWithAutocomplete={countriesWithAutocomplete}
                    defaultCountryCode={defaultCountryCode}
                    isLoading={isLoading}
                    onUnhandledError={onUnhandledError}
                    resetErrorConsignmentNumber={resetErrorConsignmentNumber}
                    setIsAddShippingDestination={setIsAddShippingDestination}
                />)
            }
            {hasUnassignedItems &&
                <Button
                    className={classNames({ 'body-regular': themeV2 }, 'add-consignment-button')}
                    onClick={handleAddShippingDestination}
                    variant={ButtonVariant.Secondary}
                >
                    <TranslatedString id="shipping.multishipping_add_new_destination" />
                </Button>
            }
            {Boolean(errorConsignmentNumber) && (
                <div className="form-field--error">
                    <span className="form-inlineMessage">
                        <TranslatedString
                            data={{ consignmentNumber: errorConsignmentNumber }}
                            id="shipping.multishipping_incomplete_consignment_error"
                        />
                    </span>
                </div>
            )}
            <MultiShippingFormFooter
                cartHasChanged={cartHasChanged}
                isLoading={isLoading}
                shouldDisableSubmit={shouldDisableSubmit}
                shouldShowOrderComments={shouldShowOrderComments}
            />
        </>
    );
}

export default withLanguage(
    withFormikExtended<MultiShippingFormProps & WithLanguageProps, MultiShippingFormValues>({
        handleSubmit: (values, { props: { onSubmit } }) => {
            onSubmit(values);
        },
        mapPropsToValues: ({ customerMessage }) => ({
            orderComment: customerMessage,
        }),
        enableReinitialize: true,
    })(MultiShippingForm),
);

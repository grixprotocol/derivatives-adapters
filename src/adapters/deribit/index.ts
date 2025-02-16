import { ProtocolAdapter } from "../../types/adapter";
import { fetchExpiries } from "./fetchExpiryDates";
import { getLongOptionPremium } from "./getLongOptionPremium";
import { getShortOptionPremium } from "./getShortOptionPremium";
import { getBoard } from "./helpers/getOptionsBoard";

/**
 * @title Protocol Adapter Implementation Guide
 * 
 * This file serves as a template for implementing new protocol adapters.
 * Each adapter must implement the ProtocolAdapter interface and provide
 * test parameters for validation.
 * 
 * Required Methods:
 * - fetchExpiryDates: Fetches available expiry dates for options
 * - getLongOptionPremium: Gets premium for buying an option
 * - getShortOptionPremium: Gets premium for selling an option
 */

/**
 * Test parameters required for adapter validation
 * Each adapter must provide working test parameters that:
 * 1. Use real instrument names/assets from the protocol
 * 2. Return valid responses from the protocol's API
 * 3. Include all required fields for each method
 */
const testParams = {
    /** Parameters for testing fetchExpiryDates */
    fetchExpiryDates: {
        asset: 'BTC', // Required: Base asset symbol
    },
    
    /** Parameters for testing getLongOptionPremium */
    getLongOptionPremium: {
        instrument_name: 'BTC-17FEB25-97000-P', // Required: Valid instrument identifier
    },
    
    /** Parameters for testing getShortOptionPremium */
    getShortOptionPremium: {
        instrument_name: 'BTC-17FEB25-97000-P', // Required: Valid instrument identifier
    },
} as const;

/**
 * Protocol Adapter Implementation
 * 
 * @implements {ProtocolAdapter}
 * 
 * Required exports:
 * 1. Must be the default export
 * 2. Must implement all ProtocolAdapter methods
 * 3. Must include testParams
 */
export const deribitAdapter: ProtocolAdapter = {
    fetchExpiryDates: fetchExpiries,
    getLongOptionPremium: getLongOptionPremium,
    getShortOptionPremium: getShortOptionPremium,
    testParams,
};


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utility = void 0;
class Utility {
    /**
     * Generates a random alphanumeric ID
     */
    static generateId() {
        return Math.random().toString(36).substring(2, 9);
    }
    /**
     * Formats the current date as an ISO string
     */
    static getCurrentTimestamp() {
        return new Date().toISOString();
    }
    /**
     * Generates a random 4-digit OTP
     */
    static generateOtp() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }
    /**
     * Generalised standard API response builder
     */
    static buildResponse(success, message, data = null) {
        return {
            success,
            message,
            data,
            timestamp: this.getCurrentTimestamp()
        };
    }
}
exports.Utility = Utility;

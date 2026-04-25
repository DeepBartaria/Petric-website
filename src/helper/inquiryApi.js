import { post } from "./api";

const headers = {
    "Content-Type": "application/json",
}

export const createInquiry = async (data) => {
    try {
        const response = await post("enquiry/web-enquiry/add", data);
        return response;
    } catch (error) {
        console.error("Error creating inquiry:", error);
        return { error: error.response.data };
    }
}

export const createRegistrationInquiry = async (data) => {
    try {
        const response = await post("enquiry/register-as-partner/add", data);
        return response;
    } catch (error) {
        console.error("Error creating registration inquiry:", error);
        return { error: error.response.data };
    }
}
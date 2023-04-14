import React from "react";
import axios, { AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
// const token = localStorage.getItem( "jwt");
export const getAPI = async (api_url: string, token?: string): Promise<any> => {
  try {
    const headers: AxiosRequestConfig["headers"] = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.get(api_url, { headers });
    return response.data;
  } catch (error) {
    console.log("Error from GET API");
    throw error;
  }
};

export const postAPI = async (
  api_url: string,
  api_data: any,
  token?: string
): Promise<any> => {
  try {
    const headers: AxiosRequestConfig["headers"] = {
      Authorization: token ? `Bearer ${token}` : "",
    };
    const response = await axios.post(api_url, api_data, { headers });
    return response.data;
  } catch (error) {
    console.log("Error from POST API");
    throw error;
  }
};

export const base_url = "http://127.0.0.1:8000/";

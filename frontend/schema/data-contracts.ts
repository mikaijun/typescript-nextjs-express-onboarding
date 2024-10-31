/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface DefaultSelectionPrisma36UserPayload {
  password: string;
  email: string;
  /** @format double */
  id: number;
  name: string;
}

/** Model User */
export type User = DefaultSelectionPrisma36UserPayload;

export interface ValidateErrorJSON {
  message: "Validation failed";
  details: Record<string, any>;
}

/** From T, pick a set of properties whose keys are in the union K */
export interface PickUserEmailOrNameOrPassword {
  name: string;
  email: string;
  password: string;
}

export type UserCreationParams = PickUserEmailOrNameOrPassword;

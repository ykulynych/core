/**
 * This module is a stub for core services such as Dependency Injection or Browser Location.
 * Core services may be implemented by a specific framework, such as ng1 or ng2, or be pure javascript.
 *
 * @module common
 */
/** for typedoc */
import {IInjectable, Obj} from "./common";

let notImplemented = (fnname: string) => () => {
  throw new Error(`${fnname}(): No coreservices implementation for UI-Router is loaded.`);
};

let services: CoreServices = {
  $q: undefined,
  $injector: undefined,
  location: <any> {},
  locationConfig: <any> {},
  template: <any> {}
};

["setUrl", "path", "search", "hash", "onChange"]
    .forEach(key => services.location[key] = notImplemented(key));

["port", "protocol", "host", "baseHref", "html5Mode", "hashPrefix" ]
    .forEach(key => services.locationConfig[key] = notImplemented(key));

export interface $QLikeDeferred {
  resolve: (val?: any) => void;
  reject: (reason?: any) => void;
  promise: Promise<any>;
}

export interface $QLike {
  when<T>(val?: T): Promise<T>;
  reject<T>(reason: any): Promise<T>;
  defer(): $QLikeDeferred;
  all(promises: { [key: string]: Promise<any> }): Promise<any>;
  all(promises: Promise<any>[]): Promise<any[]>;
}

export interface $InjectorLike {
  get(token: any): any;
  get<T>(token: any): T;
  has(token: any): boolean;
  invoke(fn: IInjectable, context?: any, locals?: Obj): any;
  annotate(fn: IInjectable, strictDi?: boolean): any[];
  strictDi?: boolean;
}

export interface CoreServices {
  $q: $QLike;
  $injector: $InjectorLike;
  /** Services related to getting or setting the browser location (url) */
  location: LocationServices;
  /** Retrieves configuration for how to construct a URL. */
  locationConfig: LocationConfig;
  template: TemplateServices;
}

export interface LocationServices {
  setUrl(newurl: string, replace?: boolean): void;
  path(): string;
  search(): { [key: string]: any };
  hash(): string;
  onChange(callback: Function): Function;
  html5Mode(): boolean;
  hashPrefix(): string;
  hashPrefix(newprefix: string): string;
}

export interface LocationConfig {
  port(): number;
  protocol(): string;
  host(): string;

  baseHref(): string;
}

export interface TemplateServices {
  get(url: string): Promise<string>;
}


export {services};

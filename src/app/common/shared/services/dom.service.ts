import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DOMService {
  private document: Document = Object.create(null);
  private renderer: Renderer2;
  private navigator: any;
  private window: Window;

  private windowScrollTop: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(
    private rendererFactory: RendererFactory2,
    private eventManager: EventManager,
    @Inject(DOCUMENT) private docToken: Document
  ) {
    this.document = this.docToken;
    this.navigator = window.navigator;
    this.window = window;

    this.listen('window', 'DOMContentLoaded', (event: Event) => {
      this.document = event.target as Document;
      this.window = event.currentTarget as Window;
    });

    this.listen('window', 'scroll', (event: Event) => {
      this.windowScrollTop.next((event.target as Document)?.scrollingElement?.scrollTop || 0);
    });

    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public get activeElement() {
    return this.document.activeElement;
  }

  public get documentElement() {
    return this.document.documentElement;
  }

  public get windowNavigator() {
    return this.navigator;
  }

  public get windowScrollTop$(): Observable<number> {
    return this.windowScrollTop.asObservable();
  }

  public addClass(element: Element, name: string) {
    this.renderer.addClass(element, name);
  }

  public removeClass(element: Element, name: string) {
    this.renderer.removeClass(element, name);
  }

  public hasClass(element: Element, name: string) {
    return element.classList.contains(name);
  }

  public createElement(type: string) {
    return this.document.createElement(type);
  }

  public getElement(selector: string): HTMLElement {
    return this.document.querySelector(selector);
  }

  public getElements(selector: string): NodeListOf<Element> {
    return this.document.querySelectorAll(selector);
  }

  public removeElement(element: Element): void {
    if (element.remove) {
      element.remove();
    } else {
      element.parentNode.removeChild(element);
    }
  }

  public listen(target: string, event: string, callback: any) {
    return this.eventManager.addGlobalEventListener(target, event, callback);
  }

  public scrollIntoErrorView() {
    const errorControl: HTMLElement = this.getElement('kv-error-handler-container');

    this.scrollElementIntoView(errorControl, { behavior: 'smooth', block: 'center' });
  }

  public scrollIntoFirstInvalidControl() {
    const firstInvalidControl: HTMLElement =
      this.getElement('form .kv-form__input.ng-invalid') || this.getElement('form .form-control__label--error');
    this.scrollElementIntoView(firstInvalidControl, { behavior: 'smooth', block: 'center' });
  }

  public scrollElementIntoView(element: HTMLElement, params: boolean | {} = true) {
    if (!element) {
      return;
    }

    element.scrollIntoView(params);
  }

  public scrollByVertically(value: number) {
    if (this.window) {
      this.window.scrollBy(0, value);
    }
  }

  public scrollTo(options) {
    if (this.window) {
      this.window.scrollTo(options);
    }
  }

  public scrollElementToLeft(selector: string) {
    const element = this.getElement(selector);
    if (!element) {
      return;
    }

    element.scrollTo({ top: element.scrollTop, left: 0 });
  }

  public getScrollYBySelector(selector: string): number {
    const element = this.getElement(selector);

    return element ? element.scrollLeft : 0;
  }

  public getInnerWidth(): number {
    return this.window && this.window.innerWidth;
  }

  public getElementComputedStyle(selector: string) {
    return this.window.getComputedStyle(this.getElement(selector));
  }

  public findClosestParent(element: HTMLElement, parentSelector: string) {
    return element.closest(parentSelector);
  }

  public setCookie(name: string, value: string, sessionCookie: boolean = false): void {
    const now = new Date();
    const expireDate = sessionCookie ? 0 : new Date(now.setFullYear(now.getFullYear() + 1));
    this.document.cookie = `${name}=${value}; expires=${expireDate}; path=/`;
  }

  public getCookie(cname: string) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  public addTag(type: string, params: object, element: HTMLElement | string, mode = '') {
    const target: HTMLElement = typeof element === 'string' ? this.getElement(element) : element;
    const tag = this.document.createElement(type);
    Object.keys(params).map((param) => {
      tag[param] = params[param];
    });
    if (mode === 'insertAfter' && target.parentNode) {
      target.parentNode.insertBefore(tag, target.nextSibling);
    } else if (mode === 'insertBefore' && target) {
      target.insertBefore(tag, target.firstChild);
    } else {
      target.appendChild(tag);
    }
  }

  public addScript(
    src: string,
    onload = () => {},
    element: HTMLElement = this.document.body,
    async: boolean = !1,
    defer: boolean = !1
  ) {
    const params = {
      type: 'text/javascript',
      src,
      onload,
      async,
      defer,
    };
    this.addTag('script', params, element);
  }
}

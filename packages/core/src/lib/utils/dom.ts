import { isObject, isString } from "./assertion.js";

const ELEMENT_NODE: typeof Node.ELEMENT_NODE = 1;
const DOCUMENT_NODE: typeof Node.DOCUMENT_NODE = 9;
const DOCUMENT_FRAGMENT_NODE: typeof Node.DOCUMENT_FRAGMENT_NODE = 11;

export const isDocument = (el: any): el is Document =>
  isObject(el) && el.nodeType === DOCUMENT_NODE;

export const isHTMLElement = (el: any): el is HTMLElement =>
  isObject(el) && el.nodeType === ELEMENT_NODE && isString(el.nodeName);

export const isNode = (el: any): el is Node =>
  isObject(el) && el.nodeType !== undefined;

export const isShadowRoot = (el: any): el is ShadowRoot =>
  isNode(el) && el.nodeType === DOCUMENT_FRAGMENT_NODE && "host" in el;

export const isWindow = (el: any): el is Window =>
  isObject(el) && el === el.window;

export function getDocument(
  el: Element | Window | Node | Document | null | undefined
) {
  if (isDocument(el)) return el;
  if (isWindow(el)) return el.document;
  return el?.ownerDocument ?? document;
}

export function getWindow(el: Node | ShadowRoot | Document | null | undefined) {
  if (isShadowRoot(el)) return getWindow(el.host);
  if (isDocument(el)) return el.defaultView ?? window;
  if (isHTMLElement(el)) return el.ownerDocument?.defaultView ?? window;
  return window;
}

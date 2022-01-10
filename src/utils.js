export const getClientURI = () => {
  // TODO: fix this
  return 'https://app-beta.suredone.com/public/fitment/graphql' // Suredone API
}

/**
 * @param {String} selector '#root'
 * @param {String} attribute 'data-storefront'
 */
export const getDOMdata = (selector, attribute) => {
  return document.querySelector(selector).getAttribute(attribute)
}

export const getCurrentShop = () => getDOMdata('#root', 'data-storefront')
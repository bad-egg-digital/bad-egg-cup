/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.scss"
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/api-fetch"
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["apiFetch"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/dom-ready"
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["domReady"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "@wordpress/notices"
/*!*********************************!*\
  !*** external ["wp","notices"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["notices"];

/***/ },

/***/ "./src/json/defaults-address.json"
/*!****************************************!*\
  !*** ./src/json/defaults-address.json ***!
  \****************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"line1":"","line2":"","line3":"","line4":"","city":"","county":"","postCode":"","country":""}');

/***/ },

/***/ "./src/json/defaults-colours.json"
/*!****************************************!*\
  !*** ./src/json/defaults-colours.json ***!
  \****************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"primary":"#395786","secondary":"#a094b1","tertiary":"","quaternary":"","quinary":"","senary":"","septenary":"","octonary":"","nonary":"","denary":"","undenary":"","duodenary":""}');

/***/ },

/***/ "./src/json/defaults-company-info.json"
/*!*********************************************!*\
  !*** ./src/json/defaults-company-info.json ***!
  \*********************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"name":"","nameLegal":"","number":"","tel":"","email":"","address":{},"addressMailing":{}}');

/***/ },

/***/ "./src/json/defaults-supports.json"
/*!*****************************************!*\
  !*** ./src/json/defaults-supports.json ***!
  \*****************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"defaultPost":false,"postRewrite":false,"postCategory":false,"postTag":false,"comments":false,"company":false,"companyAddress":false,"companyAddressMailing":false}');

/***/ },

/***/ "./src/json/latinate.json"
/*!********************************!*\
  !*** ./src/json/latinate.json ***!
  \********************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"1":"primary","2":"secondary","3":"tertiary","4":"quaternary","5":"quinary","6":"senary","7":"septenary","8":"octonary","9":"nonary","10":"denary","11":"undenary","12":"duodenary"}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/notices */ "@wordpress/notices");
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_notices__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _json_latinate_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./json/latinate.json */ "./src/json/latinate.json");
/* harmony import */ var _json_defaults_colours_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./json/defaults-colours.json */ "./src/json/defaults-colours.json");
/* harmony import */ var _json_defaults_address_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./json/defaults-address.json */ "./src/json/defaults-address.json");
/* harmony import */ var _json_defaults_company_info_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./json/defaults-company-info.json */ "./src/json/defaults-company-info.json");
/* harmony import */ var _json_defaults_supports_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./json/defaults-supports.json */ "./src/json/defaults-supports.json");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__);














_json_defaults_company_info_json__WEBPACK_IMPORTED_MODULE_9__.address = _json_defaults_address_json__WEBPACK_IMPORTED_MODULE_8__;
_json_defaults_company_info_json__WEBPACK_IMPORTED_MODULE_9__.addressMailing = _json_defaults_address_json__WEBPACK_IMPORTED_MODULE_8__;
const Notices = () => {
  const {
    removeNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)(_wordpress_notices__WEBPACK_IMPORTED_MODULE_5__.store);
  const notices = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select(_wordpress_notices__WEBPACK_IMPORTED_MODULE_5__.store).getNotices());
  if (notices.length === 0) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.NoticeList, {
    notices: notices,
    onRemove: removeNotice
  });
};
const OptionsPage = () => {
  const [loadState, setLoadState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_11__.useState)(false);
  const [colours, setColours] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_11__.useState)(_json_defaults_colours_json__WEBPACK_IMPORTED_MODULE_7__);
  const [company, setCompany] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_11__.useState)(_json_defaults_company_info_json__WEBPACK_IMPORTED_MODULE_9__);
  const [supports, setSupports] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_11__.useState)(_json_defaults_supports_json__WEBPACK_IMPORTED_MODULE_10__);
  const {
    createSuccessNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)(_wordpress_notices__WEBPACK_IMPORTED_MODULE_5__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_11__.useEffect)(() => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
      path: '/wp/v2/settings'
    }).then(settings => {
      setLoadState(true);
      if (settings?.badeggcup?.colours) {
        setColours(settings.badeggcup.colours);
      }
      if (settings?.badeggcup?.company) {
        setCompany(settings.badeggcup.company);
      }
      if (settings?.badeggcup?.supports) {
        setSupports(settings.badeggcup.supports);
      }
    });
  }, []);
  const SaveButton = () => {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.Button, {
      variant: "primary",
      onClick: saveSettings,
      __next40pxDefaultSize: true,
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save', 'badeggcup')
    });
  };
  const saveSettings = () => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
      path: '/wp/v2/settings',
      method: 'POST',
      data: {
        badeggcup: {
          colours,
          company,
          supports
        }
      }
    }).then(() => {
      createSuccessNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Settings saved.', 'badeggcup'));
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.Flex, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.__experimentalHeading, {
        level: 1,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Website Options', 'badeggcup')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(SaveButton, {})]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.__experimentalSpacer, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(Notices, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.__experimentalSpacer, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.Panel, {
      children: !loadState ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.Spinner, {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Brand Colours', 'badeggcup'),
          className: "badeggcup-brand-colours",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.PanelRow, {
            children: Object.keys(colours).map((colour, index) => {
              const hex = colours[colour];
              if (index == 0 || colours[_json_latinate_json__WEBPACK_IMPORTED_MODULE_6__[index + 1]] || index > 0 && colours[_json_latinate_json__WEBPACK_IMPORTED_MODULE_6__[index]]) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                  className: "badeggcup-brand-colours-item",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("h3", {
                    children: colour
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.ColorPalette, {
                    value: hex,
                    clearable: index > 0 ? true : false,
                    onChange: value => {
                      setColours(prev => ({
                        ...prev,
                        [colour]: value
                      }));
                    },
                    headingLevel: 3
                  })]
                }, index);
              }
            })
          })
        }), supports.company ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Company Info', 'badeggcup'),
          className: "badeggcup-company-info",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.PanelRow, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.Card, {
              className: "badeggcup-company-info-details",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.CardBody, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("h3", {
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Details', 'badeggcup')
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.TextControl, {
                  label: "Company Name",
                  value: company.name,
                  onChange: value => setCompany(prev => ({
                    ...prev,
                    name: value
                  })),
                  __next40pxDefaultSize: true,
                  __nextHasNoMarginBottom: true
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.TextControl, {
                  label: "Legal Name",
                  value: company.nameLegal,
                  onChange: value => setCompany(prev => ({
                    ...prev,
                    nameLegal: value
                  })),
                  __next40pxDefaultSize: true,
                  __nextHasNoMarginBottom: true
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.TextControl, {
                  label: "Company Number",
                  value: company.number,
                  onChange: value => setCompany(prev => ({
                    ...prev,
                    number: value
                  })),
                  __next40pxDefaultSize: true,
                  __nextHasNoMarginBottom: true
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.Card, {
              className: "badeggcup-company-info-contact",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.CardBody, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("h3", {
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Contact', 'badeggcup')
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.TextControl, {
                  label: "Telephone Number",
                  value: company.tel,
                  onChange: value => setCompany(prev => ({
                    ...prev,
                    tel: value
                  })),
                  __next40pxDefaultSize: true,
                  __nextHasNoMarginBottom: true
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.TextControl, {
                  label: "Email Address",
                  value: company.email,
                  onChange: value => setCompany(prev => ({
                    ...prev,
                    email: value
                  })),
                  __next40pxDefaultSize: true,
                  __nextHasNoMarginBottom: true
                })]
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.PanelRow, {
            children: [{
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Address', 'badeggcup'),
              slug: 'address'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Mailing Address', 'badeggcup'),
              slug: 'addressMailing'
            }].map((fieldGroup, index) => {
              let label = fieldGroup.label;
              let slug = fieldGroup.slug;
              let addressSupport = 'company' + [...slug][0].toUpperCase() + [...slug].slice(1).join('');
              if (supports[addressSupport]) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.Card, {
                  className: "badeggcup-company-info-address-group",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.CardBody, {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("h3", {
                      children: label
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.Flex, {
                      gap: "8",
                      wrap: "true",
                      align: "stretch",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.FlexItem, {
                        children: [...Array(4).keys()].map(index => {
                          if (index == 0 || company[slug]['line' + (index + 1)] || index > 0 && company[slug]['line' + index]) {
                            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.TextControl, {
                              label: `Line ${index + 1}`,
                              value: company[slug]['line' + (index + 1)],
                              onChange: value => setCompany(prev => ({
                                ...prev,
                                [slug]: {
                                  ...prev[slug],
                                  ['line' + (index + 1)]: value
                                }
                              })),
                              __next40pxDefaultSize: true,
                              __nextHasNoMarginBottom: true
                            }, index);
                          }
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.__experimentalDivider, {
                        orientation: "vertical"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.FlexItem, {
                        children: ['city', 'county', 'postCode', 'country'].map((field, index) => {
                          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.TextControl, {
                            label: field,
                            value: company[slug][field],
                            onChange: value => setCompany(prev => ({
                              ...prev,
                              [slug]: {
                                ...prev[slug],
                                [field]: value
                              }
                            })),
                            __next40pxDefaultSize: true,
                            __nextHasNoMarginBottom: true
                          }, index);
                        })
                      })]
                    })]
                  })
                }, index);
              }
            })
          })]
        }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Theme Support', 'badeggcup'),
          initialOpen: false,
          className: "badeggcup-theme-supports",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.Flex, {
            align: "flex-start",
            justify: "flex-start",
            gap: "8",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.FlexItem, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.CheckboxControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default Post Type', 'badeggcup'),
                checked: supports.defaultPost,
                onChange: value => {
                  setSupports({
                    ...supports,
                    defaultPost: value
                  });
                  if (!value) {
                    setSupports({
                      ...supports,
                      defaultPost: false,
                      postRewrite: false,
                      postCategory: false,
                      postTag: false
                    });
                  }
                },
                __nextHasNoMarginBottom: true
              }), supports.defaultPost ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.CheckboxControl, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Post Rewrites', 'badeggcup'),
                  checked: supports.postRewrite,
                  onChange: value => setSupports({
                    ...supports,
                    postRewrite: value
                  }),
                  __nextHasNoMarginBottom: true
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.CheckboxControl, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Post Tags', 'badeggcup'),
                  checked: supports.postTag,
                  onChange: value => setSupports({
                    ...supports,
                    postTag: value
                  }),
                  __nextHasNoMarginBottom: true
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.CheckboxControl, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Post Categories', 'badeggcup'),
                  checked: supports.postCategory,
                  onChange: value => setSupports({
                    ...supports,
                    postCategory: value
                  }),
                  __nextHasNoMarginBottom: true
                })]
              }) : null]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.FlexItem, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.CheckboxControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Company Info', 'badeggcup'),
                checked: supports.company,
                onChange: value => {
                  setSupports({
                    ...supports,
                    company: value
                  });
                  if (!value) {
                    setSupports({
                      ...supports,
                      company: false,
                      companyAddress: false,
                      companyAddressMailing: false
                    });
                  }
                },
                __nextHasNoMarginBottom: true
              }), supports.company ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.CheckboxControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Address', 'badeggcup'),
                checked: supports.companyAddress,
                onChange: value => {
                  setSupports({
                    ...supports,
                    companyAddress: value
                  });
                  if (!value) {
                    setSupports({
                      ...supports,
                      companyAddress: false,
                      companyAddressMailing: false
                    });
                  }
                },
                __nextHasNoMarginBottom: true
              }) : null, supports.companyAddress ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.CheckboxControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Mailing Address', 'badeggcup'),
                checked: supports.companyAddressMailing,
                onChange: value => setSupports({
                  ...supports,
                  companyAddressMailing: value
                }),
                __nextHasNoMarginBottom: true
              }) : null]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.FlexItem, {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.CheckboxControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Comments', 'badeggcup'),
                checked: supports.comments,
                onChange: value => setSupports({
                  ...supports,
                  comments: value
                }),
                __nextHasNoMarginBottom: true
              })
            })]
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.__experimentalSpacer, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__.Flex, {
      justify: "flex-end",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(SaveButton, {})
    })]
  });
};
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default()(() => {
  const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_11__.createRoot)(document.getElementById('badeggcup-options'));
  root.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(OptionsPage, {}));
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map
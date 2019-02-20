'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.Address = undefined;var _DataCollector = require('../lib/DataCollector');
var _types = require('../lib/types');
var _config = require('../lib/config');var _config2 = _interopRequireDefault(_config);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
const bridgeAddress = _config2.default.bridgeAddress;
const remascAddress = _config2.default.remascAddress;
class Address extends _DataCollector.DataCollectorItem {
  constructor(collection, key, parent) {
    super(collection, key, parent, { sortDir: 1 });
    const Tx = this.parent.getItem({ key: 'Tx' });
    this.Tx = Tx;
    this.fields = { code: 0, createdByTx: 0 };
    this.publicActions = {

      getAddress: async params => {
        const { address } = params;
        const aData = await this.getOne({ address }, { createdByTx: 1 });
        if (aData.data) {
          if (!aData.data.name) {
            if (address === remascAddress) aData.data.name = _types.REMASC_NAME;
            if (address === bridgeAddress) aData.data.name = _types.BRIDGE_NAME;
          }
        }
        return aData;
      },

      getAddresses: params => {
        let type = params.query ? params.query.type : null;
        let query = type ? { type } : {};
        return this.getPageData(query, params);
      },

      getTokens: params => {
        return this.getPageData({
          type: _types.addrTypes.CONTRACT,
          contractInterfaces: { $in: _types.tokensInterfaces } },
        params);
      } };

  }}exports.Address = Address;exports.default =


Address;
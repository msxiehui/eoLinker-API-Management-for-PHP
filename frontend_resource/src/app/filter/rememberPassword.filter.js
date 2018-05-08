(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [计算当前时间过滤器] [Calculate the current time filter]
     * @version  3.1.7
     */
    angular.module('eolinker.filter')
    .filter('aesEncryptFilter', [function() {
        return function(word) {
            var data={
                fun:{
                    encrypt:null
                }
            }
            /**
             * @function [获取当前时间功能函数] [Get the current time function function]
             * @return   {[string]}   [当前时间 current time]
             */
            data.fun.encrypt = function(word) {
                var key = CryptoJS.enc.Utf8.parse("eolinker");
                var iv  = CryptoJS.enc.Utf8.parse("0102030405060708");
                var srcs = CryptoJS.enc.Utf8.parse(word);
                var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode:CryptoJS.mode.CBC});
                var encryptedStr = encrypted.ciphertext.toString();
                var encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedStr);
                var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
                return encryptedBase64Str;
            }
            return data.fun.encrypt(word);
        }
    }])
    .filter('aesDecryptFilter', [function() {
        return function(word) {
            var data={
                fun:{
                    decrypt:null
                }
            }
            /**
             * @function [获取当前时间功能函数] [Get the current time function function]
             * @return   {[string]}   [当前时间 current time]
             */
            data.fun.decrypt = function(word) {
                var key = CryptoJS.enc.Utf8.parse("eolinker");
                var iv  = CryptoJS.enc.Utf8.parse('0102030405060708');
                var decrypted = CryptoJS.AES.decrypt(word, key, { iv: iv,mode:CryptoJS.mode.CBC});
                return CryptoJS.enc.Utf8.stringify(decrypted).toString();
            }
            return data.fun.decrypt(word);
        }
    }])

})();

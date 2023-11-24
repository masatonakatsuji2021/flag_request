"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const https = require("https");
class FlagRequest {
    static que(url, option) {
        return __awaiter(this, void 0, void 0, function* () {
            let rclass;
            if (url.indexOf("http://") === 0) {
                rclass = http;
            }
            else if (url.indexOf("https://") === 0) {
                rclass = https;
            }
            return new Promise((resolve) => {
                const req = rclass.request(url, (res) => {
                    let data = "";
                    res.on("data", (d) => {
                        data += d;
                    });
                    res.on("end", () => {
                        const result = {
                            status: true,
                            data: data,
                            res: res,
                        };
                        resolve(result);
                    });
                });
                if (option.data) {
                    req.write(option.data);
                }
                req.end();
            });
        });
    }
}
exports.default = FlagRequest;

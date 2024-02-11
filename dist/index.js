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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var node_html_parser_1 = require("node-html-parser");
var interval = 1000;
var sources = ["_a", "_b", "_c", "_d", "_e", "_f", "_g", "_h", "_i", "_j", "_k", "_l", "_m", "_n", "_o", "_p", "_q", "_r", "_s", "_t", "_u", "_v", "_w", "_x", "_y", "_z", "xa", "xi", "xu", "xe", "xo", "ka", "ki", "ku", "ke", "ko", "sa", "si", "su", "se", "so", "ta", "ti", "tu", "te", "to", "na", "ni", "nu", "ne", "no", "ha", "hi", "hu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ra", "ri", "ru", "re", "ro", "ya", "yu", "yo", "wa", "_other",
];
var errors = [];
main(undefined);
function main(spec) {
    return __awaiter(this, void 0, void 0, function () {
        var terms, i, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    terms = [];
                    if (!(spec == undefined)) return [3 /*break*/, 6];
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < sources.length)) return [3 /*break*/, 5];
                    console.log(sources[i]);
                    return [4 /*yield*/, getTerms(getApUrlFromPrefix(sources[i]))];
                case 2:
                    (_c.sent()).forEach(function (value) { return terms.push(value); });
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, interval); })];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5:
                    if (errors.length != 0) {
                        console.log("読み込めなかったものたち");
                        errors.forEach(function (value) { return console.log(value); });
                    }
                    writeTerms(terms);
                    return [3 /*break*/, 8];
                case 6:
                    _b = (_a = console).log;
                    return [4 /*yield*/, getTerms(getApUrlFromPrefix(spec))];
                case 7:
                    _b.apply(_a, [_c.sent()]);
                    console.log(errors.length);
                    _c.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
function getTerms(sourceUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var raw;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getHtml(sourceUrl)];
                case 1:
                    raw = _a.sent();
                    if (raw == undefined)
                        throw new Error("\u30A4\u30F3\u30BF\u30FC\u30CD\u30C3\u30C8\u63A5\u7D9A\u30A8\u30E9\u30FC \n".concat(sourceUrl));
                    return [2 /*return*/, readHtml(raw, sourceUrl)];
            }
        });
    });
}
function saveRawHtml(raw) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                fs_1.default.writeFileSync('output.txt', raw);
                console.log("write to output.txt");
            }
            catch (e) {
                console.log(e);
            }
            return [2 /*return*/];
        });
    });
}
function writeTerms(terms) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            result = "";
            console.log("結果の書き込みを開始します");
            terms.forEach(function (value) { return result += value.name + "," + value.description + "\n"; });
            try {
                fs_1.default.writeFileSync('result.txt', result);
            }
            catch (e) {
                console.log(e);
            }
            return [2 /*return*/];
        });
    });
}
function getHtml(source) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var response, decoder, output, readablestream, stream, resp;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch(source)];
                case 1:
                    response = _b.sent();
                    decoder = new TextDecoder('shift-jis');
                    output = "";
                    readablestream = (_a = response.body) === null || _a === void 0 ? void 0 : _a.getReader();
                    if (readablestream == undefined)
                        return [2 /*return*/, undefined];
                    _b.label = 2;
                case 2:
                    if (!true) return [3 /*break*/, 4];
                    return [4 /*yield*/, readablestream.read()];
                case 3:
                    stream = _b.sent();
                    if ((stream === null || stream === void 0 ? void 0 : stream.value) == undefined)
                        return [3 /*break*/, 4];
                    resp = stream.value;
                    output += decoder.decode(resp);
                    if (stream.done == true)
                        return [3 /*break*/, 4];
                    return [3 /*break*/, 2];
                case 4:
                    //前のコードは一つの単位分しかストリームから読み取ってなかったので，途中で結果が途切れてしまっていたみたい．
                    if (output.length == 0)
                        return [2 /*return*/, undefined];
                    return [2 /*return*/, output];
            }
        });
    });
}
function readHtml(rawHtml, url) {
    return __awaiter(this, void 0, void 0, function () {
        var termList, dl, parsed, name;
        return __generator(this, function (_a) {
            termList = [];
            dl = dlExtract(rawHtml);
            if (dl === null)
                errors.push(url);
            else {
                parsed = (0, node_html_parser_1.parse)(dl);
                if (parsed === undefined)
                    throw new Error("html要素エラー");
                parsed.childNodes.forEach(function (node) {
                    if (node.nodeType === 1) {
                        var childnode = node;
                        if (childnode.tagName === 'DT') {
                            name = childnode.textContent;
                        }
                        if (childnode.tagName === 'DD') {
                            termList.push({
                                name: name,
                                description: childnode.textContent,
                            });
                        }
                    }
                });
            }
            return [2 /*return*/, termList];
        });
    });
}
//ddの中身全て
function dtExtract(str) {
    var dtReg = new RegExp('<dt>(.*)<\/dt>', 'g');
    var match = str.matchAll(dtReg);
    return match;
}
function ddExtract(str) {
    var ddReg = new RegExp('<dd>(.*)<\/dd>', 'g');
    var match = str.matchAll(ddReg);
    return match;
}
function dlExtract(str) {
    var dlReg = new RegExp('<dl class="keyword">(.*)<\/dl>', 'si');
    var matchDl = str.match(dlReg);
    if (matchDl != null) {
        return matchDl[1];
    }
    return null;
}
function getApUrlFromPrefix(source) {
    return 'https://www.ap-siken.com/keyword/' + source + ".html";
}

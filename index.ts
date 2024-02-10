import fs from "fs";
import { TextNode, parse } from 'node-html-parser';

const interval: number = 1000;
const sources: string[] = [
	"_a",
	"_b",
	"_c",
	"_d",
	"_e",
	"_f",
	"_g",
	"_h",
	"_i",
	"_j",
	"_k",
	"_l",
	"_m",
	"_n",
	"_o",
	"_p",
	"_q",
	"_r",
	"_s",
	"_t",
	"_u",
	"_v",
	"_w",
	"_x",
	"_y",
	"_z",
	"xa",
	"xi",
	"xu",
	"xe",
	"xo",
	"ka",
	"ki",
	"ku",
	"ke",
	"ko",
	"sa",
	"si",
	"su",
	"se",
	"so",
	"ta",
	"ti",
	"tu",
	"te",
	"to",
	"na",
	"ni",
	"nu",
	"ne",
	"no",
	"ha",
	"hi",
	"hu",
	"he",
	"ho",
	"ma",
	"mi",
	"mu",
	"me",
	"mo",
	"ra",
	"ri",
	"ru",
	"re",
	"ro",
	"ya",
	"yu",
	"yo",
	"wa",
	"_other",
]
let errors: string[] = [];

main(undefined);

async function main(spec: string | undefined) {
//	sources.forEach(async (value) => {
//		console.log(value);
//		await getHtml('https://www.ap-siken.com/keyword/' + value + ".html");
//		await new Promise(resolve => setTimeout(resolve, 4000));
//	});
	let terms: Term[] = [];
	if(spec == undefined){
		for(var i = 0; i < sources.length; i++) {
			console.log(sources[i]);
			(await getTerms(getApUrlFromPrefix(sources[i]))).forEach((value) => terms.push(value));
			await new Promise(resolve => setTimeout(resolve, interval));
		}

		if(errors.length != 0) {
			console.log("読み込めなかったものたち");
			errors.forEach((value) => console.log(value));
		}

		writeTerms(terms);

	} else {
		console.log(await getTerms(getApUrlFromPrefix(spec)));
		console.log(errors.length);
	}
}


async function getTerms(sourceUrl: string) : Promise<Term[]>{
	var raw = await getHtml(sourceUrl);
	if(raw == undefined) throw new Error(`インターネット接続エラー \n${sourceUrl}`);
	return readHtml(raw, sourceUrl);
}

async function saveRawHtml(raw: string) {
	try{
		fs.writeFileSync('output.txt', raw); 
		console.log("write to output.txt");
	}catch(e) {
		console.log(e);
	}
}

async function writeTerms(terms: Term[]) {
	let result: string = "";
	console.log("結果の書き込みを開始します");
	terms.forEach((value: Term) => result += value.name + "," + value.description + "\n");
	try {
		fs.writeFileSync('result.txt', result);
	}catch(e) {
		console.log(e);
	}
}

async function getHtml(source: string): Promise<string | undefined> {
	let response: Response = await fetch(source);

	const decoder = new TextDecoder('shift-jis');
	let output: string = "";

	var readablestream = response.body?.getReader()
	if(readablestream == undefined) return undefined;
	while(true){
		var stream = await readablestream.read();
		if(stream?.value == undefined) break;

		var resp = stream!.value;
		output += decoder.decode(resp);
		if(stream.done == true) break;
	}
	//前のコードは一つの単位分しかストリームから読み取ってなかったので，途中で結果が途切れてしまっていたみたい．

	if(output.length == 0) return undefined;
	return output;
	
//	await response.then(
//		async (value) => {
//			var stream = await value.body?.getReader().read();
//			var resp = stream!.value;
//
//			if(resp == undefined) console.log("これはundefinedです");
//
//			return decoder.decode(resp);
//	});
}

type Term = {
	name: string | null;
	description: string | null;
}

async function readHtml(rawHtml: string, url: string): Promise<Term[]> {
	let termList: Term[] = [];

	var dl = dlExtract(rawHtml);
	if(dl === null) errors.push(url);

	else{
		const parsed = parse(dl);
		if(parsed === undefined) throw new Error("html要素エラー");

		var name: string;
		parsed.childNodes.forEach((node) => {
			if(node.nodeType === 1) {
				const childnode = node as unknown as HTMLElement;

				if(childnode.tagName === 'DT') {
					name = childnode.textContent!;
				}

				if(childnode.tagName === 'DD') {
					termList.push({
						name: name,
						description: childnode.textContent,
					});
				}
			}
		})
	}
	return termList;
}

//ddの中身全て
function dtExtract(str: string) : IterableIterator<RegExpMatchArray> | null {
	var dtReg = new RegExp('<dt>(.*)<\/dt>', 'g');
	var match = str.matchAll(dtReg);
	return match;
}

function ddExtract(str: string) : IterableIterator<RegExpMatchArray> | null {
	var ddReg = new RegExp('<dd>(.*)<\/dd>', 'g');
	var match = str.matchAll(ddReg);
	return match;
}

function dlExtract(str: string) : string | null{
	var dlReg = new RegExp('<dl class="keyword">(.*)<\/dl>','si');
	var matchDl = str.match(dlReg)
	if(matchDl != null) {
		return matchDl[1];
	}
	return null
}

function getApUrlFromPrefix(source: string) : string{
	return 'https://www.ap-siken.com/keyword/' + source + ".html";
}

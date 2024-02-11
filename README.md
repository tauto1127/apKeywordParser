https://www.ap-siken.com/keyword/_y.html
https://www.ap-siken.com/keyword/_z.html
https://www.ap-siken.com/keyword/tu.html
https://www.ap-siken.com/keyword/nu.html
https://www.ap-siken.com/keyword/ne.html
https://www.ap-siken.com/keyword/no.html
https://www.ap-siken.com/keyword/mu.html
https://www.ap-siken.com/keyword/ya.html
https://www.ap-siken.com/keyword/yo.html
には単語がない

# 実装してておもろかったとこ
TypeScriptやJavaScriptはあまり使わないので苦労した．
その中でもhttpリクエストのレスポンスを処理するところが苦労した．
```
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
```
fetchでリスポンスを受け取る．

そしてリスポンスからbodyを取得する必要があるが，C#ならreadAsBytesAsyncメソッドを使えば簡単にできるのにTypeScriptではストリームを処理する必要がある．

Streamからはチャンク単位（ある一定の単位）でデータを受け取ることができる．その処理がwhile文のところ

元々37-47行目の処理を使っていたが，これだと１チャンクしか読み取らないので途中までしか結果を取得できていなかった．
while(true)でループ回してるのは良くないと思う

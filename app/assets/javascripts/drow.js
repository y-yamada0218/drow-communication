window.addEventListener('load', () => {
  const canvas = document.querySelector('#draw-area');
  const context = canvas.getContext('2d');
  const lastPosition = { x: null, y: null };
  let isDrag = false;


  function draw(x, y) {
    if(!isDrag) {
      return;
    }

    context.lineCap = 'round'; // 丸みを帯びた線にする
    context.lineJoin = 'round'; // 丸みを帯びた線にする

    if (lastPosition.x === null || lastPosition.y === null) {
      context.moveTo(x, y);
    } else {
      context.moveTo(lastPosition.x, lastPosition.y);
    }
    context.lineTo(x, y);
    context.stroke();
    lastPosition.x = x;
    lastPosition.y = y;
  }

  // canvas上に書いた絵を全部消す
  function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  // マウスのドラッグを開始したらisDragのフラグをtrueにしてdraw関数内で
  // お絵かき処理が途中で止まらないようにする
  function dragStart(event) {
    // これから新しい線を書き始めることを宣言する
    // 一連の線を書く処理が終了したらdragEnd関数内のclosePathで終了を宣言する
    context.beginPath();

    isDrag = true;
  }
  // マウスのドラッグが終了したら、もしくはマウスがcanvas外に移動したら
  // isDragのフラグをfalseにしてdraw関数内でお絵かき処理が中断されるようにする
  function dragEnd(event) {
    // 線を書く処理の終了を宣言する
    context.closePath();
    isDrag = false;

    // 描画中に記録していた値をリセットする
    lastPosition.x = null;
    lastPosition.y = null;
  }

  // マウス操作やボタンクリック時のイベント処理を定義する
  function initEventHandler() {
    const clearButton = document.querySelector('#clear-button');
    clearButton.addEventListener('click', clear);

    canvas.addEventListener('mousedown', dragStart);
    canvas.addEventListener('mouseup', dragEnd);
    canvas.addEventListener('mouseout', dragEnd);
    canvas.addEventListener('mousemove', (event) => {
      // eventの中の値を見たい場合は以下のようにconsole.log(event)で、
      // デベロッパーツールのコンソールに出力させると良い
      // console.log(event);

      draw(event.layerX, event.layerY);
    });
  }

  // イベント処理を初期化する
  initEventHandler();

  /* 選択を未選択状態に */
var clearCs = function(cs,def){

  for(var i=0,len=cs.length;i<len;i++){

    cs[i].setAttribute('class',def);
  }
}

/* 線の太さ入力欄に変更があった時   */
wd.onchange = function(){

  clearCs(wds,'wds');
  ctx.lineWidth = this.value;
  this.setAttribute('class','cur');
}
/* 線選択枠のクリックイベントの登録 */
for(var i=0,len=wds.length;i<len;i++){

  wds[i].onclick = function(){

    /* 線の太さ入力欄の選択状態を解除 */
    wd.removeAttribute('class');

    clearCs(wds,'wds');
    ctx.lineWidth = this.getAttribute('wd');
    this.setAttribute('class','wds cur');
  }
}

/* 色ウィンドウから選択された時 */
cl.onchange = function(){

  /* 選択した色を保存するボタン */
  var p10 = c10.parentNode;

  clearCs(cls,'cls');
  ctx.strokeStyle = cl.value;
  c10.style.background = cl.value;
  p10.setAttribute('cl',cl.value);
  p10.setAttribute('class','cls cur');
}
/* 色選択枠のクリックイベントの登録 */
for(var i=0,len=cls.length;i<len;i++){

  cls[i].onclick = function(){

    clearCs(cls,'cls');
    ctx.strokeStyle = this.getAttribute('cl');
    this.setAttribute('class','cls cur');
  }
}

});
